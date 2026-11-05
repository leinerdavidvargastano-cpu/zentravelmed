import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { EXPERIENCES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";

/**
 * Tarjeta de destino reutilizable (catálogos, home y resultados de búsqueda).
 * `quoteQuery` permite arrastrar datos del buscador (fecha, viajeros) al formulario.
 */
export default function DestinationCard({ destination: d, quoteQuery = "", priority = false, compact = false }) {
  const price = formatPrice(d.precio_desde);
  const quoteHref = `/cotizar?destino=${encodeURIComponent(d.slug)}${quoteQuery ? `&${quoteQuery}` : ""}`;

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={`/destinos/${d.slug}`} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Image
          src={d.imagen}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark backdrop-blur">
          {d.tipo === "nacional" ? d.region : d.pais}
        </span>
        {d.destacado && (
          <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">Destacado</span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
          {d.ubicacion || d.pais}
        </p>
        <h3 className="mt-1.5 text-xl font-bold">
          <Link href={`/destinos/${d.slug}`} className="hover:text-brand">
            {d.nombre}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">{d.resumen}</p>

        {!compact && d.categoria?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tipo de experiencia">
            {d.categoria.slice(0, 3).map((c) => (
              <li key={c} className="rounded-full bg-brand-bg px-2.5 py-1 text-[11px] font-semibold text-brand-dark">
                {EXPERIENCES[c] || c}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="text-xs text-gray-500">
            {price ? (
              <>
                Desde <span className="block text-base font-bold text-brand-dark">{price}</span>
              </>
            ) : (
              <span className="font-medium text-brand-dark">Precio según cotización</span>
            )}
          </div>
          <div className="flex gap-2">
            <Link href={quoteHref} className="btn-outline px-3.5 py-2 text-xs">
              Cotizar
            </Link>
            <Link href={`/destinos/${d.slug}`} className="btn-primary px-3.5 py-2 text-xs" aria-label={`Conocer más sobre ${d.nombre}`}>
              Conocer más <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
