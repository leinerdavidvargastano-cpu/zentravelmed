// Portada de la página de inicio: título grande y buscador tipo filtro.
// El buscador está en components/ui/Buscador.jsx porque también
// se usa en la página de destinos.

import Buscador from "@/components/ui/Buscador";

export default function Hero() {
  return (
    <section className="fondo-viaje relative">
      {/* Círculos decorativos (como en la imagen de ejemplo) */}
      <div className="pointer-events-none absolute right-10 top-10 hidden h-64 w-64 rounded-full border border-white/40 lg:block" />
      <div className="pointer-events-none absolute right-6 top-48 hidden h-28 w-28 rounded-full bg-rosa lg:block" />

      <div className="relative w-full px-4 py-20 md:px-10 md:py-28">
        <p className="inline-block rounded-full bg-amarillo px-3 py-1 text-sm font-semibold text-negro">
          Colombia y el mundo
        </p>

        <h1 className="mt-6 max-w-2xl text-5xl font-bold leading-tight text-rosa md:text-7xl">
          Descubre tu próxima experiencia.
        </h1>

        <p className="mt-4 max-w-xl text-lg text-white/80">
          Playas, montañas, pueblos y ciudades. Te ayudamos a planear el viaje que sueñas.
        </p>

        <div className="mt-10">
          <Buscador />
        </div>
      </div>
    </section>
  );
}
