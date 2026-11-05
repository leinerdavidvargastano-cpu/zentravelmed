import { siteConfig } from "@/config/site";

/** Construye un enlace wa.me con mensaje prellenado. Si no hay número configurado,
 *  WhatsApp permite al usuario elegir el contacto. */
export function whatsappLink(message = "") {
  const number = siteConfig.contact.whatsapp;
  const text = encodeURIComponent(message.trim());
  return number ? `https://wa.me/${number}${text ? `?text=${text}` : ""}` : `https://wa.me/${text ? `?text=${text}` : ""}`;
}

export const messages = {
  general: () => `¡Hola, ${siteConfig.name}! Quiero información para planear un viaje.`,
  destination: (nombre) => `¡Hola, ${siteConfig.name}! Me interesa viajar a ${nombre}. ¿Me pueden enviar opciones y una cotización?`,
  plan: (plan) =>
    `¡Hola, ${siteConfig.name}! Quiero cotizar el plan "${plan.nombre}"${plan.destino ? ` (${plan.destino.nombre})` : ""}. ¿Me pueden dar más información?`,
};

/** Mensaje organizado a partir de una solicitud de cotización. */
export function quoteMessage(q) {
  const lines = [
    `*Solicitud de cotización · ${siteConfig.name}*`,
    "",
    `*Nombre:* ${q.nombre}`,
    `*WhatsApp:* ${q.telefono}`,
    q.correo ? `*Correo:* ${q.correo}` : null,
    `*Destino:* ${q.destino}`,
    q.fecha_viaje ? `*Fecha aproximada:* ${q.fecha_viaje}` : null,
    `*Viajeros:* ${q.adultos} adulto(s)${q.ninos ? `, ${q.ninos} niño(s)` : ""}`,
    q.presupuesto ? `*Presupuesto:* ${q.presupuesto}` : null,
    q.origen ? `*Plan de interés:* ${q.origen}` : null,
    q.comentarios ? `*Comentarios:* ${q.comentarios}` : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}
