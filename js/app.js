// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileBtn.addEventListener('click', function() {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    this.querySelector('i').classList.toggle('fa-times');
  });

  // Close menu when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.style.display = 'none';
      mobileBtn.querySelector('i').classList.remove('fa-times');
    });
  });

  // Auto-close menu on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navLinks.style.display = 'flex';
    } else {
      navLinks.style.display = 'none';
      mobileBtn.querySelector('i').classList.remove('fa-times');
    }
  });
});
