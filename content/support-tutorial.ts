import type { TutorialStep } from '@/types/tutorial';

export const supportTutorialSteps = [
  {
    id: 'choose-request-type',
    shortTitle: 'Escolher',
    title: 'Escolha o tipo de atendimento',
    description:
      'Comece pela opção que representa o que você precisa: corrigir uma falha ou solicitar uma nova entrega ou alteração.',
    captures: [
      {
        id: 'home-request-options',
        title: 'Escolha o caminho na página inicial',
        description:
          'Na área Acesso Rápido, escolha Reportar um problema ou Solicitar um serviço.',
        src: '/portal/inicio.png',
        width: 1300,
        height: 350,
        hotspots: [
          {
            id: 1,
            x: 35,
            y: 22,
            width: 31,
            height: 30,
            legend:
              'Reportar um problema: opção observada para pedir suporte quando algo apresenta uma falha.',
            evidence: 'observed',
          },
          {
            id: 2,
            x: 68,
            y: 22,
            width: 31,
            height: 30,
            legend:
              'Solicitar um serviço: opção observada para pedir um serviço à equipe de suporte.',
            evidence: 'observed',
          },
        ],
      },
    ],
    notes: [
      {
        id: 'request-type-rule',
        text: 'Use problema para uma falha em algo existente. Use serviço para instalação, criação ou alteração.',
        evidence: 'guidance',
      },
    ],
  },
  {
    id: 'provide-main-details',
    shortTitle: 'Informar',
    title: 'Informe os dados principais',
    description:
      'Identifique o equipamento, as pessoas que precisam acompanhar e o local em que a situação ocorre.',
    captures: [
      {
        id: 'main-request-fields',
        title: 'Informe dispositivo, observadores e localização',
        description:
          'Este recorte real concentra os campos desta etapa; Urgência e Categoria serão explicadas separadamente na próxima etapa.',
        src: '/portal/campos-principais.png',
        width: 500,
        height: 267,
        hotspots: [
          {
            id: 1,
            x: 4.3,
            y: 15.1,
            width: 92.1,
            height: 15.4,
            legend:
              'Dispositivos do usuário: selecione o equipamento relacionado quando ele estiver disponível.',
            evidence: 'observed',
          },
          {
            id: 2,
            x: 4.3,
            y: 47.9,
            width: 92.1,
            height: 15.4,
            legend:
              'Observadores: inclua somente pessoas que realmente precisam acompanhar o atendimento.',
            evidence: 'guidance',
          },
          {
            id: 3,
            x: 4.3,
            y: 80.7,
            width: 92.1,
            height: 15.4,
            legend:
              'Localização: selecione a unidade ou o local relacionado à ocorrência.',
            evidence: 'observed',
          },
        ],
      },
    ],
  },
  {
    id: 'set-urgency-and-category',
    shortTitle: 'Classificar',
    title: 'Defina urgência e categoria',
    description:
      'Indique o impacto real e escolha a categoria ou subcategoria mais específica para o assunto.',
    captures: [
      {
        id: 'urgency-options',
        title: 'Escolha a urgência conforme o impacto',
        description:
          'Na sessão documentada, o portal apresentou Muito Baixa, Baixa, Média, Alta e Muito Alta. O recorte disponível mostra o final dessa lista.',
        src: '/portal/urgencia.png',
        width: 980,
        height: 450,
        hotspots: [
          {
            id: 1,
            x: 3,
            y: 0,
            width: 47,
            height: 21,
            legend:
              'Alta e Muito Alta aparecem no final da lista registrada nesta captura.',
            evidence: 'observed',
          },
        ],
      },
      {
        id: 'category-options',
        title: 'Pesquise a categoria e escolha a subcategoria',
        description:
          'Ao abrir Categoria, o portal apresenta uma busca e opções organizadas por categoria e subcategoria.',
        src: '/portal/categoria.png',
        width: 980,
        height: 430,
        hotspots: [
          {
            id: 1,
            x: 3,
            y: 19,
            width: 47,
            height: 8,
            legend:
              'Use a busca da lista para localizar uma palavra relacionada ao pedido.',
            evidence: 'observed',
          },
          {
            id: 2,
            x: 3,
            y: 50,
            width: 47,
            height: 24,
            legend:
              'Escolha a subcategoria mais específica que represente o caso quando ela existir.',
            evidence: 'guidance',
          },
        ],
      },
    ],
    notes: [
      {
        id: 'urgency-impact',
        text: 'Defina a urgência pelo impacto real, considerando pessoas afetadas e alternativas disponíveis, não apenas pela pressa pessoal.',
        evidence: 'guidance',
      },
    ],
  },
  {
    id: 'describe-and-attach',
    shortTitle: 'Descrever',
    title: 'Descreva e anexe evidências',
    description:
      'Use um título claro, explique o contexto de forma objetiva e anexe somente evidências úteis e revisadas.',
    checklist: {
      title: 'Inclua na descrição',
      items: [
        'O que tentou fazer',
        'O que aconteceu',
        'Onde ocorreu',
        'Quando começou',
        'Quem foi afetado, quando relevante',
        'O que já tentou',
      ],
      evidence: 'guidance',
    },
    captures: [
      {
        id: 'description-and-attachments',
        title: 'Preencha título, descrição e anexos',
        description:
          'O asterisco em Descrição indica que esse campo foi apresentado como obrigatório na sessão documentada.',
        src: '/portal/descricao-anexos.png',
        width: 980,
        height: 565,
        hotspots: [
          {
            id: 1,
            x: 3,
            y: 7,
            width: 94,
            height: 7,
            legend:
              'Título: informe de forma curta o sistema ou equipamento e a dificuldade encontrada.',
            evidence: 'guidance',
          },
          {
            id: 2,
            x: 3,
            y: 31,
            width: 94,
            height: 18,
            legend:
              'Descrição: registre o que tentou fazer, o que aconteceu, onde, quando e qual mensagem apareceu.',
            evidence: 'guidance',
          },
          {
            id: 3,
            x: 31,
            y: 68,
            width: 37,
            height: 9,
            legend:
              'Anexos: o portal informou limite máximo de 2 MB na sessão documentada.',
            evidence: 'observed',
          },
        ],
      },
    ],
    notes: [
      {
        id: 'attachment-privacy',
        text: 'Antes de anexar, remova senhas, dados pessoais, acadêmicos e outras informações confidenciais.',
        evidence: 'guidance',
      },
    ],
  },
  {
    id: 'review-and-submit',
    shortTitle: 'Revisar',
    title: 'Revise e envie',
    description:
      'Confira os campos e os anexos antes de usar o botão Enviar. Esta documentação não pressupõe o formato da confirmação posterior.',
    captures: [
      {
        id: 'review-and-submit-form',
        title: 'Revise o formulário antes de enviar',
        description:
          'A evidência existente registra os campos finais e o botão Enviar, sem fabricar uma tela posterior.',
        src: '/portal/descricao-anexos.png',
        width: 980,
        height: 565,
        hotspots: [
          {
            id: 1,
            x: 3,
            y: 7,
            width: 94,
            height: 70,
            legend:
              'Revise título, descrição e anexos e confirme que nenhum dado confidencial será enviado.',
            evidence: 'guidance',
          },
          {
            id: 2,
            x: 89,
            y: 88,
            width: 10,
            height: 7,
            legend: 'Enviar: botão observado no final do formulário.',
            evidence: 'observed',
          },
        ],
      },
    ],
    notes: [
      {
        id: 'unverified-submit-confirmation',
        text: 'A confirmação de envio não foi observada na sessão documentada e não deve ser representada como fato.',
        evidence: 'guidance',
      },
    ],
  },
  {
    id: 'track-ticket',
    shortTitle: 'Acompanhar',
    title: 'Acompanhe o chamado',
    description:
      'Use a lista de chamados, confira os filtros e ordene os resultados para localizar um atendimento.',
    captures: [
      {
        id: 'ticket-list',
        title: 'Localize seus chamados',
        description:
          'A captura disponível registra filtros, ordenação e um estado sem resultados. Ela não mostra a tela interna de um chamado.',
        src: '/portal/chamados.png',
        width: 1300,
        height: 420,
        hotspots: [
          {
            id: 1,
            x: 4,
            y: 4,
            width: 12,
            height: 7,
            legend: 'Confira o filtro de Status ao procurar um chamado.',
            evidence: 'observed',
          },
          {
            id: 2,
            x: 17,
            y: 4,
            width: 18,
            height: 7,
            legend:
              'A lista observada permite ordenação por Última atualização.',
            evidence: 'observed',
          },
          {
            id: 3,
            x: 1,
            y: 14,
            width: 97,
            height: 14,
            legend:
              'Nenhum resultado encontrado: mensagem registrada com os filtros e a conta usados na sessão.',
            evidence: 'observed',
          },
        ],
      },
    ],
    notes: [
      {
        id: 'ticket-detail-guidance',
        text: 'Quando houver um chamado disponível, abra-o para consultar atualizações e responder no próprio histórico.',
        evidence: 'guidance',
      },
    ],
  },
] as const satisfies readonly TutorialStep[];

export type SupportTutorialStep = (typeof supportTutorialSteps)[number];
export type SupportTutorialStepId = SupportTutorialStep['id'];
