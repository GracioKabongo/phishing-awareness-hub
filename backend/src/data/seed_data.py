"""
Seed data for phishing simulations
This file contains realistic phishing email examples for educational purposes
"""

import json

SIMULATION_DATA = [
    # Banking Category - Beginner Level
    {
        'title': 'BIM - Conta Suspensa',
        'sender_name': 'Banco BIM',
        'sender_email': 'noreply@bim-mz.net',
        'subject': 'URGENTE: Sua conta BIM foi suspensa - Ação necessária',
        'content': '''
Caro Cliente BIM,

Detectamos atividade suspeita em sua conta bancária. Por motivos de segurança, sua conta foi temporariamente suspensa.

Para reativar sua conta, clique no link abaixo e confirme seus dados:
https://bim-verificacao.net/reativar

Dados necessários:
- Número da conta
- PIN do cartão
- Código de segurança

ATENÇÃO: Você tem 24 horas para confirmar, caso contrário sua conta será permanentemente bloqueada.

Atenciosamente,
Equipe de Segurança BIM
''',
        'difficulty': 'beginner',
        'category': 'banking',
        'phishing_indicators': json.dumps([
            'URL suspeita (não é do BIM real)',
            'Urgência excessiva (24 horas)',
            'Solicitação de dados sensíveis',
            'Domínio falso (bim-mz.net)',
            'Ameaça de bloqueio permanente'
        ]),
        'correct_action': 'delete',
        'explanation': 'Este é um email de phishing clássico. O BIM nunca solicita dados sensíveis por email. A URL é falsa e o tom urgente é uma tática comum de golpistas.'
    },
    
    # Social Category - Beginner Level
    {
        'title': 'Falso Prêmio de Loteria Moçambicana',
        'sender_name': 'Lotaria Nacional de Moçambique',
        'sender_email': 'premio@lotaria-mz.org',
        'subject': '🎉 PARABÉNS! Você ganhou 15.000.000 MT na Lotaria Nacional!',
        'content': '''
FELICITAÇÕES!!!

Você foi selecionado como ganhador de 15.000.000 MT (QUINZE MILHÕES DE METICAIS) na Lotaria Nacional de Moçambique 2024!

Seu número da sorte: LNM-2024-7891

Para receber seu prêmio, envie os seguintes dados:
- Nome completo
- Endereço completo em Moçambique
- Número de telefone
- Cópia do Bilhete de Identidade
- Dados bancários para transferência

Responda este email em até 48 horas ou perderá o direito ao prêmio.

Parabéns novamente!
Comitê da Lotaria Nacional de Moçambique
''',
        'difficulty': 'beginner',
        'category': 'social',
        'phishing_indicators': json.dumps([
            'Prêmio não solicitado',
            'Valor muito alto (15 milhões MT)',
            'Solicitação de dados pessoais',
            'Prazo urgente (48 horas)',
            'Email genérico sem personalização'
        ]),
        'correct_action': 'delete',
        'explanation': 'Golpe clássico de loteria falsa. Você não pode ganhar uma lotaria que nunca participou. Nunca forneça dados pessoais para "prêmios" não solicitados.'
    },
    
    # Work Category - Intermediate Level
    {
        'title': 'Falso Email de RH - Empresa Moçambicana',
        'sender_name': 'Recursos Humanos',
        'sender_email': 'rh@empresa-moz.co.mz',
        'subject': 'Atualização Obrigatória - Sistema de Folha de Pagamento',
        'content': '''
Prezado(a) Colaborador(a),

Devido a atualizações no sistema de folha de pagamento, todos os funcionários devem atualizar suas informações até sexta-feira.

Acesse o sistema através do link:
https://portal-funcionarios.empresa-moz.co.mz/login

Dados necessários para atualização:
- Login e senha do sistema
- Número do NUIT
- Dados bancários atualizados

Importante: Funcionários que não atualizarem até o prazo terão problemas no pagamento do próximo mês.

Departamento de RH
Empresa Moçambique Solutions Lda.
''',
        'difficulty': 'intermediate',
        'category': 'work',
        'phishing_indicators': json.dumps([
            'Solicitação de credenciais de login',
            'URL suspeita (pode não ser da empresa real)',
            'Ameaça relacionada ao pagamento',
            'Prazo apertado',
            'Solicitação de dados sensíveis (NUIT, dados bancários)'
        ]),
        'correct_action': 'report',
        'explanation': 'Email suspeito simulando comunicação interna. Sempre verifique com o RH pessoalmente antes de fornecer dados sensíveis. A URL pode ser falsa.'
    },
    
    # Shopping Category - Intermediate Level
    {
        'title': 'Falsa Confirmação de Compra - Shoprite',
        'sender_name': 'Shoprite Moçambique',
        'sender_email': 'pedidos@shoprite-mz.net',
        'subject': 'Confirmação de Pedido #SRT-789456123',
        'content': '''
Olá,

Recebemos seu pedido online e estamos processando o pagamento.

Detalhes do Pedido:
- Samsung Galaxy S24 256GB - 89.999 MT
- Entrega: 2-3 dias úteis em Maputo
- Pedido: #SRT-789456123

Houve um problema com o pagamento do seu cartão. Para evitar o cancelamento, confirme seus dados:

https://shoprite-verificacao.net/confirmar-pagamento

Se você não fez este pedido, clique aqui para cancelar:
https://shoprite-verificacao.net/cancelar

Obrigado por escolher o Shoprite!
Equipe Shoprite Moçambique
''',
        'difficulty': 'intermediate',
        'category': 'shopping',
        'phishing_indicators': json.dumps([
            'Pedido não realizado pelo usuário',
            'URL falsa (shoprite-mz.net)',
            'Solicitação de confirmação de dados de pagamento',
            'Valor alto para criar urgência (89.999 MT)',
            'Links suspeitos para "cancelar"'
        ]),
        'correct_action': 'delete',
        'explanation': 'Golpe comum simulando compras não realizadas. O Shoprite nunca solicita confirmação de dados por email. Sempre acesse o site oficial diretamente.'
    },
    
    # Banking Category - Advanced Level
    {
        'title': 'Sofisticado Golpe Bancário - Millennium bim',
        'sender_name': 'Millennium bim',
        'sender_email': 'seguranca@millenniumbim.co.mz',
        'subject': 'Notificação de Segurança - Token Digital',
        'content': '''
Prezado Cliente,

Identificamos uma tentativa de acesso não autorizado à sua conta através de um dispositivo não reconhecido.

Local: Maputo, Moçambique
Horário: 14:32 - 20/01/2024
Dispositivo: iPhone (iOS 17.2)

Por segurança, seu token digital foi temporariamente desabilitado. Para reativar:

1. Acesse: https://millenniumbim.co.mz/token-reativacao
2. Informe sua agência e conta
3. Digite sua senha de 6 dígitos
4. Confirme com o código SMS

Esta é uma medida preventiva para proteger seus recursos. Caso não tenha sido você, entre em contato conosco imediatamente.

Central de Atendimento: +258 21 481 200

Millennium bim - Segurança Digital
''',
        'difficulty': 'advanced',
        'category': 'banking',
        'phishing_indicators': json.dumps([
            'URL pode parecer legítima mas deve ser verificada',
            'Informações específicas (local, horário) para parecer real',
            'Solicitação de dados bancários sensíveis',
            'Uso de marca conhecida (Millennium bim)',
            'Técnica de engenharia social (medo de invasão)'
        ]),
        'correct_action': 'report',
        'explanation': 'Golpe sofisticado que usa informações específicas para parecer real. Sempre acesse o site do banco digitando a URL diretamente ou ligue para verificar.'
    },
    
    # Work Category - Advanced Level
    {
        'title': 'Spear Phishing Executivo - Empresa Moçambicana',
        'sender_name': 'CEO António Machava',
        'sender_email': 'a.machava@empresa-mz.co.mz',
        'subject': 'CONFIDENCIAL - Transferência Urgente',
        'content': '''
Bom dia,

Estou em reunião com investidores sul-africanos e preciso de sua ajuda com uma transferência urgente.

Devido à confidencialidade do projeto, não posso usar os canais normais. Preciso que faça uma transferência de 2.500.000 MT para:

Banco: Standard Bank
Agência: Maputo Central
Conta: 567890-1
Favorecido: Consultoria Internacional Lda.

É para pagamento de consultoria estratégica. Faça hoje ainda, por favor.

Depois conversamos pessoalmente sobre os detalhes.

Obrigado,
António Machava
CEO - Empresa Moçambique XYZ
''',
        'difficulty': 'advanced',
        'category': 'work',
        'phishing_indicators': json.dumps([
            'Solicitação de transferência financeira por email',
            'Pedido de sigilo/confidencialidade',
            'Urgência injustificada',
            'Valor alto (2.5 milhões MT)',
            'Tentativa de evitar procedimentos normais',
            'Email pode ser falsificado (spoofing)'
        ]),
        'correct_action': 'report',
        'explanation': 'Golpe de "CEO Fraud" ou "Business Email Compromise". Sempre confirme solicitações financeiras pessoalmente ou por telefone, mesmo vindas de superiores.'
    },
    
    # Social Category - Advanced Level
    {
        'title': 'Falso Suporte Técnico',
        'sender_name': 'Microsoft Support',
        'sender_email': 'support@microsoft-security.com',
        'subject': 'Alerta de Segurança: Vírus Detectado em seu Computador',
        'content': '''
Caro Usuário do Windows,

Nossos sistemas detectaram atividade maliciosa em seu computador (IP: 192.168.1.100).

Ameaças Detectadas:
- Trojan.Win32.Generic (Alto Risco)
- Adware.Tracking.Cookies (Médio Risco)
- Spyware.KeyLogger (Alto Risco)

Ação Imediata Necessária:

1. Baixe nossa ferramenta de limpeza: https://microsoft-security.com/cleanup
2. Execute como administrador
3. Siga as instruções na tela

Ou ligue para nosso suporte: +55 11 9999-8888

Não ignore este aviso. Seus dados pessoais podem estar em risco.

Equipe de Segurança Microsoft
Certificado ISO 27001
''',
        'difficulty': 'advanced',
        'category': 'social',
        'phishing_indicators': json.dumps([
            'Microsoft não envia alertas de vírus por email',
            'URL suspeita (microsoft-security.com)',
            'Solicitação para baixar software',
            'Informações técnicas falsas para impressionar',
            'Número de telefone suspeito',
            'Criação de medo e urgência'
        ]),
        'correct_action': 'delete',
        'explanation': 'A Microsoft nunca envia alertas de vírus por email. Este é um golpe para instalar malware ou obter acesso remoto ao computador.'
    },
    
    # Shopping Category - Beginner Level
    {
        'title': 'Promoção Falsa Black Friday - Game Moçambique',
        'sender_name': 'Game Moçambique Promoções',
        'sender_email': 'promocoes@game-mz-ofertas.com',
        'subject': '🔥 BLACK FRIDAY: 90% OFF em TUDO! Apenas hoje!',
        'content': '''
🛍️ SUPER BLACK FRIDAY GAME 🛍️

DESCONTOS IMPERDÍVEIS DE ATÉ 90%!

⚡ iPhone 14: 49.999 MT (era 299.999 MT)
⚡ Notebook Gamer: 39.999 MT (era 249.999 MT)  
⚡ Smart TV 65": 29.999 MT (era 199.999 MT)

🚨 ÚLTIMAS HORAS! 🚨

Clique aqui para aproveitar:
https://game-blackfriday.net/ofertas

Pagamento facilitado:
- Cartão de crédito
- M-Pesa com desconto extra
- Transferência bancária

Corre que está acabando!
Equipe Game Moçambique
''',
        'difficulty': 'beginner',
        'category': 'shopping',
        'phishing_indicators': json.dumps([
            'Descontos irreais (90% off)',
            'URL falsa (game-mz-ofertas.com)',
            'Preços muito baixos para serem verdadeiros',
            'Urgência excessiva ("últimas horas")',
            'Emojis excessivos para chamar atenção'
        ]),
        'correct_action': 'delete',
        'explanation': 'Ofertas boas demais para serem verdadeiras geralmente são golpes. Sempre acesse sites de compras digitando a URL oficial diretamente.'
    }
]

BADGE_DATA = [
    {
        'name': 'Primeiro Passo',
        'description': 'Complete sua primeira simulação',
        'icon': 'play-circle',
        'unlock_criteria': json.dumps({'total_attempts': 1}),
        'xp_reward': 5,
        'rarity': 'common'
    },
    {
        'name': 'Iniciante',
        'description': 'Complete 5 simulações',
        'icon': 'target',
        'unlock_criteria': json.dumps({'total_attempts': 5}),
        'xp_reward': 10,
        'rarity': 'common'
    },
    {
        'name': 'Olho Aguçado',
        'description': 'Alcance 80% de precisão',
        'icon': 'eye',
        'unlock_criteria': json.dumps({'accuracy': 80, 'min_attempts': 5}),
        'xp_reward': 15,
        'rarity': 'rare'
    },
    {
        'name': 'Perfeição',
        'description': 'Alcance 100% de precisão com pelo menos 10 tentativas',
        'icon': 'award',
        'unlock_criteria': json.dumps({'accuracy': 100, 'min_attempts': 10}),
        'xp_reward': 25,
        'rarity': 'epic'
    },
    {
        'name': 'Estudante Dedicado',
        'description': 'Complete 25 simulações',
        'icon': 'book-open',
        'unlock_criteria': json.dumps({'total_attempts': 25}),
        'xp_reward': 20,
        'rarity': 'rare'
    },
    {
        'name': 'Especialista em Segurança',
        'description': 'Complete 50 simulações',
        'icon': 'shield-check',
        'unlock_criteria': json.dumps({'total_attempts': 50}),
        'xp_reward': 30,
        'rarity': 'epic'
    },
    {
        'name': 'Mestre da Sequência',
        'description': 'Mantenha uma sequência de 7 dias',
        'icon': 'flame',
        'unlock_criteria': json.dumps({'streak_days': 7}),
        'xp_reward': 20,
        'rarity': 'rare'
    },
    {
        'name': 'Subindo de Nível',
        'description': 'Alcance o nível 5',
        'icon': 'trending-up',
        'unlock_criteria': json.dumps({'level': 5}),
        'xp_reward': 25,
        'rarity': 'epic'
    },
    {
        'name': 'Velocista',
        'description': 'Complete uma simulação em menos de 10 segundos',
        'icon': 'zap',
        'unlock_criteria': json.dumps({'fast_completion': 10}),
        'xp_reward': 15,
        'rarity': 'rare'
    },
    {
        'name': 'Guru da Segurança',
        'description': 'Complete 100 simulações',
        'icon': 'crown',
        'unlock_criteria': json.dumps({'total_attempts': 100}),
        'xp_reward': 50,
        'rarity': 'legendary'
    }
]

