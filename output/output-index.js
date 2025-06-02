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
        _isProdEnvironment =
          !window.location.hostname.includes('localhost') &&
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

// 네비게이션 링크 이벤트 처리
document.addEventListener('click', e => {
  // 로그인/회원가입 버튼 처리
  const loginBtn = e.target.closest('[data-page="login"]');
  const registerBtn = e.target.closest('[data-page="register"]');

  // 상품 목록 버튼 처리
  const productListBtn = e.target.closest('[data-page="product-list"]');

  if (loginBtn) {
    e.preventDefault();
    window.location.hash = 'login';
  } else if (registerBtn) {
    e.preventDefault();
    window.location.hash = 'register';
  } else if (productListBtn) {
    e.preventDefault();
    const category = productListBtn.dataset.category;
    window.location.hash = `product-list?category=${category}`;
  }
});

// URL 해시 변경 시 페이지 로드
window.addEventListener('hashchange', () => {
  const page = window.location.hash.replace('#', '') || 'home';
  loadPage(page);
});

// 초기 페이지 로드
document.addEventListener('DOMContentLoaded', () => {
  const initialPage = window.location.hash.replace('#', '') || 'home';
  loadPage(initialPage);
});

// Get or create main container
function getMainContainer() {
  let container = document.querySelector('.main__container');
  if (!container) {
    container = document.createElement('main');
    container.className = 'main__container';
    document.body.appendChild(container);
  }
  return container;
}

// Get the base path without query parameters
function getBasePageName(fullPath) {
  // Remove query parameters and hash
  const basePath = fullPath.split('?')[0].split('#')[0];
  return basePath || 'home';
}

export async function loadPage(pageName) {
  console.log(`Loading page: ${pageName}`);

  // Extract the base page name without query parameters
  const basePageName = getBasePageName(pageName);
  console.log(`Base page name: ${basePageName}`);

  const container = getMainContainer();
  const originalContent = container.innerHTML;

  // Show loading indicator
  container.innerHTML = '<div class="loading">로딩 중...</div>';

  try {
    // Get paths for HTML, CSS, and JS using the base page name
    const htmlPath = getPagePath(basePageName, 'html');
    const cssPath = getPagePath(basePageName, 'css');
    const jsPath = getPagePath(basePageName, 'js');

    console.log(`Loading resources:`, { htmlPath, cssPath, jsPath });

    // 1. Load HTML
    const htmlResponse = await fetch(htmlPath);
    if (!htmlResponse.ok) {
      throw new Error(`Failed to load HTML: ${htmlResponse.status} ${htmlResponse.statusText}`);
    }
    const html = await htmlResponse.text();

    // 2. Load and inject CSS
    const existingCss = document.querySelector(`link[href="${cssPath}"]`);
    if (!existingCss) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = cssPath;
      document.head.appendChild(cssLink);
      console.log('CSS injected');
    }

    // 3. Inject HTML
    container.innerHTML = ''; // Clear loading
    container.insertAdjacentHTML('afterbegin', html);
    console.log('HTML injected');

    // 4. Load and execute JS
    try {
      console.log(`Importing JS module: ${jsPath}`);
      await import(/* @vite-ignore */ jsPath);

      // 5. Initialize the page by calling the appropriate init function
      // Convert kebab-case to PascalCase and remove query parameters
      const normalizedPageName = basePageName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      const initFunctionName = `init${normalizedPageName}Page`;
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
          timestamp: new Date().toISOString(),
        },
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
  const hash = window.location.hash.replace('#', '') || 'home';
  loadPage(hash);
}

// 홈 버튼 클릭 핸들러
function setupHomeButton() {
  const homeButton = document.getElementById('homeButton');
  if (homeButton) {
    homeButton.addEventListener('click', e => {
      e.preventDefault();
      window.location.hash = ''; // Clear the hash to go to home
    });
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 라우트 이벤트 리스너 등록
  window.addEventListener('hashchange', handleRoute);

  // 홈 버튼 설정
  setupHomeButton();

  // 초기 페이지 로드
  handleRoute();
});
