-- ============================================================
-- Migracion 02: CAI por proveedor
-- Motivo: la cliente confirmo (19/11/2026) que el CAI se configura
-- una sola vez por proveedor, con su rango autorizado y fecha de
-- vencimiento, y que el sistema debe alertar cuando este proximo a vencer.
-- La columna cai de facturas se conserva como copia historica del CAI
-- usado al emitir cada factura.
-- ============================================================

alter table proveedores
  add column cai              text,
  add column cai_rango_desde  text,
  add column cai_rango_hasta  text,
  add column cai_fecha_limite date;

create index idx_proveedores_cai_vencimiento
  on proveedores (empresa_id, cai_fecha_limite);