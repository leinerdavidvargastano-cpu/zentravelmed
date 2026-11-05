import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Cliente con la clave pública (anon). Todas las operaciones quedan
 * restringidas por las políticas RLS definidas en supabase/schema.sql:
 * - lectura de destinos y planes activos
 * - solo inserción de cotizaciones (nunca lectura)
 */
export function getSupabase() {
  if (!isSupabaseConfigured) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
