# 📡 API Documentation - PhishGuard

Esta documentação descreve todas as rotas e endpoints disponíveis na API do PhishGuard.

## 🔗 Base URL

```
http://localhost:5001/api
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Inclua o token no header de todas as requisições protegidas:

```http
Authorization: Bearer <seu-jwt-token>
```

## 📋 Índice

- [Autenticação](#autenticação)
- [Usuários](#usuários)
- [Simulações](#simulações)
- [Analytics](#analytics)
- [Administração](#administração)

---

## 🔐 Autenticação

### POST /auth/register

Registra um novo usuário.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "usuario@email.com",
    "created_at": "2024-01-20T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `400` - Dados inválidos
- `409` - Usuário já existe

---

### POST /auth/login

Autentica um usuário existente.

**Request Body:**
```json
{
  "login": "usuario@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "usuario@email.com",
    "total_xp": 150,
    "current_level": 2,
    "streak_days": 3
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `400` - Dados inválidos
- `401` - Credenciais incorretas

---

### POST /auth/logout

Invalida o token atual (logout).

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 👤 Usuários

### GET /users/profile

Obtém o perfil do usuário autenticado.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "usuario@email.com",
    "total_xp": 1250,
    "current_level": 5,
    "level_progress": 65,
    "streak_days": 7,
    "created_at": "2024-01-15T08:00:00Z",
    "last_login": "2024-01-20T10:30:00Z"
  }
}
```

---

### PUT /users/profile

Atualiza o perfil do usuário.

**Headers:**
```http
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "username": "novo_usuario",
  "email": "novo@email.com"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "novo_usuario",
    "email": "novo@email.com"
  }
}
```

---

### GET /users/badges

Lista todas as badges do usuário.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "badges": {
    "earned": [
      {
        "id": 1,
        "name": "Primeiro Passo",
        "description": "Complete sua primeira simulação",
        "icon": "play-circle",
        "rarity": "common",
        "earned_at": "2024-01-15T09:00:00Z"
      }
    ],
    "available": [
      {
        "id": 2,
        "name": "Olho Aguçado",
        "description": "Alcance 80% de precisão",
        "icon": "eye",
        "rarity": "rare",
        "progress": 65,
        "requirement": 80
      }
    ]
  }
}
```

---

## 🎮 Simulações

### GET /simulations

Lista todas as simulações disponíveis.

**Query Parameters:**
- `difficulty` (optional): `beginner`, `intermediate`, `advanced`
- `category` (optional): `banking`, `social`, `work`, `shopping`

**Response (200):**
```json
{
  "simulations": [
    {
      "id": 1,
      "title": "Banco Falso - Conta Suspensa",
      "category": "banking",
      "difficulty": "beginner",
      "sender_name": "Banco Seguro",
      "sender_email": "noreply@banco-seguro.net",
      "subject": "🚨 URGENTE: Sua conta será bloqueada",
      "content": "Detectamos atividade suspeita...",
      "correct_action": "report",
      "explanation": "Este email apresenta vários sinais de phishing...",
      "phishing_indicators": "[\"Domínio suspeito\", \"Urgência excessiva\"]"
    }
  ]
}
```

---

### GET /simulations/{id}

Obtém detalhes de uma simulação específica.

**Response (200):**
```json
{
  "simulation": {
    "id": 1,
    "title": "Banco Falso - Conta Suspensa",
    "category": "banking",
    "difficulty": "beginner",
    "sender_name": "Banco Seguro",
    "sender_email": "noreply@banco-seguro.net",
    "subject": "🚨 URGENTE: Sua conta será bloqueada",
    "content": "Detectamos atividade suspeita em sua conta...",
    "correct_action": "report",
    "explanation": "Este email apresenta vários sinais de phishing...",
    "phishing_indicators": "[\"Domínio suspeito\", \"Urgência excessiva\"]"
  }
}
```

---

### POST /simulations/{id}/attempt

Submete uma tentativa de resposta para uma simulação.

**Headers:**
```http
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "action": "report",
  "time_spent": 45
}
```

**Response (200):**
```json
{
  "message": "Attempt recorded successfully",
  "is_correct": true,
  "xp_earned": 15,
  "new_level": 3,
  "badges_earned": [
    {
      "name": "Olho Aguçado",
      "description": "Alcance 80% de precisão"
    }
  ],
  "explanation": "Parabéns! Você identificou corretamente este phishing..."
}
```

---

## 📊 Analytics

### GET /dashboard

Obtém dados completos do dashboard do usuário.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user_stats": {
    "total_attempts": 25,
    "correct_attempts": 20,
    "accuracy": 80.0,
    "average_time": 42.5,
    "total_xp": 1250,
    "current_level": 5,
    "level_progress": 65,
    "xp_for_next_level": 350,
    "streak_days": 7,
    "badges_earned": 6
  },
  "difficulty_performance": {
    "beginner": {
      "total": 15,
      "correct": 14,
      "accuracy": 93.3
    },
    "intermediate": {
      "total": 8,
      "correct": 5,
      "accuracy": 62.5
    },
    "advanced": {
      "total": 2,
      "correct": 1,
      "accuracy": 50.0
    }
  },
  "category_performance": {
    "banking": {
      "total": 10,
      "correct": 8,
      "accuracy": 80.0
    },
    "social": {
      "total": 8,
      "correct": 7,
      "accuracy": 87.5
    },
    "work": {
      "total": 4,
      "correct": 3,
      "accuracy": 75.0
    },
    "shopping": {
      "total": 3,
      "correct": 2,
      "accuracy": 66.7
    }
  },
  "recent_attempts": [
    {
      "simulation_title": "Banco Falso - Conta Suspensa",
      "difficulty": "beginner",
      "is_correct": true,
      "xp_earned": 15,
      "created_at": "2024-01-20T10:30:00Z"
    }
  ]
}
```

---

### GET /analytics/stats

Obtém estatísticas gerais da plataforma.

**Response (200):**
```json
{
  "platform_stats": {
    "total_users": 1250,
    "total_attempts": 15000,
    "average_accuracy": 75.5,
    "most_difficult_simulation": "Spear Phishing Avançado",
    "most_common_mistake": "Não verificar domínio do remetente"
  },
  "user_ranking": {
    "current_position": 45,
    "total_users": 1250,
    "percentile": 96.4
  }
}
```

---

### GET /analytics/progress

Obtém dados de progresso temporal do usuário.

**Headers:**
```http
Authorization: Bearer <token>
```

**Query Parameters:**
- `period` (optional): `week`, `month`, `year` (default: `month`)

**Response (200):**
```json
{
  "progress_data": [
    {
      "date": "2024-01-15",
      "attempts": 3,
      "correct": 2,
      "xp_earned": 25
    },
    {
      "date": "2024-01-16",
      "attempts": 5,
      "correct": 4,
      "xp_earned": 45
    }
  ],
  "summary": {
    "total_attempts": 25,
    "total_correct": 20,
    "total_xp": 1250,
    "improvement_rate": 15.5
  }
}
```

---

## ⚙️ Administração

### POST /admin/seed-data

Popula o banco de dados com dados iniciais (simulações, badges).

**Response (200):**
```json
{
  "message": "Database seeded successfully",
  "simulations_created": 8,
  "badges_created": 10
}
```

---

### GET /admin/stats

Obtém estatísticas administrativas da plataforma.

**Response (200):**
```json
{
  "admin_stats": {
    "total_users": 1250,
    "active_users_today": 85,
    "total_simulations": 8,
    "total_attempts": 15000,
    "average_session_time": "8m 30s",
    "most_popular_simulation": "Banco Falso - Conta Suspensa",
    "user_growth_rate": 12.5
  }
}
```

---

## 🔍 Health Check

### GET /health

Verifica o status da API.

**Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00Z",
  "version": "1.0.0",
  "database": "connected"
}
```

---

## ❌ Códigos de Erro

| Código | Descrição |
|--------|-----------|
| `400` | Bad Request - Dados inválidos |
| `401` | Unauthorized - Token inválido ou ausente |
| `403` | Forbidden - Acesso negado |
| `404` | Not Found - Recurso não encontrado |
| `409` | Conflict - Recurso já existe |
| `422` | Unprocessable Entity - Erro de validação |
| `500` | Internal Server Error - Erro interno |

### Formato de Erro Padrão

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados de entrada inválidos",
    "details": {
      "field": "email",
      "issue": "Formato de email inválido"
    }
  }
}
```

---

## 📝 Notas de Implementação

### Rate Limiting
- **Autenticação**: 5 tentativas por minuto
- **Simulações**: 10 tentativas por minuto
- **Geral**: 100 requisições por minuto

### Paginação
Endpoints que retornam listas suportam paginação:

```http
GET /simulations?page=1&limit=10
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Versionamento
A API utiliza versionamento via header:

```http
API-Version: v1
```

---

## 🧪 Exemplos de Uso

### Fluxo Completo de Simulação

```bash
# 1. Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login": "demo@phishguard.com", "password": "demo123"}'

# 2. Listar simulações
curl -X GET http://localhost:5001/api/simulations \
  -H "Authorization: Bearer <token>"

# 3. Tentar simulação
curl -X POST http://localhost:5001/api/simulations/1/attempt \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"action": "report", "time_spent": 45}'

# 4. Ver dashboard
curl -X GET http://localhost:5001/api/dashboard \
  -H "Authorization: Bearer <token>"
```

### Análise de Email com Checklist

```bash
# Usar checklist (frontend only - não há endpoint específico)
# A lógica de checklist é implementada no frontend
```

---

## 🔄 Changelog da API

### v1.0.0 (2024-01-20)
- ✅ Implementação inicial
- ✅ Sistema de autenticação JWT
- ✅ CRUD de simulações
- ✅ Sistema de gamificação
- ✅ Analytics e dashboard
- ✅ Administração básica

### Próximas Versões
- 🔄 v1.1.0: Sistema de relatórios em PDF
- 🔄 v1.2.0: API de checklist
- 🔄 v1.3.0: Integração com serviços externos
- 🔄 v2.0.0: Simulações personalizáveis

---

**📞 Suporte**: Para dúvidas sobre a API, abra uma issue no repositório ou entre em contato através do email de suporte.

