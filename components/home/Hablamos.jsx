// Sección "¿Hablamos?": foto de la asesora y dos caminos para el cliente:
// llenar el formulario de cotización o escribir por WhatsApp.

import Image from "next/image";
import Link from "next/link";
import { ClipboardList, Mail, MessageCircle, Phone } from "lucide-react";
import { empresa } from "@/config/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";

export default function Hablamos() {
  return (
    <section className="w-full bg-rosa/40 px-4 py-20 md:px-10">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Foto de la asesora.
            La caja es menos alta que la foto (aspect-[4/5]) y "object-cover"
            recorta lo que sobra. Así queda fuera la marca de agua de abajo. */}
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-xl lg:justify-self-center">
          <Image
            src="/multimedia/fotos/asesora.webp"
            alt="Asesora de Zen Travel Medellín atendiendo a una pareja"
            fill
            sizes="(min-width: 1024px) 28rem, 100vw"
            className="object-cover object-[center_30%]"
          />
        </div>

        {/* Texto y opciones */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-verde/70">
            Asesoría personalizada
          </p>
          <h2 className="mt-2 text-4xl font-bold text-verde md:text-6xl">¿Hablamos?</h2>
          <p className="mt-4 max-w-xl text-lg text-negro/75">
            Cuéntanos a dónde quieres ir, cuándo y con quién. Te ayudamos a armar el viaje
            a tu medida.
          </p>

          {/* Dos opciones en tarjetas */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/cotizar"
              className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amarillo text-negro">
                <ClipboardList size={24} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-verde">Cotizar viaje</h3>
              <p className="mt-1 text-sm text-negro/70">
                Llena un formulario corto y te enviamos una propuesta.
              </p>
            </Link>

            <a
              href={enlaceWhatsApp(`Hola ${empresa.nombre}, quiero hablar con un asesor.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-verde p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rosa text-verde">
                <MessageCircle size={24} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-rosa">Hablar con un asesor</h3>
              <p className="mt-1 text-sm text-white/80">
                Escríbenos por WhatsApp y resolvemos tus dudas.
              </p>
            </a>
          </div>

          {/* Datos de contacto */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-verde">
            <a href={`mailto:${empresa.correo}`} className="flex items-center gap-2 hover:underline">
              <Mail size={18} />
              {empresa.correo}
            </a>
            {empresa.telefono && (
              <a
                href={`tel:${empresa.telefono.replaceAll(" ", "")}`}
                className="flex items-center gap-2 hover:underline"
              >
                <Phone size={18} />
                {empresa.telefono}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
