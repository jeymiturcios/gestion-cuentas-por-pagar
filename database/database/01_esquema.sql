-- ============================================================
-- Sistema de Gestion de Cuentas por Pagar
-- Esquema de base de datos - PostgreSQL (Supabase)
-- Codigo de verificacion: LEARN-CAP-1DDC923F
-- ============================================================

--Los tipos enumerados:
create type rol_usuario as enum ('GERENTE', 'ANALISTA');
create type tipo_moneda as enum ('HNL', 'USD');
create type forma_pago  as enum ('CHEQUE', 'TRANSFERENCIA');
create type banco       as enum ('BAC', 'OCCIDENTE', 'ATLANTIDA', 'FICOHSA', 'BANPAIS', 'PROMERICA');

--Los tipos enumerados:
create table empresas (
  id               uuid primary key default gen_random_uuid(),
  razon_social     text not null,
  nombre_comercial text not null,
  rtn              text not null unique,
  activo           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

--Usuarios:
create table usuarios (
  id            uuid primary key default gen_random_uuid(),
  nombre        text not null,
  email         text not null unique,
  password_hash text not null,
  activo        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

--La tabla que une a la empresa con usuarios
create table empresa_usuarios (
  empresa_id uuid not null references empresas(id) on delete cascade,
  usuario_id uuid not null references usuarios(id) on delete cascade,
  rol        rol_usuario not null default 'ANALISTA',
  activo     boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (empresa_id, usuario_id)
);
