// Crea versiones pequeñas (640 px de ancho) de las fotos de destinos.
// Como la página es estática, Next.js ya no achica las fotos solo: las
// tarjetas y el mapa usan estas miniaturas para cargar rápido, y la foto
// grande (1200 px) se usa solo en la página de detalle.
//
// Uso:  node scripts/miniaturas.mjs
// Vuelve a crear todas las miniaturas (correrlo cuando cambies una foto).

import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const origen = path.resolve("public/multimedia/destinos");
const destino = path.join(origen, "pequenas");
mkdirSync(destino, { recursive: true });

let total = 0;
for (const archivo of readdirSync(origen).filter((f) => f.endsWith(".jpg"))) {
  await sharp(path.join(origen, archivo))
    .resize({ width: 640, withoutEnlargement: true })
    .jpeg({ quality: 70, mozjpeg: true, progressive: true })
    .toFile(path.join(destino, archivo));
  total++;
}
console.log(`listo: ${total} miniaturas en public/multimedia/destinos/pequenas/`);
