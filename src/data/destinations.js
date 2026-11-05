/**
 * Datos semilla de destinos. Se usan cuando Supabase no está configurado
 * y para poblar la base de datos (ver supabase/seed.sql).
 * Las imágenes se asignan en ./destination-images.js.
 *
 * categoria: playa | aventura | cultural | naturaleza | ciudad | romantico | familiar | gastronomia
 */

const d = (o) => ({ estado: "activo", destacado: false, galeria: [], clima: null, ...o });

export const destinations = [
  // ───────────── CARIBE COLOMBIANO ─────────────
  d({
    id: 1, slug: "cartagena", nombre: "Cartagena", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Caribe colombiano", ubicacion: "Bolívar, Colombia", destacado: true,
    categoria: ["playa", "cultural", "romantico"],
    resumen: "Ciudad amurallada, balcones floridos y atardeceres frente al mar Caribe.",
    descripcion:
      "Cartagena de Indias combina historia colonial, gastronomía y playas cercanas. Su centro histórico, declarado Patrimonio de la Humanidad por la UNESCO, invita a recorrer calles coloridas, plazas y murallas, mientras las islas cercanas ofrecen aguas cristalinas para descansar.",
    actividades: ["Recorrido por la ciudad amurallada", "Paseo a Islas del Rosario", "Tour en chiva rumbera", "Atardecer en las murallas", "Visita a Playa Blanca (Barú)"],
    lugares: ["Centro histórico", "Castillo San Felipe de Barajas", "Barrio Getsemaní", "Islas del Rosario", "Bocagrande"],
    clima: "Cálido tropical durante todo el año, con temperaturas que suelen estar entre 25 °C y 32 °C.",
  }),
  d({
    id: 2, slug: "santa-marta", nombre: "Santa Marta", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Caribe colombiano", ubicacion: "Magdalena, Colombia", destacado: true,
    categoria: ["playa", "naturaleza", "familiar"],
    resumen: "Donde la Sierra Nevada se encuentra con el mar Caribe.",
    descripcion:
      "Santa Marta es una de las ciudades más antiguas de Colombia y puerta de entrada a la Sierra Nevada, el Parque Tayrona y Minca. Es ideal para combinar playa, naturaleza y cultura en un mismo viaje.",
    actividades: ["Tour a Minca y sus cascadas", "Visita al Parque Tayrona", "Playas de Taganga y Rodadero", "Avistamiento de aves"],
    lugares: ["Centro histórico", "Quinta de San Pedro Alejandrino", "Minca", "El Rodadero", "Taganga"],
    clima: "Cálido y seco la mayor parte del año, con temperaturas habituales entre 27 °C y 33 °C.",
  }),
  d({
    id: 3, slug: "san-andres", nombre: "San Andrés", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Caribe colombiano", ubicacion: "Archipiélago de San Andrés, Providencia y Santa Catalina", destacado: true,
    categoria: ["playa", "familiar", "romantico"],
    resumen: "El mar de los siete colores en una isla para disfrutar sin prisa.",
    descripcion:
      "San Andrés es famosa por su mar de tonos turquesa, sus cayos y su cultura raizal. Es un destino perfecto para descansar, practicar snorkel y recorrer la isla en mula o carrito de golf.",
    actividades: ["Tour a Johnny Cay y el Acuario", "Snorkel y buceo", "Vuelta a la isla", "Visita a la Piscinita y West View"],
    lugares: ["Johnny Cay", "Cayo Acuario", "Hoyo Soplador", "Spratt Bight", "La Piscinita"],
    clima: "Cálido tropical, con temperaturas cercanas a 27 °C – 30 °C casi todo el año.",
  }),
  d({
    id: 4, slug: "la-guajira", nombre: "La Guajira", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Caribe colombiano", ubicacion: "La Guajira, Colombia",
    categoria: ["aventura", "naturaleza", "cultural"],
    resumen: "Desierto, dunas y mar en el extremo norte de Suramérica.",
    descripcion:
      "La Guajira ofrece paisajes únicos donde el desierto se encuentra con el mar. Es tierra del pueblo wayuu y escenario de experiencias como el Cabo de la Vela y Punta Gallinas.",
    actividades: ["Expedición a Punta Gallinas", "Atardecer en el Cabo de la Vela", "Visita a rancherías wayuu", "Paseo por las dunas de Taroa"],
    lugares: ["Cabo de la Vela", "Punta Gallinas", "Dunas de Taroa", "Riohacha", "Pilón de Azúcar"],
    clima: "Cálido y seco, con vientos constantes y temperaturas que pueden superar los 30 °C.",
  }),
  d({
    id: 5, slug: "palomino", nombre: "Palomino", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Caribe colombiano", ubicacion: "La Guajira, Colombia",
    categoria: ["playa", "naturaleza", "aventura"],
    resumen: "Playas tranquilas y tubing por el río que baja de la Sierra Nevada.",
    descripcion:
      "Palomino es un pequeño pueblo costero rodeado de naturaleza, donde el río del mismo nombre desemboca en el mar. Es un destino tranquilo para desconectarse y vivir experiencias al aire libre.",
    actividades: ["Tubing por el río Palomino", "Caminatas por la selva", "Yoga y descanso frente al mar"],
    lugares: ["Desembocadura del río Palomino", "Playa de Palomino", "Sierra Nevada de Santa Marta"],
    clima: "Cálido tropical, con temperaturas habituales entre 25 °C y 32 °C.",
  }),
  d({
    id: 6, slug: "parque-tayrona", nombre: "Parque Tayrona", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Caribe colombiano", ubicacion: "Magdalena, Colombia", destacado: true,
    categoria: ["naturaleza", "playa", "aventura"],
    resumen: "Playas vírgenes, selva tropical y senderos ancestrales.",
    descripcion:
      "El Parque Nacional Natural Tayrona protege playas, bosques y vestigios de la cultura tayrona. Sus senderos conducen a lugares emblemáticos como Cabo San Juan y Arrecifes. Tiene cierres temporales a lo largo del año, por lo que conviene planear con anticipación.",
    actividades: ["Caminata a Cabo San Juan", "Snorkel en La Piscina", "Visita a Pueblito", "Acampar o dormir en ecohabs"],
    lugares: ["Cabo San Juan del Guía", "Arrecifes", "La Piscina", "Playa Cristal", "Pueblito"],
    clima: "Cálido y húmedo, con temperaturas entre 25 °C y 32 °C.",
  }),

  // ───────────── ANTIOQUIA ─────────────
  d({
    id: 7, slug: "medellin", nombre: "Medellín", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Antioquia", ubicacion: "Antioquia, Colombia", destacado: true,
    categoria: ["ciudad", "cultural", "gastronomia"],
    resumen: "La ciudad de la eterna primavera, innovadora y llena de vida.",
    descripcion:
      "Medellín es reconocida por su clima agradable, su transformación urbana y la calidez de su gente. Sus metrocables, parques, museos y miradores muestran una ciudad vibrante rodeada de montañas.",
    actividades: ["Recorrido por la Comuna 13", "Paseo en metrocable al Parque Arví", "Tour de café y gastronomía", "Visita a museos y plazas"],
    lugares: ["Plaza Botero", "Comuna 13", "Parque Arví", "Pueblito Paisa", "Jardín Botánico"],
    clima: "Templado y primaveral, con temperaturas habituales entre 17 °C y 28 °C.",
  }),
  d({
    id: 8, slug: "guatape", nombre: "Guatapé", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Antioquia", ubicacion: "Antioquia, Colombia", destacado: true,
    categoria: ["naturaleza", "familiar", "aventura"],
    resumen: "Zócalos de colores y la vista inolvidable desde la Piedra del Peñol.",
    descripcion:
      "Guatapé es un pueblo lleno de color junto a un gran embalse. Subir los escalones de la Piedra del Peñol y navegar entre sus islas son experiencias imprescindibles a pocas horas de Medellín.",
    actividades: ["Ascenso a la Piedra del Peñol", "Paseo en lancha por el embalse", "Recorrido por los zócalos", "Deportes náuticos"],
    lugares: ["Piedra del Peñol", "Calle de los Recuerdos", "Malecón de Guatapé", "Embalse Peñol-Guatapé"],
    clima: "Templado, con temperaturas entre 16 °C y 26 °C.",
  }),
  d({
    id: 9, slug: "jardin", nombre: "Jardín", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Antioquia", ubicacion: "Suroeste antioqueño, Colombia",
    categoria: ["naturaleza", "cultural", "romantico"],
    resumen: "Un pueblo patrimonio rodeado de montañas cafeteras y cascadas.",
    descripcion:
      "Jardín conserva la arquitectura tradicional antioqueña con balcones coloridos y una imponente basílica. Sus alrededores ofrecen cascadas, cuevas y fincas cafeteras.",
    actividades: ["Visita a la Cueva del Esplendor", "Paseo en garrucha", "Tour de café", "Avistamiento del gallito de roca"],
    lugares: ["Basílica de la Inmaculada Concepción", "Cueva del Esplendor", "Cerro Cristo Rey", "Charco Corazón"],
    clima: "Templado de montaña, entre 15 °C y 24 °C.",
  }),
  d({
    id: 10, slug: "santa-fe-de-antioquia", nombre: "Santa Fe de Antioquia", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Antioquia", ubicacion: "Occidente antioqueño, Colombia",
    categoria: ["cultural", "familiar"],
    resumen: "Calles empedradas, historia colonial y clima cálido.",
    descripcion:
      "Santa Fe de Antioquia fue capital de la provincia y conserva un centro histórico de casonas coloniales. Es un plan ideal de descanso con piscina y cultura, cerca de Medellín.",
    actividades: ["Recorrido por el centro histórico", "Visita al Puente de Occidente", "Descanso en hoteles campestres"],
    lugares: ["Puente de Occidente", "Catedral Basílica", "Plaza Mayor", "Museo Juan del Corral"],
    clima: "Cálido, con temperaturas que suelen estar entre 24 °C y 34 °C.",
  }),

  // ───────────── EJE CAFETERO ─────────────
  d({
    id: 11, slug: "salento", nombre: "Salento", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Eje Cafetero", ubicacion: "Quindío, Colombia", destacado: true,
    categoria: ["naturaleza", "cultural", "familiar"],
    resumen: "El pueblo más tradicional del Paisaje Cultural Cafetero.",
    descripcion:
      "Salento es famoso por sus casas de colores, su artesanía y su cercanía al Valle del Cocora. Es la base perfecta para conocer fincas cafeteras y paisajes de montaña.",
    actividades: ["Tour de café en finca", "Caminata al Valle del Cocora", "Recorrido por la Calle Real", "Mirador de Salento"],
    lugares: ["Calle Real", "Mirador Alto de la Cruz", "Fincas cafeteras", "Valle del Cocora"],
    clima: "Templado de montaña, entre 14 °C y 24 °C.",
  }),
  d({
    id: 12, slug: "pereira", nombre: "Pereira", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Eje Cafetero", ubicacion: "Risaralda, Colombia",
    categoria: ["ciudad", "naturaleza", "familiar"],
    resumen: "Ciudad cafetera, puerta de termales y paisajes verdes.",
    descripcion:
      "Pereira es un punto estratégico para explorar el Eje Cafetero. Desde allí se accede a termales, parques temáticos y reservas naturales.",
    actividades: ["Visita a termales de Santa Rosa de Cabal", "Parque Ukumarí", "Tour de café", "Recorrido urbano"],
    lugares: ["Termales de Santa Rosa", "Plaza de Bolívar", "Parque Ukumarí", "Viaducto César Gaviria Trujillo"],
    clima: "Templado, con temperaturas entre 17 °C y 27 °C.",
  }),
  d({
    id: 13, slug: "armenia", nombre: "Armenia", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Eje Cafetero", ubicacion: "Quindío, Colombia",
    categoria: ["familiar", "naturaleza", "cultural"],
    resumen: "Parques temáticos y cultura cafetera para toda la familia.",
    descripcion:
      "Armenia, capital del Quindío, está rodeada de parques temáticos, fincas y pueblos tradicionales. Es un destino muy apreciado por familias.",
    actividades: ["Parque del Café", "Panaca", "Jardín Botánico del Quindío y mariposario", "Visita a Filandia"],
    lugares: ["Parque del Café", "Panaca", "Jardín Botánico del Quindío", "Filandia"],
    clima: "Templado, con temperaturas entre 17 °C y 27 °C.",
  }),
  d({
    id: 14, slug: "valle-del-cocora", nombre: "Valle del Cocora", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Eje Cafetero", ubicacion: "Salento, Quindío, Colombia", destacado: true,
    categoria: ["naturaleza", "aventura"],
    resumen: "Las palmas de cera más altas del mundo entre montañas y niebla.",
    descripcion:
      "El Valle del Cocora es hogar de la palma de cera, árbol nacional de Colombia. Sus senderos atraviesan bosques de niebla, ríos y miradores con paisajes de postal.",
    actividades: ["Caminata por el valle", "Cabalgata", "Visita a la Casa de los Colibríes", "Fotografía de paisaje"],
    lugares: ["Bosque de palmas de cera", "Acaime (Casa de los Colibríes)", "Mirador La Montaña"],
    clima: "Fresco de montaña, entre 10 °C y 20 °C; se recomienda llevar abrigo.",
  }),

  // ───────────── REGIÓN ANDINA ─────────────
  d({
    id: 15, slug: "bogota", nombre: "Bogotá", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Región Andina", ubicacion: "Cundinamarca, Colombia",
    categoria: ["ciudad", "cultural", "gastronomia"],
    resumen: "Capital cultural con museos, historia y gastronomía de primer nivel.",
    descripcion:
      "Bogotá ofrece museos de talla mundial, un centro histórico vibrante y una escena gastronómica diversa. Desde Monserrate se aprecia la inmensidad de la ciudad.",
    actividades: ["Subida a Monserrate", "Recorrido por La Candelaria", "Visita al Museo del Oro", "Excursión a la Catedral de Sal de Zipaquirá"],
    lugares: ["Monserrate", "La Candelaria", "Museo del Oro", "Museo Botero", "Usaquén"],
    clima: "Frío de montaña, con temperaturas habituales entre 8 °C y 20 °C.",
  }),
  d({
    id: 16, slug: "villa-de-leyva", nombre: "Villa de Leyva", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Región Andina", ubicacion: "Boyacá, Colombia",
    categoria: ["cultural", "romantico", "familiar"],
    resumen: "Una de las plazas coloniales más grandes de Suramérica.",
    descripcion:
      "Villa de Leyva conserva su arquitectura colonial y sus calles empedradas. A su alrededor hay viñedos, pozos azules, fósiles y paisajes semidesérticos.",
    actividades: ["Recorrido por la Plaza Mayor", "Visita al Pozo Azul", "Museo del Fósil", "Casa Terracota"],
    lugares: ["Plaza Mayor", "Casa Terracota", "Museo El Fósil", "Pozos Azules"],
    clima: "Templado y seco, entre 12 °C y 24 °C.",
  }),
  d({
    id: 17, slug: "santander", nombre: "Santander", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Región Andina", ubicacion: "Santander, Colombia",
    categoria: ["aventura", "naturaleza"],
    resumen: "Capital del turismo de aventura en Colombia.",
    descripcion:
      "Santander es tierra de cañones, ríos y deportes extremos. San Gil es el centro de actividades como rafting, parapente y torrentismo, mientras el Cañón del Chicamocha sorprende con su inmensidad.",
    actividades: ["Rafting en el río Fonce", "Parapente en el Chicamocha", "Torrentismo", "Parque Nacional del Chicamocha"],
    lugares: ["Cañón del Chicamocha", "San Gil", "Parque El Gallineral", "Cascadas de Juan Curí"],
    clima: "Variado según la zona; en San Gil suele estar entre 20 °C y 30 °C.",
  }),
  d({
    id: 18, slug: "barichara", nombre: "Barichara", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Región Andina", ubicacion: "Santander, Colombia",
    categoria: ["cultural", "romantico"],
    resumen: "Calles de piedra y casas de tapia en un pueblo detenido en el tiempo.",
    descripcion:
      "Barichara es uno de los pueblos más bellos de Colombia. Sus casas blancas, calles en piedra y el Camino Real hacia Guane lo convierten en un destino tranquilo y romántico.",
    actividades: ["Caminata por el Camino Real a Guane", "Recorrido por el pueblo", "Talleres de papel artesanal"],
    lugares: ["Camino Real", "Mirador de Barichara", "Catedral de la Inmaculada Concepción", "Guane"],
    clima: "Templado y seco, entre 18 °C y 28 °C.",
  }),

  // ───────────── PACÍFICO ─────────────
  d({
    id: 19, slug: "nuqui", nombre: "Nuquí", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Pacífico", ubicacion: "Chocó, Colombia",
    categoria: ["naturaleza", "aventura", "playa"],
    resumen: "Selva, mar y avistamiento de ballenas en el Pacífico.",
    descripcion:
      "Nuquí es un destino de naturaleza donde la selva llega hasta el mar. Entre julio y octubre es posible avistar ballenas jorobadas, además de disfrutar termales, cascadas y playas solitarias.",
    actividades: ["Avistamiento de ballenas (temporada)", "Termales de Jurubirá", "Caminatas por la selva", "Surf"],
    lugares: ["Playa Guachalito", "Termales", "Cascada del Amor", "Parque Nacional Utría"],
    clima: "Cálido y muy húmedo, con lluvias frecuentes durante el año.",
  }),
  d({
    id: 20, slug: "bahia-solano", nombre: "Bahía Solano", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Pacífico", ubicacion: "Chocó, Colombia",
    categoria: ["naturaleza", "aventura"],
    resumen: "Biodiversidad, buceo y playas rodeadas de selva.",
    descripcion:
      "Bahía Solano es un paraíso para los amantes de la naturaleza, con playas de arena oscura, cascadas y una gran biodiversidad marina. Es otro punto destacado para el avistamiento de ballenas.",
    actividades: ["Avistamiento de ballenas (temporada)", "Buceo", "Pesca deportiva", "Visita a cascadas"],
    lugares: ["Playa El Almejal", "Parque Nacional Utría", "Cascada El Tigre"],
    clima: "Cálido y húmedo, con lluvias frecuentes.",
  }),
  d({
    id: 21, slug: "buenaventura", nombre: "Buenaventura", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Pacífico", ubicacion: "Valle del Cauca, Colombia",
    categoria: ["naturaleza", "gastronomia"],
    resumen: "Puerta al Pacífico vallecaucano, con playas y sabores del mar.",
    descripcion:
      "Buenaventura es el principal puerto del Pacífico colombiano y punto de partida hacia playas como Juanchaco, Ladrilleros y La Bocana, además de experiencias de avistamiento de ballenas.",
    actividades: ["Paseo a Juanchaco y Ladrilleros", "Avistamiento de ballenas (temporada)", "Gastronomía del Pacífico"],
    lugares: ["Juanchaco", "Ladrilleros", "La Bocana", "Malecón Bahía de la Cruz"],
    clima: "Cálido y húmedo, con lluvias frecuentes.",
  }),

  // ───────────── AMAZONÍA ─────────────
  d({
    id: 22, slug: "leticia", nombre: "Leticia", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Amazonía", ubicacion: "Amazonas, Colombia", destacado: true,
    categoria: ["naturaleza", "aventura", "cultural"],
    resumen: "La puerta a la selva amazónica y al río más caudaloso del mundo.",
    descripcion:
      "Leticia está en la triple frontera entre Colombia, Brasil y Perú. Desde allí se navega el río Amazonas, se visitan comunidades indígenas y se vive la selva de cerca.",
    actividades: ["Navegación por el río Amazonas", "Avistamiento de delfines rosados", "Visita a la Isla de los Micos", "Caminatas por la selva"],
    lugares: ["Río Amazonas", "Isla de los Micos", "Parque Santander", "Lagos de Tarapoto"],
    clima: "Cálido y húmedo, con temperaturas entre 24 °C y 32 °C.",
  }),
  d({
    id: 23, slug: "puerto-narino", nombre: "Puerto Nariño", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Amazonía", ubicacion: "Amazonas, Colombia",
    categoria: ["naturaleza", "cultural"],
    resumen: "Un pueblo amazónico sin carros, rodeado de lagos y selva.",
    descripcion:
      "Puerto Nariño es conocido como un pesebre natural por su tranquilidad y su compromiso ambiental. Es punto de partida hacia los lagos de Tarapoto.",
    actividades: ["Visita a los lagos de Tarapoto", "Avistamiento de delfines", "Recorrido por el pueblo", "Mirador Naipata"],
    lugares: ["Lagos de Tarapoto", "Mirador Naipata", "Fundación Natütama"],
    clima: "Cálido y húmedo, con lluvias frecuentes.",
  }),

  // ───────────── LLANOS ORIENTALES ─────────────
  d({
    id: 24, slug: "villavicencio", nombre: "Villavicencio", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Llanos Orientales", ubicacion: "Meta, Colombia",
    categoria: ["naturaleza", "cultural", "gastronomia"],
    resumen: "Cultura llanera, joropo y atardeceres infinitos.",
    descripcion:
      "Villavicencio es la puerta de entrada a los Llanos Orientales. Su cultura llanera, su gastronomía y sus paisajes de sabana son el atractivo principal.",
    actividades: ["Bioparque Los Ocarros", "Experiencia de cultura llanera", "Ruta del Amor Patrio", "Gastronomía: mamona"],
    lugares: ["Bioparque Los Ocarros", "Parque Las Malocas", "Catedral de Nuestra Señora del Carmen"],
    clima: "Cálido, con temperaturas entre 22 °C y 32 °C.",
  }),
  d({
    id: 25, slug: "cano-cristales", nombre: "Caño Cristales", tipo: "nacional", pais: "Colombia", continente: "América",
    region: "Llanos Orientales", ubicacion: "La Macarena, Meta, Colombia", destacado: true,
    categoria: ["naturaleza", "aventura"],
    resumen: "El río de los cinco colores, una joya natural única.",
    descripcion:
      "Caño Cristales, en la Serranía de La Macarena, se tiñe de rojo, amarillo, verde y otros colores gracias a una planta acuática endémica. Su temporada de visita suele ir de junio a noviembre.",
    actividades: ["Caminatas guiadas por el río", "Baño en pozos autorizados", "Visita a miradores de La Macarena"],
    lugares: ["Caño Cristales", "Cristalitos", "Raudal de Angosturas"],
    clima: "Cálido, con temperaturas entre 25 °C y 33 °C.",
  }),

  // ───────────── INTERNACIONAL · AMÉRICA ─────────────
  d({
    id: 26, slug: "mexico", nombre: "México", tipo: "internacional", pais: "México", continente: "América",
    region: "América", ubicacion: "México", destacado: true,
    categoria: ["cultural", "gastronomia", "playa"],
    resumen: "Cultura milenaria, gastronomía vibrante y playas espectaculares.",
    descripcion:
      "México sorprende con su diversidad: ruinas mayas y aztecas, ciudades coloniales, una de las gastronomías más reconocidas del mundo y playas en el Caribe y el Pacífico.",
    actividades: ["Visita a Chichén Itzá", "Recorrido por Ciudad de México", "Teotihuacán", "Ruta gastronómica"],
    lugares: ["Chichén Itzá", "Ciudad de México", "Teotihuacán", "Oaxaca"],
  }),
  d({
    id: 27, slug: "cancun", nombre: "Cancún", tipo: "internacional", pais: "México", continente: "América",
    region: "América", ubicacion: "Quintana Roo, México", destacado: true,
    categoria: ["playa", "familiar", "romantico"],
    resumen: "Arena blanca, mar turquesa y la Riviera Maya a tus pies.",
    descripcion:
      "Cancún es uno de los destinos de playa más populares del Caribe. Desde allí se exploran cenotes, parques ecológicos, Isla Mujeres y la Riviera Maya.",
    actividades: ["Visita a Isla Mujeres", "Cenotes", "Parques temáticos", "Tour a Tulum"],
    lugares: ["Zona Hotelera", "Isla Mujeres", "Tulum", "Playa del Carmen"],
    clima: "Cálido tropical, entre 24 °C y 33 °C.",
  }),
  d({
    id: 28, slug: "punta-cana", nombre: "Punta Cana", tipo: "internacional", pais: "República Dominicana", continente: "América",
    region: "América", ubicacion: "La Altagracia, República Dominicana", destacado: true,
    categoria: ["playa", "romantico", "familiar"],
    resumen: "Resorts frente al mar y playas de palmeras infinitas.",
    descripcion:
      "Punta Cana es sinónimo de descanso: playas de arena blanca, resorts y actividades acuáticas. Es ideal para lunas de miel y vacaciones en familia.",
    actividades: ["Excursión a Isla Saona", "Snorkel", "Paseo en catamarán", "Descanso en resort"],
    lugares: ["Playa Bávaro", "Isla Saona", "Cap Cana", "Hoyo Azul"],
    clima: "Cálido tropical, entre 24 °C y 31 °C.",
  }),
  d({
    id: 29, slug: "republica-dominicana", nombre: "República Dominicana", tipo: "internacional", pais: "República Dominicana", continente: "América",
    region: "América", ubicacion: "República Dominicana",
    categoria: ["cultural", "playa"],
    resumen: "Historia colonial en Santo Domingo y playas caribeñas.",
    descripcion:
      "Más allá de sus playas, República Dominicana guarda en Santo Domingo la primera ciudad europea de América, con una Zona Colonial llena de historia, además de paisajes de montaña y ballenas en Samaná.",
    actividades: ["Recorrido por la Zona Colonial", "Excursión a Samaná", "Playas de Bayahíbe"],
    lugares: ["Zona Colonial de Santo Domingo", "Samaná", "Bayahíbe", "Puerto Plata"],
  }),
  d({
    id: 30, slug: "panama", nombre: "Panamá", tipo: "internacional", pais: "Panamá", continente: "América",
    region: "América", ubicacion: "Panamá",
    categoria: ["ciudad", "playa", "cultural"],
    resumen: "Rascacielos, el Canal de Panamá e islas paradisíacas.",
    descripcion:
      "Panamá combina una capital moderna con el histórico Casco Antiguo, el famoso Canal y destinos de playa como San Blas y Bocas del Toro.",
    actividades: ["Visita al Canal de Panamá (Miraflores)", "Recorrido por el Casco Antiguo", "Excursión a San Blas"],
    lugares: ["Canal de Panamá", "Casco Antiguo", "Cinta Costera", "Islas de San Blas"],
  }),
  d({
    id: 31, slug: "estados-unidos", nombre: "Estados Unidos", tipo: "internacional", pais: "Estados Unidos", continente: "América",
    region: "América", ubicacion: "Estados Unidos",
    categoria: ["ciudad", "cultural", "familiar"],
    resumen: "Ciudades icónicas, parques nacionales y entretenimiento.",
    descripcion:
      "Estados Unidos ofrece experiencias para todos: la energía de Nueva York, las playas de Miami, los parques temáticos de Orlando y parques nacionales impresionantes.",
    actividades: ["Recorrido por Nueva York", "Compras", "Parques temáticos", "Parques nacionales"],
    lugares: ["Nueva York", "Miami", "Los Ángeles", "Las Vegas"],
  }),
  d({
    id: 32, slug: "orlando", nombre: "Orlando", tipo: "internacional", pais: "Estados Unidos", continente: "América",
    region: "América", ubicacion: "Florida, Estados Unidos", destacado: true,
    categoria: ["familiar"],
    resumen: "La capital mundial de los parques temáticos.",
    descripcion:
      "Orlando es el destino soñado para viajar en familia, con parques temáticos de fama mundial, parques acuáticos y zonas de compras.",
    actividades: ["Parques temáticos", "Parques acuáticos", "Compras en outlets", "Kennedy Space Center"],
    lugares: ["Parques temáticos", "Disney Springs", "Kennedy Space Center", "International Drive"],
  }),
  d({
    id: 33, slug: "peru", nombre: "Perú", tipo: "internacional", pais: "Perú", continente: "América",
    region: "América", ubicacion: "Perú", destacado: true,
    categoria: ["cultural", "aventura", "gastronomia"],
    resumen: "Machu Picchu, los Andes y una gastronomía reconocida mundialmente.",
    descripcion:
      "Perú es historia viva: la ciudadela inca de Machu Picchu, el Valle Sagrado y Cusco, junto con Lima, una de las capitales gastronómicas de América.",
    actividades: ["Visita a Machu Picchu", "Recorrido por el Valle Sagrado", "Tour gastronómico en Lima", "Montaña de Colores"],
    lugares: ["Machu Picchu", "Cusco", "Valle Sagrado", "Lima"],
  }),
  d({
    id: 34, slug: "argentina", nombre: "Argentina", tipo: "internacional", pais: "Argentina", continente: "América",
    region: "América", ubicacion: "Argentina",
    categoria: ["naturaleza", "cultural", "gastronomia"],
    resumen: "Tango en Buenos Aires, glaciares en la Patagonia y vinos en Mendoza.",
    descripcion:
      "Argentina ofrece contrastes extraordinarios: la vida cultural de Buenos Aires, los glaciares de la Patagonia, las Cataratas del Iguazú y los viñedos de Mendoza.",
    actividades: ["Show de tango", "Glaciar Perito Moreno", "Cataratas del Iguazú", "Ruta del vino en Mendoza"],
    lugares: ["Buenos Aires", "El Calafate", "Iguazú", "Mendoza", "Bariloche"],
  }),
  d({
    id: 35, slug: "brasil", nombre: "Brasil", tipo: "internacional", pais: "Brasil", continente: "América",
    region: "América", ubicacion: "Brasil",
    categoria: ["playa", "ciudad", "cultural"],
    resumen: "Playas, samba y paisajes inolvidables.",
    descripcion:
      "Brasil es alegría y naturaleza: Río de Janeiro con el Cristo Redentor y el Pan de Azúcar, playas del nordeste y la inmensidad de sus paisajes.",
    actividades: ["Cristo Redentor", "Pan de Azúcar", "Playas de Copacabana e Ipanema", "Cataratas del Iguazú (lado brasileño)"],
    lugares: ["Río de Janeiro", "Salvador de Bahía", "Florianópolis", "Foz do Iguaçu"],
  }),

  // ───────────── INTERNACIONAL · EUROPA ─────────────
  d({
    id: 36, slug: "espana", nombre: "España", tipo: "internacional", pais: "España", continente: "Europa",
    region: "Europa", ubicacion: "España", destacado: true,
    categoria: ["cultural", "ciudad", "gastronomia"],
    resumen: "Arte, historia y gastronomía en cada ciudad.",
    descripcion:
      "España combina ciudades llenas de vida como Madrid y Barcelona con el encanto andaluz de Sevilla y Granada, además de playas mediterráneas y una gastronomía única.",
    actividades: ["Sagrada Familia en Barcelona", "Museo del Prado en Madrid", "Alhambra de Granada", "Ruta de tapas"],
    lugares: ["Madrid", "Barcelona", "Sevilla", "Granada", "Valencia"],
  }),
  d({
    id: 37, slug: "francia", nombre: "Francia", tipo: "internacional", pais: "Francia", continente: "Europa",
    region: "Europa", ubicacion: "Francia", destacado: true,
    categoria: ["romantico", "cultural", "ciudad"],
    resumen: "París, la Costa Azul y castillos de cuento.",
    descripcion:
      "Francia es uno de los destinos más visitados del mundo. París enamora con la Torre Eiffel y el Louvre, mientras regiones como la Provenza y la Costa Azul ofrecen paisajes inolvidables.",
    actividades: ["Torre Eiffel", "Museo del Louvre", "Crucero por el Sena", "Palacio de Versalles"],
    lugares: ["París", "Versalles", "Niza", "Mont-Saint-Michel"],
  }),
  d({
    id: 38, slug: "italia", nombre: "Italia", tipo: "internacional", pais: "Italia", continente: "Europa",
    region: "Europa", ubicacion: "Italia",
    categoria: ["cultural", "romantico", "gastronomia"],
    resumen: "Roma, Venecia y Florencia: arte e historia en cada rincón.",
    descripcion:
      "Italia es un museo a cielo abierto. El Coliseo de Roma, los canales de Venecia, el arte de Florencia y la Costa Amalfitana son solo el comienzo.",
    actividades: ["Coliseo y Foro Romano", "Paseo en góndola", "Galería Uffizi", "Costa Amalfitana"],
    lugares: ["Roma", "Venecia", "Florencia", "Milán", "Costa Amalfitana"],
  }),
  d({
    id: 39, slug: "suiza", nombre: "Suiza", tipo: "internacional", pais: "Suiza", continente: "Europa",
    region: "Europa", ubicacion: "Suiza",
    categoria: ["naturaleza", "romantico", "aventura"],
    resumen: "Alpes, lagos cristalinos y trenes panorámicos.",
    descripcion:
      "Suiza ofrece paisajes de montaña espectaculares, lagos de aguas cristalinas y ciudades ordenadas y elegantes. Sus trenes panorámicos son una experiencia en sí mismos.",
    actividades: ["Trenes panorámicos", "Ascenso a montañas alpinas", "Recorrido por Lucerna", "Chocolate y quesos suizos"],
    lugares: ["Zermatt y el Matterhorn", "Lucerna", "Interlaken", "Zúrich"],
  }),
  d({
    id: 40, slug: "alemania", nombre: "Alemania", tipo: "internacional", pais: "Alemania", continente: "Europa",
    region: "Europa", ubicacion: "Alemania",
    categoria: ["cultural", "ciudad"],
    resumen: "Castillos, historia y ciudades llenas de cultura.",
    descripcion:
      "Alemania combina historia y modernidad: Berlín y su legado histórico, Múnich y sus tradiciones, y castillos de cuento como Neuschwanstein.",
    actividades: ["Castillo de Neuschwanstein", "Puerta de Brandeburgo", "Recorrido por Múnich", "Ruta Romántica"],
    lugares: ["Berlín", "Múnich", "Neuschwanstein", "Colonia"],
  }),

  // ───────────── INTERNACIONAL · OTROS DESTINOS ─────────────
  d({
    id: 41, slug: "dubai", nombre: "Dubái", tipo: "internacional", pais: "Emiratos Árabes Unidos", continente: "Asia",
    region: "Otros destinos", ubicacion: "Emiratos Árabes Unidos", destacado: true,
    categoria: ["ciudad", "aventura", "romantico"],
    resumen: "Lujo, arquitectura futurista y aventuras en el desierto.",
    descripcion:
      "Dubái impresiona con el Burj Khalifa, sus islas artificiales, centros comerciales y safaris por el desierto. Un destino donde la tradición árabe y la modernidad conviven.",
    actividades: ["Burj Khalifa", "Safari en el desierto", "Dubai Marina", "Zocos del oro y las especias"],
    lugares: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Dubai Marina"],
  }),
  d({
    id: 42, slug: "turquia", nombre: "Turquía", tipo: "internacional", pais: "Turquía", continente: "Asia",
    region: "Otros destinos", ubicacion: "Turquía",
    categoria: ["cultural", "romantico", "aventura"],
    resumen: "Estambul entre dos continentes y globos sobre Capadocia.",
    descripcion:
      "Turquía es un puente entre Europa y Asia. Estambul sorprende con sus mezquitas y bazares, y Capadocia con sus paisajes únicos y vuelos en globo al amanecer.",
    actividades: ["Vuelo en globo en Capadocia", "Santa Sofía y Mezquita Azul", "Gran Bazar", "Crucero por el Bósforo"],
    lugares: ["Estambul", "Capadocia", "Pamukkale", "Éfeso"],
  }),
  d({
    id: 43, slug: "japon", nombre: "Japón", tipo: "internacional", pais: "Japón", continente: "Asia",
    region: "Otros destinos", ubicacion: "Japón",
    categoria: ["cultural", "ciudad", "gastronomia"],
    resumen: "Tradición milenaria y modernidad en perfecta armonía.",
    descripcion:
      "Japón combina templos milenarios, jardines zen y ciudades futuristas. Tokio, Kioto y el Monte Fuji forman una ruta inolvidable.",
    actividades: ["Recorrido por Tokio", "Templos de Kioto", "Vista del Monte Fuji", "Gastronomía japonesa"],
    lugares: ["Tokio", "Kioto", "Monte Fuji", "Osaka", "Nara"],
  }),
];
