"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle, Send, ShieldCheck } from "lucide-react";
import { quoteSchema } from "@/lib/validation";
import { BUDGETS } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

const budgetOptions = [...BUDGETS.filter((b) => b.key).map((b) => b.label), "Prefiero que me asesoren"];

/**
 * Formulario de cotización rápida.
 * 1) valida con Zod  2) guarda en Supabase vía /api/cotizaciones
 * 3) genera un mensaje organizado para WhatsApp  4) muestra confirmación.
 * No solicita información bancaria ni de tarjetas.
 */
export default function QuoteForm({ options = [], defaults = {}, compact = false }) {
  const [result, setResult] = useState(null);
  const [serverError, setServerError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // raw: se envían los valores originales; el servidor vuelve a validar y transformar.
    resolver: zodResolver(quoteSchema, undefined, { raw: true }),
    mode: "onTouched",
    defaultValues: {
      nombre: "",
      telefono: "",
      correo: "",
      destino: defaults.destino || "",
      fecha_viaje: defaults.fecha_viaje || "",
      adultos: defaults.adultos || 2,
      ninos: 0,
      presupuesto: defaults.presupuesto || "",
      comentarios: "",
      origen: defaults.origen || "",
      acepta_datos: false,
      empresa: "",
    },
  });

  async function onSubmit(values) {
    setServerError("");
    try {
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "No pudimos enviar tu solicitud.");
      setResult({ whatsappUrl: data.whatsappUrl, nombre: values.nombre.split(" ")[0] });
      reset();
    } catch (err) {
      setServerError(`${err.message} Inténtalo de nuevo o escríbenos por WhatsApp.`);
    }
  }

  if (result) {
    return (
      <div className="animate-fade-up rounded-3xl bg-white p-8 text-center shadow-lift ring-1 ring-brand/10 sm:p-10" role="status" aria-live="polite">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-bg">
          <CircleCheck className="h-9 w-9 text-brand" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl font-extrabold">¡Solicitud recibida, {result.nombre}!</h3>
        <p className="mx-auto mt-3 max-w-md text-gray-600">
          Un asesor revisará tu solicitud y te contactará por WhatsApp. Si quieres agilizar el proceso, continúa la
          conversación ahora mismo: tu mensaje ya está listo.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={result.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-7 py-3.5 text-base">
            <WhatsAppIcon className="h-5 w-5" /> Continuar en WhatsApp
          </a>
          <button type="button" onClick={() => setResult(null)} className="btn-outline px-7">
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  const Err = ({ name }) =>
    errors[name] ? (
      <p id={`${name}-error`} className="field-error" role="alert">
        {errors[name].message}
      </p>
    ) : null;
  const aria = (name) => ({ "aria-invalid": errors[name] ? "true" : "false", "aria-describedby": errors[name] ? `${name}-error` : undefined });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-3xl bg-white p-6 shadow-lift ring-1 ring-brand/10 sm:p-8">
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div className="sm:col-span-2">
          <label htmlFor="q-nombre" className="field-label">Nombre completo *</label>
          <input id="q-nombre" autoComplete="name" className="field" placeholder="¿Cómo te llamas?" {...register("nombre")} {...aria("nombre")} />
          <Err name="nombre" />
        </div>

        <div>
          <label htmlFor="q-telefono" className="field-label">Número de WhatsApp *</label>
          <input id="q-telefono" type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="Ej: 300 123 4567" {...register("telefono")} {...aria("telefono")} />
          <Err name="telefono" />
        </div>

        <div>
          <label htmlFor="q-correo" className="field-label">
            Correo electrónico <span className="font-normal text-gray-400">(opcional)</span>
          </label>
          <input id="q-correo" type="email" autoComplete="email" className="field" placeholder="tucorreo@ejemplo.com" {...register("correo")} {...aria("correo")} />
          <Err name="correo" />
        </div>

        <div>
          <label htmlFor="q-destino" className="field-label">Destino *</label>
          <input id="q-destino" list="q-destinos" autoComplete="off" className="field" placeholder="¿A dónde quieres viajar?" {...register("destino")} {...aria("destino")} />
          <datalist id="q-destinos">
            {options.map((o) => (
              <option key={o.slug} value={o.nombre} />
            ))}
          </datalist>
          <Err name="destino" />
        </div>

        <div>
          <label htmlFor="q-fecha" className="field-label">Fecha de viaje</label>
          <input id="q-fecha" type="date" min={today} className="field" {...register("fecha_viaje")} {...aria("fecha_viaje")} />
          <Err name="fecha_viaje" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="q-adultos" className="field-label">Adultos *</label>
            <input id="q-adultos" type="number" min={1} max={50} inputMode="numeric" className="field" {...register("adultos")} {...aria("adultos")} />
            <Err name="adultos" />
          </div>
          <div>
            <label htmlFor="q-ninos" className="field-label">Niños</label>
            <input id="q-ninos" type="number" min={0} max={50} inputMode="numeric" className="field" {...register("ninos")} {...aria("ninos")} />
            <Err name="ninos" />
          </div>
        </div>

        <div>
          <label htmlFor="q-presupuesto" className="field-label">Presupuesto por persona</label>
          <select id="q-presupuesto" className="field" {...register("presupuesto")}>
            <option value="">Selecciona una opción</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="q-comentarios" className="field-label">Comentarios</label>
          <textarea
            id="q-comentarios"
            rows={compact ? 3 : 4}
            className="field resize-y"
            placeholder="Cuéntanos qué tipo de viaje buscas, ocasión especial, preferencias de hotel…"
            {...register("comentarios")}
            {...aria("comentarios")}
          />
          <Err name="comentarios" />
        </div>

        {/* Campo trampa anti-spam (oculto para personas) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="q-empresa">Empresa</label>
          <input id="q-empresa" tabIndex={-1} autoComplete="off" {...register("empresa")} />
        </div>
        <input type="hidden" {...register("origen")} />

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 accent-brand" {...register("acepta_datos")} {...aria("acepta_datos")} />
            <span>
              Autorizo el tratamiento de mis datos personales para recibir la cotización, según la{" "}
              <Link href="/tratamiento-de-datos" className="font-semibold text-brand underline-offset-2 hover:underline" target="_blank">
                política de tratamiento de datos
              </Link>
              . *
            </span>
          </label>
          <Err name="acepta_datos" />
        </div>
      </div>

      {serverError && (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {serverError}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          Nunca te pediremos datos bancarios ni de tarjetas por este medio.
        </p>
        <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-3.5 text-base">
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Enviando…
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" /> Solicitar cotización
            </>
          )}
        </button>
      </div>
    </form>
  );
}
