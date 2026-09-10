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
          homepageUi: env.VITE_MFE_HOMEPAGE_URL || 'http://localhost:5174/assets/remoteEntry.js',
          discoveryUi: env.VITE_MFE_DISCOVERY_URL || 'http://localhost:5177/assets/remoteEntry.js',
          productPageUi: env.VITE_MFE_PRODUCT_PAGE_URL || 'http://localhost:5175/assets/remoteEntry.js',
          counterCheck: env.VITE_MFE_COUNTER_CHECK_URL || 'http://localhost:5173/assets/remoteEntry.js',
          cartUi: env.VITE_MFE_CART_URL || 'http://localhost:5176/assets/remoteEntry.js',
          checkoutUi: env.VITE_MFE_CHECKOUT_URL || 'http://localhost:5178/assets/remoteEntry.js',
          searchUi: env.VITE_MFE_SEARCH_URL || 'http://localhost:5179/assets/remoteEntry.js',
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
