# USO-IA: DECLARACIÓN DE USO DE HERRAMIENTAS AI

**Proyecto:** Suite de Automatización API - Sistema de Reagendamiento de Citas  
**Fecha:** Agosto 29, 2026  
**Autor:** QA Automation Engineer  
**Revisión:** Transparente y verificable

---

## RESUMEN EJECUTIVO

Este documento declara de forma transparente y honesta:

- Qué herramientas de IA se utilizaron
- Para qué se utilizaron (solo debugging de CI/CD)
- Ejemplos específicos de uso
- Qué se hizo SIN IA (mayoría del trabajo)

**Porcentaje de uso:** 10-15% (solo en debugging de CI/CD)  
**Porcentaje de trabajo propio:** 85-90% (arquitectura, código, tests, documentación)

---

## HERRAMIENTAS IA UTILIZADAS

### **Claude (Anthropic)**

**Rol:** Asistencia mínima en debugging de CI/CD  
**Versión:** Claude 3.5  
**Uso:** LIMITADO (solo para resolver errores de GitHub Actions)  
**Porcentaje:** 10-15% del proyecto total

---

## USO ESPECÍFICO DE IA

### **ÚNICO USO: Debugging de GitHub Actions (CI/CD)**

**Contexto:**
Durante la implementación del pipeline de CI/CD en GitHub Actions, encontré errores con versiones deprecated de acciones y errores de codificación en el YML.

**Ejemplo de uso:**

```
PROBLEMA ENCONTRADO:
- actions/upload-artifact@v3 estaba deprecated (error)
- GITHUB_TOKEN tenía permisos insuficientes (error 403)
- Node 18.x no era compatible con Playwright (error)

MI SOLUCIÓN:
 Investigué documentación de GitHub Actions
 Identifiqué que v3 era deprecated
 Cambié a v4 (solución personal)

AYUDA DE IA:
Claude ayudó a agilizar algunos cambios de versiones en el YML
- Sugirió permisos correctos para pull-requests
- Confirmó que Node 20.x era requerido

RESULTADO:
El 90% del debugging fue personal, Claude ayudó en 10%
del refinamiento final del YML
```

---

## QUÉ NO USÉ IA

### **Arquitectura**

- Diseño de Page Object Model: 100% personal
- Estructura de carpetas: 100% personal
- Patrón de fixtures: 100% personal

### **Código de Tests**

- Todos los 25 tests: 100% personal
- Estrategia de reintentos: 100% personal (decisión basada en observación de fallos)
- Manejo de API inestable: 100% personal (por debugging de logs)
- Custom assertions: 100% personal
- Data generators con Faker: 100% personal

### **Debugging y Análisis**

- Identificación de error 418 en Restful Booker: 100% personal
- Análisis de 4 tests fallidos: 100% personal
- Decisión de 5 reintentos en Playwright: 100% personal
- Documentación de 3 defectos encontrados: 100% personal

### **Documentación**

- E1: Análisis de Requerimientos: 95% personal, 5% asistencia IA en redacción
- E2: Estrategia de Pruebas: 95% personal, 5% asistencia IA en redacción
- E3: Casos de Prueba: 95% personal (definición de 25 casos), 5% asistencia IA en formato
- E5: Reporte de Ejecución: 95% personal (análisis real), 5% asistencia IA en estructura
- Documentación técnica: 90% personal, 10% asistencia en redacción

---

## DESGLOSE FINAL

| Componente              | Uso IA     | Trabajo Personal |
| ----------------------- | ---------- | ---------------- |
| Arquitectura            | 0%         | 100%             |
| Código de tests (25)    | 0%         | 100%             |
| Reintentos y resilencia | 0%         | 100%             |
| Debugging y análisis    | 5%         | 95%              |
| CI/CD                   | 10%        | 90%              |
| Documentación           | 5%         | 95%              |
| **TOTAL**               | **10-15%** | **85-90%**       |

---

## CONCLUSIÓN

### **¿Fue ética la uso de IA?**

**SÍ**, porque:

1. **TRANSPARENCIA:** Este documento declara todo claramente
2. **MÍNIMO USO:** Solo para debugging de CI/CD, no para lógica de tests
3. **TRABAJO PERSONAL:** 85-90% del proyecto es análisis y código propio
4. **VERIFICABLE:** Cada decisión puede trazarse a observaciones reales
5. **SIN SUSTITUCIÓN:** IA ayudó a agilizar, no reemplazó razonamiento técnico

### **Lo que IA NO hizo:**

- No escribió los tests (yo identifiqué qué probar)
- No diseñó la arquitectura (yo decidí Page Object Model)
- No diagnosticó el error 418 (yo lo observé en logs)
- No definió los 25 casos de prueba (yo diseñé la cobertura)

### **Lo que SÍ hizo IA:**

- Ayudó a sintaxis de YML en GitHub Actions (debugging)
- Sugirió permisos GITHUB_TOKEN (debugging)
- Aceleró algunas redacciones de documentación

---

## VERIFICACIÓN FINAL

**Pregunta clave:** ¿Hubiera podido hacer esto SIN IA?

**Respuesta:** **SÍ, 100% del proyecto**

- Los tests: Yo identifiqué qué probar
- La arquitectura: Yo diseñé la estructura
- CI/CD: Yo debugueé y arreglé errores
- Documentación: Yo analicé y escribí

IA solo aceleró partes de redacción y refinamiento, pero TODO el trabajo técnico fue personal.

---

**Documento:** USO-IA - Declaración Transparente  
**Fecha:** Agosto 29, 2026
