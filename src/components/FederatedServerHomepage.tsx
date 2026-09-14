import React from 'react';
import path from 'path';
import { FederatedServerComponent } from './FederatedServerComponent';

interface FederatedServerHomepageProps {
  initialContent?: any;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_HOMEPAGE_URL ||
  process.env.VITE_MFE_HOMEPAGE_URL ||
  'http://localhost:5174/assets/remoteEntry.js';

const SSR_MFE_URL =
  process.env.MFE_HOMEPAGE_SSR_URL ||
  'http://localhost:5174/dist/server/HomepageFragment.js';

const CSS_MFE_URL =
  process.env.MFE_HOMEPAGE_CSS_URL ||
  'http://localhost:5174/assets/style-D-OXGWNf.css';

export function FederatedServerHomepage({
  initialContent,
}: FederatedServerHomepageProps = {}) {
  const localFallbackPath = path.resolve(
    process.cwd(),
    '../homepage-ui/dist/server/HomepageFragment.js'
  );

  return (
    <FederatedServerComponent
      remoteName="homepageUi"
      moduleName="./HomepageFragment"
      componentExportName="HomepageFragment"
      clientRemoteUrl={CLIENT_MFE_URL}
      ssrBundleUrl={SSR_MFE_URL}
      localFallbackPath={localFallbackPath}
      cssUrl={CSS_MFE_URL}
      props={{
        initialContent,
      }}
    />
  );
}
