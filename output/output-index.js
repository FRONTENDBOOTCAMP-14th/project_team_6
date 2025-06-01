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
    const isProd = isProductionBuild();
    
    if (isProd) {
      // In PROD, we'll use the bundled version of the JS
      // Add a small delay to ensure the bundle has time to initialize
      // This helps with race conditions in production builds
      setTimeout(() => {
        try {
          const pageReadyEvent = new CustomEvent('pageReady', { 
            detail: { 
              pageName: pageName,
              isProduction: true
            } 
          });
          document.dispatchEvent(pageReadyEvent);
        } catch (e) {
          // Silent error in production
        }
      }, 100);
    } else {
      // In DEV, explicitly import the page-specific JS module.
      // This ensures Vite's HMR tracks the module and the module's code (event listeners) runs.
      // The actual initialization logic within the module should still be triggered by the 'pageReady' event.
      try {
        // In Vite dev server, use the correct path to the output directory
        const jsPath = `/output/${pageName}.js`;
          // Use dynamic import with the correct path
        const module = await import(/* @vite-ignore */ jsPath);
        
        // If the module has a default export, call it
        if (module && typeof module.default === 'function') {
          module.default();
        }
      } catch (e) {
        // Silent error in production
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
