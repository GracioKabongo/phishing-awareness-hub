import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp, 
  Calendar,
  Award,
  Shield,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '../contexts/AuthContext'

const DashboardPage = () => {
  const { user, token } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_BASE = 'http://localhost:5001/api'

  useEffect(() => {
    if (user && token) {
      fetchDashboardData()
    }
  }, [user, token])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE}/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  // Mock data for demonstration if API is not available
  const mockData = {
    user_stats: {
      total_attempts: 15,
      correct_attempts: 12,
      accuracy: 80.0,
      average_time: 45.5,
      total_xp: 1250,
      current_level: 3,
      level_progress: 65,
      xp_for_next_level: 350,
      streak_days: 5,
      badges_earned: 4
    },
    difficulty_performance: {
      beginner: { total: 8, correct: 7, accuracy: 87.5 },
      intermediate: { total: 5, correct: 4, accuracy: 80.0 },
      advanced: { total: 2, correct: 1, accuracy: 50.0 }
    },
    category_performance: {
      banking: { total: 6, correct: 5, accuracy: 83.3 },
      social: { total: 4, correct: 3, accuracy: 75.0 },
      work: { total: 3, correct: 2, accuracy: 66.7 },
      shopping: { total: 2, correct: 2, accuracy: 100.0 }
    },
    badges: {
      earned: [
        { name: 'Primeiro Passo', description: 'Complete sua primeira simulação', icon: 'play-circle', rarity: 'common' },
        { name: 'Iniciante', description: 'Complete 5 simulações', icon: 'target', rarity: 'common' },
        { name: 'Olho Aguçado', description: 'Alcance 80% de precisão', icon: 'eye', rarity: 'rare' },
        { name: 'Mestre da Sequência', description: 'Mantenha uma sequência de 5 dias', icon: 'flame', rarity: 'rare' }
      ],
      available: [
        { name: 'Perfeição', description: 'Alcance 100% de precisão com pelo menos 10 tentativas', icon: 'award', rarity: 'epic' },
        { name: 'Especialista em Segurança', description: 'Complete 50 simulações', icon: 'shield-check', rarity: 'epic' }
      ]
    },
    recent_attempts: [
      { simulation_title: 'Banco Falso - Conta Suspensa', difficulty: 'beginner', is_correct: true, xp_earned: 10, created_at: '2024-01-20T10:30:00' },
      { simulation_title: 'Falso Prêmio de Loteria', difficulty: 'beginner', is_correct: true, xp_earned: 10, created_at: '2024-01-20T09:15:00' },
      { simulation_title: 'Falso Email de RH', difficulty: 'intermediate', is_correct: false, xp_earned: 5, created_at: '2024-01-19T16:45:00' }
    ]
  }

  const data = dashboardData || mockData
  const stats = data.user_stats

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600'
      case 'intermediate': return 'text-yellow-600'
      case 'advanced': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta, {user?.username}! Aqui está seu progresso.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">Nível {stats.current_level}</div>
            <div className="text-sm text-muted-foreground">{stats.total_xp} XP total</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.total_attempts}</div>
                <div className="text-sm text-muted-foreground">Simulações</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{stats.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Precisão</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{stats.total_xp}</div>
                <div className="text-sm text-muted-foreground">XP Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.streak_days}</div>
                <div className="text-sm text-muted-foreground">Dias Seguidos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Progresso do Nível</span>
                </CardTitle>
                <CardDescription>
                  Você está no nível {stats.current_level}. Faltam {stats.xp_for_next_level} XP para o próximo nível.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nível {stats.current_level}</span>
                    <span>Nível {stats.current_level + 1}</span>
                  </div>
                  <Progress value={stats.level_progress} className="h-3" />
                  <div className="text-center text-sm text-muted-foreground">
                    {stats.level_progress}% completo
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance by Difficulty */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Performance por Dificuldade</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(data.difficulty_performance).map(([difficulty, perf]) => (
                    <div key={difficulty} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${getDifficultyColor(difficulty)}`}>
                          {difficulty === 'beginner' ? 'Iniciante' :
                           difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {perf.correct}/{perf.total} ({perf.accuracy}%)
                        </span>
                      </div>
                      <Progress value={perf.accuracy} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recent_attempts.map((attempt, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{attempt.simulation_title}</div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getDifficultyColor(attempt.difficulty)}>
                            {attempt.difficulty === 'beginner' ? 'Iniciante' :
                             attempt.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(attempt.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${attempt.is_correct ? 'text-green-600' : 'text-red-600'}`}>
                          {attempt.is_correct ? '✓ Correto' : '✗ Incorreto'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          +{attempt.xp_earned} XP
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Badges Conquistadas</span>
                </CardTitle>
                <CardDescription>
                  {data.badges.earned.length} de {data.badges.earned.length + data.badges.available.length} badges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {data.badges.earned.map((badge, index) => (
                    <div key={index} className="text-center space-y-2">
                      <div className={`w-12 h-12 mx-auto rounded-full border-2 flex items-center justify-center ${getBadgeColor(badge.rarity)}`}>
                        <Star className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-xs font-medium">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.rarity}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {data.badges.available.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Próximas Badges</h4>
                    <div className="space-y-2">
                      {data.badges.available.slice(0, 2).map((badge, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Star className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium">{badge.name}</div>
                            <div className="text-xs text-muted-foreground">{badge.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-between" asChild>
                  <a href="/simulator">
                    Nova Simulação
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/checklist">
                    Usar Checklist
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="/learn">
                    Estudar Mais
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

