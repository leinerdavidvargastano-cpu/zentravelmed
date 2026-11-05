import LegalPage from "@/components/ui/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Política de tratamiento de datos personales",
  description: "Política de tratamiento de datos personales de Zentravel Medellín conforme a la Ley 1581 de 2012.",
  alternates: { canonical: "/tratamiento-de-datos" },
};

export default function TratamientoDatosPage() {
  const { contact } = siteConfig;
  const canal = [contact.email && `el correo ${contact.email}`, contact.whatsapp && `WhatsApp +${contact.whatsapp}`].filter(Boolean).join(" o ") || "los canales de contacto publicados en este sitio";

  return (
    <LegalPage
      crumb="Tratamiento de datos"
      title="Política de tratamiento de datos personales"
      description="Cómo recolectamos, usamos y protegemos tu información, conforme a la Ley 1581 de 2012."
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        {siteConfig.name}, con domicilio en {contact.address || siteConfig.city}, es responsable del tratamiento de los datos
        personales recolectados a través de este sitio web. Canal de atención: {canal}.
      </p>

      <h2>2. Datos que recolectamos</h2>
      <p>A través del formulario de cotización recolectamos únicamente:</p>
      <ul>
        <li>Nombre completo, número de WhatsApp y, de forma opcional, correo electrónico.</li>
        <li>Información del viaje: destino, fecha aproximada, número de adultos y niños, presupuesto y comentarios.</li>
      </ul>
      <p>No solicitamos datos bancarios, de tarjetas de crédito ni datos sensibles a través de este sitio.</p>

      <h2>3. Finalidades</h2>
      <ul>
        <li>Atender y responder solicitudes de cotización de planes turísticos.</li>
        <li>Contactarte por WhatsApp, teléfono o correo en relación con tu solicitud.</li>
        <li>Enviarte información comercial, solo si nos has autorizado expresamente para ello.</li>
      </ul>

      <h2>4. Derechos del titular</h2>
      <p>Como titular de los datos tienes derecho a:</p>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos personales.</li>
        <li>Solicitar prueba de la autorización otorgada.</li>
        <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
        <li>Revocar la autorización y/o solicitar la supresión de tus datos cuando proceda.</li>
        <li>Acceder de forma gratuita a tus datos personales.</li>
      </ul>

      <h2>5. Procedimiento para consultas y reclamos</h2>
      <p>
        Puedes ejercer tus derechos escribiendo a {canal}. Las consultas se atenderán en un término máximo de diez (10) días
        hábiles y los reclamos en un término máximo de quince (15) días hábiles, conforme a la ley.
      </p>

      <h2>6. Seguridad de la información</h2>
      <p>
        Los datos se almacenan en una base de datos con controles de acceso; solo el personal autorizado de la agencia
        puede consultarlos. Los visitantes del sitio únicamente pueden enviar solicitudes, nunca consultar las de otros.
      </p>

      <h2>7. Vigencia</h2>
      <p>
        Esta política rige a partir de su publicación. Los datos se conservarán mientras sean necesarios para las
        finalidades descritas o mientras exista una obligación legal o contractual.
      </p>
    </LegalPage>
  );
}
