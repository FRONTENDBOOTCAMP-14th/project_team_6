document.addEventListener('DOMContentLoaded', () => {
  // 1. nav 버튼 처리
  const navButtons = document.querySelectorAll('.list-container__nav-btn');
  if (navButtons.length > 0) navButtons[0].classList.add('active');
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      navButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // 2. product-card 초기화 함수 내부 선언
  function productCardInit(card) {
    const price = parseInt(card.dataset.price, 10);
    const discountRate = parseInt(card.dataset.discount, 10);
    const discountedPrice = price * (1 - discountRate / 100);

    const discountRateText = card.querySelector('.discount-rate');
    const discountedPriceText = card.querySelector('.discounted-price');
    const originalPriceText = card.querySelector('.original-price');

    if (discountRateText) discountRateText.textContent = discountRate;
    if (discountedPriceText) discountedPriceText.textContent = Math.round(discountedPrice).toLocaleString();
    if (originalPriceText) originalPriceText.textContent = price.toLocaleString();

    const cartButton = card.querySelector('.product-card__cart-button');
    const cartModal = card.querySelector('.product-card__modal');
    const modalConfirmButton = card.querySelector('.product-card__modal-button--confirm');
    const modalCancelButton = card.querySelector('.product-card__modal-button--cancel');

    cartButton?.addEventListener('click', () => {
      if (cartModal) cartModal.style.display = 'flex';
    });

    modalConfirmButton?.addEventListener('click', () => {
      alert('장바구니에 담았습니다!');
      if (cartModal) cartModal.style.display = 'none';
    });

    modalCancelButton?.addEventListener('click', () => {
      if (cartModal) cartModal.style.display = 'none';
    });
  }

  // 3. 초기화 실행
  document.querySelectorAll('.product-card').forEach(productCardInit);
});
