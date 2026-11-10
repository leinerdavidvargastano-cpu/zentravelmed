// Página de inicio. Cada sección es un componente aparte
// dentro de components/home/. Las iremos agregando una por una.

import Hero from "@/components/home/Hero";
import Experiencias from "@/components/home/Experiencias";
import Cruceros from "@/components/home/Cruceros";
import Hablamos from "@/components/home/Hablamos";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Experiencias />
      <Cruceros />
      <Hablamos />
    </main>
  );
}
