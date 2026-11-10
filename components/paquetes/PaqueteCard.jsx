// Tarjeta de un paquete: foto de fondo, nombre grande, lo que incluye,
// precio y botones (como en la página anterior de la agencia, pero con un
// degradado oscuro para que el texto se lea bien sobre la foto).

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Camera, Check, MessageCircle, Plane } from "lucide-react";
import { obtenerDestino, fotoDestino, creditoFoto } from "@/lib/destinos";
import { enlaceWhatsApp } from "@/lib/whatsapp";

// 4500000 → "$4.500.000"
const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export default function PaqueteCard({ paquete }) {
  const destino = obtenerDestino(paquete.destino);
  const credito = destino ? creditoFoto(destino) : null;

  return (
    <article className="esqueleto group relative flex min-h-[30rem] flex-col justify-end overflow-hidden rounded-3xl shadow-xl">
      {/* Foto de fondo (la grande del destino), crece un poco al pasar el mouse */}
      {destino && (
        <Image
          src={fotoDestino(destino)}
          alt={paquete.nombre}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-negro via-negro/70 to-negro/10" />

      <div className="relative p-7">
        <h2 className="text-4xl font-bold text-rosa">{paquete.nombre}</h2>
        <p className="mt-2 text-white/85">{paquete.descripcion}</p>

        {paquete.duracion && (
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-amarillo">
            <CalendarDays size={16} />
            {paquete.duracion}
          </p>
        )}

        {/* Lo que incluye */}
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
          {paquete.incluye.map((item) => (
            <li key={item} className="flex items-center gap-2 text-white">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rosa text-verde">
                <Check size={12} strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* Precio */}
        <p className="mt-6 text-sm text-white/70">
          {paquete.precio ? (
            <>
              Desde <span className="text-2xl font-bold text-white">{formatoPesos.format(paquete.precio)}</span>{" "}
              por persona
            </>
          ) : (
            <span className="font-semibold text-white">Precio según cotización</span>
          )}
        </p>

        {/* Botones */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href={`/cotizar?destino=${paquete.destino}&paquete=${paquete.slug}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-amarillo px-4 py-3 font-bold text-negro transition hover:scale-105"
          >
            <Plane size={16} />
            Cotizar
          </Link>
          <a
            href={enlaceWhatsApp(`Hola, me interesa el paquete ${paquete.nombre}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-rosa px-4 py-3 font-semibold text-rosa transition hover:bg-rosa hover:text-verde"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Crédito de la foto (arriba a la derecha para no tapar el texto) */}
      {credito && (
        <a
          href={credito.fuente}
          target="_blank"
          rel="noopener noreferrer"
          title={`Foto: ${credito.autor} · ${credito.licencia} · Wikimedia Commons`}
          className="absolute right-3 top-3 flex max-w-[70%] items-center gap-1 rounded-full bg-negro/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur hover:text-white"
        >
          <Camera size={12} className="shrink-0" />
          <span className="truncate">
            {credito.autor} · {credito.licencia}
          </span>
        </a>
      )}
    </article>
  );
}
