/**
 * ============================================================
 * RSVP.JS — Confirmación de Asistencia & Libro de Firmas
 * ============================================================
 * Formulario RSVP → WhatsApp
 * Libro de Firmas → localStorage (preparado para MySQL/PHP)
 * ============================================================
 */

(function () {
    'use strict';

    const config = window.invitationConfig;

    // ── Inicialización ───────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        initRSVPForm();
        initGuestbookForm();
        loadGuestbookMessages();
    });

    // ══════════════════════════════════════════════════════════
    // RSVP — CONFIRMACIÓN DE ASISTENCIA
    // ══════════════════════════════════════════════════════════
    function initRSVPForm() {
        const form = document.getElementById('rsvp-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener valores
            const name = sanitizeInput(form.querySelector('#rsvp-name').value.trim());
            const phone = sanitizeInput(form.querySelector('#rsvp-phone').value.trim());
            const guests = form.querySelector('#rsvp-guests').value;
            const attendance = form.querySelector('input[name="attendance"]:checked');

            // Validación
            if (!name) {
                showAlert('error', 'Campo requerido', 'Por favor ingresa tu nombre completo.');
                return;
            }

            if (!phone || !validatePhone(phone)) {
                showAlert('error', 'Teléfono inválido', 'Por favor ingresa un número de teléfono válido.');
                return;
            }

            if (!attendance) {
                showAlert('error', 'Selecciona una opción', 'Por favor indica si asistirás o no.');
                return;
            }

            const attendanceText = attendance.value === 'yes' ? 'Sí asistiré' : 'No podré asistir';
            const emoji = attendance.value === 'yes' ? '✅' : '❌';

            // Construir mensaje de WhatsApp
            const message = `Hola, confirmo mi asistencia a los XV años de ${config.quinceanera}.\n\n` +
                `${emoji} *Confirmación:* ${attendanceText}\n` +
                `👤 *Nombre:* ${name}\n` +
                `📞 *Teléfono:* ${phone}\n` +
                `👥 *Acompañantes:* ${guests}`;

            const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;

            // Mostrar confirmación
            showAlert('success', '¡Gracias!', 'Serás redirigido a WhatsApp para confirmar tu asistencia.', function () {
                window.open(whatsappUrl, '_blank');
            });

            // Guardar en API stub (preparado para backend)
            saveRSVPToAPI({
                name: name,
                phone: phone,
                guests: guests,
                attendance: attendance.value,
                timestamp: new Date().toISOString()
            });

            // Limpiar formulario
            form.reset();
        });
    }

    // ══════════════════════════════════════════════════════════
    // LIBRO DE FIRMAS (GUESTBOOK)
    // ══════════════════════════════════════════════════════════
    function initGuestbookForm() {
        const form = document.getElementById('guestbook-form');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = sanitizeInput(form.querySelector('#guestbook-name').value.trim());
            const message = sanitizeInput(form.querySelector('#guestbook-message').value.trim());

            // Validación
            if (!name) {
                showAlert('error', 'Campo requerido', 'Por favor ingresa tu nombre.');
                return;
            }

            if (!message) {
                showAlert('error', 'Campo requerido', 'Por favor escribe un mensaje.');
                return;
            }

            if (message.length > 500) {
                showAlert('error', 'Mensaje muy largo', 'El mensaje no puede exceder 500 caracteres.');
                return;
            }

            // Crear objeto de mensaje
            const newMessage = {
                id: Date.now(),
                name: name,
                message: message,
                date: new Date().toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            // Guardar en localStorage
            saveMessageToLocal(newMessage);

            // Guardar en API stub (preparado para backend)
            saveMessageToAPI(newMessage);

            // Agregar tarjeta al DOM
            appendMessageCard(newMessage);

            // Confirmación
            showAlert('success', '¡Mensaje enviado!', 'Gracias por tus hermosas palabras. 💜');

            // Limpiar formulario
            form.reset();
        });
    }

    // ── Cargar mensajes del localStorage ─────────────────────
    function loadGuestbookMessages() {
        const messages = getMessagesFromLocal();
        const container = document.getElementById('messages-container');
        if (!container) return;

        if (messages.length === 0) {
            container.innerHTML = '<p class="no-messages" style="color: var(--texto-claro); font-style: italic;">Sé el primero en dejar un mensaje. 💐</p>';
            return;
        }

        container.innerHTML = '';
        messages.forEach(function (msg) {
            appendMessageCard(msg);
        });
    }

    // ── Agregar tarjeta de mensaje al DOM ────────────────────
    function appendMessageCard(msg) {
        const container = document.getElementById('messages-container');
        if (!container) return;

        // Remove "no messages" placeholder
        const noMsg = container.querySelector('.no-messages');
        if (noMsg) noMsg.remove();

        const card = document.createElement('div');
        card.className = 'message-card';
        card.setAttribute('data-aos', 'fade-up');

        card.innerHTML = `
            <div class="message-card-name">${escapeHtml(msg.name)}</div>
            <p class="message-card-text">"${escapeHtml(msg.message)}"</p>
            <div class="message-card-date">${escapeHtml(msg.date)}</div>
        `;

        container.insertBefore(card, container.firstChild);

        // Refresh AOS if available
        if (window.AOS) {
            AOS.refresh();
        }
    }

    // ══════════════════════════════════════════════════════════
    // LOCAL STORAGE
    // ══════════════════════════════════════════════════════════
    function saveMessageToLocal(message) {
        try {
            const messages = getMessagesFromLocal();
            messages.unshift(message);
            // Limitar a 50 mensajes
            if (messages.length > 50) messages.pop();
            localStorage.setItem('xv_guestbook', JSON.stringify(messages));
        } catch (e) {
            console.warn('No se pudo guardar en localStorage:', e);
        }
    }

    function getMessagesFromLocal() {
        try {
            const data = localStorage.getItem('xv_guestbook');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    // ══════════════════════════════════════════════════════════
    // API STUBS (Preparados para Backend PHP/MySQL)
    // ══════════════════════════════════════════════════════════

    /**
     * Guardar confirmación RSVP en el backend
     * @param {Object} data - Datos del RSVP
     * 
     * Cuando se implemente el backend, reemplazar con:
     * fetch('/api/rsvp.php', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify(data)
     * })
     */
    function saveRSVPToAPI(data) {
        // TODO: Conectar con backend PHP/MySQL
        console.log('[RSVP] Datos preparados para API:', data);
    }

    /**
     * Guardar mensaje del libro de firmas en el backend
     * @param {Object} message - Datos del mensaje
     * 
     * Cuando se implemente el backend, reemplazar con:
     * fetch('/api/guestbook.php', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify(message)
     * })
     */
    function saveMessageToAPI(message) {
        // TODO: Conectar con backend PHP/MySQL
        console.log('[Guestbook] Datos preparados para API:', message);
    }

    /**
     * Cargar mensajes del backend
     * 
     * Cuando se implemente el backend, reemplazar con:
     * fetch('/api/guestbook.php?action=list')
     *     .then(res => res.json())
     *     .then(data => { ... })
     */
    function loadMessagesFromAPI() {
        // TODO: Conectar con backend PHP/MySQL
        return Promise.resolve([]);
    }

    // ══════════════════════════════════════════════════════════
    // VALIDACIÓN Y SEGURIDAD
    // ══════════════════════════════════════════════════════════

    /**
     * Sanitiza input de texto (anti-XSS)
     */
    function sanitizeInput(str) {
        if (!str) return '';
        return str
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/&(?!amp;|lt;|gt;|quot;|#039;)/g, '&amp;');
    }

    /**
     * Escapa HTML para insertarlo de forma segura en el DOM
     */
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Valida número de teléfono
     */
    function validatePhone(phone) {
        // Acepta números con o sin código de país, guiones, espacios, paréntesis
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    /**
     * Muestra alerta elegante con SweetAlert2
     */
    function showAlert(type, title, text, callback) {
        if (window.Swal) {
            Swal.fire({
                icon: type,
                title: title,
                text: text,
                confirmButtonColor: '#A978D1',
                confirmButtonText: 'Aceptar',
                background: '#FFFFFF',
                color: '#4A3F5C',
                customClass: {
                    popup: 'swal-custom-popup'
                }
            }).then(function () {
                if (callback) callback();
            });
        } else {
            alert(title + '\n' + text);
            if (callback) callback();
        }
    }

})();
