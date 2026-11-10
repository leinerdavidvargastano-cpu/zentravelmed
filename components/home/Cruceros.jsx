// Sección "Cruceros": texto, certificado Royal Caribbean y video vertical.
// En computador: texto a la izquierda y video a la derecha.
// En celular: el texto arriba y el video debajo.

import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle, ShipWheel } from "lucide-react";
import VideoCelular from "@/components/ui/VideoCelular";
import { enlaceWhatsApp } from "@/lib/whatsapp";

const ventajas = [
  "Asesoría para elegir el barco y la ruta",
  "Viajes en pareja, en familia y en grupo",
  "Cotización a la medida de tu presupuesto",
];

export default function Cruceros() {
  return (
    <section className="fondo-viaje w-full px-4 py-20 md:px-10">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
        {/* Columna de texto */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-amarillo px-3 py-1 text-sm font-semibold text-negro">
            <ShipWheel size={16} />
            Cruceros
          </p>

          <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-rosa md:text-6xl">
            Varios destinos, un solo viaje.
          </h2>

          <p className="mt-4 max-w-xl text-lg text-white/80">
            Navega por el Caribe y el mundo con hospedaje, comidas y entretenimiento a bordo.
            Nosotros te ayudamos a elegir el crucero ideal.
          </p>

          <ul className="mt-6 space-y-3">
            {ventajas.map((v) => (
              <li key={v} className="flex items-center gap-3 text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rosa text-verde">
                  <Check size={14} strokeWidth={3} />
                </span>
                {v}
              </li>
            ))}
          </ul>

          {/* Certificado Royal Caribbean: al hacer clic se abre en grande */}
          <a
            href="/multimedia/fotos/certificacion_zen_travel_med.webp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex max-w-md items-center gap-4 rounded-2xl border border-white/20 bg-white/5 p-3 backdrop-blur transition hover:border-rosa"
          >
            <Image
              src="/multimedia/fotos/certificacion_zen_travel_med.webp"
              alt="Certificado Royal Caribbean: Experto en grupos"
              width={120}
              height={85}
              className="rounded-lg"
            />
            <div>
              <p className="font-semibold text-rosa">Expertos certificados</p>
              <p className="text-sm text-white/75">
                Especialistas en grupos de Royal Caribbean. Ver certificado.
              </p>
            </div>
          </a>

          {/* Botones */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/cotizar?tipo=cruceros"
              className="rounded-xl bg-amarillo px-6 py-3 font-semibold text-negro hover:brightness-110"
            >
              Cotizar crucero
            </Link>
            <a
              href={enlaceWhatsApp("Hola, quiero información sobre cruceros.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-rosa px-6 py-3 font-semibold text-rosa hover:bg-rosa hover:text-verde"
            >
              <MessageCircle size={18} />
              Preguntar por WhatsApp
            </a>
          </div>
        </div>

        {/* Columna del video */}
        <VideoCelular
          src="/multimedia/videos/CRUCEROS-ZENTRAVELMED.mp4"
          poster="/multimedia/fotos/crucero_1.avif"
          titulo="Video de cruceros Zen Travel Medellín"
        />
      </div>
    </section>
  );
}
