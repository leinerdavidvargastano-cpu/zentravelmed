"use client";
// Catálogo de destinos: buscador, tarjetas y "Cargar más".
// Lee de la URL los filtros (?q=...&tipo=...&region=...) y cuántas tarjetas
// mostrar en cada grupo (?colombia=24&internacional=12).
// Como la página es estática, la URL se lee EN EL NAVEGADOR con
// useSearchParams() y el filtrado también se hace aquí.

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchX, X } from "lucide-react";
import Buscador from "@/components/ui/Buscador";
import DestinoCard from "@/components/destinos/DestinoCard";
import BotonCargarMas from "@/components/destinos/BotonCargarMas";
import { filtrarDestinos } from "@/lib/destinos";
import NoEncuentras from "@/components/ui/NoEncuentras";

// Cuántas tarjetas se muestran al inicio y cuántas más con cada "Cargar más"
const POR_PAGINA = 12;

// Convierte el número de la URL en un número válido (12, 24, 36...).
// Si viene vacío o algo raro (ej: "abc" o "-5"), usa 12.
function leerCantidad(valor) {
  const n = Number.parseInt(valor, 10);
  return Number.isFinite(n) && n > 0 ? n : POR_PAGINA;
}

// Un grupo de tarjetas con su título y su botón "Cargar más"
function Grupo({ titulo, lista, mostrar, enlaceMas }) {
  if (lista.length === 0) return null;
  const visibles = lista.slice(0, mostrar); // solo las primeras "mostrar"
  const restantes = lista.length - visibles.length;

  return (
    <div className="mt-12 first:mt-0">
      <h2 className="text-3xl font-bold text-verde">
        {titulo} <span className="text-lg font-medium text-gray-500">· {lista.length} destinos</span>
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {visibles.map((destino) => (
          <DestinoCard key={destino.slug} destino={destino} />
        ))}
      </div>

      {/* Contador y botón (el botón solo aparece si quedan destinos por ver) */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-sm text-gray-500">
          Mostrando {visibles.length} de {lista.length}
        </p>
        {restantes > 0 && (
          <BotonCargarMas href={enlaceMas} restantes={restantes} />
        )}
      </div>
    </div>
  );
}

export default function CatalogoDestinos() {
  const params = useSearchParams(); // ej: ?tipo=playa&colombia=24
  const q = params.get("q") ?? "";
  const tipo = params.get("tipo") ?? "";
  const region = params.get("region") ?? "";
  const verColombia = leerCantidad(params.get("colombia"));
  const verInternacional = leerCantidad(params.get("internacional"));

  const resultado = filtrarDestinos({ q, tipo, region });
  const colombia = resultado.filter((d) => d.region === "colombia");
  const internacionales = resultado.filter((d) => d.region === "internacional");
  const hayFiltros = q || tipo || region;

  // Arma el enlace de "Cargar más": mantiene los filtros y aumenta un grupo en 12
  function enlaceMas(grupo) {
    const url = new URLSearchParams();
    if (q) url.set("q", q);
    if (tipo) url.set("tipo", tipo);
    if (region) url.set("region", region);
    url.set("colombia", grupo === "colombia" ? verColombia + POR_PAGINA : verColombia);
    url.set(
      "internacional",
      grupo === "internacional" ? verInternacional + POR_PAGINA : verInternacional
    );
    return `/destinos?${url}`;
  }

  return (
    <main className="flex-1">
      {/* Encabezado verde con el buscador */}
      <section className="fondo-viaje w-full px-4 py-14 md:px-10">
        <h1 className="text-5xl font-bold text-rosa md:text-6xl">Destinos</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/80">
          Explora Colombia y el mundo. Filtra por experiencia o región y cotiza tu viaje.
        </p>
        <div className="mt-8">
          {/* "key" hace que el buscador se reinicie con cada nueva búsqueda */}
          <Buscador key={`${q}|${tipo}|${region}`} q={q} tipo={tipo} region={region} />
        </div>
      </section>

      {/* Resultados */}
      <section className="w-full bg-gray-50 px-4 py-14 md:px-10">
        {hayFiltros && (
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <p className="text-negro/70">
              {resultado.length === 1
                ? "1 destino encontrado"
                : `${resultado.length} destinos encontrados`}
            </p>
            <Link
              href="/destinos"
              className="inline-flex items-center gap-1 rounded-full border border-verde px-4 py-1.5 text-sm font-semibold text-verde transition hover:bg-verde hover:text-rosa"
            >
              <X size={14} />
              Quitar filtros
            </Link>
          </div>
        )}

        {resultado.length > 0 ? (
          <>
            <Grupo
              titulo="Colombia"
              lista={colombia}
              mostrar={verColombia}
              enlaceMas={enlaceMas("colombia")}
            />
            <Grupo
              titulo="Internacionales"
              lista={internacionales}
              mostrar={verInternacional}
              enlaceMas={enlaceMas("internacional")}
            />
          </>
        ) : (
          // Cuando no hay resultados
          <div className="mx-auto max-w-md py-10 text-center">
            <SearchX size={48} className="mx-auto text-verde/50" />
            <h2 className="mt-4 text-2xl font-bold text-verde">No encontramos ese destino</h2>
            <p className="mt-2 text-negro/70">
              Prueba con otra búsqueda o escríbenos: también armamos viajes a lugares que no
              están en la lista.
            </p>
          </div>
        )}

        {/* "¿No encuentras lo que deseas?" (como en la página anterior de la agencia) */}
        <NoEncuentras />
      </section>
    </main>
  );
}
