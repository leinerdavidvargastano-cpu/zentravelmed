"use client";
// Lista desplegable de destinos con buscador, con el diseño de la página.
// Es "controlado": recibe el valor (value) y avisa los cambios (onChange),
// así React Hook Form puede manejarlo con <Controller>.
// Las opciones están agrupadas: Colombia, Internacionales y "Otro".

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { destinos } from "@/data/destinos";
import { normalizar } from "@/lib/destinos";

export const OTRO = "otro";

const grupos = [
  { titulo: "Colombia", lista: destinos.filter((d) => d.region === "colombia") },
  { titulo: "Internacionales", lista: destinos.filter((d) => d.region === "internacional") },
];

export function nombreDestino(slug) {
  if (slug === OTRO) return "Otro / aún no lo sé";
  return destinos.find((d) => d.slug === slug)?.nombre ?? "";
}

export default function SelectorDestino({ id, value, onChange, onBlur, error }) {
  const [abierto, setAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const cajaRef = useRef(null);

  // Cerrar al hacer clic afuera o con Escape
  useEffect(() => {
    if (!abierto) return;
    const afuera = (e) => !cajaRef.current?.contains(e.target) && cerrar();
    const tecla = (e) => e.key === "Escape" && cerrar();
    document.addEventListener("mousedown", afuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", afuera);
      document.removeEventListener("keydown", tecla);
    };
  });

  function cerrar() {
    setAbierto(false);
    setBusqueda("");
    onBlur?.(); // le avisa a React Hook Form que el campo se "tocó"
  }

  function elegir(slug) {
    onChange(slug);
    cerrar();
  }

  // Filtra las opciones con lo que se escribe en el buscador
  const filtrados = useMemo(() => {
    const b = normalizar(busqueda);
    return grupos.map((g) => ({
      ...g,
      lista: b ? g.lista.filter((d) => normalizar(d.nombre).includes(b)) : g.lista,
    }));
  }, [busqueda]);

  const opcion = (slug, texto) => {
    const activa = value === slug;
    return (
      <li key={slug}>
        <button
          type="button"
          onClick={() => elegir(slug)}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${
            activa ? "bg-verde font-semibold text-rosa" : "text-negro hover:bg-rosa/40"
          }`}
        >
          {texto}
          {activa && <Check size={16} />}
        </button>
      </li>
    );
  };

  return (
    <div ref={cajaRef} className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-invalid={!!error}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left outline-none transition focus:ring-4 ${
          error ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:border-verde focus:ring-verde/15"
        }`}
      >
        <span className={value ? "text-negro" : "text-gray-400"}>
          {value ? nombreDestino(value) : "Elige a dónde quieres ir"}
        </span>
        <ChevronDown size={18} className={`text-verde transition ${abierto ? "rotate-180" : ""}`} />
      </button>

      {abierto && (
        <div className="absolute left-0 top-full z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-2xl">
          {/* Buscador dentro de la lista */}
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              autoFocus
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar destino…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <ul role="listbox" className="mt-2 max-h-64 overflow-y-auto">
            {filtrados.map(
              (g) =>
                g.lista.length > 0 && (
                  <li key={g.titulo}>
                    <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      {g.titulo}
                    </p>
                    <ul>{g.lista.map((d) => opcion(d.slug, d.nombre))}</ul>
                  </li>
                )
            )}
            <li className="mt-1 border-t border-gray-100 pt-1">
              <ul>{opcion(OTRO, "Otro / aún no lo sé")}</ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
