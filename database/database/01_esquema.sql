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

--La tabla de empresas:
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


--Proveedores:
create table proveedores (
  id               uuid primary key default gen_random_uuid(),
  empresa_id       uuid not null references empresas(id) on delete cascade,
  razon_social     text not null,
  nombre_comercial text not null,
  rtn              text,
  telefono         text,
  email            text,
  activo           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint uq_proveedores_id_empresa  unique (id, empresa_id),
  constraint uq_proveedores_rtn_empresa unique (empresa_id, rtn)
);


--Facturas:
create table facturas (
  id                uuid primary key default gen_random_uuid(),
  empresa_id        uuid not null references empresas(id) on delete cascade,
  proveedor_id      uuid not null,
  numero_factura    text not null,
  cai               text,
  rango_cai         text,
  fecha_factura     date not null,
  dias_credito      integer not null default 30 check (dias_credito >= 0),
  fecha_vencimiento date not null,
  moneda            tipo_moneda not null default 'HNL',
  tipo_cambio       numeric(12,4) not null default 1 check (tipo_cambio > 0),
  subtotal          numeric(14,2) not null check (subtotal >= 0),
  isv_porcentaje    numeric(5,2) not null default 15 check (isv_porcentaje between 0 and 100),
  isv               numeric(14,2) not null check (isv >= 0),
  total             numeric(14,2) not null check (total >= 0),
  concepto          text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint ck_facturas_total check (total = subtotal + isv),
  constraint uq_facturas_id_empresa     unique (id, empresa_id),
  constraint uq_facturas_numero_empresa unique (empresa_id, proveedor_id, numero_factura),
  constraint fk_facturas_proveedor_empresa
    foreign key (proveedor_id, empresa_id)
    references proveedores (id, empresa_id) on delete restrict
);

--
