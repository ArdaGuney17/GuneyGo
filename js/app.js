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
