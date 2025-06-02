// 장바구니 기능 초기화 함수
const initCart = () => {
  // 아코디언 토글 기능
  const initAccordion = () => {
    document.querySelectorAll('.cart__accordion-header').forEach((btn) => {
      btn.addEventListener('click', () => {
        const content = btn.parentElement.querySelector('.cart__accordion-content');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        content.classList.toggle('hidden');

        // Down/Up 아이콘 변경
        const arrowImg = btn.querySelector('.button__down');
        if (arrowImg) {
          arrowImg.src = expanded ? '/src/assets/svg/Down.svg' : '/src/assets/svg/Up.svg';
        }
      });
    });
  };

  // 체크박스 관련 기능 초기화
  const initCheckboxes = () => {
    const allAgreement = document.getElementById('allAgreement');
    const consentCheckboxes = document.querySelectorAll('.consentcheckbox');
    const checkedCountSpan = document.getElementById('checkedCount');
    const totalCountSpan = document.getElementById('totalCount');

    if (!allAgreement || !checkedCountSpan || !totalCountSpan) return;

    // 체크된 개수 표시 업데이트 함수
    const updateCheckedCount = () => {
      const checkedCount = Array.from(consentCheckboxes).filter(cb => cb.checked).length;
      checkedCountSpan.textContent = checkedCount;
      totalCountSpan.textContent = consentCheckboxes.length;
    };

    // 전체 선택 클릭 시 모든 아코디언 펼치기/접기 + 아이콘 Up/Down으로 변경
    document.querySelectorAll('.cart__accordion-item').forEach((item) => {
      const header = item.querySelector('.cart__accordion-header');
      const content = item.querySelector('.cart__accordion-content');
      const arrowImg = header.querySelector('.button__down');

      allAgreement.addEventListener('change', () => {
        if (allAgreement.checked) {
          // 펼치기
          content.classList.remove('hidden');
          header.setAttribute('aria-expanded', 'true');
          if (arrowImg) arrowImg.src = '/src/assets/svg/Up.svg';
        } else {
          // 접기
          content.classList.add('hidden');
          header.setAttribute('aria-expanded', 'false');
          if (arrowImg) arrowImg.src = '/src/assets/svg/Down.svg';
        }
      });
    });

    // 전체 선택 클릭 시 내부 체크박스 모두 체크/해제
    allAgreement.addEventListener('change', () => {
      consentCheckboxes.forEach((cb) => {
        cb.checked = allAgreement.checked;
      });
      updateCheckedCount();
    });

    // 내부 체크박스 변경 시 전체 선택 체크박스 상태 동기화
    consentCheckboxes.forEach((cb) => {
      cb.addEventListener('change', () => {
        const allChecked = Array.from(consentCheckboxes).every(c => c.checked);
        allAgreement.checked = allChecked;
        updateCheckedCount();
      });
    });

    // 페이지 로드 시 개수 초기화
    updateCheckedCount();
  };

  // 초기화 함수들 실행
  const init = () => {
    initAccordion();
    initCheckboxes();
  };

  // DOMContentLoaded 이벤트에 초기화 함수 바인딩
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};

// 장바구니 기능 초기화 실행
initCart();
