# 🚀 Guia de Deploy - PhishGuard para CV

Este guia mostra como fazer deploy do PhishGuard para seu portfólio profissional.

## 🎯 Opções de Deploy Recomendadas

### 1. **Deploy Gratuito Completo (Recomendado)**
- **Frontend**: Vercel/Netlify (Gratuito)
- **Backend**: Railway/Render (Gratuito)
- **Banco**: SQLite (incluído) ou PostgreSQL gratuito

### 2. **Deploy Simples (Apenas Frontend)**
- **Frontend**: GitHub Pages (Gratuito)
- **Backend**: Simulado com dados mock

---

## 🌐 Opção 1: Deploy Completo (Frontend + Backend)

### **A. Deploy do Backend (Railway - Recomendado)**

#### **1. Preparar o Backend**

```bash
# 1. Navegue para o backend
cd backend

# 2. Crie arquivo requirements.txt (se não existir)
pip freeze > requirements.txt

# 3. Crie arquivo runtime.txt
echo "python-3.11.0" > runtime.txt

# 4. Crie Procfile para Railway
echo "web: python src/main.py" > Procfile
```

#### **2. Configurar Variáveis de Ambiente**

Crie arquivo `.env` no backend:
```env
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-here-change-this
JWT_SECRET_KEY=your-jwt-secret-key-here-change-this
DATABASE_URL=sqlite:///phishguard.db
PORT=5000
```

#### **3. Atualizar main.py para Produção**

```python
import os
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://your-frontend-domain.vercel.app"])

# ... resto do código

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

#### **4. Deploy no Railway**

1. **Acesse**: https://railway.app
2. **Conecte** sua conta GitHub
3. **Clique** em "New Project" → "Deploy from GitHub repo"
4. **Selecione** seu repositório
5. **Configure** as variáveis de ambiente:
   - `SECRET_KEY`: sua-chave-secreta
   - `JWT_SECRET_KEY`: sua-chave-jwt
   - `FLASK_ENV`: production
6. **Deploy** automático será iniciado

### **B. Deploy do Frontend (Vercel - Recomendado)**

#### **1. Preparar o Frontend**

```bash
# 1. Navegue para o frontend
cd frontend

# 2. Crie arquivo .env.production
echo "VITE_API_BASE_URL=https://your-backend-url.railway.app/api" > .env.production

# 3. Teste o build local
npm run build
```

#### **2. Deploy no Vercel**

1. **Acesse**: https://vercel.com
2. **Conecte** sua conta GitHub
3. **Clique** em "New Project"
4. **Selecione** seu repositório
5. **Configure**:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Adicione** variável de ambiente:
   - `VITE_API_BASE_URL`: URL do seu backend Railway
7. **Deploy**!

---

## 🎯 Opção 2: Deploy Simples (Apenas Frontend)

### **A. GitHub Pages (Mais Simples)**

#### **1. Preparar para GitHub Pages**

```bash
# 1. Instale gh-pages
cd frontend
npm install --save-dev gh-pages

# 2. Adicione scripts no package.json
```

Adicione no `package.json`:
```json
{
  "homepage": "https://GracioKabongo.github.io/phishing-awareness-hub",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### **2. Configurar Vite para GitHub Pages**

Atualize `vite.config.js`:
```javascript
export default defineConfig({
  base: '/phishing-awareness-hub/',
  plugins: [react()],
  // ... resto da configuração
})
```

#### **3. Deploy**

```bash
# 1. Build e deploy
npm run deploy

# 2. Ativar GitHub Pages
# - Vá no GitHub → Settings → Pages
# - Source: Deploy from a branch
# - Branch: gh-pages
```

### **B. Netlify (Alternativa)**

1. **Acesse**: https://netlify.com
2. **Arraste** a pasta `dist` após `npm run build`
3. **Configure** domínio personalizado (opcional)

---

## 📱 Opção 3: Deploy Mobile-Friendly

### **PWA (Progressive Web App)**

#### **1. Configurar PWA**

```bash
# Instale Vite PWA plugin
npm install -D vite-plugin-pwa
```

Atualize `vite.config.js`:
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'PhishGuard - Phishing Awareness Hub',
        short_name: 'PhishGuard',
        description: 'Plataforma educativa de conscientização sobre phishing',
        theme_color: '#3b82f6',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## 🔧 Configurações Avançadas

### **A. Domínio Personalizado**

#### **Vercel**
1. **Compre** domínio (Namecheap, GoDaddy)
2. **Configure** DNS no Vercel
3. **Adicione** domínio customizado

#### **Netlify**
1. **Settings** → Domain management
2. **Add custom domain**
3. **Configure** DNS

### **B. HTTPS e Segurança**

```javascript
// Adicione no backend (main.py)
from flask_talisman import Talisman

app = Flask(__name__)
Talisman(app, force_https=True)
```

### **C. Analytics (Opcional)**

```javascript
// Adicione Google Analytics no index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

---

## 📋 Checklist de Deploy para CV

### **✅ Antes do Deploy**
- [ ] Projeto funciona localmente
- [ ] Backend e frontend se comunicam
- [ ] Dados de simulação carregados
- [ ] Responsivo (mobile-friendly)
- [ ] Sem erros no console

### **✅ Durante o Deploy**
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado corretamente
- [ ] Build de produção funciona
- [ ] URLs atualizadas

### **✅ Após o Deploy**
- [ ] Site carrega sem erros
- [ ] Login funciona
- [ ] Simulações carregam
- [ ] Responsivo em mobile
- [ ] Performance boa (Lighthouse)

### **✅ Para o CV**
- [ ] URL personalizada (se possível)
- [ ] README atualizado com link
- [ ] Screenshots atualizadas
- [ ] Descrição profissional

---

## 🎯 URLs Recomendadas para CV

### **Estrutura Profissional**
```
Frontend: https://phishguard-mz.vercel.app
Backend:  https://phishguard-api.railway.app
GitHub:   https://github.com/GracioKabongo/phishing-awareness-hub
```

### **Domínio Personalizado (Ideal)**
```
Site:     https://phishguard.graciodev.com
API:      https://api.phishguard.graciodev.com
GitHub:   https://github.com/GracioKabongo/phishing-awareness-hub
```

---

## 💡 Dicas para Impressionar Recrutadores

### **1. Performance**
- Use Lighthouse para otimizar
- Comprima imagens
- Minimize JavaScript

### **2. SEO**
```html
<!-- Adicione no index.html -->
<meta name="description" content="PhishGuard - Plataforma educativa de conscientização sobre phishing desenvolvida por Grácio Kabongo">
<meta name="keywords" content="phishing, segurança, cibersegurança, educação, Moçambique">
<meta name="author" content="Grácio Kabongo">
```

### **3. Monitoramento**
- Configure Google Analytics
- Use Sentry para error tracking
- Monitor uptime com UptimeRobot

### **4. Documentação**
- README detalhado
- API documentation
- Screenshots atualizadas
- Video demo (opcional)

---

## 🚀 Deploy Rápido (5 minutos)

### **Opção Express - Netlify**

```bash
# 1. Build do frontend
cd frontend
npm run build

# 2. Arraste pasta 'dist' para netlify.com
# 3. Configure domínio
# 4. Pronto!
```

### **Opção Express - Vercel**

```bash
# 1. Instale Vercel CLI
npm i -g vercel

# 2. Deploy
cd frontend
vercel --prod

# 3. Siga as instruções
# 4. Pronto!
```

---

## 📞 Suporte

Se encontrar problemas:

1. **Verifique** logs de deploy
2. **Confirme** variáveis de ambiente
3. **Teste** localmente primeiro
4. **Consulte** documentação da plataforma

## 🎉 Resultado Final

Após o deploy, você terá:

- ✅ **Aplicação online** 24/7
- ✅ **URL profissional** para o CV
- ✅ **Projeto demonstrável** para entrevistas
- ✅ **Código no GitHub** para análise
- ✅ **Experiência prática** com deploy

**🚀 Seu PhishGuard estará pronto para impressionar recrutadores!**

