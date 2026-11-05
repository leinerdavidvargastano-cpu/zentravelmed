/**
 * Planes de ejemplo para la estructura del sitio.
 *
 * IMPORTANTE: precio_referencial está en null a propósito. La agencia debe cargar
 * sus valores reales desde Supabase. Mientras sea null, el sitio muestra
 * "Precio según cotización" en lugar de un precio inventado.
 *
 * categorias: nacional | internacional | familiar | romantico | aventura | playa | cultural | grupal
 */

const p = (o) => ({ estado: "activo", destacado: false, precio_referencial: null, moneda: "COP", imagen: null, ...o });

export const plans = [
  p({
    id: 1, slug: "cartagena-colonial-y-caribe", nombre: "Cartagena colonial y Caribe", destino_id: 1,
    categorias: ["nacional", "playa", "romantico", "cultural"], destacado: true,
    descripcion: "Historia, murallas y un día de playa en las Islas del Rosario.",
    duracion_dias: 4, duracion_noches: 3,
    servicios_incluidos: ["Alojamiento", "Desayunos", "Traslados aeropuerto–hotel", "Tour por la ciudad", "Pasadía en islas"],
  }),
  p({
    id: 2, slug: "san-andres-mar-de-siete-colores", nombre: "San Andrés, mar de siete colores", destino_id: 3,
    categorias: ["nacional", "playa", "familiar"], destacado: true,
    descripcion: "Descanso frente al mar con tour a Johnny Cay y el Acuario.",
    duracion_dias: 5, duracion_noches: 4,
    servicios_incluidos: ["Alojamiento", "Alimentación según plan", "Traslados", "Tour a Johnny Cay y Acuario", "Vuelta a la isla"],
  }),
  p({
    id: 3, slug: "aventura-en-el-tayrona", nombre: "Aventura en el Tayrona", destino_id: 6,
    categorias: ["nacional", "aventura", "playa"], destacado: true,
    descripcion: "Senderismo por la selva hasta las playas más vírgenes del Caribe.",
    duracion_dias: 3, duracion_noches: 2,
    servicios_incluidos: ["Alojamiento", "Guía local", "Entrada al parque", "Transporte terrestre"],
  }),
  p({
    id: 4, slug: "guatape-y-el-penol", nombre: "Guatapé y la Piedra del Peñol", destino_id: 8,
    categorias: ["nacional", "familiar", "grupal"], destacado: true,
    descripcion: "Pasadía desde Medellín con paseo en lancha por el embalse.",
    duracion_dias: 1, duracion_noches: 0,
    servicios_incluidos: ["Transporte ida y regreso", "Guía", "Paseo en lancha", "Almuerzo típico"],
  }),
  p({
    id: 5, slug: "eje-cafetero-tradicional", nombre: "Eje Cafetero tradicional", destino_id: 11,
    categorias: ["nacional", "familiar", "cultural"], destacado: true,
    descripcion: "Salento, Valle del Cocora y una experiencia en finca cafetera.",
    duracion_dias: 4, duracion_noches: 3,
    servicios_incluidos: ["Alojamiento", "Desayunos", "Transporte", "Tour de café", "Visita al Valle del Cocora"],
  }),
  p({
    id: 6, slug: "amazonas-esencial", nombre: "Amazonas esencial", destino_id: 22,
    categorias: ["nacional", "aventura", "grupal"],
    descripcion: "Navegación por el río Amazonas y encuentro con la selva.",
    duracion_dias: 4, duracion_noches: 3,
    servicios_incluidos: ["Alojamiento", "Alimentación", "Traslados", "Excursiones en lancha", "Guía nativo"],
  }),
  p({
    id: 7, slug: "cancun-y-riviera-maya", nombre: "Cancún y Riviera Maya", destino_id: 27,
    categorias: ["internacional", "playa", "familiar", "romantico"], destacado: true,
    descripcion: "Playas del Caribe mexicano, cenotes y la zona arqueológica de Tulum.",
    duracion_dias: 6, duracion_noches: 5,
    servicios_incluidos: ["Alojamiento", "Plan todo incluido (según hotel)", "Traslados", "Asistencia al viajero"],
  }),
  p({
    id: 8, slug: "punta-cana-luna-de-miel", nombre: "Punta Cana luna de miel", destino_id: 28,
    categorias: ["internacional", "romantico", "playa"], destacado: true,
    descripcion: "Resort frente al mar y excursión a Isla Saona.",
    duracion_dias: 5, duracion_noches: 4,
    servicios_incluidos: ["Alojamiento en resort", "Todo incluido", "Traslados", "Excursión a Isla Saona"],
  }),
  p({
    id: 9, slug: "peru-machu-picchu", nombre: "Perú: Cusco y Machu Picchu", destino_id: 33,
    categorias: ["internacional", "cultural", "aventura"], destacado: true,
    descripcion: "Cusco, Valle Sagrado y la ciudadela inca de Machu Picchu.",
    duracion_dias: 6, duracion_noches: 5,
    servicios_incluidos: ["Alojamiento", "Desayunos", "Tren a Aguas Calientes", "Entradas", "Guía"],
  }),
  p({
    id: 10, slug: "orlando-en-familia", nombre: "Orlando en familia", destino_id: 32,
    categorias: ["internacional", "familiar"],
    descripcion: "Parques temáticos y diversión para grandes y pequeños.",
    duracion_dias: 7, duracion_noches: 6,
    servicios_incluidos: ["Alojamiento", "Entradas a parques (según plan)", "Traslados", "Asistencia al viajero"],
  }),
  p({
    id: 11, slug: "europa-clasica", nombre: "Europa clásica", destino_id: 36,
    categorias: ["internacional", "cultural", "grupal"], destacado: true,
    descripcion: "España, Francia e Italia en un circuito por sus ciudades más emblemáticas.",
    duracion_dias: 15, duracion_noches: 14,
    servicios_incluidos: ["Alojamiento", "Desayunos", "Transporte entre ciudades", "Visitas guiadas", "Asistencia al viajero"],
  }),
  p({
    id: 12, slug: "turquia-y-capadocia", nombre: "Estambul y Capadocia", destino_id: 42,
    categorias: ["internacional", "romantico", "cultural"],
    descripcion: "Bazares, mezquitas y amaneceres en globo sobre Capadocia.",
    duracion_dias: 9, duracion_noches: 8,
    servicios_incluidos: ["Alojamiento", "Desayunos", "Vuelo interno", "Visitas guiadas"],
  }),
];
