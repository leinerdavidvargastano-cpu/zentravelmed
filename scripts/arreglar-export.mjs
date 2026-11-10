// Se ejecuta solo después de "npm run build" (es el "postbuild" de package.json).
//
// Problema: Next.js guarda unos archivos internos de navegación dentro de
// carpetas, por ejemplo  out/cotizar/__next.cotizar/__PAGE__.txt
// pero el navegador los pide con puntos:  /cotizar/__next.cotizar.__PAGE__.txt
// En un hosting de archivos (como Hostinger) eso da 404 y el paso de una
// página a otra deja de ser instantáneo.
//
// Solución: copiar cada uno de esos archivos con el nombre "con puntos".

import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const out = path.resolve("out");
if (!existsSync(out)) {
  console.log("No existe la carpeta out/ (¿falló el build?)");
  process.exit(0);
}

let copiados = 0;

// Recorre todas las carpetas de out/
function recorrer(carpeta) {
  for (const nombre of readdirSync(carpeta)) {
    const ruta = path.join(carpeta, nombre);
    if (!statSync(ruta).isDirectory()) continue;
    if (nombre.startsWith("__next.")) copiarConPuntos(carpeta, ruta);
    else recorrer(ruta);
  }
}

// Dentro de una carpeta "__next.xxx", copia cada archivo con su ruta
// convertida en nombre con puntos:  __next.destinos/$d$slug/__PAGE__.txt
//                               →  __next.destinos.$d$slug.__PAGE__.txt
function copiarConPuntos(paginaDir, dirNext) {
  const pendientes = [dirNext];
  while (pendientes.length) {
    const actual = pendientes.pop();
    for (const nombre of readdirSync(actual)) {
      const ruta = path.join(actual, nombre);
      if (statSync(ruta).isDirectory()) {
        pendientes.push(ruta);
        continue;
      }
      const relativa = path.relative(paginaDir, ruta).split(path.sep).join(".");
      copyFileSync(ruta, path.join(paginaDir, relativa));
      copiados++;
    }
  }
}

recorrer(out);
console.log(`arreglar-export: ${copiados} archivos de navegación copiados con su nombre correcto`);
