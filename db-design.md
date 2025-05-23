```mermaid
---
title: Jackal Polls Design
---
erDiagram

    USER {
        ObjectId _id  PK
        String fullname
        String email UK
        String password
    }
    POLL {
        ObjectId _id PK
        String name
        Array options
        String status
    }
    VOTE {
        ObjectId _id PK
        ObjectId user_id FK
        ObjectId poll_id FK
        String options_selected
    }


    USER ||--o{ VOTE : ""
    POLL ||--o{ VOTE : ""
```
