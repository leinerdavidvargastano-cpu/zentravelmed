"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, Compass } from "lucide-react";
import DestinationCard from "./DestinationCard";
import {
  NATIONAL_REGIONS,
  INTERNATIONAL_REGIONS,
  CONTINENTS,
  EXPERIENCES,
  DURATIONS,
  BUDGETS,
  SORTS,
  PAGE_SIZE,
} from "@/lib/constants";
import { normalize } from "@/lib/format";

const EMPTY = { q: "", tipo: "", region: "", continente: "", pais: "", experiencia: "", duracion: "", presupuesto: "", orden: "destacados" };
const FILTER_KEYS = Object.keys(EMPTY);

/**
 * Catálogo filtrable de destinos.
 * mode: "all" | "nacional" | "internacional" (fija el tipo en las páginas de Colombia / Mundo).
 * Los filtros se reflejan en la URL para poder compartir la búsqueda.
 */
export default function DestinationCatalog({ destinations, mode = "all", initial = {} }) {
  const [f, setF] = useState(() => ({ ...EMPTY, ...pick(initial), ...(mode !== "all" && { tipo: mode }) }));
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);

  // Datos de la búsqueda del Hero que se arrastran al formulario de cotización.
  const quoteQuery = useMemo(() => {
    const p = new URLSearchParams();
    if (initial.fecha) p.set("fecha", initial.fecha);
    if (initial.viajeros) p.set("adultos", initial.viajeros);
    if (initial.presupuesto) p.set("presupuesto", initial.presupuesto);
    return p.toString();
  }, [initial.fecha, initial.viajeros, initial.presupuesto]);

  const set = (key, value) => {
    setF((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "tipo") Object.assign(next, { region: "", continente: "", pais: "" });
      if (key === "continente") next.pais = "";
      return next;
    });
    setVisible(PAGE_SIZE);
  };

  // Sincronizar filtros con la URL (sin recargar la página).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    FILTER_KEYS.forEach((k) => {
      if (mode !== "all" && k === "tipo") return;
      if (f[k] && !(k === "orden" && f[k] === "destacados")) params.set(k, f[k]);
      else params.delete(k);
    });
    const qs = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [f, mode]);

  const tipo = f.tipo;
  const regions = tipo === "nacional" ? NATIONAL_REGIONS : tipo === "internacional" ? INTERNATIONAL_REGIONS : [];
  const countries = useMemo(
    () =>
      [...new Set(destinations.filter((d) => d.tipo === "internacional" && (!f.continente || d.continente === f.continente)).map((d) => d.pais))].sort(
        (a, b) => a.localeCompare(b, "es")
      ),
    [destinations, f.continente]
  );

  const results = useMemo(() => {
    const q = normalize(f.q);
    const dur = DURATIONS.find((x) => x.key === f.duracion);
    const bud = BUDGETS.find((x) => x.key === f.presupuesto);

    const list = destinations.filter((d) => {
      if (tipo && d.tipo !== tipo) return false;
      if (f.region && d.region !== f.region) return false;
      if (f.continente && d.continente !== f.continente) return false;
      if (f.pais && d.pais !== f.pais) return false;
      if (f.experiencia && !d.categoria?.includes(f.experiencia)) return false;
      if (dur?.min && !d.duraciones?.some((n) => n >= dur.min && n <= dur.max)) return false;
      // Presupuesto: se excluyen solo los destinos cuyo precio publicado supera el rango.
      // Los destinos sin precio publicado se mantienen ("Precio según cotización").
      if (bud?.max && d.precio_desde && d.precio_desde > bud.max) return false;
      if (q) {
        const hay = normalize([d.nombre, d.pais, d.region, d.ubicacion, ...(d.lugares || [])].join(" "));
        if (!q.split(/\s+/).every((word) => hay.includes(word))) return false;
      }
      return true;
    });

    const sorters = {
      destacados: (a, b) => Number(b.destacado) - Number(a.destacado) || a.id - b.id,
      az: (a, b) => a.nombre.localeCompare(b.nombre, "es"),
      za: (a, b) => b.nombre.localeCompare(a.nombre, "es"),
      precio: (a, b) => (a.precio_desde ?? Infinity) - (b.precio_desde ?? Infinity) || a.nombre.localeCompare(b.nombre, "es"),
    };
    const sorter = sorters[f.orden] || sorters.destacados;
    if (!q) return list.sort(sorter);

    // Con búsqueda: primero coincidencias en el nombre, luego país/región, luego lugares.
    const score = (d) => {
      if (normalize(d.nombre).includes(q)) return 3;
      if (normalize(`${d.pais} ${d.region} ${d.ubicacion}`).includes(q)) return 2;
      return 1;
    };
    return list.sort((a, b) => score(b) - score(a) || sorter(a, b));
  }, [destinations, f, tipo]);

  const activeCount = ["region", "continente", "pais", "experiencia", "duracion", "presupuesto"].filter((k) => f[k]).length + (mode === "all" && f.tipo ? 1 : 0);
  const reset = () => {
    setF({ ...EMPTY, ...(mode !== "all" && { tipo: mode }) });
    setVisible(PAGE_SIZE);
  };

  const selectCls = "field py-2.5";

  return (
    <div id="resultados" className="scroll-mt-28">
      {/* Barra de búsqueda y controles */}
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Buscar destino por nombre</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand" aria-hidden="true" />
            <input
              type="search"
              value={f.q}
              onChange={(e) => set("q", e.target.value)}
              placeholder={mode === "internacional" ? "Buscar país o ciudad…" : "Buscar destino, región o lugar…"}
              className="field pl-12"
            />
          </label>
          <div className="flex gap-3">
            <label className="flex-1 md:w-52 md:flex-none">
              <span className="sr-only">Ordenar por</span>
              <select value={f.orden} onChange={(e) => set("orden", e.target.value)} className={selectCls}>
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="btn-outline shrink-0 lg:hidden"
              aria-expanded={showFilters}
              aria-controls="filtros"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Filtros
              {activeCount > 0 && <span className="rounded-full bg-brand px-1.5 text-xs text-white">{activeCount}</span>}
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div id="filtros" className={`${showFilters ? "grid" : "hidden"} mt-4 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-2 lg:grid lg:grid-cols-4`}>
          {mode === "all" && (
            <label>
              <span className="field-label">Tipo de destino</span>
              <select value={f.tipo} onChange={(e) => set("tipo", e.target.value)} className={selectCls}>
                <option value="">Nacionales e internacionales</option>
                <option value="nacional">Nacionales (Colombia)</option>
                <option value="internacional">Internacionales</option>
              </select>
            </label>
          )}
          {tipo === "internacional" && (
            <>
              <label>
                <span className="field-label">Continente</span>
                <select value={f.continente} onChange={(e) => set("continente", e.target.value)} className={selectCls}>
                  <option value="">Todos</option>
                  {CONTINENTS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="field-label">País</span>
                <select value={f.pais} onChange={(e) => set("pais", e.target.value)} className={selectCls}>
                  <option value="">Todos</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
            </>
          )}
          {tipo === "nacional" && mode === "all" && (
            <label>
              <span className="field-label">Región</span>
              <select value={f.region} onChange={(e) => set("region", e.target.value)} className={selectCls}>
                <option value="">Todas</option>
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </label>
          )}
          <label>
            <span className="field-label">Tipo de experiencia</span>
            <select value={f.experiencia} onChange={(e) => set("experiencia", e.target.value)} className={selectCls}>
              <option value="">Todas</option>
              {Object.entries(EXPERIENCES).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="field-label">Duración del plan</span>
            <select value={f.duracion} onChange={(e) => set("duracion", e.target.value)} className={selectCls}>
              {DURATIONS.map((d) => (
                <option key={d.key} value={d.key}>{d.label}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="field-label">Precio por persona</span>
            <select value={f.presupuesto} onChange={(e) => set("presupuesto", e.target.value)} className={selectCls}>
              {BUDGETS.map((b) => (
                <option key={b.key} value={b.key}>{b.key ? b.label : "Cualquier precio"}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Chips de región (catálogos de Colombia y Mundo) */}
        {mode !== "all" && (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por región">
            <button type="button" onClick={() => set("region", "")} className={`chip ${!f.region ? "chip-active" : ""}`} aria-pressed={!f.region}>
              Todas
            </button>
            {regions.map((r) => (
              <button key={r} type="button" onClick={() => set("region", r)} className={`chip ${f.region === r ? "chip-active" : ""}`} aria-pressed={f.region === r}>
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Resumen de resultados */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-600" aria-live="polite">
          <strong className="text-brand-dark">{results.length}</strong> {results.length === 1 ? "destino encontrado" : "destinos encontrados"}
        </p>
        {(activeCount > 0 || f.q) && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            <X className="h-4 w-4" aria-hidden="true" /> Limpiar filtros
          </button>
        )}
      </div>
      {f.presupuesto && (
        <p className="mt-2 text-xs text-gray-500">
          Los destinos sin precio publicado se muestran como “Precio según cotización”: un asesor te dará el valor exacto.
        </p>
      )}

      {results.length > 0 ? (
        <>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.slice(0, visible).map((d, i) => (
              <li key={d.slug} className="animate-fade-up" style={{ animationDelay: `${(i % PAGE_SIZE) * 40}ms` }}>
                <DestinationCard destination={d} quoteQuery={quoteQuery} priority={i < 3} />
              </li>
            ))}
          </ul>
          {visible < results.length && (
            <div className="mt-10 text-center">
              <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline px-8">
                Cargar más destinos ({results.length - visible} restantes)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-3xl border-2 border-dashed border-brand/20 bg-brand-bg px-6 py-14 text-center">
          <Compass className="mx-auto h-10 w-10 text-brand" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-bold">No encontramos destinos con esos criterios</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
            Prueba con otros filtros o cuéntanos qué viaje sueñas: nuestros asesores diseñan planes a la medida.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="btn-outline">Ver todos los destinos</button>
            <Link href={`/cotizar?${new URLSearchParams({ ...(f.q && { destino: f.q }) }).toString()}${quoteQuery ? `&${quoteQuery}` : ""}`} className="btn-primary">
              Solicitar cotización
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function pick(obj) {
  const out = {};
  FILTER_KEYS.forEach((k) => {
    if (typeof obj[k] === "string" && obj[k]) out[k] = obj[k].slice(0, 80);
  });
  return out;
}
