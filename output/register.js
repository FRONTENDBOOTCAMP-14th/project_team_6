// 모달 열기 함수
function openModal() {
  const modal = document.getElementById('modalRegister');
  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
}

// 모달 닫기 함수
function closeModal() {
  const modal = document.getElementById('modalRegister');
  if (modal) {
    modal.hidden = true;
    document.body.style.overflow = 'auto';
  }
}

// 회원가입 페이지 초기화 함수
function initRegisterPage() {
  console.log('Setting up register page...');
  // 폼 요소 찾기
  const form = document.querySelector('.register__form');
  if (!form) {
    console.log('Register form not found');
    return;
  }

  // 전체 동의 체크박스 이벤트
  const allAgreement = form.querySelector('#allAgree');
  const consentCheckboxes = form.querySelectorAll('.register__checkbox:not(#allAgree)');
  
  if (allAgreement) {
    allAgreement.addEventListener('change', function () {
      consentCheckboxes.forEach(checkbox => {
        if (checkbox !== allAgreement) { // Prevent self-triggering
          checkbox.checked = this.checked;
        }
      });
    });
  }

  // 개별 체크박스 이벤트
  if (consentCheckboxes.length > 0) {
    consentCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        if (!allAgreement) return;
        // Check if all checkboxes except allAgree are checked
        const allChecked = Array.from(consentCheckboxes)
          .filter(cb => cb !== allAgreement)
          .every(cb => cb.checked);
        allAgreement.checked = allChecked;
      });
    });
  }

  // 모달 관련 이벤트
  const closeButton = document.querySelector('.register__close-button');
  const confirmButton = document.querySelector('.register__confirm-button');
  const joinButton = document.querySelector('.register__join-button');
  const modal = document.getElementById('modalRegister');

  // 가입하기 버튼 클릭 이벤트
  if (joinButton) {
    joinButton.onclick = e => {
      e.preventDefault();
      openModal();
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

  // 모달 외부 클릭 시 닫기
  if (modal) {
    modal.onclick = e => {
      if (e.target === modal) closeModal();
    };
  }

  // ESC 키로 모달 닫기
  document.onkeydown = e => {
    if (e.key === 'Escape') closeModal();
  };

  // 주소 검색 버튼 이벤트
  const addressSearchBtn = document.querySelector('.register__button--address');
  if (addressSearchBtn) {
    addressSearchBtn.addEventListener('click', () => {
      // 주소 검색 기능 구현
      alert('주소 검색 기능은 준비 중입니다.');
    });
  }
  
  console.log('Register page setup complete');
}

// 전역에 함수 노출
window.initRegisterPage = initRegisterPage;

// 모듈 내보내기
export default initRegisterPage;
