// Página /mapa: todos los destinos en un mapa interactivo.

import MapaCargador from "@/components/mapa/MapaCargador";

export const metadata = {
  title: "Mapa de destinos",
  description: "Explora en el mapa los destinos de Colombia y el mundo que te ofrecemos.",
};

export default function MapaPage() {
  return (
    <main className="flex-1">
      <section className="fondo-viaje w-full px-4 py-14 md:px-10">
        <h1 className="text-5xl font-bold text-rosa md:text-6xl">Mapa de destinos</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/80">
          Descubre dónde queda cada lugar. Toca un punto para ver el destino y cotizar tu viaje.
        </p>
      </section>

      <section className="w-full bg-gray-50 px-4 py-10 md:px-10">
        <MapaCargador />
      </section>
    </main>
  );
}
