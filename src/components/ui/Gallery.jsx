"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

/**
 * Galería en mosaico con ampliación al seleccionar (sin carrusel).
 * items: [{ src, alt, label? }]
 */
export default function Gallery({ items, variant = "mosaic" }) {
  const [active, setActive] = useState(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  const mosaic = variant === "mosaic";
  const spanFor = (i) => {
    if (!mosaic) return "";
    const pattern = ["sm:col-span-2 sm:row-span-2", "", "", "sm:row-span-2", "", "sm:col-span-2", "", "", "sm:row-span-2", ""];
    return pattern[i % pattern.length];
  };

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 ${mosaic ? "auto-rows-[150px] sm:auto-rows-[180px] lg:grid-cols-4" : "auto-rows-[160px] sm:grid-cols-3 sm:auto-rows-[200px]"}`}>
        {items.map((item, i) => (
          <li key={item.src} className={`${spanFor(i)} ${!mosaic && i === 0 ? "col-span-2 row-span-2" : ""}`}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setActive(item);
              }}
              className="group relative h-full w-full overflow-hidden rounded-2xl bg-brand-bg shadow-soft sm:rounded-3xl"
              aria-label={`Ampliar fotografía: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-brand-dark/0 transition-colors duration-300 group-hover:bg-brand-dark/30" />
              <ZoomIn className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 p-1.5 text-brand-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              {item.label && (
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark backdrop-blur">
                  {item.label}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[70] flex animate-fade-in items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>
          <figure className="relative h-full max-h-[85vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain" />
            <figcaption className="absolute -bottom-8 left-0 right-0 text-center text-sm text-white/80">
              {active.label ? `${active.label} · ` : ""}
              {active.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
