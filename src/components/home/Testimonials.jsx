import Image from "next/image";
import { MapPin, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function Testimonials() {
  if (!testimonials.length) return null;
  const hasDemo = testimonials.some((t) => t.demo);

  return (
    <section id="testimonios" className="section" aria-labelledby="testimonios-title">
      <div className="container">
        <SectionHeading
          eyebrow="Opiniones"
          title={<span id="testimonios-title">Lo que dicen nuestros viajeros</span>}
          description={hasDemo ? "Sección preparada para publicar opiniones reales de viajeros, con su autorización." : "Experiencias reales de quienes ya viajaron con nosotros."}
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={`${t.nombre}-${i}`} delay={i * 90}>
              <figure className="card relative flex h-full flex-col p-7">
                {t.demo && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                    Ejemplo de demostración
                  </span>
                )}
                <Quote className="h-9 w-9 text-brand-light" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">“{t.opinion}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                  {t.foto ? (
                    <Image src={t.foto} alt={`Fotografía de ${t.nombre}`} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-sm font-bold text-white" aria-hidden="true">
                      {initials(t.nombre)}
                    </span>
                  )}
                  <span>
                    <span className="block font-semibold text-brand-dark">{t.nombre}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Viajó a {t.destino}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
