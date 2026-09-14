import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { pathToFileURL } from 'url';
import React from 'react';

interface RenderMfeServerOptions {
  url?: string;
  localPath?: string;
  moduleName?: string;
  componentExportName?: string;
  props?: Record<string, any>;
  ttlMs?: number;
}

interface CacheEntry {
  module: any;
  cachedAt: number;
}

const inMemoryModuleCache = new Map<string, CacheEntry>();
const inFlightPromises = new Map<string, Promise<any>>();

function findHostNodeModules(): string | null {
  const candidates = [
    path.resolve(process.cwd(), 'node_modules'),
    path.resolve(process.cwd(), '../node_modules'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c;
    }
  }
  return null;
}

function getCacheDir(): string {
  let cacheDir: string;
  const projectCacheDir = path.resolve(process.cwd(), '.next/cache/mfe-ssr');
  try {
    if (!fs.existsSync(projectCacheDir)) {
      fs.mkdirSync(projectCacheDir, { recursive: true });
    }
    cacheDir = projectCacheDir;
  } catch {
    const tmpCacheDir = path.join(os.tmpdir(), 'mycommerce-mfe-ssr');
    if (!fs.existsSync(tmpCacheDir)) {
      fs.mkdirSync(tmpCacheDir, { recursive: true });
    }
    cacheDir = tmpCacheDir;
  }

  const hostNodeModules = findHostNodeModules();
  if (hostNodeModules) {
    const cacheNodeModules = path.join(cacheDir, 'node_modules');
    if (!fs.existsSync(cacheNodeModules)) {
      try {
        fs.symlinkSync(hostNodeModules, cacheNodeModules, 'junction');
      } catch {
        // ignore symlink errors if already linked or not supported
      }
    }
  }

  return cacheDir;
}

/**
 * Resilient loader that loads an ESM SSR bundle inside the host's directory structure
 * so all bare specifiers (like 'react', 'react-dom') resolve to the host's singleton modules.
 */
export async function loadMfeServerModule({
  url,
  localPath,
  moduleName = 'remoteModule',
  ttlMs = 1000 * 60 * 5,
}: {
  url?: string;
  localPath?: string;
  moduleName?: string;
  ttlMs?: number;
}): Promise<any | null> {
  if (typeof window !== 'undefined') {
    return null;
  }

  const cacheKey = localPath ? `local:${localPath}` : (url || '');
  if (!cacheKey) {
    return null;
  }

  const cached = inMemoryModuleCache.get(cacheKey);
  const now = Date.now();
  if (cached && now - cached.cachedAt < ttlMs) {
    return cached.module;
  }

  if (inFlightPromises.has(cacheKey)) {
    return inFlightPromises.get(cacheKey)!;
  }

  const loadPromise = (async () => {
    try {
      const cacheDir = getCacheDir();
      const safeName = moduleName.replace(/[^a-zA-Z0-9_-]/g, '_');

      // 1. Local filesystem: copy to host cache directory to ensure single host React instance
      if (localPath) {
        const resolvedLocalPath = path.isAbsolute(localPath)
          ? localPath
          : path.resolve(process.cwd(), localPath);

        if (fs.existsSync(resolvedLocalPath)) {
          const content = fs.readFileSync(resolvedLocalPath, 'utf-8');
          const hash = crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
          const cachedFilePath = path.join(cacheDir, `${safeName}-local-${hash}.mjs`);

          if (!fs.existsSync(cachedFilePath)) {
            fs.writeFileSync(cachedFilePath, content, 'utf-8');
          }

          const fileUrl = pathToFileURL(cachedFilePath).href;
          const localModule = await import(/* webpackIgnore: true */ fileUrl);
          inMemoryModuleCache.set(cacheKey, { module: localModule, cachedAt: now });
          return localModule;
        }
      }

      if (!url) {
        return null;
      }

      // 2. Remote HTTP fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/javascript, text/javascript, */*',
        },
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`[mfeServerLoader] Remote SSR bundle fetch failed with HTTP ${response.status} for ${url}`);
        return null;
      }

      const code = await response.text();
      if (!code || code.trim().length === 0) {
        return null;
      }

      const hash = crypto.createHash('sha256').update(code).digest('hex').slice(0, 12);
      const filePath = path.join(cacheDir, `${safeName}-${hash}.mjs`);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, code, 'utf-8');
      }

      const fileUrl = pathToFileURL(filePath).href;
      const remoteModule = await import(/* webpackIgnore: true */ fileUrl);

      inMemoryModuleCache.set(cacheKey, { module: remoteModule, cachedAt: now });
      return remoteModule;
    } catch (err: any) {
      console.warn(`[mfeServerLoader] Failed loading SSR module for "${moduleName}":`, err?.message || err);
      return null;
    } finally {
      inFlightPromises.delete(cacheKey);
    }
  })();

  inFlightPromises.set(cacheKey, loadPromise);
  return loadPromise;
}

/**
 * Server-only helper that evaluates and renders a remote MFE component into HTML
 * using Node's runtime react-dom/server, isolated from Webpack's static AST checks.
 */
export async function renderMfeServerComponent({
  url,
  localPath,
  moduleName = 'remoteModule',
  componentExportName,
  props = {},
  ttlMs,
}: RenderMfeServerOptions): Promise<{ html: string } | null> {
  try {
    const mod = await loadMfeServerModule({ url, localPath, moduleName, ttlMs });
    if (!mod) {
      return null;
    }

    // 1. Direct standalone render function exported by self-contained MFE SSR bundle
    if (typeof mod.render === 'function') {
      try {
        const html = await mod.render(props);
        if (typeof html === 'string') {
          return { html };
        }
      } catch (renderErr) {
        console.warn(`[mfeServerLoader] mod.render failed for "${moduleName}":`, renderErr);
      }
    }

    let Component: React.ComponentType<any> | null = null;
    if (componentExportName && typeof mod[componentExportName] === 'function') {
      Component = mod[componentExportName];
    } else if (typeof mod.default === 'function') {
      Component = mod.default;
    } else if (typeof mod === 'function') {
      Component = mod;
    } else if (mod && typeof mod === 'object') {
      const keys = Object.keys(mod);
      const funcKey = keys.find((k) => typeof mod[k] === 'function');
      if (funcKey) {
        Component = mod[funcKey];
      }
    }

    if (!Component) {
      return null;
    }

    // Dynamic runtime import of react-dom/server with webpackIgnore to avoid Next.js static restriction
    const ReactDOMServer = await import(/* webpackIgnore: true */ 'react-dom/server');
    const renderToString = ReactDOMServer.renderToString || (ReactDOMServer as any).default?.renderToString;

    if (typeof renderToString !== 'function') {
      return null;
    }

    const html = renderToString(React.createElement(Component, props));
    return { html };
  } catch (err) {
    console.warn(`[mfeServerLoader] SSR renderToString failed for "${moduleName}":`, err);
    return null;
  }
}
