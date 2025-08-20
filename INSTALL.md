# 🚀 Guia de Instalação - PhishGuard

Este guia fornece instruções detalhadas para instalar e executar o PhishGuard em seu ambiente local.

## 📋 Pré-requisitos

- **Node.js** 18.0.0 ou superior
- **Python** 3.11 ou superior
- **npm** ou **yarn**
- **Git**

## 🔧 Instalação Passo a Passo

### 1. Clone o Repositório

```bash
git clone https://github.com/GracioKabongo/phishing-awareness-hub.git
cd phishing-awareness-hub
```

### 2. Configuração do Backend (Flask)

```bash
# Navegue para o diretório do backend
cd backend

# Crie um ambiente virtual (recomendado)
python -m venv venv

# Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor backend
python src/main.py
```

O backend estará rodando em: `http://localhost:5001`

### 3. Configuração do Frontend (React)

**Abra um novo terminal** e navegue para o diretório do frontend:

```bash
cd frontend

# Limpe o cache do npm (se necessário)
npm cache clean --force

# Remova node_modules e package-lock.json se existirem
rm -rf node_modules package-lock.json

# Instale as dependências com compatibilidade
npm install --legacy-peer-deps

# OU se ainda houver problemas:
npm install --force

# Inicie o servidor de desenvolvimento
npm run dev
```

**⚠️ Importante:** Se você receber erros sobre `@tailwindcss/vite`, isso foi corrigido na versão mais recente. Certifique-se de usar os arquivos atualizados.

O frontend estará rodando em: `http://localhost:5173`

## 🛠️ Soluções para Problemas Comuns

### Problema: 'vite' is not recognized

**Solução 1 - Reinstalar dependências:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

**Solução 2 - Instalar Vite globalmente:**
```bash
npm install -g vite
npm run dev
```

**Solução 3 - Usar npx:**
```bash
npx vite
```

### Problema: Conflitos de dependências

**Solução:**
```bash
cd frontend
npm install --legacy-peer-deps --force
```

### Problema: Erro de CORS

**Solução:**
Certifique-se de que o backend está rodando na porta 5001 e o frontend na 5173.

### Problema: Banco de dados vazio

**Solução:**
```bash
# Popule o banco com dados iniciais
curl -X POST http://localhost:5001/api/admin/seed-data
```

## 🔄 Scripts Disponíveis

### Frontend
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Verificação de código
```

### Backend
```bash
python src/main.py   # Iniciar servidor
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **Documentação da API**: http://localhost:5001/api/health

## 👤 Conta Demo

Para testar a aplicação, use:
- **Email**: demo@phishguard.com
- **Senha**: demo123

## 🐛 Troubleshooting

### 1. Porta já em uso

Se as portas 5001 ou 5173 estiverem em uso:

**Backend (Flask):**
```python
# Edite src/main.py e altere a porta:
app.run(debug=True, host='0.0.0.0', port=5002)
```

**Frontend (Vite):**
```bash
npm run dev -- --port 3000
```

### 2. Problemas de permissão

**Linux/Mac:**
```bash
sudo chown -R $USER:$USER node_modules
```

**Windows:**
Execute o terminal como administrador.

### 3. Erro de módulo não encontrado

```bash
# Backend
pip install --upgrade pip
pip install -r requirements.txt

# Frontend
npm install --legacy-peer-deps
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz:

```env
# Backend
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///phishguard.db
JWT_SECRET_KEY=your-jwt-secret

# Frontend
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=PhishGuard
```

### Configuração do Banco de Dados

O projeto usa SQLite por padrão. Para usar PostgreSQL:

1. Instale psycopg2:
```bash
pip install psycopg2-binary
```

2. Atualize a DATABASE_URL:
```env
DATABASE_URL=postgresql://user:password@localhost/phishguard
```

## 📱 Desenvolvimento Mobile

Para testar em dispositivos móveis:

```bash
# Frontend - expor na rede local
npm run dev -- --host 0.0.0.0

# Backend - já configurado para aceitar conexões externas
```

Acesse via IP local: `http://192.168.1.X:5173`

## 🚀 Deploy

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

### Docker (Opcional)

```bash
# Build das imagens
docker-compose build

# Executar
docker-compose up -d
```

## 📞 Suporte

Se você encontrar problemas:

1. Verifique se todas as dependências estão instaladas
2. Confirme que as portas não estão em uso
3. Consulte os logs de erro
4. Abra uma issue no GitHub: https://github.com/GracioKabongo/phishing-awareness-hub/issues

## ✅ Verificação da Instalação

Para verificar se tudo está funcionando:

1. ✅ Backend responde em: http://localhost:5001/api/health
2. ✅ Frontend carrega em: http://localhost:5173
3. ✅ Login funciona com conta demo
4. ✅ Simulações carregam na página do simulador

**🎉 Parabéns! O PhishGuard está pronto para uso!**

