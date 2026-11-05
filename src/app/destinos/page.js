import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import DestinationCatalog from "@/components/destinations/DestinationCatalog";
import { getDestinations } from "@/lib/data";
import { destinationImages } from "@/data/destination-images";

export const metadata = {
  title: "Destinos nacionales e internacionales",
  description: "Busca y filtra destinos turísticos en Colombia y el mundo por región, tipo de experiencia, duración y presupuesto. Solicita tu cotización.",
  alternates: { canonical: "/destinos" },
};

export default async function DestinosPage({ searchParams }) {
  const params = await searchParams;
  const destinations = await getDestinations();
  const initial = Object.fromEntries(Object.entries(params || {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));

  return (
    <>
      <PageHeader
        image={destinationImages["cartagena"]?.imagen}
        crumbs={[{ label: "Destinos" }]}
        eyebrow="Catálogo de destinos"
        title="¿A dónde quieres ir?"
        description="Explora nuestros destinos en Colombia y el mundo. Usa los filtros para encontrar el viaje ideal."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/destinos/colombia" className="btn-light">
            Descubre Colombia <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/destinos/internacionales" className="btn-ghost-light">
            Explora el mundo <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>
      <section className="section pt-10 sm:pt-14">
        <div className="container">
          <DestinationCatalog destinations={destinations} mode="all" initial={initial} />
        </div>
      </section>
    </>
  );
}
