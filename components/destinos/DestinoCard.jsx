// Tarjeta de un destino: foto, nombre, zona, experiencias y botón de cotizar.

import Image from "next/image";
import Link from "next/link";
import { Camera, MapPin, Plane } from "lucide-react";
import { experiencias } from "@/data/experiencias";
import { creditoFoto, fotoDestino } from "@/lib/destinos";

// Para mostrar "Relajación costera" en vez de "playa"
const nombreExperiencia = Object.fromEntries(experiencias.map((e) => [e.id, e.nombre]));

export default function DestinoCard({ destino }) {
  const credito = creditoFoto(destino);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Foto */}
      {/* "esqueleto": mientras la foto carga se ve el brillo animado */}
      <div className="esqueleto relative h-52 overflow-hidden">
        <Image
          src={fotoDestino(destino)}
          alt={destino.nombre}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        {/* Etiqueta de región sobre la foto */}
        <span className="absolute left-3 top-3 rounded-full bg-verde/90 px-3 py-1 text-xs font-semibold text-rosa backdrop-blur">
          {destino.region === "colombia" ? "Colombia" : "Internacional"}
        </span>

        {/* Crédito de la foto (lo exige la licencia libre). Al pasar el mouse
            muestra autor y licencia; al hacer clic abre la página de la foto. */}
        {credito && (
          <a
            href={credito.fuente}
            target="_blank"
            rel="noopener noreferrer"
            title={`Foto: ${credito.autor} · ${credito.licencia} · Wikimedia Commons`}
            className="absolute bottom-2 right-2 flex max-w-[85%] items-center gap-1 rounded-full bg-negro/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur hover:text-white"
          >
            <Camera size={12} className="shrink-0" />
            <span className="truncate">
              {credito.autor} · {credito.licencia}
            </span>
          </a>
        )}
      </div>

      {/* Texto */}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} />
          {destino.zona}
        </p>
        <h3 className="mt-1 text-xl font-bold text-verde">{destino.nombre}</h3>
        <p className="mt-2 flex-1 text-sm text-negro/75">{destino.descripcion}</p>

        {/* Experiencias */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {destino.tipos.map((tipo) => (
            <li key={tipo} className="rounded-full bg-rosa/50 px-3 py-1 text-xs font-medium text-verde">
              {nombreExperiencia[tipo]}
            </li>
          ))}
        </ul>

        <Link
          href={`/cotizar?destino=${destino.slug}`}
          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-verde px-4 py-3 font-semibold text-rosa transition hover:bg-amarillo hover:text-negro"
        >
          <Plane size={16} />
          Cotizar este destino
        </Link>
      </div>
    </article>
  );
}
