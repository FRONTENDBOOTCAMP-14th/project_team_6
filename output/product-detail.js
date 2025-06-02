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

// Initialize product detail page components
function initProductDetailPage() {
  console.log('Initializing product detail page...');
  
  try {
    initInquiryRows();
    initPasswordInputs();
    console.log('Product detail page initialized successfully');
  } catch (error) {
    console.error('Error initializing product detail page:', error);
  }
}

// Export the init function to the global scope
window.initProductDetailPage = initProductDetailPage;
