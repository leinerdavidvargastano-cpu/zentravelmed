import { siteConfig } from "@/config/site";
import { getDestinations, getPlans } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap() {
  const base = siteConfig.url;
  const now = new Date();
  const [destinations, plans] = await Promise.all([getDestinations(), getPlans()]);

  const staticRoutes = [
    ["", 1, "weekly"],
    ["/destinos", 0.9, "weekly"],
    ["/destinos/colombia", 0.9, "weekly"],
    ["/destinos/internacionales", 0.9, "weekly"],
    ["/planes", 0.9, "weekly"],
    ["/cotizar", 0.8, "monthly"],
    ["/nosotros", 0.6, "monthly"],
    ["/contacto", 0.6, "monthly"],
    ["/politica-de-privacidad", 0.2, "yearly"],
    ["/tratamiento-de-datos", 0.2, "yearly"],
  ].map(([path, priority, changeFrequency]) => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority }));

  return [
    ...staticRoutes,
    ...destinations.map((d) => ({
      url: `${base}/destinos/${d.slug}`,
      lastModified: d.actualizado_en ? new Date(d.actualizado_en) : now,
      changeFrequency: "monthly",
      priority: d.destacado ? 0.8 : 0.7,
      images: [d.imagen],
    })),
    ...plans.map((p) => ({
      url: `${base}/planes/${p.slug}`,
      lastModified: p.actualizado_en ? new Date(p.actualizado_en) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];
}
