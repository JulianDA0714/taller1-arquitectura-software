# Taller 1 - Arquitectura de Software II

## Instituto Tecnológico Metropolitano - ITM

**Materia:** Arquitectura de Software II  
**Profesor:** Fray Leon Osorio Rivera

## Integrantes

- Diego Alejandro Gomez Carmona
- Danilo Jiménez Jaramillo
- Juan David Guzmán Berrio
- Juan Felipe Patiño Calderon
- Julian David Agudelo Acevedo

## Descripción

El Taller 1 consiste en el diseño de una solución basada en **dos APIs que se comunican entre sí**: **API Festivos** y **API Calendario**.

La **API Festivos** se encarga de administrar y calcular los días festivos, mientras que la **API Calendario** consulta esa información para construir un calendario anual y clasificar sus fechas como días laborales, fines de semana o festivos.

En esta etapa del taller se presentan los modelos de datos y los diagramas de arquitectura de ambas APIs. Su implementación corresponde a una etapa posterior.

## API Festivos

**Tecnologías propuestas:** Express JS y MongoDB.

Esta API contempla las siguientes funcionalidades:

- Administración de festivos mediante operaciones CRUD.
- Verificación de si una fecha determinada es festiva.
- Consulta de los festivos correspondientes a un año.
- Cálculo de fechas festivas según las reglas aplicables, incluyendo fechas fijas, traslados al lunes y fechas relacionadas con la Pascua.

Para su diseño se utiliza una arquitectura por capas, con separación de rutas, controlador, servicios, acceso a datos y lógica de cálculo de fechas. La información de los festivos se organiza en MongoDB mediante tipos de festivo y sus respectivas reglas.

**Diagramas:**

- [Diagrama objetual de Festivos](diagrama_objetual_festivos.md)
- [Diagrama de arquitectura de API Festivos](diagrama-arquitectura-apifestivos.md)

## API Calendario

**Tecnologías propuestas:** Spring Boot, Java y PostgreSQL.

Esta API consulta los festivos de un año a través de la API Festivos y permite construir un calendario con la clasificación de cada fecha. El calendario diferencia entre **días laborales, fines de semana y días festivos**.

Su diseño sigue la **arquitectura Onion** presentada en clase, organizada en cinco módulos:

- **Dominio:** entidades `Calendario` y `Tipo`, y DTOs como `CalendarioDto` y `FestivoDto`.
- **Core:** interfaces de servicios, repositorios y comunicación con la API Festivos.
- **Aplicación:** implementación de la lógica de negocio mediante `CalendarioServicio`.
- **Infraestructura:** persistencia con Spring Data JPA, entidades JPA, mapeadores, conexión a PostgreSQL e integración HTTP con la API Festivos.
- **Presentación:** punto de entrada de Spring Boot, controlador REST y componentes de configuración y manejo de excepciones.

La base de datos **CalendarioLaboral** contiene dos tablas:

- **Tipo:** almacena los tipos de día, como laboral, fin de semana y festivo.
- **Calendario:** almacena la fecha, su tipo mediante una clave foránea y una descripción opcional.

El uso de `CalendarioDto` permite presentar el nombre del tipo de día sin exponer necesariamente el identificador interno utilizado en la base de datos.

**Diagramas:**

- [Diagrama relacional de CalendarioLaboral](diagrama-relacional-calendariolaboral.md)
- [Diagrama de arquitectura Onion de API Calendario](diagrama-arquitectura-apicalendario-onion.md)

## Relación entre las APIs

1. La API Calendario solicita a la API Festivos los días festivos de un año determinado.
2. La API Festivos calcula y devuelve las fechas festivas correspondientes.
3. La API Calendario utiliza esa información para clasificar las fechas del año.
4. El calendario se almacena en PostgreSQL y puede consultarse mediante la API Calendario.

## Archivos del repositorio

| Archivo | Contenido |
| --- | --- |
| `README.md` | Descripción general del taller y de las dos APIs. |
| `diagrama_objetual_festivos.md` | Modelo objetual de los tipos y festivos. |
| `diagrama-arquitectura-apifestivos.md` | Arquitectura de la API Festivos. |
| `diagrama-relacional-calendariolaboral.md` | Modelo relacional de PostgreSQL. |
| `diagrama-arquitectura-apicalendario-onion.md` | Arquitectura Onion de la API Calendario. |

## Estado del proyecto

**Fase de diseño:** modelos y diagramas de las dos APIs documentados en este repositorio. La implementación de los servicios corresponde a la siguiente fase del taller.
