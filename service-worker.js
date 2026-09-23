/**
 * ============================================================
 * SERVICE WORKER — Invitación XV Años
 * ============================================================
 * Cache-first strategy para funcionamiento offline básico.
 * ============================================================
 */

const CACHE_NAME = 'xv-melissa-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './config.js',
    './css/style.css',
    './css/responsive.css',
    './js/main.js',
    './js/countdown.js',
    './js/music.js',
    './js/gallery.js',
    './js/rsvp.js'
];

// Instalación — Cachear assets estáticos
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('[SW] Caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(function () {
                return self.skipWaiting();
            })
    );
});

// Activación — Limpiar caches antiguos
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames
                        .filter(function (name) {
                            return name !== CACHE_NAME;
                        })
                        .map(function (name) {
                            return caches.delete(name);
                        })
                );
            })
            .then(function () {
                return self.clients.claim();
            })
    );
});

// Fetch — Cache first, fallback to network
self.addEventListener('fetch', function (event) {
    // Solo cachear requests GET
    if (event.request.method !== 'GET') return;

    // No cachear requests externos (CDNs se manejan por el navegador)
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request)
            .then(function (cachedResponse) {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then(function (networkResponse) {
                        // Cachear la respuesta para futuras solicitudes
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(function (cache) {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(function () {
                        // Offline fallback
                        if (event.request.destination === 'document') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});
