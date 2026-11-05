"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Globe, MapPin, Search, Users, Wallet } from "lucide-react";
import { BUDGETS } from "@/lib/constants";

/**
 * Buscador principal. Envía los criterios al catálogo (/destinos), que filtra
 * y muestra los resultados en tarjetas. Fecha y viajeros se conservan para
 * prellenar el formulario de cotización.
 */
export default function TripSearch({ options = [] }) {
  const router = useRouter();
  const [form, setForm] = useState({ q: "", fecha: "", viajeros: "2", tipo: "", presupuesto: "" });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const today = new Date().toISOString().slice(0, 10);

  function onSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => v && params.set(k, v));
    router.push(`/destinos?${params.toString()}#resultados`);
  }

  const fieldWrap = "relative flex flex-col rounded-2xl px-4 py-2.5 transition hover:bg-brand-bg focus-within:bg-brand-bg";
  const labelCls = "flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand";
  const inputCls = "mt-0.5 w-full bg-transparent text-sm font-medium text-ink placeholder:text-gray-400 focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Buscar viajes"
      className="grid gap-1 rounded-[1.75rem] bg-white p-2 shadow-lift ring-1 ring-black/5 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_.8fr_1fr_1.1fr_auto] lg:items-center"
    >
      <div className={`${fieldWrap} sm:col-span-2 lg:col-span-1`}>
        <label htmlFor="ts-q" className={labelCls}>
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Destino
        </label>
        <input
          id="ts-q"
          list="ts-destinos"
          value={form.q}
          onChange={set("q")}
          placeholder="Ciudad, departamento o país"
          className={inputCls}
          autoComplete="off"
        />
        <datalist id="ts-destinos">
          {options.map((o) => (
            <option key={o.slug} value={o.nombre}>{o.tipo === "nacional" ? o.region : o.pais}</option>
          ))}
        </datalist>
      </div>

      <div className={fieldWrap}>
        <label htmlFor="ts-fecha" className={labelCls}>
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Fecha aproximada
        </label>
        <input id="ts-fecha" type="date" min={today} value={form.fecha} onChange={set("fecha")} className={inputCls} />
      </div>

      <div className={fieldWrap}>
        <label htmlFor="ts-viajeros" className={labelCls}>
          <Users className="h-3.5 w-3.5" aria-hidden="true" /> Viajeros
        </label>
        <select id="ts-viajeros" value={form.viajeros} onChange={set("viajeros")} className={inputCls}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? "persona" : "personas"}</option>
          ))}
          <option value="11">Más de 10 (grupo)</option>
        </select>
      </div>

      <div className={fieldWrap}>
        <label htmlFor="ts-tipo" className={labelCls}>
          <Globe className="h-3.5 w-3.5" aria-hidden="true" /> Tipo de viaje
        </label>
        <select id="ts-tipo" value={form.tipo} onChange={set("tipo")} className={inputCls}>
          <option value="">Nacional e internacional</option>
          <option value="nacional">Nacional</option>
          <option value="internacional">Internacional</option>
        </select>
      </div>

      <div className={fieldWrap}>
        <label htmlFor="ts-presupuesto" className={labelCls}>
          <Wallet className="h-3.5 w-3.5" aria-hidden="true" /> Presupuesto p/p
        </label>
        <select id="ts-presupuesto" value={form.presupuesto} onChange={set("presupuesto")} className={inputCls}>
          {BUDGETS.map((b) => (
            <option key={b.key} value={b.key}>{b.label}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary h-full min-h-[56px] rounded-2xl px-7 text-base sm:col-span-2 lg:col-span-1">
        <Search className="h-5 w-5" aria-hidden="true" />
        <span>Buscar viajes</span>
      </button>
    </form>
  );
}
