function initHomePage() {
  console.log('Setting up home page...');

  // Initialize product cards
  const productCards = document.querySelectorAll('.product-card');
  if (productCards.length === 0) {
    console.warn('No product cards found on the page');
    return;
  }

  productCards.forEach(card => {
    const price = parseInt(card.dataset.price, 10);
    const discountRate = parseInt(card.dataset.discount, 10);
    const discountedPrice = price * (1 - discountRate / 100);

    card.querySelector('.discount-rate').textContent = discountRate;
    card.querySelector('.discounted-price').textContent =
      Math.round(discountedPrice).toLocaleString();
    card.querySelector('.original-price').textContent = price.toLocaleString();

    // 가격 텍스트 삽입
    const discountRateText = card.querySelector('.discount-rate');
    const discountedPriceText = card.querySelector('.discounted-price');
    const originalPriceText = card.querySelector('.original-price');

    if (discountRateText) discountRateText.textContent = discountRate;
    if (discountedPriceText) {
      discountedPriceText.textContent = Math.round(discountedPrice).toLocaleString();
    }
    if (originalPriceText) originalPriceText.textContent = price.toLocaleString();

    // 모달 제어 요소들
    const cartButton = card.querySelector('.product-card__cart-button');
    const cartModal = card.querySelector('.product-card__modal');
    const modalConfirmButton = card.querySelector('.product-card__modal-button--confirm');
    const modalCancelButton = card.querySelector('.product-card__modal-button--cancel');

    // 모달 열기
    cartButton?.addEventListener('click', () => {
      cartModal.style.display = 'flex';
    });

    // 모달 확인 버튼 클릭
    modalConfirmButton?.addEventListener('click', () => {
      alert('장바구니에 담았습니다!');
      cartModal.style.display = 'none';
    });

    // 모달 취소 버튼 클릭
    modalCancelButton?.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });

    const bannerImage = document.querySelector('.banner__image');
    const prevBtn = document.querySelector('.banner__control-prev');
    const nextBtn = document.querySelector('.banner__control-next');
    const playBtn = document.querySelector('.banner__control-play');
    const nowEl = document.querySelector('.banner__control-number .now');
    const allEl = document.querySelector('.banner__control-number .all');

    // 배너 이미지 목록
    const bannerImages = [
      '/src/assets/webp/main-visual01.webp',
      '/src/assets/webp/main-visual02.webp',
      '/src/assets/webp/main-visual03.webp',
    ];

    let currentIndex = 3;
    let intervalId = null;
    const total = bannerImages.length;
    allEl.textContent = total;

    // 슬라이드 변경 함수
    function showSlide(index) {
      currentIndex = (index + total) % total;
      bannerImage.src = bannerImages[currentIndex];
      nowEl.textContent = currentIndex + 1;
    }

    // 자동 재생
    function startAutoSlide() {
      intervalId = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 4000);
      playBtn.setAttribute('aria-label', '배너 자동 재생 정지');
      playBtn.setAttribute('aria-pressed', 'false');
      playBtn.querySelector('.sr-only').textContent = '자동 재생 정지';
      playBtn.style.backgroundImage = "url('/src/assets/svg/stop.svg')";
    }

    // 일시 정지
    function stopAutoSlide() {
      clearInterval(intervalId);
      intervalId = null;
      playBtn.setAttribute('aria-label', '배너 자동 재생 시작');
      playBtn.setAttribute('aria-pressed', 'true');
      playBtn.querySelector('.sr-only').textContent = '자동 재생 시작';
      playBtn.style.backgroundImage = "url('/src/assets/svg/play.svg')";
    }

    // 버튼 이벤트 연결
    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    playBtn.addEventListener('click', () => {
      if (intervalId) {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    });

    // 초기에 재생 시작
    showSlide(currentIndex);
    startAutoSlide();
  });

  // Add any additional home page initialization code here

  console.log('Home page setup complete');
}

// Initialize the page when the script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}

// Export the init function for output-index.js
window.initHomePage = initHomePage;
