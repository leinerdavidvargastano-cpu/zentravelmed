"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plane } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú móvil al cambiar de ruta y bloquear el scroll mientras está abierto.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/95 shadow-soft backdrop-blur-md" : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <nav className="container flex h-[72px] items-center justify-between gap-4" aria-label="Navegación principal">
        <Logo light={!solid} />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  solid
                    ? isActive(link.href)
                      ? "bg-brand-bg text-brand-dark"
                      : "text-ink hover:bg-brand-bg hover:text-brand-dark"
                    : isActive(link.href)
                      ? "bg-white/15 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/cotizar" className={`${solid ? "btn-primary" : "btn-light"} hidden sm:inline-flex`}>
            <Plane className="h-4 w-4" aria-hidden="true" />
            Cotizar viaje
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden ${
              solid ? "text-brand-dark hover:bg-brand-bg" : "text-white hover:bg-white/15"
            }`}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-brand/10 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[calc(100dvh-72px)] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="container flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                  isActive(link.href) ? "bg-brand-bg text-brand-dark" : "text-ink hover:bg-brand-bg"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href="/cotizar" className="btn-primary w-full py-3.5">
              <Plane className="h-4 w-4" aria-hidden="true" />
              Cotizar viaje
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
