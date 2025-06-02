// Image paths
const IMAGE_PATHS = {
  minusOn: '/src/assets/svg/minus-on.svg',
  minusOff: '/src/assets/svg/minus-off.svg',
  plusOn: '/src/assets/svg/plus-on.svg',
  plusOff: '/src/assets/svg/plus-off.svg',
  likeOn: '/src/assets/svg/like-on.svg',
  likeOff: '/src/assets/svg/like-off.svg',
  bellOn: '/src/assets/svg/bell-on.svg',
  bellOff: '/src/assets/svg/bell-off.svg',
};

// Initialize product price and quantity
function initProductPrice() {
  // Fixed price of 4,484 won
  const FIXED_PRICE = 4484;
  const originalPrice = FIXED_PRICE;
  const discounted = FIXED_PRICE;
  const discountRate = 0;
  
  console.log('Setting fixed price:', FIXED_PRICE + '원');
  
  console.log('Setting product prices - Original:', originalPrice, 'Discounted:', discounted, 'Rate:', discountRate);

  // Update original price (with strike-through)
  document.querySelectorAll('.detail__original-price').forEach(el => {
    el.textContent = originalPrice.toLocaleString() + '원';
  });

  // Update discounted price
  document.querySelectorAll('.detail__discounted-price').forEach(el => {
    el.textContent = discounted.toLocaleString() + '원';
  });

  // Update discount rate if element exists
  const discountRateEl = document.querySelector('.detail__discount-rate');
  if (discountRateEl) {
    discountRateEl.textContent = `${discountRate}%`;
  }

  // Also update the total price initially
  updateGlobalTotalPrice(discounted, 1);
}

// Update total price in the global section
function updateGlobalTotalPrice(discounted, qty) {
  const total = discounted * qty;
  const formattedTotal = total.toLocaleString();
  
  document.querySelectorAll('.detail__total-price-value').forEach(el => {
    el.textContent = formattedTotal + '원';
  });
  
  // Also update any other price displays that show the total
  document.querySelectorAll('.detail__total-amount').forEach(el => {
    el.textContent = formattedTotal + '원';
  });
  
  console.log('Updated total price:', formattedTotal + '원', 'for quantity:', qty);
}

// Initialize quantity controls
function initQuantityControls() {
  console.log('Initializing quantity controls...');
  // Use fixed price of 4,484 won
  const FIXED_PRICE = 4484;
  const discounted = FIXED_PRICE;
  console.log('Using fixed unit price:', FIXED_PRICE + '원');

  document.querySelectorAll('.detail__quantity-box').forEach(box => {
    const minusBtn = box.querySelector('.detail__quantity-btn--minus');
    const plusBtn = box.querySelector('.detail__quantity-btn--plus');
    const input = box.querySelector('.detail__quantity-input');
    const mirror = box.querySelector('.js-auto-width-mirror');

    if (!minusBtn || !plusBtn || !input || !mirror) return;

    // Remove any existing event listeners first
    const newPlusBtn = plusBtn.cloneNode(true);
    const newMinusBtn = minusBtn.cloneNode(true);
    plusBtn.parentNode.replaceChild(newPlusBtn, plusBtn);
    minusBtn.parentNode.replaceChild(newMinusBtn, minusBtn);

    const updatePrices = qty => {
      console.log('Updating prices for quantity:', qty);
      const total = discounted * qty;

      // Update prices in current component
      box.querySelectorAll('.detail__discounted-price').forEach(el => {
        console.log('Setting price to:', total);
        el.textContent = total.toLocaleString();
      });

      // Update global total price
      updateGlobalTotalPrice(discounted, qty);

      // Update input width
      mirror.textContent = input.value || ' ';
      input.style.width = `${mirror.offsetWidth + 2}px`;

      // Toggle button images
      const minusImg = newMinusBtn.querySelector('img');
      const plusImg = newPlusBtn.querySelector('img');

      if (minusImg) minusImg.src = qty <= 1 ? IMAGE_PATHS.minusOff : IMAGE_PATHS.minusOn;
      if (plusImg) plusImg.src = qty >= 99 ? IMAGE_PATHS.plusOff : IMAGE_PATHS.plusOn;
    };

    const initialQty = parseInt(input.value, 10) || 1;
    input.value = initialQty;
    updatePrices(initialQty);

    // Add new event listeners
    newPlusBtn.addEventListener('click', e => {
      console.log('Plus button clicked');
      e.stopPropagation();
      let qty = parseInt(input.value, 10) || 1;
      console.log('Current quantity:', qty);
      if (qty < 99) {
        qty++;
        console.log('New quantity after increment:', qty);
        input.value = qty;
        updatePrices(qty);
      } else {
        console.log('Maximum quantity (99) reached');
      }
    });

    newMinusBtn.addEventListener('click', e => {
      console.log('Minus button clicked');
      e.stopPropagation();
      let qty = parseInt(input.value, 10) || 1;
      console.log('Current quantity:', qty);
      if (qty > 1) {
        qty--;
        console.log('New quantity after decrement:', qty);
        input.value = qty;
        updatePrices(qty);
      } else {
        console.log('Minimum quantity (1) reached');
      }
    });
  });
}

// Initialize like button toggle
function initLikeButtons() {
  document.querySelectorAll('.detail__action-btn--like').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      if (!img) return;

      const isActive = btn.classList.toggle('is-active');
      img.src = isActive ? IMAGE_PATHS.likeOn : IMAGE_PATHS.likeOff;
    });
  });
}

// Initialize bell button toggle
function initBellButtons() {
  document.querySelectorAll('.detail__action-btn--bell').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      if (!img) return;

      const isActive = btn.classList.toggle('is-active');
      img.src = isActive ? IMAGE_PATHS.bellOn : IMAGE_PATHS.bellOff;
    });
  });
}

// Initialize inquiry rows toggle functionality
function initInquiryRows() {
  const titleButtons = document.querySelectorAll('.inquire__row button');

  titleButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const currentRow = e.target.closest('tr');
      let detailRow = currentRow.nextElementSibling;

      // Find the next detail row
      while (detailRow && !detailRow.classList.contains('inquire__detail-row')) {
        detailRow = detailRow.nextElementSibling;
      }

      if (detailRow) {
        const isAlreadyOpen = !detailRow.hidden;

        // Close all detail rows first
        document.querySelectorAll('.inquire__detail-row').forEach(row => {
          row.hidden = true;
        });

        // Toggle the clicked row if it wasn't open
        if (!isAlreadyOpen) {
          detailRow.hidden = false;
        }
      }
    });
  });
}

// Initialize password input validation
function initPasswordInputs() {
  const passwordInputs = document.querySelectorAll('input.inquire__password-input');

  // Add error message styles if they don't exist
  if (!document.getElementById('error-message-styles')) {
    const style = document.createElement('style');
    style.id = 'error-message-styles';
    style.textContent = `
      .error-message {
        color: #f44336;
        font-size: 12px;
        margin-top: 4px;
        padding: 4px 8px;
        background-color: #ffebee;
        border-radius: 4px;
        display: inline-block;
        animation: fadeIn 0.3s ease-in-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  passwordInputs.forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        input.value = '';
        let errorMessage = input.nextElementSibling;

        // Create error message if it doesn't exist
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
          errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          errorMessage.textContent = '비밀번호가 틀렸습니다.';
          input.parentNode.insertBefore(errorMessage, input.nextSibling);
        }

        // Show error message temporarily
        errorMessage.style.display = 'inline-block';
        setTimeout(() => {
          errorMessage.style.display = 'none';
          input.value = '';
        }, 2000);
      }
    });
  });
}

// Initialize product data (simplified with fixed price)
function initProductData() {
  console.log('Using fixed price of 4,484 won');
  return {
    originalPrice: '4484',
    discounted: '4484',
    discountRate: '0'
  };
}

// Initialize product detail page components
function initProductDetailPage() {
  console.log('Initializing product detail page...');

  try {
    // Ensure product data is initialized
    initProductData();
    // Initialize product price and quantity
    initProductPrice();
    initQuantityControls();

    // Initialize interactive buttons
    initLikeButtons();
    initBellButtons();

    // Initialize inquiry section
    initInquiryRows();
    initPasswordInputs();

    console.log('Product detail page initialized successfully');
  } catch (error) {
    console.error('Error initializing product detail page:', error);
  }
}

// Export the init function to the global scope
window.initProductDetailPage = initProductDetailPage;

// Initialize when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductDetailPage);
} else {
  initProductDetailPage();
}
