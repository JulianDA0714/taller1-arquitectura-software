# Diagrama de Arquitectura - API Calendario

```mermaid
graph TD

    %% Módulo Dominio
    subgraph Dominio["Módulo: dominio"]
        Entidades["Calendario / Tipo"]
        DTOs["FestivoDto / CalendarioDto"]
    end

    %% Módulo Core
    subgraph Core["Módulo: core"]
        InterfacesServicio["ICalendarioServicio"]
        InterfacesRepo["ICalendarioRepositorio / ITipoRepositorio"]
        InterfacesIntegracion["IFestivoServicioExterno"]
    end

    %% Módulo Aplicación
    subgraph Aplicacion["Módulo: aplicacion"]
        ServiciosApp["CalendarioServicio"]
    end

    %% Módulo Infraestructura
    subgraph Infraestructura["Módulo: infraestructura"]
        RepositoriosImpl["CalendarioRepositorio / TipoRepositorio"]
        RepositoriosJPA["ICalendarioRepositorioJpa / ITipoRepositorioJpa"]
        EntidadesJPA["CalendarioEntidad / TipoEntidad"]
        Mapeadores["CalendarioMapeador / TipoMapeador"]
        IntegracionExt["FestivoServicioExterno / HttpServicio"]
        DB[("Base de Datos: PostgreSQL<br/>CalendarioLaboral")]
        APIExterna["API Festivos<br/>Express JS + MongoDB"]
    end

    %% Módulo Presentación
    subgraph Presentacion["Módulo: presentacion"]
        ApiApp["ApiApplication<br/>SpringBootApplication"]
        Controladores["CalendarioControlador"]
        Configuracion["SwaggerConfig"]
        Handlers["ExcepcionesGlobalesHandler"]
    end

    %% Relaciones Aplicación -> Core / Dominio
    ServiciosApp -.->|Implementa| InterfacesServicio
    ServiciosApp -->|Inyecta| InterfacesRepo
    ServiciosApp -->|Inyecta| InterfacesIntegracion
    ServiciosApp -->|Maneja| Entidades
    ServiciosApp -->|Usa| DTOs

    %% Relaciones Infraestructura -> Core / Dominio
    RepositoriosImpl -.->|Implementa| InterfacesRepo
    RepositoriosImpl -->|Inyecta| RepositoriosJPA
    RepositoriosImpl -->|Usa| Mapeadores
    Mapeadores -->|Transforma| Entidades
    Mapeadores -->|Transforma| EntidadesJPA
    IntegracionExt -.->|Implementa| InterfacesIntegracion
    IntegracionExt -->|HTTP GET festivos por año| APIExterna
    IntegracionExt -->|Usa| DTOs

    %% Relaciones JPA -> Base de Datos
    RepositoriosJPA -->|Spring Data JPA / SQL| DB
    EntidadesJPA -->|Mapeo ORM Entity| DB

    %% Relaciones Presentación -> Core / Dominio
    Controladores -->|Inyecta| InterfacesServicio
    Controladores -->|Usa| DTOs
    Controladores -->|Usa| Entidades

```
