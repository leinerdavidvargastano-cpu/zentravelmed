import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { WhatsAppIcon, socialIcons } from "@/components/ui/BrandIcons";
import { siteConfig, navLinks } from "@/config/site";
import { whatsappLink, messages } from "@/lib/whatsapp";
import { getFeaturedDestinations } from "@/lib/data";

const services = [
  "Turismo nacional",
  "Turismo internacional",
  "Paquetes turísticos",
  "Viajes familiares",
  "Viajes grupales",
  "Asesoría personalizada",
];

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-widest text-brand-light">{title}</h3>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

const linkCls = "text-white/70 transition hover:text-white";

export default async function Footer() {
  const [nacionales, internacionales] = await Promise.all([
    getFeaturedDestinations("nacional", 5),
    getFeaturedDestinations("internacional", 5),
  ]);
  const { contact, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
      <div className="container relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Agencia de viajes en Medellín. Diseñamos planes turísticos nacionales e internacionales con asesoría
              personalizada para que solo te preocupes por disfrutar.
            </p>
            {social.length > 0 && (
              <ul className="mt-6 flex gap-2" aria-label="Redes sociales">
                {social.map((s) => {
                  const Icon = socialIcons[s.key];
                  return (
                    <li key={s.key}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand-light hover:text-brand-dark"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <FooterColumn title="Navegación">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>{l.label}</Link>
              </li>
            ))}
            <li><Link href="/cotizar" className={linkCls}>Cotizar viaje</Link></li>
          </FooterColumn>

          <FooterColumn title="Colombia">
            {nacionales.map((d) => (
              <li key={d.slug}><Link href={`/destinos/${d.slug}`} className={linkCls}>{d.nombre}</Link></li>
            ))}
            <li><Link href="/destinos/colombia" className="font-semibold text-brand-light hover:underline">Ver todos</Link></li>
          </FooterColumn>

          <FooterColumn title="Internacional">
            {internacionales.map((d) => (
              <li key={d.slug}><Link href={`/destinos/${d.slug}`} className={linkCls}>{d.nombre}</Link></li>
            ))}
            <li><Link href="/destinos/internacionales" className="font-semibold text-brand-light hover:underline">Ver todos</Link></li>
          </FooterColumn>

          <FooterColumn title="Servicios">
            {services.map((s) => (
              <li key={s} className="text-white/70">{s}</li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 grid gap-4 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <a href={whatsappLink(messages.general())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
            <WhatsAppIcon className="h-5 w-5 text-brand-light" /> {contact.whatsapp ? `+${contact.whatsapp}` : "Escríbenos por WhatsApp"}
          </a>
          {contact.phone && (
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
              <Phone className="h-5 w-5 text-brand-light" /> {contact.phone}
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
              <Mail className="h-5 w-5 text-brand-light" /> {contact.email}
            </a>
          )}
          <p className="flex items-center gap-3 text-sm text-white/80">
            <MapPin className="h-5 w-5 shrink-0 text-brand-light" /> {contact.address || siteConfig.city}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/politica-de-privacidad" className="hover:text-white">Política de privacidad</Link></li>
            <li><Link href="/tratamiento-de-datos" className="hover:text-white">Tratamiento de datos personales</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
