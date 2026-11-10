"use client";
// Lee la URL en el navegador para saber qué destino dejar elegido:
//   /cotizar?destino=cartagena  → Cartagena
//   /cotizar?tipo=cruceros      → Cruceros por el Caribe
//   /cotizar?destino=espana&paquete=espana → España y, en comentarios,
//                                            "Me interesa el paquete España."
// y muestra el formulario de cotización con ese destino.

import { useSearchParams } from "next/navigation";
import FormularioCotizacion from "@/components/forms/FormularioCotizacion";
import { obtenerDestino } from "@/lib/destinos";
import { obtenerPaquete } from "@/data/paquetes";

export default function CotizacionDesdeURL() {
  const params = useSearchParams();
  const destino = params.get("destino") ?? "";
  const tipo = params.get("tipo") ?? "";

  // Solo se usa el destino de la URL si existe en la lista
  let destinoInicial = obtenerDestino(destino) ? destino : "";
  if (!destinoInicial && tipo === "cruceros") destinoInicial = "cruceros-caribe";

  // Si viene de un paquete, se escribe en los comentarios
  const paquete = obtenerPaquete(params.get("paquete") ?? "");
  const mensajeInicial = paquete ? `Me interesa el paquete ${paquete.nombre}.` : "";

  // "key": si cambia el destino de la URL, el formulario empieza de nuevo con ese destino
  return (
    <FormularioCotizacion
      key={destinoInicial + mensajeInicial}
      destinoInicial={destinoInicial}
      mensajeInicial={mensajeInicial}
    />
  );
}
