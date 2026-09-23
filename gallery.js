/**
 * ============================================================
 * GALLERY.JS — Galería con Lightbox
 * ============================================================
 * Lightbox fullscreen con navegación, gestos touch (swipe),
 * y contador de imágenes.
 * ============================================================
 */

(function () {
    'use strict';

    const config = window.invitationConfig;

    // ── Estado ───────────────────────────────────────────────
    let currentIndex = 0;
    let images = [];
    let lightbox = null;
    let lightboxImage = null;
    let lightboxCounter = null;

    // Touch/swipe
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 50;

    // ── Inicialización ───────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        images = config.gallery || [];
        lightbox = document.getElementById('lightbox');
        lightboxImage = document.getElementById('lightbox-image');
        lightboxCounter = document.querySelector('.lightbox-counter');

        if (!lightbox || !lightboxImage) return;

        initControls();
        initKeyboard();
        initTouch();
    });

    // ── Controles del Lightbox ───────────────────────────────
    function initControls() {
        // Cerrar
        const closeBtn = document.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        // Cerrar al hacer clic fuera de la imagen
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Navegación
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                showPrevious();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                showNext();
            });
        }
    }

    // ── Teclado ──────────────────────────────────────────────
    function initKeyboard() {
        document.addEventListener('keydown', function (e) {
            if (!lightbox || !lightbox.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevious();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        });
    }

    // ── Touch / Swipe ────────────────────────────────────────
    function initTouch() {
        if (!lightbox) return;

        lightbox.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) < SWIPE_THRESHOLD) return;

        if (diff > 0) {
            showNext();
        } else {
            showPrevious();
        }
    }

    // ── Abrir Lightbox ───────────────────────────────────────
    function openLightbox(index) {
        if (!lightbox || !lightboxImage || !images.length) return;

        currentIndex = index;
        updateImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // ── Cerrar Lightbox ──────────────────────────────────────
    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ── Navegar ──────────────────────────────────────────────
    function showPrevious() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    // ── Actualizar imagen ────────────────────────────────────
    function updateImage() {
        if (!lightboxImage) return;

        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.95)';

        setTimeout(function () {
            lightboxImage.src = images[currentIndex];
            lightboxImage.alt = `Foto ${currentIndex + 1} de ${images.length}`;
            lightboxImage.style.opacity = '1';
            lightboxImage.style.transform = 'scale(1)';
        }, 200);

        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
        }
    }

    // ── API pública ──────────────────────────────────────────
    window.GalleryModule = {
        openLightbox: openLightbox,
        closeLightbox: closeLightbox
    };

})();
