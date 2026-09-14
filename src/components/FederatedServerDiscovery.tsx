import React from 'react';
import path from 'path';
import { FederatedServerComponent } from './FederatedServerComponent';
import { FederatedDiscovery } from './FederatedDiscovery';

interface FederatedServerDiscoveryProps {
  initialCategory?: string;
  initialMaxHeight?: number | null;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_DISCOVERY_URL ||
  process.env.VITE_MFE_DISCOVERY_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/discovery-ui/assets/remoteEntry.js';

const SSR_MFE_URL =
  process.env.MFE_DISCOVERY_SSR_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/discovery-ui/server/DiscoveryFragment.js';

const CSS_MFE_URL =
  process.env.MFE_DISCOVERY_CSS_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/discovery-ui/style-Djdvs7_p.css';

export function FederatedServerDiscovery({
  initialCategory = 'all',
  initialMaxHeight = null,
}: FederatedServerDiscoveryProps = {}) {
  const localFallbackPath = path.resolve(
    process.cwd(),
    '../discovery-ui/dist/server/DiscoveryFragment.js'
  );

  return (
    <FederatedServerComponent
      remoteName="discoveryUi"
      moduleName="./DiscoveryFragment"
      componentExportName="DiscoveryFragment"
      clientRemoteUrl={CLIENT_MFE_URL}
      ssrBundleUrl={SSR_MFE_URL}
      localFallbackPath={localFallbackPath}
      cssUrl={CSS_MFE_URL}
      props={{
        initialCategory,
        initialMaxHeight,
      }}
      fallback={
        <FederatedDiscovery
          initialCategory={initialCategory}
          initialMaxHeight={initialMaxHeight}
        />
      }
    />
  );
}
