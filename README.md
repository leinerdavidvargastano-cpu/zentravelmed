# Zentravel Medellín · Plataforma web

Sitio informativo y comercial para la agencia de viajes **Zentravel Medellín**: destinos de Colombia y del mundo, planes turísticos y solicitudes de cotización atendidas por asesores.

> No es una tienda virtual: **no hay pagos, carrito ni checkout**. Las cotizaciones se guardan en Supabase y continúan por WhatsApp.

## Tecnologías

Next.js 15 (App Router) · React 19 · JavaScript · Tailwind CSS 3 · Lucide React · React Hook Form · Zod · Supabase (PostgreSQL + RLS) · Cloudinary (opcional) · Vercel.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completar variables
npm run dev                  # http://localhost:3000
```

Sin variables de Supabase, el sitio funciona con los datos locales de `src/data/` (útil para desarrollo). Las cotizaciones se validan y generan el mensaje de WhatsApp, pero **no se guardan** hasta configurar Supabase.

### Variables de entorno (`.env.local`)

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública (sitemap, Open Graph, canonical) |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Conexión a Supabase |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp de la agencia, formato `573001234567` |
| `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_ADDRESS` | Datos de contacto (si están vacíos no se muestran) |
| `NEXT_PUBLIC_INSTAGRAM_URL`, `..._FACEBOOK_URL`, `..._TIKTOK_URL`, `..._YOUTUBE_URL` | Redes sociales |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Permite guardar en la BD solo el `public_id` de Cloudinary |

## Base de datos (Supabase)

1. Crear un proyecto en Supabase.
2. En **SQL Editor** ejecutar `supabase/schema.sql` y luego `supabase/seed.sql`.
3. Crear el usuario administrador en **Authentication** y registrarlo:
   ```sql
   insert into public.administradores (user_id) values ('<uuid-del-usuario>');
   ```

Tablas: `destinos`, `planes`, `cotizaciones`, `administradores`.

**Políticas RLS**

- `destinos` y `planes`: lectura pública solo de registros `activo`; escritura solo administradores.
- `cotizaciones`: el público **solo puede insertar** (estado `nueva`). Leer, editar o borrar está restringido a administradores. Así ningún visitante puede consultar datos de otros clientes.

La agencia gestiona destinos, planes y cotizaciones desde el **Table Editor** de Supabase. Para agregar un destino basta con insertar una fila con un `slug` único: aparece automáticamente en catálogos, buscador, sitemap y tiene su página propia `/destinos/<slug>`.

Para regenerar el seed, `node scripts/generate-seed.mjs` vuelve a crear `supabase/seed.sql` a partir de `src/data/`.

## Contenido pendiente de la agencia (no inventado)

- **Precios**: todos los planes de ejemplo tienen `precio_referencial = null` y se muestran como “Precio según cotización”. Al cargar precios reales en Supabase se muestran automáticamente y activan el filtro por precio.
- **Planes**: los 12 planes de `src/data/plans.js` son ejemplos de estructura (nombre, duración, servicios). Reemplazarlos por los planes reales.
- **Nosotros**: `src/data/about.js` contiene un borrador de quiénes somos, misión, visión y valores para validar. La **historia** está vacía a propósito y la sección aparece cuando se escriba.
- **Testimonios**: `src/data/testimonials.js` tiene ejemplos marcados como *demostración* en el sitio. Reemplazar por opiniones reales con autorización.
- **Contacto y textos legales**: completar variables de entorno y revisar las páginas de privacidad y tratamiento de datos (Ley 1581 de 2012) con un asesor legal.

## Imágenes

Las fotografías de destinos provienen de **Wikimedia Commons** (licencias libres); se optimizaron y se sirven desde `public/images/destinos/`. Los créditos aparecen en cada página de destino. Para usar fotografías propias:

- Subirlas a Cloudinary y guardar la URL (o el `public_id`) en las columnas `imagen` / `galeria` de Supabase, o
- Reemplazar los archivos en `public/images/destinos/<slug>/`.

`scripts/download-images.mjs` documenta cómo se importaron.

## Estructura

```
src/
  app/                    Rutas (App Router)
    page.js               Inicio
    destinos/             Catálogo general, /colombia, /internacionales y /[slug]
    planes/               Planes y /[slug]
    cotizar/  contacto/  nosotros/  politica-de-privacidad/  tratamiento-de-datos/
    api/cotizaciones/     POST: valida (Zod) y guarda en Supabase
    sitemap.js  robots.js  icon.svg
  components/
    layout/               Navbar, Footer, WhatsAppFloat
    home/                 Secciones de la página principal
    destinations/         DestinationCard, DestinationCatalog (filtros, orden, cargar más)
    plans/                PlanCard, PlansExplorer (categorías)
    forms/                QuoteForm (React Hook Form + Zod)
    ui/                   Logo, Gallery (ampliación), PageHeader, Breadcrumbs, JsonLd…
  config/site.js          Datos de la agencia (desde variables de entorno)
  data/                   Datos semilla, imágenes, contenido institucional
  lib/                    Acceso a datos, Supabase, validación, WhatsApp, formatos
supabase/                 schema.sql (tablas + RLS) y seed.sql
```

## SEO

Metadatos por página, SEO por destino y plan (`generateMetadata`), URLs amigables, `sitemap.xml`, `robots.txt`, Open Graph, datos estructurados (`TravelAgency`, `TouristDestination`, `TouristTrip`, `BreadcrumbList`), HTML semántico, imágenes optimizadas (AVIF/WebP) y carga diferida.

## Despliegue en Vercel

1. Subir el repositorio a GitHub.
2. Importarlo en Vercel (framework Next.js detectado automáticamente).
3. Configurar las variables de entorno del archivo `.env.example`.
4. Desplegar. Las páginas de destinos y planes se regeneran cada 5 minutos (ISR), por lo que los cambios hechos en Supabase se reflejan sin volver a desplegar.

## Reglas de diseño del proyecto

Sin carruseles (todo en cuadrículas y tarjetas) · identidad verde (`#14532D`, `#15803D`, `#86EFAC`, `#F0FDF4`) · sin pagos ni carrito · sin precios ni datos empresariales inventados.
