// Recuadro verde "¿No encuentras lo que deseas?" con botón a WhatsApp.
// Se usa al final de Destinos y de Paquetes.

import { MessageCircle } from "lucide-react";
import { enlaceWhatsApp } from "@/lib/whatsapp";

export default function NoEncuentras({
  texto = "Cuéntanos a dónde quieres ir y armamos el viaje contigo.",
  mensaje = "Hola, no encontré lo que busco en la página. Quiero viajar a:",
}) {
  return (
    <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl bg-verde px-6 py-10 text-center">
      <h2 className="text-3xl font-bold text-rosa">¿No encuentras lo que deseas?</h2>
      <p className="max-w-xl text-white/80">{texto}</p>
      <a
        href={enlaceWhatsApp(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-amarillo px-6 py-3 font-bold text-negro transition hover:scale-105"
      >
        <MessageCircle size={18} />
        Escríbenos por WhatsApp
      </a>
    </div>
  );
}
