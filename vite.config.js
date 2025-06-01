import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 디렉토리 복사 함수
async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

// 빌드 후 디렉토리 복사 플러그인
const copyDirsPlugin = () => ({
  name: 'copy-dirs',
  async closeBundle() {
    try {
      const dirsToCopy = ['/output', '/src', '/index'];
      
      for (const dir of dirsToCopy) {
        const sourcePath = path.resolve(__dirname, `.${dir}`);
        const destPath = path.resolve(__dirname, 'dist', `.${dir}`);
        
        try {
          await fs.promises.access(sourcePath);
          await copyDir(sourcePath, destPath);
          console.log(`Copied ${dir} directory to dist`);
        } catch (err) {
          console.warn(`Warning: Could not copy ${dir} directory: ${err.message}`);
        }
      }
    } catch (err) {
      console.error('Error copying directories:', err);
    }
  },
});

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    // Base public path when served in development or production
    base: './',

    // Development server configuration
    server: {
      host: true,
      port: 4444, // 개발 서버 포트 (변경하지 않음)
      open: '/index.html',
      cors: true,
    },

    // Preview server configuration (npm run preview 시 사용)
    preview: {
      port: 7777, // 프리뷰 서버 포트 (변경하지 않음)
      open: true,
      cors: true,
    },

    // Resolve options
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@output': path.resolve(__dirname, './output'),
      },
    },

    // Plugin configuration
    plugins: [
      copyDirsPlugin()
    ],

    // Build configuration
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: !isProduction, // 프로덕션 빌드 시 소스맵 비활성화
      minify: isProduction ? 'terser' : false, // 프로덕션 빌드 시에만 코드 최적화
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          ...(fs.existsSync(path.resolve(__dirname, 'output/index.html'))
            ? { output: path.resolve(__dirname, 'output/index.html') }
            : {}),
        },
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: assetInfo => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];

            if (ext === 'css') {
              return 'assets/css/[name]-[hash][extname]';
            }
            if (['png', 'jpe?g', 'gif', 'svg', 'webp'].includes(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (['woff2?', 'ttf', 'eot', 'otf'].some(font => ext.includes(font))) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      copyPublicDir: true,
      terserOptions: isProduction
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          }
        : undefined,
    },

    // App type (Multi-Page Application)
    appType: 'mpa',

    // Public directory for static assets
    publicDir: 'public',

    // CSS configuration
    css: {
      devSourcemap: !isProduction,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },

    // Environment variables
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
  };
});
