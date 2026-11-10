"use client";
// Formulario de contacto: nombre, correo, teléfono (opcional) y mensaje.
// Funciona igual que el de cotización: valida con Zod, guarda en Supabase
// (lib/guardar.js) y abre WhatsApp.

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, MessageCircle, RotateCcw, Send } from "lucide-react";
import { esquemaContacto } from "@/lib/validacion";
import { guardarMensaje } from "@/lib/guardar";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import Campo, { estiloCampo } from "@/components/forms/Campo";

function mensajeWhatsApp(d) {
  return [
    "Hola Zen Travel Medellín 👋",
    "",
    `*Nombre:* ${d.nombre}`,
    `*Correo:* ${d.correo}`,
    d.telefono ? `*Teléfono:* ${d.telefono}` : null,
    `*Mensaje:* ${d.mensaje}`,
  ]
    .filter((linea) => linea !== null) // quita el teléfono si no se escribió
    .join("\n");
}

export default function FormularioContacto() {
  const [enviado, setEnviado] = useState(null);
  const [errorServidor, setErrorServidor] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaContacto),
    defaultValues: { nombre: "", correo: "", telefono: "", mensaje: "", acepta: false, sitioWeb: "" },
  });

  // watch: lee el mensaje mientras se escribe, para el contador de letras
  const largoMensaje = watch("mensaje")?.length ?? 0;

  async function alEnviar(datos) {
    setErrorServidor("");
    const respuesta = await guardarMensaje(datos);
    if (!respuesta.ok) {
      setErrorServidor(respuesta.error);
      return;
    }
    window.open(enlaceWhatsApp(mensajeWhatsApp(datos)), "_blank", "noopener");
    setEnviado({ ...datos, aviso: respuesta.error });
  }

  if (enviado) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
        <CircleCheck size={56} className="mx-auto text-verde" />
        <h2 className="mt-4 text-3xl font-bold text-verde">¡Mensaje listo!</h2>
        <p className="mx-auto mt-3 max-w-md text-negro/75">
          Abrimos WhatsApp con tu mensaje. Presiona <strong>enviar</strong> en WhatsApp y te
          responderemos pronto.
        </p>
        {enviado.aviso && (
          <p className="mx-auto mt-4 max-w-md rounded-xl bg-amarillo/20 p-3 text-sm text-negro/80">
            {enviado.aviso}
          </p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={enlaceWhatsApp(mensajeWhatsApp(enviado))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white transition hover:brightness-110"
          >
            <MessageCircle size={18} />
            Abrir WhatsApp otra vez
          </a>
          <button
            type="button"
            onClick={() => {
              reset();
              setEnviado(null);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-verde px-6 py-3 font-semibold text-verde transition hover:bg-verde hover:text-rosa"
          >
            <RotateCcw size={18} />
            Escribir otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(alEnviar)}
      noValidate
      className="relative grid gap-5 rounded-3xl bg-white p-6 shadow-xl sm:grid-cols-2 md:p-10"
    >
      {/* Antispam: campo escondido. Las personas no lo ven; los robots sí lo llenan */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("sitioWeb")}
      />

      <Campo etiqueta="Nombre completo" htmlFor="c-nombre" error={errors.nombre} className="sm:col-span-2">
        <input id="c-nombre" autoComplete="name" className={estiloCampo(errors.nombre)} {...register("nombre")} />
      </Campo>

      <Campo etiqueta="Correo" htmlFor="c-correo" error={errors.correo}>
        <input id="c-correo" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" className={estiloCampo(errors.correo)} {...register("correo")} />
      </Campo>

      <Campo etiqueta="Teléfono" htmlFor="c-telefono" error={errors.telefono} opcional>
        <input id="c-telefono" type="tel" autoComplete="tel" placeholder="300 123 4567" className={estiloCampo(errors.telefono)} {...register("telefono")} />
      </Campo>

      <Campo etiqueta="Mensaje" htmlFor="c-mensaje" error={errors.mensaje} className="sm:col-span-2">
        <textarea id="c-mensaje" rows={6} placeholder="¿En qué te podemos ayudar?" className={estiloCampo(errors.mensaje)} {...register("mensaje")} />
        <p className={`mt-1 text-right text-xs ${largoMensaje > 1000 ? "text-red-600" : "text-gray-400"}`}>
          {largoMensaje}/1000
        </p>
      </Campo>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-negro/80">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-verde" {...register("acepta")} />
          <span>
            Autorizo a Zen Travel Medellín a usar mis datos para responder este mensaje, según la{" "}
            <Link href="/tratamiento-de-datos" className="font-semibold text-verde underline">
              política de tratamiento de datos
            </Link>{" "}
            (Ley 1581 de 2012).
          </span>
        </label>
        {errors.acepta && <p role="alert" className="mt-1.5 text-sm text-red-600">{errors.acepta.message}</p>}
      </div>

      {errorServidor && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">
          {errorServidor}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-xl bg-amarillo px-6 py-4 text-lg font-bold text-negro transition enabled:hover:scale-[1.02] disabled:cursor-wait disabled:opacity-80 sm:col-span-2"
      >
        {isSubmitting ? <LoaderCircle size={20} className="animate-spin" /> : <Send size={20} />}
        {isSubmitting ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
