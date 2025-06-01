import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

// findAllHtmlFiles 함수 정의 추가
function findAllHtmlFiles(directory) {
  const htmlFiles = {};

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.html')) {
        // 키 이름을 경로에서 추출 (확장자 제외)
        const key = path.relative(__dirname, filePath).replace('.html', '');
        htmlFiles[key] = filePath;
      }
    }
  }

  scanDirectory(directory);
  return htmlFiles;
}

export default defineConfig({
  // Base public path when served in development or production
  base: './',

  // Configure server
  server: {
    cors: true,
    port: 4444,
    open: '/index.html',
  },

  // Resolve options
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Alias for output directory
      '@output': path.resolve(__dirname, './output'),
    },
  },

  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        output: path.resolve(__dirname, 'output/index.html'),
      },
      output: {
        // Keep original file names for easier debugging
        entryFileNames: chunkInfo => {
          // Output files directly in the output directory without hashing for easier reference
          if (chunkInfo.facadeModuleId && chunkInfo.facadeModuleId.includes('output/')) {
            return 'output/[name].js';
          }
          return 'assets/js/[name]-[hash].js';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const filename = assetInfo.name || '';

          // Handle CSS files in output directory
          if (filename.endsWith('.css') && assetInfo.source.toString().includes('.output')) {
            return 'output/[name][extname]';
          }

          // Handle CSS files
          if (filename.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }

          // Handle images
          if (
            ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].some(ext => filename.endsWith(ext))
          ) {
            return 'assets/images/[name]-[hash][extname]';
          }

          // Handle fonts
          if (['.woff', '.woff2', '.ttf', '.eot', '.otf'].some(ext => filename.endsWith(ext))) {
            return 'assets/fonts/[name]-[hash][extname]';
          }

          // Default asset path
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Copy output directory to dist
    copyPublicDir: true,
  },

  // App type (Multi-Page Application)
  appType: 'mpa',

  // Public directory for static assets
  publicDir: 'public',

  // Configure development server
  preview: {
    port: 7777,
    open: '/index.html',
  },
});
