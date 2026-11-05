const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Normaliza una imagen proveniente de la base de datos.
 * - URL completa (Cloudinary, Wikimedia, etc.): se usa tal cual.
 * - public_id de Cloudinary (ej. "zentravel/cartagena"): se construye la URL
 *   con formato y calidad automáticos.
 */
export function resolveImage(src) {
  if (!src) return null;
  if (/^https?:\/\//.test(src) || src.startsWith("/")) return src;
  if (cloud) return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_1600/${src}`;
  return null;
}

export const FALLBACK_IMAGE = "/placeholder.svg";
