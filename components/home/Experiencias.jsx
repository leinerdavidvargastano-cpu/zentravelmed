// Sección "Vive nuestras experiencias": 4 tarjetas grandes con foto.
// Cada tarjeta lleva al catálogo de destinos ya filtrado.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tarjetas = [
  {
    titulo: "Playas y relax",
    texto: "Mar, arena y descanso en el Caribe colombiano y el mundo.",
    foto: "/multimedia/fotos/playas.avif",
    enlace: "/destinos?tipo=playa",
  },
  {
    titulo: "Cruceros",
    texto: "Recorre varios destinos en un solo viaje, con todo a bordo.",
    foto: "/multimedia/fotos/cruceros.avif",
    enlace: "/destinos?tipo=cruceros",
  },
  {
    titulo: "Destinos internacionales",
    texto: "México, el Caribe, Estados Unidos, Europa y mucho más.",
    foto: "/multimedia/fotos/internacional.avif",
    enlace: "/destinos?region=internacional",
  },
  {
    titulo: "Tours y aventura",
    texto: "Naturaleza, caminatas y cultura para viajeros curiosos.",
    foto: "/multimedia/fotos/tours.avif",
    enlace: "/destinos?tipo=aventura",
  },
];

export default function Experiencias() {
  return (
    <section className="w-full bg-white px-4 py-20 md:px-10">
      {/* Encabezado de la sección */}
      <p className="text-sm font-semibold uppercase tracking-widest text-verde/70">
        Experiencias
      </p>
      <h2 className="mt-2 text-4xl font-bold text-verde md:text-5xl">
        Vive nuestras experiencias
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-gray-600">
        Elige cómo quieres viajar y te ayudamos a armar el plan perfecto.
      </p>

      {/* Tarjetas: 1 columna en celular, 2 en tablet, 4 en pantalla grande */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tarjetas.map((t) => (
          <Link
            key={t.titulo}
            href={t.enlace}
            className="group relative flex h-96 flex-col justify-end overflow-hidden rounded-3xl"
          >
            {/* Foto de fondo: crece un poco al pasar el mouse */}
            <Image
              src={t.foto}
              alt={t.titulo}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Degradado oscuro abajo para que el texto se lea */}
            <div className="absolute inset-0 bg-gradient-to-t from-negro/90 via-negro/30 to-transparent" />

            {/* Texto encima de la foto */}
            <div className="relative p-6">
              <h3 className="text-2xl font-bold text-rosa">{t.titulo}</h3>
              <p className="mt-2 text-white/85">{t.texto}</p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-amarillo px-4 py-2 text-sm font-semibold text-negro">
                Ver más
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
