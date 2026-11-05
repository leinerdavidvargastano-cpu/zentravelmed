import { Clock, ShieldCheck, Headphones } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import QuoteForm from "@/components/forms/QuoteForm";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { getDestinationBySlug, getDestinationOptions, getPlanBySlug } from "@/lib/data";
import { BUDGETS } from "@/lib/constants";
import { whatsappLink, messages } from "@/lib/whatsapp";
import { destinationImages } from "@/data/destination-images";

export const metadata = {
  title: "Cotizar viaje",
  description: "Solicita la cotización de tu viaje nacional o internacional. Un asesor de Zentravel Medellín te responderá por WhatsApp.",
  alternates: { canonical: "/cotizar" },
};

const one = (v) => (Array.isArray(v) ? v[0] : v) || "";

export default async function CotizarPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const [options, destino, plan] = await Promise.all([
    getDestinationOptions(),
    one(sp.destino) ? getDestinationBySlug(one(sp.destino)) : null,
    one(sp.plan) ? getPlanBySlug(one(sp.plan)) : null,
  ]);

  const fecha = one(sp.fecha);
  const adultos = Number.parseInt(one(sp.adultos), 10);
  const defaults = {
    destino: destino?.nombre || plan?.destino?.nombre || one(sp.destino).slice(0, 120),
    origen: plan?.nombre || "",
    fecha_viaje: /^\d{4}-\d{2}-\d{2}$/.test(fecha) ? fecha : "",
    adultos: adultos >= 1 && adultos <= 50 ? adultos : 2,
    presupuesto: BUDGETS.find((b) => b.key && b.key === one(sp.presupuesto))?.label || "",
  };

  return (
    <>
      <PageHeader
        image={destinationImages["santa-marta"]?.imagen}
        crumbs={[{ label: "Cotizar viaje" }]}
        eyebrow="Cotización sin compromiso"
        title={plan ? `Cotiza: ${plan.nombre}` : destino ? `Cotiza tu viaje a ${destino.nombre}` : "Cotiza tu próximo viaje"}
        description="Completa tus datos y un asesor te enviará una propuesta personalizada. No realizamos cobros ni pagos en línea."
      />
      <section className="section bg-brand-bg pt-12">
        <div className="container grid gap-10 lg:grid-cols-[1fr_340px]">
          <QuoteForm options={options} defaults={defaults} />
          <aside className="space-y-4">
            {[
              { icon: Headphones, title: "Asesoría personalizada", text: "Te ayudamos a elegir el plan, las fechas y el alojamiento ideal." },
              { icon: Clock, title: "Respuesta por WhatsApp", text: "Recibe tu cotización por el canal más cómodo para ti." },
              { icon: ShieldCheck, title: "Datos protegidos", text: "Solo usamos tu información para atender tu solicitud." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card flex gap-4 p-5">
                <Icon className="h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-display font-bold text-brand-dark">{title}</p>
                  <p className="text-sm text-gray-600">{text}</p>
                </div>
              </div>
            ))}
            <a
              href={whatsappLink(plan ? messages.plan(plan) : destino ? messages.destination(destino.nombre) : messages.general())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full py-4 text-base"
            >
              <WhatsAppIcon className="h-5 w-5" /> Prefiero escribir por WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
