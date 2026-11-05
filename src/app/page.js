import Hero from "@/components/home/Hero";
import ColombiaShowcase from "@/components/home/ColombiaShowcase";
import WorldShowcase from "@/components/home/WorldShowcase";
import Services from "@/components/home/Services";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import QuoteSection from "@/components/home/QuoteSection";
import PlansExplorer from "@/components/plans/PlansExplorer";
import SectionHeading from "@/components/ui/SectionHeading";
import Gallery from "@/components/ui/Gallery";
import { getDestinationOptions, getDestinations, getFeaturedDestinations, getPlans } from "@/lib/data";
import { destinationImages } from "@/data/destination-images";
import { experienceGallery } from "@/data/gallery";

export const revalidate = 300;

export default async function HomePage() {
  const [options, nacionales, internacionales, plans, allNational, allInternational] = await Promise.all([
    getDestinationOptions(),
    getFeaturedDestinations("nacional", 6),
    getFeaturedDestinations("internacional", 7),
    getPlans(),
    getDestinations({ tipo: "nacional" }),
    getDestinations({ tipo: "internacional" }),
  ]);

  return (
    <>
      <Hero image={destinationImages["valle-del-cocora"]?.imagen} options={options} />

      <section id="planes" className="section" aria-labelledby="planes-title">
        <div className="container">
          <SectionHeading
            eyebrow="Planes turísticos"
            title={<span id="planes-title">Encuentra el plan perfecto para tu próximo viaje</span>}
            description="Planes nacionales e internacionales organizados por tipo de experiencia. Elige uno como punto de partida y lo ajustamos a tu medida."
          />
          <PlansExplorer plans={plans} limit={6} showAllLink />
        </div>
      </section>

      <ColombiaShowcase destinations={nacionales} total={allNational.length} />
      <WorldShowcase destinations={internacionales} total={allInternational.length} />
      <Services />
      <AboutPreview images={[destinationImages["salento"]?.imagen, destinationImages["parque-tayrona"]?.galeria?.[2]]} />

      <section id="galeria" className="section bg-brand-bg" aria-labelledby="galeria-title">
        <div className="container">
          <SectionHeading
            eyebrow="Galería"
            title={<span id="galeria-title">Experiencias que te esperan</span>}
            description="Playas, montañas, ciudades y naturaleza. Toca una fotografía para verla en grande."
          />
          <Gallery items={experienceGallery} />
        </div>
      </section>

      <Testimonials />
      <QuoteSection options={options} />
    </>
  );
}
