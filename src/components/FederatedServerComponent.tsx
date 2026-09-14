import React from 'react';
import { renderMfeServerComponent } from '@/lib/mfeServerLoader';
import { FederatedHydrator } from './FederatedHydrator';
import { FederatedComponent } from './FederatedComponent';

export interface FederatedServerComponentProps {
  remoteName: string;
  moduleName: string;
  componentExportName?: string;
  clientRemoteUrl: string;
  ssrBundleUrl?: string;
  localFallbackPath?: string;
  cssUrl?: string;
  props?: Record<string, any>;
  fallback?: React.ReactNode;
}

/**
 * React Server Component (RSC) that pre-renders a federated micro-frontend
 * module during Next.js SSR / SSG and transitions smoothly into client-side hydration.
 */
export async function FederatedServerComponent({
  remoteName,
  moduleName,
  componentExportName,
  clientRemoteUrl,
  ssrBundleUrl,
  localFallbackPath,
  cssUrl,
  props = {},
  fallback,
}: FederatedServerComponentProps) {
  let ssrResult: { html: string } | null = null;

  if (ssrBundleUrl || localFallbackPath) {
    ssrResult = await renderMfeServerComponent({
      url: ssrBundleUrl,
      localPath: localFallbackPath,
      moduleName: remoteName,
      componentExportName,
      props,
    });
  }

  // 1. Successful Server-Side Pre-rendering: inject full HTML + stylesheet link + client hydrator
  if (ssrResult?.html) {
    return (
      <>
        {cssUrl && <link rel="stylesheet" href={cssUrl} />}
        <FederatedHydrator
          remoteUrl={clientRemoteUrl}
          remoteName={remoteName}
          moduleName={moduleName}
          componentExportName={componentExportName}
          props={props}
        >
          <div
            data-mfe-ssr={remoteName}
            dangerouslySetInnerHTML={{ __html: ssrResult.html }}
          />
        </FederatedHydrator>
      </>
    );
  }

  // 2. Resilient Fallback: Pure Client-Side Federation
  return (
    <>
      {cssUrl && <link rel="stylesheet" href={cssUrl} />}
      <FederatedComponent
        remoteUrl={clientRemoteUrl}
        remoteName={remoteName}
        moduleName={moduleName}
        componentExportName={componentExportName}
        props={props}
        loadingFallback={fallback}
      />
    </>
  );
}
