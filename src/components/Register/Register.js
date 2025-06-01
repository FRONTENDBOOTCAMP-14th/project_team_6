// 전체 동의 체크 시 하위 체크박스 모두 체크/해제
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.register__form');
  if (!form) return;
  
  const allAgreement = form.querySelector('#allAgreement');
  const consentCheckboxes = form.querySelectorAll('.consentcheckbox');
  
  if (allAgreement) {
    allAgreement.addEventListener('change', function() {
      consentCheckboxes.forEach(function(checkbox) {
        checkbox.checked = this.checked;
      }, this);
    });
  }

  // 하위 체크박스 중 하나라도 해제되면 전체 동의 체크 해제, 모두 체크되면 전체 동의 체크
  if (consentCheckboxes.length > 0) {
    consentCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        if (!allAgreement) return;
        const allChecked = Array.from(consentCheckboxes).every(function(cb) {
          return cb.checked;
        });
        allAgreement.checked = allChecked;
      });
    });
  }
});
