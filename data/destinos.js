// Lista de destinos. Cada destino tiene:
//  slug:        nombre corto para la URL (minúsculas, sin tildes ni espacios)
//  nombre:      como se muestra en la página
//  region:      "colombia" o "internacional"
//  zona:        región del país o del mundo
//  tipos:       experiencias (ids de data/experiencias.js)
//  descripcion: una frase corta
//  coordenadas: [latitud, longitud] para el mapa (null si no aplica)
//  foto:        (opcional) ruta de una foto propia. Si no hay, se usa
//               una foto según el tipo de experiencia.
//
// Lista de lugares populares: la agencia debe confirmar cuáles vende.

export const destinos = [
  // ---------- COLOMBIA · Caribe ----------
  { slug: "cartagena", nombre: "Cartagena", region: "colombia", zona: "Caribe", tipos: ["playa", "cultura"], descripcion: "Ciudad amurallada, calles coloniales y playas del Caribe.", coordenadas: [10.391, -75.479] },
  { slug: "islas-del-rosario", nombre: "Islas del Rosario y Barú", region: "colombia", zona: "Caribe", tipos: ["playa"], descripcion: "Islas de agua cristalina y arena blanca cerca de Cartagena.", coordenadas: [10.17, -75.75] },
  { slug: "san-andres", nombre: "San Andrés", region: "colombia", zona: "Caribe", tipos: ["playa"], descripcion: "La isla del mar de siete colores.", coordenadas: [12.584, -81.7] },
  { slug: "providencia", nombre: "Providencia", region: "colombia", zona: "Caribe", tipos: ["playa", "aventura"], descripcion: "Isla tranquila, arrecifes y naturaleza casi intacta.", coordenadas: [13.35, -81.37] },
  { slug: "santa-marta", nombre: "Santa Marta", region: "colombia", zona: "Caribe", tipos: ["playa", "cultura"], descripcion: "La ciudad más antigua de Colombia, entre el mar y la Sierra Nevada.", coordenadas: [11.24, -74.199] },
  { slug: "parque-tayrona", nombre: "Parque Tayrona", region: "colombia", zona: "Caribe", tipos: ["playa", "aventura"], descripcion: "Selva que llega al mar, caminatas y playas vírgenes.", coordenadas: [11.31, -73.97] },
  { slug: "minca", nombre: "Minca", region: "colombia", zona: "Caribe", tipos: ["aventura"], descripcion: "Pueblo de montaña con cascadas, café y aves.", coordenadas: [11.142, -74.117] },
  { slug: "palomino", nombre: "Palomino", region: "colombia", zona: "Caribe", tipos: ["playa", "aventura"], descripcion: "Playa tranquila donde el río se encuentra con el mar.", coordenadas: [11.247, -73.564] },
  { slug: "la-guajira", nombre: "La Guajira", region: "colombia", zona: "Caribe", tipos: ["aventura", "playa"], descripcion: "Desierto y mar en Cabo de la Vela y Punta Gallinas.", coordenadas: [12.2, -72.15] },
  { slug: "capurgana", nombre: "Capurganá y Sapzurro", region: "colombia", zona: "Caribe", tipos: ["playa", "aventura"], descripcion: "Pueblos sin carros, selva y playas junto a Panamá.", coordenadas: [8.633, -77.35] },
  { slug: "covenas", nombre: "Coveñas y Tolú", region: "colombia", zona: "Caribe", tipos: ["playa"], descripcion: "Playas familiares en el golfo de Morrosquillo.", coordenadas: [9.41, -75.68] },
  { slug: "rincon-del-mar", nombre: "Rincón del Mar", region: "colombia", zona: "Caribe", tipos: ["playa"], descripcion: "Pueblo de pescadores con mar calmado e islas cercanas.", coordenadas: [9.79, -75.64] },
  { slug: "mompox", nombre: "Mompox", region: "colombia", zona: "Caribe", tipos: ["cultura"], descripcion: "Pueblo colonial a orillas del río Magdalena.", coordenadas: [9.24, -74.43] },
  { slug: "ciudad-perdida", nombre: "Ciudad Perdida", region: "colombia", zona: "Caribe", tipos: ["aventura", "cultura"], descripcion: "Caminata de varios días a una antigua ciudad en la Sierra Nevada.", coordenadas: [11.038, -73.925] },

  // ---------- COLOMBIA · Antioquia ----------
  { slug: "medellin", nombre: "Medellín", region: "colombia", zona: "Antioquia", tipos: ["cultura"], descripcion: "La ciudad de la eterna primavera, metrocable y vida urbana.", coordenadas: [6.244, -75.581] },
  { slug: "guatape", nombre: "Guatapé", region: "colombia", zona: "Antioquia", tipos: ["aventura", "cultura"], descripcion: "La Piedra del Peñol, el embalse y zócalos de colores.", coordenadas: [6.233, -75.158] },
  { slug: "jardin", nombre: "Jardín", region: "colombia", zona: "Antioquia", tipos: ["cultura", "aventura"], descripcion: "Pueblo cafetero de balcones coloridos y montañas.", coordenadas: [5.598, -75.819] },
  { slug: "jerico", nombre: "Jericó", region: "colombia", zona: "Antioquia", tipos: ["cultura"], descripcion: "Pueblo patrimonio con iglesias, carrieles y miradores.", coordenadas: [5.79, -75.785] },
  { slug: "santa-fe-de-antioquia", nombre: "Santa Fe de Antioquia", region: "colombia", zona: "Antioquia", tipos: ["cultura"], descripcion: "Ciudad colonial de clima cálido y el Puente de Occidente.", coordenadas: [6.556, -75.828] },
  { slug: "rio-claro", nombre: "Río Claro", region: "colombia", zona: "Antioquia", tipos: ["aventura"], descripcion: "Cañón de mármol, río cristalino y deportes de aventura.", coordenadas: [5.9, -74.86] },

  // ---------- COLOMBIA · Eje Cafetero ----------
  { slug: "salento", nombre: "Salento y Valle de Cocora", region: "colombia", zona: "Eje Cafetero", tipos: ["aventura", "cultura"], descripcion: "Las palmas de cera más altas del mundo y fincas de café.", coordenadas: [4.637, -75.57] },
  { slug: "filandia", nombre: "Filandia", region: "colombia", zona: "Eje Cafetero", tipos: ["cultura"], descripcion: "Pueblo cafetero con casas de colores y mirador.", coordenadas: [4.674, -75.658] },
  { slug: "pereira", nombre: "Pereira", region: "colombia", zona: "Eje Cafetero", tipos: ["cultura"], descripcion: "Puerta al paisaje cafetero y a los termales.", coordenadas: [4.813, -75.696] },
  { slug: "armenia", nombre: "Armenia", region: "colombia", zona: "Eje Cafetero", tipos: ["cultura", "aventura"], descripcion: "Parques temáticos, café y paisaje cultural cafetero.", coordenadas: [4.533, -75.681] },
  { slug: "manizales", nombre: "Manizales", region: "colombia", zona: "Eje Cafetero", tipos: ["cultura", "aventura"], descripcion: "Ciudad de montaña cerca del Nevado del Ruiz.", coordenadas: [5.07, -75.513] },

  // ---------- COLOMBIA · Andes y centro ----------
  { slug: "bogota", nombre: "Bogotá", region: "colombia", zona: "Andes y centro", tipos: ["cultura"], descripcion: "La capital: museos, La Candelaria y Monserrate.", coordenadas: [4.711, -74.072] },
  { slug: "zipaquira", nombre: "Catedral de Sal de Zipaquirá", region: "colombia", zona: "Andes y centro", tipos: ["cultura"], descripcion: "Una catedral construida dentro de una mina de sal.", coordenadas: [5.022, -74.004] },
  { slug: "villa-de-leyva", nombre: "Villa de Leyva", region: "colombia", zona: "Andes y centro", tipos: ["cultura"], descripcion: "Pueblo colonial con una de las plazas más grandes del país.", coordenadas: [5.634, -73.524] },
  { slug: "barichara", nombre: "Barichara", region: "colombia", zona: "Andes y centro", tipos: ["cultura"], descripcion: "Pueblo de piedra y tejas, considerado de los más lindos del país.", coordenadas: [6.636, -73.223] },
  { slug: "san-gil", nombre: "San Gil", region: "colombia", zona: "Andes y centro", tipos: ["aventura"], descripcion: "Capital del turismo de aventura: rafting, parapente y más.", coordenadas: [6.555, -73.134] },
  { slug: "chicamocha", nombre: "Cañón del Chicamocha", region: "colombia", zona: "Andes y centro", tipos: ["aventura"], descripcion: "Cañón gigante con teleférico y miradores.", coordenadas: [6.79, -73.01] },

  // ---------- COLOMBIA · Sur ----------
  { slug: "cali", nombre: "Cali", region: "colombia", zona: "Sur", tipos: ["cultura"], descripcion: "La capital de la salsa, alegre y llena de sabor.", coordenadas: [3.451, -76.532] },
  { slug: "popayan", nombre: "Popayán", region: "colombia", zona: "Sur", tipos: ["cultura"], descripcion: "La ciudad blanca, famosa por su Semana Santa.", coordenadas: [2.444, -76.614] },
  { slug: "san-agustin", nombre: "San Agustín", region: "colombia", zona: "Sur", tipos: ["cultura"], descripcion: "Parque arqueológico con estatuas de piedra milenarias.", coordenadas: [1.888, -76.27] },
  { slug: "tatacoa", nombre: "Desierto de la Tatacoa", region: "colombia", zona: "Sur", tipos: ["aventura"], descripcion: "Paisajes rojos y grises y cielos ideales para ver estrellas.", coordenadas: [3.23, -75.17] },

  // ---------- COLOMBIA · Pacífico ----------
  { slug: "nuqui", nombre: "Nuquí", region: "colombia", zona: "Pacífico", tipos: ["aventura", "playa"], descripcion: "Selva, playas salvajes y avistamiento de ballenas.", coordenadas: [5.71, -77.27] },
  { slug: "bahia-solano", nombre: "Bahía Solano", region: "colombia", zona: "Pacífico", tipos: ["aventura", "playa"], descripcion: "Ballenas jorobadas, buceo y naturaleza del Chocó.", coordenadas: [6.22, -77.4] },

  // ---------- COLOMBIA · Selva y Llanos ----------
  { slug: "cano-cristales", nombre: "Caño Cristales", region: "colombia", zona: "Selva y Llanos", tipos: ["aventura"], descripcion: "El río de los cinco colores en La Macarena.", coordenadas: [2.26, -73.79] },
  { slug: "leticia", nombre: "Leticia y Amazonas", region: "colombia", zona: "Selva y Llanos", tipos: ["aventura"], descripcion: "La puerta a la selva amazónica y al río Amazonas.", coordenadas: [-4.215, -69.94] },
  { slug: "puerto-narino", nombre: "Puerto Nariño", region: "colombia", zona: "Selva y Llanos", tipos: ["aventura", "cultura"], descripcion: "Pueblo ecológico en el Amazonas, con delfines rosados.", coordenadas: [-3.77, -70.38] },

  // ---------- INTERNACIONALES ----------
  { slug: "cancun", nombre: "Cancún y Riviera Maya", region: "internacional", zona: "Caribe", tipos: ["playa", "cultura"], descripcion: "Playas turquesa, cenotes y ruinas mayas en México.", coordenadas: [21.161, -86.851] },
  { slug: "punta-cana", nombre: "Punta Cana", region: "internacional", zona: "Caribe", tipos: ["playa"], descripcion: "Resorts todo incluido en República Dominicana.", coordenadas: [18.582, -68.405] },
  { slug: "aruba", nombre: "Aruba", region: "internacional", zona: "Caribe", tipos: ["playa"], descripcion: "Isla feliz de playas blancas y buen clima todo el año.", coordenadas: [12.52, -69.97] },
  { slug: "curazao", nombre: "Curazao", region: "internacional", zona: "Caribe", tipos: ["playa", "cultura"], descripcion: "Casas de colores en Willemstad y playas escondidas.", coordenadas: [12.17, -68.99] },
  { slug: "cruceros-caribe", nombre: "Cruceros por el Caribe", region: "internacional", zona: "Caribe", tipos: ["cruceros"], descripcion: "Varias islas en un solo viaje, con todo a bordo.", coordenadas: null },
  { slug: "panama", nombre: "Panamá", region: "internacional", zona: "Centroamérica", tipos: ["cultura", "playa"], descripcion: "El Canal, el Casco Antiguo e islas de San Blas.", coordenadas: [8.983, -79.517] },
  { slug: "ciudad-de-mexico", nombre: "Ciudad de México", region: "internacional", zona: "Norteamérica", tipos: ["cultura"], descripcion: "Historia azteca, museos, comida y vida de ciudad.", coordenadas: [19.432, -99.133] },
  { slug: "miami", nombre: "Miami", region: "internacional", zona: "Norteamérica", tipos: ["playa", "cruceros"], descripcion: "Playas, compras y punto de salida de muchos cruceros.", coordenadas: [25.761, -80.191] },
  { slug: "orlando", nombre: "Orlando", region: "internacional", zona: "Norteamérica", tipos: ["cruceros"], descripcion: "La capital mundial de los parques temáticos.", coordenadas: [28.538, -81.379] },
  { slug: "nueva-york", nombre: "Nueva York", region: "internacional", zona: "Norteamérica", tipos: ["cultura"], descripcion: "Times Square, Central Park y la Estatua de la Libertad.", coordenadas: [40.712, -74.006] },
  { slug: "cusco", nombre: "Cusco y Machu Picchu", region: "internacional", zona: "Suramérica", tipos: ["cultura", "aventura"], descripcion: "La capital inca y la ciudadela de Machu Picchu en Perú.", coordenadas: [-13.532, -71.967] },
  { slug: "buenos-aires", nombre: "Buenos Aires", region: "internacional", zona: "Suramérica", tipos: ["cultura"], descripcion: "Tango, arquitectura europea y gastronomía argentina.", coordenadas: [-34.603, -58.381] },
  { slug: "rio-de-janeiro", nombre: "Río de Janeiro", region: "internacional", zona: "Suramérica", tipos: ["playa", "cultura"], descripcion: "Copacabana, el Cristo Redentor y el Pan de Azúcar.", coordenadas: [-22.906, -43.172] },
  { slug: "espana", nombre: "España", region: "internacional", zona: "Europa", tipos: ["cultura", "playa"], descripcion: "Madrid, Barcelona, Andalucía y la costa mediterránea.", coordenadas: [40.416, -3.703] },
  { slug: "francia", nombre: "Francia", region: "internacional", zona: "Europa", tipos: ["cultura"], descripcion: "París, la Torre Eiffel, castillos y viñedos.", coordenadas: [48.856, 2.352] },
  { slug: "alemania", nombre: "Alemania", region: "internacional", zona: "Europa", tipos: ["cultura"], descripcion: "Berlín, Múnich y pueblos de cuento junto al Rin.", coordenadas: [48.137, 11.575] },
  { slug: "italia", nombre: "Italia", region: "internacional", zona: "Europa", tipos: ["cultura"], descripcion: "Roma, Venecia, Florencia y la mejor comida italiana.", coordenadas: [41.902, 12.496] },
  { slug: "turquia", nombre: "Estambul y Capadocia", region: "internacional", zona: "Europa y Asia", tipos: ["cultura", "aventura"], descripcion: "Mezquitas, bazares y globos sobre Capadocia en Turquía.", coordenadas: [41.008, 28.978] },
  { slug: "dubai", nombre: "Dubái", region: "internacional", zona: "Medio Oriente", tipos: ["cultura", "aventura"], descripcion: "Rascacielos, desierto y compras en Emiratos Árabes.", coordenadas: [25.204, 55.27] },
];
