/**
 * ============================================================
 * MAIN.JS — Lógica Principal de la Invitación
 * ============================================================
 * Controla: apertura, partículas, pétalos, navegación,
 * scroll spy, compartir, QR, inicialización general.
 * ============================================================
 */

(function () {
    'use strict';

    // ── Referencia a config ──────────────────────────────────
    const config = window.invitationConfig;

    // ── Estado de la aplicación ──────────────────────────────
    const state = {
        isOpened: false,
        isMobileNavOpen: false
    };

    // ══════════════════════════════════════════════════════════
    // INICIALIZACIÓN
    // ══════════════════════════════════════════════════════════
    document.addEventListener('DOMContentLoaded', function () {
        populateContent();
        initHeroButton();
        initParticles();
        initScrollSpy();
        initNavToggle();
        initFloatingActions();
        initShareButton();
        initQRCode();
        initAOS();
    });

    // ══════════════════════════════════════════════════════════
    // POBLAR CONTENIDO DESDE CONFIG
    // ══════════════════════════════════════════════════════════
    function populateContent() {
        // Hero
        setText('.hero-name', config.quinceanera);
        setText('.hero-quote', config.heroQuote);

        // Welcome
        setText('.welcome-text', config.welcomeMessage.line1);
        setText('.welcome-text-secondary', config.welcomeMessage.line2);

        // Event cards
        setText('#ceremony-place', config.ceremony.place);
        setText('#ceremony-time', config.ceremony.time);
        setText('#reception-place', config.reception.place);
        setText('#reception-time', config.reception.time);
        setText('#reception-address', config.reception.address);

        // Parents
        setText('#father-name', config.parents.father);
        setText('#mother-name', config.parents.mother);

        if (config.godparents) {
            setText('#godfather-name', config.godparents.godfather);
            setText('#godmother-name', config.godparents.godmother);
        }

        // Dress code
        setText('.dresscode-type', config.dressCode.type);
        setText('#dresscode-ladies', config.dressCode.ladies);
        setText('#dresscode-gentlemen', config.dressCode.gentlemen);

        // Date display
        const dateElements = document.querySelectorAll('.event-date');
        dateElements.forEach(el => el.textContent = config.date);

        // SEO / Title
        document.title = config.seo.title;

        // History
        populateHistory();

        // Gallery
        populateGallery();

        // Gifts
        populateGifts();

        // Footer
        setText('.footer-name', config.quinceanera);
        setText('.footer-date', config.date);

        // RSVP title
        setText('.rsvp-message', config.rsvp.message);
    }

    function setText(selector, text) {
        const el = document.querySelector(selector);
        if (el && text) {
            el.textContent = text;
        }
    }

    function populateHistory() {
        const container = document.getElementById('timeline-container');
        if (!container || !config.history) return;

        setText('.history-intro', config.history.intro);

        container.innerHTML = '';
        config.history.events.forEach(function (event, index) {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
            item.setAttribute('data-aos-delay', (index * 100).toString());

            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-year">${sanitize(event.year)}</div>
                    <h3 class="timeline-title">${sanitize(event.title)}</h3>
                    <p class="timeline-desc">${sanitize(event.description)}</p>
                    <div class="timeline-image">
                        <img src="${sanitize(event.image)}" alt="${sanitize(event.title)}" loading="lazy">
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    function populateGallery() {
        const container = document.getElementById('gallery-container');
        if (!container || !config.gallery) return;

        container.innerHTML = '';
        config.gallery.forEach(function (src, index) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-aos', 'zoom-in');
            item.setAttribute('data-aos-delay', (index * 80).toString());
            item.setAttribute('data-index', index.toString());

            item.innerHTML = `<img src="${sanitize(src)}" alt="Galería ${index + 1}" loading="lazy">`;
            item.addEventListener('click', function () {
                if (window.GalleryModule) {
                    window.GalleryModule.openLightbox(index);
                }
            });
            container.appendChild(item);
        });
    }

    function populateGifts() {
        const container = document.getElementById('gifts-container');
        if (!container || !config.gifts || !config.gifts.showSection) return;

        container.innerHTML = '';
        config.gifts.options.forEach(function (gift, index) {
            const card = document.createElement('div');
            card.className = 'gift-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());

            card.innerHTML = `
                <div class="gift-card-icon"><i class="fas ${sanitize(gift.icon)}"></i></div>
                <h3 class="gift-card-title">${sanitize(gift.title)}</h3>
                <p class="gift-card-desc">${sanitize(gift.description)}</p>
            `;
            container.appendChild(card);
        });
    }

    // ══════════════════════════════════════════════════════════
    // BOTÓN HERO — ABRIR INVITACIÓN
    // ══════════════════════════════════════════════════════════
    function initHeroButton() {
        const btn = document.getElementById('hero-open-btn');
        if (!btn) return;

        btn.addEventListener('click', function () {
            if (state.isOpened) return;
            state.isOpened = true;

            // Iniciar música
            if (window.MusicModule) {
                window.MusicModule.play();
            }

            // Animación de cortina
            const curtain = document.querySelector('.curtain-overlay');
            if (curtain) {
                curtain.classList.add('open');
            }

            // Mostrar contenido principal
            setTimeout(function () {
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.classList.add('visible');
                }

                // Mostrar navegación y botones flotantes
                showFloatingElements();

                // Mostrar hint de scroll
                const scrollHint = document.querySelector('.hero-scroll-hint');
                if (scrollHint) {
                    scrollHint.classList.add('visible');
                }
            }, 600);

            // Scroll suave al contenido
            setTimeout(function () {
                const welcomeSection = document.getElementById('welcome');
                if (welcomeSection) {
                    welcomeSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1500);

            // Activar pétalos flotantes
            startPetals();

            // Refresh AOS
            setTimeout(function () {
                if (window.AOS) {
                    AOS.refresh();
                }
            }, 800);
        });
    }

    function showFloatingElements() {
        const nav = document.querySelector('.floating-nav');
        const toggle = document.querySelector('.nav-toggle');
        const actions = document.querySelector('.floating-actions');
        const musicBtn = document.querySelector('.music-btn');

        if (nav) nav.classList.add('visible');
        if (toggle) toggle.classList.add('visible');
        if (actions) actions.classList.add('visible');
        if (musicBtn) musicBtn.classList.add('active');
    }

    // ══════════════════════════════════════════════════════════
    // PARTÍCULAS DORADAS (Canvas)
    // ══════════════════════════════════════════════════════════
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                fadeSpeed: Math.random() * 0.005 + 0.002,
                growing: Math.random() > 0.5
            };
        }

        function init() {
            resize();
            particles = [];
            const count = Math.min(50, Math.floor(canvas.width * canvas.height / 15000));
            for (let i = 0; i < count; i++) {
                particles.push(createParticle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(function (p) {
                // Update
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.growing) {
                    p.opacity += p.fadeSpeed;
                    if (p.opacity >= 0.7) p.growing = false;
                } else {
                    p.opacity -= p.fadeSpeed;
                    if (p.opacity <= 0.1) p.growing = true;
                }

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
                ctx.fill();

                // Glow effect
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(232, 215, 165, ${p.opacity * 0.3})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', function () {
            resize();
        });
    }

    // ══════════════════════════════════════════════════════════
    // PÉTALOS FLOTANTES
    // ══════════════════════════════════════════════════════════
    function startPetals() {
        const container = document.querySelector('.floating-petals');
        if (!container) return;

        // Activar pétalos que ya existen en el HTML
        const petals = container.querySelectorAll('.petal');
        petals.forEach(function (petal) {
            petal.style.animationPlayState = 'running';
        });
    }

    // ══════════════════════════════════════════════════════════
    // SCROLL SPY — Navegación
    // ══════════════════════════════════════════════════════════
    function initScrollSpy() {
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.floating-nav a[href^="#"]');

        if (!sections.length || !navLinks.length) return;

        function updateActiveLink() {
            let current = '';
            const scrollPos = window.scrollY + window.innerHeight / 3;

            sections.forEach(function (section) {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', throttle(updateActiveLink, 100));

        // Smooth scroll for nav links
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile nav
                    closeMobileNav();
                }
            });
        });
    }

    // ══════════════════════════════════════════════════════════
    // NAVEGACIÓN MÓVIL (HAMBURGUESA)
    // ══════════════════════════════════════════════════════════
    function initNavToggle() {
        const toggle = document.querySelector('.nav-toggle');
        const nav = document.querySelector('.floating-nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            if (state.isMobileNavOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (state.isMobileNavOpen &&
                !nav.contains(e.target) &&
                !toggle.contains(e.target)) {
                closeMobileNav();
            }
        });
    }

    function openMobileNav() {
        const nav = document.querySelector('.floating-nav');
        const toggle = document.querySelector('.nav-toggle');
        if (!nav || !toggle) return;

        state.isMobileNavOpen = true;
        nav.classList.add('mobile-open');
        toggle.innerHTML = '<i class="fas fa-times"></i>';
    }

    function closeMobileNav() {
        const nav = document.querySelector('.floating-nav');
        const toggle = document.querySelector('.nav-toggle');
        if (!nav || !toggle) return;

        state.isMobileNavOpen = false;
        nav.classList.remove('mobile-open');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // ══════════════════════════════════════════════════════════
    // BOTONES FLOTANTES
    // ══════════════════════════════════════════════════════════
    function initFloatingActions() {
        // Location button
        const locationBtn = document.getElementById('fab-location');
        if (locationBtn) {
            locationBtn.addEventListener('click', function () {
                window.open(config.mapsUrl, '_blank');
            });
        }

        // WhatsApp button
        const waBtn = document.getElementById('fab-whatsapp');
        if (waBtn) {
            waBtn.addEventListener('click', function () {
                const msg = encodeURIComponent(
                    `Hola, tengo una consulta sobre los XV años de ${config.quinceanera}.`
                );
                window.open(`https://wa.me/${config.whatsapp}?text=${msg}`, '_blank');
            });
        }
    }

    // ══════════════════════════════════════════════════════════
    // COMPARTIR
    // ══════════════════════════════════════════════════════════
    function initShareButton() {
        const btn = document.getElementById('share-btn');
        if (!btn) return;

        btn.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({
                    title: config.seo.title,
                    text: config.seo.description,
                    url: config.invitationUrl
                }).catch(function () { });
            } else {
                // Show fallback modal
                const modal = document.querySelector('.share-modal');
                if (modal) modal.classList.add('active');
            }
        });

        // Share modal options
        const waShare = document.getElementById('share-wa');
        if (waShare) {
            waShare.addEventListener('click', function () {
                const msg = encodeURIComponent(
                    `${config.seo.description}\n\n${config.invitationUrl}`
                );
                window.open(`https://wa.me/?text=${msg}`, '_blank');
                closeShareModal();
            });
        }

        const fbShare = document.getElementById('share-fb');
        if (fbShare) {
            fbShare.addEventListener('click', function () {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(config.invitationUrl)}`,
                    '_blank'
                );
                closeShareModal();
            });
        }

        const copyShare = document.getElementById('share-copy');
        if (copyShare) {
            copyShare.addEventListener('click', function () {
                navigator.clipboard.writeText(config.invitationUrl).then(function () {
                    if (window.Swal) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Enlace copiado!',
                            text: 'El enlace de la invitación ha sido copiado al portapapeles.',
                            confirmButtonColor: '#A978D1',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                }).catch(function () { });
                closeShareModal();
            });
        }

        // Close modal
        const closeBtn = document.querySelector('.share-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeShareModal);
        }

        // Close on backdrop click
        const modal = document.querySelector('.share-modal');
        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) closeShareModal();
            });
        }
    }

    function closeShareModal() {
        const modal = document.querySelector('.share-modal');
        if (modal) modal.classList.remove('active');
    }

    // ══════════════════════════════════════════════════════════
    // CÓDIGO QR
    // ══════════════════════════════════════════════════════════
    function initQRCode() {
        const container = document.getElementById('qr-code');
        if (!container || typeof QRCode === 'undefined') return;

        new QRCode(container, {
            text: config.invitationUrl,
            width: 180,
            height: 180,
            colorDark: '#4A3F5C',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.H
        });

        // Download QR button
        const downloadBtn = document.getElementById('download-qr');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function () {
                setTimeout(function () {
                    const canvas = container.querySelector('canvas');
                    if (canvas) {
                        const link = document.createElement('a');
                        link.download = `qr-xv-${config.quinceanera.toLowerCase()}.png`;
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                    }
                }, 100);
            });
        }
    }

    // ══════════════════════════════════════════════════════════
    // AOS INIT
    // ══════════════════════════════════════════════════════════
    function initAOS() {
        if (window.AOS) {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            });
        }
    }

    // ══════════════════════════════════════════════════════════
    // UTILIDADES
    // ══════════════════════════════════════════════════════════

    /**
     * Sanitiza texto para prevenir XSS
     */
    function sanitize(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Throttle para optimizar eventos de scroll
     */
    function throttle(func, wait) {
        let timeout = null;
        let lastArgs = null;

        return function () {
            lastArgs = arguments;
            if (timeout === null) {
                timeout = setTimeout(function () {
                    func.apply(null, lastArgs);
                    timeout = null;
                }, wait);
            }
        };
    }

    // Exportar utilidades globales
    window.InvitationUtils = {
        sanitize: sanitize,
        throttle: throttle
    };

})();
