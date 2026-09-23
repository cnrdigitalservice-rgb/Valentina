/**
 * ============================================================
 * COUNTDOWN.JS — Cuenta Regresiva
 * ============================================================
 * Calcula y muestra el tiempo restante hasta el evento.
 * Fecha configurable desde config.js
 * ============================================================
 */

(function () {
    'use strict';

    const config = window.invitationConfig;

    // ── Elementos DOM ────────────────────────────────────────
    let daysEl, hoursEl, minutesEl, secondsEl;
    let countdownGrid, countdownFinished;
    let intervalId = null;

    // ── Inicialización ───────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        daysEl = document.getElementById('countdown-days');
        hoursEl = document.getElementById('countdown-hours');
        minutesEl = document.getElementById('countdown-minutes');
        secondsEl = document.getElementById('countdown-seconds');
        countdownGrid = document.querySelector('.countdown-grid');
        countdownFinished = document.querySelector('.countdown-finished');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        // Iniciar la cuenta regresiva
        updateCountdown();
        intervalId = setInterval(updateCountdown, 1000);
    });

    // ── Actualizar cuenta regresiva ──────────────────────────
    function updateCountdown() {
        const eventDate = new Date(config.eventDate).getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance <= 0) {
            // ¡El evento es hoy o ya pasó!
            clearInterval(intervalId);
            if (countdownGrid) countdownGrid.style.display = 'none';
            if (countdownFinished) {
                countdownFinished.style.display = 'block';
                countdownFinished.textContent = '¡HOY ES EL GRAN DÍA!';
            }
            return;
        }

        // Calcular tiempo restante
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar con animación
        updateNumber(daysEl, days);
        updateNumber(hoursEl, hours);
        updateNumber(minutesEl, minutes);
        updateNumber(secondsEl, seconds);
    }

    // ── Actualizar número con animación flip ─────────────────
    function updateNumber(element, value) {
        const formatted = value.toString().padStart(2, '0');
        if (element.textContent !== formatted) {
            element.style.transform = 'translateY(-5px)';
            element.style.opacity = '0.5';

            setTimeout(function () {
                element.textContent = formatted;
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 150);
        }
    }

})();
