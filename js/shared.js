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
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.25rem;
            }
            @media (min-width: 768px) {
                .floating-btn { width: 76px; height: 76px; font-size: 1.75rem; }
            }
            .pulse-mail {
                position: relative;
                animation: mail-pulse-scale 2s ease-in-out infinite;
            }
            .pulse-mail::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                border: 3px solid rgba(234, 88, 12, 0.85);
                border-radius: 50%;
                animation: mail-pulse-ring 2s ease-out infinite;
                pointer-events: none;
            }
            @keyframes mail-pulse-scale {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            @keyframes mail-pulse-ring {
                0% { transform: scale(0.8); opacity: 1; }
                100% { transform: scale(1.7); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    const container = document.createElement('div');
    container.id = 'floating-buttons-container';
    container.className = 'floating-btn-container animate-on-scroll-right';
    container.innerHTML = `
        <a href="mailto:info@artunhealthcare.com" class="floating-btn bg-orange-500/70 text-white shadow-xl hover:bg-orange-600 transition duration-300 transform hover:scale-110 pulse-mail" aria-label="Send us an Email">
            <i class="fas fa-envelope"></i>
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

        // Mobile nav dropdowns ("Our Services", "Popular Treatments", ...) --
        // each toggle button controls the panel right after it.
        document.querySelectorAll('.mobile-dropdown-toggle').forEach((toggle) => {
            const panel = toggle.nextElementSibling;
            if (!panel) return;
            toggle.addEventListener('click', () => {
                panel.classList.toggle('hidden');
            });
        });

        // Desktop nav dropdowns -- same pattern, and clicking one closes the others.
        const desktopDropdowns = document.querySelectorAll('.dropdown');

        desktopDropdowns.forEach((dropdown) => {
            const panel = dropdown.querySelector('.dropdown-panel');
            if (!panel) return;
            dropdown.addEventListener('click', (event) => {
                event.stopPropagation();
                const wasHidden = panel.classList.contains('hidden');
                desktopDropdowns.forEach((other) => {
                    const otherPanel = other.querySelector('.dropdown-panel');
                    if (otherPanel) otherPanel.classList.add('hidden');
                });
                if (wasHidden) panel.classList.remove('hidden');
            });
        });

        if (desktopDropdowns.length) {
            document.addEventListener('click', (event) => {
                desktopDropdowns.forEach((dropdown) => {
                    const panel = dropdown.querySelector('.dropdown-panel');
                    if (panel && !dropdown.contains(event.target)) {
                        panel.classList.add('hidden');
                    }
                });
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

    // --- Service Areas image carousel (autoplay + dots + arrows) ---
    document.querySelectorAll('.service-carousel').forEach((carousel) => {
        const track = carousel.querySelector('.service-carousel-track');
        const slides = track ? [...track.children] : [];
        const dots = [...carousel.querySelectorAll('.service-carousel-dot')];
        const prevBtn = carousel.querySelector('.service-carousel-prev');
        const nextBtn = carousel.querySelector('.service-carousel-next');
        if (!track || slides.length === 0) return;

        const count = slides.length;
        let index = 0;
        let timer = null;

        function goTo(i) {
            index = (i + count) % count;
            track.style.transform = `translateX(-${index * (100 / count)}%)`;
            dots.forEach((dot, di) => {
                dot.classList.toggle('bg-white', di === index);
                dot.classList.toggle('bg-white/50', di !== index);
            });
        }

        function next() { goTo(index + 1); }
        function prev() { goTo(index - 1); }

        function startAutoplay() {
            clearInterval(timer);
            timer = setInterval(next, 5000);
        }
        function stopAutoplay() {
            clearInterval(timer);
        }

        dots.forEach((dot, di) => {
            dot.addEventListener('click', () => { goTo(di); startAutoplay(); });
        });
        if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        goTo(0);
        startAutoplay();
    });
    // --- End Service Areas carousel ---

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
