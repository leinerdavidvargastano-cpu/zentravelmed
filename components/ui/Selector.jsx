"use client";
// Lista desplegable con el diseño de la página.
// El <select> normal del navegador no deja cambiar el diseño de sus opciones,
// por eso hacemos uno propio: un botón que abre una lista.
// El valor elegido se guarda en un <input type="hidden"> para que
// el formulario lo envíe igual que un <select>.

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function Selector({ name, opciones, textoVacio = "Todas" }) {
  const [abierto, setAbierto] = useState(false);
  const [valor, setValor] = useState(""); // "" = ninguna opción elegida
  const cajaRef = useRef(null);

  // Cerrar la lista al hacer clic afuera o al presionar Escape
  useEffect(() => {
    if (!abierto) return;
    function clicAfuera(e) {
      if (cajaRef.current && !cajaRef.current.contains(e.target)) setAbierto(false);
    }
    function tecla(e) {
      if (e.key === "Escape") setAbierto(false);
    }
    document.addEventListener("mousedown", clicAfuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", clicAfuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  // Agregamos la opción "Todas" al inicio de la lista
  const lista = [{ valor: "", texto: textoVacio }, ...opciones];
  const elegida = lista.find((op) => op.valor === valor);

  function elegir(nuevoValor) {
    setValor(nuevoValor);
    setAbierto(false);
  }

  return (
    <div ref={cajaRef} className="relative">
      <input type="hidden" name={name} value={valor} />

      {/* Botón que muestra la opción elegida */}
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        className="mt-1 flex w-full items-center justify-between gap-2 font-semibold text-white"
        aria-haspopup="listbox"
        aria-expanded={abierto}
      >
        <span>{elegida.texto}</span>
        <ChevronDown
          size={18}
          className={`text-rosa transition-transform ${abierto ? "rotate-180" : ""}`}
        />
      </button>

      {/* Lista de opciones */}
      {abierto && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-30 mt-3 w-full min-w-56 overflow-hidden rounded-xl border border-rosa/40 bg-verde p-1 shadow-2xl shadow-black/40"
        >
          {lista.map((op) => {
            const activa = op.valor === valor;
            return (
              <li key={op.valor} role="option" aria-selected={activa}>
                <button
                  type="button"
                  onClick={() => elegir(op.valor)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${
                    activa
                      ? "bg-rosa font-semibold text-verde"
                      : "text-white/90 hover:bg-white/10 hover:text-rosa"
                  }`}
                >
                  {op.texto}
                  {activa && <Check size={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
