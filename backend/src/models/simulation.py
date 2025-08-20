from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class Simulation(db.Model):
    __tablename__ = 'simulations'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    sender_name = db.Column(db.String(100), nullable=False)
    sender_email = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)  # beginner, intermediate, advanced
    category = db.Column(db.String(50), nullable=False)    # banking, social, work, shopping, etc
    phishing_indicators = db.Column(db.Text, nullable=False)  # JSON string
    correct_action = db.Column(db.String(50), nullable=False)  # delete, report, ignore, etc
    explanation = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    attempts = db.relationship('Attempt', backref='simulation', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'sender_name': self.sender_name,
            'sender_email': self.sender_email,
            'subject': self.subject,
            'content': self.content,
            'difficulty': self.difficulty,
            'category': self.category,
            'phishing_indicators': json.loads(self.phishing_indicators) if self.phishing_indicators else [],
            'correct_action': self.correct_action,
            'explanation': self.explanation,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_active': self.is_active
        }
    
    def to_dict_safe(self):
        """Return dict without solution for simulation"""
        return {
            'id': self.id,
            'title': self.title,
            'sender_name': self.sender_name,
            'sender_email': self.sender_email,
            'subject': self.subject,
            'content': self.content,
            'difficulty': self.difficulty,
            'category': self.category,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Attempt(db.Model):
    __tablename__ = 'attempts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    simulation_id = db.Column(db.Integer, db.ForeignKey('simulations.id'), nullable=False)
    user_action = db.Column(db.String(50), nullable=False)
    is_correct = db.Column(db.Boolean, nullable=False)
    time_spent = db.Column(db.Integer, nullable=False)  # seconds
    xp_earned = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'simulation_id': self.simulation_id,
            'user_action': self.user_action,
            'is_correct': self.is_correct,
            'time_spent': self.time_spent,
            'xp_earned': self.xp_earned,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Badge(db.Model):
    __tablename__ = 'badges'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(50), nullable=False)
    unlock_criteria = db.Column(db.Text, nullable=False)  # JSON string
    xp_reward = db.Column(db.Integer, default=0)
    rarity = db.Column(db.String(20), default='common')  # common, rare, epic, legendary
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'unlock_criteria': json.loads(self.unlock_criteria) if self.unlock_criteria else {},
            'xp_reward': self.xp_reward,
            'rarity': self.rarity,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_active': self.is_active
        }

class UserBadge(db.Model):
    __tablename__ = 'user_badges'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    badge_id = db.Column(db.Integer, db.ForeignKey('badges.id'), nullable=False)
    earned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Unique constraint to prevent duplicate badges
    __table_args__ = (db.UniqueConstraint('user_id', 'badge_id', name='unique_user_badge'),)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'badge_id': self.badge_id,
            'earned_at': self.earned_at.isoformat() if self.earned_at else None
        }

