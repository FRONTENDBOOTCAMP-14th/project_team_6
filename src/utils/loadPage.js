/**
 * 페이지 로드 유틸리티
 * 사용법: loadPage('login') 또는 loadPage('register')
 */

// 개발/프로덕션 환경 감지 함수 (캐싱 및 import.meta.env.PROD 사용)
let _isProdEnvironment = null; // Module-level cache for environment detection

function isProductionBuild() {
  if (_isProdEnvironment === null) {
    // Vite's recommended way to check for production mode.
    // import.meta.env.PROD is true if 'mode' is 'production', false otherwise.
    _isProdEnvironment = import.meta.env.PROD;
    if (_isProdEnvironment) {
      console.log('[DEBUG] isProductionBuild: Detected PROD environment (via import.meta.env.PROD).');
    } else {
      console.log('[DEBUG] isProductionBuild: Detected DEV environment (via import.meta.env.PROD).');
    }
  }
  return _isProdEnvironment;
}

// 페이지 경로 생성 함수
function getPagePath(pageName, ext) {
  const prod = isProductionBuild(); // Call once to ensure consistent logging
  // console.log(`[DEBUG] getPagePath: pageName=${pageName}, ext=${ext}, isProd=${prod}`); // Log reduced for clarity

  let path;
  if (prod) { // Production environment
    if (ext === 'html') {
      // HTML files are in dist/src/pages/output-page/
      // Path relative to server root
      path = `/src/pages/output-page/${pageName}.html`;
    } else if (ext === 'css') {
      // CSS files are in dist/ (e.g., dist/login.css)
      // Path relative to server root
      path = `/${pageName}.css`;
    /* JS path resolution is no longer needed here for production,
       as JS is bundled and included via script tags in the HTML. */
    } else {
      // Fallback for unknown extensions
      console.warn(`[WARN] getPagePath: Unknown extension '${ext}' for page '${pageName}' in production.`);
      // Path relative to server root
      path = `/${pageName}.${ext}`;
    }
  } else { // Development environment
    // These are already root-relative for the dev server
    path = `/src/pages/output-page/${pageName}.${ext}`;
  }
  console.log(`[DEBUG] getPagePath resolved to: ${path}`);
  return path;
}

export async function loadPage(pageName) {
  // Try to find the container with common class names
  let container =
    document.querySelector('.main__container') ||
    document.querySelector('.main__contianer') || // Fallback for typo
    document.querySelector('main') || // Fallback to any main element
    document.body; // Last resort: use body

  // Create a container if none found
  if (!container) {
    container = document.createElement('main');
    container.className = 'main__container';
    document.body.appendChild(container);
  }

  // 로딩 중 표시 (기존 내용 저장)
  const originalContent = container.innerHTML;
  container.innerHTML = '<div class="loading">로딩 중...</div>';

  try {
    // HTML 경로 가져오기
    const htmlPath = getPagePath(pageName, 'html');
    console.log('[DEBUG] HTML 파일 경로:', htmlPath);
    
    // HTML 파일 로드
    const response = await fetch(htmlPath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const html = await response.text();

    // HTML 파싱 및 삽입
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // 기존 컨텐츠 초기화
    container.innerHTML = '';
    
    // 모든 자식 요소를 순회하면서 추가
    // 메인 컨텐츠와 모달 모두 포함
    while (doc.body.firstChild) {
      container.appendChild(doc.body.firstChild);
    }

    // CSS 로드
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = getPagePath(pageName, 'css');
    console.log('[DEBUG] CSS 경로:', cssLink.href);
    document.head.appendChild(cssLink);

    // Dispatch a custom event indicating the page content is ready (after a brief timeout)
    // This allows page-specific JS (whether dev-imported or prod-bundled) to initialize.
    setTimeout(() => {
      console.log(`[DEBUG] Dispatching 'pageReady' event for ${pageName} (after timeout)`);
      const pageReadyEvent = new CustomEvent('pageReady', { 
        detail: { pageName: pageName } 
      });
      document.dispatchEvent(pageReadyEvent);
    }, 0); // Timeout to allow injected scripts to register listeners

    // Handle page-specific JavaScript
    if (isProductionBuild()) {
      // In PROD, we'll use the bundled version of the JS
      // The page-specific code should be included in the main bundle
      console.log(`[DEBUG] PROD: Using bundled JavaScript for ${pageName}`);
      
      // Dispatch pageReady with a small delay to ensure the bundle is loaded
      // The actual initialization will be handled by the event listener in the bundle
      console.log(`[DEBUG] PROD: Dispatching 'pageReady' for ${pageName}`);
      
      // Add a small delay to ensure the bundle has time to register its event listeners
      setTimeout(() => {
        const pageReadyEvent = new CustomEvent('pageReady', { 
          detail: { pageName: pageName } 
        });
        document.dispatchEvent(pageReadyEvent);
      }, 50);
    } else {
      // In DEV, explicitly import the page-specific JS module.
      // This ensures Vite's HMR tracks the module and the module's code (event listeners) runs.
      // The actual initialization logic within the module should still be triggered by the 'pageReady' event.
      try {
        // In Vite dev server, we can use an absolute path from the project root
        const jsPath = `/src/pages/output-page/${pageName}.js`;
        console.log(`[DEBUG] DEV: Dynamically importing JS module: ${jsPath}`);
        
        // Use dynamic import with the correct path
        const module = await import(/* @vite-ignore */ jsPath);
        console.log(`[DEBUG] DEV: Module ${pageName}.js imported successfully.`);
        
        // If the module has a default export, call it
        if (module && typeof module.default === 'function') {
          module.default();
        }
      } catch (e) {
        console.error(`[ERROR] DEV: Failed to dynamically import ${pageName}.js:`, e);
      }
    }

    return true;
  } catch (error) {
    console.error(`페이지 로드 중 오류가 발생했습니다: ${pageName}`, error);
    container.innerHTML = `
      <div class="error-message">
        <p>페이지를 불러오는 중 오류가 발생했습니다.</p>
        <button onclick="location.reload()">새로고침</button>
      </div>
    `;
    // Restore original content on error
    if (originalContent) {
      container.innerHTML = originalContent;
    }
    return false;
  }
}

// URL 해시 기반 라우팅
function handleRoute() {
  const path = window.location.hash.replace('#', '') || 'login';
  loadPage(path);
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 라우트 이벤트 리스너 등록
  window.addEventListener('hashchange', handleRoute);

  // 초기 페이지 로드
  handleRoute();
});
