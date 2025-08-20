import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckSquare, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Link, 
  Mail, 
  Clock,
  RotateCcw,
  Download,
  Share
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const ChecklistPage = () => {
  const [emailContent, setEmailContent] = useState('')
  const [checkedItems, setCheckedItems] = useState({})
  const [riskScore, setRiskScore] = useState(0)
  const [riskLevel, setRiskLevel] = useState('low')

  const checklistItems = [
    {
      id: 'sender_verification',
      category: 'Remetente',
      title: 'Verificar o remetente',
      description: 'O endereço de email parece oficial e confiável?',
      weight: 3,
      tips: [
        'Verifique se o domínio é oficial (ex: @banco.com.br)',
        'Desconfie de domínios similares (ex: @bancoo.com.br)',
        'Procure por erros de ortografia no endereço'
      ]
    },
    {
      id: 'urgency_check',
      category: 'Conteúdo',
      title: 'Verificar urgência excessiva',
      description: 'O email cria pressão para ação imediata?',
      weight: 2,
      tips: [
        'Frases como "ação necessária em 24h"',
        'Ameaças de bloqueio ou cancelamento',
        'Ofertas que "expiram hoje"'
      ]
    },
    {
      id: 'personal_info',
      category: 'Segurança',
      title: 'Solicitação de informações pessoais',
      description: 'O email pede dados sensíveis como senhas ou documentos?',
      weight: 4,
      tips: [
        'Empresas legítimas nunca pedem senhas por email',
        'Desconfie de pedidos de dados bancários',
        'Cuidado com solicitações de documentos'
      ]
    },
    {
      id: 'links_check',
      category: 'Links',
      title: 'Verificar links suspeitos',
      description: 'Os links levam para sites oficiais?',
      weight: 3,
      tips: [
        'Passe o mouse sobre o link para ver o destino',
        'Verifique se a URL é oficial',
        'Desconfie de encurtadores de URL'
      ]
    },
    {
      id: 'grammar_check',
      category: 'Conteúdo',
      title: 'Verificar erros de português',
      description: 'O texto tem erros de gramática ou ortografia?',
      weight: 2,
      tips: [
        'Empresas sérias revisam seus emails',
        'Erros podem indicar origem fraudulenta',
        'Traduções automáticas são comuns em golpes'
      ]
    },
    {
      id: 'attachments_check',
      category: 'Anexos',
      title: 'Verificar anexos suspeitos',
      description: 'Há anexos não solicitados ou suspeitos?',
      weight: 3,
      tips: [
        'Não abra anexos de remetentes desconhecidos',
        'Desconfie de arquivos .exe, .zip, .rar',
        'Verifique se o anexo faz sentido no contexto'
      ]
    },
    {
      id: 'greeting_check',
      category: 'Personalização',
      title: 'Verificar saudação genérica',
      description: 'O email usa saudações genéricas como "Caro cliente"?',
      weight: 1,
      tips: [
        'Empresas legítimas usam seu nome',
        'Saudações genéricas são suspeitas',
        'Verifique se seus dados estão corretos'
      ]
    },
    {
      id: 'contact_info',
      category: 'Contato',
      title: 'Verificar informações de contato',
      description: 'O email tem informações de contato válidas?',
      weight: 2,
      tips: [
        'Empresas legítimas fornecem contatos',
        'Verifique se telefones e endereços existem',
        'Compare com informações oficiais'
      ]
    }
  ]

  const handleItemCheck = (itemId, checked) => {
    const newCheckedItems = { ...checkedItems, [itemId]: checked }
    setCheckedItems(newCheckedItems)
    
    // Calculate risk score
    let score = 0
    let totalWeight = 0
    
    checklistItems.forEach(item => {
      totalWeight += item.weight
      if (newCheckedItems[item.id]) {
        score += item.weight
      }
    })
    
    const percentage = (score / totalWeight) * 100
    setRiskScore(Math.round(percentage))
    
    // Determine risk level
    if (percentage >= 70) {
      setRiskLevel('high')
    } else if (percentage >= 40) {
      setRiskLevel('medium')
    } else {
      setRiskLevel('low')
    }
  }

  const resetChecklist = () => {
    setCheckedItems({})
    setRiskScore(0)
    setRiskLevel('low')
    setEmailContent('')
  }

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-100 border-green-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getRiskText = () => {
    switch (riskLevel) {
      case 'high': return 'Alto Risco'
      case 'medium': return 'Risco Médio'
      case 'low': return 'Baixo Risco'
      default: return 'Não Avaliado'
    }
  }

  const getRecommendation = () => {
    switch (riskLevel) {
      case 'high':
        return {
          title: '🚨 CUIDADO!',
          message: 'Este email apresenta muitos sinais de phishing. Recomendamos NÃO interagir com ele.',
          action: 'Exclua o email e reporte como spam.'
        }
      case 'medium':
        return {
          title: '⚠️ ATENÇÃO!',
          message: 'Este email tem alguns sinais suspeitos. Proceda com cautela.',
          action: 'Verifique a legitimidade antes de qualquer ação.'
        }
      case 'low':
        return {
          title: '✅ PARECE SEGURO',
          message: 'Este email apresenta poucos sinais de risco, mas mantenha-se vigilante.',
          action: 'Continue verificando outros aspectos de segurança.'
        }
      default:
        return {
          title: '📋 ANÁLISE PENDENTE',
          message: 'Complete o checklist para obter uma avaliação de risco.',
          action: 'Marque os itens que se aplicam ao email.'
        }
    }
  }

  const recommendation = getRecommendation()
  const categories = [...new Set(checklistItems.map(item => item.category))]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold">
          Checklist de Segurança
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Analise emails suspeitos usando nossa ferramenta de verificação
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Email Input */}
        <div className="lg:col-span-2 space-y-6">
          {/* Email Content Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Conteúdo do Email</span>
              </CardTitle>
              <CardDescription>
                Cole o conteúdo do email que deseja analisar (opcional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="email-content">Conteúdo do Email</Label>
                <Textarea
                  id="email-content"
                  placeholder="Cole aqui o conteúdo do email que deseja analisar..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckSquare className="h-5 w-5" />
                    <span>Checklist de Verificação</span>
                  </CardTitle>
                  <CardDescription>
                    Marque os itens que se aplicam ao email analisado
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetChecklist}
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Limpar</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {categories.map(category => (
                  <div key={category} className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      {category}
                    </h3>
                    <div className="space-y-4">
                      {checklistItems
                        .filter(item => item.category === category)
                        .map(item => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                id={item.id}
                                checked={checkedItems[item.id] || false}
                                onCheckedChange={(checked) => handleItemCheck(item.id, checked)}
                                className="mt-1"
                              />
                              <div className="flex-1 space-y-2">
                                <Label
                                  htmlFor={item.id}
                                  className="text-base font-medium cursor-pointer"
                                >
                                  {item.title}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                                <div className="space-y-1">
                                  {item.tips.map((tip, index) => (
                                    <div key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                                      <span className="text-blue-500 mt-1">•</span>
                                      <span>{tip}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Peso {item.weight}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Assessment */}
        <div className="space-y-6">
          {/* Risk Score */}
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Avaliação de Risco</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Meter */}
              <div className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-200"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${riskScore}, 100`}
                      className={
                        riskLevel === 'high' ? 'text-red-500' :
                        riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{riskScore}%</div>
                      <div className="text-xs text-muted-foreground">Risco</div>
                    </div>
                  </div>
                </div>
                
                <Badge className={`${getRiskColor()} border text-sm px-3 py-1`}>
                  {getRiskText()}
                </Badge>
              </div>

              {/* Recommendation */}
              <div className="space-y-3">
                <h3 className="font-semibold">{recommendation.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {recommendation.message}
                </p>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">
                    Recomendação: {recommendation.action}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Salvar Relatório
                </Button>
                <Button className="w-full" variant="outline">
                  <Share className="mr-2 h-4 w-4" />
                  Compartilhar Análise
                </Button>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{Object.keys(checkedItems).length}/{checklistItems.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(Object.keys(checkedItems).length / checklistItems.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Dicas Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Sempre verifique o remetente</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Desconfie de urgência excessiva</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Nunca forneça dados por email</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Verifique links antes de clicar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ChecklistPage

