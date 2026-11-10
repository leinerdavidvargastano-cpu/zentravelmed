"use client";
// Cargador en espiral: 3 anillos que giran a distinta velocidad y en
// distinta dirección, con un avión que da vueltas por fuera.
// Debajo, mensajes que cambian cada 2 segundos para que la espera
// no se sienta larga ("Algo increíble se aproxima...").

import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

const mensajes = [
  "Algo increíble se aproxima…",
  "Preparando tu próxima aventura…",
  "Empacando las maletas…",
  "Buscando los mejores destinos…",
  "Ya casi despegamos…",
];

export default function CargadorEspiral() {
  const [indice, setIndice] = useState(0);

  // Cambia de mensaje cada 2 segundos (y vuelve al primero al terminar)
  useEffect(() => {
    const reloj = setInterval(() => setIndice((i) => (i + 1) % mensajes.length), 2000);
    return () => clearInterval(reloj); // se detiene cuando el cargador desaparece
  }, []);

  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-8">
      <div className="relative h-36 w-36">
        {/* Anillo exterior rosa */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-rosa border-l-transparent border-t-transparent [animation-duration:1.4s]" />
        {/* Anillo del medio amarillo, gira al revés */}
        <div className="absolute inset-5 animate-girar-reversa rounded-full border-4 border-amarillo border-b-transparent border-r-transparent" />
        {/* Anillo interior blanco, el más rápido */}
        <div className="absolute inset-10 animate-spin rounded-full border-4 border-white/70 border-t-transparent [animation-duration:0.8s]" />

        {/* Avión dando vueltas alrededor */}
        <div className="absolute -inset-4 animate-spin [animation-duration:3s]">
          <Plane
            size={22}
            className="absolute left-1/2 top-0 -translate-x-1/2 rotate-45 fill-amarillo text-amarillo"
          />
        </div>
      </div>

      {/* "key" hace que el mensaje se vuelva a animar cada vez que cambia */}
      <p key={indice} className="animate-aparecer text-center text-xl font-semibold text-rosa">
        {mensajes[indice]}
      </p>
    </div>
  );
}
