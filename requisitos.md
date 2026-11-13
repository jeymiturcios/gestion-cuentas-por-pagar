# Requisitos del sistema

> Código de verificación: `LEARN-CAP-1DDC923F`

Fuente: reunión con la cliente del sábado 07/11/2026, correo de seguimiento y documentos de ejemplo. Este documento solo contiene campos y reglas; no incluye datos reales de proveedores ni de la empresa.

## 1. Ingreso de facturas

Campos requeridos:

- Fecha de la factura
- Fecha de vencimiento
- Días de crédito
- Proveedor
- Rango de CAI
- Número de factura
- Subtotal (en lempiras o dólares)
- ISV
- Total

Reglas:

- El vencimiento se calcula a partir de la fecha de la factura y los días de crédito.
- Cada factura se registra en una sola moneda (lempiras o dólares).
- Cada factura puede tener un documento adjunto (PDF, JPG o PNG, máximo 10 MB) vinculado a ella.

## 2. Procesar pagos o abonos

Campos requeridos:

- Fecha
- Monto (en lempiras o dólares)
- Forma de pago: cheque o transferencia
- Banco: BAC, Occidente, Atlántida, Ficohsa, Banpaís o Promerica
- Número de cuenta bancaria
- Número de cheque o referencia de la transferencia
- Proveedor (selección)
- Factura a pagar (selección)

Reglas:

- Los abonos se aplican por factura individual.
- Un cheque puede pagar dos o más facturas, según si están vencidas.
- El saldo de cada factura se recalcula automáticamente.

## 3. Reportería

- Estado de cuenta por proveedor, exportable a Excel.
- Balances por proveedor.
- Facturas pendientes de pago.

El estado de cuenta de ejemplo incluye: fecha, tipo, número, referencia, fecha de vencimiento, días vencidos, monto del documento, monto pendiente, saldo acumulado, saldo total y distribución de la mora (no vencido, 1-30, 31-60, 61-90 y más de 91 días).

Regla: los días vencidos son la diferencia entre la fecha de corte del reporte y la fecha de vencimiento.

## 4. Proveedores

El sistema debe permitir crear y mantener perfiles de proveedores con, al menos: nombre o razón social, nombre comercial y número de teléfono. Se cargará un listado inicial y se agregarán más proveedores con el tiempo.

## 5. Usuarios y confidencialidad

- Dos perfiles: Gerente administrativa y Analista contable.
- Toda la información debe manejarse de forma confidencial: acceso solo con sesión, archivos privados y datos ficticios en repositorio, demostraciones y capturas.

## Puntos pendientes de confirmar con la cliente

1. Si un mismo pago puede distribuirse entre varias facturas desde la pantalla de pago, y con qué prioridad.
2. Manejo de dos monedas: saldos separados por moneda o conversión con tipo de cambio.
3. Si el ISV se digita o se calcula, y con qué porcentaje.
4. Formato del rango de CAI: código del CAI, número inicial, número final y fecha límite de emisión.
5. Si se requieren recargos por mora, y las líneas de importe exento y exonerado de la factura.

