# Sistema de Gestión de Cuentas por Pagar

Aplicación web orientada al área administrativa y financiera de una empresa de
telecomunicaciones. Su propósito es facilitar el registro, seguimiento y control de las
obligaciones económicas adquiridas con proveedores.

El sistema centraliza la información de facturas, fechas de vencimiento, pagos y saldos
pendientes, y ofrece reportes para mejorar el control financiero y la toma de decisiones.
Reemplaza el control que hoy se lleva en hojas de Excel.


---

## Objetivo general

Desarrollar un sistema web que permita administrar y controlar las cuentas por pagar de una
empresa de telecomunicaciones, facilitando el seguimiento de las obligaciones con
proveedores y la generación de reportes financieros.

## Objetivos específicos

- Gestionar la información de los proveedores.
- Registrar y consultar facturas pendientes de pago.
- Controlar las fechas de emisión y vencimiento de las facturas.
- Registrar los pagos y abonos realizados a proveedores.
- Consultar los saldos pendientes y las obligaciones financieras.
- Generar estados de cuenta y reportes de balances y facturas pendientes por proveedor.
- Administrar el acceso al sistema mediante roles de usuario.

## Usuarios del sistema

| Rol | Responsabilidades |
|---|---|
| Gerente administrativa | Consultar el estado general de las cuentas por pagar, balances, obligaciones pendientes y reportes; supervisar la información registrada. |
| Analista contable | Registrar y actualizar proveedores, ingresar facturas, registrar pagos y abonos, y dar seguimiento a vencimientos y saldos. |

## Módulos principales

| Módulo | Descripción |
|---|---|
| Autenticación | Inicio de sesión y control de acceso. |
| Usuarios y roles | Administración de permisos según el perfil. |
| Proveedores | Registro y gestión de perfiles de proveedores. |
| Facturas | Registro y seguimiento de facturas, con su documento adjunto. |
| Cuentas por pagar | Control de obligaciones y saldos pendientes. |
| Pagos | Registro y consulta de pagos y abonos. |
| Reportes | Estado de cuenta por proveedor, balances y facturas pendientes. |

## Regla clave del producto

El saldo pendiente y la antigüedad de saldos se calculan automáticamente a partir de las
facturas y los pagos registrados. Nunca se digitan a mano, para evitar los errores del
control manual.

## Tecnologías

- **Frontend:** React y CSS.
- **Backend:** Node.js y Express.
- **Base de datos y archivos:** Supabase (PostgreSQL y Storage).
- **Despliegue:** Vercel.
- **Control de versiones:** Git y GitHub.
- **Pruebas:** Jest.
- **Integración continua:** GitHub Actions.
- **Calidad de código:** SonarCloud.

> Las tecnologías se consideran propuestas y podrán ajustarse durante la implementación.
> Las decisiones relevantes se documentan en `docs/adr/`.

## Documentación

- [Requisitos del sistema](docs/requisitos.md)
- [Cliente real y feature construida](docs/cliente-y-feature.md)


## Estructura del repositorio

```text
backend/             API (Node.js y Express)
frontend/            Aplicación web (React)
database/            Scripts SQL y datos semilla
  seed/
docs/                Requisitos, arquitectura, modelo de datos y ADR
  adr/
public/              Archivos estáticos (verificación, íconos)
tests/               Pruebas automatizadas
.github/workflows/   Integración continua (GitHub Actions)
.env.example         Plantilla de variables de entorno
README.md
```

## Puesta en marcha

> Comandos previstos; se actualizarán al implementar backend y frontend.

```bash
# 1. Clonar el repositorio
git clone https://github.com/jeymiturcios/gestion-cuentas-por-pagar.git
cd gestion-cuentas-por-pagar

# 2. Configurar variables de entorno
cp .env.example .env   # completar con los valores reales (nunca versionar .env)

# 3. Instalar dependencias
npm install

# 4. Ejecutar en desarrollo
npm run dev
```

## Variables de entorno

Copie `.env.example` a `.env` y complete los valores. El archivo `.env` nunca se versiona;
solo se versiona la plantilla `.env.example` sin secretos.

## Pruebas e integración continua

- **Pruebas:** Jest (unidad del cálculo de saldos, vencimientos y aging; API con Supertest).
- **CI:** GitHub Actions ejecutará instalación, lint, pruebas y build en cada push y pull request.
- **Cobertura y calidad:** reporte de cobertura de Jest y análisis en SonarCloud.

## Estado del proyecto

**En desarrollo.** Etapa inicial: documentación de requisitos, decisiones de arquitectura y
estructura del repositorio.

### Roadmap

1. Documentación base (requisitos, arquitectura, modelo de datos). 
2. Cierre de requisitos pendientes con la cliente. 
3. Backend: autenticación, proveedores, facturas y pagos.
4. Frontend: pantallas y navegación.
5. Cálculo de saldos y aging con pruebas y cobertura.
6. Reportería exportable a Excel.
7. PWA, despliegue con HTTPS y verificación.

## Confidencialidad

El sistema maneja información financiera de proveedores. Este repositorio es público y no
contiene credenciales ni secretos; los datos usados en desarrollo y pruebas son ficticios.
La información real de la empresa reside únicamente en la base de datos de producción, con
acceso mediante sesión autenticada y roles.

## Código de verificación

`LEARN-CAP-1DDC923F`

Este código identifica el proyecto para su proceso de verificación académica.

## Autora

**Jeymi Turcios**

Proyecto académico de Ingeniería en Informática, CEUTEC.
