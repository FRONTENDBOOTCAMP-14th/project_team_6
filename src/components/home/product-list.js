// 가격과 할인율은 예시로 고정값 사용
const price = 5900;
const discountRate = 24;
const discountedPrice = price * (1 - discountRate / 100);

// 각 product-card마다 적용
document.querySelectorAll('.product-card').forEach((card) => {
  card.querySelector('.discount-rate').textContent = discountRate;
  card.querySelector('.discounted-price').textContent = Math.round(discountedPrice).toLocaleString();
  card.querySelector('.original-price').textContent = price.toLocaleString();

  const cartButton = card.querySelector('.cart-button');
  const cartModal = card.querySelector('.cart-modal');
  const yesBtn = card.querySelector('.button-yes');
  const noBtn = card.querySelector('.button-no');

  cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex';
  });

  yesBtn.addEventListener('click', () => {
    alert('장바구니에 담았습니다!');
    cartModal.style.display = 'none';
  });

  noBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
});
