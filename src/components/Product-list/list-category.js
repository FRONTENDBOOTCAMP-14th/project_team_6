document.addEventListener('DOMContentLoaded', () => {
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

      void document.body.offsetHeight;
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
});
