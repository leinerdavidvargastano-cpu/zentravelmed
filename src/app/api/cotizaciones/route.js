import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { quoteMessage, whatsappLink } from "@/lib/whatsapp";

// Límite básico por IP (en memoria, por instancia) para frenar envíos masivos.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_REQUESTS;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Has enviado varias solicitudes seguidas. Espera unos minutos." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud no válida." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Revisa los datos del formulario.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // eslint-disable-next-line no-unused-vars
  const { acepta_datos, empresa, ...data } = parsed.data;
  const whatsappUrl = whatsappLink(quoteMessage(data));

  // Honeypot: responder como si todo estuviera bien, sin guardar.
  if (empresa) return NextResponse.json({ ok: true, stored: false, whatsappUrl });

  let stored = false;
  if (isSupabaseConfigured) {
    const supabase = getSupabase();
    // Solo INSERT: la política RLS impide leer cotizaciones con la clave pública.
    const { error } = await supabase.from("cotizaciones").insert({ ...data, estado: "nueva" });
    if (error) {
      console.error("[cotizaciones] Error al guardar:", error.message);
      return NextResponse.json({ ok: false, error: "No pudimos registrar tu solicitud en este momento." }, { status: 500 });
    }
    stored = true;
  } else {
    console.warn("[cotizaciones] Supabase no configurado: la solicitud no se guardó (solo se generó el mensaje de WhatsApp).");
  }

  return NextResponse.json({ ok: true, stored, whatsappUrl });
}
