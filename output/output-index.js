/**
 * 페이지 로드 유틸리티
 * 사용법: loadPage('login') 또는 loadPage('register')
 */

// 개발/프로덕션 환경 감지 함수 (여러 방법으로 환경 감지)
let _isProdEnvironment = null; // Module-level cache for environment detection

function isProductionBuild() {
  if (_isProdEnvironment === null) {
    try {
      // 1. Vite 환경 변수 확인 (Vite 빌드 시)
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        _isProdEnvironment = import.meta.env.PROD === true;
      } 
      // 2. Node.js 환경 변수 확인 (빌드 타임)
      else if (typeof process !== 'undefined' && process.env) {
        _isProdEnvironment = process.env.NODE_ENV === 'production';
      }
      // 3. URL을 통한 확인 (런타임)
      else if (typeof window !== 'undefined' && window.location) {
        _isProdEnvironment = !window.location.hostname.includes('localhost') && 
                           !window.location.hostname.includes('127.0.0.1');
      }
      // 4. 기본값 (안전하게 개발 모드로 설정)
      else {
        _isProdEnvironment = false;
      }
    } catch (e) {
      _isProdEnvironment = false;
    }
  }
  return _isProdEnvironment;
}

// 페이지 경로 생성 함수
function getPagePath(pageName, ext) {
  // Always use absolute paths from the output directory
  return `/output/${pageName}.${ext}`;
}

// 로그인/회원가입 링크 이벤트 처리
document.addEventListener('click', (e) => {
  const loginBtn = e.target.closest('[data-page="login"]');
  const registerBtn = e.target.closest('[data-page="register"]');
  
  if (loginBtn) {
    e.preventDefault();
    window.location.hash = 'login';
  } else if (registerBtn) {
    e.preventDefault();
    window.location.hash = 'register';
  }
});

// URL 해시 변경 시 페이지 로드
window.addEventListener('hashchange', () => {
  const page = window.location.hash.replace('#', '') || 'login';
  loadPage(page);
});

// 초기 페이지 로드
document.addEventListener('DOMContentLoaded', () => {
  const initialPage = window.location.hash.replace('#', '') || 'login';
  loadPage(initialPage);
});

export async function loadPage(pageName) {
  console.log(`Loading page: ${pageName}`);
  
  // Try to find the container with common class names
  let container = document.querySelector('.main__container') || document.body;
  const originalContent = container.innerHTML;
  
  // Show loading indicator
  container.innerHTML = '<div class="loading">로딩 중...</div>';

  try {
    // Get paths for HTML, CSS, and JS
    const htmlPath = getPagePath(pageName, 'html');
    const cssPath = getPagePath(pageName, 'css');
    const jsPath = getPagePath(pageName, 'js');
    
    console.log(`Loading resources:`, { htmlPath, cssPath, jsPath });

    // 1. Load HTML
    const htmlResponse = await fetch(htmlPath);
    if (!htmlResponse.ok) {
      throw new Error(`Failed to load HTML: ${htmlResponse.status} ${htmlResponse.statusText}`);
    }
    const html = await htmlResponse.text();

    // 2. Load and inject CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = cssPath;
    document.head.appendChild(cssLink);
    console.log('CSS injected');

    // 3. Inject HTML
    container.innerHTML = html;
    console.log('HTML injected');

    // 4. Load and execute JS
    try {
      console.log(`Importing JS module: ${jsPath}`);
      await import(/* @vite-ignore */ jsPath);
      
      // 5. Initialize the page by calling the appropriate init function
      const initFunctionName = `init${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page`;
      if (window[initFunctionName] && typeof window[initFunctionName] === 'function') {
        console.log(`Calling ${initFunctionName}...`);
        window[initFunctionName]();
      } else {
        console.warn(`No initialization function found: ${initFunctionName}`);
      }
      
      // 6. Dispatch pageReady event for any components that need it
      const event = new CustomEvent('pageReady', { 
        detail: { 
          pageName: pageName,
          timestamp: new Date().toISOString()
        } 
      });
      document.dispatchEvent(event);
      console.log(`Page ${pageName} initialized`);
      
    } catch (jsError) {
      console.error('Error loading/executing page script:', jsError);
      throw jsError;
    }

    return true;
  } catch (error) {
    console.error('Error loading page:', error);
    container.innerHTML = `
      <div class="error-message">
        <p>페이지를 불러오는 중 오류가 발생했습니다.</p>
        <p>${error.message}</p>
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
