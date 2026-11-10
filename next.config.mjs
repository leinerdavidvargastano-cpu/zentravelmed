/** @type {import('next').NextConfig} */
const nextConfig = {
  // Página ESTÁTICA: "npm run build" genera la carpeta out/ con archivos
  // fijos (HTML, CSS, JS e imágenes) que se suben a public_html en Hostinger.
  // No necesita Node.js en el hosting.
  output: "export",

  // Crea /destinos/index.html en vez de /destinos.html.
  // Así Hostinger (Apache) encuentra cada página sin configuración extra.
  trailingSlash: true,

  // Sin servidor no hay quien achique las fotos al vuelo: se muestran tal cual.
  // (Las tarjetas usan versiones pequeñas hechas con scripts/miniaturas.mjs)
  images: { unoptimized: true },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
