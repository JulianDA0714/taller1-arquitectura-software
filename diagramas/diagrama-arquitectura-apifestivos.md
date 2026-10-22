
# Diagrama de Arquitectura - API Festivos

```mermaid
graph TD

    %% Capa de Cliente
    subgraph ClientLayer["Capa de Cliente"]
        Client["Cliente Web / Móvil / Postman / Swagger UI"]
    end

    %% Capa de Presentación
    subgraph PresentationLayer["Capa de Presentación / API"]
        Server["Inicio de aplicación<br/>server.js"]
        App["Configuración de Express<br/>app.js"]
        Routes["Rutas Express<br/>festivo.rutas.js"]
        Validators["Validadores<br/>festivo.validador.js"]
        Swagger["Documentación Swagger<br/>swagger.js"]
    end

    %% Capa de Lógica de Negocio
    subgraph BusinessLayer["Capa de Lógica de Negocio"]
        Controller["Controlador<br/>festivo.controlador.js"]

        TipoService["Servicio de Tipos de Festivo<br/>tipoFestivo.servicio.js"]

        FestivoService["Servicio de Festivos<br/>festivo.servicio.js<br/><br/>CRUD de festivos<br/>Verificación de fechas<br/>Listado por año"]

        DateService["Servicio de Cálculo de Fechas<br/>fecha.servicio.js"]
    end

    %% Capa de Acceso a Datos
    subgraph DataAccessLayer["Capa de Acceso a Datos"]
        Repository["Repositorio de Festivos<br/>festivo.repositorio.js"]
        Connection["Conexión MongoDB<br/>bd.js"]
    end

    %% Capa de Persistencia
    subgraph PersistenceLayer["Capa de Persistencia"]
        DB[("MongoDB<br/>Base de datos: festivos<br/>Colección: tipos")]
    end

    %% Inicialización de la aplicación
    Server -->|"1. Inicia aplicación"| App
    App -->|"2. Establece conexión"| Connection
    App -->|"3. Configura rutas"| Routes
    App -->|"4. Configura Swagger"| Swagger

    %% Peticiones HTTP
    Client -->|"5. Petición HTTP"| Routes
    Routes -->|"6. Valida datos"| Validators
    Validators -->|"7. Solicitud válida"| Controller

    %% Lógica de negocio
    Controller -->|"8. Operaciones de tipos"| TipoService
    Controller -->|"9. Operaciones de festivos"| FestivoService

    %% Cálculo de fechas
    FestivoService -->|"10. Solicita cálculos"| DateService
    DateService -.->|"11. Retorna fechas"| FestivoService

    %% Acceso a datos
    TipoService -->|"12. Consulta / Modifica"| Repository
    FestivoService -->|"13. Consulta / Modifica"| Repository
    Repository -->|"14. Obtiene conexión"| Connection
    Connection -->|"15. Consulta / Modifica"| DB

    %% Flujo de respuesta
    DB -.->|"16. Retorna datos"| Connection
    Connection -.->|"17. Retorna resultado"| Repository
    Repository -.->|"18. Retorna resultado"| TipoService
    Repository -.->|"19. Retorna resultado"| FestivoService
    TipoService -.->|"20. Retorna resultado"| Controller
    FestivoService -.->|"21. Retorna resultado"| Controller
    Controller -.->|"22. Respuesta HTTP (JSON o texto plano)"| Client

    %% Estilos de las capas
    style ClientLayer fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style PresentationLayer fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style BusinessLayer fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style DataAccessLayer fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style PersistenceLayer fill:#ffebee,stroke:#d32f2f,stroke-width:2px
```
