import { motion } from 'framer-motion'
import { BookOpen, Shield, AlertTriangle, Eye, Lock, Globe, Mail, CreditCard } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const LearnPage = () => {
  const phishingTypes = [
    {
      icon: Mail,
      title: 'Email Phishing',
      description: 'O tipo mais comum, usando emails falsos para roubar informações',
      examples: ['Emails de bancos falsos', 'Notificações de segurança falsas', 'Ofertas suspeitas'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Website Phishing',
      description: 'Sites falsos que imitam páginas legítimas para capturar dados',
      examples: ['Páginas de login falsas', 'Lojas online fraudulentas', 'Formulários maliciosos'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCard,
      title: 'Vishing (Voice Phishing)',
      description: 'Golpes por telefone fingindo ser de empresas confiáveis',
      examples: ['Ligações de bancos falsos', 'Suporte técnico fraudulento', 'Pesquisas suspeitas'],
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const warningSignals = [
    {
      icon: AlertTriangle,
      title: 'Urgência Excessiva',
      description: 'Mensagens que criam pressão para ação imediata',
      examples: ['Conta será bloqueada em 24h', 'Oferta expira hoje', 'Ação necessária agora']
    },
    {
      icon: Eye,
      title: 'Remetente Suspeito',
      description: 'Endereços de email ou domínios que não parecem oficiais',
      examples: ['banco-seguro.net (falso)', 'noreply@empresa-oficial.org', 'suporte123@gmail.com']
    },
    {
      icon: Lock,
      title: 'Solicitação de Dados',
      description: 'Pedidos para fornecer informações sensíveis',
      examples: ['Senhas e PINs', 'Números de cartão', 'Documentos pessoais']
    }
  ]

  const protectionTips = [
    {
      title: 'Verifique o Remetente',
      description: 'Sempre confirme se o email vem de uma fonte confiável',
      tips: [
        'Verifique o domínio do email',
        'Procure por erros de ortografia',
        'Desconfie de endereços genéricos'
      ]
    },
    {
      title: 'Não Clique em Links Suspeitos',
      description: 'Evite clicar em links de emails não solicitados',
      tips: [
        'Passe o mouse sobre o link para ver o destino',
        'Digite a URL diretamente no navegador',
        'Use sites oficiais para acessar serviços'
      ]
    },
    {
      title: 'Mantenha-se Atualizado',
      description: 'Use software atualizado e ferramentas de segurança',
      tips: [
        'Mantenha o antivírus atualizado',
        'Use autenticação de dois fatores',
        'Faça backups regulares dos dados'
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-3xl lg:text-4xl font-bold">
          Aprenda sobre Phishing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Entenda os diferentes tipos de ataques de phishing e como se proteger
        </p>
      </motion.div>

      {/* What is Phishing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300">
              <Shield className="h-6 w-6" />
              <span>O que é Phishing?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              <strong>Phishing</strong> é um tipo de ataque cibernético onde criminosos se fazem passar por 
              organizações confiáveis para roubar informações pessoais, senhas, dados bancários ou 
              instalar malware em seus dispositivos.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-red-600">91%</div>
                <div className="text-sm text-muted-foreground">dos ataques cibernéticos começam com phishing</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-red-600">1.5M</div>
                <div className="text-sm text-muted-foreground">sites de phishing criados mensalmente</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-red-600">R$ 12B</div>
                <div className="text-sm text-muted-foreground">perdas anuais por phishing no Brasil</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Types of Phishing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold">Tipos de Phishing</h2>
          <p className="text-muted-foreground">Conheça as principais formas de ataques de phishing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {phishingTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Exemplos comuns:</h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Warning Signals */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold">Sinais de Alerta</h2>
          <p className="text-muted-foreground">Aprenda a identificar tentativas de phishing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {warningSignals.map((signal, index) => {
            const Icon = signal.icon
            return (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-orange-600" />
                      <CardTitle className="text-orange-700 dark:text-orange-300">
                        {signal.title}
                      </CardTitle>
                    </div>
                    <CardDescription>{signal.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Exemplos:</h4>
                      <ul className="space-y-1">
                        {signal.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <span className="text-orange-500 mt-1">⚠️</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Protection Tips */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold">Como se Proteger</h2>
          <p className="text-muted-foreground">Dicas essenciais para manter-se seguro</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {protectionTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-green-200 bg-green-50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-300">
                    {tip.title}
                  </CardTitle>
                  <CardDescription>{tip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.tips.map((tipItem, idx) => (
                      <li key={idx} className="text-sm flex items-start space-x-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{tipItem}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Pronto para Praticar?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Agora que você conhece os conceitos básicos, teste seus conhecimentos 
                com nossas simulações realistas de phishing.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/simulator" className="inline-block">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Começar Simulações
                </button>
              </a>
              <a href="/checklist" className="inline-block">
                <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
                  Usar Checklist
                </button>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}

export default LearnPage

