'use client';

import React, { useEffect, useState, ComponentType } from 'react';
import * as ReactDOM from 'react-dom';

interface FederatedComponentProps {
  remoteUrl: string;
  remoteName: string;
  moduleName: string;
  componentExportName?: string;
  props?: Record<string, any>;
  loadingFallback?: React.ReactNode;
}

const remoteCache = new Map<string, Promise<any>>();

function getRemoteContainer(remoteUrl: string, remoteName: string): Promise<any> {
  if (remoteCache.has(remoteUrl)) {
    return remoteCache.get(remoteUrl)!;
  }

  const loadPromise = (async () => {
    // 1. Initialize shared scope for Vite / ESM federation singletons
    if (typeof window !== 'undefined') {
      const win = window as any;
      win.__federation_shared__ = win.__federation_shared__ || {};
      win.__federation_shared__['default'] = win.__federation_shared__['default'] || {};

      const reactShared = {
        get: () => Promise.resolve(() => React),
        loaded: 1,
      };
      const reactDomShared = {
        get: () => Promise.resolve(() => ReactDOM),
        loaded: 1,
      };

      win.__federation_shared__['default']['react'] = {
        '18.2.0': reactShared,
        undefined: reactShared,
        '*': reactShared,
        ...(win.__federation_shared__['default']['react'] || {}),
      };

      win.__federation_shared__['default']['react-dom'] = {
        '18.2.0': reactDomShared,
        undefined: reactDomShared,
        '*': reactDomShared,
        ...(win.__federation_shared__['default']['react-dom'] || {}),
      };
    }

    console.log(`[FederatedComponent] Dynamic importing remote "${remoteName}" from ${remoteUrl}...`);
    // Dynamic import remoteEntry.js using native browser ESM
    // webpackIgnore ensures Next.js webpack does not attempt to resolve this URL at build time
    const container = await import(/* webpackIgnore: true */ remoteUrl);
    console.log(`[FederatedComponent] Successfully imported container for "${remoteName}":`, container);

    // 2. Initialize container with shared dependencies
    if (typeof container.init === 'function') {
      const shareScope = {
        react: {
          '18.2.0': { get: () => Promise.resolve(() => React), loaded: true, scope: 'default' },
          undefined: { get: () => Promise.resolve(() => React), loaded: true, scope: 'default' },
        },
        'react-dom': {
          '18.2.0': { get: () => Promise.resolve(() => ReactDOM), loaded: true, scope: 'default' },
          undefined: { get: () => Promise.resolve(() => ReactDOM), loaded: true, scope: 'default' },
        },
      };
      await container.init(shareScope);
    }

    return container;
  })();

  remoteCache.set(remoteUrl, loadPromise);
  return loadPromise;
}

export function FederatedComponent({
  remoteUrl,
  remoteName,
  moduleName,
  componentExportName,
  props = {},
  loadingFallback,
}: FederatedComponentProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function loadComponent() {
      try {
        const container = await getRemoteContainer(remoteUrl, remoteName);
        if (typeof container.get !== 'function') {
          throw new Error(`Remote "${remoteName}" at ${remoteUrl} does not export a get() function.`);
        }

        console.log(`[FederatedComponent] Requesting module "${moduleName}" from "${remoteName}"...`);
        const factory = await container.get(moduleName);
        const mod = typeof factory === 'function' ? await factory() : await factory;
        console.log(`[FederatedComponent] Module "${moduleName}" received:`, mod);

        let Resolved: ComponentType<any> | null = null;
        if (componentExportName && typeof mod?.[componentExportName] === 'function') {
          Resolved = mod[componentExportName];
        } else if (componentExportName && typeof mod?.default?.[componentExportName] === 'function') {
          Resolved = mod.default[componentExportName];
        } else if (typeof mod?.default === 'function') {
          Resolved = mod.default;
        } else if (typeof mod === 'function') {
          Resolved = mod;
        } else if (mod && typeof mod === 'object') {
          const exportKeys = Object.keys(mod);
          const funcKey = exportKeys.find((k) => typeof mod[k] === 'function');
          if (funcKey) {
            Resolved = mod[funcKey];
          }
        }

        if (!Resolved) {
          throw new TypeError(
            `Module "${moduleName}" from remote "${remoteName}" did not export a valid React component. Exports: [${Object.keys(
              mod || {}
            ).join(', ')}]`
          );
        }

        if (isMounted) {
          setComponent(() => Resolved);
          setLoading(false);
        }
      } catch (err: any) {
        console.error(`[FederatedComponent] Error loading remote "${remoteName}" module "${moduleName}":`, err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    }

    loadComponent();

    return () => {
      isMounted = false;
    };
  }, [remoteUrl, remoteName, moduleName, componentExportName]);

  // Strict Fail-Early policy: display detailed error immediately with no fallbacks
  if (error) {
    return (
      <div className="my-8 p-6 max-w-4xl mx-auto bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-900 shadow-sm" role="alert">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
            !
          </div>
          <div>
            <h3 className="text-base font-bold text-rose-950">Remote Micro-Frontend Load Failure</h3>
            <p className="text-xs text-rose-700">Strict fail-early policy active — no local fallback permitted.</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono bg-rose-100/70 p-3 rounded-lg border border-rose-200">
          <div><span className="font-semibold text-rose-900">Remote:</span> {remoteName}</div>
          <div><span className="font-semibold text-rose-900">Module:</span> {moduleName}</div>
          <div className="md:col-span-2 break-all"><span className="font-semibold text-rose-900">URL:</span> {remoteUrl}</div>
        </div>
        <pre className="mt-3 p-3 bg-white/80 rounded border border-rose-200 text-xs text-rose-900 overflow-x-auto whitespace-pre-wrap font-mono">
          {error.stack || error.message}
        </pre>
      </div>
    );
  }

  if (loading || !Component) {
    return (
      loadingFallback || (
        <div className="py-24 flex flex-col items-center justify-center space-y-3" role="status">
          <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">
            Loading federated microfrontend <span className="font-mono text-slate-700">{remoteName}</span>...
          </p>
        </div>
      )
    );
  }

  return <Component {...props} />;
}
