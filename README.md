# Taller 1 - Arquitectura de Software II

**Instituto Tecnológico Metropolitano - ITM**  
**Profesor:** Fray Leon Osorio Rivera

## Integrantes

- Diego Alejandro Gomez Carmona
- Danilo Jiménez Jaramillo
- Juan David Guzmán Berrio
- Juan Felipe Patiño Calderon
- Julian David Agudelo Acevedo

## Descripción

Proyecto académico que consiste en el diseño e implementación de dos APIs REST que se comunican entre sí:

- **API Festivos:** administra y calcula los días festivos de Colombia.
- **API Calendario:** consulta los festivos para generar y clasificar las fechas de un calendario anual.

## Tecnologías

| API | Tecnologías | Arquitectura |
|---|---|---|
| API Festivos | Node.js, Express, MongoDB | Por capas |
| API Calendario | Java, Spring Boot, PostgreSQL | Onion |

## Implementación

### API Festivos

API desarrollada con operaciones CRUD, consulta de festivos por año, verificación de fechas y cálculo de festivos según sus cuatro tipos. Cuenta con validaciones, conexión a MongoDB y documentación Swagger. Las funcionalidades fueron probadas correctamente.

**[Ver API Festivos](api-festivos/README.md)**

### API Calendario

Pendiente de implementación, siguiendo el modelo relacional y la arquitectura Onion definidos en el diseño.

## Diagramas

- [Modelo objetual de Festivos](diagramas/diagrama_objetual_festivos.md)
- [Arquitectura de API Festivos](diagramas/diagrama-arquitectura-apifestivos.md)
- [Modelo relacional de CalendarioLaboral](diagramas/diagrama-relacional-calendariolaboral.md)
- [Arquitectura Onion de API Calendario](diagramas/diagrama-arquitectura-apicalendario-onion.md)

## Estado del proyecto

| Componente | Estado |
|---|---|
| Diseño y diagramas | Completado |
| API Festivos | Implementada y probada |
| API Calendario | Pendiente |
| Integración entre APIs | Pendiente |