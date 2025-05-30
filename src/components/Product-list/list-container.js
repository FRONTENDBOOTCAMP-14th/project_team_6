document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.list-container__nav-btn');

  if (navButtons.length > 0) {
    navButtons[0].classList.add('active');
  }

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      navButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
});
