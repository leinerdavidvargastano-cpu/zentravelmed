// Página /destinos.
// El catálogo lee la URL en el navegador (useSearchParams). Next.js pide
// envolverlo en <Suspense>: mientras el navegador lee la URL se muestra el
// esqueleto con brillo (el mismo de loading.js).

import { Suspense } from "react";
import CatalogoDestinos from "@/components/destinos/CatalogoDestinos";
import CargandoDestinos from "@/app/destinos/loading";

export const metadata = {
  title: "Destinos",
  description: "Destinos en Colombia y el mundo: playas, cultura, aventura y cruceros.",
};

export default function DestinosPage() {
  return (
    <Suspense fallback={<CargandoDestinos />}>
      <CatalogoDestinos />
    </Suspense>
  );
}
