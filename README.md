# Prueba Técnica QA - DonDoctor

## Suite Automatizada de Pruebas API REST

![Tests](https://github.com/wilmer2001/qa-automation-api-testing/actions/workflows/ci.yml/badge.svg)

Suite completa de pruebas automatizadas para validar la funcionalidad de **reagendamiento de citas médicas** en la plataforma DonDoctor.

### Estadísticas

- **Tests**: 25 (5 happy path + 7 negative + 5 edge cases + 8 contract)
- **Framework**: Playwright + TypeScript
- **API**: Restful Booker (análogo funcional)
- **CI/CD**: GitHub Actions
- **Reportes**: HTML + JSON

### Quick Start

#### Requisitos

- Node.js 18+
- npm 9+
- Git

#### Instalación

```bash
git clone https://github.com/wilmer2001/qa-automation-api-testing.git
cd qa-automation-api-testing

npm install
npx playwright install
```

#### Configurar Variables de Entorno

```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales
```

#### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar con interfaz visual
npm run test:ui

# Modo debug
npm run test:debug

# Ver reporte HTML
npm run test:report
```

### Categorías de Pruebas

#### Happy Path (5 tests)

Validación de flujos positivos:

- Autenticación válida
- Crear reserva
- Consultar reserva
- Actualizar reserva
- Cancelar reserva

#### Negative Tests (7 tests)

Validación de errores:

- Autenticación con credenciales inválidas
- Datos incompletos
- Precio negativo
- Fechas inversas
- Sin nombre
- Operaciones sin token

#### Edge Cases (5 tests)

Validación de límites:

- Precio mínimo (0)
- Precio muy alto
- Límite de 30 días
- Múltiples créaciones simultáneas
- Múltiples cancelaciones simultáneas

#### Contract Tests (8 tests)

Validación de esquema:

- Schema de autenticación
- Schema de create booking
- Schema de get booking
- Tipos de campos (string, number, boolean)
- Estructura de bookingdates

### Estructura del Proyecto

```
src/
├── config/              # Configuración centralizada
│   └── env.config.ts
├── api/                 # Lógica de APIs
│   ├── base/
│   │   └── base-request.ts
│   ├── auth/
│   │   └── auth.api.ts
│   └── booking/
│       ├── booking.api.ts
│       └── booking.types.ts
├── utils/               # Funciones transversales
│   ├── logger.ts
│   ├── data-generators.ts
│   └── assertions.ts
├── fixtures/
│   └── api.fixtures.ts
└── tests/               # Suite de pruebas
    ├── 01-happy-path/
    ├── 02-negative/
    ├── 03-edge-cases/
    └── 04-contract/
```

### Configuración

- **Playwright**: `playwright.config.ts`
- **TypeScript**: `tsconfig.json`
- **Ambiente**: `.env.local`
- **CI/CD**: `.github/workflows/ci.yml`

### Reportes

Después de ejecutar `npm test`:

```bash
# Ver reporte HTML interactivo
npm run test:report

# Los reportes se guardan en:
# - test-results/results.json (JSON)
# - test-results/junit.xml (JUnit XML)
# - playwright-report/ (HTML interactivo)
```

### GitHub Actions

El pipeline se ejecuta automáticamente en:

- Push a `feature/Automatizacion`
- Pull requests

Ver historial: [Actions](https://github.com/wilmer2001/qa-automation-api-testing/actions)

### Git Commits

```
 init: setup inicial
 config: actualizar playwright y tsconfig
 feat: implementar base de APIs y primer test
 feat: agregar utilidades y segundo test
 test: agregar 3 tests happy path
 test: agregar 5 tests negativos
 test: agregar edge cases y contract tests (10 nuevos)
 ci: configurar GitHub Actions pipeline
```

### Decisiones de Arquitectura

- **Playwright**: Fixtures automáticas, reportes profesionales
- **TypeScript strict**: Validación de tipos en tiempo de compilación
- **Axios**: Interceptores y manejo centralizado de errores
- **Winston**: Logging estructurado
- **20 tests**: Cobertura inteligente sin exceso

Ver más: `docs/DECISIONES-ARQUITECTURA.md`

### Tecnologías

- Playwright 1.62.1
- TypeScript 7.0.2
- Axios 1.20.0
- Winston 3.19.0
- Faker 10.6.0

### 📧 Contacto

Creado como prueba técnica para DonDoctor.

---

**Última actualización**: 29 de agosto de 2026
