// main.js

// This function contains all event listeners and logic for the dynamically loaded HTML
function initializePageContent() {

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Mobile services dropdown toggle
  const mobileServicesToggle = document.getElementById('mobile-services-toggle');
  const mobileServicesDropdown = document.getElementById('mobile-services-dropdown');
  if (mobileServicesToggle && mobileServicesDropdown) {
    mobileServicesToggle.addEventListener('click', () => {
      mobileServicesDropdown.classList.toggle('hidden');
    });
  }

  // Desktop dropdown menu toggle
  const servicesToggle = document.getElementById('services-toggle');
  const servicesMenu = document.getElementById('services-menu');
  if (servicesToggle && servicesMenu) {
    servicesToggle.addEventListener('click', (event) => {
      event.preventDefault();
      servicesMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!servicesToggle.contains(event.target) && !servicesMenu.contains(event.target)) {
        servicesMenu.classList.add('hidden');
      }
    });
  }

  // Contact Form Submission (This code should be in the `main.js` as it is on the home page)
  const contactForm = document.getElementById('contactForm');
  const formSubmissionMessage = document.getElementById('formSubmissionMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const messageDiv = formSubmissionMessage;

      messageDiv.classList.remove('hidden');
      messageDiv.textContent = 'Mesajınız gönderiliyor...';
      messageDiv.style.backgroundColor = '#59CDD1';

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      }).then(response => {
        messageDiv.textContent = 'Başarılı! Mesajınız gönderildi.';
        messageDiv.style.backgroundColor = '#4CAF50';
        contactForm.reset();
      }).catch(error => {
        messageDiv.textContent = 'Hata! Mesaj gönderilemedi.';
        messageDiv.style.backgroundColor = '#f44336';
      }).finally(() => {
        setTimeout(() => {
          messageDiv.classList.add('hidden');
        }, 5000);
      });
    });
  }

  // SCROLL ANIMATION JAVASCRIPT
  const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
  });

  animateElements.forEach(element => {
    observer.observe(element);
  });

  // ON-LOAD HERO SECTION ANIMATION JAVASCRIPT
  const heroElements = document.querySelectorAll('.hero-animate-up');
  let delay = 0;
  heroElements.forEach(element => {
    setTimeout(() => {
      element.classList.add('hero-animate-show');
    }, delay);
    delay += 200;
  });
}
