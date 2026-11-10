// Descarga una foto característica de cada destino desde Wikipedia / Wikimedia Commons.
//
// Cómo funciona:
//  1. Para cada destino busca el artículo de Wikipedia indicado en "articulos".
//  2. Pide la foto principal del artículo (solo fotos con licencia libre).
//  3. Pide a Wikimedia Commons el autor y la licencia de esa foto.
//  4. Guarda la foto en public/multimedia/destinos/<slug>.jpg
//  5. Escribe data/fotos-destinos.js con la ruta y los créditos.
//
// Uso:  node scripts/descargar-fotos.mjs
// Si una foto ya existe no la vuelve a descargar. Para cambiar una foto,
// cambia el artículo en "articulos", borra el archivo y vuelve a correrlo.

import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";

const UA = "TravelSiteImageImport/1.0 (one-time import of free-licensed photos)";
const carpeta = path.resolve("public/multimedia/destinos");
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// Artículo de Wikipedia (en inglés) que tiene la foto más característica de cada lugar.
// Con "es:" adelante se busca en la Wikipedia en español.
// Con "buscar:" adelante se busca directamente en Wikimedia Commons y se toma
// la primera foto horizontal y grande que aparezca.
// Con "archivo:" adelante se usa exactamente esa foto de Commons.
// Para países se usa un monumento famoso (el artículo del país trae bandera o mapa).
const articulos = {
  "cartagena": "buscar:Cartagena Colombia Torre del Reloj",
  "islas-del-rosario": "Islas del Rosario",
  "san-andres": "buscar:San Andres island Colombia beach",
  "providencia": "archivo:Isla de Providencia desde el Peak.jpg",
  "santa-marta": "Santa Marta",
  "parque-tayrona": "Tayrona National Natural Park",
  "minca": "buscar:Minca Magdalena Colombia",
  "palomino": "es:Palomino (La Guajira)",
  "la-guajira": "Cabo de la Vela",
  "capurgana": "archivo:Bahia el Aguacate en Capurganá Colombia.jpg",
  "covenas": "Coveñas",
  // "rincon-del-mar": sin foto buena en Commons, usa la foto genérica de playa
  "mompox": "Santa Cruz de Mompox",
  "ciudad-perdida": "Ciudad Perdida",
  "medellin": "Medellín",
  "guatape": "El Peñón de Guatapé",
  "jardin": "es:Jardín (Antioquia)",
  "jerico": "Jericó, Antioquia",
  "santa-fe-de-antioquia": "Santa Fe de Antioquia",
  "rio-claro": "buscar:Rio Claro Antioquia",
  "salento": "Cocora Valley",
  "filandia": "Filandia",
  "pereira": "Pereira, Colombia",
  "armenia": "buscar:Parque del Cafe Quindio",
  "manizales": "archivo:Panoramica de Manizales desde Cerro de Oro.jpg",
  "bogota": "Monserrate",
  "zipaquira": "Salt Cathedral of Zipaquirá",
  "villa-de-leyva": "Villa de Leyva",
  "barichara": "Barichara",
  "san-gil": "archivo:Parque El Gallineral San Gil 01.jpg",
  "chicamocha": "Chicamocha Canyon",
  "cali": "Cali",
  "popayan": "Popayán",
  "san-agustin": "San Agustín Archaeological Park",
  "tatacoa": "buscar:Desierto de la Tatacoa",
  "nuqui": "buscar:Nuqui Choco beach",
  "bahia-solano": "buscar:Humpback whale breaching Colombia",
  "cano-cristales": "Caño Cristales",
  "leticia": "archivo:Sunset in Leticia, Amazonas, Colombia 01.jpg",
  "puerto-narino": "Puerto Nariño",
  "cancun": "Cancún",
  "punta-cana": "Punta Cana",
  "aruba": "Eagle Beach",
  "curazao": "Willemstad",
  "panama": "Panama City",
  "ciudad-de-mexico": "Palacio de Bellas Artes",
  "miami": "Miami Beach, Florida",
  "orlando": "Cinderella Castle",
  "nueva-york": "Statue of Liberty",
  "cusco": "Machu Picchu",
  "buenos-aires": "Obelisco de Buenos Aires",
  "rio-de-janeiro": "Christ the Redeemer (statue)",
  "espana": "Sagrada Família",
  "francia": "Eiffel Tower",
  "alemania": "Neuschwanstein Castle",
  "italia": "Colosseum",
  "turquia": "Cappadocia",
  "dubai": "buscar:Burj Khalifa Dubai skyline",
  // "cruceros-caribe" usa la foto propia de cruceros
};

async function pedirJSON(url) {
  for (let intento = 0; intento < 6; intento++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return res.json();
    // 429 = "demasiados pedidos": esperamos lo que diga Wikipedia (o 10 s, 20 s...)
    const segundos = Number(res.headers.get("retry-after")) || 10 * (intento + 1);
    await esperar(segundos * 1000);
  }
  throw new Error("No respondió: " + url);
}

// Quita las etiquetas HTML (el autor a veces viene como enlace)
const sinHTML = (t = "") => t.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const archivoCreditos = path.resolve("data/fotos-destinos.js");
// Si ya existe, se conservan los créditos anteriores
let fotos = {};
if (existsSync(archivoCreditos)) {
  const texto = readFileSync(archivoCreditos, "utf8");
  fotos = JSON.parse(texto.slice(texto.indexOf("{"), texto.lastIndexOf("}") + 1));
}

mkdirSync(carpeta, { recursive: true });

// Busca en Wikimedia Commons y guarda la primera foto horizontal (JPG, 1200 px o más)
async function desdeCommons(slug, busqueda, destino) {
  // "archivo:Nombre.jpg" = una foto exacta de Commons; si no, se busca
  const exacta = busqueda.startsWith("archivo:");
  const consulta = exacta
    ? "&titles=" + encodeURIComponent("File:" + busqueda.slice(8))
    : "&generator=search&gsrnamespace=6&gsrlimit=15&gsrsearch=" +
      encodeURIComponent(busqueda + " filetype:bitmap");
  const datos = await pedirJSON(
    "https://commons.wikimedia.org/w/api.php?action=query&format=json" + consulta +
      "&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=1280"
  );
  if (exacta) Object.values(datos.query.pages)[0].index = 0;
  const resultados = Object.values(datos.query?.pages ?? {}).sort((a, b) => a.index - b.index);
  const elegida = resultados.find((p) => {
    const info = p.imageinfo?.[0];
    return info && info.mime === "image/jpeg" && info.width >= 1200 && info.width > info.height;
  });
  if (!elegida) throw new Error(`sin resultados para "${busqueda}"`);

  const info = elegida.imageinfo[0];
  const meta = info.extmetadata ?? {};
  const res = await fetch(info.thumburl, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`descarga ${res.status}`);
  writeFileSync(destino, Buffer.from(await res.arrayBuffer()));

  fotos[slug] = {
    foto: `/multimedia/destinos/${slug}.jpg`,
    autor: sinHTML(meta.Artist?.value) || "Desconocido",
    licencia: meta.LicenseShortName?.value || "Licencia libre",
    fuente: info.descriptionurl,
  };
  console.log("ok:", slug, "←", elegida.title);
}

for (const [slug, articulo] of Object.entries(articulos)) {
  const destino = path.join(carpeta, `${slug}.jpg`);
  if (existsSync(destino) && fotos[slug]) {
    console.log("ya existe:", slug);
    continue;
  }
  try {
    if (articulo.startsWith("buscar:") || articulo.startsWith("archivo:")) {
      const texto = articulo.startsWith("buscar:") ? articulo.slice(7) : articulo;
      await desdeCommons(slug, texto, destino);
      await esperar(2000);
      continue;
    }

    // 1-2. Foto principal del artículo (licencia libre, 1280 px de ancho)
    const [idioma, titulo] = articulo.startsWith("es:") ? ["es", articulo.slice(3)] : ["en", articulo];
    const wiki = await pedirJSON(
      `https://${idioma}.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail|name` +
        "&pithumbsize=1280&pilicense=free&redirects=1&format=json&titles=" +
        encodeURIComponent(titulo)
    );
    const pagina = Object.values(wiki.query.pages)[0];
    if (!pagina.thumbnail) throw new Error(`"${articulo}" no tiene foto libre`);

    // 3. Autor y licencia desde Wikimedia Commons
    const commons = await pedirJSON(
      "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata" +
        "&format=json&titles=" + encodeURIComponent("File:" + pagina.pageimage)
    );
    const meta = Object.values(commons.query.pages)[0].imageinfo?.[0]?.extmetadata ?? {};

    // 4. Descargar la foto
    const res = await fetch(pagina.thumbnail.source, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`descarga ${res.status}`);
    writeFileSync(destino, Buffer.from(await res.arrayBuffer()));

    fotos[slug] = {
      foto: `/multimedia/destinos/${slug}.jpg`,
      autor: sinHTML(meta.Artist?.value) || "Desconocido",
      licencia: meta.LicenseShortName?.value || "Licencia libre",
      fuente: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(pagina.pageimage)}`,
    };
    console.log("ok:", slug, "←", pagina.pageimage);
  } catch (e) {
    console.log("ERROR:", slug, e.message);
  }
  await esperar(2000); // no saturar a Wikipedia
}

// 5. Guardar los créditos
writeFileSync(
  archivoCreditos,
  "// Generado por scripts/descargar-fotos.mjs. Fotos de Wikimedia Commons con licencia libre.\n" +
    "// Cada foto lleva su autor, licencia y página de origen (hay que mostrarlos en la web).\n" +
    "export const fotosDestinos = " + JSON.stringify(fotos, null, 2) + ";\n"
);
console.log("listo:", Object.keys(fotos).length, "fotos");
