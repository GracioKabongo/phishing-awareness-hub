import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Star, 
  Archive, 
  Trash2, 
  Flag, 
  Reply, 
  Forward, 
  MoreHorizontal,
  AlertTriangle,
  Shield,
  Clock,
  Paperclip,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const EmailClient = ({ 
  simulation, 
  onAction, 
  showResult = false, 
  userAction = null,
  isCorrect = null 
}) => {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [showActions, setShowActions] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    if (simulation && !showResult) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1)
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [simulation, showResult])

  useEffect(() => {
    if (simulation) {
      setSelectedEmail(simulation)
      setShowActions(true)
    }
  }, [simulation])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAction = (action) => {
    onAction(action, timeSpent)
  }

  const getRiskLevel = () => {
    if (!simulation?.phishing_indicators) return 'low'
    const indicators = JSON.parse(simulation.phishing_indicators)
    if (indicators.length >= 4) return 'high'
    if (indicators.length >= 2) return 'medium'
    return 'low'
  }

  const riskLevel = getRiskLevel()
  const riskColors = {
    low: 'text-green-600 bg-green-100 border-green-200',
    medium: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    high: 'text-red-600 bg-red-100 border-red-200'
  }

  if (!simulation) {
    return (
      <div className="email-preview min-h-[600px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Mail className="h-16 w-16 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-medium">Nenhum email selecionado</h3>
          <p className="text-muted-foreground">
            Escolha uma simulação para começar
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="email-preview">
      {/* Email Header */}
      <div className="border-b bg-gray-50 dark:bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium">Gmail</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={`${riskColors[riskLevel]} border`}>
              {riskLevel === 'high' && <AlertTriangle className="h-3 w-3 mr-1" />}
              {riskLevel === 'medium' && <Flag className="h-3 w-3 mr-1" />}
              {riskLevel === 'low' && <Shield className="h-3 w-3 mr-1" />}
              Risco {riskLevel === 'high' ? 'Alto' : riskLevel === 'medium' ? 'Médio' : 'Baixo'}
            </Badge>
            
            {!showResult && (
              <Badge variant="outline" className="text-blue-600 bg-blue-100 border-blue-200">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(timeSpent)}
              </Badge>
            )}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pesquisar emails..." 
              className="pl-10"
              disabled
            />
          </div>
          <Button variant="outline" size="sm" disabled>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" disabled>
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled>
              <Flag className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" disabled>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            1 de 1
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="p-6 space-y-6">
        {/* Email Header Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <h1 className="text-xl font-semibold leading-tight">
                {simulation.subject}
              </h1>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {simulation.sender_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {simulation.sender_name}
                    </div>
                    <div className="text-xs">
                      &lt;{simulation.sender_email}&gt;
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <span>para</span>
                  <span className="font-medium">você</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>há 5 minutos</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" disabled>
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <Reply className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Attachments (if any) */}
          {simulation.category === 'work' && (
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
              <Paperclip className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">documento_importante.pdf</span>
              <Badge variant="secondary" className="text-xs">PDF</Badge>
            </div>
          )}
        </div>

        <Separator />

        {/* Email Body */}
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-line text-sm leading-relaxed">
            {simulation.content}
          </div>
        </div>

        {/* Action Buttons */}
        <AnimatePresence>
          {showActions && !showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-t pt-6"
            >
              <div className="space-y-4">
                <h3 className="font-medium text-lg">O que você faria com este email?</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    onClick={() => handleAction('reply')}
                    variant="outline"
                    className="justify-start h-auto p-4 space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <Reply className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Responder</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Responder ao remetente
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleAction('delete')}
                    variant="outline"
                    className="justify-start h-auto p-4 space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <Trash2 className="h-5 w-5 text-red-600" />
                      <span className="font-medium">Excluir</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Mover para lixeira
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleAction('report')}
                    variant="outline"
                    className="justify-start h-auto p-4 space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <Flag className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Reportar</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Marcar como spam/phishing
                    </div>
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    💡 Dica: Analise cuidadosamente o remetente, conteúdo e links antes de decidir
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Display */}
        <AnimatePresence>
          {showResult && userAction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t pt-6"
            >
              <Card className={`${isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : 'border-red-200 bg-red-50 dark:bg-red-950/20'}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600" />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">
                        {isCorrect ? '🎉 Parabéns!' : '❌ Ops!'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Você escolheu: <strong>{
                          userAction === 'reply' ? 'Responder' :
                          userAction === 'delete' ? 'Excluir' :
                          'Reportar'
                        }</strong>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Ação Correta:</h4>
                      <p className="text-sm">
                        <strong>{
                          simulation.correct_action === 'reply' ? 'Responder' :
                          simulation.correct_action === 'delete' ? 'Excluir' :
                          'Reportar'
                        }</strong>
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Explicação:</h4>
                      <p className="text-sm">{simulation.explanation}</p>
                    </div>

                    {simulation.phishing_indicators && (
                      <div>
                        <h4 className="font-medium mb-2">Indicadores de Phishing:</h4>
                        <ul className="text-sm space-y-1">
                          {JSON.parse(simulation.phishing_indicators).map((indicator, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span>{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EmailClient

