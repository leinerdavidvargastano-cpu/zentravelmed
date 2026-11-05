"use client";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink, messages } from "@/lib/whatsapp";

/**
 * Botón flotante visible en todo el sitio. El mensaje se adapta a la página:
 * en un destino o un plan, el texto menciona ese destino/plan.
 * `catalog` = { destinos: {slug: nombre}, planes: {slug: {nombre, destino}} }
 */
export default function WhatsAppFloat({ catalog }) {
  const pathname = usePathname() || "/";
  let message = messages.general();

  const [, section, slug] = pathname.split("/");
  if (section === "destinos" && slug && catalog.destinos[slug]) {
    message = messages.destination(catalog.destinos[slug]);
  } else if (section === "planes" && slug && catalog.planes[slug]) {
    message = messages.plan(catalog.planes[slug]);
  }

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-lift transition-all duration-300 hover:scale-105 hover:bg-[#1ebe5b] sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" aria-hidden="true" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[160px] sm:inline">
        ¿Hablamos?
      </span>
    </a>
  );
}
