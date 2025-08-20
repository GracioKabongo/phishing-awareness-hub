from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import math

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=True)
    avatar_url = db.Column(db.String(255), nullable=True)
    
    # Gamification fields
    total_xp = db.Column(db.Integer, default=0)
    current_level = db.Column(db.Integer, default=1)
    streak_days = db.Column(db.Integer, default=0)
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Profile fields
    bio = db.Column(db.Text, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    attempts = db.relationship('Attempt', backref='user', lazy=True)
    user_badges = db.relationship('UserBadge', backref='user', lazy=True)
    
    def set_password(self, password):
        """Set password hash"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check password against hash"""
        return check_password_hash(self.password_hash, password)
    
    def add_xp(self, xp_amount):
        """Add XP and update level if necessary"""
        self.total_xp += xp_amount
        new_level = self.calculate_level(self.total_xp)
        
        level_up = False
        if new_level > self.current_level:
            level_up = True
            self.current_level = new_level
        
        return level_up
    
    @staticmethod
    def calculate_level(total_xp):
        """Calculate level based on total XP"""
        # Level formula: level = floor(sqrt(xp / 100)) + 1
        # Level 1: 0-99 XP, Level 2: 100-399 XP, Level 3: 400-899 XP, etc.
        if total_xp < 100:
            return 1
        return math.floor(math.sqrt(total_xp / 100)) + 1
    
    def get_xp_for_next_level(self):
        """Get XP needed for next level"""
        next_level = self.current_level + 1
        xp_needed = (next_level - 1) ** 2 * 100
        return xp_needed - self.total_xp
    
    def get_level_progress(self):
        """Get progress percentage to next level"""
        current_level_xp = (self.current_level - 1) ** 2 * 100
        next_level_xp = self.current_level ** 2 * 100
        
        if self.total_xp >= next_level_xp:
            return 100
        
        progress = ((self.total_xp - current_level_xp) / (next_level_xp - current_level_xp)) * 100
        return max(0, min(100, progress))
    
    def update_streak(self):
        """Update streak based on last activity"""
        now = datetime.utcnow()
        if self.last_activity:
            days_diff = (now - self.last_activity).days
            if days_diff == 1:
                # Consecutive day
                self.streak_days += 1
            elif days_diff > 1:
                # Streak broken
                self.streak_days = 1
            # Same day, keep streak
        else:
            self.streak_days = 1
        
        self.last_activity = now
    
    def get_stats(self):
        """Get user statistics"""
        from src.models.simulation import Attempt
        
        total_attempts = len(self.attempts)
        correct_attempts = len([a for a in self.attempts if a.is_correct])
        accuracy = (correct_attempts / total_attempts * 100) if total_attempts > 0 else 0
        
        return {
            'total_attempts': total_attempts,
            'correct_attempts': correct_attempts,
            'accuracy': round(accuracy, 1),
            'total_badges': len(self.user_badges),
            'streak_days': self.streak_days
        }
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'avatar_url': self.avatar_url,
            'total_xp': self.total_xp,
            'current_level': self.current_level,
            'streak_days': self.streak_days,
            'bio': self.bio,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'level_progress': self.get_level_progress(),
            'xp_for_next_level': self.get_xp_for_next_level(),
            'stats': self.get_stats()
        }
    
    def to_dict_public(self):
        """Public profile info (for leaderboards, etc.)"""
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'avatar_url': self.avatar_url,
            'current_level': self.current_level,
            'total_xp': self.total_xp,
            'streak_days': self.streak_days,
            'stats': self.get_stats()
        }

    def __repr__(self):
        return f'<User {self.username}>'
