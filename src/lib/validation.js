import { z } from "zod";

const optionalText = (max) =>
  z.string().trim().max(max, `Máximo ${max} caracteres`).optional().or(z.literal("")).transform((v) => v || null);

export const quoteSchema = z.object({
  nombre: z.string().trim().min(3, "Escribe tu nombre completo").max(120, "Nombre demasiado largo"),
  telefono: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d+ ]/g, ""))
    .refine((v) => /^\+?[0-9 ]{7,20}$/.test(v), "Escribe un número de WhatsApp válido"),
  correo: z
    .string()
    .trim()
    .max(160)
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || z.string().email().safeParse(v).success, "Correo electrónico no válido")
    .transform((v) => v || null),
  destino: z.string().trim().min(2, "Indica el destino que te interesa").max(120),
  fecha_viaje: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), "Fecha no válida")
    .refine((v) => {
      if (!v) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(`${v}T00:00:00`) >= today;
    }, "La fecha debe ser posterior a hoy")
    .transform((v) => v || null),
  adultos: z.coerce.number({ invalid_type_error: "Indica un número" }).int().min(1, "Mínimo 1 adulto").max(50),
  ninos: z.coerce.number({ invalid_type_error: "Indica un número" }).int().min(0).max(50).default(0),
  presupuesto: optionalText(60),
  comentarios: optionalText(1000),
  origen: optionalText(120),
  acepta_datos: z.literal(true, { errorMap: () => ({ message: "Debes autorizar el tratamiento de datos" }) }),
  // Campo trampa anti-spam: debe permanecer vacío.
  empresa: z.string().max(0).optional().or(z.literal("")),
});
