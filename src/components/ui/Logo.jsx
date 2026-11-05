import Link from "next/link";

export function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="#15803D" />
      <path d="M12 33c4-10 12-16 24-18-3 9-10 16-20 19" fill="#86EFAC" />
      <path d="M12 33c6-4 12-9 17-15" stroke="#14532D" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="35" cy="13" r="3" fill="#F0FDF4" />
    </svg>
  );
}

export default function Logo({ light = false, className = "" }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Zentravel Medellín, ir al inicio">
      <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-6" />
      <span className="leading-none">
        <span className={`block font-display text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-brand-dark"}`}>
          Zen<span className={light ? "text-brand-light" : "text-brand"}>travel</span>
        </span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[.3em] ${light ? "text-white/70" : "text-brand/80"}`}>
          Medellín
        </span>
      </span>
    </Link>
  );
}
