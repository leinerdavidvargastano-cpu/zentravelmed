import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, CloudSun, Compass, Globe, Landmark, MapPin, Plane } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Gallery from "@/components/ui/Gallery";
import JsonLd from "@/components/ui/JsonLd";
import SectionHeading from "@/components/ui/SectionHeading";
import PlanCard from "@/components/plans/PlanCard";
import DestinationCard from "@/components/destinations/DestinationCard";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { getDestinationBySlug, getDestinations, getPlansByDestination } from "@/lib/data";
import { EXPERIENCES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { whatsappLink, messages } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const all = await getDestinations();
  return all.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d) return { title: "Destino no encontrado" };
  const title = d.tipo === "nacional" ? `${d.nombre}, Colombia: planes y viajes` : `Viajes a ${d.nombre}: planes desde Colombia`;
  return {
    title,
    description: `${d.resumen} ${d.descripcion?.slice(0, 110) || ""}`.trim().slice(0, 158),
    alternates: { canonical: `/destinos/${d.slug}` },
    openGraph: {
      title: `${d.nombre} · ${siteConfig.name}`,
      description: d.resumen,
      url: `/destinos/${d.slug}`,
      images: [{ url: d.imagen, alt: d.nombre }],
    },
  };
}

export default async function DestinationPage({ params }) {
  const { slug } = await params;
  const d = await getDestinationBySlug(slug);
  if (!d) notFound();

  const [plans, all] = await Promise.all([getPlansByDestination(d.id), getDestinations({ tipo: d.tipo })]);
  const related = all.filter((x) => x.slug !== d.slug && x.region === d.region).slice(0, 3);
  const price = formatPrice(d.precio_desde);
  const parent = d.tipo === "nacional" ? { href: "/destinos/colombia", label: "Colombia" } : { href: "/destinos/internacionales", label: "Internacionales" };
  const gallery = d.galeria.map((src, i) => ({ src, alt: `${d.nombre} – fotografía ${i + 1}` }));
  const url = `${siteConfig.url}/destinos/${d.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: d.nombre,
      description: d.descripcion,
      url,
      image: [d.imagen, ...d.galeria.slice(0, 4)],
      touristType: d.categoria?.map((c) => EXPERIENCES[c] || c),
      address: { "@type": "PostalAddress", addressCountry: d.pais, addressRegion: d.region },
      ...(d.lugares?.length && {
        includesAttraction: d.lugares.map((l) => ({ "@type": "TouristAttraction", name: l })),
      }),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Destinos", item: `${siteConfig.url}/destinos` },
        { "@type": "ListItem", position: 3, name: parent.label, item: `${siteConfig.url}${parent.href}` },
        { "@type": "ListItem", position: 4, name: d.nombre, item: url },
      ],
    },
  ];

  const facts = [
    { icon: MapPin, label: "Ubicación", value: d.ubicacion },
    { icon: d.tipo === "nacional" ? Compass : Globe, label: d.tipo === "nacional" ? "Región" : "Continente", value: d.tipo === "nacional" ? d.region : `${d.continente} · ${d.pais}` },
    d.clima && { icon: CloudSun, label: "Clima", value: d.clima },
  ].filter(Boolean);

  return (
    <article>
      <JsonLd data={jsonLd} />

      {/* Fotografía principal */}
      <header className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-brand-dark pb-12 pt-32">
        <Image src={d.imagen} alt={`${d.nombre}, ${d.ubicacion}`} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-black/20" aria-hidden="true" />
        <div className="container animate-fade-up">
          <Breadcrumbs light items={[{ href: "/destinos", label: "Destinos" }, parent, { label: d.nombre }]} />
          <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">
            <MapPin className="h-4 w-4 text-brand-light" aria-hidden="true" /> {d.ubicacion}
          </p>
          <h1 className="mt-4 text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl">{d.nombre}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85 sm:text-xl">{d.resumen}</p>
        </div>
      </header>

      <div className="container grid gap-12 py-14 lg:grid-cols-[1fr_360px] lg:py-20">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="sobre">
            <h2 id="sobre" className="text-2xl font-extrabold sm:text-3xl">Sobre {d.nombre}</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">{d.descripcion}</p>
            {d.categoria?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tipo de experiencia">
                {d.categoria.map((c) => (
                  <li key={c} className="rounded-full bg-brand-bg px-3 py-1.5 text-sm font-semibold text-brand-dark">{EXPERIENCES[c] || c}</li>
                ))}
              </ul>
            )}
          </section>

          {d.actividades?.length > 0 && (
            <section aria-labelledby="actividades">
              <h2 id="actividades" className="text-2xl font-extrabold sm:text-3xl">Actividades</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {d.actividades.map((a) => (
                  <li key={a} className="flex items-start gap-3 rounded-2xl bg-brand-bg p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-medium text-ink">{a}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {d.lugares?.length > 0 && (
            <section aria-labelledby="lugares">
              <h2 id="lugares" className="text-2xl font-extrabold sm:text-3xl">Lugares recomendados</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {d.lugares.map((l) => (
                  <li key={l} className="card flex items-center gap-3 p-4">
                    <Landmark className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <span className="font-medium">{l}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {gallery.length > 1 && (
            <section aria-labelledby="galeria">
              <h2 id="galeria" className="mb-6 text-2xl font-extrabold sm:text-3xl">Galería</h2>
              <Gallery items={gallery} variant="grid" />
              {d.creditos?.length > 0 && (
                <details className="mt-4 text-xs text-gray-500">
                  <summary className="cursor-pointer hover:text-brand">Créditos de las fotografías</summary>
                  <ul className="mt-2 space-y-1">
                    {d.creditos.map((c) => (
                      <li key={c.fuente}>
                        <a href={c.fuente} target="_blank" rel="noopener noreferrer" className="hover:underline">{c.titulo}</a> — Wikimedia Commons
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </section>
          )}
        </div>

        {/* Panel lateral de información y cotización */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card overflow-hidden">
            <div className="bg-brand p-6 text-white">
              <p className="text-sm text-white/80">Precio orientativo</p>
              <p className="mt-1 font-display text-2xl font-extrabold">{price ? `Desde ${price}` : "Según cotización"}</p>
              <p className="mt-1 text-xs text-white/70">
                {price ? "Por persona. Sujeto a fechas y disponibilidad." : "Te enviamos el valor según tus fechas y número de viajeros."}
              </p>
            </div>
            <dl className="space-y-4 p-6">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</dt>
                    <dd className="text-sm text-ink">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="space-y-2 border-t border-gray-100 p-6">
              <Link href={`/cotizar?destino=${d.slug}`} className="btn-primary w-full py-3.5 text-base">
                <Plane className="h-5 w-5" aria-hidden="true" /> Solicitar cotización
              </Link>
              <a href={whatsappLink(messages.destination(d.nombre))} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full py-3.5 text-base">
                <WhatsAppIcon className="h-5 w-5" /> Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Planes disponibles */}
      <section className="section bg-brand-bg" aria-labelledby="planes-destino">
        <div className="container">
          <SectionHeading
            eyebrow="Planes disponibles"
            title={<span id="planes-destino">Planes para viajar a {d.nombre}</span>}
            description={plans.length ? "Elige un plan como punto de partida; lo ajustamos a tus fechas y preferencias." : undefined}
          />
          {plans.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {plans.map((p) => (
                <li key={p.slug}><PlanCard plan={p} /></li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-soft">
              <p className="text-gray-600">
                Diseñamos tu plan a {d.nombre} a la medida: cuéntanos fechas, número de viajeros y presupuesto, y un asesor te
                enviará opciones.
              </p>
              <Link href={`/cotizar?destino=${d.slug}`} className="btn-primary mt-6">Armar mi plan</Link>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" aria-labelledby="relacionados">
          <div className="container">
            <SectionHeading eyebrow={d.region} title={<span id="relacionados">Otros destinos que te pueden gustar</span>} />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}><DestinationCard destination={r} compact /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
