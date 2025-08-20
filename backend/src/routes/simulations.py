from flask import Blueprint, request, jsonify
from src.models.user import User, db
from src.models.simulation import Simulation, Attempt, Badge, UserBadge
from src.routes.auth import require_auth
from datetime import datetime
import json

simulations_bp = Blueprint('simulations', __name__)

@simulations_bp.route('/simulations', methods=['GET'])
def get_simulations():
    """Get all active simulations (without solutions)"""
    try:
        difficulty = request.args.get('difficulty')
        category = request.args.get('category')
        limit = request.args.get('limit', type=int)
        
        query = Simulation.query.filter_by(is_active=True)
        
        if difficulty:
            query = query.filter_by(difficulty=difficulty)
        
        if category:
            query = query.filter_by(category=category)
        
        if limit:
            query = query.limit(limit)
        
        simulations = query.all()
        
        return jsonify({
            'simulations': [sim.to_dict_safe() for sim in simulations],
            'total': len(simulations)
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get simulations', 'details': str(e)}), 500

@simulations_bp.route('/simulations/<int:simulation_id>', methods=['GET'])
def get_simulation(simulation_id):
    """Get specific simulation (without solution)"""
    try:
        simulation = Simulation.query.get(simulation_id)
        
        if not simulation or not simulation.is_active:
            return jsonify({'error': 'Simulation not found'}), 404
        
        return jsonify({
            'simulation': simulation.to_dict_safe()
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get simulation', 'details': str(e)}), 500

@simulations_bp.route('/simulations/<int:simulation_id>/submit', methods=['POST'])
@require_auth
def submit_attempt(simulation_id):
    """Submit user's attempt for a simulation"""
    try:
        user = request.current_user
        data = request.get_json()
        
        # Validate required fields
        if not data.get('action'):
            return jsonify({'error': 'Action is required'}), 400
        
        action = data['action']
        time_spent = data.get('time_spent', 0)
        
        # Get simulation
        simulation = Simulation.query.get(simulation_id)
        if not simulation or not simulation.is_active:
            return jsonify({'error': 'Simulation not found'}), 404
        
        # Check if user already attempted this simulation
        existing_attempt = Attempt.query.filter_by(
            user_id=user.id,
            simulation_id=simulation_id
        ).first()
        
        if existing_attempt:
            return jsonify({'error': 'You have already attempted this simulation'}), 400
        
        # Check if action is correct
        is_correct = action.lower() == simulation.correct_action.lower()
        
        # Calculate XP based on difficulty and correctness
        xp_earned = 0
        if is_correct:
            xp_map = {
                'beginner': 10,
                'intermediate': 20,
                'advanced': 30
            }
            xp_earned = xp_map.get(simulation.difficulty, 10)
            
            # Bonus XP for speed (if completed in under 30 seconds)
            if time_spent < 30:
                xp_earned += 5
        
        # Create attempt record
        attempt = Attempt(
            user_id=user.id,
            simulation_id=simulation_id,
            user_action=action,
            is_correct=is_correct,
            time_spent=time_spent,
            xp_earned=xp_earned
        )
        
        db.session.add(attempt)
        
        # Update user XP and check for level up
        level_up = False
        if xp_earned > 0:
            level_up = user.add_xp(xp_earned)
        
        # Update user activity
        user.update_streak()
        
        db.session.commit()
        
        # Check for new badges
        new_badges = check_and_award_badges(user)
        
        return jsonify({
            'message': 'Attempt submitted successfully',
            'result': {
                'is_correct': is_correct,
                'xp_earned': xp_earned,
                'level_up': level_up,
                'new_badges': new_badges,
                'explanation': simulation.explanation,
                'correct_action': simulation.correct_action,
                'phishing_indicators': json.loads(simulation.phishing_indicators) if simulation.phishing_indicators else []
            },
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to submit attempt', 'details': str(e)}), 500

@simulations_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all available simulation categories"""
    try:
        categories = db.session.query(Simulation.category).filter_by(is_active=True).distinct().all()
        category_list = [cat[0] for cat in categories]
        
        return jsonify({
            'categories': category_list
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get categories', 'details': str(e)}), 500

@simulations_bp.route('/difficulties', methods=['GET'])
def get_difficulties():
    """Get all available difficulty levels"""
    return jsonify({
        'difficulties': ['beginner', 'intermediate', 'advanced']
    }), 200

@simulations_bp.route('/user/attempts', methods=['GET'])
@require_auth
def get_user_attempts():
    """Get user's attempt history"""
    try:
        user = request.current_user
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        attempts = Attempt.query.filter_by(user_id=user.id)\
            .order_by(Attempt.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'attempts': [attempt.to_dict() for attempt in attempts.items],
            'total': attempts.total,
            'pages': attempts.pages,
            'current_page': page
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get attempts', 'details': str(e)}), 500

def check_and_award_badges(user):
    """Check if user qualifies for new badges and award them"""
    new_badges = []
    
    try:
        # Get user stats
        stats = user.get_stats()
        
        # Define badge criteria
        badge_criteria = [
            {
                'name': 'First Steps',
                'description': 'Complete your first simulation',
                'icon': 'baby',
                'criteria': lambda s: s['total_attempts'] >= 1,
                'xp_reward': 5
            },
            {
                'name': 'Getting Started',
                'description': 'Complete 5 simulations',
                'icon': 'play',
                'criteria': lambda s: s['total_attempts'] >= 5,
                'xp_reward': 10
            },
            {
                'name': 'Sharp Eye',
                'description': 'Achieve 80% accuracy',
                'icon': 'eye',
                'criteria': lambda s: s['accuracy'] >= 80 and s['total_attempts'] >= 5,
                'xp_reward': 15
            },
            {
                'name': 'Perfect Score',
                'description': 'Achieve 100% accuracy with at least 10 attempts',
                'icon': 'target',
                'criteria': lambda s: s['accuracy'] == 100 and s['total_attempts'] >= 10,
                'xp_reward': 25
            },
            {
                'name': 'Dedicated Learner',
                'description': 'Complete 25 simulations',
                'icon': 'book',
                'criteria': lambda s: s['total_attempts'] >= 25,
                'xp_reward': 20
            },
            {
                'name': 'Security Expert',
                'description': 'Complete 50 simulations',
                'icon': 'shield',
                'criteria': lambda s: s['total_attempts'] >= 50,
                'xp_reward': 30
            },
            {
                'name': 'Streak Master',
                'description': 'Maintain a 7-day streak',
                'icon': 'flame',
                'criteria': lambda s: user.streak_days >= 7,
                'xp_reward': 20
            },
            {
                'name': 'Level Up',
                'description': 'Reach level 5',
                'icon': 'star',
                'criteria': lambda s: user.current_level >= 5,
                'xp_reward': 25
            }
        ]
        
        for badge_info in badge_criteria:
            # Check if badge exists
            badge = Badge.query.filter_by(name=badge_info['name']).first()
            
            if not badge:
                # Create badge if it doesn't exist
                badge = Badge(
                    name=badge_info['name'],
                    description=badge_info['description'],
                    icon=badge_info['icon'],
                    unlock_criteria=json.dumps({}),
                    xp_reward=badge_info['xp_reward']
                )
                db.session.add(badge)
                db.session.flush()  # Get the badge ID
            
            # Check if user already has this badge
            user_badge = UserBadge.query.filter_by(
                user_id=user.id,
                badge_id=badge.id
            ).first()
            
            if not user_badge and badge_info['criteria'](stats):
                # Award the badge
                user_badge = UserBadge(
                    user_id=user.id,
                    badge_id=badge.id
                )
                db.session.add(user_badge)
                
                # Add XP reward
                user.add_xp(badge_info['xp_reward'])
                
                new_badges.append(badge.to_dict())
        
        db.session.commit()
        return new_badges
        
    except Exception as e:
        db.session.rollback()
        print(f"Error checking badges: {e}")
        return []

