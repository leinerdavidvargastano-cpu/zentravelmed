import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items, light = false }) {
  const all = [{ href: "/", label: "Inicio" }, ...items];
  return (
    <nav aria-label="Ruta de navegación">
      <ol className={`flex flex-wrap items-center gap-1 text-sm ${light ? "text-white/70" : "text-gray-500"}`}>
        {all.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
            {item.href && i < all.length - 1 ? (
              <Link href={item.href} className={`transition hover:underline ${light ? "hover:text-white" : "hover:text-brand"}`}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={light ? "text-white" : "text-ink"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
