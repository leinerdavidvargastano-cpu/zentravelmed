import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationCard from "@/components/destinations/DestinationCard";
import Reveal from "@/components/ui/Reveal";
import { NATIONAL_REGIONS } from "@/lib/constants";

/** Selección destacada de Colombia; el catálogo completo vive en /destinos/colombia. */
export default function ColombiaShowcase({ destinations, total }) {
  return (
    <section id="colombia" className="section bg-brand-bg" aria-labelledby="colombia-title">
      <div className="container">
        <SectionHeading
          eyebrow="Destinos nacionales"
          title={<span id="colombia-title">Descubre Colombia</span>}
          description="Del Caribe a la Amazonía, del Eje Cafetero al Pacífico: un país megadiverso para recorrer a tu ritmo."
        />

        <nav aria-label="Regiones de Colombia" className="mb-10 flex flex-wrap justify-center gap-2">
          {NATIONAL_REGIONS.map((r) => (
            <Link key={r} href={`/destinos/colombia?region=${encodeURIComponent(r)}#resultados`} className="chip">
              {r}
            </Link>
          ))}
        </nav>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 3) * 80}>
              <DestinationCard destination={d} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/destinos/colombia" className="btn-primary px-8 py-3.5">
            Ver los {total} destinos de Colombia <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
