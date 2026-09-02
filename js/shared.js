// js/shared.js
document.addEventListener('DOMContentLoaded', () => {
    // Wait a brief moment to ensure components are rendered
    setTimeout(() => {
        // --- Mobile/Desktop Menu Toggle Logic ---
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        const mobileServicesToggle = document.getElementById('mobile-services-toggle');
        const mobileServicesDropdown = document.getElementById('mobile-services-dropdown');
        
        if (mobileServicesToggle && mobileServicesDropdown) {
            mobileServicesToggle.addEventListener('click', () => {
                mobileServicesDropdown.classList.toggle('hidden');
            });
        }

        const servicesToggle = document.getElementById('services-toggle');
        const servicesMenu = document.getElementById('services-menu');
        const desktopDropdown = document.querySelector('.dropdown');

        if (desktopDropdown && servicesMenu && servicesToggle) {
            desktopDropdown.addEventListener('click', (event) => {
                event.stopPropagation();
                servicesMenu.classList.toggle('hidden');
            });

            document.addEventListener('click', (event) => {
                if (!servicesMenu.contains(event.target) && !servicesToggle.contains(event.target)) {
                    servicesMenu.classList.add('hidden');
                }
            });
        }

        if (mobileMenuBtn && mobileMenu) {
            document.addEventListener('click', (event) => {
                if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
        // --- End Menu Toggle Logic ---
    }, 100); // 100ms delay to allow component injection

    // --- SCROLL ANIMATION JAVASCRIPT logic ---
    const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: Stop observing once visible
            }
        });
    }, {
        threshold: 0.1,
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    const heroElements = document.querySelectorAll('.hero-animate-up');
    let delay = 0;
    heroElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('hero-animate-show');
        }, delay);
        delay += 200;
    });
    // --- End Scroll Animation Logic ---
});
