import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Play, 
  RotateCcw, 
  Trophy, 
  Target, 
  Clock,
  Star,
  Filter,
  ChevronDown,
  Zap,
  Shield,
  AlertTriangle
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '../contexts/AuthContext'
import EmailClient from '../components/email/EmailClient'

const SimulatorPage = () => {
  const { user, token } = useAuth()
  const [simulations, setSimulations] = useState([])
  const [selectedSimulation, setSelectedSimulation] = useState(null)
  const [currentSimulation, setCurrentSimulation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [filters, setFilters] = useState({
    difficulty: 'all',
    category: 'all'
  })

  const API_BASE = 'http://localhost:5001/api'

  useEffect(() => {
    fetchSimulations()
  }, [])

  const fetchSimulations = async () => {
    try {
      const response = await fetch(`${API_BASE}/simulations`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSimulations(data.simulations || [])
      }
    } catch (error) {
      console.error('Error fetching simulations:', error)
    } finally {
      setLoading(false)
    }
  }

  const startSimulation = (simulation) => {
    setSelectedSimulation(simulation)
    setCurrentSimulation(simulation)
    setResult(null)
  }

  const handleEmailAction = async (action, timeSpent) => {
    if (!currentSimulation || !user) return

    setSubmitting(true)
    
    try {
      const response = await fetch(`${API_BASE}/simulations/${currentSimulation.id}/attempt`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: action,
          time_spent: timeSpent
        })
      })

      if (response.ok) {
        const data = await response.json()
        setResult({
          isCorrect: data.is_correct,
          userAction: action,
          xpEarned: data.xp_earned,
          newLevel: data.new_level,
          badgesEarned: data.badges_earned || []
        })
      }
    } catch (error) {
      console.error('Error submitting attempt:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const resetSimulation = () => {
    setCurrentSimulation(null)
    setSelectedSimulation(null)
    setResult(null)
  }

  const filteredSimulations = simulations.filter(sim => {
    if (filters.difficulty !== 'all' && sim.difficulty !== filters.difficulty) return false
    if (filters.category !== 'all' && sim.category !== filters.category) return false
    return true
  })

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'banking': return '🏦'
      case 'social': return '👥'
      case 'work': return '💼'
      case 'shopping': return '🛒'
      default: return '📧'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Carregando simulações...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold">
          Simulador de Emails
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Pratique identificando emails de phishing em um ambiente seguro e controlado
        </p>
      </motion.div>

      {currentSimulation ? (
        /* Email Simulator View */
        <div className="space-y-6">
          {/* Simulation Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(currentSimulation.category)}</span>
                    <span>{currentSimulation.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(currentSimulation.difficulty)}>
                      {currentSimulation.difficulty === 'beginner' ? 'Iniciante' :
                       currentSimulation.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                    </Badge>
                    <Badge variant="outline">
                      {currentSimulation.category === 'banking' ? 'Bancário' :
                       currentSimulation.category === 'social' ? 'Social' :
                       currentSimulation.category === 'work' ? 'Trabalho' : 'Compras'}
                    </Badge>
                  </div>
                </div>
                
                <Button
                  onClick={resetSimulation}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Nova Simulação</span>
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Email Client */}
          <EmailClient
            simulation={currentSimulation}
            onAction={handleEmailAction}
            showResult={!!result}
            userAction={result?.userAction}
            isCorrect={result?.isCorrect}
          />

          {/* Result Summary */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <span>Resultado da Simulação</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        +{result.xpEarned} XP
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Experiência Ganha
                      </div>
                    </div>
                    
                    {result.newLevel && (
                      <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                          Nível {result.newLevel}
                        </div>
                        <div className="text-sm text-yellow-600">
                          Subiu de Nível!
                        </div>
                      </div>
                    )}
                    
                    {result.badgesEarned.length > 0 && (
                      <div className="text-center p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {result.badgesEarned.length}
                        </div>
                        <div className="text-sm text-purple-600">
                          Badges Conquistadas
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button onClick={resetSimulation}>
                      <Play className="mr-2 h-4 w-4" />
                      Nova Simulação
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                      <Target className="mr-2 h-4 w-4" />
                      Ver Progresso
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      ) : (
        /* Simulation Selection View */
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dificuldade</label>
                  <Select value={filters.difficulty} onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="beginner">Iniciante</SelectItem>
                      <SelectItem value="intermediate">Intermediário</SelectItem>
                      <SelectItem value="advanced">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="banking">Bancário</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="work">Trabalho</SelectItem>
                      <SelectItem value="shopping">Compras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSimulations.map((simulation, index) => (
              <motion.div
                key={simulation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="text-2xl">{getCategoryIcon(simulation.category)}</div>
                        <CardTitle className="text-lg leading-tight">
                          {simulation.title}
                        </CardTitle>
                      </div>
                      <Badge className={getDifficultyColor(simulation.difficulty)}>
                        {simulation.difficulty === 'beginner' ? 'Iniciante' :
                         simulation.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>De: {simulation.sender_name}</span>
                      </div>
                      <div className="text-sm font-medium line-clamp-2">
                        {simulation.subject}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        {simulation.category === 'banking' ? 'Bancário' :
                         simulation.category === 'social' ? 'Social' :
                         simulation.category === 'work' ? 'Trabalho' : 'Compras'}
                      </Badge>
                      
                      <Button
                        onClick={() => startSimulation(simulation)}
                        size="sm"
                        className="group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Iniciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredSimulations.length === 0 && (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma simulação encontrada</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros para ver mais opções
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SimulatorPage

