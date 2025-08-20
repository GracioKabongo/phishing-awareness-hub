import { Link } from 'react-router-dom'
import { Shield, Github, Linkedin, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                PhishGuard
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Aprenda a identificar e se proteger de ataques de phishing através de simulações interativas e gamificação.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
                  Aprender
                </Link>
              </li>
              <li>
                <Link to="/simulator" className="text-muted-foreground hover:text-foreground transition-colors">
                  Simulador
                </Link>
              </li>
              <li>
                <Link to="/checklist" className="text-muted-foreground hover:text-foreground transition-colors">
                  Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.cert.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  CERT.br
                </a>
              </li>
              <li>
                <a 
                  href="https://www.gov.br/pt-br/servicos/denunciar-crimes-na-internet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Denunciar Crimes
                </a>
              </li>
              <li>
                <a 
                  href="https://www.kaspersky.com.br/resource-center/threats/phishing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Guia de Phishing
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ic3.gov/Home/Phishing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FBI IC3
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contato</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@phishguard.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Este é um projeto educativo para demonstração de habilidades em desenvolvimento web e conscientização sobre segurança digital.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} PhishGuard. Projeto educativo de código aberto.
            </p>
            <p className="text-sm text-muted-foreground flex items-center space-x-1">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>para educação em segurança digital</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

