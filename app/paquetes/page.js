// Página /paquetes: los paquetes turísticos de la agencia.
// Los datos están en data/paquetes.js.

import { ShieldCheck } from "lucide-react";
import { paquetes } from "@/data/paquetes";
import PaqueteCard from "@/components/paquetes/PaqueteCard";
import NoEncuentras from "@/components/ui/NoEncuentras";

export const metadata = {
  title: "Paquetes turísticos",
  description: "Paquetes a España, Alemania y Francia con hotel, desayuno, traslados, city tour y asesoría.",
};

export default function PaquetesPage() {
  return (
    <main className="flex-1">
      <section className="fondo-viaje w-full px-4 py-14 md:px-10">
        <p className="inline-block rounded-full bg-amarillo px-3 py-1 text-sm font-semibold text-negro">
          Internacionales
        </p>
        <h1 className="mt-4 text-5xl font-bold text-rosa md:text-6xl">Paquetes turísticos</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/80">
          Viajes listos para disfrutar. Elige tu paquete y te armamos la cotización con tus fechas.
        </p>
      </section>

      <section className="w-full bg-gray-50 px-4 py-14 md:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paquetes.map((p) => (
            <PaqueteCard key={p.slug} paquete={p} />
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-gray-500">
          <ShieldCheck size={16} className="text-verde" />
          Fechas, hoteles y precios se ajustan a tu viaje en la cotización.
        </p>

        <NoEncuentras
          texto="¿Quieres otro país, más ciudades o un viaje a tu medida? Lo armamos contigo."
          mensaje="Hola, quiero un paquete a la medida. Me gustaría viajar a:"
        />
      </section>
    </main>
  );
}
