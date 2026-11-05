import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import JsonLd from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { getDestinations, getPlans } from "@/lib/data";
import { destinationImages } from "@/data/destination-images";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["500", "600", "700", "800"] });

const ogImage = destinationImages["valle-del-cocora"]?.imagen;

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Agencia de viajes en Medellín`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["agencia de viajes Medellín", "planes turísticos", "viajes nacionales", "viajes internacionales", "turismo Colombia", "cotizar viaje"],
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · Descubre nuevos destinos`,
    description: siteConfig.description,
    url: "/",
    images: ogImage ? [{ url: ogImage, width: 1600, height: 1067, alt: "Valle del Cocora, Colombia" }] : [],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#14532D",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const [destinos, planes] = await Promise.all([getDestinations(), getPlans()]);

  // Catálogo mínimo para personalizar el mensaje del botón flotante de WhatsApp.
  const catalog = {
    destinos: Object.fromEntries(destinos.map((d) => [d.slug, d.nombre])),
    planes: Object.fromEntries(planes.map((p) => [p.slug, { nombre: p.nombre, destino: p.destino ? { nombre: p.destino.nombre } : null }])),
  };

  const { contact, social } = siteConfig;
  const agency = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: ["CO", "Internacional"],
    address: { "@type": "PostalAddress", addressLocality: "Medellín", addressRegion: "Antioquia", addressCountry: "CO", ...(contact.address && { streetAddress: contact.address }) },
    ...(contact.phone && { telephone: contact.phone }),
    ...(contact.email && { email: contact.email }),
    ...(social.length && { sameAs: social.map((s) => s.url) }),
  };

  return (
    <html lang="es-CO" className={`${body.variable} ${display.variable}`}>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift">
          Saltar al contenido
        </a>
        <JsonLd data={agency} />
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFloat catalog={catalog} />
      </body>
    </html>
  );
}
