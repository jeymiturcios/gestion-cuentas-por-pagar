# Cliente real y feature construida

> Entregable 1 · Proyecto final
> Código de verificación: `LEARN-CAP-1DDC923F`

## 1. Cliente real

| Dato | Detalle |
|---|---|
| Nombre del contacto | Raquel Villalta |
| Cargo | Gerente administrativa |
| Empresa | Grupo Multicables de Cortés |
| Giro | Telecomunicaciones |
| Ubicación | Bo. El Banco, Choloma, Cortés, Honduras |
| Usuarios del sistema | Gerente administrativa y Analista contable |

**Cómo se conoció al cliente:** Se conocio a través de la madre de la estudiante, ya que ella labora para la empresa como 
asesora de ventas en campo.

**Contexto del negocio:** Grupo Multicables de Cortés adquiere bienes y servicios de
múltiples proveedores (materiales, servicios de red, etc.). Hoy el área
administrativa controla cada cuenta por pagar en hojas de Excel, lo que dificulta conocer
el saldo real, cumplir los vencimientos y resguardar la documentación.

## 2. Feature construida

**Feature principal:** Gestión de Cuentas por Pagar a Proveedores.

Permite al área administrativa registrar y controlar las obligaciones financieras
adquiridas con sus proveedores: facturas, documentos adjuntos, condiciones de crédito y
vencimientos, pagos y abonos, cálculo automático de saldos, estado de cuenta por proveedor
y reportes financieros exportables.

### Problema concreto que resuelve

El control en Excel genera:

- saldos calculados manualmente (propensos a error);
- facturas y comprobantes dispersos, sin trazabilidad;
- falta de alertas antes del vencimiento;
- reportes que consumen tiempo y no siempre están actualizados;
- acceso sin control a información financiera confidencial.

## 3. Alcance funcional

1. **Proveedores:** registrar, consultar y actualizar (razón social, nombre comercial, RTN, teléfono).
2. **Facturas:** fecha, vencimiento, días de crédito, proveedor, CAI, rango de CAI, número,
   moneda (Lempiras/Dólares), SubTotal, ISV y Total.
3. **Documentos adjuntos:** subir, visualizar y descargar facturas en PDF o imagen.
4. **Vencimientos:** cálculo automático y alertas de facturas próximas a vencer o en mora.
5. **Pagos y abonos:** parciales o totales, con forma de pago (cheque/transferencia),
   banco, número de cuenta y referencia.
6. **Saldos automáticos:** Total de la factura menos los pagos aplicados.
7. **Estado de cuenta por proveedor:** movimientos, saldos y distribución de la mora,
   exportable a Excel.
8. **Reportería:** balance por proveedor y facturas pendientes de pago.

## 4. Usuarios y valor

- **Gerente administrativa:** obtiene una visión consolidada, balances y reportes para
  supervisar y tomar decisiones.
- **Analista contable:** registra proveedores, facturas y pagos, y da seguimiento a los
  vencimientos.

**Valor para el cliente:** información centralizada y confiable, menos errores, control de
vencimientos, respaldo documental y reportes inmediatos, manteniendo la confidencialidad
de los datos financieros.

## 5. Evidencia de la necesidad

Requerimientos recibidos por correo de la clienta (resumen):

- Ingreso de facturas con CAI y rango de CAI, SubTotal, ISV y Total.
- Procesamiento de pagos/abonos con banco, cuenta y referencia.
- Estado de cuenta por proveedor exportable a Excel.
- Perfiles de proveedores (teléfono, razón social, nombre comercial).
- Reportería de balances por proveedor y facturas pendientes.
- Manejo confidencial de la información.
