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
