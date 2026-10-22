# API Festivos

API REST desarrollada con **Node.js, Express y MongoDB** para administrar y consultar los días festivos de Colombia.

Este proyecto forma parte del taller de Arquitectura de Software II del Instituto Tecnológico Metropolitano (ITM).

## Funcionalidades

- Consultar los festivos correspondientes a un año.
- Verificar si una fecha es festiva (respuesta en texto plano).
- Agregar nuevos festivos.
- Actualizar festivos existentes.
- Eliminar festivos.
- Calcular fechas según los cuatro tipos de festivos: fechas fijas, traslados al lunes y fechas relacionadas con la Pascua.

## Arquitectura

La aplicación utiliza una arquitectura por capas, con separación de responsabilidades:

- **Rutas:** definición de los endpoints de la API.
- **Controlador:** recepción de solicitudes y generación de respuestas HTTP.
- **Servicios:** lógica de negocio, gestión de tipos de festivos y cálculo de fechas.
- **Repositorios:** operaciones sobre MongoDB y administración de la conexión a la base de datos.
- **Validadores:** validación de los parámetros y datos recibidos.
- **Configuración:** parámetros de conexión a MongoDB y documentación Swagger.

Los componentes principales de la aplicación se organizan mediante clases, conservando la separación entre las distintas capas.

El archivo `app.js` configura Express, los middlewares y las rutas, mientras que `server.js` inicia la aplicación y establece la conexión con MongoDB.

Los festivos se almacenan en la base de datos `festivos`, dentro de la colección `tipos`.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/festivos/tipos` | Consultar los tipos de festivo |
| GET | `/api/festivos/:anio` | Consultar festivos de un año |
| GET | `/api/festivos/verificar/:anio/:mes/:dia` | Verificar si una fecha es festiva |
| POST | `/api/festivos/:idTipo` | Agregar un festivo |
| PUT | `/api/festivos/:idTipo/:nombre` | Actualizar un festivo |
| DELETE | `/api/festivos/:idTipo/:nombre` | Eliminar un festivo |

## Ejecución local

Se requiere Node.js, npm y MongoDB en ejecución local, con la base de datos `festivos` y la colección `tipos` previamente cargadas.

Desde la carpeta `api-festivos`, instalar las dependencias:

```bash
npm install
```

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

Para iniciar la aplicación normalmente:

```bash
npm start
```

La API estará disponible en:

http://localhost:3030

## Documentación Swagger

Los endpoints están documentados mediante Swagger y se pueden consultar desde:

http://localhost:3030/api-docs

## Estado

La API Festivos se encuentra implementada y organizada mediante una arquitectura por capas.

Se realizaron pruebas de consulta, verificación de fechas, validación de datos y operaciones de creación, actualización y eliminación sobre MongoDB.

También se verificó el funcionamiento de los endpoints y su documentación en Swagger después de la reorganización de la arquitectura.