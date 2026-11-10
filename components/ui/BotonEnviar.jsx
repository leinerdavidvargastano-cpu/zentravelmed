"use client";
// Botón de enviar con cargador.
// useFormStatus() avisa si el formulario donde está el botón se está enviando
// ("pending"). Mientras tanto el botón muestra un círculo girando, cambia el
// texto (ej: "Buscando…") y se desactiva para que no lo presionen dos veces.
// Sirve para el buscador y más adelante para los formularios de cotizar y contacto.

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export default function BotonEnviar({ children, icono, textoCargando = "Cargando…", className = "" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`flex items-center justify-center gap-2 transition disabled:cursor-wait disabled:opacity-80 ${className}`}
    >
      {pending ? (
        <>
          <LoaderCircle size={18} className="animate-spin" />
          {textoCargando}
        </>
      ) : (
        <>
          {icono}
          {children}
        </>
      )}
    </button>
  );
}
