import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, HeartHandshake, Target } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { about } from "@/data/about";

export default function AboutPreview({ images }) {
  const items = [
    { icon: Target, title: "Misión", text: about.mision },
    { icon: Eye, title: "Visión", text: about.vision },
    { icon: HeartHandshake, title: "Compromiso", text: about.compromiso[0] },
  ];

  return (
    <section id="nosotros" className="section overflow-hidden" aria-labelledby="nosotros-title">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="grid grid-cols-5 grid-rows-6 gap-4" style={{ height: "min(560px, 110vw)" }}>
            <div className="relative col-span-3 row-span-6 overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={images[0]} alt="Paisaje de montaña en el Eje Cafetero" fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[2rem] shadow-soft">
              <Image src={images[1]} alt="Playa del Caribe colombiano" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            </div>
            <div className="col-span-2 row-span-3 flex flex-col justify-end rounded-[2rem] bg-brand p-5 text-white shadow-soft">
              <p className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">Colombia y el mundo</p>
              <p className="mt-1 text-sm text-white/80">con asesoría a tu medida</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow mb-3">
            <span className="h-px w-6 bg-brand" aria-hidden="true" /> Nosotros
          </p>
          <h2 id="nosotros-title" className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Viajar es más fácil cuando alguien te acompaña
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">{about.quienesSomos}</p>
          <ul className="mt-8 space-y-5">
            {items.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-bg text-brand">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display font-bold text-brand-dark">{title}</span>
                  <span className="text-sm leading-relaxed text-gray-600">{text}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href="/nosotros" className="btn-primary mt-8 px-7">
            Conócenos <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
