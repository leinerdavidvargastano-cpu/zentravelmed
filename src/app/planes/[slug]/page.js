import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, MapPin, Plane, Tag } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/ui/JsonLd";
import PlanCard from "@/components/plans/PlanCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { getPlanBySlug, getPlans } from "@/lib/data";
import { PLAN_CATEGORIES } from "@/lib/constants";
import { formatDuration, formatPrice } from "@/lib/format";
import { whatsappLink, messages } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const plans = await getPlans();
  return plans.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) return { title: "Plan no encontrado" };
  return {
    title: plan.nombre,
    description: `${plan.descripcion} ${formatDuration(plan.duracion_dias, plan.duracion_noches) || ""}. Cotiza con ${siteConfig.name}.`.slice(0, 158),
    alternates: { canonical: `/planes/${plan.slug}` },
    openGraph: { title: plan.nombre, description: plan.descripcion, url: `/planes/${plan.slug}`, images: [{ url: plan.imagen, alt: plan.nombre }] },
  };
}

const catLabel = (key) => PLAN_CATEGORIES.find((c) => c.key === key)?.label || key;

export default async function PlanPage({ params }) {
  const { slug } = await params;
  const plan = await getPlanBySlug(slug);
  if (!plan) notFound();

  const all = await getPlans();
  const related = all.filter((p) => p.slug !== plan.slug && p.categorias.some((c) => plan.categorias.includes(c))).slice(0, 3);
  const price = formatPrice(plan.precio_referencial, plan.moneda);
  const duration = formatDuration(plan.duracion_dias, plan.duracion_noches);
  const quoteHref = `/cotizar?plan=${plan.slug}${plan.destino ? `&destino=${plan.destino.slug}` : ""}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: plan.nombre,
    description: plan.descripcion,
    url: `${siteConfig.url}/planes/${plan.slug}`,
    image: plan.imagen,
    provider: { "@type": "TravelAgency", name: siteConfig.name, url: siteConfig.url },
    ...(plan.destino && { itinerary: { "@type": "Place", name: plan.destino.nombre } }),
    ...(price && { offers: { "@type": "Offer", price: Number(plan.precio_referencial), priceCurrency: plan.moneda, availability: "https://schema.org/InStock" } }),
  };

  return (
    <article>
      <JsonLd data={jsonLd} />
      <header className="relative isolate overflow-hidden bg-brand-dark pb-14 pt-32 sm:pt-40">
        <Image src={plan.imagen} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-black/20" aria-hidden="true" />
        <div className="container animate-fade-up">
          <Breadcrumbs light items={[{ href: "/planes", label: "Planes turísticos" }, { label: plan.nombre }]} />
          <ul className="mt-6 flex flex-wrap gap-2">
            {plan.categorias.map((c) => (
              <li key={c}>
                <Link href={`/planes?categoria=${c}`} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur hover:bg-white/25">
                  <Tag className="h-3 w-3" aria-hidden="true" /> {catLabel(c)}
                </Link>
              </li>
            ))}
          </ul>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">{plan.nombre}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{plan.descripcion}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90">
            {plan.destino && (
              <Link href={`/destinos/${plan.destino.slug}`} className="inline-flex items-center gap-1.5 hover:underline">
                <MapPin className="h-4 w-4 text-brand-light" aria-hidden="true" /> {plan.destino.nombre}
              </Link>
            )}
            {duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-light" aria-hidden="true" /> {duration}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="container grid gap-12 py-14 lg:grid-cols-[1fr_360px] lg:py-20">
        <div className="space-y-12">
          <section aria-labelledby="incluye">
            <h2 id="incluye" className="text-2xl font-extrabold sm:text-3xl">Servicios incluidos</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {plan.servicios_incluidos.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-2xl bg-brand-bg p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Los servicios definitivos, tarifas y condiciones se confirman en la cotización según fechas y disponibilidad.
            </p>
          </section>

          {plan.destino && (
            <section className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Conoce más sobre el destino</p>
                <p className="font-display text-xl font-bold text-brand-dark">{plan.destino.nombre}</p>
              </div>
              <Link href={`/destinos/${plan.destino.slug}`} className="btn-outline">
                Ver destino <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card overflow-hidden">
            <div className="bg-brand p-6 text-white">
              <p className="text-sm text-white/80">Precio orientativo por persona</p>
              <p className="mt-1 font-display text-2xl font-extrabold">{price || "Según cotización"}</p>
              <p className="mt-1 text-xs text-white/70">Sujeto a fechas, temporada y número de viajeros.</p>
            </div>
            <div className="space-y-2 p-6">
              <Link href={quoteHref} className="btn-primary w-full py-3.5 text-base">
                <Plane className="h-5 w-5" aria-hidden="true" /> Solicitar cotización
              </Link>
              <a href={whatsappLink(messages.plan(plan))} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full py-3.5 text-base">
                <WhatsAppIcon className="h-5 w-5" /> Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section bg-brand-bg" aria-labelledby="otros-planes">
          <div className="container">
            <SectionHeading title={<span id="otros-planes">También te puede interesar</span>} />
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}><PlanCard plan={p} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
