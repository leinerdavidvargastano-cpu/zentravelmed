// Envoltorio de un campo de formulario: etiqueta arriba, el campo, y el
// mensaje de error en rojo debajo (si hay error).
// También exporta las clases de estilo que usan todos los campos.

import { CircleAlert } from "lucide-react";

// Estilo de inputs, selects y textareas. Si hay error, el borde se pone rojo.
export function estiloCampo(error) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-negro outline-none transition placeholder:text-gray-400 focus:ring-4 ${
    error
      ? "border-red-500 focus:ring-red-100"
      : "border-gray-300 focus:border-verde focus:ring-verde/15"
  }`;
}

export default function Campo({ etiqueta, htmlFor, error, opcional, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-verde">
        {etiqueta}
        {opcional && <span className="ml-1 font-normal text-gray-400">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
          <CircleAlert size={14} className="shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  );
}
