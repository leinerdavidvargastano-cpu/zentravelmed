import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad del sitio web de Zentravel Medellín.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalPage crumb="Política de privacidad" title="Política de privacidad" description="Información sobre el uso de este sitio web y la privacidad de sus visitantes.">
      <h2>1. Alcance</h2>
      <p>
        Esta política aplica al sitio web de {siteConfig.name}. El sitio es informativo y comercial: no vende en línea,
        no procesa pagos ni almacena información financiera de los visitantes.
      </p>

      <h2>2. Información que recibimos</h2>
      <p>
        Solo recibimos la información que nos envías voluntariamente en el formulario de cotización. El uso de esos datos
        se rige por nuestra{" "}
        <Link href="/tratamiento-de-datos" className="font-semibold text-brand hover:underline">política de tratamiento de datos personales</Link>.
      </p>

      <h2>3. Enlaces a WhatsApp y otros servicios</h2>
      <p>
        Al usar los botones de WhatsApp o redes sociales serás dirigido a servicios de terceros, que tienen sus propias
        políticas de privacidad.
      </p>

      <h2>4. Cookies</h2>
      <p>
        El sitio utiliza únicamente los elementos técnicos necesarios para su funcionamiento. Si en el futuro se
        incorporan herramientas de analítica o publicidad, esta política se actualizará y se solicitará tu consentimiento
        cuando sea necesario.
      </p>

      <h2>5. Imágenes</h2>
      <p>
        Algunas fotografías de destinos provienen de Wikimedia Commons bajo licencias libres; los créditos se indican en
        la página de cada destino.
      </p>
    </LegalPage>
  );
}
