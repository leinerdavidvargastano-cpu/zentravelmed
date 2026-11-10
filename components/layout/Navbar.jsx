"use client";
// "use client" porque el menú usa estado (abrir/cerrar en celular)
// y necesita saber en qué página estamos.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { enlaces } from "@/config/site"; // lista de páginas

export default function Navbar() {
  const [abierto, setAbierto] = useState(false); // menú del celular
  const rutaActual = usePathname(); // ej: "/destinos"

  return (
    <header className="sticky top-0 z-50 bg-verde">
      <nav className="flex w-full items-center justify-between px-4 py-3 md:px-10">
        {/* Logo + nombre */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setAbierto(false)}>
          <Image
            src="/logo.webp"
            alt="Logo Zen Travel Medellín"
            width={48}
            height={48}
            className="rounded-full bg-white"
            priority
          />
          <span className="text-lg font-bold text-rosa">Zen Travel Medellín</span>
        </Link>

        {/* Enlaces en computador (se ocultan en pantallas pequeñas) */}
        <ul className="hidden items-center gap-6 lg:flex">
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <Link
                href={enlace.ruta}
                className={
                  rutaActual === enlace.ruta
                    ? "font-semibold text-rosa"
                    : "text-white/80 hover:text-rosa"
                }
              >
                {enlace.nombre}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón Cotizar en computador */}
        <Link
          href="/cotizar"
          className="hidden rounded-lg bg-amarillo px-5 py-2 font-semibold text-negro hover:brightness-110 lg:block"
        >
          Cotizar
        </Link>

        {/* Botón ☰ en celular */}
        <button
          onClick={() => setAbierto(!abierto)}
          className="text-rosa lg:hidden"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        >
          {abierto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menú desplegable del celular: solo se muestra si "abierto" es true */}
      {abierto && (
        <ul className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 lg:hidden">
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <Link
                href={enlace.ruta}
                onClick={() => setAbierto(false)}
                className={`block rounded-lg px-3 py-2 ${
                  rutaActual === enlace.ruta ? "bg-white/10 text-rosa" : "text-white/80"
                }`}
              >
                {enlace.nombre}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              href="/cotizar"
              onClick={() => setAbierto(false)}
              className="block rounded-lg bg-amarillo px-3 py-2 text-center font-semibold text-negro"
            >
              Cotizar
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
