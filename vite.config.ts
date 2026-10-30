import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Vite only builds index.html by default. Every other page has to be listed here,
// otherwise imprint.html would be missing in the dist folder.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        imprint: resolve(import.meta.dirname, 'imprint.html'),
      },
    },
  },
});
