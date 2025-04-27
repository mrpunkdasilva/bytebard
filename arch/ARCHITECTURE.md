# 📐 Arquitetura Hephestos

## 📊 Diagrama de Classes

```mermaid
classDiagram
    class User {
        +String id
        +String email
        +String name
        +String[] preferences
        +createDocument()
        +updateProfile()
    }

    class Document {
        +String id
        +String title
        +String content
        +String[] tags
        +DateTime createdAt
        +DateTime updatedAt
        +save()
        +export(format)
        +share(userId)
    }

    class Folder {
        +String id
        +String name
        +Folder[] subfolders
        +Document[] documents
        +addDocument()
        +removeDocument()
        +move()
    }

    class Tag {
        +String id
        +String name
        +String color
        +updateColor()
    }

    class Theme {
        +String id
        +String name
        +Map styles
        +apply()
        +customize()
    }

    class Export {
        +Document document
        +String format
        +Map options
        +generate()
    }

    class Collaboration {
        +Document document
        +User[] participants
        +addParticipant()
        +removeParticipant()
        +syncChanges()
    }

    User "1" -- "*" Document : owns
    User "1" -- "*" Folder : manages
    Document "*" -- "*" Tag : has
    Document "1" -- "1" Folder : belongsTo
    Document "1" -- "1" Collaboration : enables
    Document "1" -- "*" Export : generates
    User "1" -- "1" Theme : uses
```

## 🔄 Diagrama de Sequência - Edição Colaborativa

```mermaid
sequenceDiagram
    participant U1 as User1
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database
    participant U2 as User2

    U1->>FE: Edita documento
    FE->>BE: Envia alterações
    BE->>DB: Salva alterações
    BE->>U2: Notifica mudanças (WebSocket)
    U2->>FE: Atualiza visualização
    FE->>U2: Mostra alterações
```

## 🏗 Diagrama de Componentes

```mermaid
graph TD
    A[Editor Component] --> B[Preview Component]
    A --> C[Toolbar Component]
    D[File Explorer] --> E[Folder Tree]
    D --> F[Search Component]
    G[Export Manager] --> H[PDF Generator]
    G --> I[HTML Generator]
    J[Collaboration Module] --> K[WebSocket Handler]
    J --> L[Conflict Resolver]
    M[Theme Manager] --> N[Style Provider]
```

## 🗄 Modelo de Dados

```mermaid
erDiagram
    USER ||--o{ DOCUMENT : creates
    USER ||--o{ FOLDER : owns
    DOCUMENT }|--|| FOLDER : belongsTo
    DOCUMENT }o--o{ TAG : has
    DOCUMENT ||--o{ COLLABORATION : enables
    COLLABORATION }o--o{ USER : involves
    USER ||--|| THEME : uses

    USER {
        string id PK
        string email
        string name
        jsonb preferences
        timestamp createdAt
    }

    DOCUMENT {
        string id PK
        string title
        text content
        string[] tags
        string folderId FK
        string ownerId FK
        timestamp createdAt
        timestamp updatedAt
    }

    FOLDER {
        string id PK
        string name
        string parentId FK
        string ownerId FK
    }

    TAG {
        string id PK
        string name
        string color
    }

    THEME {
        string id PK
        string name
        jsonb styles
    }

    COLLABORATION {
        string id PK
        string documentId FK
        string[] userIds
        jsonb permissions
    }
```

## 📝 Notas de Arquitetura

### Decisões Técnicas
- Uso de WebSocket para colaboração em tempo real
- Armazenamento local com IndexedDB para modo offline
- Sistema de plugins baseado em eventos
- Arquitetura modular para facilitar extensões

### Considerações de Segurança
- Autenticação JWT
- Criptografia end-to-end para documentos compartilhados
- Validação de permissões em tempo real
- Sanitização de conteúdo Markdown

### Escalabilidade
- Cache distribuído com Redis
- Sharding de banco de dados
- CDN para assets estáticos
- Queue system para processamento de exportação

### Monitoramento
- Logging centralizado
- Métricas de performance
- Rastreamento de erros
- Analytics de uso

---

> Este documento será atualizado conforme a arquitetura evolui.

## 📝 Arquitetura MVP com Firebase

### Serviços Firebase (Plano Gratuito)
- **Firebase Auth**: Autenticação completa
- **Firestore**: Banco NoSQL para documentos
- **Firebase Hosting**: Para hospedar a aplicação
- **Firebase Storage**: Para backups (opcional)

### Limites Gratuitos
- 50K leituras/dia
- 20K escritas/dia
- 1GB armazenamento
- 10GB transferência/mês
- 1GB hosting

### Estrutura Firestore
```mermaid
graph TD
    subgraph Collections
        A[users] --> B[documents]
        B --> C[tags]
    end

    subgraph Documents
        D[user] --> |campos| E[email<br/>name<br/>preferences]
        F[document] --> |campos| G[title<br/>content<br/>tags<br/>updatedAt<br/>userId]
        H[tag] --> |campos| I[name<br/>color]
    end
```

### Modelo de Dados (NoSQL)

```javascript
// users/{userId}
{
  email: string,
  name: string,
  preferences: {
    theme: string,
    fontSize: number
  }
}

// documents/{documentId}
{
  title: string,
  content: string,
  tags: string[],
  userId: string,
  createdAt: timestamp,
  updatedAt: timestamp
}

// tags/{tagId}
{
  name: string,
  color: string
}
```

### Estratégias de Otimização

1. **Redução de Custos**:
   - Paginação (10 docs por vez)
   - Cache local com IndexedDB
   - Batch updates
   - Offline first

2. **Regras de Segurança**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /documents/{docId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /tags/{tagId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

### Arquitetura Simplificada
```mermaid
graph TD
    A[Next.js App] --> B[Firebase Auth]
    A --> C[Firestore]
    A --> D[Firebase Hosting]
    
    subgraph "Cliente"
        E[IndexedDB] --> A
        F[Local Storage] --> A
    end
```

### Vantagens desta Abordagem
1. **Setup Rápido**: Firebase tem SDK pronto
2. **Sem Backend**: Serverless completo
3. **Escalável**: Cresce conforme necessidade
4. **Segurança**: Autenticação e regras prontas
5. **Real-time**: Updates em tempo real inclusos

### Limitações Iniciais
- Máximo 1000 documentos por usuário
- Tamanho máximo de 1MB por documento
- Sem histórico de versões inicial
- Estrutura flat (sem pastas)

### Evolução Futura
1. **Quando precisar escalar**:
   - Upgrade para plano Blaze (pay-as-you-go)
   - Implementar Cloud Functions para processamento pesado
   - Adicionar Firebase Analytics

2. **Features Futuras**:
   - Cloud Storage para anexos
   - Cloud Functions para exportação
   - Backup automático
