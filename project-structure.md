# 🏗️ Estrutura do Projeto Phishing-Awareness Hub

```
phishing-awareness-hub/
├── 📁 frontend/                    # React.js Application
│   ├── 📁 public/
│   │   ├── favicon.ico
│   │   ├── manifest.json          # PWA Manifest
│   │   └── sw.js                  # Service Worker
│   ├── 📁 src/
│   │   ├── 📁 components/         # Componentes React
│   │   │   ├── 📁 ui/            # Componentes base
│   │   │   ├── 📁 layout/        # Layout components
│   │   │   ├── 📁 email/         # Email simulator
│   │   │   ├── 📁 checklist/     # Security checklist
│   │   │   ├── 📁 dashboard/     # Analytics dashboard
│   │   │   └── 📁 gamification/  # Badges, levels, etc
│   │   ├── 📁 pages/             # Páginas principais
│   │   │   ├── Home.tsx
│   │   │   ├── Learn.tsx
│   │   │   ├── Simulator.tsx
│   │   │   ├── Checklist.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Profile.tsx
│   │   ├── 📁 hooks/             # Custom hooks
│   │   ├── 📁 store/             # Zustand stores
│   │   ├── 📁 utils/             # Utilities
│   │   ├── 📁 types/             # TypeScript types
│   │   ├── 📁 data/              # Mock data
│   │   └── 📁 styles/            # CSS/Tailwind
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── 📁 backend/                     # Node.js API
│   ├── 📁 src/
│   │   ├── 📁 routes/            # API routes
│   │   │   ├── auth.js
│   │   │   ├── users.js
│   │   │   ├── simulations.js
│   │   │   ├── progress.js
│   │   │   └── analytics.js
│   │   ├── 📁 controllers/       # Route controllers
│   │   ├── 📁 middleware/        # Express middleware
│   │   ├── 📁 models/            # Database models
│   │   ├── 📁 services/          # Business logic
│   │   ├── 📁 utils/             # Utilities
│   │   └── 📁 config/            # Configuration
│   ├── 📁 prisma/                # Database schema
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   └── server.js
├── 📁 docs/                        # Documentação
│   ├── README.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── 📁 screenshots/
├── 📁 assets/                      # Assets estáticos
│   ├── 📁 images/
│   ├── 📁 icons/
│   └── 📁 email-templates/
├── .gitignore
├── LICENSE
└── README.md
```

## 📋 Componentes Principais

### Frontend Components

#### UI Components
- `Button.tsx` - Botão reutilizável
- `Card.tsx` - Container de conteúdo
- `Modal.tsx` - Modais e dialogs
- `Badge.tsx` - Badges de gamificação
- `ProgressBar.tsx` - Barras de progresso
- `Chart.tsx` - Gráficos e estatísticas

#### Layout Components
- `Header.tsx` - Cabeçalho com navegação
- `Sidebar.tsx` - Menu lateral
- `Footer.tsx` - Rodapé
- `Layout.tsx` - Layout principal

#### Email Simulator
- `EmailClient.tsx` - Interface do cliente de email
- `EmailList.tsx` - Lista de emails
- `EmailViewer.tsx` - Visualizador de email
- `PhishingIndicators.tsx` - Indicadores de phishing
- `FeedbackModal.tsx` - Feedback após escolha

#### Security Checklist
- `ChecklistForm.tsx` - Formulário de verificação
- `RiskMeter.tsx` - Medidor de risco
- `SecurityTips.tsx` - Dicas de segurança
- `ReportGenerator.tsx` - Gerador de relatórios

#### Dashboard & Analytics
- `StatsOverview.tsx` - Visão geral das estatísticas
- `ProgressChart.tsx` - Gráfico de progresso
- `LeaderBoard.tsx` - Ranking de usuários
- `ActivityLog.tsx` - Log de atividades

#### Gamification
- `XPBar.tsx` - Barra de experiência
- `BadgeCollection.tsx` - Coleção de badges
- `LevelIndicator.tsx` - Indicador de nível
- `Achievement.tsx` - Conquistas
- `Certificate.tsx` - Certificado de conclusão

### Backend Structure

#### Routes
- `/api/auth` - Autenticação e registro
- `/api/users` - Gerenciamento de usuários
- `/api/simulations` - Simulações de email
- `/api/progress` - Progresso do usuário
- `/api/analytics` - Dados analíticos
- `/api/badges` - Sistema de badges

#### Services
- `AuthService.js` - Lógica de autenticação
- `UserService.js` - Operações de usuário
- `SimulationService.js` - Lógica das simulações
- `ProgressService.js` - Cálculo de progresso
- `BadgeService.js` - Sistema de conquistas
- `AnalyticsService.js` - Processamento de dados

## 🎯 Funcionalidades por Módulo

### 1. Home Page
- Hero section com estatísticas
- Demonstração interativa
- Depoimentos de usuários
- Call-to-action para registro

### 2. Learning Module
- Guia completo sobre phishing
- Tipos de ataques com exemplos
- Quiz interativo
- Glossário de termos

### 3. Email Simulator
- 25+ emails realistas
- 3 níveis de dificuldade
- 5 categorias diferentes
- Sistema de pontuação
- Feedback educativo

### 4. Security Checklist
- Análise de emails reais
- Pontuação de risco 0-100
- Indicadores visuais
- Relatório detalhado
- Dicas personalizadas

### 5. Dashboard
- Progresso pessoal
- Estatísticas detalhadas
- Comparativo com outros usuários
- Histórico de atividades
- Exportação de dados

### 6. Gamification
- Sistema de XP (0-10000)
- 10 níveis de progressão
- 20+ badges únicos
- Streaks de atividade
- Certificado final

## 🔧 Configurações Técnicas

### Frontend (Vite + React)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "zustand": "^4.3.0",
    "framer-motion": "^10.0.0",
    "recharts": "^2.5.0",
    "react-hook-form": "^7.43.0",
    "zod": "^3.20.0",
    "lucide-react": "^0.315.0",
    "tailwindcss": "^3.2.0"
  }
}
```

### Backend (Express + Prisma)
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "prisma": "^4.10.0",
    "@prisma/client": "^4.10.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "zod": "^3.20.0",
    "helmet": "^6.0.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^6.7.0"
  }
}
```

### Database Schema (Prisma)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  avatar    String?
  xp        Int      @default(0)
  level     Int      @default(1)
  streak    Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  attempts  Attempt[]
  badges    UserBadge[]
  progress  Progress[]
}

model Simulation {
  id          String   @id @default(cuid())
  title       String
  content     String
  difficulty  String
  category    String
  indicators  Json
  solution    String
  explanation String
  
  attempts    Attempt[]
}

model Attempt {
  id           String   @id @default(cuid())
  userId       String
  simulationId String
  action       String
  isCorrect    Boolean
  timeSpent    Int
  createdAt    DateTime @default(now())
  
  user         User     @relation(fields: [userId], references: [id])
  simulation   Simulation @relation(fields: [simulationId], references: [id])
}
```

## 🎨 Design System

### Colors
```css
:root {
  --color-danger: #DC2626;
  --color-safe: #059669;
  --color-warning: #D97706;
  --color-info: #2563EB;
  --color-neutral: #6B7280;
}
```

### Typography
```css
.heading-xl { @apply text-4xl font-bold; }
.heading-lg { @apply text-3xl font-bold; }
.heading-md { @apply text-2xl font-semibold; }
.body-lg { @apply text-lg; }
.body-md { @apply text-base; }
.body-sm { @apply text-sm; }
```

Este projeto será um showcase completo de habilidades modernas de desenvolvimento web!

