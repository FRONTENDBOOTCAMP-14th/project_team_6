// Initialize accordion functionality
function initAccordions() {
  const accordions = document.querySelectorAll('[data-accordion]');
  let activeAccordion = null;

  const resetButton = document.querySelector('.button__filter--init');
  if (resetButton) {
    resetButton.addEventListener('click', e => {
      e.preventDefault();
      const checkboxes = document.querySelectorAll('.card__category-list .checkbox-input');
      checkboxes.forEach(checkbox => {
        const label = checkbox.closest('.checkbox-label');
        if (label) {
          const checkIcon = label.querySelector('.icon-check');
          const checkedIcon = label.querySelector('.icon-checked');
          checkbox.checked = false;
          if (checkIcon) checkIcon.style.display = 'inline-block';
          if (checkedIcon) checkedIcon.style.display = 'none';
        }
      });
    });

    document.addEventListener('change', function (e) {
      if (e.target.classList.contains('checkbox-input')) {
        const checkbox = e.target;
        const label = checkbox.closest('.checkbox-label');
        if (label) {
          const checkIcon = label.querySelector('.icon-check');
          const checkedIcon = label.querySelector('.icon-checked');
          if (checkIcon) checkIcon.style.display = checkbox.checked ? 'none' : 'inline-block';
          if (checkedIcon) checkedIcon.style.display = checkbox.checked ? 'inline-block' : 'none';
        }
      }
    });
  }

  accordions.forEach(accordion => {
    const header = accordion.querySelector('.c-accordion__header');
    if (!header) return;

    header.addEventListener('click', e => {
      e.preventDefault();
      if (accordion === activeAccordion) {
        accordion.classList.remove('active');
        activeAccordion = null;
        accordions.forEach(acc => (acc.style.display = 'block'));
      } else {
        if (activeAccordion) {
          activeAccordion.classList.remove('active');
        }
        accordion.classList.add('active');
        activeAccordion = accordion;
        accordions.forEach(acc => {
          acc.style.display = acc === accordion ? 'block' : 'none';
        });
      }
    });
  });
}

// Initialize navigation buttons
function initNavButtons() {
  const navButtons = document.querySelectorAll('.list-container__nav-btn');
  if (navButtons.length > 0) {
    navButtons[0].classList.add('active');
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }
}

// Initialize product cards
function initProductCards() {
  function productCardInit(card) {
    const price = parseInt(card.dataset.price, 10) || 0;
    const discountRate = parseInt(card.dataset.discount, 10) || 0;
    const discountedPrice = price * (1 - discountRate / 100);

    const discountRateText = card.querySelector('.discount-rate');
    const discountedPriceText = card.querySelector('.discounted-price');
    const originalPriceText = card.querySelector('.original-price');

    if (discountRateText) discountRateText.textContent = `${discountRate}`;
    if (discountedPriceText) {
      discountedPriceText.textContent = `${Math.round(discountedPrice).toLocaleString()}`;
    }
    if (originalPriceText) originalPriceText.textContent = `${price.toLocaleString()}`;

    const cartButton = card.querySelector('.product-card__cart-button');
    const cartModal = card.querySelector('.product-card__modal');
    const modalConfirmButton = card.querySelector('.product-card__modal-button--confirm');
    const modalCancelButton = card.querySelector('.product-card__modal-button--cancel');

    // Remove any existing event listeners
    const newCartButton = cartButton.cloneNode(true);
    const newModalConfirmButton = modalConfirmButton?.cloneNode(true);
    const newModalCancelButton = modalCancelButton?.cloneNode(true);

    if (cartButton && cartModal) {
      cartButton.parentNode.replaceChild(newCartButton, cartButton);
      newCartButton.addEventListener('click', () => {
        cartModal.style.display = 'flex';
      });
    }

    if (modalConfirmButton && cartModal) {
      modalConfirmButton.parentNode.replaceChild(newModalConfirmButton, modalConfirmButton);
      newModalConfirmButton.addEventListener('click', () => {
        alert('장바구니에 담았습니다!');
        cartModal.style.display = 'none';
      });
    }

    if (modalCancelButton && cartModal) {
      modalCancelButton.parentNode.replaceChild(newModalCancelButton, modalCancelButton);
      newModalCancelButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
      });
    }
  }

  document.querySelectorAll('.product-card').forEach(card => productCardInit(card));
}

// Main initialization function
function initProductListPage() {
  console.log('Initializing product list page...');

  // Initialize all components
  initAccordions();
  initNavButtons();
  initProductCards();

  console.log('Product list page initialized');
}

// Export the init function to the global scope
window.initProductListPage = initProductListPage;
