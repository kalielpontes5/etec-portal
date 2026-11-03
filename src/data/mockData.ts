import { Student, ServiceType, RequestItem, FAQItem } from '../types';

export const CURRENT_STUDENT: Student = {
  id: 'std-2024-001',
  name: 'Lucas Silva Oliveira',
  ra: '231049-8',
  cpf: '458.***.***-12',
  email: 'lucas.oliveira145@etec.sp.gov.br',
  phone: '(11) 98765-4321',
  course: 'Técnico em Desenvolvimento de Sistemas',
  courseType: 'Habilitação Profissional Técnica de Nível Médio',
  module: '3º Módulo',
  shift: 'Noturno (19h00 às 22h45)',
  unit: 'ETEC Prof. Horácio Augusto da Silveira',
  unitCode: 'Unidade 014 - São Paulo/SP',
  academicYear: '1º Semestre / 2026',
  status: 'Ativo'
};

export const AVAILABLE_SERVICES: ServiceType[] = [
  {
    id: 'dec_matricula',
    title: 'Declaração de Matrícula',
    category: 'documentos',
    categoryLabel: 'Documentos Acadêmicos',
    estimatedDays: 1,
    deliveryOptions: ['digital', 'presencial'],
    description: 'Comprovante oficial de vínculo com a ETEC, indicando curso, módulo, período e regularidade acadêmica com autenticação digital.',
    requiresAttachment: false,
    iconName: 'FileCheck',
    badge: 'Emissão Rápida'
  },
  {
    id: 'passe_escolar',
    title: 'Passe Escolar / Bilhete Único (SPTrans & EMTU)',
    category: 'transporte',
    categoryLabel: 'Transporte e Passe',
    estimatedDays: 3,
    deliveryOptions: ['digital'],
    description: 'Envio e validação cadastral para obtenção de benefício do Bilhete Único Estudante (SPTrans) ou Passe Livre Metropolitano (EMTU).',
    requiresAttachment: true,
    attachmentInstructions: 'Anexe o comprovante de endereço recente (máx. 3 meses) em nome do aluno ou responsável legal.',
    iconName: 'Bus',
    badge: 'Ano Letivo 2026'
  },
  {
    id: 'historico_parcial',
    title: 'Histórico Escolar Parcial',
    category: 'documentos',
    categoryLabel: 'Documentos Acadêmicos',
    estimatedDays: 5,
    deliveryOptions: ['digital', 'presencial'],
    description: 'Documento descritivo de todas as disciplinas concluídas com as respectivas menções e frequências até o módulo anterior.',
    requiresAttachment: false,
    iconName: 'GraduationCap'
  },
  {
    id: 'carteirinha',
    title: 'Carteirinha de Estudante (2ª Via)',
    category: 'documentos',
    categoryLabel: 'Documentos Acadêmicos',
    estimatedDays: 7,
    deliveryOptions: ['presencial'],
    description: 'Confecção de novo cartão de identificação do estudante para acesso às catracas e biblioteca da unidade.',
    requiresAttachment: true,
    attachmentInstructions: 'Foto 3x4 recente em fundo branco (JPG ou PNG).',
    iconName: 'IdCard'
  },
  {
    id: 'justificativa_falta',
    title: 'Justificativa de Faltas / Atestado Médico',
    category: 'atestados',
    categoryLabel: 'Frequência e Atestados',
    estimatedDays: 2,
    deliveryOptions: ['digital'],
    description: 'Protocolo de atestado médico ou declaração de trabalho para abono/compensação legal de ausências (Regimento CPS).',
    requiresAttachment: true,
    attachmentInstructions: 'Atestado legível com carimbo, CRM médico e período de afastamento (prazo de até 48h úteis após o retorno).',
    iconName: 'HeartPulse'
  },
  {
    id: 'trancamento',
    title: 'Trancamento de Matrícula',
    category: 'matricula',
    categoryLabel: 'Gestão de Matrícula',
    estimatedDays: 5,
    deliveryOptions: ['presencial'],
    description: 'Solicitação formal de suspensão temporária dos estudos por até 2 semestres letivos, conforme resolução do Centro Paula Souza.',
    requiresAttachment: true,
    attachmentInstructions: 'Carta de justificativa assinada pelo aluno (ou responsável se menor de 18 anos) e nada consta da biblioteca.',
    iconName: 'PauseCircle'
  },
  {
    id: 'dispensa_disciplinas',
    title: 'Aproveitamento de Estudos / Dispensa',
    category: 'matricula',
    categoryLabel: 'Gestão de Matrícula',
    estimatedDays: 10,
    deliveryOptions: ['digital', 'presencial'],
    description: 'Análise de equivalência curricular para dispensa de componentes com base em cursos técnicos ou superiores anteriores.',
    requiresAttachment: true,
    attachmentInstructions: 'Histórico escolar e planos de ensino/ementas das disciplinas já cursadas carimbadas pela instituição de origem.',
    iconName: 'BookOpenCheck'
  },
  {
    id: 'dec_conclusao',
    title: 'Declaração de Conclusão de Curso',
    category: 'documentos',
    categoryLabel: 'Documentos Acadêmicos',
    estimatedDays: 3,
    deliveryOptions: ['digital', 'presencial'],
    description: 'Documento provisório expedido após o término do curso com aprovação e estágio supervisionado/TCC aprovado até expedição do diploma.',
    requiresAttachment: false,
    iconName: 'Award'
  }
];

export const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'REQ-2026-4891',
    serviceId: 'dec_matricula',
    serviceTitle: 'Declaração de Matrícula',
    category: 'Documentos Acadêmicos',
    studentId: 'std-2024-001',
    studentName: 'Lucas Silva Oliveira',
    studentRa: '231049-8',
    createdAt: '2026-03-01T09:15:00Z',
    updatedAt: '2026-03-01T14:30:00Z',
    estimatedCompletion: '2026-03-02',
    status: 'concluido',
    deliveryMode: 'digital',
    notes: 'Necessito da declaração com a menção do horário das aulas noturnas para apresentar na empresa onde realizo estágio.',
    attachments: [],
    timeline: [
      {
        status: 'em_analise',
        title: 'Solicitação Enviada',
        date: '01/03/2026 09:15',
        description: 'Pedido registrado no sistema pelo aluno com sucesso.'
      },
      {
        status: 'em_processamento',
        title: 'Verificação Acadêmica',
        date: '01/03/2026 11:20',
        description: 'Vínculo ativo e matrícula regular confirmados pela secretaria.',
        responsible: 'Maria Aparecida Santos (Secretaria)'
      },
      {
        status: 'concluido',
        title: 'Documento Emitido',
        date: '01/03/2026 14:30',
        description: 'Declaração assinada eletronicamente e liberada para download com código de autenticação digital.',
        responsible: 'Sistema NSA / Secretaria'
      }
    ],
    secretaryFeedback: 'Documento gerado com sucesso. Código de autenticidade ativo no portal do Centro Paula Souza.',
    authCode: 'CPS-ETEC-2026-89412-AUT',
    digitalDocumentAvailable: true
  },
  {
    id: 'REQ-2026-4812',
    serviceId: 'passe_escolar',
    serviceTitle: 'Passe Escolar / Bilhete Único (SPTrans & EMTU)',
    category: 'Transporte e Passe',
    studentId: 'std-2024-001',
    studentName: 'Lucas Silva Oliveira',
    studentRa: '231049-8',
    createdAt: '2026-02-28T16:40:00Z',
    updatedAt: '2026-03-02T10:15:00Z',
    estimatedCompletion: '2026-03-05',
    status: 'em_processamento',
    deliveryMode: 'digital',
    notes: 'Revalidação do Bilhete Único de Estudante SPTrans para o 1º semestre de 2026.',
    attachments: [
      {
        name: 'comprovante_residencia_enel_fev2026.pdf',
        size: '1.4 MB',
        type: 'application/pdf'
      }
    ],
    timeline: [
      {
        status: 'em_analise',
        title: 'Solicitação Criada',
        date: '28/02/2026 16:40',
        description: 'Formulário e anexo de comprovante de residência recebidos.'
      },
      {
        status: 'em_processamento',
        title: 'Envio ao Sistema SPTrans / DNE',
        date: '02/03/2026 10:15',
        description: 'Dados da matrícula encaminhados no lote semanal para a SPTrans. Aguardando processamento da operadora.',
        responsible: 'Carlos Eduardo Moura (Atendimento)'
      }
    ],
    secretaryFeedback: 'Lote enviado à SPTrans. O prazo para atualização no sistema sptrans.com.br é de até 3 dias úteis.'
  },
  {
    id: 'REQ-2026-4765',
    serviceId: 'carteirinha',
    serviceTitle: 'Carteirinha de Estudante (2ª Via)',
    category: 'Documentos Acadêmicos',
    studentId: 'std-2024-001',
    studentName: 'Lucas Silva Oliveira',
    studentRa: '231049-8',
    createdAt: '2026-02-24T11:00:00Z',
    updatedAt: '2026-03-01T16:00:00Z',
    estimatedCompletion: '2026-03-03',
    status: 'pronto_retirada',
    deliveryMode: 'presencial',
    pickupLocation: 'Secretaria Acadêmica - Guichê 02 (Apresentar documento com foto)',
    notes: 'Perda do cartão magnético original nas dependências da estação.',
    attachments: [
      {
        name: 'foto_3x4_lucas.jpg',
        size: '640 KB',
        type: 'image/jpeg'
      }
    ],
    timeline: [
      {
        status: 'em_analise',
        title: 'Abertura do Chamado',
        date: '24/02/2026 11:00',
        description: 'Solicitação de 2ª via e foto anexada.'
      },
      {
        status: 'em_processamento',
        title: 'Impressão do Cartão',
        date: '26/02/2026 14:10',
        description: 'Identificação impressa e chip codificado na administração.'
      },
      {
        status: 'pronto_retirada',
        title: 'Pronto para Retirada',
        date: '01/03/2026 16:00',
        description: 'Disponível no balcão da Secretaria. Horário: 08h00 às 21h30.',
        responsible: 'Secretaria Escolar'
      }
    ],
    secretaryFeedback: 'Seu cartão físico está pronto. Pode ser retirado no guichê 02 durante o horário de atendimento presencial.'
  },
  {
    id: 'REQ-2026-4620',
    serviceId: 'historico_parcial',
    serviceTitle: 'Histórico Escolar Parcial',
    category: 'Documentos Acadêmicos',
    studentId: 'std-2024-001',
    studentName: 'Lucas Silva Oliveira',
    studentRa: '231049-8',
    createdAt: '2026-02-15T14:20:00Z',
    updatedAt: '2026-02-19T17:00:00Z',
    estimatedCompletion: '2026-02-20',
    status: 'concluido',
    deliveryMode: 'presencial',
    pickupLocation: 'Arquivo da Secretaria - Bloco A',
    notes: 'Necessário para inscrição no vestibular FATEC e comprovação de componentes curriculares.',
    attachments: [],
    timeline: [
      {
        status: 'em_analise',
        title: 'Protocolado',
        date: '15/02/2026 14:20',
        description: 'Pedido inserido na fila de emissão de históricos.'
      },
      {
        status: 'concluido',
        title: 'Retirado pelo Aluno',
        date: '19/02/2026 17:00',
        description: 'Documento assinado pela Diretoria de Serviços e entregue ao estudante mediante protocolo físico.',
        responsible: 'Maria Aparecida Santos'
      }
    ],
    secretaryFeedback: 'Histórico parcial entregue e assinado no livro de protocolos.'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'prazos',
    question: 'Qual é o prazo de emissão para a Declaração de Matrícula?',
    answer: 'A Declaração de Matrícula Digital é disponibilizada em até 24 horas úteis (geralmente no mesmo dia). Ela possui assinatura eletrônica oficial do Centro Paula Souza e código de validação pública com QR Code, tendo validade jurídica plena.'
  },
  {
    id: 'faq-2',
    category: 'transporte',
    question: 'Como funciona a solicitação do Passe Escolar (SPTrans ou EMTU)?',
    answer: 'Após o envio do pedido neste portal com o comprovante de residência atualizado, a secretaria cadastra os dados no sistema da operadora (SPTrans/EMTU) em até 3 dias úteis. Em seguida, você deve acessar o site sptrans.com.br ou emtu.sp.gov.br para pagar a taxa do cartão ou consultar a concessão do Passe Livre.'
  },
  {
    id: 'faq-3',
    category: 'secretaria',
    question: 'Quais são os horários de atendimento presencial da Secretaria da ETEC?',
    answer: 'O atendimento no balcão presencial ocorre de segunda a sexta-feira, nos três períodos: Manhã (08h00 às 11h30), Tarde (13h30 às 17h00) e Noite (18h30 às 21h30). Recomendamos a utilização deste portal para agilizar retiradas.'
  },
  {
    id: 'faq-4',
    category: 'documentos',
    question: 'Como comprovar a autenticidade dos documentos digitais emitidos pela ETEC?',
    answer: 'Todos os documentos gerados pelo sistema contêm um Código de Autenticidade único e QR Code no rodapé. Qualquer instituição, empresa ou órgão público pode validar o documento apontando a câmera do celular para o QR Code ou digitando o código na página oficial de autenticação do Centro Paula Souza.'
  },
  {
    id: 'faq-5',
    category: 'prazos',
    question: 'Qual o prazo limite para entrega de atestados médicos de faltas?',
    answer: 'Conforme o Regimento Comum das ETECs do Centro Paula Souza, o atestado médico deve ser protocolado pelo estudante ou seu responsável em até 48 horas úteis após o término do período de afastamento especificado pelo médico.'
  },
  {
    id: 'faq-6',
    category: 'secretaria',
    question: 'Posso pedir para outra pessoa retirar um documento físico em meu nome?',
    answer: 'Sim, desde que a pessoa apresente procuração simples assinada pelo aluno acompanhada de cópia do documento de identificação (RG/CNH) do aluno e documento original com foto de quem está retirando. Pais ou responsáveis legais de menores de 18 anos não necessitam de procuração.'
  }
];

export const SECRETARY_NOTICES = [
  {
    id: 'not-1',
    title: 'Recadastramento do Bilhete Único 2026/1',
    date: '02 Mar 2026',
    important: true,
    content: 'O envio dos lotes de matrícula para a SPTrans ocorre às terças e quintas-feiras. Certifique-se de anexar comprovante de residência legível.'
  },
  {
    id: 'not-2',
    title: 'Plantão de Atendimento aos Formandos e TCC',
    date: '28 Fev 2026',
    important: false,
    content: 'A secretaria disponibilizou canal exclusivo para conferência de documentos de conclusão e certidões de estágio supervisionado.'
  },
  {
    id: 'not-3',
    title: 'Declarações com Assinatura Digital ICP-Brasil',
    date: '20 Fev 2026',
    important: false,
    content: 'Agora todas as declarações de matrícula possuem autenticação digital instantânea, dispensando a necessidade de carimbo físico.'
  }
];
