"use client";
// Carga el mapa SOLO en el navegador.
// Leaflet usa "window", que no existe en el servidor. Con ssr: false
// Next.js no intenta dibujarlo en el servidor. Mientras se descarga,
// se muestra un esqueleto con brillo del mismo tamaño que el mapa.
// (dynamic con ssr: false solo se puede usar dentro de un componente "use client")

import dynamic from "next/dynamic";

const MapaDestinos = dynamic(() => import("@/components/mapa/MapaDestinos"), {
  ssr: false,
  loading: () => (
    <div role="status" aria-label="Cargando mapa">
      <div className="flex gap-3">
        <div className="esqueleto h-10 w-24 rounded-full" />
        <div className="esqueleto h-10 w-28 rounded-full" />
        <div className="esqueleto h-10 w-36 rounded-full" />
      </div>
      <div className="esqueleto mt-6 h-[65vh] min-h-[420px] rounded-3xl" />
    </div>
  ),
});

export default function MapaCargador() {
  return <MapaDestinos />;
}
