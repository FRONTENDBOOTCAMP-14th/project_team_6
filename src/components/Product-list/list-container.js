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

  document.querySelectorAll('.product-card').forEach((card) => {
    const price = parseInt(card.dataset.price, 10);
    const discountRate = parseInt(card.dataset.discount, 10);
    const discountedPrice = price * (1 - discountRate / 100);

    card.querySelector('.discount-rate').textContent = discountRate;
    card.querySelector('.discounted-price').textContent = Math.round(discountedPrice).toLocaleString();
    card.querySelector('.original-price').textContent = price.toLocaleString();

    // 가격 텍스트 삽입
    const discountRateText = card.querySelector('.discount-rate');
    const discountedPriceText = card.querySelector('.discounted-price');
    const originalPriceText = card.querySelector('.original-price');

    if (discountRateText) discountRateText.textContent = discountRate;
    if (discountedPriceText) discountedPriceText.textContent = Math.round(discountedPrice).toLocaleString();
    if (originalPriceText) originalPriceText.textContent = price.toLocaleString();
  });
});
