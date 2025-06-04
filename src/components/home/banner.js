const bannerImage = document.querySelector('.banner__image');
const prevBtn = document.querySelector('.banner__control-prev');
const nextBtn = document.querySelector('.banner__control-next');
const playBtn = document.querySelector('.banner__control-play');
const nowEl = document.querySelector('.banner__control-number .now');
const allEl = document.querySelector('.banner__control-number .all');

// 배너 이미지 목록
const bannerImages = ['/src/assets/webp/main-visual01.webp', '/src/assets/webp/main-visual02.webp', '/src/assets/webp/main-visual03.webp'];

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
