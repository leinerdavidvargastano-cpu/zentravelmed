// Arma el enlace de WhatsApp con un mensaje ya escrito.
// Se usa en el botón flotante, en la sección de cruceros y más adelante
// en los formularios. Así el número se escribe en un solo lugar.

import { empresa } from "@/config/site";

export function enlaceWhatsApp(mensaje) {
  return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
