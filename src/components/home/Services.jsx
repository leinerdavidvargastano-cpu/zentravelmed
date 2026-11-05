import { Compass, Globe, Headphones, Luggage, Mountain, Sparkles, Users, UsersRound } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const services = [
  { icon: Compass, title: "Turismo nacional", text: "Recorre los destinos más atractivos de Colombia con planes organizados de principio a fin." },
  { icon: Globe, title: "Turismo internacional", text: "Viaja por América, Europa y el mundo con acompañamiento antes y durante tu viaje." },
  { icon: Luggage, title: "Paquetes turísticos", text: "Alojamiento, traslados y actividades en un solo plan, ajustado a tus necesidades." },
  { icon: Mountain, title: "Excursiones", text: "Pasadías y tours para conocer pueblos, parques naturales y atractivos cercanos." },
  { icon: Users, title: "Viajes familiares", text: "Planes pensados para grandes y pequeños, con la comodidad que tu familia necesita." },
  { icon: UsersRound, title: "Viajes grupales", text: "Organizamos viajes para amigos, empresas, colegios y grupos especiales." },
  { icon: Headphones, title: "Asesoría personalizada", text: "Un asesor te acompaña para elegir el destino, las fechas y el plan ideal para ti." },
  { icon: Sparkles, title: "Experiencias turísticas", text: "Actividades auténticas: naturaleza, cultura, gastronomía y aventura." },
];

export default function Services() {
  return (
    <section id="servicios" className="section bg-brand-bg" aria-labelledby="servicios-title">
      <div className="container">
        <SectionHeading
          eyebrow="Nuestros servicios"
          title={<span id="servicios-title">Todo lo que necesitas para viajar tranquilo</span>}
          description="Nos encargamos de la planeación para que tú solo te preocupes por disfrutar."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 4) * 70}>
              <div className="card card-hover group h-full p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-bg text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
