// Genera supabase/seed.sql a partir de los datos locales (src/data).
// Uso: node scripts/generate-seed.mjs
import { writeFileSync } from "node:fs";
import { destinations } from "../src/data/destinations.js";
import { plans } from "../src/data/plans.js";
import { destinationImages } from "../src/data/destination-images.js";

const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const arr = (a = []) => (a.length ? `array[${a.map(q).join(", ")}]::text[]` : "'{}'::text[]");
const bool = (b) => (b ? "true" : "false");

let sql = "-- Generado por scripts/generate-seed.mjs. Ejecutar después de schema.sql.\n\n";

sql += "insert into public.destinos (id, nombre, slug, tipo, pais, region, continente, ubicacion, resumen, descripcion, imagen, galeria, categoria, actividades, lugares, clima, creditos, destacado, estado) values\n";
sql += destinations
  .map((d) => {
    const img = destinationImages[d.slug] || {};
    return `(${d.id}, ${q(d.nombre)}, ${q(d.slug)}, ${q(d.tipo)}, ${q(d.pais)}, ${q(d.region)}, ${q(d.continente)}, ${q(d.ubicacion)}, ${q(d.resumen)}, ${q(d.descripcion)}, ${q(img.imagen)}, ${arr(img.galeria)}, ${arr(d.categoria)}, ${arr(d.actividades)}, ${arr(d.lugares)}, ${q(d.clima)}, ${q(JSON.stringify(img.creditos || []))}::jsonb, ${bool(d.destacado)}, ${q(d.estado)})`;
  })
  .join(",\n");
sql += "\non conflict (slug) do nothing;\n\n";

sql += "-- Planes de EJEMPLO: precio_referencial en null. La agencia debe cargar sus precios reales.\n";
sql += "insert into public.planes (id, nombre, slug, destino_id, descripcion, duracion_dias, duracion_noches, precio_referencial, moneda, servicios_incluidos, categorias, destacado, estado) values\n";
sql += plans
  .map((p) => `(${p.id}, ${q(p.nombre)}, ${q(p.slug)}, ${p.destino_id}, ${q(p.descripcion)}, ${p.duracion_dias}, ${p.duracion_noches}, null, ${q(p.moneda)}, ${arr(p.servicios_incluidos)}, ${arr(p.categorias)}, ${bool(p.destacado)}, ${q(p.estado)})`)
  .join(",\n");
sql += "\non conflict (slug) do nothing;\n\n";

sql += "-- Ajustar las secuencias de identidad tras insertar ids explícitos.\n";
sql += "select setval(pg_get_serial_sequence('public.destinos', 'id'), (select max(id) from public.destinos));\n";
sql += "select setval(pg_get_serial_sequence('public.planes', 'id'), (select max(id) from public.planes));\n";

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), sql);
console.log(`seed.sql: ${destinations.length} destinos, ${plans.length} planes`);
