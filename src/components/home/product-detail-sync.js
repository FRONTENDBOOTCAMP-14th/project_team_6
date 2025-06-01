document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.product-card'); // 탱탱쫄면 카드만 있다고 가정
  if (!card) return;

  const price = parseInt(card.dataset.price, 10);
  const discount = parseInt(card.dataset.discount, 10);
  const discounted = Math.round(price * (1 - discount / 100));

  localStorage.setItem(
    'productDetailData',
    JSON.stringify({
      name: '탱탱쫄면',
      brand: '[풀무원]',
      price,
      discount,
      discounted,
    })
  );
});
