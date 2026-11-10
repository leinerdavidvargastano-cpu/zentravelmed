"use client";
// Formulario de cotización.
//  - React Hook Form maneja los campos (register) y los errores.
//  - zodResolver conecta las reglas de lib/validacion.js.
//  - Al enviar: arma un mensaje con todos los datos y abre WhatsApp.
//  - Antes de abrir WhatsApp, guarda la solicitud en Supabase con la
//    función guardarCotizacion (lib/guardar.js).

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, MessageCircle, RotateCcw, Send } from "lucide-react";
import { esquemaCotizacion } from "@/lib/validacion";
import { guardarCotizacion } from "@/lib/guardar";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import Campo, { estiloCampo } from "@/components/forms/Campo";
import SelectorDestino, { nombreDestino } from "@/components/forms/SelectorDestino";

// Fecha de hoy en formato AAAA-MM-DD (para no dejar elegir fechas pasadas)
function hoy() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

// Convierte "2026-12-20" en "20/12/2026"
const fechaBonita = (f) => (f ? f.split("-").reverse().join("/") : "");

// Arma el texto que llega al WhatsApp de la agencia
function mensajeWhatsApp(d) {
  return [
    "Hola Zen Travel Medellín, quiero cotizar un viaje ✈️",
    "",
    `*Nombre:* ${d.nombre}`,
    `*Teléfono:* ${d.telefono}`,
    `*Correo:* ${d.correo}`,
    `*Destino:* ${nombreDestino(d.destino)}`,
    `*Salida:* ${fechaBonita(d.fechaSalida)}`,
    d.fechaRegreso ? `*Regreso:* ${fechaBonita(d.fechaRegreso)}` : null,
    `*Viajeros:* ${d.adultos} adulto(s)${d.ninos ? ` y ${d.ninos} niño(s)` : ""}`,
    d.mensaje ? `*Comentarios:* ${d.mensaje}` : null,
  ]
    .filter((linea) => linea !== null) // quita los campos opcionales que no se llenaron
    .join("\n");
}

export default function FormularioCotizacion({ destinoInicial = "" }) {
  const [enviado, setEnviado] = useState(null); // datos enviados (o null)
  const [errorServidor, setErrorServidor] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaCotizacion),
    defaultValues: {
      nombre: "",
      telefono: "",
      correo: "",
      destino: destinoInicial,
      fechaSalida: "",
      fechaRegreso: "",
      adultos: 2,
      ninos: 0,
      mensaje: "",
      acepta: false,
      sitioWeb: "",
    },
  });

  // Solo se llama si TODOS los campos pasaron la validación.
  // Es "async" porque espera la respuesta de Supabase (mientras tanto
  // isSubmitting es true y el botón muestra "Enviando…").
  async function alEnviar(datos) {
    setErrorServidor("");
    const respuesta = await guardarCotizacion(datos);
    if (!respuesta.ok) {
      setErrorServidor(respuesta.error);
      return;
    }
    window.open(enlaceWhatsApp(mensajeWhatsApp(datos)), "_blank", "noopener");
    setEnviado({ ...datos, aviso: respuesta.error });
  }

  // ---------- Pantalla de "¡Listo!" ----------
  if (enviado) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
        <CircleCheck size={56} className="mx-auto text-verde" />
        <h2 className="mt-4 text-3xl font-bold text-verde">¡Gracias, {enviado.nombre.split(" ")[0]}!</h2>
        <p className="mx-auto mt-3 max-w-md text-negro/75">
          Abrimos WhatsApp con tu solicitud para <strong>{nombreDestino(enviado.destino)}</strong>.
          Solo tienes que presionar <strong>enviar</strong> en WhatsApp y un asesor te responderá.
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
            Hacer otra cotización
          </button>
        </div>
      </div>
    );
  }

  // ---------- Formulario ----------
  return (
    <form
      onSubmit={handleSubmit(alEnviar)}
      noValidate // usamos nuestras validaciones, no las del navegador
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

      <Campo etiqueta="Nombre completo" htmlFor="nombre" error={errors.nombre} className="sm:col-span-2">
        <input id="nombre" autoComplete="name" className={estiloCampo(errors.nombre)} {...register("nombre")} />
      </Campo>

      <Campo etiqueta="Teléfono / WhatsApp" htmlFor="telefono" error={errors.telefono}>
        <input
          id="telefono"
          type="tel"
          autoComplete="tel"
          placeholder="300 123 4567"
          className={estiloCampo(errors.telefono)}
          {...register("telefono")}
        />
      </Campo>

      <Campo etiqueta="Correo" htmlFor="correo" error={errors.correo}>
        <input
          id="correo"
          type="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          className={estiloCampo(errors.correo)}
          {...register("correo")}
        />
      </Campo>

      {/* El selector de destino es un componente propio: se conecta con <Controller> */}
      <Campo etiqueta="Destino" htmlFor="destino" error={errors.destino} className="sm:col-span-2">
        <Controller
          name="destino"
          control={control}
          render={({ field }) => (
            <SelectorDestino
              id="destino"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.destino}
            />
          )}
        />
      </Campo>

      <Campo etiqueta="Fecha de salida" htmlFor="fechaSalida" error={errors.fechaSalida}>
        <input id="fechaSalida" type="date" min={hoy()} className={estiloCampo(errors.fechaSalida)} {...register("fechaSalida")} />
      </Campo>

      <Campo etiqueta="Fecha de regreso" htmlFor="fechaRegreso" error={errors.fechaRegreso} opcional>
        <input id="fechaRegreso" type="date" min={hoy()} className={estiloCampo(errors.fechaRegreso)} {...register("fechaRegreso")} />
      </Campo>

      {/* valueAsNumber: el campo entrega un número (2) y no un texto ("2") */}
      <Campo etiqueta="Adultos" htmlFor="adultos" error={errors.adultos}>
        <input id="adultos" type="number" min={1} max={30} className={estiloCampo(errors.adultos)} {...register("adultos", { valueAsNumber: true })} />
      </Campo>

      <Campo etiqueta="Niños" htmlFor="ninos" error={errors.ninos}>
        <input id="ninos" type="number" min={0} max={20} className={estiloCampo(errors.ninos)} {...register("ninos", { valueAsNumber: true })} />
      </Campo>

      <Campo etiqueta="Cuéntanos más" htmlFor="mensaje" error={errors.mensaje} opcional className="sm:col-span-2">
        <textarea
          id="mensaje"
          rows={4}
          placeholder="Presupuesto aproximado, tipo de hotel, si es luna de miel, viaje en familia…"
          className={estiloCampo(errors.mensaje)}
          {...register("mensaje")}
        />
      </Campo>

      {/* Autorización de datos personales */}
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-negro/80">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-verde" {...register("acepta")} />
          <span>
            Autorizo a Zen Travel Medellín a usar mis datos para responder esta solicitud, según la{" "}
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
        {isSubmitting ? "Enviando…" : "Enviar cotización por WhatsApp"}
      </button>
    </form>
  );
}
