document.addEventListener('DOMContentLoaded', function () {
  const colorRadios = document.querySelectorAll('.color-radio');
  const sizeRadios = document.querySelectorAll('.size-radio');
  const variantIdInput = document.getElementById('variantId');
  const variants = JSON.parse(document.querySelector('[data-variants]').textContent);

  // Function to find the variant ID based on selected options
  function findVariantId(selectedOptions) {
    return variants.find((variant) => {
      return variant.options.every((option, index) => {
        return selectedOptions[index] === option;
      });
    })?.id;
  }

  // Function to update the selected variant ID
  function updateVariantId() {
    const selectedOptions = [];

    // Get selected color
    const selectedColor = document.querySelector('.color-radio:checked')?.value;
    if (selectedColor) {
      selectedOptions[0] = selectedColor;
    }

    // Get selected size
    const selectedSize = document.querySelector('.size-radio:checked')?.value;
    if (selectedSize) {
      selectedOptions[1] = selectedSize;
    }

    // Find the variant ID based on selected options
    const variantId = findVariantId(selectedOptions);

    // Update the hidden input field with the variant ID
    if (variantId) {
      variantIdInput.value = variantId;
    }
  }

  // Function to highlight the selected option
  function highlightSelectedOption(radios, className) {
    radios.forEach((radio) => {
      const label = radio.closest('label');
      if (radio.checked) {
        label.classList.add(className); // Add highlight class
      } else {
        label.classList.remove(className); // Remove highlight class
      }
    });
  }

  // Add event listeners to color radios
  colorRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      updateVariantId();
      highlightSelectedOption(colorRadios, 'selected-color'); // Highlight selected color
    });
  });

  // Add event listeners to size radios
  sizeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      updateVariantId();
      highlightSelectedOption(sizeRadios, 'selected-size'); // Highlight selected size
    });
  });

  // Initialize variant ID and highlight selected options on page load
  updateVariantId();
  highlightSelectedOption(colorRadios, 'selected-color');
  highlightSelectedOption(sizeRadios, 'selected-size');
});
