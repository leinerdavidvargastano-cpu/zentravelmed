"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlanCard from "./PlanCard";
import { PLAN_CATEGORIES, PAGE_SIZE } from "@/lib/constants";

/** Planes organizados por categorías (pestañas tipo chip + cuadrícula, sin carrusel). */
export default function PlansExplorer({ plans, limit, showAllLink = false, initialCategory = "todos" }) {
  const [category, setCategory] = useState(initialCategory);
  const [visible, setVisible] = useState(limit || PAGE_SIZE);

  // Solo mostrar categorías que tengan al menos un plan.
  const categories = useMemo(
    () => PLAN_CATEGORIES.filter((c) => c.key === "todos" || plans.some((p) => p.categorias.includes(c.key))),
    [plans]
  );
  const filtered = useMemo(
    () => (category === "todos" ? plans : plans.filter((p) => p.categorias.includes(category))),
    [plans, category]
  );
  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center" role="group" aria-label="Categorías de planes">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setCategory(c.key);
                setVisible(limit || PAGE_SIZE);
              }}
              aria-pressed={category === c.key}
              className={`chip whitespace-nowrap ${category === c.key ? "chip-active" : ""}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {shown.length > 0 ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((plan) => (
            <li key={plan.slug} className="animate-fade-up">
              <PlanCard plan={plan} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-center text-gray-600">Pronto publicaremos planes en esta categoría. ¡Escríbenos y te asesoramos!</p>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {!limit && visible < filtered.length && (
          <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline px-8">
            Cargar más planes
          </button>
        )}
        {showAllLink && (
          <Link href="/planes" className="btn-primary px-8">
            Ver todos los planes <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
