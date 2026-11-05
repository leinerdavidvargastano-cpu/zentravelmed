// Descarga una sola vez las fotografías de Wikimedia Commons referenciadas en
// src/data/destination-images.js, las optimiza (máx. 1600 px, JPEG progresivo)
// y las guarda en public/images/destinos/<slug>/<n>.jpg. Luego reescribe el
// archivo de datos con las rutas locales (los créditos se conservan).
// Uso: node scripts/download-images.mjs
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { destinationImages } from "../src/data/destination-images.js";

const UA = "ZentravelSite/1.0 (one-time image import for a travel agency website)";
const root = path.resolve("public/images/destinos");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function sourceUrl(url) {
  if (url.startsWith("/")) return null; // ya es local
  if (url.endsWith("_unscaled")) return url.replace(/_unscaled$/, "");
  return url.replace(/\/1920px-/, "/1280px-");
}

async function download(url) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429 || res.status >= 500) {
      const wait = (Number(res.headers.get("retry-after")) || 20) * 1000;
      console.log(`  ${res.status}, esperando ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`demasiados reintentos: ${url}`);
}

const out = {};
for (const [slug, data] of Object.entries(destinationImages)) {
  const dir = path.join(root, slug);
  mkdirSync(dir, { recursive: true });
  const local = [];
  const creditos = [];
  for (const [i, url] of data.galeria.entries()) {
    const file = path.join(dir, `${i + 1}.jpg`);
    const publicPath = `/images/destinos/${slug}/${i + 1}.jpg`;
    const src = sourceUrl(url);
    try {
      if (!existsSync(file)) {
        if (!src) continue;
        const buf = await download(src);
        await sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true, progressive: true }).toFile(file);
        await sleep(800);
      }
      local.push(publicPath);
      if (data.creditos[i]) creditos.push(data.creditos[i]);
    } catch (e) {
      console.log(`  ERROR ${slug} #${i + 1}: ${e.message}`);
    }
  }
  console.log(slug, local.length);
  out[slug] = { imagen: local[0] || null, galeria: local, creditos };
}

const body =
  "// Fotografías de Wikimedia Commons con licencias libres, optimizadas y servidas localmente.\n" +
  "// Créditos y página de origen en `creditos`. Reemplazar por imágenes propias (p. ej. Cloudinary).\n" +
  "export const destinationImages = " + JSON.stringify(out, null, 2) + ";\n";
writeFileSync(path.resolve("src/data/destination-images.js"), body);
console.log("listo");
