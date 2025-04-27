# 🔮 HEPHESTOS ROADMAP - MVP com Firebase

## 🎯 MVP (Q1 2025)

### 📝 Editor Base
- [ ] Setup inicial com Next.js + Firebase
- [ ] Autenticação com Google (Firebase Auth)
- [ ] Editor Markdown básico (CodeMirror)
- [ ] Preview em tempo real
- [ ] Auto-save no Firestore
- [ ] Tema cyberpunk básico

### 🏷 Organização Básica
- [ ] CRUD de documentos no Firestore
- [ ] Sistema simples de tags
- [ ] Busca por título e conteúdo
- [ ] Lista de documentos recentes
- [ ] Modo offline com IndexedDB

### 📤 Exportação Básica
- [ ] Exportar como Markdown
- [ ] Exportar como HTML simples
- [ ] Compartilhar via link

## 📊 Estrutura de Dados Firestore

```javascript
// Coleções iniciais
users/{userId}
  - email
  - name
  - preferences

documents/{docId}
  - title
  - content
  - tags[]
  - userId
  - createdAt
  - updatedAt

tags/{tagId}
  - name
  - color
```

## ⚡ Prioridades Técnicas

### Fase 1 (Semanas 1-2)
- [ ] Setup do projeto
- [ ] Configuração Firebase
- [ ] Autenticação básica
- [ ] CRUD documentos

### Fase 2 (Semanas 3-4)
- [ ] Editor Markdown
- [ ] Preview tempo real
- [ ] Sistema de tags
- [ ] Auto-save

### Fase 3 (Semanas 5-6)
- [ ] Modo offline
- [ ] Exportação básica
- [ ] UI/UX cyberpunk
- [ ] Testes e ajustes

## 🔄 Limitações Iniciais
- Máximo 1000 documentos/usuário
- Sem pastas (apenas tags)
- Sem colaboração tempo real
- Sem histórico de versões
- Sem anexos

## 🚀 Próximos Passos (Pós-MVP)
1. Coletar feedback dos usuários
2. Monitorar uso do Firebase
3. Implementar analytics
4. Planejar features pagas

## 💰 Custos Iniciais
- Firebase Plano Gratuito (Spark)
- Vercel Hobby
- Domínio (~$10/ano)
