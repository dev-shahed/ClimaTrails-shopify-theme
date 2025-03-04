document.addEventListener('DOMContentLoaded', function () {
  const colorRadios = document.querySelectorAll('input[name="color-choice"]');
  const sizeRadios = document.querySelectorAll('input[name="size-choice"]');
  const variantIdInput = document.getElementById('variantId');

  // Function to update the selected variant ID
  function updateVariantId() {
    let selectedColor = document.querySelector('input[name="color-choice"]:checked');
    let selectedSize = document.querySelector('input[name="size-choice"]:checked');

    if (selectedColor && selectedSize) {
      let selectedVariantId = selectedColor.getAttribute('data-variant-id');
      if (selectedVariantId) {
        variantIdInput.value = selectedVariantId; // Set the correct variant ID
      }
    }
  }

  // Function to update UI when a radio button is selected
  function updateSelectionUI(radioButtons) {
    radioButtons.forEach((radio) => {
      const label = radio.closest('label');
      if (radio.checked) {
        label.classList.add('ring-2', 'ring-indigo-500', 'ring-offset-2');
      } else {
        label.classList.remove('ring-2', 'ring-indigo-500', 'ring-offset-2');
      }
    });
  }

  // Add event listeners for color selection
  colorRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      updateSelectionUI(colorRadios);
      updateVariantId();
    });
  });

  // Add event listeners for size selection
  sizeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      updateSelectionUI(sizeRadios);
      updateVariantId();
    });
  });

  // Initial UI update
  updateSelectionUI(colorRadios);
  updateSelectionUI(sizeRadios);
  updateVariantId();
});
