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
  console.log('[DEBUG] login.js: initLoginPage() 함수 시작');

  // 요소 선택
  console.log('[DEBUG] login.js: DOM 요소 선택 전');
  const loginButton = document.querySelector('.login__join-button:not(.--line)');
  const registerButton = document.querySelector('.login__join-button.--line');
  const closeButton = document.querySelector('.login__close-button');
  const confirmButton = document.querySelector('.login__confirm-button');
  const modal = document.getElementById('modalLogin');
  const loginForm = document.querySelector('.login');
  const idInput = document.getElementById('login-id');
  const passwordInput = document.getElementById('login-password');

  console.log('[DEBUG] login.js: DOM 요소 선택 완료', {
    loginButton: !!loginButton,
    registerButton: !!registerButton,
    closeButton: !!closeButton,
    confirmButton: !!confirmButton,
    modal: !!modal,
    loginForm: !!loginForm,
    idInput: !!idInput,
    passwordInput: !!passwordInput,
  });

  // 이벤트 리스너 추가
  function addEventListeners() {
    console.log('[DEBUG] login.js: 이벤트 리스너 추가 시작');

    // 입력 필드에 blur 이벤트 리스너 추가
    [idInput, passwordInput].forEach((input, index) => {
      if (input) {
        console.log(
          `[DEBUG] login.js: ${index === 0 ? 'ID' : 'Password'} 입력 필드에 이벤트 리스너 추가`
        );
        input.addEventListener('blur', () => {
          console.log(`[DEBUG] login.js: ${index === 0 ? 'ID' : 'Password'} 필드 blur 이벤트 발생`);
          input.classList.add('touched');
        });
      } else {
        console.warn(
          `[WARN] login.js: ${index === 0 ? 'ID' : 'Password'} 입력 필드를 찾을 수 없음`
        );
      }
    });

    // 로그인 버튼
    if (loginButton) {
      console.log('[DEBUG] login.js: 로그인 버튼에 클릭 이벤트 리스너 추가');
      loginButton.onclick = e => {
        console.log('[DEBUG] login.js: 로그인 버튼 클릭됨');
        e.preventDefault();
        // 폼 제출 전에 모든 입력 필드에 touched 클래스 추가
        [idInput, passwordInput].forEach(input => {
          if (input) {
            console.log('[DEBUG] login.js: 입력 필드에 touched 클래스 추가');
            input.classList.add('touched');
          }
        });
        console.log('[DEBUG] login.js: 모달 열기 시도');
        openModal();
      };
    } else {
      console.warn('[WARN] login.js: 로그인 버튼을 찾을 수 없음');
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
  console.log('[DEBUG] login.js: initialize() 함수 호출됨');
  console.log('[DEBUG] login.js: DOM 상태 - readyState:', document.readyState);
  console.log('[DEBUG] login.js: initLoginPage 함수 호출 전');
  initLoginPage();
  console.log('[DEBUG] login.js: initLoginPage 함수 호출 후');
}

// 모듈 컨텍스트인지 확인 (개발 환경) 또는 스크립트 컨텍스트인지 확인 (프로덕션 환경)
const isModule = typeof module !== 'undefined' && module.exports;

console.log('[DEBUG] login.js: 스크립트 로드됨');
console.log(`[DEBUG] login.js: 현재 모드 - ${isModule ? '개발 (모듈)' : '프로덕션 (스크립트)'}`);
console.log(`[DEBUG] login.js: 현재 DOM readyState: ${document.readyState}`);

if (isModule) {
  // 개발 환경 (HMR 사용)
  console.log('[DEBUG] login.js: 개발 모드로 실행 중 (HMR 사용)');

  // 개발 환경에서는 pageReady 이벤트를 기다림
  const onDevPageReady = function (event) {
    console.log(
      '[DEBUG] login.js: 개발 환경에서 pageReady 이벤트 수신',
      event ? event.detail : '이벤트 없음'
    );
    if (!event || event.detail.pageName === 'login') {
      console.log('[DEBUG] login.js: 로그인 페이지 초기화 시작 (개발 모드)');
      document.removeEventListener('pageReady', onDevPageReady);
      initialize();
    }
  };

  console.log('[DEBUG] login.js: 개발 환경에서 pageReady 이벤트 리스너 등록');
  document.addEventListener('pageReady', onDevPageReady);
} else {
  // 프로덕션 환경 또는 직접 스크립트 로드
  console.log('[DEBUG] login.js: 프로덕션/스크립트 모드로 실행 중');

  // pageReady 이벤트 핸들러
  const onPageReady = function (event) {
    console.log(
      '[DEBUG] login.js: 프로덕션에서 pageReady 이벤트 수신',
      event ? event.detail : '이벤트 없음'
    );
    if (!event || event.detail.pageName === 'login') {
      console.log('[DEBUG] login.js: 로그인 페이지 초기화 시작 (프로덕션 모드)');
      document.removeEventListener('pageReady', onPageReady);
      initialize();
    }
  };

  console.log('[DEBUG] login.js: 프로덕션에서 pageReady 이벤트 리스너 등록');
  document.addEventListener('pageReady', onPageReady);

  // 이미 로드된 경우에는 바로 초기화 시도
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('[DEBUG] login.js: 문서가 이미 로드됨, 바로 초기화 시도');
    initialize();
  } else {
    console.log('[DEBUG] login.js: DOMContentLoaded 이벤트 대기 중');
    document.addEventListener('DOMContentLoaded', function () {
      console.log('[DEBUG] login.js: DOMContentLoaded 이벤트 발생, 초기화 시작');
      initialize();
    });
  }
}

// The initLoginPage function (defined elsewhere in this file) will be called by the event listener.
// No default export is needed as the module's functions are triggered by the event.
