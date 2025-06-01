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
  // 전체 동의 체크박스 이벤트
  const allAgreement = document.getElementById('allAgreement');
  if (allAgreement) {
    allAgreement.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('.consentcheckbox');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    });
  }

  // 개별 체크박스 이벤트
  const consentCheckboxes = document.querySelectorAll('.consentcheckbox');
  consentCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const allChecked = Array.from(consentCheckboxes).every(cb => cb.checked);
      if (allAgreement) {
        allAgreement.checked = allChecked;
      }
    });
  });

  // 모달 관련 이벤트
  const closeButton = document.querySelector('.register__close-button');
  const confirmButton = document.querySelector('.register__confirm-button');
  const joinButton = document.querySelector('.register__join-button');
  const modal = document.getElementById('modalRegister');

  // 가입하기 버튼 클릭 이벤트
  if (joinButton) {
    joinButton.onclick = (e) => {
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
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  // ESC 키로 모달 닫기
  document.onkeydown = (e) => {
    if (e.key === 'Escape') closeModal();
  };

  // 주소 검색 버튼 이벤트
  const addressButton = document.querySelector('.register__button--address');
  if (addressButton) {
    addressButton.addEventListener('click', (e) => {
      e.preventDefault();
      // 주소 검색 API 연동 코드 추가
      alert('주소 검색 기능은 준비 중입니다.');
    });
  }

}

// 모듈 내보내기
export default initRegisterPage;
