// js/shared.js

// --- Floating "Send us an Email" button (rendered on every page) ---
function renderFloatingMailButton() {
    if (document.getElementById('floating-buttons-container')) return; // already present, don't duplicate

    if (!document.getElementById('floating-mail-button-styles')) {
        const style = document.createElement('style');
        style.id = 'floating-mail-button-styles';
        style.textContent = `
            .floating-btn-container {
                position: fixed;
                bottom: 24px;
                right: 16px;
                z-index: 50;
                display: flex;
                flex-direction: column;
                row-gap: 12px;
            }
            @media (min-width: 768px) {
                .floating-btn-container { right: 32px; bottom: 32px; }
            }
            .floating-btn {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .pulse-mail { animation: mail-wiggle 4s ease-in-out infinite; }
            @keyframes mail-wiggle {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.05) rotate(2deg); }
                50% { transform: scale(1.05) rotate(-2deg); }
                75% { transform: scale(1.05) rotate(2deg); }
            }
        `;
        document.head.appendChild(style);
    }

    const container = document.createElement('div');
    container.id = 'floating-buttons-container';
    container.className = 'floating-btn-container animate-on-scroll-right';
    container.innerHTML = `
        <a href="mailto:artunhcc@gmail.com" class="floating-btn bg-orange-500/70 text-white shadow-xl hover:bg-orange-600 transition duration-300 transform hover:scale-110 pulse-mail" aria-label="Send us an Email">
            <i class="fas fa-envelope text-xl"></i>
        </a>
    `;
    document.body.appendChild(container);

    // Dock the button above the footer once it scrolls into view, otherwise keep it fixed to the corner.
    const footer = document.getElementById('page-footer');
    const defaultBottomSpacing = () => (window.innerWidth >= 768 ? 32 : 24);
    const updatePosition = () => {
        if (!footer) return;
        const footerTop = footer.getBoundingClientRect().top;
        if (footerTop < window.innerHeight) {
            const finalTop = footer.offsetTop - container.offsetHeight - defaultBottomSpacing();
            container.style.position = 'absolute';
            container.style.top = `${finalTop}px`;
            container.style.bottom = 'auto';
        } else {
            container.style.position = 'fixed';
            container.style.top = 'auto';
            container.style.bottom = `${defaultBottomSpacing()}px`;
        }
    };
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    updatePosition();
}

document.addEventListener('DOMContentLoaded', () => {
    renderFloatingMailButton();

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
