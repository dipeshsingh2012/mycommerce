import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5170,
    fs: {
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      '@mycommerce/counter-check': path.resolve(__dirname, '../counter-check/src/index.ts'),
      '@mycommerce/homepage-ui': path.resolve(__dirname, '../homepage-ui/src/index.ts'),
      '@mycommerce/discovery-ui': path.resolve(__dirname, '../discovery-ui/src/index.ts'),
      '@mycommerce/product-page-ui': path.resolve(__dirname, '../product-page-ui/src/index.ts'),
      '@mycommerce/cart-ui': path.resolve(__dirname, '../cart-ui/src/index.ts'),
      '@mycommerce/checkout-ui': path.resolve(__dirname, '../checkout-ui/src/index.ts'),
    },
  },
});
