# 🤝 Guia de Contribuição - PhishGuard

Obrigado por considerar contribuir para o PhishGuard! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)
- [Desenvolvimento](#desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)

## 🤝 Código de Conduta

Este projeto adere ao [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Ao participar, você deve seguir este código.

### Nossos Compromissos

- **Respeito**: Tratar todos com respeito e dignidade
- **Inclusão**: Criar um ambiente acolhedor para todos
- **Colaboração**: Trabalhar juntos de forma construtiva
- **Aprendizado**: Estar aberto a feedback e crescimento

## 🚀 Como Contribuir

Existem várias maneiras de contribuir:

### 🐛 Reportando Bugs
- Use o template de issue para bugs
- Inclua passos para reproduzir
- Adicione screenshots se aplicável
- Especifique ambiente (OS, browser, versão)

### 💡 Sugerindo Melhorias
- Use o template de issue para features
- Descreva o problema que resolve
- Explique a solução proposta
- Considere implementações alternativas

### 📝 Melhorando Documentação
- Corrija erros de digitação
- Adicione exemplos
- Melhore clareza das explicações
- Traduza para outros idiomas

### 🔧 Contribuindo com Código
- Corrija bugs existentes
- Implemente novas features
- Melhore performance
- Adicione testes

## 🐛 Reportando Bugs

Antes de reportar um bug:

1. **Verifique** se já não foi reportado
2. **Teste** na versão mais recente
3. **Reproduza** o problema consistentemente

### Template de Bug Report

```markdown
**Descrição do Bug**
Uma descrição clara e concisa do bug.

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role para baixo até '...'
4. Veja o erro

**Comportamento Esperado**
Descrição clara do que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [ex: Windows 10]
- Browser: [ex: Chrome 91]
- Versão: [ex: 1.0.0]

**Contexto Adicional**
Qualquer outra informação relevante.
```

## 💡 Sugerindo Melhorias

### Template de Feature Request

```markdown
**Problema Relacionado**
Descrição clara do problema que esta feature resolveria.

**Solução Proposta**
Descrição clara da solução desejada.

**Alternativas Consideradas**
Outras soluções que você considerou.

**Contexto Adicional**
Screenshots, mockups, ou outras informações relevantes.
```

## 🛠️ Desenvolvimento

### Configuração do Ambiente

1. **Fork** o repositório
2. **Clone** seu fork:
   ```bash
   git clone https://github.com/seu-usuario/phishing-awareness-hub.git
   cd phishing-awareness-hub
   ```

3. **Configure** o upstream:
   ```bash
   git remote add upstream https://github.com/GracioKabongo/phishing-awareness-hub.git
   ```

4. **Instale** dependências:
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Configure** ambiente:
   ```bash
   cp .env.example .env
   # Edite .env com suas configurações
   ```

### Estrutura do Projeto

```
phishing-awareness-hub/
├── backend/                 # API Flask
│   ├── src/
│   │   ├── models/         # Modelos de dados
│   │   ├── routes/         # Rotas da API
│   │   ├── services/       # Lógica de negócio
│   │   └── utils/          # Utilitários
│   └── tests/              # Testes do backend
├── frontend/               # App React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas
│   │   ├── contexts/       # Contextos React
│   │   └── utils/          # Utilitários
│   └── tests/              # Testes do frontend
└── docs/                   # Documentação
```

### Comandos Úteis

```bash
# Backend
cd backend
python src/main.py          # Iniciar servidor
python -m pytest           # Executar testes
python -m pytest --cov     # Testes com cobertura

# Frontend
cd frontend
npm run dev                 # Servidor de desenvolvimento
npm run build              # Build de produção
npm run test               # Executar testes
npm run lint               # Linting
npm run format             # Formatação
```

## 📏 Padrões de Código

### Python (Backend)

- **PEP 8**: Siga as convenções do PEP 8
- **Type Hints**: Use type hints quando possível
- **Docstrings**: Documente funções e classes
- **Imports**: Organize imports (stdlib, third-party, local)

```python
from typing import Dict, List, Optional
import os

from flask import Flask, request
from werkzeug.security import generate_password_hash

from models.user import User


def create_user(username: str, email: str, password: str) -> Dict[str, any]:
    """
    Cria um novo usuário no sistema.
    
    Args:
        username: Nome de usuário único
        email: Email válido do usuário
        password: Senha em texto plano
        
    Returns:
        Dict contendo dados do usuário criado
        
    Raises:
        ValueError: Se dados inválidos
    """
    # Implementação...
```

### JavaScript/React (Frontend)

- **ES6+**: Use sintaxe moderna
- **Functional Components**: Prefira componentes funcionais
- **Hooks**: Use hooks para estado e efeitos
- **PropTypes**: Documente props quando necessário

```jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const UserProfile = ({ userId, onUpdate }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <LoadingSpinner />

  return (
    <div className="user-profile">
      {/* Componente */}
    </div>
  )
}

UserProfile.propTypes = {
  userId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func
}

export default UserProfile
```

### CSS/Styling

- **Tailwind CSS**: Use classes do Tailwind
- **Responsive**: Design mobile-first
- **Acessibilidade**: Considere a11y
- **Consistência**: Mantenha padrões visuais

```jsx
// ✅ Bom
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Clique aqui
</button>

// ❌ Evite
<button style={{padding: '8px 16px', backgroundColor: '#3B82F6'}}>
  Clique aqui
</button>
```

## 🔄 Processo de Pull Request

### Antes de Submeter

1. **Sincronize** com upstream:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crie** uma branch:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

3. **Teste** suas mudanças:
   ```bash
   npm run test
   python -m pytest
   ```

4. **Commit** seguindo convenções:
   ```bash
   git commit -m "feat: adiciona sistema de notificações"
   ```

### Convenções de Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças na documentação
- `style:` Formatação, sem mudança de lógica
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Tarefas de manutenção

### Template de Pull Request

```markdown
## Descrição
Breve descrição das mudanças.

## Tipo de Mudança
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (mudança que quebra compatibilidade)
- [ ] Documentação

## Como Testar
1. Passos para testar
2. Casos de teste específicos
3. Configurações necessárias

## Checklist
- [ ] Código segue padrões do projeto
- [ ] Testes passam localmente
- [ ] Documentação atualizada
- [ ] Sem conflitos com main
- [ ] Commits seguem convenções

## Screenshots (se aplicável)
Adicione screenshots das mudanças visuais.

## Issues Relacionadas
Fixes #123
```

### Revisão de Código

Critérios para aprovação:

- **Funcionalidade**: Código funciona conforme esperado
- **Qualidade**: Segue padrões e boas práticas
- **Testes**: Inclui testes adequados
- **Documentação**: Documentação atualizada
- **Performance**: Não degrada performance
- **Segurança**: Não introduz vulnerabilidades

## 🧪 Testes

### Backend (Python)

```python
# tests/test_auth.py
import pytest
from src.main import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login_success(client):
    response = client.post('/api/auth/login', json={
        'login': 'test@example.com',
        'password': 'password123'
    })
    assert response.status_code == 200
    assert 'token' in response.json
```

### Frontend (React)

```jsx
// tests/components/UserProfile.test.jsx
import { render, screen } from '@testing-library/react'
import UserProfile from '../components/UserProfile'

test('renders user profile', () => {
  render(<UserProfile userId={1} />)
  expect(screen.getByText('Perfil do Usuário')).toBeInTheDocument()
})
```

## 📚 Recursos Úteis

### Documentação
- [React Documentation](https://reactjs.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Ferramentas
- [VS Code](https://code.visualstudio.com/) - Editor recomendado
- [Postman](https://www.postman.com/) - Teste de APIs
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)

### Comunidade
- [Discord](https://discord.gg/phishguard) - Chat da comunidade
- [GitHub Discussions](https://github.com/phishguard/discussions) - Discussões
- [Stack Overflow](https://stackoverflow.com/questions/tagged/phishguard) - Perguntas técnicas

## 🎯 Áreas que Precisam de Ajuda

Estamos especialmente procurando contribuições em:

- **🌐 Internacionalização**: Tradução para outros idiomas
- **♿ Acessibilidade**: Melhorias de a11y
- **📱 Mobile**: Otimizações para dispositivos móveis
- **🧪 Testes**: Aumento da cobertura de testes
- **📊 Analytics**: Novas métricas e visualizações
- **🎨 Design**: Melhorias na UI/UX
- **📚 Documentação**: Tutoriais e guias

## ❓ Dúvidas?

Se você tem dúvidas sobre como contribuir:

1. **Leia** a documentação existente
2. **Procure** em issues e discussions
3. **Abra** uma discussion para perguntas gerais
4. **Entre** no Discord para chat em tempo real

## 🙏 Reconhecimento

Todos os contribuidores são reconhecidos:

- **README**: Lista de contribuidores
- **Changelog**: Créditos por versão
- **Hall of Fame**: Contribuidores destacados

Obrigado por ajudar a tornar a internet mais segura! 🛡️

