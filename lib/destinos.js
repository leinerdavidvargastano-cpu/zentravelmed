// Funciones para trabajar con la lista de destinos.

import { destinos } from "@/data/destinos";
import { fotosDestinos } from "@/data/fotos-destinos";

// Quita tildes y pasa a minúsculas: "Bogotá" → "bogota".
// Así la búsqueda encuentra "bogota" aunque la persona no escriba la tilde.
export function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

// Filtra los destinos según lo que llegó del buscador.
// Un filtro vacío ("") no filtra nada.
export function filtrarDestinos({ q = "", tipo = "", region = "" }) {
  const busqueda = normalizar(q);

  return destinos.filter((d) => {
    const coincideTexto =
      !busqueda ||
      normalizar(d.nombre).includes(busqueda) ||
      normalizar(d.zona).includes(busqueda) ||
      normalizar(d.descripcion).includes(busqueda);
    const coincideTipo = !tipo || d.tipos.includes(tipo);
    const coincideRegion = !region || d.region === region;
    return coincideTexto && coincideTipo && coincideRegion;
  });
}

// Busca un destino por su slug (ej: "cartagena"). Si no existe, devuelve undefined.
export function obtenerDestino(slug) {
  return destinos.find((d) => d.slug === slug);
}

// Destinos parecidos: de la misma región y que compartan al menos una experiencia.
// Primero los de la misma zona (ej: otros del Caribe). Máximo "cantidad".
export function destinosParecidos(destino, cantidad = 4) {
  return destinos
    .filter(
      (d) =>
        d.slug !== destino.slug &&
        d.region === destino.region &&
        d.tipos.some((t) => destino.tipos.includes(t))
    )
    .sort((a, b) => (b.zona === destino.zona) - (a.zona === destino.zona))
    .slice(0, cantidad);
}

// Foto de un destino, en este orden:
//  1. foto propia (campo "foto" en data/destinos.js)
//  2. foto descargada de Wikimedia (data/fotos-destinos.js)
//  3. foto genérica según su experiencia
const fotoPorTipo = {
  playa: "/multimedia/fotos/playas.avif",
  cruceros: "/multimedia/fotos/cruceros.avif",
  aventura: "/multimedia/fotos/tours.avif",
  cultura: "/multimedia/fotos/internacional.avif",
};

export function fotoDestino(destino) {
  return destino.foto || fotosDestinos[destino.slug]?.foto || fotoPorTipo[destino.tipos[0]];
}

// Créditos de la foto (solo para las de Wikimedia). null si es foto propia.
export function creditoFoto(destino) {
  if (destino.foto) return null;
  return fotosDestinos[destino.slug] ?? null;
}
