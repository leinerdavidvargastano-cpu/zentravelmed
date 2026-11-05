import { Clock, Headphones, MessageCircle, ShieldCheck } from "lucide-react";
import QuoteForm from "@/components/forms/QuoteForm";

const steps = [
  { icon: MessageCircle, title: "Cuéntanos tu idea", text: "Destino, fechas, viajeros y presupuesto aproximado." },
  { icon: Headphones, title: "Te asesoramos", text: "Un asesor revisa tu solicitud y te propone opciones." },
  { icon: Clock, title: "Recibe tu cotización", text: "Por WhatsApp, con el detalle de lo que incluye tu plan." },
];

export default function QuoteSection({ options }) {
  return (
    <section id="cotizar" className="section relative overflow-hidden bg-brand-dark" aria-labelledby="cotizar-title">
      <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[24rem] w-[24rem] rounded-full bg-brand-light/20 blur-3xl" aria-hidden="true" />
      <div className="container relative grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow mb-3 text-brand-light">
            <span className="h-px w-6 bg-brand-light" aria-hidden="true" /> Cotización rápida
          </p>
          <h2 id="cotizar-title" className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Planeemos juntos tu próximo viaje
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/75">
            Completa el formulario y recibe una propuesta personalizada. Sin compromiso y sin pagos en línea: un asesor te
            acompaña en todo el proceso.
          </p>
          <ol className="mt-10 space-y-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-light ring-1 ring-white/15">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-light text-[11px] font-bold text-brand-dark">
                    {i + 1}
                  </span>
                </span>
                <span>
                  <span className="block font-display font-bold text-white">{title}</span>
                  <span className="text-sm text-white/70">{text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10 flex items-center gap-2 text-sm text-white/60">
            <ShieldCheck className="h-4 w-4 text-brand-light" aria-hidden="true" /> Tus datos están protegidos y solo se usan para atender tu solicitud.
          </p>
        </div>
        <QuoteForm options={options} />
      </div>
    </section>
  );
}
