import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      federation({
        name: 'mycommerce',
        remotes: {
          homepageUi: env.VITE_MFE_HOMEPAGE_URL || 'https://storage.googleapis.com/mycommerce/mfes/homepage-ui/assets/remoteEntry.js',
          discoveryUi: env.VITE_MFE_DISCOVERY_URL || 'https://storage.googleapis.com/mycommerce/mfes/discovery-ui/assets/remoteEntry.js',
          productPageUi: env.VITE_MFE_PRODUCT_PAGE_URL || 'https://storage.googleapis.com/mycommerce/mfes/product-page-ui/assets/remoteEntry.js',
          counterCheck: env.VITE_MFE_COUNTER_CHECK_URL || 'https://storage.googleapis.com/mycommerce/mfes/counter-check/assets/remoteEntry.js',
          cartUi: env.VITE_MFE_CART_URL || 'https://storage.googleapis.com/mycommerce/mfes/cart-ui/assets/remoteEntry.js',
          checkoutUi: env.VITE_MFE_CHECKOUT_URL || 'https://storage.googleapis.com/mycommerce/mfes/checkout-ui/assets/remoteEntry.js',
          searchUi: env.VITE_MFE_SEARCH_URL || 'https://storage.googleapis.com/mycommerce/mfes/search-ui/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 5170,
    },
  };
});
