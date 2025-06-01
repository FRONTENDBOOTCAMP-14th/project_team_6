// 모달 열기 함수
function openModal() {
  const modal = document.getElementById('modalLogin');
  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
}

// 모달 닫기 함수
function closeModal() {
  const modal = document.getElementById('modalLogin');
  if (modal) {
    modal.hidden = true;
    document.body.style.overflow = 'auto';
  }
}

// 로그인 페이지 초기화 함수
export default function initLoginPage() {
  // 요소 선택
  const loginButton = document.querySelector('.login__join-button:not(.--line)');
  const registerButton = document.querySelector('.login__join-button.--line');
  const closeButton = document.querySelector('.login__close-button');
  const confirmButton = document.querySelector('.login__confirm-button');
  const modal = document.getElementById('modalLogin');
  const loginForm = document.querySelector('.login');
  const idInput = document.getElementById('login-id');
  const passwordInput = document.getElementById('login-password');

  // 이벤트 리스너 추가
  function addEventListeners() {

    // 입력 필드에 blur 이벤트 리스너 추가
    [idInput, passwordInput].forEach((input) => {
      if (input) {
        input.addEventListener('blur', () => {
          input.classList.add('touched');
        });
      }
    });

    // 로그인 버튼
    if (loginButton) {
      loginButton.onclick = e => {
        e.preventDefault();
        // 폼 제출 전에 모든 입력 필드에 touched 클래스 추가
        [idInput, passwordInput].forEach(input => {
          if (input) {
            input.classList.add('touched');
          }
        });
        openModal();
      };
    }

    // 회원가입 버튼
    if (registerButton) {
      registerButton.onclick = e => {
        e.preventDefault();
        window.location.hash = 'register';
      };
    }

    // 모달 닫기 버튼
    if (closeButton) {
      closeButton.onclick = closeModal;
    }

    // 확인 버튼
    if (confirmButton) {
      confirmButton.onclick = closeModal;
    }

    // 모달 외부 클릭
    if (modal) {
      modal.onclick = e => {
        if (e.target === modal) closeModal();
      };
    }

    // ESC 키로 닫기
    document.onkeydown = e => {
      if (e.key === 'Escape') closeModal();
    };
  }

  // 초기화
  addEventListeners();
}

// This function will be called when the page is ready
function initialize() {
  initLoginPage();
}

// 모듈 컨텍스트인지 확인 (개발 환경) 또는 스크립트 컨텍스트인지 확인 (프로덕션 환경)
const isModule = typeof module !== 'undefined' && module.exports;



if (isModule) {
  // 개발 환경 (HMR 사용)
  const onDevPageReady = function (event) {
    if (!event || event.detail.pageName === 'login') {
      document.removeEventListener('pageReady', onDevPageReady);
      initialize();
    }
  };

  document.addEventListener('pageReady', onDevPageReady);
} else {
  // 프로덕션 환경 또는 직접 스크립트 로드
  const onPageReady = function (event) {
    if (!event || event.detail.pageName === 'login') {
      document.removeEventListener('pageReady', onPageReady);
      initialize();
    }
  };

  document.addEventListener('pageReady', onPageReady);

  // 이미 로드된 경우에는 바로 초기화 시도
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', initialize);
  }
}

// The initLoginPage function (defined elsewhere in this file) will be called by the event listener.
// No default export is needed as the module's functions are triggered by the event.
