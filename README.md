# 👑 Invitación Digital — XV Años de Melissa

Invitación digital interactiva, elegante y responsive para Quinceañera (XV Años).

## 🎨 Características

- ✅ Diseño premium mobile-first
- ✅ Portada animada con partículas doradas
- ✅ Música de fondo con control flotante
- ✅ Cuenta regresiva en tiempo real
- ✅ Información del evento (ceremonia + recepción)
- ✅ Mapa de ubicación con Google Maps
- ✅ Dress Code con iconos elegantes
- ✅ Galería con Lightbox y gestos touch
- ✅ Timeline "Mi Historia"
- ✅ RSVP con envío a WhatsApp
- ✅ Libro de Firmas (localStorage)
- ✅ Código QR descargable
- ✅ Botón compartir (Web Share API)
- ✅ Mesa de regalos
- ✅ PWA (instalable en teléfono)
- ✅ Animaciones suaves (AOS)
- ✅ Navegación flotante con scroll spy

## 🛠️ Tecnologías

- HTML5 + CSS3 + JavaScript ES6+
- Google Fonts (Great Vibes, Playfair Display, Montserrat)
- Font Awesome 6
- AOS (Animate On Scroll)
- SweetAlert2
- QRCode.js

## 📁 Estructura

```
maria15/
├── index.html          # Página principal
├── config.js           # ⚙️ CONFIGURACIÓN (editar aquí)
├── manifest.json       # PWA
├── service-worker.js   # Cache offline
├── README.md           # Este archivo
├── css/
│   ├── style.css       # Estilos principales
│   └── responsive.css  # Media queries
├── js/
│   ├── main.js         # Lógica principal
│   ├── countdown.js    # Cuenta regresiva
│   ├── music.js        # Control de audio
│   ├── gallery.js      # Galería + Lightbox
│   └── rsvp.js         # RSVP + Libro de firmas
├── images/             # Fotografías
│   └── flores/         # Elementos decorativos
└── audio/
    └── musica.mp3      # Música de fondo
```

## ⚙️ Configuración

Toda la personalización se realiza en **`config.js`**:

```javascript
const invitationConfig = {
    quinceanera: "Melissa",        // Nombre
    eventDate: "2026-11-15T19:00:00", // Fecha ISO
    date: "15 de Noviembre de 2026",  // Fecha legible
    parents: { ... },               // Padres
    ceremony: { ... },              // Ceremonia
    reception: { ... },             // Recepción
    whatsapp: "519XXXXXXXX",        // WhatsApp
    mapsUrl: "https://...",         // Google Maps
    music: "audio/musica.mp3",      // Música
    // ... más opciones
};
```

## 🚀 Instalación

1. Copiar todos los archivos a tu servidor web
2. Editar `config.js` con los datos reales del evento
3. Reemplazar las imágenes en `/images/` con las fotos reales
4. Colocar archivo MP3 en `/audio/musica.mp3`
5. Abrir en navegador

## 📱 Compatibilidad

- ✅ Chrome, Edge, Firefox, Safari
- ✅ Android, iPhone
- ✅ Optimizado para móviles (360px - 1440px+)

## 🔮 Backend Futuro (PHP/MySQL)

El código frontend está preparado para conectarse a un backend. 
Ver los stubs de API en `js/rsvp.js`:

- `saveRSVPToAPI()` — Guardar confirmaciones
- `saveMessageToAPI()` — Guardar mensajes del libro
- `loadMessagesFromAPI()` — Cargar mensajes

## 📄 Licencia

Plantilla de invitación digital. Uso personal.
