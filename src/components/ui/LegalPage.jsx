import { Info } from "lucide-react";
import PageHeader from "./PageHeader";

/** Plantilla para textos legales. */
export default function LegalPage({ title, description, crumb, updated, children }) {
  return (
    <>
      <PageHeader crumbs={[{ label: crumb }]} title={title} description={description} />
      <section className="section pt-12">
        <div className="container max-w-3xl">
          <p className="mb-8 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
            <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            Documento modelo. Debe ser revisado y completado por la agencia (razón social, NIT, domicilio y canales de
            atención) con apoyo de su asesor legal antes de la publicación definitiva.
          </p>
          <div className="space-y-6 leading-relaxed text-gray-700 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
          {updated && <p className="mt-12 text-sm text-gray-500">Última actualización: {updated}</p>}
        </div>
      </section>
    </>
  );
}
