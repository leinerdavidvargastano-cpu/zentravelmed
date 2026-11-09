// Página de prueba de la Fase 2: solo muestra que los colores funcionan.
// En la Fase 4 la reemplazamos por la página de inicio real.

const colores = [
  { nombre: "Verde bosque", clase: "bg-verde text-rosa", codigo: "#0A4834" },
  { nombre: "Rosa empolvado", clase: "bg-rosa text-verde", codigo: "#EBCAD0" },
  { nombre: "Amarillo pera", clase: "bg-amarillo text-negro", codigo: "#D3C511" },
  { nombre: "Negro texto", clase: "bg-negro text-white", codigo: "#111418" },
];

export default function Home() {
  return (
    <main className="flex-1 bg-verde p-10">
      <h1 className="text-5xl font-bold text-rosa">Zen Travel Medellín</h1>
      <p className="mt-2 text-white/80">Prueba de colores · Fase 2</p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {colores.map((color) => (
          <div key={color.codigo} className={`rounded-xl p-6 ${color.clase}`}>
            <p className="font-semibold">{color.nombre}</p>
            <p className="text-sm">{color.codigo}</p>
          </div>
        ))}
      </div>

      <button className="mt-10 rounded-lg bg-amarillo px-6 py-3 font-semibold text-negro">
        Buscar →
      </button>
    </main>
  );
}
