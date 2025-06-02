document.addEventListener('DOMContentLoaded', () => {
  const titleButtons = document.querySelectorAll('.inquire__row button');

  titleButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const currentRow = e.target.closest('tr');
      let detailRow = currentRow.nextElementSibling;

      while (detailRow && !detailRow.classList.contains('inquire__detail-row')) {
        detailRow = detailRow.nextElementSibling;
      }

      if (detailRow) {
        const isAlreadyOpen = !detailRow.hidden;

        document.querySelectorAll('.inquire__detail-row').forEach((row) => {
          row.hidden = true;
        });

        if (!isAlreadyOpen) {
          detailRow.hidden = false;
        }
      }
    });
  });

  const passwordInputs = document.querySelectorAll('input.inquire__password-input');

  passwordInputs.forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        input.value = '';
        let errorMessage = input.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
          errorMessage = document.createElement('div');
          errorMessage.className = 'error-message';
          errorMessage.textContent = '비밀번호가 틀렸습니다.';
          input.parentNode.insertBefore(errorMessage, input.nextSibling);

          const style = document.createElement('style');
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

        errorMessage.style.display = 'inline-block';

        setTimeout(() => {
          errorMessage.style.display = 'none';
          input.value = '';
        }, 2000);
      }
    });
  });
});
