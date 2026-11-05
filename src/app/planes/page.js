import PageHeader from "@/components/ui/PageHeader";
import PlansExplorer from "@/components/plans/PlansExplorer";
import { getPlans } from "@/lib/data";
import { PLAN_CATEGORIES } from "@/lib/constants";
import { destinationImages } from "@/data/destination-images";

export const revalidate = 300;

export const metadata = {
  title: "Planes turísticos nacionales e internacionales",
  description: "Planes turísticos familiares, románticos, de aventura, playa, culturales y grupales por Colombia y el mundo. Cotiza por WhatsApp.",
  alternates: { canonical: "/planes" },
};

export default async function PlanesPage({ searchParams }) {
  const { categoria } = (await searchParams) || {};
  const plans = await getPlans();
  const initial = PLAN_CATEGORIES.some((c) => c.key === categoria) ? categoria : "todos";

  return (
    <>
      <PageHeader
        image={destinationImages["punta-cana"]?.galeria?.[1] || destinationImages["punta-cana"]?.imagen}
        crumbs={[{ label: "Planes turísticos" }]}
        eyebrow="Planes turísticos"
        title="Encuentra el plan perfecto para tu próximo viaje"
        description="Elige por tipo de experiencia. Todos los planes se pueden personalizar con un asesor."
      />
      <section className="section pt-10 sm:pt-14">
        <div className="container">
          <PlansExplorer key={initial} plans={plans} initialCategory={initial} />
        </div>
      </section>
    </>
  );
}
