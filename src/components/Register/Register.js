// 전체 동의 체크 시 하위 체크박스 모두 체크/해제
document.getElementById('allAgreement').addEventListener('change', function () {
  var checkboxes = document.querySelectorAll('.consentcheckbox');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = document.getElementById('allAgreement').checked;
  });
});

// 하위 체크박스 중 하나라도 해제되면 전체 동의 체크 해제, 모두 체크되면 전체 동의 체크
var consentCheckboxes = document.querySelectorAll('.consentcheckbox');
consentCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    var allChecked = Array.from(consentCheckboxes).every(function (cb) {
      return cb.checked;
    });
    document.getElementById('allAgreement').checked = allChecked;
  });
});

// 가입하기 버튼 클릭 시 모달창 열기
var registerBtn = document.querySelector('.register__join-button');
if (registerBtn) {
  registerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var modal = document.getElementById('modalRegister');
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  });
}

// 모달 닫기(확인, 닫기 버튼)
document.querySelectorAll('#modalRegister .register__confirm-button, #modalRegister .register__close-button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var modal = document.getElementById('modalRegister');
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = 'auto';
    }
  });
});
