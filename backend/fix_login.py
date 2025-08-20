#!/usr/bin/env python3
"""
Script para testar e corrigir problemas de login
"""
import os
import sys
import json
from werkzeug.security import check_password_hash

# Adicionar o diretório raiz ao path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from datetime import datetime

# Configuração básica do Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'phishing-awareness-hub-secret-key-2024'
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'src', 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar SQLAlchemy
db = SQLAlchemy()
db.init_app(app)

# Modelo User simplificado
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Gamificação
    xp = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    streak_days = db.Column(db.Integer, default=0)
    last_streak_date = db.Column(db.Date, nullable=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

def test_login():
    """Testar login do usuário demo"""
    with app.app_context():
        print("🔐 Testando login do usuário demo...")
        
        # Buscar usuário
        user = User.query.filter_by(email='demo@phishguard.com').first()
        if not user:
            print("❌ Usuário demo não encontrado!")
            return False
        
        print(f"✅ Usuário encontrado: {user.username}")
        print(f"   Email: {user.email}")
        print(f"   Ativo: {user.is_active}")
        print(f"   Hash da senha: {user.password_hash[:20]}...")
        
        # Testar senha
        password = 'demo123'
        if user.check_password(password):
            print(f"✅ Senha '{password}' está correta!")
            return True
        else:
            print(f"❌ Senha '{password}' está incorreta!")
            
            # Tentar recriar a senha
            print("🔧 Recriando senha...")
            user.set_password(password)
            db.session.commit()
            
            if user.check_password(password):
                print(f"✅ Senha recriada com sucesso!")
                return True
            else:
                print(f"❌ Falha ao recriar senha!")
                return False

def simulate_api_login():
    """Simular chamada da API de login"""
    with app.app_context():
        print("\n🌐 Simulando chamada da API de login...")
        
        login_data = {
            'login': 'demo@phishguard.com',
            'password': 'demo123'
        }
        
        print(f"📤 Dados enviados: {json.dumps(login_data, indent=2)}")
        
        # Buscar usuário
        login = login_data['login'].strip().lower()
        password = login_data['password']
        
        user = User.query.filter(
            (User.email == login) | (User.username == login)
        ).first()
        
        if not user:
            print("❌ Usuário não encontrado!")
            return False
        
        if not user.check_password(password):
            print("❌ Senha incorreta!")
            return False
        
        if not user.is_active:
            print("❌ Conta desativada!")
            return False
        
        print("✅ Login bem-sucedido!")
        print(f"   ID: {user.id}")
        print(f"   Username: {user.username}")
        print(f"   Email: {user.email}")
        print(f"   XP: {user.xp}")
        print(f"   Nível: {user.level}")
        
        return True

if __name__ == '__main__':
    print("🚀 Testando sistema de login do PhishGuard...")
    
    # Testar login básico
    login_ok = test_login()
    
    if login_ok:
        # Simular API
        api_ok = simulate_api_login()
        
        if api_ok:
            print("\n🎉 SUCESSO! O login está funcionando corretamente.")
            print("\n📋 Credenciais para teste:")
            print("   Email: demo@phishguard.com")
            print("   Senha: demo123")
        else:
            print("\n❌ ERRO na simulação da API!")
    else:
        print("\n❌ ERRO no teste básico de login!")

