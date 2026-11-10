// Pantalla de carga general.
// Next.js la muestra AUTOMÁTICAMENTE mientras una página se está preparando
// (por ejemplo al hacer clic en un enlace del menú). El menú y el pie
// siguen visibles; solo el contenido se reemplaza por el cargador.

import CargadorEspiral from "@/components/ui/CargadorEspiral";

export default function Cargando() {
  return (
    <main className="fondo-viaje flex min-h-[70vh] flex-1 items-center justify-center px-4 py-20">
      <CargadorEspiral />
    </main>
  );
}
