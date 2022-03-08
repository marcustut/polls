import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  define: { global: {} }, // polyfill 'global' in browser
  plugins: [
    react(),
    pwa({
      strategies: 'injectManifest',
      srcDir: '',
      filename: 'service-worker.js',
      manifest,
    }),
    tsconfigPaths(),
  ],
});
