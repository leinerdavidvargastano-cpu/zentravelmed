// Paquetes turísticos. Para agregar uno, se copia un bloque y se cambian los datos.
//  slug:        nombre corto para la URL (minúsculas, sin tildes ni espacios)
//  nombre:      como se muestra
//  destino:     slug del destino en data/destinos.js (de ahí sale la foto
//               y es el destino que aparece elegido al cotizar)
//  descripcion: una o dos frases
//  duracion:    ej "8 días / 7 noches" ("" = no se muestra)
//  incluye:     lista de lo que trae el paquete
//  precio:      número en pesos colombianos, ej 4500000 (null = "Precio según cotización")
//
// Datos tomados de la página anterior de la agencia (España, Alemania, Francia).
// Falta que la agencia confirme duración y precio de cada uno.

export const paquetes = [
  {
    slug: "espana",
    nombre: "España",
    destino: "espana",
    descripcion: "Madrid, Barcelona y el sabor del Mediterráneo en un solo viaje.",
    duracion: "",
    incluye: ["Hotel", "Desayuno", "Traslados", "City Tour", "Asesoría"],
    precio: null,
  },
  {
    slug: "alemania",
    nombre: "Alemania",
    destino: "alemania",
    descripcion: "Castillos de cuento, ciudades llenas de historia y paisajes del Rin.",
    duracion: "",
    incluye: ["Hotel", "Desayuno", "Traslados", "City Tour", "Asesoría"],
    precio: null,
  },
  {
    slug: "francia",
    nombre: "Francia",
    destino: "francia",
    descripcion: "París, la Torre Eiffel y el encanto de la vida francesa.",
    duracion: "",
    incluye: ["Hotel", "Desayuno", "Traslados", "City Tour", "Asesoría"],
    precio: null,
  },
];

// Busca un paquete por su slug (undefined si no existe)
export function obtenerPaquete(slug) {
  return paquetes.find((p) => p.slug === slug);
}
