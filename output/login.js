// 전역 함수로 모달 열기/닫기 함수 정의
window.openLoginModal = function() {
  const modal = document.getElementById('modalLogin');
  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
};

window.closeLoginModal = function() {
  const modal = document.getElementById('modalLogin');
  if (modal) {
    modal.hidden = true;
    document.body.style.overflow = 'auto';
  }
};

// 이벤트 핸들러 등록 함수
function setupLoginPage() {
  console.log('Setting up login page...');
  
  // 입력 필드에 blur 이벤트 리스너 추가
  const idInput = document.getElementById('login-id');
  const passwordInput = document.getElementById('login-password');
  
  [idInput, passwordInput].forEach((input) => {
    if (input) {
      input.onblur = function() {
        this.classList.add('touched');
      };
    }
  });

  // 로그인 버튼
  const loginButton = document.querySelector('.login__join-button:not(.--line)');
  if (loginButton) {
    loginButton.onclick = function(e) {
      e.preventDefault();
      // 폼 제출 전에 모든 입력 필드에 touched 클래스 추가
      [idInput, passwordInput].forEach(input => {
        if (input) input.classList.add('touched');
      });
      window.openLoginModal();
    };
    console.log('Login button handler attached');
  } else {
    console.log('Login button not found');
  }

  // 회원가입 버튼
  const registerButton = document.querySelector('.login__join-button.--line');
  if (registerButton) {
    registerButton.onclick = function(e) {
      e.preventDefault();
      window.location.hash = 'register';
    };
    console.log('Register button handler attached');
  } else {
    console.log('Register button not found');
  }

  // 모달 닫기 버튼
  const closeButton = document.querySelector('.login__close-button');
  if (closeButton) {
    closeButton.onclick = window.closeLoginModal;
  }

  // 확인 버튼
  const confirmButton = document.querySelector('.login__confirm-button');
  if (confirmButton) {
    confirmButton.onclick = window.closeLoginModal;
  }

  // 모달 외부 클릭
  const modal = document.getElementById('modalLogin');
  if (modal) {
    modal.onclick = function(e) {
      if (e.target === this) window.closeLoginModal();
    };
  }

  // ESC 키로 닫기
  document.onkeydown = function(e) {
    if (e.key === 'Escape') window.closeLoginModal();
  };
  
  console.log('Login page setup complete');
}

// 전역에 함수 노출
window.initLoginPage = setupLoginPage;

// 기본 내보내기
export default setupLoginPage;

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
  setupLoginPage();
});
