"use server";
// Acciones del servidor ("Server Actions").
// Son funciones que el formulario llama desde el navegador, pero que se
// ejecutan EN EL SERVIDOR. Aquí:
//  1. Se vuelven a revisar los datos con las mismas reglas de Zod
//     (nunca hay que confiar solo en la revisión del navegador).
//  2. Se guardan en Supabase.
// Devuelven un objeto { ok, guardado, error } para que el formulario sepa qué pasó.

import { esquemaContacto, esquemaCotizacion } from "@/lib/validacion";
import { clienteSupabase } from "@/lib/supabase";

const ERROR_DATOS = "Revisa los datos del formulario.";
const ERROR_GUARDAR = "No pudimos guardar tu solicitud, pero puedes enviarla por WhatsApp.";

export async function guardarCotizacion(datos) {
  const revision = esquemaCotizacion.safeParse(datos);
  if (!revision.success) return { ok: false, error: ERROR_DATOS };
  const d = revision.data;

  const supabase = clienteSupabase();
  if (!supabase) {
    console.warn("Supabase no está configurado (.env.local): la cotización no se guardó.");
    return { ok: true, guardado: false };
  }

  // Los nombres de la izquierda son las columnas de la tabla en Supabase
  const { error } = await supabase.from("cotizaciones").insert({
    nombre: d.nombre,
    telefono: d.telefono,
    correo: d.correo,
    destino: d.destino,
    fecha_salida: d.fechaSalida,
    fecha_regreso: d.fechaRegreso || null, // vacío → null (sin fecha)
    adultos: d.adultos,
    ninos: d.ninos,
    mensaje: d.mensaje || null,
    autoriza_datos: d.acepta,
  });

  if (error) {
    console.error("Error guardando cotización:", error.message);
    return { ok: true, guardado: false, error: ERROR_GUARDAR };
  }
  return { ok: true, guardado: true };
}

export async function guardarMensaje(datos) {
  const revision = esquemaContacto.safeParse(datos);
  if (!revision.success) return { ok: false, error: ERROR_DATOS };
  const d = revision.data;

  const supabase = clienteSupabase();
  if (!supabase) {
    console.warn("Supabase no está configurado (.env.local): el mensaje no se guardó.");
    return { ok: true, guardado: false };
  }

  const { error } = await supabase.from("mensajes_contacto").insert({
    nombre: d.nombre,
    correo: d.correo,
    telefono: d.telefono || null,
    mensaje: d.mensaje,
    autoriza_datos: d.acepta,
  });

  if (error) {
    console.error("Error guardando mensaje:", error.message);
    return { ok: true, guardado: false, error: ERROR_GUARDAR };
  }
  return { ok: true, guardado: true };
}
