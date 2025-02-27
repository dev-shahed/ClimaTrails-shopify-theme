document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.group');

  navItems.forEach((item) => {
    const link = item.querySelector('a');
    const dropdown = item.querySelector('div.absolute');

    if (dropdown) {
      // Handle hover for larger screens
      item.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) {
          dropdown.classList.add('opacity-100', 'visible');
          dropdown.classList.remove('opacity-0', 'invisible');
        }
      });

      item.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 1024) {
          dropdown.classList.add('opacity-0', 'invisible');
          dropdown.classList.remove('opacity-100', 'visible');
        }
      });

      // Handle click for mobile devices
      link.addEventListener('click', (event) => {
        if (window.innerWidth < 1024) {
          event.preventDefault(); // Prevent navigation
          dropdown.classList.toggle('opacity-100');
          dropdown.classList.toggle('visible');
          dropdown.classList.toggle('opacity-0');
          dropdown.classList.toggle('invisible');
        }
      });
    }
  });

  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector('#mobile-menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');

  // Toggle mobile menu visibility
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden'); // Toggle the hidden class
    });
  }

  // Mobile submenu toggle functionality
  const submenuToggles = document.querySelectorAll('.submenu-toggle');

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const submenu = this.nextElementSibling;
      const icon = this.querySelector('.submenu-icon');

      if (submenu) {
        submenu.classList.toggle('hidden');
        icon.classList.toggle('rotate-180'); // Rotate the icon when toggled
      }
    });
  });
});
