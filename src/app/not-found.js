import Link from "next/link";
import { Compass } from "lucide-react";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-brand-bg pt-24">
      <div className="container max-w-xl text-center">
        <Compass className="mx-auto h-16 w-16 text-brand" aria-hidden="true" />
        <p className="mt-6 font-display text-6xl font-extrabold text-brand-dark">404</p>
        <h1 className="mt-2 text-2xl font-bold">Parece que este camino no lleva a ningún destino</h1>
        <p className="mt-3 text-gray-600">La página que buscas no existe o fue movida. Te ayudamos a encontrar tu próximo viaje.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Volver al inicio</Link>
          <Link href="/destinos" className="btn-outline">Ver destinos</Link>
        </div>
      </div>
    </section>
  );
}
