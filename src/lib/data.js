import { cache } from "react";
import { getSupabase } from "./supabase";
import { resolveImage, FALLBACK_IMAGE } from "./images";
import { destinations as seedDestinations } from "@/data/destinations";
import { plans as seedPlans } from "@/data/plans";
import { destinationImages } from "@/data/destination-images";

/* ------------------------------------------------------------------ */
/* Capa de acceso a datos.                                             */
/* Si Supabase está configurado se usa la base de datos; si no, o si   */
/* la consulta falla, se usan los datos semilla locales.               */
/* ------------------------------------------------------------------ */

function withDestinationImages(dest) {
  const local = destinationImages[dest.slug] || {};
  const imagen = resolveImage(dest.imagen) || local.imagen || FALLBACK_IMAGE;
  const dbGallery = (dest.galeria || []).map(resolveImage).filter(Boolean);
  const galeria = dbGallery.length ? dbGallery : local.galeria || [];
  return { ...dest, imagen, galeria, creditos: dest.creditos || local.creditos || [] };
}

const loadRaw = cache(async () => {
  const supabase = getSupabase();
  if (supabase) {
    const [d, p] = await Promise.all([
      supabase.from("destinos").select("*").eq("estado", "activo"),
      supabase.from("planes").select("*").eq("estado", "activo"),
    ]);
    if (!d.error && !p.error && d.data?.length) {
      return { destinations: d.data, plans: p.data || [] };
    }
    if (d.error || p.error) console.error("[data] Supabase:", d.error?.message || p.error?.message);
  }
  return {
    destinations: seedDestinations.filter((x) => x.estado === "activo"),
    plans: seedPlans.filter((x) => x.estado === "activo"),
  };
});

const loadAll = cache(async () => {
  const raw = await loadRaw();
  const destinations = raw.destinations.map(withDestinationImages);
  const byId = new Map(destinations.map((x) => [x.id, x]));

  const plans = raw.plans
    .map((plan) => {
      const destino = byId.get(plan.destino_id) || null;
      return {
        ...plan,
        categorias: plan.categorias || [],
        servicios_incluidos: plan.servicios_incluidos || [],
        imagen: resolveImage(plan.imagen) || destino?.imagen || FALLBACK_IMAGE,
        destino: destino ? { id: destino.id, nombre: destino.nombre, slug: destino.slug, pais: destino.pais, tipo: destino.tipo } : null,
      };
    })
    .sort((a, b) => Number(b.destacado) - Number(a.destacado) || a.id - b.id);

  // Enriquecer destinos con información derivada de sus planes (para filtros de búsqueda).
  const enriched = destinations.map((dest) => {
    const own = plans.filter((pl) => pl.destino_id === dest.id);
    const prices = own.map((pl) => Number(pl.precio_referencial)).filter((n) => Number.isFinite(n) && n > 0);
    return {
      ...dest,
      planes_count: own.length,
      precio_desde: prices.length ? Math.min(...prices) : null,
      duraciones: own.map((pl) => pl.duracion_dias).filter(Boolean),
    };
  });

  return { destinations: enriched, plans };
});

export async function getDestinations({ tipo } = {}) {
  const { destinations } = await loadAll();
  return tipo ? destinations.filter((d) => d.tipo === tipo) : destinations;
}

export async function getFeaturedDestinations(tipo, limit = 6) {
  const list = await getDestinations({ tipo });
  return [...list].sort((a, b) => Number(b.destacado) - Number(a.destacado) || a.id - b.id).slice(0, limit);
}

export async function getDestinationBySlug(slug) {
  const { destinations } = await loadAll();
  return destinations.find((d) => d.slug === slug) || null;
}

export async function getPlans() {
  const { plans } = await loadAll();
  return plans;
}

export async function getPlanBySlug(slug) {
  const { plans } = await loadAll();
  return plans.find((p) => p.slug === slug) || null;
}

export async function getPlansByDestination(destinoId) {
  const { plans } = await loadAll();
  return plans.filter((p) => p.destino_id === destinoId);
}

/** Lista liviana para selects del formulario y el buscador. */
export async function getDestinationOptions() {
  const { destinations } = await loadAll();
  return destinations
    .map((d) => ({ slug: d.slug, nombre: d.nombre, tipo: d.tipo, pais: d.pais, region: d.region }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}
