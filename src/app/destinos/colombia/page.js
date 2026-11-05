import PageHeader from "@/components/ui/PageHeader";
import DestinationCatalog from "@/components/destinations/DestinationCatalog";
import { getDestinations } from "@/lib/data";
import { destinationImages } from "@/data/destination-images";

export const metadata = {
  title: "Descubre Colombia · Destinos nacionales",
  description:
    "Destinos turísticos de Colombia por región: Caribe, Antioquia, Eje Cafetero, Región Andina, Pacífico, Amazonía y Llanos Orientales. Cotiza tu viaje con Zentravel Medellín.",
  alternates: { canonical: "/destinos/colombia" },
};

export default async function ColombiaPage({ searchParams }) {
  const params = await searchParams;
  const destinations = await getDestinations({ tipo: "nacional" });
  const initial = Object.fromEntries(Object.entries(params || {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));

  return (
    <>
      <PageHeader
        image={destinationImages["guatape"]?.galeria?.[4] || destinationImages["guatape"]?.imagen}
        crumbs={[{ href: "/destinos", label: "Destinos" }, { label: "Colombia" }]}
        eyebrow="Destinos nacionales"
        title="Descubre Colombia"
        description="Playas caribeñas, pueblos patrimonio, paisajes cafeteros, selva amazónica y llanos infinitos. Elige tu región favorita."
      />
      <section className="section pt-10 sm:pt-14">
        <div className="container">
          <DestinationCatalog destinations={destinations} mode="nacional" initial={initial} />
        </div>
      </section>
    </>
  );
}
