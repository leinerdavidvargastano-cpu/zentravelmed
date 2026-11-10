// Reglas de los formularios con Zod.
// Un "esquema" describe cómo deben ser los datos y qué mensaje mostrar
// si algo está mal. React Hook Form lo usa para revisar cada campo.
// (En la Fase 8 el servidor usará estas mismas reglas antes de guardar.)

import { z } from "zod";

// Teléfono: números, espacios, + y guiones; entre 7 y 15 dígitos
const telefono = z
  .string()
  .trim()
  .min(1, "Escribe tu teléfono")
  .refine((t) => /^[+\d\s-]+$/.test(t), "Solo números, espacios o +")
  .refine((t) => {
    const digitos = t.replace(/\D/g, "").length;
    return digitos >= 7 && digitos <= 15;
  }, "Escribe un teléfono válido (7 a 15 números)");

const nombre = z
  .string()
  .trim()
  .min(3, "Escribe tu nombre completo")
  .max(80, "Máximo 80 caracteres");

const correo = z.string().trim().toLowerCase().email("Escribe un correo válido");

// Antispam ("honeypot"): un campo escondido que las personas no ven.
// Los robots llenan todos los campos; si este trae algo, se rechaza.
const sitioWeb = z.string().max(0).optional();

// Casilla de autorización de datos (Ley 1581 de 2012 en Colombia)
const acepta = z.boolean().refine((v) => v === true, "Debes autorizar el tratamiento de tus datos");

// ---------- Cotización ----------
export const esquemaCotizacion = z
  .object({
    nombre,
    telefono,
    correo,
    destino: z.string().min(1, "Elige un destino"),
    fechaSalida: z.string().min(1, "Elige la fecha de salida"),
    fechaRegreso: z.string().optional(),
    adultos: z
      .number({ error: "Escribe cuántos adultos viajan" })
      .int()
      .min(1, "Mínimo 1 adulto")
      .max(30, "Para grupos de más de 30 escríbenos por WhatsApp"),
    ninos: z.number({ error: "Escribe un número (0 si no viajan niños)" }).int().min(0).max(20),
    mensaje: z.string().trim().max(500, "Máximo 500 caracteres").optional(),
    acepta,
    sitioWeb,
  })
  // Regla entre dos campos: el regreso no puede ser antes de la salida
  .refine((d) => !d.fechaRegreso || d.fechaRegreso >= d.fechaSalida, {
    message: "El regreso debe ser después de la salida",
    path: ["fechaRegreso"], // el error se muestra debajo de "Fecha de regreso"
  });

// ---------- Contacto ----------
export const esquemaContacto = z.object({
  nombre,
  correo,
  telefono: telefono.optional().or(z.literal("")), // opcional: puede quedar vacío
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
    .max(1000, "Máximo 1000 caracteres"),
  acepta,
  sitioWeb,
});
