/**
 * ============================================================
 * CONFIGURACIÓN DE INVITACIÓN — XV AÑOS
 * ============================================================
 * Modifica este archivo para personalizar toda la invitación.
 * Todos los textos, fechas, nombres y datos se obtienen
 * desde este objeto de configuración.
 * ============================================================
 */

var invitationConfig = {

    // ── Datos de la Quinceañera ──────────────────────────────
    quinceanera: "Melissa",
    
    // Frase principal de la portada
    heroQuote: "Una noche para recordar,\nun sueño hecho realidad.",

    // ── Fecha y Hora del Evento ──────────────────────────────
    // Formato ISO 8601 para la cuenta regresiva
    eventDate: "2026-11-15T19:00:00",
    date: "15 de Noviembre de 2026",
    time: "7:00 PM",

    // ── Padres ───────────────────────────────────────────────
    parents: {
        father: "Sr. Juan Carlos García López",
        mother: "Sra. María Elena Rodríguez de García"
    },

    // ── Padrinos (opcional) ──────────────────────────────────
    godparents: {
        godfather: "Sr. Roberto Hernández",
        godmother: "Sra. Patricia Mendoza de Hernández"
    },

    // ── Ceremonia Religiosa ──────────────────────────────────
    ceremony: {
        place: "Parroquia Santa María de Guadalupe",
        time: "6:00 PM",
        address: "Av. Principal #123, Centro Histórico"
    },

    // ── Recepción / Fiesta ───────────────────────────────────
    reception: {
        place: "Salón Imperial de Eventos",
        time: "7:30 PM",
        address: "Blvd. de los Jardines #456, Col. Las Flores"
    },

    // ── Contacto WhatsApp ────────────────────────────────────
    // Número con código de país, sin espacios ni guiones
    whatsapp: "519XXXXXXXX",

    // ── Google Maps ──────────────────────────────────────────
    // URL de Google Maps para la ubicación del evento
    mapsUrl: "https://maps.google.com/?q=Salon+Imperial+de+Eventos",
    // Coordenadas para el mapa embebido (latitud, longitud)
    mapsCoords: {
        lat: 19.4326,
        lng: -99.1332
    },

    // ── Música de Fondo ──────────────────────────────────────
    music: "audio/the_romantic_music.mp3",

    // ── Dress Code ───────────────────────────────────────────
    dressCode: {
        type: "Formal / Elegante",
        ladies: "Vestido largo o cocktail elegante",
        gentlemen: "Traje formal o smoking"
    },

    // ── URL de la Invitación (para QR) ───────────────────────
    invitationUrl: "https://tudominio.com/xv-melissa",

    // ── Mesa de Regalos ──────────────────────────────────────
    gifts: {
        showSection: true,
        message: "El mejor regalo es compartir este día conmigo.",
        options: [
            {
                icon: "fa-gift",
                title: "Regalo",
                description: "Tu presencia es el mejor regalo"
            },
            {
                icon: "fa-credit-card",
                title: "Transferencia",
                description: "Banco: XXXX\nCuenta: XXXX-XXXX-XXXX\nCLABE: XXXX"
            },
            {
                icon: "fa-ribbon",
                title: "Lista de Regalos",
                description: "Liverpool / Palacio de Hierro"
            }
        ]
    },

    // ── Mensajes de Bienvenida ───────────────────────────────
    welcomeMessage: {
        line1: "Hay momentos en la vida\nque se convierten en recuerdos\npara toda la vida.",
        line2: "Hoy quiero compartir contigo\nuno de los momentos más importantes\nde mi vida."
    },

    // ── Mi Historia (Timeline) ───────────────────────────────
    history: {
        title: "MI HISTORIA",
        intro: "Quince años llenos de momentos,\nsonrisas, aprendizajes y personas\nque han dejado huella en mi vida.",
        events: [
            {
                year: "2011",
                title: "Mi llegada al mundo",
                description: "El día que llegué para llenar de alegría el hogar.",
                image: "images/galeria1.jpg"
            },
            {
                year: "2016",
                title: "Mi primer día de escuela",
                description: "Nuevas aventuras y amistades que marcaron mi infancia.",
                image: "images/galeria2.jpg"
            },
            {
                year: "2021",
                title: "Creciendo con sueños",
                description: "Descubriendo pasiones y construyendo recuerdos.",
                image: "images/galeria3.jpg"
            },
            {
                year: "2026",
                title: "Mis XV Años",
                description: "El momento de celebrar y comenzar una nueva etapa.",
                image: "images/galeria4.jpg"
            }
        ]
    },

    // ── Galería de Fotos ─────────────────────────────────────
    gallery: [
        "images/galeria1.jpg",
        "images/galeria2.jpg",
        "images/galeria3.jpg",
        "images/galeria4.jpg",
        "images/galeria5.jpg",
        "images/galeria6.jpg"
    ],

    // ── Textos del RSVP ──────────────────────────────────────
    rsvp: {
        title: "CONFIRMA TU ASISTENCIA",
        message: "Tu presencia hará que este día\nsea aún más especial."
    },

    // ── SEO / Open Graph ─────────────────────────────────────
    seo: {
        title: "XV Años de Melissa",
        description: "Estás cordialmente invitado(a) a celebrar los XV años de Melissa. Una noche para recordar, un sueño hecho realidad.",
        image: "images/portada.jpg"
    }
};
