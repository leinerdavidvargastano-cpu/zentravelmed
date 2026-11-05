import Image from "next/image";
import Link from "next/link";
import { BookOpen, Eye, Gem, HeartHandshake, Plane, Target, Users } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Services from "@/components/home/Services";
import Reveal from "@/components/ui/Reveal";
import { about } from "@/data/about";
import { destinationImages } from "@/data/destination-images";

export const metadata = {
  title: "Nosotros",
  description: "Conoce a Zentravel Medellín: quiénes somos, nuestra misión, visión, valores y compromiso con los viajeros.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  const img = (slug, i = 0) => destinationImages[slug]?.galeria?.[i] || destinationImages[slug]?.imagen;

  return (
    <>
      <PageHeader
        image={img("salento", 1)}
        crumbs={[{ label: "Nosotros" }]}
        eyebrow="Nosotros"
        title="Viajar es más fácil cuando alguien te acompaña"
        description="Somos una agencia de viajes de Medellín apasionada por mostrar lo mejor de Colombia y del mundo."
      />

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3"><Users className="h-4 w-4" aria-hidden="true" /> Quiénes somos</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{"Zentravel Medellín"}</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">{about.quienesSomos}</p>
            {about.historia && (
              <>
                <h3 className="mt-10 flex items-center gap-2 text-2xl font-bold">
                  <BookOpen className="h-6 w-6 text-brand" aria-hidden="true" /> Nuestra historia
                </h3>
                <p className="mt-3 leading-relaxed text-gray-700">{about.historia}</p>
              </>
            )}
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={img("valle-del-cocora", 1)} alt="Valle del Cocora" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={img("cartagena", 1)} alt="Calles de Cartagena" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-bg">
        <div className="container grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: "Misión", text: about.mision },
            { icon: Eye, title: "Visión", text: about.vision },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="card h-full p-8 sm:p-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-2xl font-extrabold">{title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-gray-700">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow mb-3 justify-center"><Gem className="h-4 w-4" aria-hidden="true" /> Valores</p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Lo que nos mueve</h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.valores.map((v, i) => (
              <Reveal as="li" key={v.titulo} delay={i * 80}>
                <div className="card card-hover h-full p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg font-display text-lg font-extrabold text-brand">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{v.titulo}</h3>
                  <p className="mt-2 text-sm text-gray-600">{v.texto}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-brand-dark">
        <Image src={img("leticia", 0)} alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="container relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-3 text-brand-light"><HeartHandshake className="h-4 w-4" aria-hidden="true" /> Compromiso con los viajeros</p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Nuestro compromiso contigo</h2>
            <Link href="/cotizar" className="btn-light mt-8">
              <Plane className="h-4 w-4" aria-hidden="true" /> Cotizar mi viaje
            </Link>
          </div>
          <ul className="space-y-3">
            {about.compromiso.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-brand-light" aria-hidden="true" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Services />
    </>
  );
}
