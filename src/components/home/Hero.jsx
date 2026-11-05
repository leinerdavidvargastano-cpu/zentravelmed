import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Plane } from "lucide-react";
import TripSearch from "./TripSearch";

export default function Hero({ image, options }) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-brand-dark pb-10 pt-28 sm:pb-14">
      {image && (
        <Image
          src={image}
          alt="Palmas de cera en el Valle del Cocora, Colombia"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/45 to-black/30" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/70 via-transparent to-transparent" aria-hidden="true" />

      <div className="container">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur">
            <Leaf className="h-4 w-4 text-brand-light" aria-hidden="true" />
            Agencia de viajes en Medellín
          </p>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Descubre nuevos destinos, <span className="text-brand-light">vive nuevas experiencias</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Planes turísticos por Colombia y el mundo, diseñados a tu medida. Te acompañamos desde la idea hasta el
            regreso con asesoría cercana y personalizada.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/destinos" className="btn-light px-6 py-3.5 text-base">
              Explorar destinos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/cotizar" className="btn-ghost-light px-6 py-3.5 text-base">
              <Plane className="h-4 w-4" aria-hidden="true" /> Cotizar viaje
            </Link>
          </div>
        </div>

        <div className="mt-12 animate-fade-up [animation-delay:200ms]">
          <TripSearch options={options} />
        </div>
      </div>
    </section>
  );
}
