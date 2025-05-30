document.querySelectorAll('.product-card').forEach((card) => {
        const price = parseInt(card.dataset.price, 10);
        const discountRate = parseInt(card.dataset.discount, 10);
        const discountedPrice = price * (1 - discountRate / 100);

        card.querySelector('.discount-rate').textContent = discountRate;
        card.querySelector('.discounted-price').textContent = Math.round(discountedPrice).toLocaleString();
        card.querySelector('.original-price').textContent = price.toLocaleString();

        const cartButton = card.querySelector('.product-card__cart-button');
        const cartModal = card.querySelector('.product-card__modal');
        const yesBtn = card.querySelector('.product-card__modal-button--confirm');
        const noBtn = card.querySelector('.product-card__modal-button--cancel');

        cartButton.addEventListener('click', () => {
          cartModal.style.display = 'flex';
        });

        yesBtn.addEventListener('click', () => {
          alert('장바구니에 담았습니다!');
          cartModal.style.display = 'none';
        });

        noBtn.addEventListener('click', () => {
          cartModal.style.display = 'none';
        });
      });
