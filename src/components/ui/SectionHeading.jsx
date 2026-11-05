export default function SectionHeading({ eyebrow, title, description, align = "center", as: Tag = "h2", light = false, children }) {
  const center = align === "center";
  return (
    <div className={`mb-10 sm:mb-14 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${center ? "justify-center" : ""} ${light ? "text-brand-light" : ""}`}>
          <span className={`h-px w-6 ${light ? "bg-brand-light" : "bg-brand"}`} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Tag className={`text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem] ${light ? "text-white" : ""}`}>{title}</Tag>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/75" : "text-gray-600"}`}>{description}</p>
      )}
      {children}
    </div>
  );
}
