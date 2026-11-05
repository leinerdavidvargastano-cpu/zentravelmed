import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";

/** Encabezado para páginas internas, con imagen de fondo opcional. */
export default function PageHeader({ title, description, image, crumbs = [], eyebrow, children }) {
  return (
    <header className="relative isolate overflow-hidden bg-brand-dark pb-16 pt-32 sm:pb-20 sm:pt-40">
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-50" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/30" aria-hidden="true" />
      <div className="container animate-fade-up">
        {crumbs.length > 0 && <Breadcrumbs items={crumbs} light />}
        {eyebrow && <p className="eyebrow mt-5 text-brand-light">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-white/80">{description}</p>}
        {children}
      </div>
    </header>
  );
}
