-- =====================================================================
-- Zen Travel Medellín · Base de datos (Supabase / PostgreSQL)
-- Cómo usarlo: Supabase → SQL Editor → New query → pegar todo → Run.
-- Se puede correr más de una vez sin dañar nada.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Cotizaciones (formulario /cotizar)
-- ---------------------------------------------------------------------
create table if not exists public.cotizaciones (
  id             bigint generated always as identity primary key,
  creada_en      timestamptz not null default now(),
  nombre         text        not null check (char_length(nombre) between 3 and 80),
  telefono       text        not null check (char_length(telefono) between 7 and 20),
  correo         text        not null check (char_length(correo) between 5 and 254),
  destino        text        not null check (char_length(destino) between 1 and 60),
  fecha_salida   date        not null,
  fecha_regreso  date        check (fecha_regreso is null or fecha_regreso >= fecha_salida),
  adultos        smallint    not null check (adultos between 1 and 30),
  ninos          smallint    not null default 0 check (ninos between 0 and 20),
  mensaje        text        check (char_length(mensaje) <= 500),
  autoriza_datos boolean     not null check (autoriza_datos),  -- Ley 1581 de 2012
  -- Para que la agencia lleve el seguimiento desde el Table Editor
  estado         text        not null default 'nueva'
                 check (estado in ('nueva', 'en_proceso', 'cerrada'))
);

-- ---------------------------------------------------------------------
-- 2. Mensajes de contacto (formulario /contacto)
-- ---------------------------------------------------------------------
create table if not exists public.mensajes_contacto (
  id             bigint generated always as identity primary key,
  creado_en      timestamptz not null default now(),
  nombre         text        not null check (char_length(nombre) between 3 and 80),
  correo         text        not null check (char_length(correo) between 5 and 254),
  telefono       text        check (telefono is null or char_length(telefono) between 7 and 20),
  mensaje        text        not null check (char_length(mensaje) between 10 and 1000),
  autoriza_datos boolean     not null check (autoriza_datos),
  leido          boolean     not null default false
);

-- ---------------------------------------------------------------------
-- 3. Seguridad (RLS = Row Level Security)
-- Con RLS activo, NADIE puede leer ni cambiar las tablas, salvo lo que
-- permitan las políticas de abajo.
-- La página solo puede INSERTAR (enviar) filas nuevas. No puede leer,
-- editar ni borrar: así nadie puede ver los datos de otros clientes.
-- La agencia ve todo desde el panel de Supabase (Table Editor).
-- ---------------------------------------------------------------------
alter table public.cotizaciones      enable row level security;
alter table public.mensajes_contacto enable row level security;

drop policy if exists "La web puede enviar cotizaciones" on public.cotizaciones;
create policy "La web puede enviar cotizaciones"
  on public.cotizaciones for insert
  to anon
  with check (estado = 'nueva');

drop policy if exists "La web puede enviar mensajes" on public.mensajes_contacto;
create policy "La web puede enviar mensajes"
  on public.mensajes_contacto for insert
  to anon
  with check (leido = false);

-- Índices para ver primero lo más reciente en el panel
create index if not exists cotizaciones_creada_en_idx on public.cotizaciones (creada_en desc);
create index if not exists mensajes_creado_en_idx     on public.mensajes_contacto (creado_en desc);
