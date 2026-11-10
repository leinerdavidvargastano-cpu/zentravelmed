// Pantalla de carga de /destinos.
// En vez del cargador en espiral, aquí se muestra el "esqueleto" de la página:
// el encabezado, el buscador y las tarjetas como cajas que brillan.
// Así la persona ya ve la forma de lo que viene.

import DestinoCardEsqueleto from "@/components/destinos/DestinoCardEsqueleto";

export default function CargandoDestinos() {
  return (
    <main className="flex-1" role="status" aria-label="Cargando destinos">
      {/* Encabezado verde */}
      <section className="fondo-viaje w-full px-4 py-14 md:px-10">
        <div className="esqueleto-oscuro h-14 w-64 rounded-xl" />
        <div className="esqueleto-oscuro mt-4 h-5 w-full max-w-xl rounded-full" />
        <div className="esqueleto-oscuro mt-8 h-20 w-full rounded-2xl" />
      </section>

      {/* Tarjetas */}
      <section className="w-full bg-gray-50 px-4 py-14 md:px-10">
        <div className="esqueleto h-8 w-56 rounded-lg" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <DestinoCardEsqueleto key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
