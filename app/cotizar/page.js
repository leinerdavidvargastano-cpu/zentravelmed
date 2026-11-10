// Página /cotizar. Si viene de un destino (?destino=cartagena) o de la
// sección de cruceros (?tipo=cruceros), el destino ya aparece elegido.

import { ClipboardList, MessageCircle, Plane } from "lucide-react";
import FormularioCotizacion from "@/components/forms/FormularioCotizacion";
import { obtenerDestino } from "@/lib/destinos";

export const metadata = {
  title: "Cotizar viaje",
  description: "Cuéntanos a dónde quieres ir y te enviamos una propuesta a tu medida.",
};

const pasos = [
  { icono: ClipboardList, titulo: "Llenas el formulario", texto: "Destino, fechas y cuántas personas viajan." },
  { icono: MessageCircle, titulo: "Lo envías por WhatsApp", texto: "Se abre WhatsApp con tu solicitud lista." },
  { icono: Plane, titulo: "Recibes tu propuesta", texto: "Un asesor te arma el plan y te acompaña." },
];

export default async function CotizarPage({ searchParams }) {
  const { destino = "", tipo = "" } = await searchParams;

  // Solo se usa el destino de la URL si existe en la lista
  let destinoInicial = obtenerDestino(destino) ? destino : "";
  if (!destinoInicial && tipo === "cruceros") destinoInicial = "cruceros-caribe";

  return (
    <main className="flex-1">
      <section className="fondo-viaje w-full px-4 pb-32 pt-14 md:px-10">
        <h1 className="text-5xl font-bold text-rosa md:text-6xl">Cotiza tu viaje</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/80">
          Cuéntanos qué tienes en mente. Es gratis y sin compromiso.
        </p>
      </section>

      {/* El formulario "sube" sobre el encabezado verde (-mt-24) */}
      <section className="-mt-24 grid w-full gap-8 px-4 pb-16 md:px-10 lg:grid-cols-[1fr_340px]">
        <FormularioCotizacion destinoInicial={destinoInicial} />

        <aside className="h-fit rounded-3xl bg-verde p-8 lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-rosa">¿Cómo funciona?</h2>
          <ol className="mt-6 space-y-6">
            {pasos.map((p, i) => (
              <li key={p.titulo} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amarillo font-bold text-negro">
                  {i + 1}
                </span>
                <div>
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <p.icono size={16} className="text-rosa" />
                    {p.titulo}
                  </p>
                  <p className="mt-1 text-sm text-white/70">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </main>
  );
}
