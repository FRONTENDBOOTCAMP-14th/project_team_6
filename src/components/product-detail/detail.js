document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('productDetailData'));
  const discounted = data ? parseInt(data.discounted, 10) : 0;
  if (!discounted) return;

  // ✅ 이미지 경로 상수
  const minusOn = '../../assets/svg/minus-on.svg';
  const minusOff = '../../assets/svg/minus-off.svg';
  const plusOn = '../../assets/svg/plus-on.svg';
  const plusOff = '../../assets/svg/plus-off.svg';
  const likeOn = '../../assets/svg/like-on.svg';
  const likeOff = '../../assets/svg/like-off.svg';
  const bellOn = '../../assets/svg/bell-on.svg';
  const bellOff = '../../assets/svg/bell-off.svg';

  // ✅ .detail__main-info 내부 할인 가격 전체 반영
  document.querySelectorAll('.detail__main-info .detail__discounted-price').forEach((el) => {
    el.textContent = discounted.toLocaleString();
  });

  // ✅ 총 상품 금액 영역 업데이트
  const updateGlobalTotalPrice = (qty) => {
    const total = discounted * qty;
    document.querySelectorAll('.detail__total-price-value').forEach((el) => {
      el.textContent = total.toLocaleString();
    });
  };

  // ✅ 각 수량 컴포넌트 반복 처리
  document.querySelectorAll('.detail__quantity-box').forEach((box) => {
    const minusBtn = box.querySelector('.detail__quantity-btn--minus');
    const plusBtn = box.querySelector('.detail__quantity-btn--plus');
    const input = box.querySelector('.detail__quantity-input');
    const mirror = box.querySelector('.js-auto-width-mirror');

    if (!minusBtn || !plusBtn || !input || !mirror) return;

    const updatePrices = (qty) => {
      const total = discounted * qty;

      // 현재 컴포넌트 내 가격 표시들 업데이트
      box.querySelectorAll('.detail__discounted-price').forEach((el) => {
        el.textContent = total.toLocaleString();
      });

      // 총 상품금액 반영
      updateGlobalTotalPrice(qty);

      // input 너비 업데이트
      mirror.textContent = input.value || ' ';
      input.style.width = `${mirror.offsetWidth + 2}px`;

      // 이미지 토글 처리
      const minusImg = minusBtn.querySelector('img');
      const plusImg = plusBtn.querySelector('img');

      minusImg.src = qty <= 1 ? minusOff : minusOn;
      plusImg.src = qty >= 99 ? plusOff : plusOn;
    };

    const initialQty = parseInt(input.value, 10) || 1;
    input.value = initialQty;
    updatePrices(initialQty);

    plusBtn.addEventListener('click', () => {
      let qty = parseInt(input.value, 10);
      if (qty < 99) {
        qty++;
        input.value = qty;
        updatePrices(qty);
      }
    });

    minusBtn.addEventListener('click', () => {
      let qty = parseInt(input.value, 10);
      if (qty > 1) {
        qty--;
        input.value = qty;
        updatePrices(qty);
      }
    });
  });

  // ✅ 찜 버튼 토글
  document.querySelectorAll('.detail__action-btn--like').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      const isActive = btn.classList.toggle('is-active');
      img.src = isActive ? likeOn : likeOff;
    });
  });

  // ✅ 알림 버튼 토글
  document.querySelectorAll('.detail__action-btn--bell').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      const isActive = btn.classList.toggle('is-active');
      img.src = isActive ? bellOn : bellOff;
    });
  });
});
