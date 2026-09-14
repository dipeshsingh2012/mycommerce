'use client';

import React, { useEffect, useState, ComponentType } from 'react';
import * as ReactDOM from 'react-dom';

interface FederatedHydratorProps {
  remoteUrl: string;
  remoteName: string;
  moduleName: string;
  componentExportName?: string;
  props?: Record<string, any>;
  children?: React.ReactNode;
}

const remoteCache = new Map<string, Promise<any>>();

function getRemoteContainer(remoteUrl: string, remoteName: string): Promise<any> {
  if (remoteCache.has(remoteUrl)) {
    return remoteCache.get(remoteUrl)!;
  }

  const loadPromise = (async () => {
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

    // Dynamic import remoteEntry.js using native browser ESM
    const container = await import(/* webpackIgnore: true */ remoteUrl);

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

export function FederatedHydrator({
  remoteUrl,
  remoteName,
  moduleName,
  componentExportName,
  props = {},
  children,
}: FederatedHydratorProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadComponent() {
      try {
        const container = await getRemoteContainer(remoteUrl, remoteName);
        if (typeof container.get !== 'function') {
          throw new Error(`Remote "${remoteName}" does not export a get() function.`);
        }

        const factory = await container.get(moduleName);
        const mod = factory();

        let Resolved: ComponentType<any> | null = null;
        if (componentExportName && typeof mod?.[componentExportName] === 'function') {
          Resolved = mod[componentExportName];
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

        if (Resolved && isMounted) {
          setComponent(() => Resolved);
          setHasHydrated(true);
        }
      } catch (err) {
        console.warn(`[FederatedHydrator] Could not hydrate client MFE "${remoteName}":`, err);
        // On error, leave pre-rendered SSR markup in place
      }
    }

    loadComponent();

    return () => {
      isMounted = false;
    };
  }, [remoteUrl, remoteName, moduleName, componentExportName]);

  // While loading remote or if hydration failed, keep the server-rendered HTML intact!
  if (!hasHydrated || !Component) {
    return <div data-mfe-hydrating={remoteName}>{children}</div>;
  }

  // Once client MFE is loaded, mount interactive component
  return <Component {...props} />;
}

