"use client";
// Mapa interactivo con un pin por cada destino (Leaflet + OpenStreetMap).
//
// Partes de React Leaflet que usamos:
//  <MapContainer> el mapa
//  <TileLayer>    las "baldosas" con el dibujo del mapa (calles, países...)
//  <Marker>       un pin
//  <Popup>        la ventanita que se abre al tocar un pin
//
// Leaflet solo funciona en el navegador (usa "window"), por eso este
// componente se carga con dynamic(..., { ssr: false }) desde MapaCargador.

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { ArrowRight, MapPin, Plane } from "lucide-react";
import { destinos } from "@/data/destinos";
import { fotoPequena } from "@/lib/destinos";

// Solo los destinos que tienen coordenadas (los cruceros no tienen)
const conCoordenadas = destinos.filter((d) => d.coordenadas);

// Pines propios hechos con HTML: verde para Colombia, amarillo para internacionales.
// (Los íconos que trae Leaflet por defecto no cargan bien con Next.js)
function crearPin(colorFondo) {
  return L.divIcon({
    className: "", // quita el cuadro blanco que Leaflet pone por defecto
    html: `<span class="block h-5 w-5 rounded-full border-[3px] border-white ${colorFondo} shadow-lg shadow-black/40 transition hover:scale-125"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10], // el centro del círculo cae justo en la coordenada
    popupAnchor: [0, -12],
  });
}
const pinColombia = crearPin("bg-verde");
const pinInternacional = crearPin("bg-amarillo");

const filtros = [
  { valor: "todos", texto: "Todos" },
  { valor: "colombia", texto: "Colombia" },
  { valor: "internacional", texto: "Internacionales" },
];

// Ajusta el zoom para que se vean todos los pines visibles.
// Es un componente "invisible": solo usa el mapa (useMap) y no dibuja nada.
function AjustarVista({ lista }) {
  const mapa = useMap();
  useEffect(() => {
    if (lista.length === 0) return;
    const limites = L.latLngBounds(lista.map((d) => d.coordenadas));
    mapa.flyToBounds(limites, { padding: [40, 40], duration: 1, maxZoom: 9 });
  }, [lista, mapa]);
  return null;
}

export default function MapaDestinos() {
  const [filtro, setFiltro] = useState("colombia");

  // useMemo: solo vuelve a filtrar cuando cambia el filtro
  const visibles = useMemo(
    () => conCoordenadas.filter((d) => filtro === "todos" || d.region === filtro),
    [filtro]
  );

  return (
    <div>
      {/* Botones de filtro */}
      <div className="flex flex-wrap items-center gap-3">
        {filtros.map((f) => (
          <button
            key={f.valor}
            type="button"
            onClick={() => setFiltro(f.valor)}
            aria-pressed={filtro === f.valor}
            className={`rounded-full px-5 py-2 font-semibold transition ${
              filtro === f.valor
                ? "bg-verde text-rosa shadow-md"
                : "bg-white text-verde ring-1 ring-verde/30 hover:bg-rosa/40"
            }`}
          >
            {f.texto}
          </button>
        ))}
        <p className="text-sm text-gray-500">{visibles.length} destinos en el mapa</p>

        {/* Leyenda de colores */}
        <div className="ml-auto flex gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-verde" /> Colombia
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amarillo" /> Internacional
          </span>
        </div>
      </div>

      {/* El mapa. "isolate" evita que el mapa quede por encima del menú al bajar */}
      <div className="isolate mt-6 h-[65vh] min-h-[420px] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
        <MapContainer
          center={[4.6, -74.1]}
          zoom={5}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <AjustarVista lista={visibles} />

          {visibles.map((d) => (
            <Marker
              key={d.slug}
              position={d.coordenadas}
              icon={d.region === "colombia" ? pinColombia : pinInternacional}
              title={d.nombre}
            >
              <Popup minWidth={240}>
                <div className="w-60">
                  <div className="relative h-28 overflow-hidden rounded-lg">
                    <Image
                      src={fotoPequena(d)}
                      alt={d.nombre}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} />
                    {d.zona}
                  </p>
                  <p className="text-lg font-bold text-verde">{d.nombre}</p>
                  <p className="text-sm text-negro/75">{d.descripcion}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={`/destinos/${d.slug}`}
                      className="flex items-center justify-center gap-1 rounded-lg border-2 border-verde px-2 py-1.5 text-xs font-semibold text-verde!"
                    >
                      Ver <ArrowRight size={13} />
                    </Link>
                    <Link
                      href={`/cotizar?destino=${d.slug}`}
                      className="flex items-center justify-center gap-1 rounded-lg bg-verde px-2 py-1.5 text-xs font-semibold text-rosa!"
                    >
                      <Plane size={13} /> Cotizar
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <p className="mt-3 text-sm text-gray-500">
        Usa los botones + y − o pellizca la pantalla para acercar el mapa. Toca un punto para ver
        el destino.
      </p>
    </div>
  );
}
