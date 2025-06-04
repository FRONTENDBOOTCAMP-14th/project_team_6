// 장바구니 기능 초기화 함수
window.initCartPage = function () {
  // 아코디언 토글 기능
  const initAccordion = () => {
    document.querySelectorAll('.cart__accordion-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.parentElement.querySelector('.cart__accordion-content');
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        content.classList.toggle('hidden');

        // Down/Up 아이콘 변경
        const arrowImg = btn.querySelector('.button__down');
        if (arrowImg) {
          arrowImg.src = expanded ? '/src/assets/svg/Down.svg' : '/src/assets/svg/Up.svg';
        }
      });
    });
  };

  // 체크박스 관련 기능 초기화
  const initCheckboxes = () => {
    const allAgreement = document.getElementById('allAgreement');
    const consentCheckboxes = document.querySelectorAll('.consentcheckbox');
    const checkedCountSpan = document.getElementById('checkedCount');
    const totalCountSpan = document.getElementById('totalCount');

    if (!allAgreement || !checkedCountSpan || !totalCountSpan) return;

    // 체크 상태 변경 시 실행할 함수
    const handleCheckboxChange = () => {
      // 체크된 개수 업데이트
      const checkedCount = Array.from(consentCheckboxes).filter(cb => cb.checked).length;
      checkedCountSpan.textContent = checkedCount;
      totalCountSpan.textContent = consentCheckboxes.length;
      
      // 전체 선택 체크박스 상태 업데이트
      allAgreement.checked = checkedCount === consentCheckboxes.length && consentCheckboxes.length > 0;
      allAgreement.indeterminate = checkedCount > 0 && checkedCount < consentCheckboxes.length;
      
      // 가격 업데이트
      updateOrderSummary();
    };

    // 전체 선택 체크박스 이벤트
    allAgreement.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      
      // 모든 체크박스 상태 업데이트
      consentCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
      
      // 아코디언 상태 업데이트
      document.querySelectorAll('.cart__accordion-item').forEach(item => {
        const header = item.querySelector('.cart__accordion-header');
        const content = item.querySelector('.cart__accordion-content');
        const arrowImg = header?.querySelector('.button__down');
        
        if (isChecked) {
          // 펼치기
          content?.classList.remove('hidden');
          header?.setAttribute('aria-expanded', 'true');
          if (arrowImg) arrowImg.src = '/src/assets/svg/Up.svg';
        } else {
          // 접기
          content?.classList.add('hidden');
          header?.setAttribute('aria-expanded', 'false');
          if (arrowImg) arrowImg.src = '/src/assets/svg/Down.svg';
        }
      });
      
      // 상태 업데이트 및 가격 재계산
      handleCheckboxChange();
    });

    // 개별 체크박스 이벤트
    consentCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    // 초기 상태 설정
    handleCheckboxChange();
  };

  // 상품 가격 정보
  const productData = {
    name: '탱탱쫄면',
    brand: '[풀무원]',
    originalPrice: 5900,
    discountRate: 24, // 24%
  };

  // 할인 금액 계산
  productData.discountAmount = Math.round(
    productData.originalPrice * (productData.discountRate / 100)
  );
  productData.discountedPrice = productData.originalPrice - productData.discountAmount;

  // 수량 조절 기능 초기화
  const initQuantityControls = () => {
    document.querySelectorAll('.cart-product').forEach(product => {
      const minusBtn = product.querySelector('.cart-product__quantity-btn--minus');
      const plusBtn = product.querySelector('.cart-product__quantity-btn--plus');
      const input = product.querySelector('.cart-product__quantity-input');
      const mirror = product.querySelector('.js-auto-width-mirror');
      const minusImg = minusBtn?.querySelector('img');
      const plusImg = plusBtn?.querySelector('img');
      const priceEl = product.querySelector('.cart-product__total-price');
      const checkbox = product.querySelector('.consentcheckbox');
      const originalPriceEl = product.querySelector('.cart-product__price');

      const MIN = 1;
      const MAX = 99;

      const minusOn = '/src/assets/svg/minus-on.svg';
      const minusOff = '/src/assets/svg/minus-off.svg';
      const plusOn = '/src/assets/svg/plus-on.svg';
      const plusOff = '/src/assets/svg/plus-off.svg';

      // 이벤트 중복 등록 방지
      if (product._hasQuantityControl) return;
      product._hasQuantityControl = true;

      // 가격 업데이트 함수
      const updatePrice = () => {
        if (!priceEl) return;
        const quantity = parseInt(input.value) || 0;
        const totalPrice = productData.discountedPrice * quantity;

        // 개별 상품 가격 업데이트
        priceEl.textContent = totalPrice.toLocaleString();

        // 주문 요약 업데이트
        updateOrderSummary();
      };

      // 수량 변경 함수
      const updateQuantity = (change = 0) => {
        const currentQty = parseInt(input.value) || 0;
        let newQty = currentQty + change;

        if (isNaN(newQty) || newQty < MIN) newQty = MIN;
        if (newQty > MAX) newQty = MAX;

        input.value = newQty;
        
        // Update mirror element for auto-width
        if (mirror) {
          // Ensure mirror is visible for measurement
          const originalDisplay = mirror.style.display;
          mirror.style.display = 'inline-block';
          mirror.style.position = 'absolute';
          mirror.style.visibility = 'hidden';
          mirror.style.height = 'auto';
          mirror.style.width = 'auto';
          
          // Set the text content
          mirror.textContent = newQty.toString();
          
          // Force reflow and measure
          document.body.appendChild(mirror);
          const newWidth = Math.ceil(mirror.getBoundingClientRect().width);
          document.body.removeChild(mirror);
          
          // Set min width to fit at least 2 digits
          const minWidth = 24; // Adjust based on your font size
          const calculatedWidth = Math.max(newWidth, minWidth);
          
          // Apply the width with some padding
          input.style.width = `${calculatedWidth + 8}px`;
          
          // Restore original display
          mirror.style.display = originalDisplay;
          mirror.style.position = '';
          mirror.style.visibility = '';
          mirror.style.height = '';
          mirror.style.width = '';
        }

        // 버튼 상태 업데이트
        if (minusImg) {
          minusImg.src = newQty <= MIN ? minusOff : minusOn;
        }
        if (plusImg) {
          plusImg.src = newQty >= MAX ? plusOff : plusOn;
        }

        updatePrice();
      };

      if (!minusBtn || !plusBtn || !input || !mirror || !minusImg || !plusImg || !priceEl) return;

      // 초기 가격 설정
      if (originalPriceEl) {
        originalPriceEl.textContent = productData.originalPrice.toLocaleString();
      }

      // 이벤트 핸들러
      const handleMinusClick = () => updateQuantity(-1);
      const handlePlusClick = () => updateQuantity(1);
      const handleInputChange = () => {
        let qty = parseInt(input.value) || MIN;
        if (qty < MIN) qty = MIN;
        if (qty > MAX) qty = MAX;
        input.value = qty;
        updatePrice();
      };

      // 이벤트 리스너 등록 (이전 리스너 제거 후 재등록)
      minusBtn.removeEventListener('click', handleMinusClick);
      plusBtn.removeEventListener('click', handlePlusClick);
      input.removeEventListener('change', handleInputChange);

      minusBtn.addEventListener('click', handleMinusClick);
      plusBtn.addEventListener('click', handlePlusClick);
      input.addEventListener('change', handleInputChange);

      // 체크박스 변경 시 주문 요약 업데이트
      if (checkbox) {
        checkbox.removeEventListener('change', updateOrderSummary);
        checkbox.addEventListener('change', updateOrderSummary);
      }

      // 초기 수량 설정
      input.value = '1';
      if (mirror) {
        // Set up mirror element styles
        mirror.style.display = 'inline-block';
        mirror.style.position = 'absolute';
        mirror.style.visibility = 'hidden';
        mirror.style.height = 'auto';
        mirror.style.width = 'auto';
        mirror.style.padding = '0';
        mirror.style.border = '0';
        mirror.style.whiteSpace = 'pre';
        
        // Set initial content and measure
        mirror.textContent = '1';
        document.body.appendChild(mirror);
        const width = Math.max(24, Math.ceil(mirror.getBoundingClientRect().width));
        document.body.removeChild(mirror);
        
        // Apply the calculated width with some padding
        input.style.width = `${width + 8}px`;
        
        // Reset mirror styles
        mirror.style = '';
      }

      // 초기 가격 업데이트
      updatePrice();
    });
  };

  // 주문 요약 정보 업데이트 함수
  const updateOrderSummary = () => {
    const DELIVERY_FEE = 3000;
    const FREE_SHIPPING_THRESHOLD = 10000;

    let totalOriginalPrice = 0; // 상품금액 (할인 전)
    let totalDiscount = 0; // 상품할인금액

    // 체크된 상품들의 가격과 할인 금액 계산
    document.querySelectorAll('.cart-product').forEach(product => {
      const checkbox = product.querySelector('.consentcheckbox');
      if (!checkbox?.checked) return;

      const quantityEl = product.querySelector('.cart-product__quantity-input');
      if (!quantityEl) return;

      const quantity = parseInt(quantityEl.value) || 1;

      // 상품별 원가와 할인금액 계산
      totalOriginalPrice += productData.originalPrice * quantity;
      totalDiscount += productData.discountAmount * quantity;
    });

    // 할인 적용 후 금액
    const subtotal = totalOriginalPrice - totalDiscount;

    // 배송비 계산 (10,000원 이상이면 무료)
    const deliveryFee = subtotal > 0 && subtotal < 10000 ? DELIVERY_FEE : 0;
    const totalAmount = subtotal + deliveryFee;

    // UI 업데이트 함수 (ID로 직접 접근)
    const updateElementById = (id, text, prefix = '') => {
      const el = document.getElementById(id);
      if (el) el.textContent = prefix + text.toLocaleString();
    };

    // 상품금액, 상품할인금액, 배송비, 총 결제금액 업데이트
    updateElementById('total-original-price', totalOriginalPrice);
    updateElementById('total-discount', totalDiscount, '-');
    updateElementById('delivery-fee', deliveryFee);
    updateElementById('total-amount', totalAmount);

    // 포인트 계산 (1%)
    const point = Math.floor(totalAmount * 0.01);
    const pointEl = document.querySelector('.order-content__description');
    if (pointEl) {
      pointEl.textContent = `최대 ${point.toLocaleString()}원 적립 일반 0.1%`;
    }

    console.log('Order summary updated:', {
      originalPrice: totalOriginalPrice,
      discount: totalDiscount,
      subtotal,
      deliveryFee,
      totalAmount,
      point,
    });
  };

  // 체크박스 변경 및 수량 변경 시 주문 요약 업데이트
  const setupOrderSummaryListeners = () => {
    // 체크박스 변경 이벤트 리스너
    document.querySelectorAll('.consentcheckbox').forEach(checkbox => {
      checkbox.addEventListener('change', updateOrderSummary);
    });

    // 수량 변경 이벤트 리스너
    document.querySelectorAll('.cart-product__quantity-input').forEach(input => {
      input.addEventListener('change', updateOrderSummary);
    });
  };

  // 전역 모달 제어 함수들
  window.openAddressModal = function() {
    const modal = document.getElementById('modalAddress');
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeAddressModal = function() {
    const modal = document.getElementById('modalAddress');
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = 'auto';
    }
  };

  window.openOrderModal = function() {
    const modal = document.getElementById('modalOrder');
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeOrderModal = function() {
    const modal = document.getElementById('modalOrder');
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = 'auto';
    }
  };

  // 모달 기능 초기화
  const initModals = () => {
    // 모달 외부 클릭 시 닫기
    [document.getElementById('modalAddress'), document.getElementById('modalOrder')].forEach(modal => {
      if (modal) {
        modal.onclick = function(e) {
          if (e.target === this) {
            this.hidden = true;
            document.body.style.overflow = 'auto';
          }
        };
      }
    });

    // ESC 키로 닫기
    document.onkeydown = function(e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.login__modal:not([hidden])');
        if (openModal) {
          openModal.hidden = true;
          document.body.style.overflow = 'auto';
        }
      }
    };
  };

  // 초기화 함수
  const init = () => {
    initAccordion();
    initCheckboxes();
    initQuantityControls();
    initModals();
    setupOrderSummaryListeners();

    // 모든 상품 체크 해제
    document.querySelectorAll('.consentcheckbox').forEach(checkbox => {
      checkbox.checked = false;
    });

    // 초기 수량 설정
    setTimeout(() => {
      document.querySelectorAll('.cart-product__quantity-input').forEach(input => {
        input.value = '1';
        const mirror = input.nextElementSibling;
        if (mirror && mirror.classList.contains('js-auto-width-mirror')) {
          mirror.textContent = '1';
          input.style.width = `${mirror.offsetWidth + 2}px`;
        }
      });
      updateOrderSummary();
    }, 0);
  };

  // DOMContentLoaded 이벤트에 초기화 함수 바인딩
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};

// Initialize cart when the script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.initCartPage());
} else {
  window.initCartPage();
}
