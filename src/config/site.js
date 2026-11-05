/**
 * Configuración central de la agencia.
 * Los datos de contacto se leen de variables de entorno (ver .env.example).
 * Si un dato no está configurado, simplemente no se muestra: no se inventa información.
 */
// Acceso literal a process.env: Next.js solo reemplaza así las variables NEXT_PUBLIC_ en el cliente.
const env = (value) => (value || "").trim();

export const siteConfig = {
  name: "Zentravel Medellín",
  shortName: "Zentravel",
  city: "Medellín, Antioquia, Colombia",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  description:
    "Agencia de viajes en Medellín. Planes turísticos nacionales e internacionales con asesoría personalizada. Descubre Colombia y el mundo y solicita tu cotización.",
  locale: "es_CO",
  contact: {
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/\D/g, ""),
    phone: env(process.env.NEXT_PUBLIC_PHONE),
    email: env(process.env.NEXT_PUBLIC_EMAIL),
    address: env(process.env.NEXT_PUBLIC_ADDRESS),
  },
  social: [
    { name: "Instagram", key: "instagram", url: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL) },
    { name: "Facebook", key: "facebook", url: env(process.env.NEXT_PUBLIC_FACEBOOK_URL) },
    { name: "TikTok", key: "tiktok", url: env(process.env.NEXT_PUBLIC_TIKTOK_URL) },
    { name: "YouTube", key: "youtube", url: env(process.env.NEXT_PUBLIC_YOUTUBE_URL) },
  ].filter((s) => s.url),
};

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/destinos", label: "Destinos" },
  { href: "/planes", label: "Planes turísticos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];
