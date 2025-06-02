document.addEventListener('DOMContentLoaded', () => {
  let data = JSON.parse(localStorage.getItem('productDetailData'));

  if (!data) {
    // 없으면 기본값 넣기
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

  const discounted = data.discounted;
  const original = data.price;
  const discountRate = data.discount;

  // ✅ 할인 가격 표시
  document.querySelectorAll('.detail__discounted-price').forEach((el) => {
    el.textContent = discounted.toLocaleString();
  });

  // ✅ 원가 표시
  document.querySelectorAll('.original-price').forEach((el) => {
    el.textContent = original.toLocaleString();
  });

  // ✅ 할인율 표시
  document.querySelectorAll('.discount-rate').forEach((el) => {
    el.textContent = discountRate;
  });

  // ✅ 브랜드명
  const brand = document.querySelector('.detail__brand');
  if (brand) brand.textContent = data.brand;

  // ✅ 상품명
  const name = document.querySelector('.detail__name');
  if (name) name.textContent = data.name;
});
