import { Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import QuoteForm from "@/components/forms/QuoteForm";
import { WhatsAppIcon, socialIcons } from "@/components/ui/BrandIcons";
import { getDestinationOptions } from "@/lib/data";
import { siteConfig } from "@/config/site";
import { whatsappLink, messages } from "@/lib/whatsapp";
import { destinationImages } from "@/data/destination-images";

export const metadata = {
  title: "Contacto",
  description: "Contáctanos por WhatsApp, teléfono o correo. Agencia de viajes en Medellín: cotiza tu viaje nacional o internacional.",
  alternates: { canonical: "/contacto" },
};

export default async function ContactoPage() {
  const options = await getDestinationOptions();
  const { contact, social } = siteConfig;

  const channels = [
    { icon: WhatsAppIcon, label: "WhatsApp", value: contact.whatsapp ? `+${contact.whatsapp}` : "Escríbenos ahora", href: whatsappLink(messages.general()), external: true },
    contact.phone && { icon: Phone, label: "Teléfono", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    contact.email && { icon: Mail, label: "Correo", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Ubicación", value: contact.address || siteConfig.city },
  ].filter(Boolean);

  return (
    <>
      <PageHeader
        image={destinationImages["medellin"]?.imagen}
        crumbs={[{ label: "Contacto" }]}
        eyebrow="Contacto"
        title="Hablemos de tu próximo viaje"
        description="Estamos en Medellín y te atendemos por WhatsApp, teléfono o correo."
      />
      <section className="section bg-brand-bg pt-12">
        <div className="container grid gap-10 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-4">
            {channels.map(({ icon: Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-bg text-brand">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
                    <span className="font-semibold text-brand-dark">{value}</span>
                  </span>
                </>
              );
              return href ? (
                <a key={label} href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className="card card-hover flex items-center gap-4 p-5">
                  {content}
                </a>
              ) : (
                <div key={label} className="card flex items-center gap-4 p-5">{content}</div>
              );
            })}

            {social.length > 0 && (
              <div className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Redes sociales</p>
                <ul className="mt-3 flex gap-2">
                  {social.map((s) => {
                    const Icon = socialIcons[s.key];
                    return (
                      <li key={s.key}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-bg text-brand transition hover:bg-brand hover:text-white">
                          <Icon className="h-5 w-5" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>

          <div>
            <h2 className="mb-6 text-2xl font-extrabold sm:text-3xl">Envíanos tu solicitud</h2>
            <QuoteForm options={options} />
          </div>
        </div>
      </section>
    </>
  );
}
