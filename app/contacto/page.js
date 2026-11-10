// Página /contacto: formulario y datos de contacto de la agencia.

import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import FormularioContacto from "@/components/forms/FormularioContacto";
import { empresa } from "@/config/site";
import { enlaceWhatsApp } from "@/lib/whatsapp";

export const metadata = {
  title: "Contacto",
  description: "Escríbenos por WhatsApp, correo o desde el formulario. Te ayudamos a planear tu viaje.",
};

export default function ContactoPage() {
  // Las tarjetas de contacto (las que no tienen dato no se muestran)
  const datos = [
    {
      icono: MessageCircle,
      titulo: "WhatsApp",
      texto: empresa.telefono,
      enlace: enlaceWhatsApp(`Hola ${empresa.nombre}, quiero información.`),
      externo: true,
    },
    empresa.telefono && {
      icono: Phone,
      titulo: "Teléfono",
      texto: empresa.telefono,
      enlace: `tel:${empresa.telefono.replaceAll(" ", "")}`,
    },
    { icono: Mail, titulo: "Correo", texto: empresa.correo, enlace: `mailto:${empresa.correo}` },
    { icono: MapPin, titulo: "Ubicación", texto: empresa.ciudad },
  ].filter(Boolean);

  return (
    <main className="flex-1">
      <section className="fondo-viaje w-full px-4 pb-32 pt-14 md:px-10">
        <h1 className="text-5xl font-bold text-rosa md:text-6xl">Contáctanos</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/80">
          ¿Tienes preguntas? Escríbenos y te respondemos lo antes posible.
        </p>
      </section>

      <section className="-mt-24 grid w-full gap-8 px-4 pb-16 md:px-10 lg:grid-cols-[1fr_380px]">
        <FormularioContacto />

        <aside className="flex h-fit flex-col gap-4">
          {/* Foto */}
          <div className="esqueleto relative h-48 overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/multimedia/fotos/contacto.avif"
              alt="Persona escribiendo en el computador"
              fill
              sizes="380px"
              className="object-cover"
            />
          </div>

          {/* Tarjetas con cada forma de contacto */}
          {datos.map((d) => {
            const contenido = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rosa/50 text-verde">
                  <d.icono size={22} />
                </span>
                <span>
                  <span className="block text-sm text-gray-500">{d.titulo}</span>
                  <span className="block font-semibold text-verde">{d.texto}</span>
                </span>
              </>
            );
            const clase = "flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md";
            return d.enlace ? (
              <a
                key={d.titulo}
                href={d.enlace}
                {...(d.externo && { target: "_blank", rel: "noopener noreferrer" })}
                className={`${clase} transition hover:-translate-y-0.5 hover:shadow-lg`}
              >
                {contenido}
              </a>
            ) : (
              <div key={d.titulo} className={clase}>
                {contenido}
              </div>
            );
          })}
        </aside>
      </section>
    </main>
  );
}
