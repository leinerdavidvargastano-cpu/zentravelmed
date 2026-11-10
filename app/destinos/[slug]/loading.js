// Pantalla de carga del detalle de un destino: el esqueleto de la página
// (foto grande, título, textos y la tarjeta de cotizar) con brillo.

export default function CargandoDestino() {
  return (
    <main className="flex-1" role="status" aria-label="Cargando destino">
      {/* Foto grande */}
      <section className="esqueleto flex h-[60vh] min-h-96 items-end px-4 pb-10 md:px-10">
        <div className="w-full">
          <div className="h-4 w-48 rounded-full bg-white/60" />
          <div className="mt-4 h-14 w-72 rounded-xl bg-white/60" />
          <div className="mt-4 h-7 w-40 rounded-full bg-white/60" />
        </div>
      </section>

      {/* Contenido */}
      <section className="grid w-full gap-10 px-4 py-14 md:px-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <div className="esqueleto h-8 w-64 rounded-lg" />
          <div className="esqueleto h-5 w-full max-w-2xl rounded-full" />
          <div className="esqueleto h-5 w-2/3 max-w-xl rounded-full" />
          <div className="flex gap-3 pt-6">
            <div className="esqueleto h-10 w-40 rounded-full" />
            <div className="esqueleto h-10 w-36 rounded-full" />
          </div>
        </div>
        <div className="esqueleto h-72 rounded-3xl" />
      </section>
    </main>
  );
}
