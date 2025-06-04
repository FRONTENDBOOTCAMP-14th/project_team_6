// 아코디언 토글 기능
document.querySelectorAll('.cart__accordion-header').forEach(function (btn) {
  btn.addEventListener('click', function () {
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

// 전체 선택 체크박스와 내부 체크박스 동기화
const allAgreement = document.getElementById('allAgreement');
const consentCheckboxes = document.querySelectorAll('.consentcheckbox');
const checkedCountSpan = document.getElementById('checkedCount');
const totalCountSpan = document.getElementById('totalCount');

// 전체 선택 클릭 시 모든 아코디언 펼치기/접기 + 아이콘 Up/Down으로 변경
document.querySelectorAll('.cart__accordion-item').forEach(function (item) {
  const header = item.querySelector('.cart__accordion-header');
  const content = item.querySelector('.cart__accordion-content');
  const arrowImg = header.querySelector('.button__down');

  allAgreement.addEventListener('change', function () {
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
allAgreement.addEventListener('change', function () {
  consentCheckboxes.forEach(function (cb) {
    cb.checked = allAgreement.checked;
  });
  updateCheckedCount();
});

// 내부 체크박스 변경 시 전체 선택 체크박스 상태 동기화
consentCheckboxes.forEach(function (cb) {
  cb.addEventListener('change', function () {
    const allChecked = Array.from(consentCheckboxes).every(function (c) {
      return c.checked;
    });
    allAgreement.checked = allChecked;
    updateCheckedCount();
  });
});

// 체크된 개수 표시 업데이트 함수
function updateCheckedCount() {
  const checkedCount = Array.from(consentCheckboxes).filter((cb) => cb.checked).length;
  checkedCountSpan.textContent = checkedCount;
  totalCountSpan.textContent = consentCheckboxes.length;
}

// 페이지 로드 시 개수 초기화
updateCheckedCount();

// 배송지 변경 버튼 클릭 시 모달 열기
var addressBtn = document.querySelector('.cart__button.--line');
if (addressBtn) {
  addressBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var modal = document.getElementById('modalCart');
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  });
}

// 배송지 변경 모달 닫기
document.querySelectorAll('#modalCart .location__confirm-button, #modalCart .location__close-button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var modal = document.getElementById('modalCart');
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = 'auto';
    }
  });
});

// 주문하기 버튼 클릭 시 모달 열기
var orderBtn = document.querySelector('.cart__button:not(.--line)');
if (orderBtn) {
  orderBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var modal = document.getElementById('modalOrder');
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  });
}

// 주문하기 모달 닫기
document.querySelectorAll('#modalOrder .location__confirm-button, #modalOrder .location__close-button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var modal = document.getElementById('modalOrder');
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = 'auto';
    }
  });
});
