"use client";
// Botón "Cargar más". Es un enlace a la misma página pidiendo más tarjetas
// (ej: /destinos?colombia=24). scroll={false} evita que la página salte
// hacia arriba al cargar.
// useLinkStatus() avisa si el enlace se está cargando, para mostrar el
// cargador dentro del botón (igual que el botón Buscar).

import Link, { useLinkStatus } from "next/link";
import { ChevronDown, LoaderCircle } from "lucide-react";

// Tiene que ser un componente DENTRO del <Link> para poder usar useLinkStatus
function Contenido({ restantes }) {
  const { pending } = useLinkStatus();
  return pending ? (
    <>
      <LoaderCircle size={18} className="animate-spin" />
      Cargando…
    </>
  ) : (
    <>
      <ChevronDown size={18} />
      Cargar más ({restantes})
    </>
  );
}

export default function BotonCargarMas({ href, restantes }) {
  return (
    <Link
      href={href}
      scroll={false}
      className="flex items-center gap-2 rounded-full border-2 border-verde px-6 py-3 font-semibold text-verde transition hover:bg-verde hover:text-rosa"
    >
      <Contenido restantes={restantes} />
    </Link>
  );
}
