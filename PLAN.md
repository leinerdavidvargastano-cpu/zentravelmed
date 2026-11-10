# Zen Travel Medellín · Plan de trabajo

Página web **informativa** de la agencia de viajes Zen Travel Medellín (Colombia).
Lema: *"Mundo de experiencias"*. No tiene pagos ni carrito.

## Datos de la empresa

| Dato | Valor |
| --- | --- |
| Nombre | Zen Travel Medellín |
| Dueña | Dayana Ahumada |
| Correo | zentravelmed@gmail.com |
| Teléfono / WhatsApp | +57 320 216 4066 |
| Redes sociales | Existen, pendientes de recibir los enlaces |

## Paleta de colores

| Color | Código | Uso |
| --- | --- | --- |
| Verde bosque | `#0A4834` | Color principal: fondos de portada, menú, pie de página |
| Rosa empolvado | `#EBCAD0` | Títulos grandes sobre verde, detalles y fondos suaves |
| Amarillo pera | `#D3C511` | Botones importantes (Buscar, Cotizar) y etiquetas llamativas |
| Negro texto | `#111418` | Texto normal sobre fondos claros |

Referencia de estilo: portada verde con título grande en rosa y buscador con botón amarillo.

## Categorías de experiencia (del logo)

1. Aventura natural
2. Cultura milenaria
3. Relajación costera
4. Diversión y cruceros

## Páginas

1. **Inicio**: menú, portada con buscador, destinos de Colombia, destinos internacionales, experiencias, sección "¿Hablamos?", pie de página.
2. **Destinos**: catálogo con filtro Colombia / Internacional y por categoría.
3. **Detalle de destino**: fotos, descripción y botón para cotizar.
3b. **Paquetes turísticos**: tarjetas con foto y lo que incluye (hotel, desayuno, traslados, city tour, asesoría).
4. **Mapa** (página aparte): mapa con un punto por destino (Leaflet + OpenStreetMap).
5. **Cotizar viaje**: formulario.
6. **Contacto**: formulario y botón de WhatsApp para hablar con el asesor.
7. **Nosotros**.

## Buscador (tipo filtro)

Destino · Tipo de experiencia · Nacional / Internacional · botón **Buscar**.

## Formularios

- **Cotizar viaje**: nombre, teléfono, correo, destino, fechas, número de personas, mensaje.
- **Contacto**: nombre, correo, teléfono, mensaje.

Se guardan en Supabase y abren WhatsApp con el mensaje ya escrito.

## Destinos

### Colombia

- **Caribe**: Cartagena, Islas del Rosario y Barú, San Andrés, Providencia, Santa Marta, Parque Tayrona, Minca, Palomino, La Guajira (Cabo de la Vela y Punta Gallinas), Capurganá y Sapzurro, Coveñas y Tolú, Rincón del Mar, Mompox.
- **Antioquia**: Medellín, Guatapé, Jardín, Jericó, Santa Fe de Antioquia, Río Claro.
- **Eje Cafetero**: Salento y Valle de Cocora, Filandia, Pereira, Armenia, Manizales.
- **Andes y centro**: Bogotá, Catedral de Sal de Zipaquirá, Villa de Leyva, Barichara, San Gil, Cañón del Chicamocha.
- **Sur**: Cali, Popayán, San Agustín, Desierto de la Tatacoa.
- **Pacífico**: Nuquí, Bahía Solano.
- **Selva y Llanos**: Caño Cristales, Leticia y Amazonas, Puerto Nariño.
- **Aventura**: Ciudad Perdida.

### Internacionales

- **Caribe**: Cancún y Riviera Maya, Punta Cana, Aruba, Curazao, Cruceros por el Caribe.
- **América**: Panamá, Ciudad de México, Miami, Orlando, Nueva York, Cusco y Machu Picchu, Buenos Aires, Río de Janeiro.
- **Europa y otros**: Madrid, París, Roma, Estambul y Capadocia, Dubái.

> Lista de lugares populares. La agencia debe confirmar cuáles vende.

## Tecnologías

Next.js (App Router) · React · JavaScript · Tailwind CSS · Lucide React · React Hook Form + Zod · Supabase (PostgreSQL) · Leaflet + OpenStreetMap · Vercel.

## Fases

- [x] **Fase 1. Planificación** (este documento)
- [x] **Fase 2. Configuración**: crear el proyecto Next.js con Tailwind y los colores
- [x] **Fase 3. Estructura base**: menú y pie de página
- [x] **Fase 4. Página de inicio**: portada y buscador
- [x] **Fase 5. Destinos**: datos, tarjetas, catálogo con filtros y página de detalle
- [x] **Fase 6. Mapa**
- [x] **Fase 7. Formularios**: cotizar y contacto (con WhatsApp)
- [x] **Fase 8. Base de datos**: Supabase
- [ ] **Fase 9. Nosotros y textos legales**
- [ ] **Fase 10. Publicación** en Vercel

## Pendiente de la empresa

- Enlaces de redes sociales
- Fotos propias de destinos (si las hay)
- Texto de "Nosotros"
- Confirmar destinos que se venden
