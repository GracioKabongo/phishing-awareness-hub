from flask import Blueprint, request, jsonify
from src.models.user import User, db
from src.models.simulation import Simulation, Attempt, Badge, UserBadge
from src.routes.auth import require_auth
from sqlalchemy import func, desc
from datetime import datetime, timedelta

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/dashboard', methods=['GET'])
@require_auth
def get_dashboard_data():
    """Get comprehensive dashboard data for the user"""
    try:
        user = request.current_user
        
        # Get user's attempts with simulation details
        attempts_query = db.session.query(Attempt, Simulation)\
            .join(Simulation, Attempt.simulation_id == Simulation.id)\
            .filter(Attempt.user_id == user.id)\
            .order_by(Attempt.created_at.desc())
        
        attempts_data = attempts_query.all()
        
        # Calculate statistics
        total_attempts = len(attempts_data)
        correct_attempts = len([a for a, s in attempts_data if a.is_correct])
        accuracy = (correct_attempts / total_attempts * 100) if total_attempts > 0 else 0
        
        # Calculate average time spent
        total_time = sum([a.time_spent for a, s in attempts_data])
        avg_time = (total_time / total_attempts) if total_attempts > 0 else 0
        
        # Get performance by difficulty
        difficulty_stats = {}
        for difficulty in ['beginner', 'intermediate', 'advanced']:
            diff_attempts = [(a, s) for a, s in attempts_data if s.difficulty == difficulty]
            diff_correct = len([a for a, s in diff_attempts if a.is_correct])
            diff_total = len(diff_attempts)
            
            difficulty_stats[difficulty] = {
                'total': diff_total,
                'correct': diff_correct,
                'accuracy': (diff_correct / diff_total * 100) if diff_total > 0 else 0
            }
        
        # Get performance by category
        category_stats = {}
        categories = db.session.query(Simulation.category).distinct().all()
        for cat_tuple in categories:
            category = cat_tuple[0]
            cat_attempts = [(a, s) for a, s in attempts_data if s.category == category]
            cat_correct = len([a for a, s in cat_attempts if a.is_correct])
            cat_total = len(cat_attempts)
            
            category_stats[category] = {
                'total': cat_total,
                'correct': cat_correct,
                'accuracy': (cat_correct / cat_total * 100) if cat_total > 0 else 0
            }
        
        # Get recent activity (last 7 days)
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        recent_attempts = [a for a, s in attempts_data if a.created_at >= seven_days_ago]
        
        # Daily activity for the last 7 days
        daily_activity = {}
        for i in range(7):
            date = datetime.utcnow() - timedelta(days=i)
            date_str = date.strftime('%Y-%m-%d')
            day_attempts = [a for a in recent_attempts if a.created_at.strftime('%Y-%m-%d') == date_str]
            daily_activity[date_str] = {
                'total': len(day_attempts),
                'correct': len([a for a in day_attempts if a.is_correct]),
                'xp_earned': sum([a.xp_earned for a in day_attempts])
            }
        
        # Get user badges
        user_badges_query = db.session.query(UserBadge, Badge)\
            .join(Badge, UserBadge.badge_id == Badge.id)\
            .filter(UserBadge.user_id == user.id)\
            .order_by(UserBadge.earned_at.desc())
        
        user_badges = [badge.to_dict() for user_badge, badge in user_badges_query.all()]
        
        # Get available badges (not yet earned)
        earned_badge_ids = [ub.badge_id for ub, b in user_badges_query.all()]
        available_badges = Badge.query.filter(~Badge.id.in_(earned_badge_ids)).all()
        
        return jsonify({
            'user_stats': {
                'total_attempts': total_attempts,
                'correct_attempts': correct_attempts,
                'accuracy': round(accuracy, 1),
                'average_time': round(avg_time, 1),
                'total_xp': user.total_xp,
                'current_level': user.current_level,
                'level_progress': user.get_level_progress(),
                'xp_for_next_level': user.get_xp_for_next_level(),
                'streak_days': user.streak_days,
                'badges_earned': len(user_badges)
            },
            'difficulty_performance': difficulty_stats,
            'category_performance': category_stats,
            'daily_activity': daily_activity,
            'badges': {
                'earned': user_badges,
                'available': [badge.to_dict() for badge in available_badges]
            },
            'recent_attempts': [
                {
                    'id': a.id,
                    'simulation_title': s.title,
                    'difficulty': s.difficulty,
                    'category': s.category,
                    'is_correct': a.is_correct,
                    'time_spent': a.time_spent,
                    'xp_earned': a.xp_earned,
                    'created_at': a.created_at.isoformat()
                }
                for a, s in attempts_data[:10]  # Last 10 attempts
            ]
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get dashboard data', 'details': str(e)}), 500

@analytics_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """Get global leaderboard"""
    try:
        limit = request.args.get('limit', 10, type=int)
        
        # Get top users by XP
        top_users = User.query.filter_by(is_active=True)\
            .order_by(desc(User.total_xp))\
            .limit(limit)\
            .all()
        
        leaderboard = []
        for i, user in enumerate(top_users, 1):
            leaderboard.append({
                'rank': i,
                'user': user.to_dict_public()
            })
        
        return jsonify({
            'leaderboard': leaderboard
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get leaderboard', 'details': str(e)}), 500

@analytics_bp.route('/global-stats', methods=['GET'])
def get_global_stats():
    """Get global platform statistics"""
    try:
        # Total users
        total_users = User.query.filter_by(is_active=True).count()
        
        # Total simulations
        total_simulations = Simulation.query.filter_by(is_active=True).count()
        
        # Total attempts
        total_attempts = Attempt.query.count()
        
        # Global accuracy
        correct_attempts = Attempt.query.filter_by(is_correct=True).count()
        global_accuracy = (correct_attempts / total_attempts * 100) if total_attempts > 0 else 0
        
        # Most difficult simulations (lowest success rate)
        difficult_sims = db.session.query(
            Simulation.title,
            Simulation.difficulty,
            func.count(Attempt.id).label('total_attempts'),
            func.sum(func.cast(Attempt.is_correct, db.Integer)).label('correct_attempts')
        ).join(Attempt, Simulation.id == Attempt.simulation_id)\
         .group_by(Simulation.id)\
         .having(func.count(Attempt.id) >= 5)\
         .order_by(
             (func.sum(func.cast(Attempt.is_correct, db.Integer)) / func.count(Attempt.id))
         ).limit(5).all()
        
        # Most popular categories
        popular_categories = db.session.query(
            Simulation.category,
            func.count(Attempt.id).label('attempt_count')
        ).join(Attempt, Simulation.id == Attempt.simulation_id)\
         .group_by(Simulation.category)\
         .order_by(desc('attempt_count'))\
         .limit(5).all()
        
        return jsonify({
            'global_stats': {
                'total_users': total_users,
                'total_simulations': total_simulations,
                'total_attempts': total_attempts,
                'global_accuracy': round(global_accuracy, 1)
            },
            'most_difficult': [
                {
                    'title': sim.title,
                    'difficulty': sim.difficulty,
                    'total_attempts': sim.total_attempts,
                    'success_rate': round((sim.correct_attempts / sim.total_attempts * 100), 1)
                }
                for sim in difficult_sims
            ],
            'popular_categories': [
                {
                    'category': cat.category,
                    'attempt_count': cat.attempt_count
                }
                for cat in popular_categories
            ]
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get global stats', 'details': str(e)}), 500

@analytics_bp.route('/progress-chart', methods=['GET'])
@require_auth
def get_progress_chart():
    """Get user's progress over time for charts"""
    try:
        user = request.current_user
        days = request.args.get('days', 30, type=int)
        
        # Get attempts from the last N days
        start_date = datetime.utcnow() - timedelta(days=days)
        attempts = Attempt.query.filter(
            Attempt.user_id == user.id,
            Attempt.created_at >= start_date
        ).order_by(Attempt.created_at).all()
        
        # Group by date
        daily_progress = {}
        cumulative_xp = 0
        cumulative_correct = 0
        cumulative_total = 0
        
        for attempt in attempts:
            date_str = attempt.created_at.strftime('%Y-%m-%d')
            
            if date_str not in daily_progress:
                daily_progress[date_str] = {
                    'date': date_str,
                    'attempts': 0,
                    'correct': 0,
                    'xp_earned': 0,
                    'cumulative_xp': 0,
                    'cumulative_accuracy': 0
                }
            
            daily_progress[date_str]['attempts'] += 1
            if attempt.is_correct:
                daily_progress[date_str]['correct'] += 1
                cumulative_correct += 1
            
            daily_progress[date_str]['xp_earned'] += attempt.xp_earned
            cumulative_xp += attempt.xp_earned
            cumulative_total += 1
            
            daily_progress[date_str]['cumulative_xp'] = cumulative_xp
            daily_progress[date_str]['cumulative_accuracy'] = (
                cumulative_correct / cumulative_total * 100
            ) if cumulative_total > 0 else 0
        
        # Fill in missing dates with zero values
        chart_data = []
        for i in range(days):
            date = datetime.utcnow() - timedelta(days=days-1-i)
            date_str = date.strftime('%Y-%m-%d')
            
            if date_str in daily_progress:
                chart_data.append(daily_progress[date_str])
            else:
                chart_data.append({
                    'date': date_str,
                    'attempts': 0,
                    'correct': 0,
                    'xp_earned': 0,
                    'cumulative_xp': cumulative_xp,
                    'cumulative_accuracy': (
                        cumulative_correct / cumulative_total * 100
                    ) if cumulative_total > 0 else 0
                })
        
        return jsonify({
            'chart_data': chart_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get progress chart', 'details': str(e)}), 500

@analytics_bp.route('/badges', methods=['GET'])
def get_all_badges():
    """Get all available badges"""
    try:
        badges = Badge.query.filter_by(is_active=True).all()
        
        return jsonify({
            'badges': [badge.to_dict() for badge in badges]
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get badges', 'details': str(e)}), 500

@analytics_bp.route('/user/<int:user_id>/badges', methods=['GET'])
def get_user_badges(user_id):
    """Get badges earned by a specific user"""
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user_badges_query = db.session.query(UserBadge, Badge)\
            .join(Badge, UserBadge.badge_id == Badge.id)\
            .filter(UserBadge.user_id == user_id)\
            .order_by(UserBadge.earned_at.desc())
        
        badges = [
            {
                'badge': badge.to_dict(),
                'earned_at': user_badge.earned_at.isoformat()
            }
            for user_badge, badge in user_badges_query.all()
        ]
        
        return jsonify({
            'user': user.to_dict_public(),
            'badges': badges
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to get user badges', 'details': str(e)}), 500

