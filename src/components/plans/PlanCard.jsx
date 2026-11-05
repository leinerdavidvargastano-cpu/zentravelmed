import Image from "next/image";
import Link from "next/link";
import { Check, Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { formatDuration, formatPrice } from "@/lib/format";
import { whatsappLink, messages } from "@/lib/whatsapp";

export default function PlanCard({ plan }) {
  const price = formatPrice(plan.precio_referencial, plan.moneda);
  const duration = formatDuration(plan.duracion_dias, plan.duracion_noches);

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={plan.imagen}
          alt={plan.destino ? `Plan turístico en ${plan.destino.nombre}` : plan.nombre}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
        {duration && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-dark">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {duration}
          </span>
        )}
        {plan.destino && (
          <span className="absolute right-4 top-4 rounded-full bg-brand-dark/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {plan.destino.tipo === "internacional" ? "Internacional" : "Nacional"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {plan.destino && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-brand">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {plan.destino.nombre}
            {plan.destino.tipo === "internacional" && plan.destino.pais !== plan.destino.nombre ? `, ${plan.destino.pais}` : ""}
          </p>
        )}
        <h3 className="mt-1.5 text-xl font-bold leading-snug">{plan.nombre}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{plan.descripcion}</p>

        {plan.servicios_incluidos.length > 0 && (
          <ul className="mt-4 space-y-1.5" aria-label="Servicios incluidos">
            {plan.servicios_incluidos.slice(0, 4).map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {s}
              </li>
            ))}
            {plan.servicios_incluidos.length > 4 && (
              <li className="pl-6 text-xs text-gray-500">+ {plan.servicios_incluidos.length - 4} servicios más</li>
            )}
          </ul>
        )}

        <div className="mt-auto pt-5">
          <div className="mb-4 rounded-2xl bg-brand-bg px-4 py-3">
            {price ? (
              <p className="text-xs text-gray-600">
                Precio orientativo por persona
                <span className="block font-display text-xl font-extrabold text-brand-dark">{price}</span>
              </p>
            ) : (
              <p className="text-sm font-semibold text-brand-dark">
                Precio según cotización
                <span className="block text-xs font-normal text-gray-600">Varía según fechas y número de viajeros</span>
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
            <Link href={`/planes/${plan.slug}`} className="btn-outline px-3 text-xs">
              Conocer el plan
            </Link>
            <a
              href={whatsappLink(messages.plan(plan))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-3 text-xs"
              aria-label={`Cotizar ${plan.nombre} por WhatsApp`}
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
