// Guarda las cotizaciones y los mensajes en Supabase, DESDE EL NAVEGADOR.
// (La página es estática: no hay servidor propio que lo haga.)
//
// ¿Es seguro? Sí: usamos la "publishable key", que está hecha para usarse
// en el navegador. Las políticas RLS de supabase/esquema.sql solo dejan
// INSERTAR filas nuevas: nadie puede leer, cambiar ni borrar datos.
// Además la base de datos rechaza datos malos con sus reglas "check".

import { createClient } from "@supabase/supabase-js";
import { esquemaContacto, esquemaCotizacion } from "@/lib/validacion";

const ERROR_DATOS = "Revisa los datos del formulario.";
const ERROR_GUARDAR = "No pudimos guardar tu solicitud, pero puedes enviarla por WhatsApp.";

// Los valores NEXT_PUBLIC_ se copian dentro de la página al compilar
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/rest\/v1\/?$/, "");
const clave = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

// Se crea una sola vez (la primera vez que se necesita)
let cliente;
function clienteSupabase() {
  if (!url || !clave) {
    console.warn("Supabase no está configurado (.env.local): no se guardó la solicitud.");
    return null;
  }
  // Protección: la secret key jamás debe ir en una página pública
  if (clave.startsWith("sb_secret_")) {
    console.error("¡Hay una SECRET key en NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! Cámbiala por la publishable.");
    return null;
  }
  cliente ??= createClient(url, clave, { auth: { persistSession: false } });
  return cliente;
}

// Inserta una fila y devuelve { ok, guardado, error }
async function insertar(tabla, fila) {
  const supabase = clienteSupabase();
  if (!supabase) return { ok: true, guardado: false };

  const { error } = await supabase.from(tabla).insert(fila);
  if (error) {
    console.error(`Error guardando en ${tabla}:`, error.message);
    return { ok: true, guardado: false, error: ERROR_GUARDAR };
  }
  return { ok: true, guardado: true };
}

export async function guardarCotizacion(datos) {
  const revision = esquemaCotizacion.safeParse(datos);
  if (!revision.success) return { ok: false, error: ERROR_DATOS };
  const d = revision.data;

  // Los nombres de la izquierda son las columnas de la tabla en Supabase
  return insertar("cotizaciones", {
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
}

export async function guardarMensaje(datos) {
  const revision = esquemaContacto.safeParse(datos);
  if (!revision.success) return { ok: false, error: ERROR_DATOS };
  const d = revision.data;

  return insertar("mensajes_contacto", {
    nombre: d.nombre,
    correo: d.correo,
    telefono: d.telefono || null,
    mensaje: d.mensaje,
    autoriza_datos: d.acepta,
  });
}
