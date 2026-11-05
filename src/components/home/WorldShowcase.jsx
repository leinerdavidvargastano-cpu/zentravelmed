import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CONTINENTS } from "@/lib/constants";

/** Mosaico de destinos internacionales destacados (cuadrícula, sin carrusel). */
export default function WorldShowcase({ destinations, total }) {
  return (
    <section id="mundo" className="section" aria-labelledby="mundo-title">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Destinos internacionales"
            title={<span id="mundo-title">Explora el mundo</span>}
            description="América, Europa y destinos exóticos con el respaldo de asesores que conocen cada detalle del viaje."
          />
          <nav aria-label="Continentes" className="mb-10 flex flex-wrap gap-2 md:mb-14">
            {CONTINENTS.map((c) => (
              <Link key={c} href={`/destinos/internacionales?continente=${encodeURIComponent(c)}#resultados`} className="chip">
                {c}
              </Link>
            ))}
          </nav>
        </div>

        <ul className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px]">
          {destinations.map((d, i) => (
            <Reveal
              as="li"
              key={d.slug}
              delay={(i % 4) * 70}
              className={i === 0 ? "sm:col-span-2 lg:row-span-2" : i === 3 ? "lg:col-span-2" : ""}
            >
              <Link
                href={`/destinos/${d.slug}`}
                className="group relative block h-full overflow-hidden rounded-3xl shadow-soft"
              >
                <Image
                  src={d.imagen}
                  alt={`${d.nombre}, ${d.pais}`}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-light">{d.pais}</p>
                  <h3 className={`mt-1 font-extrabold text-white ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{d.nombre}</h3>
                  <p className={`mt-2 text-sm text-white/80 ${i === 0 ? "max-w-md" : "line-clamp-2"}`}>{d.resumen}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
                    Conocer más
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/destinos/internacionales" className="btn-primary px-8 py-3.5">
            Ver los {total} destinos internacionales <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
