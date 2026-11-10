"use client";
// Lee la URL en el navegador para saber qué destino dejar elegido:
//   /cotizar?destino=cartagena  → Cartagena
//   /cotizar?tipo=cruceros      → Cruceros por el Caribe
// y muestra el formulario de cotización con ese destino.

import { useSearchParams } from "next/navigation";
import FormularioCotizacion from "@/components/forms/FormularioCotizacion";
import { obtenerDestino } from "@/lib/destinos";

export default function CotizacionDesdeURL() {
  const params = useSearchParams();
  const destino = params.get("destino") ?? "";
  const tipo = params.get("tipo") ?? "";

  // Solo se usa el destino de la URL si existe en la lista
  let destinoInicial = obtenerDestino(destino) ? destino : "";
  if (!destinoInicial && tipo === "cruceros") destinoInicial = "cruceros-caribe";

  // "key": si cambia el destino de la URL, el formulario empieza de nuevo con ese destino
  return <FormularioCotizacion key={destinoInicial} destinoInicial={destinoInicial} />;
}
