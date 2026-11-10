// Página de inicio. Cada sección es un componente aparte
// dentro de components/home/. Las iremos agregando una por una.

import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
    </main>
  );
}
