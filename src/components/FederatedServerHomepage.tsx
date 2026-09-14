import React from 'react';
import path from 'path';
import { FederatedServerComponent } from './FederatedServerComponent';

interface FederatedServerHomepageProps {
  initialContent?: any;
}

const CLIENT_MFE_URL =
  process.env.NEXT_PUBLIC_MFE_HOMEPAGE_URL ||
  process.env.VITE_MFE_HOMEPAGE_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/homepage-ui/assets/remoteEntry.js';

const SSR_MFE_URL =
  process.env.MFE_HOMEPAGE_SSR_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/homepage-ui/server/HomepageFragment.js';

const CSS_MFE_URL =
  process.env.MFE_HOMEPAGE_CSS_URL ||
  'https://storage.googleapis.com/mycommerce/mfes/homepage-ui/style-D-OXGWNf.css';

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
