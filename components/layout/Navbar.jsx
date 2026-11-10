"use client";
// "use client" porque el menú usa estado (abrir/cerrar en celular)
// y necesita saber en qué página estamos.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Mail, Map as MapIcon, MapPinned, Menu, Package, Plane, Users, X } from "lucide-react";
import { empresa, enlaces } from "@/config/site";

// Ícono de cada página (se ven en el menú del celular)
const iconos = {
  "/": Home,
  "/destinos": MapPinned,
  "/paquetes": Package,
  "/mapa": MapIcon,
  "/nosotros": Users,
  "/contacto": Mail,
};

export default function Navbar() {
  const [abierto, setAbierto] = useState(false); // menú del celular
  const rutaActual = usePathname(); // ej: "/destinos"

  // Una página está activa si es la actual o una subpágina
  // (ej: /destinos/cartagena también marca "Destinos")
  function esActiva(ruta) {
    return ruta === "/" ? rutaActual === "/" : rutaActual.startsWith(ruta);
  }

  return (
    <header className="sticky top-0 z-50 bg-verde shadow-lg shadow-black/20">
      <nav className="flex w-full items-center justify-between gap-4 px-4 py-4 md:px-10">
        {/* Logo + nombre. El logo gira un poco al pasar el mouse */}
        <Link href="/" className="group flex items-center gap-3" onClick={() => setAbierto(false)}>
          <Image
            src="/logo.webp"
            alt="Logo Zen Travel Medellín"
            width={60}
            height={60}
            className="rounded-full bg-white ring-2 ring-rosa/60 transition duration-300 group-hover:rotate-12 group-hover:ring-amarillo"
            priority
          />
          {/* En pantallas medianas (lg) se oculta el nombre para que quepan los botones */}
          <span className="leading-tight lg:hidden xl:block">
            <span className="block text-xl font-bold text-rosa">{empresa.nombre}</span>
            <span className="block text-xs text-white/60">{empresa.lema}</span>
          </span>
        </Link>

        {/* Botones del menú en computador */}
        <ul className="hidden items-center gap-1 lg:flex">
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <Link
                href={enlace.ruta}
                className={`block rounded-full px-4 py-2 text-[15px] font-medium transition duration-200 xl:text-base ${
                  esActiva(enlace.ruta)
                    ? "bg-rosa text-verde shadow-md"
                    : "text-white/85 hover:-translate-y-0.5 hover:bg-white/10 hover:text-rosa"
                }`}
              >
                {enlace.nombre}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón Cotizar en computador */}
        <Link
          href="/cotizar"
          className="hidden items-center gap-2 rounded-full bg-amarillo px-6 py-3 font-bold text-negro shadow-lg transition duration-200 hover:scale-105 hover:shadow-amarillo/40 lg:flex"
        >
          <Plane size={18} />
          Cotizar
        </Link>

        {/* Botón ☰ en celular */}
        <button
          onClick={() => setAbierto(!abierto)}
          className="flex h-12 w-12 items-center justify-center rounded-full text-rosa transition hover:bg-white/10 lg:hidden"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
        >
          {abierto ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Menú del celular: se despliega con animación.
          El truco grid-rows-[0fr] → [1fr] anima la altura de 0 a su tamaño real. */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${
          abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 border-t border-white/10 px-4 pb-5 pt-3">
            {enlaces.map((enlace) => {
              const Icono = iconos[enlace.ruta];
              return (
                <li key={enlace.ruta}>
                  <Link
                    href={enlace.ruta}
                    onClick={() => setAbierto(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-lg transition ${
                      esActiva(enlace.ruta)
                        ? "bg-rosa font-semibold text-verde"
                        : "text-white/85 hover:bg-white/10 hover:text-rosa"
                    }`}
                  >
                    {Icono && <Icono size={22} />}
                    {enlace.nombre}
                  </Link>
                </li>
              );
            })}
            <li className="mt-3">
              <Link
                href="/cotizar"
                onClick={() => setAbierto(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-amarillo px-4 py-3 text-lg font-bold text-negro"
              >
                <Plane size={20} />
                Cotizar viaje
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
