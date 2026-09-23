/**
 * ============================================================
 * MUSIC.JS — Control de Música de Fondo
 * ============================================================
 * Maneja reproducción/pausa con botón flotante animado.
 * Respeta autoplay policy de navegadores modernos.
 * ============================================================
 */

(function () {
    'use strict';

    const config = window.invitationConfig;

    // ── Estado ───────────────────────────────────────────────
    let audio = null;
    let isPlaying = false;
    let musicBtn = null;

    // ── Inicialización ───────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        musicBtn = document.querySelector('.music-btn');
        if (!musicBtn) return;

        // Crear elemento de audio
        audio = new Audio(config.music);
        audio.loop = true;
        audio.volume = 0.4;
        audio.preload = 'auto';

        // Evento de clic en el botón
        musicBtn.addEventListener('click', function () {
            toggle();
        });

        // Manejar errores de audio
        audio.addEventListener('error', function () {
            console.warn('No se pudo cargar el archivo de audio:', config.music);
        });

        // Cuando la canción termina (aunque está en loop)
        audio.addEventListener('ended', function () {
            if (audio.loop) return;
            updateButtonState(false);
        });
    });

    // ── Reproducir ───────────────────────────────────────────
    function play() {
        if (!audio) return;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                isPlaying = true;
                updateButtonState(true);
            }).catch(function (error) {
                console.warn('Autoplay bloqueado:', error.message);
                isPlaying = false;
                updateButtonState(false);
            });
        }
    }

    // ── Pausar ───────────────────────────────────────────────
    function pause() {
        if (!audio) return;
        audio.pause();
        isPlaying = false;
        updateButtonState(false);
    }

    // ── Toggle ───────────────────────────────────────────────
    function toggle() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    // ── Actualizar estado visual del botón ───────────────────
    function updateButtonState(playing) {
        if (!musicBtn) return;

        if (playing) {
            musicBtn.classList.add('playing');
        } else {
            musicBtn.classList.remove('playing');
        }
    }

    // ── API pública ──────────────────────────────────────────
    window.MusicModule = {
        play: play,
        pause: pause,
        toggle: toggle,
        isPlaying: function () { return isPlaying; }
    };

})();
