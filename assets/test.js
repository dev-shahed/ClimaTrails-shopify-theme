document.addEventListener('DOMContentLoaded', function () {
  const colorRadios = document.querySelectorAll('.color-radio');
  const sizeRadios = document.querySelectorAll('.size-radio');
  const sizePicker = document.getElementById('size-picker');
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

  // Function to filter sizes based on selected color
  function filterSizesByColor(selectedColor) {
    const sizeLabels = sizePicker.querySelectorAll('.size-label');

    sizeLabels.forEach((label) => {
      const sizeColor = label.getAttribute('data-color');
      const sizeVariantId = label.getAttribute('data-variant-id');
      const sizeRadio = label.querySelector('.size-radio');

      if (sizeColor === selectedColor) {
        label.style.display = 'flex'; // Show the size option
        const variant = variants.find((v) => v.id === parseInt(sizeVariantId));
        if (variant.available) {
          sizeRadio.disabled = false;
          label.classList.remove('opacity-25', 'cursor-not-allowed');
        } else {
          sizeRadio.disabled = true;
          label.classList.add('opacity-25', 'cursor-not-allowed');
        }
      } else {
        label.style.display = 'none'; // Hide the size option
      }
    });
  }

  // Add event listeners to color radios
  colorRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const selectedColor = radio.value;
      filterSizesByColor(selectedColor); // Filter sizes based on selected color
      updateVariantId(); // Update the variant ID
    });
  });

  // Add event listeners to size radios
  sizeRadios.forEach((radio) => {
    radio.addEventListener('change', updateVariantId);
  });

  // Initialize on page load
  const defaultColor = document.querySelector('.color-radio:checked')?.value;
  if (defaultColor) {
    filterSizesByColor(defaultColor); // Filter sizes for the default selected color
  }
  updateVariantId(); // Update the variant ID
});
