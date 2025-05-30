/**
 * 페이지 로드 유틸리티
 * 사용법: loadPage('login') 또는 loadPage('register')
 */

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
    // HTML 파일 로드
    const response = await fetch(`/src/pages/output-page/${pageName}.html`);
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
    cssLink.href = `/src/pages/output-page/${pageName}.css`;
    document.head.appendChild(cssLink);

    // JavaScript 모듈 로드 및 초기화
    try {
      console.log(`[DEBUG] Loading JS module: /src/pages/output-page/${pageName}.js`);
      const module = await import(`/src/pages/output-page/${pageName}.js`);
      console.log(`[DEBUG] Loaded module:`, module);
      
      if (module && typeof module.default === 'function') {
        console.log(`[DEBUG] Initializing ${pageName} module...`);
        // 약간의 지연을 두어 DOM이 완전히 로드되도록 함
        setTimeout(() => {
          module.default();
          console.log(`[DEBUG] ${pageName} module initialized successfully`);
          
          // 모달이 있는지 확인하고 이벤트 리스너 다시 등록
          const modal = document.getElementById('modalLogin') || document.getElementById('modal');
          if (modal) {
            console.log('[DEBUG] Modal found, re-initializing event listeners');
            // 이미 모듈 초기화 함수에서 이벤트 리스너를 등록하므로 여기서는 로그만 남김
          }
        }, 50);
      } else {
        console.warn(`[WARN] ${pageName}.js does not export a default function. Module:`, module);
      }
    } catch (e) {
      console.error(`[ERROR] Failed to load/initialize ${pageName}.js:`, e);
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
