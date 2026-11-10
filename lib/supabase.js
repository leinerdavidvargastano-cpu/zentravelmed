// Conexión a Supabase. SOLO se usa en el servidor:
// "server-only" hace que Next.js dé error si alguien la importa en un
// componente del navegador. Así la clave nunca llega al navegador.
//
// Usa la "publishable key": con ella la base de datos solo deja hacer lo
// que permiten las políticas RLS (en nuestro caso, únicamente insertar).

import "server-only";
import { createClient } from "@supabase/supabase-js";

export function clienteSupabase() {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_PUBLISHABLE_KEY;

  // Si todavía no se configuró .env.local, no hay conexión (la web sigue funcionando)
  if (!url || !clave) return null;

  return createClient(url, clave, {
    auth: { persistSession: false }, // en el servidor no hay sesión de usuario
  });
}
