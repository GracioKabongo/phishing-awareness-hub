#!/usr/bin/env python3
"""
Script para criar usuário demo no PhishGuard
"""
import os
import sys

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
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'is_active': self.is_active,
            'xp': self.xp,
            'level': self.level,
            'streak_days': self.streak_days,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

def create_demo_user():
    """Criar usuário demo"""
    with app.app_context():
        # Criar tabelas se não existirem
        db.create_all()
        
        # Verificar se usuário demo já existe
        existing_user = User.query.filter_by(email='demo@phishguard.com').first()
        if existing_user:
            print("✅ Usuário demo já existe!")
            print(f"   Username: {existing_user.username}")
            print(f"   Email: {existing_user.email}")
            print(f"   Ativo: {existing_user.is_active}")
            return existing_user
        
        # Criar novo usuário demo
        demo_user = User(
            username='demo',
            email='demo@phishguard.com',
            name='Usuário Demo',
            xp=500,  # Dar alguns XP iniciais
            level=2,  # Nível 2 para mostrar progressão
            is_active=True
        )
        demo_user.set_password('demo123')
        
        try:
            db.session.add(demo_user)
            db.session.commit()
            print("🎉 Usuário demo criado com sucesso!")
            print(f"   Username: {demo_user.username}")
            print(f"   Email: {demo_user.email}")
            print(f"   Senha: demo123")
            print(f"   XP: {demo_user.xp}")
            print(f"   Nível: {demo_user.level}")
            return demo_user
            
        except Exception as e:
            db.session.rollback()
            print(f"❌ Erro ao criar usuário demo: {e}")
            return None

def list_all_users():
    """Listar todos os usuários"""
    with app.app_context():
        users = User.query.all()
        print(f"\n📋 Total de usuários: {len(users)}")
        for user in users:
            print(f"   - {user.username} ({user.email}) - Nível {user.level} - XP {user.xp}")

if __name__ == '__main__':
    print("🚀 Criando usuário demo para PhishGuard...")
    
    # Criar diretório do banco se não existir
    db_dir = os.path.join(os.path.dirname(__file__), 'src', 'database')
    os.makedirs(db_dir, exist_ok=True)
    
    # Criar usuário demo
    user = create_demo_user()
    
    # Listar todos os usuários
    list_all_users()
    
    if user:
        print("\n✅ Pronto! Agora você pode fazer login com:")
        print("   Email: demo@phishguard.com")
        print("   Senha: demo123")
    else:
        print("\n❌ Falha ao criar usuário demo!")

