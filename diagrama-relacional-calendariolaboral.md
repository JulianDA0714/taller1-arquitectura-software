# Diagrama Relacional - Base de Datos CalendarioLaboral

``` mermaid
erDiagram
    TIPO {
        SERIAL Id PK
        VARCHAR_100 Tipo UK
    }

    CALENDARIO {
        SERIAL Id PK
        DATE Fecha UK
        INT IdTipo FK
        VARCHAR_100 Descripcion
    }

    TIPO ||--o{ CALENDARIO : clasifica
```
