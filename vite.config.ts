import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'site',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/contentful': {
        target: 'https://cdn.contentful.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/contentful/, ''),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
