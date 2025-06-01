document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('productDetailData'));
  if (!data || typeof data.discounted !== 'number') return;

  const unitPrice = data.discounted;

  document.querySelectorAll('.cart-product').forEach((product) => {
    const minusBtn = product.querySelector('.cart-product__quantity-btn--minus');
    const plusBtn = product.querySelector('.cart-product__quantity-btn--plus');
    const input = product.querySelector('.cart-product__quantity-input');
    const mirror = product.querySelector('.js-auto-width-mirror');

    const minusImg = minusBtn.querySelector('img');
    const plusImg = plusBtn.querySelector('img');

    const priceEl = product.querySelector('.cart-product__total-price');

    const MIN = 1;
    const MAX = 99;

    const minusOn = '/src/assets/svg/minus-on.svg';
    const minusOff = '/src/assets/svg/minus-off.svg';
    const plusOn = '/src/assets/svg/plus-on.svg';
    const plusOff = '/src/assets/svg/plus-off.svg';

    if (!minusBtn || !plusBtn || !input || !mirror || !minusImg || !plusImg || !priceEl) return;

    const update = (qty) => {
      input.value = qty;
      mirror.textContent = qty.toString();
      input.style.width = `${mirror.offsetWidth + 2}px`;

      minusImg.src = qty <= MIN ? minusOff : minusOn;
      plusImg.src = qty >= MAX ? plusOff : plusOn;

      const total = unitPrice * qty;
      priceEl.textContent = total.toLocaleString();
    };

    let qty = parseInt(input.value, 10) || 1;
    update(qty);

    plusBtn.addEventListener('click', () => {
      if (qty < MAX) {
        qty++;
        update(qty);
      }
    });

    minusBtn.addEventListener('click', () => {
      if (qty > MIN) {
        qty--;
        update(qty);
      }
    });
  });
});
