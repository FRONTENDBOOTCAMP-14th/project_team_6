import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'output',
  base: '/',
  server: {
    port: 5174,
    open: '/output-index.html',
    cors: true,
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: '../dist-output',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'output/output-index.html'),
        login: path.resolve(__dirname, 'output/login.html'),
        register: path.resolve(__dirname, 'output/register.html')
      }
    }
  }
});
