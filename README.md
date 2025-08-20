# 🛡️ PhishGuard - Phishing Awareness Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org/)

> **Uma plataforma educativa interativa para ensinar identificação e prevenção de ataques de phishing através de simulações realistas, gamificação e ferramentas de análise.**

![PhishGuard Screenshot](docs/screenshots/homepage.png)

##  Visão Geral

O PhishGuard é uma aplicação web completa desenvolvida para educar usuários sobre segurança digital, especificamente focada na identificação e prevenção de ataques de phishing. Através de uma abordagem gamificada e interativa, os usuários aprendem a reconhecer tentativas de phishing em um ambiente seguro e controlado.

###  Objetivos

- **Educar** sobre diferentes tipos de ataques de phishing
- **Treinar** habilidades de identificação através de simulações realistas
- **Gamificar** o processo de aprendizagem com XP, níveis e badges
- **Analisar** emails suspeitos com ferramentas interativas
- **Conscientizar** sobre a importância da segurança digital em Moçambique

## Funcionalidades Principais

###  Simulador de Emails
- **Interface realista** que simula clientes de email populares
- **8+ simulações** de phishing com diferentes níveis de dificuldade
- **Feedback imediato** com explicações detalhadas
- **Análise de tempo** de resposta e tomada de decisão

###  Checklist de Segurança
- **Ferramenta interativa** para análise de emails suspeitos
- **8 categorias** de verificação com pesos diferentes
- **Pontuação de risco** em tempo real (0-100%)
- **Recomendações personalizadas** baseadas na análise

###  Sistema de Gamificação
- **Sistema de XP** e progressão de níveis
- **Badges conquistáveis** por diferentes conquistas
- **Streak de dias** consecutivos de uso
- **Ranking** e estatísticas de desempenho

###  Dashboard Analytics
- **Estatísticas detalhadas** de progresso
- **Gráficos de performance** por dificuldade e categoria
- **Histórico de atividades** e tentativas
- **Métricas de precisão** e tempo médio

###  Módulo Educativo
- **Conteúdo completo** sobre tipos de phishing
- **Sinais de alerta** e indicadores suspeitos
- **Dicas de proteção** e melhores práticas
- **Estatísticas reais** sobre ataques cibernéticos

##  Tecnologias Utilizadas

### Frontend
- **React 18.2** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **React Router** - Roteamento

### Backend
- **Flask 3.0** - Framework web
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **Joi** - Validação de dados
- **CORS** - Cross-origin requests

### Ferramentas de Desenvolvimento
- **ESLint** - Linting JavaScript
- **Prettier** - Formatação de código
- **Git** - Controle de versão

##  Instalação e Configuração

### Pré-requisitos
- **Node.js** 18+ 
- **Python** 3.11+
- **Git**

### 1. Clone o Repositório
```bash
git clone https://github.com/GracioKabongo/phishing-awareness-hub.git
cd phishing-awareness-hub
```

### 2. Configuração do Backend
```bash
cd backend
pip install -r requirements.txt
python src/main.py
```

O backend estará rodando em `http://localhost:5001`

### 3. Configuração do Frontend
```bash
cd frontend
npm install
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

### 4. Inicialização dos Dados
```bash
# Popular banco de dados com simulações de exemplo
curl -X POST http://localhost:5001/api/admin/seed-data
```

##  Como Usar

### 1. **Registro/Login**
- Crie uma conta ou use a conta demo
- Email: `demo@phishguard.com`
- Senha: `demo123`

### 2. **Aprender**
- Acesse a seção "Aprender" para entender conceitos básicos
- Estude os diferentes tipos de phishing
- Conheça os sinais de alerta

### 3. **Praticar**
- Use o "Simulador" para praticar com emails realistas
- Escolha a dificuldade (Iniciante, Intermediário, Avançado)
- Receba feedback imediato sobre suas escolhas

### 4. **Analisar**
- Use o "Checklist" para analisar emails suspeitos
- Cole o conteúdo do email e marque os itens aplicáveis
- Obtenha uma pontuação de risco e recomendações

### 5. **Acompanhar Progresso**
- Visualize suas estatísticas no Dashboard
- Colete badges e suba de nível
- Mantenha uma sequência de dias consecutivos

##  Simulações Disponíveis

| Categoria | Dificuldade | Descrição |
|-----------|-------------|-----------|
| 🏦 Bancário | Iniciante | BIM falso solicitando atualização de dados |
| 🏦 Bancário | Intermediário | Millennium bim - notificação de transação suspeita |
| 👥 Social | Iniciante | Falso prêmio de loteria moçambicana |
| 👥 Social | Intermediário | Golpe de relacionamento online |
| 💼 Trabalho | Intermediário | Email falso de RH de empresa moçambicana |
| 💼 Trabalho | Avançado | Spear phishing direcionado |
| 🛒 Compras | Iniciante | Oferta falsa de desconto em loja moçambicana |
| 🛒 Compras | Avançado | Confirmação de compra falsa - Shoprite/Game |

##  Sistema de Badges

### Badges Comuns
- **Primeiro Passo** - Complete sua primeira simulação
- **Estudioso** - Visite todas as seções educativas
- **Iniciante** - Complete 5 simulações

### Badges Raras
- **Olho Aguçado** - Alcance 80% de precisão
- **Mestre da Sequência** - Mantenha 7 dias consecutivos
- **Velocista** - Complete simulação em menos de 30s

### Badges Épicas
- **Perfeição** - Alcance 100% de precisão (min. 10 tentativas)
- **Especialista** - Complete 50 simulações
- **Mestre PhishGuard** - Alcance nível 10

## Métricas e Analytics

### Métricas Individuais
- **Taxa de Precisão** - Porcentagem de acertos
- **Tempo Médio** - Tempo para tomar decisões
- **XP Total** - Experiência acumulada
- **Nível Atual** - Progressão no sistema
- **Streak** - Dias consecutivos de uso

### Métricas por Categoria
- **Performance por Dificuldade** - Beginner, Intermediate, Advanced
- **Performance por Tipo** - Banking, Social, Work, Shopping
- **Evolução Temporal** - Progresso ao longo do tempo

## Configuração Avançada

### Variáveis de Ambiente

#### Backend (.env)
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///phishguard.db
JWT_SECRET_KEY=your-jwt-secret
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=PhishGuard
```

### Customização

#### Adicionando Novas Simulações
1. Edite `backend/src/data/seed_data.py`
2. Adicione nova simulação seguindo o formato existente
3. Execute o seed novamente

#### Modificando Sistema de Pontuação
1. Edite `backend/src/services/gamification.py`
2. Ajuste valores de XP e critérios de badges
3. Reinicie o backend

## Testes

### Frontend
```bash
cd frontend
npm run test
npm run test:coverage
```

### Backend
```bash
cd backend
python -m pytest
python -m pytest --cov=src
```

### Testes E2E
```bash
npm run test:e2e
```

##  Build e Deploy

### Build de Produção
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 src.main:app
```

### Deploy com Docker
```bash
docker-compose up -d
```

### Deploy na Vercel/Netlify
1. Faça build do frontend: `npm run build`
2. Configure as variáveis de ambiente
3. Deploy da pasta `dist/`

##  Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição
- Mantenha o código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Siga os padrões de código existentes
- Atualize a documentação quando necessário

##  Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

##  Autores

- **Grácio Kabongo** - *Desenvolvimento inicial* - [@GracioKabongo](https://github.com/GracioKabongo)

##  Agradecimentos

- **INCM** - Instituto Nacional das Comunicações de Moçambique
- **OWASP** - Melhores práticas de segurança
- **Anti-Phishing Working Group** - Dados sobre phishing
- **Comunidade Open Source** - Ferramentas e bibliotecas utilizadas
- **Universidades moçambicanas** - Apoio à educação em segurança digital

##  Contato

- **Email**: graciolumbala01@gmail.com
- **GitHub**: [@GracioKabongo](https://github.com/GracioKabongo)
- **LinkedIn**: [Grácio Kabongo](https://linkedin.com/in/gracio-kabongo)

##  Links Úteis

- [Documentação da API](docs/API.md)
- [Guia de Contribuição](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Roadmap](ROADMAP.md)

---

**Aviso Legal**: Este projeto é apenas para fins educacionais. Todas as simulações de phishing são fictícias e executadas em ambiente controlado. Não use este conhecimento para atividades maliciosas.

**Segurança**: Se você suspeita de um email de phishing real, reporte para as autoridades competentes e nunca forneça informações pessoais.

