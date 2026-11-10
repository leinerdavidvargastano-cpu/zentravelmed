// "Esqueleto" de una tarjeta de destino: la misma forma que DestinoCard,
// pero con cajas grises que brillan en vez de foto y texto.
// Se muestra mientras cargan los destinos.

export default function DestinoCardEsqueleto() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-md" aria-hidden="true">
      <div className="esqueleto h-52" />
      <div className="flex flex-col gap-3 p-5">
        <div className="esqueleto h-3 w-20 rounded-full" />
        <div className="esqueleto h-6 w-3/4 rounded-lg" />
        <div className="esqueleto h-3 w-full rounded-full" />
        <div className="esqueleto h-3 w-2/3 rounded-full" />
        <div className="mt-1 flex gap-2">
          <div className="esqueleto h-6 w-24 rounded-full" />
          <div className="esqueleto h-6 w-20 rounded-full" />
        </div>
        <div className="esqueleto mt-2 h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
