// Portada de la página de inicio: título grande y buscador tipo filtro.
// <Form> de Next.js funciona como un formulario normal: al enviar,
// va a /destinos con los filtros en la URL, por ejemplo:
// /destinos?q=cartagena&tipo=playa&region=colombia

import Form from "next/form";
import { Search } from "lucide-react";
import { experiencias } from "@/data/experiencias";
import Selector from "@/components/ui/Selector";

const regiones = [
  { valor: "colombia", texto: "Colombia" },
  { valor: "internacional", texto: "Internacional" },
];

// Clases que se repiten en los campos del buscador
const etiqueta = "block text-xs font-semibold uppercase tracking-wider text-white/60";
const campo = "mt-1 w-full bg-transparent font-semibold text-white outline-none";

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

        {/* Buscador */}
        <Form
          action="/destinos"
          className="mt-10 grid gap-4 rounded-2xl border border-white/30 p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:gap-0 md:divide-x md:divide-white/20"
        >
          <label className="md:px-4">
            <span className={etiqueta}>Destino</span>
            <input
              type="text"
              name="q"
              placeholder="¿A dónde quieres ir?"
              className={`${campo} placeholder:font-normal placeholder:text-white/50`}
            />
          </label>

          <div className="md:px-4">
            <span className={etiqueta}>Experiencia</span>
            <Selector
              name="tipo"
              opciones={experiencias.map((exp) => ({ valor: exp.id, texto: exp.nombre }))}
            />
          </div>

          <div className="md:px-4">
            <span className={etiqueta}>Región</span>
            <Selector name="region" opciones={regiones} />
          </div>

          <div className="md:pl-4">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amarillo px-6 py-3 font-semibold text-negro hover:brightness-110"
            >
              <Search size={18} />
              Buscar
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
}
