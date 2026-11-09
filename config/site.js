// Datos de la empresa en un solo lugar.
// Si algo cambia (teléfono, redes...), se cambia solo aquí
// y se actualiza en toda la página.
// Lo que esté vacío ("") no se muestra.

export const empresa = {
  nombre: "Zen Travel Medellín",
  lema: "Mundo de experiencias",
  ciudad: "Medellín, Colombia",
  correo: "zentravelmed@gmail.com",
  telefono: "", // por definir
  redes: {
    instagram: "", // por definir
    facebook: "", // por definir
    tiktok: "", // por definir
  },
};

// Páginas del sitio. Las usan el menú y el pie de página.
export const enlaces = [
  { nombre: "Inicio", ruta: "/" },
  { nombre: "Destinos", ruta: "/destinos" },
  { nombre: "Mapa", ruta: "/mapa" },
  { nombre: "Nosotros", ruta: "/nosotros" },
  { nombre: "Contacto", ruta: "/contacto" },
];
