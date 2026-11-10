// Página de detalle de un destino: /destinos/cartagena, /destinos/aruba, etc.
// La carpeta se llama [slug] (con corchetes): eso le dice a Next.js que esa
// parte de la URL cambia. El valor llega en "params.slug".

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Camera, Check, ChevronRight, MapPin, MessageCircle, Navigation, Plane } from "lucide-react";
import { destinos } from "@/data/destinos";
import { nombreExperiencia } from "@/data/experiencias";
import { creditoFoto, destinosParecidos, fotoDestino, obtenerDestino } from "@/lib/destinos";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import DestinoCard from "@/components/destinos/DestinoCard";

// Crea todas las páginas de destinos de una vez al compilar (build).
// Así cada página ya está lista y abre al instante.
export function generateStaticParams() {
  return destinos.map((d) => ({ slug: d.slug }));
}

// Solo existen los destinos de la lista: cualquier otra URL (ej: /destinos/xyz)
// responde directamente "404 - no encontrado".
export const dynamicParams = false;

// Título y descripción de la pestaña (y de Google) para cada destino
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destino = obtenerDestino(slug);
  if (!destino) return { title: "Destino no encontrado" };
  return { title: destino.nombre, description: destino.descripcion };
}

// Lo que se puede armar en el plan (los mismos puntos de la página actual de la agencia)
const incluye = ["Hotel", "Desayuno", "Traslados", "Tours y City Tour", "Asesoría personalizada"];

export default async function DestinoPage({ params }) {
  const { slug } = await params;
  const destino = obtenerDestino(slug);
  if (!destino) notFound(); // muestra la página 404 si el slug no existe

  const credito = creditoFoto(destino);
  const parecidos = destinosParecidos(destino);
  const esColombia = destino.region === "colombia";
  const mensaje = `Hola, quiero cotizar un viaje a ${destino.nombre}.`;

  return (
    <main className="flex-1">
      {/* ---------- Portada con la foto grande ---------- */}
      <section className="esqueleto relative flex h-[60vh] min-h-96 items-end overflow-hidden">
        <Image
          src={fotoDestino(destino)}
          alt={destino.nombre}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Degradado para que el texto se lea */}
        <div className="absolute inset-0 bg-gradient-to-t from-negro/90 via-negro/30 to-negro/10" />

        <div className="relative w-full px-4 pb-10 md:px-10">
          {/* Migas de pan: Inicio > Destinos > Cartagena */}
          <nav aria-label="Ruta" className="flex items-center gap-1 text-sm text-white/75">
            <Link href="/" className="hover:text-rosa">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/destinos" className="hover:text-rosa">Destinos</Link>
            <ChevronRight size={14} />
            <span className="text-white">{destino.nombre}</span>
          </nav>

          <h1 className="mt-3 text-5xl font-bold text-rosa md:text-7xl">{destino.nombre}</h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-sm text-white backdrop-blur">
              <MapPin size={14} />
              {destino.zona}
            </span>
            <span className="rounded-full bg-amarillo px-3 py-1 text-sm font-semibold text-negro">
              {esColombia ? "Colombia" : "Internacional"}
            </span>
          </div>
        </div>

        {/* Crédito de la foto */}
        {credito && (
          <a
            href={credito.fuente}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 flex max-w-[60%] items-center gap-1 rounded-full bg-negro/60 px-3 py-1 text-xs text-white/80 backdrop-blur hover:text-white"
          >
            <Camera size={12} className="shrink-0" />
            <span className="truncate">
              Foto: {credito.autor} · {credito.licencia} · Wikimedia Commons
            </span>
          </a>
        )}
      </section>

      {/* ---------- Contenido ---------- */}
      <section className="grid w-full gap-10 px-4 py-14 md:px-10 lg:grid-cols-[1fr_380px]">
        {/* Columna izquierda: información */}
        <div>
          <h2 className="text-3xl font-bold text-verde">Sobre {destino.nombre}</h2>
          <p className="mt-4 max-w-2xl text-xl leading-relaxed text-negro/80">{destino.descripcion}</p>

          {/* Experiencias: cada una lleva al catálogo filtrado */}
          <h3 className="mt-10 text-xl font-bold text-verde">Experiencias</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {destino.tipos.map((tipo) => (
              <li key={tipo}>
                <Link
                  href={`/destinos?tipo=${tipo}`}
                  className="block rounded-full bg-rosa/50 px-4 py-2 font-medium text-verde transition hover:bg-verde hover:text-rosa"
                >
                  {nombreExperiencia[tipo]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Qué se puede incluir en el plan */}
          <h3 className="mt-10 text-xl font-bold text-verde">Arma tu plan con</h3>
          <ul className="mt-4 grid max-w-xl gap-3 sm:grid-cols-2">
            {incluye.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verde text-rosa">
                  <Check size={15} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            Lo que incluye cada viaje depende del plan que elijas. Te lo detallamos en la cotización.
          </p>

          {/* Ver en el mapa (Google Maps) */}
          {destino.coordenadas && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${destino.coordenadas.join(",")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 font-semibold text-verde hover:underline"
            >
              <Navigation size={18} />
              Ver {destino.nombre} en Google Maps
            </a>
          )}
        </div>

        {/* Columna derecha: tarjeta para cotizar (se queda fija al bajar) */}
        <aside className="h-fit rounded-3xl bg-verde p-8 text-white shadow-xl lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-rosa">¿Te gustaría ir a {destino.nombre}?</h2>
          <p className="mt-3 text-white/80">
            Cuéntanos tus fechas y cuántas personas viajan. Te enviamos una propuesta a tu medida.
          </p>
          <Link
            href={`/cotizar?destino=${destino.slug}`}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-amarillo px-6 py-3 font-bold text-negro transition hover:scale-105"
          >
            <Plane size={18} />
            Cotizar este destino
          </Link>
          <a
            href={enlaceWhatsApp(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-rosa px-6 py-3 font-semibold text-rosa transition hover:bg-rosa hover:text-verde"
          >
            <MessageCircle size={18} />
            Preguntar por WhatsApp
          </a>
        </aside>
      </section>

      {/* ---------- Destinos parecidos ---------- */}
      {parecidos.length > 0 && (
        <section className="w-full bg-gray-50 px-4 py-14 md:px-10">
          <h2 className="text-3xl font-bold text-verde">También te puede gustar</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {parecidos.map((d) => (
              <DestinoCard key={d.slug} destino={d} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
