// Pie de página. No necesita "use client" porque no tiene estado:
// solo muestra información.

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { empresa, enlaces } from "@/config/site";

export default function Footer() {
  // Solo las redes que tengan enlace (las vacías se filtran)
  const redes = Object.entries(empresa.redes).filter(([, url]) => url);
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-negro text-white/70">
      <div className="grid w-full gap-10 px-4 py-12 md:grid-cols-3 md:px-10">
        {/* Columna 1: logo y lema */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.webp"
              alt="Logo Zen Travel Medellín"
              width={56}
              height={56}
              className="rounded-full bg-white"
            />
            <span className="text-lg font-bold text-rosa">{empresa.nombre}</span>
          </div>
          <p className="mt-4">{empresa.lema}.</p>
          <p className="text-sm">Agencia de viajes en {empresa.ciudad}.</p>
        </div>

        {/* Columna 2: páginas */}
        <div>
          <h2 className="font-semibold text-rosa">Páginas</h2>
          <ul className="mt-4 space-y-2">
            {enlaces.map((enlace) => (
              <li key={enlace.ruta}>
                <Link href={enlace.ruta} className="hover:text-amarillo">
                  {enlace.nombre}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cotizar" className="hover:text-amarillo">
                Cotizar viaje
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: contacto */}
        <div>
          <h2 className="font-semibold text-rosa">Contacto</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-amarillo" />
              <a href={`mailto:${empresa.correo}`} className="hover:text-amarillo">
                {empresa.correo}
              </a>
            </li>
            {/* El teléfono solo aparece cuando se llene en config/site.js */}
            {empresa.telefono && (
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-amarillo" />
                <a href={`tel:${empresa.telefono.replaceAll(" ", "")}`} className="hover:text-amarillo">
                  {empresa.telefono}
                </a>
              </li>
            )}
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-amarillo" />
              <span>{empresa.ciudad}</span>
            </li>
          </ul>

          {/* Redes: solo aparecen las que tengan enlace */}
          {redes.length > 0 && (
            <ul className="mt-4 flex gap-4">
              {redes.map(([nombre, url]) => (
                <li key={nombre}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-amarillo">
                    {nombre}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Franja final */}
      <div className="border-t border-white/10 py-4 text-center text-sm">
        © {anio} {empresa.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
