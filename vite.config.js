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
  base: '',
  
  // Configure server
  server: {
    // Enable CORS in development
    cors: true,
  },
  
  // Resolve options
  resolve: {
    // Alias configuration if needed
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Build configuration
  build: {
    // Copy page-specific JS files to the root of the dist directory
    assetsInlineLimit: 0, // Ensure files are not inlined
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        ...findAllHtmlFiles(path.resolve(__dirname, 'src')),
      },
      output: {
        // 해시 제거 - 파일명 그대로 유지
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          const filename = assetInfo.name || '';
          
          // Keep CSS files in root
          if (filename.endsWith('.css')) {
            return '[name].[ext]';
          }
          
          // Keep page-specific JS files in root
          if (filename.match(/\.js$/) && filename.startsWith('src/pages/output-page/')) {
            const baseName = path.basename(filename);
            return baseName;
          }
          
          // Other assets go to assets directory
          return 'assets/[name].[ext]';
        }
      }
    },
    // 출력 디렉토리
    outDir: 'dist',
    // 초기화
    emptyOutDir: true,
  },
  appType: 'mpa',
  // 상대경로 사용
  base: './',
  // 개발 서버 설정
  server: {
    cors: true,
  },
});
