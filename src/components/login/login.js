// 로그인 버튼 클릭 시 로그인 모달 열기
document.querySelector('.login__join-button:not(.--line)').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('modalLogin').hidden = false;
  document.body.style.overflow = 'hidden';
});

// 회원가입 버튼 클릭 시 회원가입 모달 열기
document.querySelector('.login__join-button.--line').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('modalRegister').hidden = false;
  document.body.style.overflow = 'hidden';
});

// 로그인 모달 닫기(확인, 닫기 버튼)
document.querySelectorAll('#modalLogin .login__confirm-button, #modalLogin .login__close-button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.getElementById('modalLogin').hidden = true;
    document.body.style.overflow = 'auto';
  });
});

// 회원가입 모달 닫기(확인, 닫기 버튼)
document.querySelectorAll('#modalRegister .login__confirm-button, #modalRegister .login__close-button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.getElementById('modalRegister').hidden = true;
    document.body.style.overflow = 'auto';
  });
});
