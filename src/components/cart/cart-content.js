document.addEventListener('DOMContentLoaded', () => {
  let data = JSON.parse(localStorage.getItem('productDetailData'));

  if (!data || typeof data.discounted !== 'number') {
    // ✅ 기본값 세팅 (탱탱쫄면)
    const price = 5900;
    const discount = 24;
    const discounted = Math.round(price * (1 - discount / 100));

    data = {
      name: '탱탱쫄면',
      brand: '[풀무원]',
      price,
      discount,
      discounted,
    };

    localStorage.setItem('productDetailData', JSON.stringify(data));
  }

  const unitPrice = data.discounted;

  document.querySelectorAll('.cart-product').forEach((product) => {
    const minusBtn = product.querySelector('.cart-product__quantity-btn--minus');
    const plusBtn = product.querySelector('.cart-product__quantity-btn--plus');
    const input = product.querySelector('.cart-product__quantity-input');
    const mirror = product.querySelector('.js-auto-width-mirror');

    const minusImg = minusBtn?.querySelector('img');
    const plusImg = plusBtn?.querySelector('img');

    const priceEl = product.querySelector('.cart-product__total-price');

    const MIN = 1;
    const MAX = 99;

    const minusOn = '../../assets/svg/minus-on.svg';
    const minusOff = '../../assets/svg/minus-off.svg';
    const plusOn = '../../assets/svg/plus-on.svg';
    const plusOff = '../../assets/svg/plus-off.svg';

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
