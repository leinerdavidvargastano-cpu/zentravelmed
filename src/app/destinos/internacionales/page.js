import PageHeader from "@/components/ui/PageHeader";
import DestinationCatalog from "@/components/destinations/DestinationCatalog";
import { getDestinations } from "@/lib/data";
import { destinationImages } from "@/data/destination-images";

export const metadata = {
  title: "Explora el mundo · Destinos internacionales",
  description:
    "Destinos internacionales en América, Europa, Asia y Medio Oriente: México, Punta Cana, Perú, España, Italia, Dubái, Japón y más. Solicita tu cotización.",
  alternates: { canonical: "/destinos/internacionales" },
};

export default async function InternacionalesPage({ searchParams }) {
  const params = await searchParams;
  const destinations = await getDestinations({ tipo: "internacional" });
  const initial = Object.fromEntries(Object.entries(params || {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));

  return (
    <>
      <PageHeader
        image={destinationImages["suiza"]?.galeria?.[1] || destinationImages["suiza"]?.imagen}
        crumbs={[{ href: "/destinos", label: "Destinos" }, { label: "Internacionales" }]}
        eyebrow="Destinos internacionales"
        title="Explora el mundo"
        description="Filtra por continente y país para encontrar tu próximo destino fuera de Colombia."
      />
      <section className="section pt-10 sm:pt-14">
        <div className="container">
          <DestinationCatalog destinations={destinations} mode="internacional" initial={initial} />
        </div>
      </section>
    </>
  );
}
