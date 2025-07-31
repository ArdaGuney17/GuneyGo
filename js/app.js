document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const menuIcon = mobileBtn.querySelector('i');

  mobileBtn.addEventListener('click', function() {
    // Toggle menu visibility
    navLinks.classList.toggle('active');

    // Change icon between bars and times
    if (navLinks.classList.contains('active')) {
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-times');
    } else {
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    });
  });

  // Auto-close menu when resizing to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const menuIcon = mobileBtn.querySelector('i');

  // New: Dropdown elements
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const dropdownArrow = document.querySelector('.dropdown-arrow');


  mobileBtn.addEventListener('click', function() {
    // Toggle menu visibility
    navLinks.classList.toggle('active');

    // Change icon between bars and times
    if (navLinks.classList.contains('active')) {
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-times');
    } else {
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
      // Hide dropdown if mobile menu closes
      dropdownMenu.classList.remove('active');
      dropdownArrow.classList.remove('fa-chevron-up');
      dropdownArrow.classList.add('fa-chevron-down');
    }
  });

  // Close menu when clicking on nav links (including dropdown items)
  document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
      // Hide dropdown when any menu item is clicked
      dropdownMenu.classList.remove('active');
      dropdownArrow.classList.remove('fa-chevron-up');
      dropdownArrow.classList.add('fa-chevron-down');
    });
  });

  // New: Handle dropdown toggle click
  if (dropdownToggle) { // Check if dropdownToggle exists
    dropdownToggle.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default link behavior
      // Only toggle dropdown on desktop or when mobile menu is active
      if (window.innerWidth > 768 || navLinks.classList.contains('active')) {
        dropdownMenu.classList.toggle('active');
        dropdownArrow.classList.toggle('fa-chevron-down');
        dropdownArrow.classList.toggle('fa-chevron-up');
      }
    });
  }


  // Auto-close mobile menu and dropdown when resizing to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('fa-times');
      menuIcon.classList.add('fa-bars');
      // Ensure dropdown is hidden when returning to desktop view if it was open from mobile
      dropdownMenu.classList.remove('active');
      dropdownArrow.classList.remove('fa-chevron-up');
      dropdownArrow.classList.add('fa-chevron-down');
    }
  });

  // New: Close dropdown if clicked outside
  document.addEventListener('click', function(event) {
    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('active');
      dropdownArrow.classList.remove('fa-chevron-up');
      dropdownArrow.classList.add('fa-chevron-down');
    }
  });
});
