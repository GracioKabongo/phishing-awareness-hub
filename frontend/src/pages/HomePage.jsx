import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Mail, 
  Target, 
  Award, 
  Users, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Play,
  ArrowRight
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  const stats = [
    { label: 'Usuários Treinados', value: '10,000+', icon: Users },
    { label: 'Simulações Disponíveis', value: '25+', icon: Mail },
    { label: 'Taxa de Sucesso', value: '94%', icon: TrendingUp },
    { label: 'Badges Conquistadas', value: '50,000+', icon: Award }
  ]

  const features = [
    {
      icon: Mail,
      title: 'Simulador de Emails',
      description: 'Pratique com emails de phishing realistas em um ambiente seguro',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Checklist de Segurança',
      description: 'Analise emails suspeitos com nossa ferramenta de verificação',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Sistema de Gamificação',
      description: 'Ganhe XP, badges e suba de nível enquanto aprende',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'Conteúdo Educativo',
      description: 'Aprenda sobre diferentes tipos de phishing e como se proteger',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Analista de TI',
      content: 'O PhishGuard me ajudou a identificar tentativas de phishing que antes passariam despercebidas. Excelente ferramenta!',
      avatar: '👩‍💼'
    },
    {
      name: 'João Santos',
      role: 'Gerente de Projetos',
      content: 'A gamificação torna o aprendizado muito mais envolvente. Consegui treinar toda minha equipe de forma divertida.',
      avatar: '👨‍💻'
    },
    {
      name: 'Ana Costa',
      role: 'Estudante',
      content: 'Como iniciante em segurança digital, o PhishGuard foi perfeito para aprender os conceitos básicos de forma prática.',
      avatar: '👩‍🎓'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Shield className="h-4 w-4" />
                  <span>Proteção Digital Inteligente</span>
                </motion.div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Aprenda a se{' '}
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    proteger
                  </span>{' '}
                  de phishing
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Desenvolva suas habilidades de segurança digital através de simulações realistas, 
                  gamificação envolvente e conteúdo educativo de qualidade.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={isAuthenticated ? "/simulator" : "/register"}>
                  <Button size="lg" className="w-full sm:w-auto">
                    <Play className="mr-2 h-5 w-5" />
                    Começar Agora
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Aprender Mais
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="flex justify-center mb-2">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="font-bold text-2xl">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Email Client</span>
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">De: banco@seguro-online.net</span>
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Para: usuario@email.com
                    </div>
                    <div className="font-medium">
                      🚨 URGENTE: Sua conta será bloqueada
                    </div>
                    <div className="text-sm">
                      Detectamos atividade suspeita em sua conta. 
                      Clique aqui para verificar...
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="destructive" className="pulse-danger">
                        Verificar Conta
                      </Button>
                      <Button size="sm" variant="outline">
                        Ignorar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    ⚠️ Este é um exemplo de phishing para demonstração
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-200 dark:from-red-800 dark:to-orange-800 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra como o PhishGuard pode ajudar você a se tornar um especialista em segurança digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Três passos simples para dominar a segurança digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Aprenda os Conceitos',
                description: 'Comece com nosso conteúdo educativo sobre phishing e suas variações',
                icon: BookOpen
              },
              {
                step: '02',
                title: 'Pratique com Simulações',
                description: 'Teste seus conhecimentos com emails de phishing realistas',
                icon: Target
              },
              {
                step: '03',
                title: 'Ganhe Recompensas',
                description: 'Colete XP, badges e suba de nível conforme progride',
                icon: Award
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {item.step}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de pessoas que melhoraram sua segurança digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Pronto para se tornar um especialista em segurança?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Junte-se a milhares de usuários que já aprenderam a se proteger de ataques de phishing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={isAuthenticated ? "/simulator" : "/register"}>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-red-600">
                  Saber Mais
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

