```mermaid
graph TD

    %% Cliente / Capa de Presentación Externa
    subgraph ClientLayer [Capa de Cliente]
        Client[Cliente Web / Móvil / Postman / Swagger UI]
    end

    %% Capa de Entrada y Enrutamiento
    subgraph PresentationLayer [Capa de Presentación / API]
        Index[index.js / app.js]
        Routes[Rutas Express<br/><i>festivo.rutas.js</i>]
        Validators[Middlewares / Validadores<br/><i>festivo.validador.js</i>]
    end

    %% Capa de Lógica de Negocio
    subgraph BusinessLayer [Capa de Lógica de Negocio]
        Controllers[Controladores<br/><i>festivo.controlador.js</i>]
        DateService[Servicio de cálculo de fechas<br/><i>fecha.servicio.js</i>]
    end

    %% Capa de Acceso a Datos
    subgraph DataAccessLayer [Capa de Acceso a Datos]
        Repository[Repositorio<br/><i>festivo.repositorio.js</i>]
    end

    %% Capa de Persistencia
    subgraph PersistenceLayer [Capa de Persistencia]
        DB[(Base de Datos - MongoDB<br/><i>festivos</i>)]
    end

    %% Operaciones de la API
    Operations[Operaciones API<br/><i>CRUD Festivos<br/>Verificación de fecha festiva<br/>Listado de festivos por año</i>]

    %% Flujo de la Petición
    Client -->|1. Petición HTTP| Index
    Index -->|2. Delega a| Routes
    Routes -->|3. Valida datos| Validators
    Validators -->|4. Pasa filtro| Controllers
    Controllers -->|5. Ejecuta operación| Operations
    Operations -->|6. Solicita lógica| DateService
    Operations -->|7. Consulta / Modifica| Repository
    DateService -->|8. Consulta información| Repository
    Repository -->|9. Consulta / Modifica| DB

    %% Flujo de Respuesta
    DB -.->|10. Retorna datos| Repository
    Repository -.->|11. Retorna resultado| Operations
    DateService -.->|12. Retorna fecha calculada| Operations
    Operations -.->|13. Retorna resultado| Controllers
    Controllers -.->|14. Respuesta JSON| Client

    %% Estilos de Nodos
    style ClientLayer fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style PresentationLayer fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style BusinessLayer fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style DataAccessLayer fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style PersistenceLayer fill:#ffebee,stroke:#d32f2f,stroke-width:2px