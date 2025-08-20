from flask import Blueprint, jsonify
from src.models.user import db
from src.models.simulation import Simulation, Badge
from src.data.seed_data import SIMULATION_DATA, BADGE_DATA

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/seed-data', methods=['POST'])
def seed_database():
    """Populate database with initial data"""
    try:
        # Clear existing data
        Simulation.query.delete()
        Badge.query.delete()
        db.session.commit()
        
        # Add simulations
        simulations_added = 0
        for sim_data in SIMULATION_DATA:
            simulation = Simulation(**sim_data)
            db.session.add(simulation)
            simulations_added += 1
        
        # Add badges
        badges_added = 0
        for badge_data in BADGE_DATA:
            badge = Badge(**badge_data)
            db.session.add(badge)
            badges_added += 1
        
        db.session.commit()
        
        return jsonify({
            'message': 'Database seeded successfully',
            'simulations_added': simulations_added,
            'badges_added': badges_added
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': 'Failed to seed database',
            'details': str(e)
        }), 500

@admin_bp.route('/stats', methods=['GET'])
def get_admin_stats():
    """Get admin statistics"""
    try:
        from src.models.user import User
        
        stats = {
            'total_users': User.query.count(),
            'active_users': User.query.filter_by(is_active=True).count(),
            'total_simulations': Simulation.query.count(),
            'active_simulations': Simulation.query.filter_by(is_active=True).count(),
            'total_badges': Badge.query.count(),
            'active_badges': Badge.query.filter_by(is_active=True).count()
        }
        
        return jsonify({'stats': stats}), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to get admin stats',
            'details': str(e)
        }), 500

@admin_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Phishing Awareness Hub API is running'
    }), 200

