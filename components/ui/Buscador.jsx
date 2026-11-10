// Buscador tipo filtro (Destino · Experiencia · Región · Buscar).
// Se usa en la portada y en la página de destinos.
// Las props q, tipo y region rellenan los campos con la búsqueda actual.
//
// <Form> de Next.js funciona como un formulario normal: al enviar,
// va a /destinos con los filtros en la URL, por ejemplo:
// /destinos?q=cartagena&tipo=playa&region=colombia

import Form from "next/form";
import { Search } from "lucide-react";
import { experiencias } from "@/data/experiencias";
import Selector from "@/components/ui/Selector";
import BotonEnviar from "@/components/ui/BotonEnviar";

const regiones = [
  { valor: "colombia", texto: "Colombia" },
  { valor: "internacional", texto: "Internacional" },
];

const etiqueta = "block text-xs font-semibold uppercase tracking-wider text-white/60";

export default function Buscador({ q = "", tipo = "", region = "" }) {
  return (
    <Form
      action="/destinos"
      className="grid gap-4 rounded-2xl border border-white/30 p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:gap-0 md:divide-x md:divide-white/20"
    >
      <label className="md:px-4">
        <span className={etiqueta}>Destino</span>
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="¿A dónde quieres ir?"
          className="mt-1 w-full bg-transparent font-semibold text-white outline-none placeholder:font-normal placeholder:text-white/50"
        />
      </label>

      <div className="md:px-4">
        <span className={etiqueta}>Experiencia</span>
        <Selector
          name="tipo"
          valorInicial={tipo}
          opciones={experiencias.map((exp) => ({ valor: exp.id, texto: exp.nombre }))}
        />
      </div>

      <div className="md:px-4">
        <span className={etiqueta}>Región</span>
        <Selector name="region" valorInicial={region} opciones={regiones} />
      </div>

      <div className="md:pl-4">
        <BotonEnviar
          icono={<Search size={18} />}
          textoCargando="Buscando…"
          className="w-full rounded-xl bg-amarillo px-6 py-3 font-semibold text-negro enabled:hover:scale-105 enabled:hover:brightness-110"
        >
          Buscar
        </BotonEnviar>
      </div>
    </Form>
  );
}
