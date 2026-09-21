'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { CaptureViewer } from '@/components/tutorial/annotated-capture';
import type {
  EvidenceKind,
  PortalCaptureSource,
  TutorialCapture,
} from '@/types/tutorial';

type Mark = { x: number; y: number; w: number; h: number; text: string; evidence?: EvidenceKind };
type Screen = { title: string; file: PortalCaptureSource; width: number; height: number; intro: string; marks: Mark[] };
export const screens = {
  inicio: { title: 'Escolha o caminho na página inicial', file: '/portal/inicio.png', width: 1300, height: 350,
    intro: 'Entre em suporte.ub.edu.br com sua conta. Na área Acesso Rápido, escolha o cartão que corresponde ao que você precisa.',
    marks: [
      { x: 35, y: 22, w: 31, h: 30, text: 'Reportar um problema: clique aqui quando algo que funcionava apresentar falha, como internet indisponível ou erro de impressão.' },
      { x: 68, y: 22, w: 31, h: 30, text: 'Solicitar um serviço: clique aqui para pedir uma instalação, criação de acesso ou alteração.' },
      { x: 35, y: 57, w: 31, h: 35, text: 'Ver seus chamados: consulte os pedidos que você já criou. Para o mesmo problema, acompanhe o chamado existente.' },
    ] },
  campos: { title: 'Identifique o impacto e o local', file: '/portal/campos.png', width: 980, height: 515,
    intro: 'Este é o formulário real “Reportar um problema”. Clique nas listas para escolher os valores. “Solicitar um serviço” apresenta os mesmos campos.',
    marks: [
      { x: 3, y: 22, w: 47, h: 8, text: 'Urgência: escolha a opção que representa o impacto real. Considere quantas pessoas foram afetadas e se existe uma alternativa para continuar trabalhando.' },
      { x: 3, y: 39, w: 47, h: 8, text: 'Categoria: abra a lista, pesquise o assunto e escolha a subcategoria mais específica disponível.' },
      { x: 3, y: 56, w: 47, h: 8, text: 'Dispositivos do usuário: selecione o equipamento relacionado, quando estiver disponível. Se não aparecer, identifique-o na descrição.' },
      { x: 3, y: 73, w: 47, h: 8, text: 'Observadores: inclua somente quem precisa acompanhar o atendimento. Confira a pessoa selecionada antes de continuar.' },
      { x: 3, y: 90, w: 47, h: 8, text: 'Localização: indique a unidade ou local da ocorrência. Acrescente setor e sala na descrição, quando necessário.' },
    ] },
  descricao: { title: 'Descreva, anexe e revise antes de enviar', file: '/portal/descricao-anexos.png', width: 980, height: 565,
    intro: 'Role o formulário para encontrar estes campos. O asterisco identifica um campo obrigatório; nesta captura ele aparece em Descrição.',
    marks: [
      { x: 3, y: 7, w: 94, h: 7, text: 'Título: escreva o sistema ou equipamento e a dificuldade. Exemplo fictício: “Impressora da secretaria não imprime PDF”.' },
      { x: 3, y: 31, w: 94, h: 18, text: 'Descrição: clique na área em branco abaixo das ferramentas de edição. Informe o que tentou fazer, o erro, quando começou, local, impacto e tentativas realizadas.' },
      { x: 31, y: 68, w: 37, h: 9, text: 'Escolher arquivo: adicione uma captura ou documento útil. O portal informa 2 MB no máximo. Revise o conteúdo e retire dados pessoais, senhas e informações confidenciais.' },
      { x: 89, y: 88, w: 10, h: 7, text: 'Enviar: após revisar tudo, clique uma vez. Aguarde o retorno do portal. Se aparecer um aviso de campo obrigatório, corrija-o; não considere o chamado aberto antes da confirmação.' },
    ] },
  categoria: { title: 'Pesquise a categoria e escolha a subcategoria', file: '/portal/categoria.png', width: 980, height: 430,
    intro: 'Ao abrir Categoria, aparece uma busca dentro da própria lista. Os itens recuados pertencem à categoria logo acima.',
    marks: [
      { x: 3, y: 19, w: 47, h: 8, text: 'Digite uma palavra relacionada ao pedido na busca da lista, por exemplo “impressora” ou “email”.' },
      { x: 3, y: 50, w: 47, h: 24, text: 'Escolha a ação específica quando ela existir. A captura mostra Executar, Restaurar e Validar Backup como subcategorias de Backup. Clique na opção correspondente ao seu caso.' },
    ] },
  urgencia: { title: 'Escolha a urgência conforme o impacto', file: '/portal/urgencia.png', width: 980, height: 450,
    intro: 'Ao abrir Urgência, o portal apresenta cinco níveis: Muito Baixa, Baixa, Média, Alta e Muito Alta. Escolha pelo impacto real da situação, não apenas pela pressa pessoal.',
    marks: [
      { x: 3, y: 0, w: 47, h: 21, text: 'Alta e Muito Alta ficam no fim da lista. Use esses níveis quando o impacto for realmente elevado, por exemplo quando muitas pessoas estiverem impedidas de trabalhar e não houver alternativa.' },
      { x: 3, y: 25, w: 47, h: 16, text: 'Depois de escolher a urgência, continue preenchendo Categoria e os demais campos. Uma descrição clara ajuda a equipe a confirmar a prioridade correta.' },
    ] },
  chamados: { title: 'Encontre um chamado já aberto', file: '/portal/chamados.png', width: 1300, height: 420,
    intro: 'Acesse Chamados no menu superior ou Ver seus chamados na Home. A captura mostra a lista real sem resultados nesta conta e com o filtro atual.',
    marks: [
      { x: 4, y: 4, w: 12, h: 7, text: 'Filtrado por Status: confira os filtros quando não encontrar um chamado. Um filtro pode esconder atendimentos solucionados ou fechados.' },
      { x: 17, y: 4, w: 18, h: 7, text: 'Ordenado por Última atualização: use a ordenação para localizar os atendimentos mais recentes.' },
      { x: 1, y: 14, w: 97, h: 14, text: 'Nenhum resultado encontrado: não há itens para exibir com a consulta atual. Confira os filtros e a conta utilizada. Isso, sozinho, não confirma que um envio anterior falhou.' },
    ] },
  faq: { title: 'Procure uma orientação na FAQ', file: '/portal/faq.png', width: 1300, height: 240,
    intro: 'Abra FAQ no menu superior ou Procure artigos de ajuda na Home.',
    marks: [
      { x: 29, y: 21, w: 35, h: 17, text: 'Digite uma palavra do assunto, como o nome do sistema em que você precisa de ajuda.' },
      { x: 64, y: 21, w: 8, h: 17, text: 'Clique em Pesquisar e abra um artigo relacionado nos resultados. Você também pode usar a aba Navegar para explorar as categorias.' },
    ] },
  reservas: { title: 'Consulte os itens e o calendário', file: '/portal/reservas.png', width: 1290, height: 520,
    intro: 'Abra Reservas no menu superior ou Fazer uma reserva na Home. Os itens disponíveis dependem da sua unidade e do seu acesso.',
    marks: [
      { x: 46, y: 4, w: 32, h: 8, text: 'Encontrar um item livre em um período específico: comece por este botão quando já souber quando precisará do equipamento.' },
      { x: 86, y: 24, w: 5, h: 8, text: 'Na linha do item desejado, clique no ícone de calendário para consultar a disponibilidade. Confira item, data e horário antes de confirmar qualquer reserva.' },
    ] },
} satisfies Record<string, Screen>;

type ScreenName = keyof typeof screens;

function toTutorialCapture(name: ScreenName): TutorialCapture {
  const screen = screens[name];
  const marks: readonly Mark[] = screen.marks;
  return {
    id: name,
    title: screen.title,
    description: screen.intro,
    src: screen.file,
    width: screen.width,
    height: screen.height,
    hotspots: marks.map((mark, index) => ({
      id: index + 1,
      x: mark.x,
      y: mark.y,
      width: mark.w,
      height: mark.h,
      legend: mark.text,
      evidence: mark.evidence ?? 'guidance',
    })),
  };
}

export function PortalScreen({ name }: { name: ScreenName }) {
  return <CaptureViewer capture={toTutorialCapture(name)} />;
}

export function GuidedCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const names = ['inicio', 'campos', 'descricao'] as const satisfies readonly ScreenName[];
  useEffect(() => {
    if (!api) return;
    const select = () => setCurrent(api.selectedScrollSnap());
    select(); api.on('select', select); api.on('reInit', select);
    return () => { api.off('select', select); api.off('reInit', select); };
  }, [api]);
  return <section className="walkthrough" aria-labelledby="walkthrough-title">
    <div className="walkthrough-heading"><p className="eyebrow">Passo a passo • Portal de suporte UB</p><h1 id="walkthrough-title">Veja onde clicar.<br />Entenda o que preencher.</h1><p>Abra o portal em outra aba e acompanhe estas telas reais. As marcações mostram cada campo e a explicação aparece logo abaixo.</p><a className="primary-action" href="https://suporte.ub.edu.br/Helpdesk" target="_blank" rel="noreferrer">Abrir o portal de Suporte <ArrowRight size={18} /></a></div>
    <Carousel setApi={setApi} opts={{ loop: false }} aria-label="Tutorial de abertura de chamado" className="walkthrough-carousel">
      <div className="walkthrough-controls">
        <button type="button" onClick={() => api?.scrollPrev()} disabled={current === 0} aria-label="Etapa anterior"><ArrowLeft size={18} /></button>
        <fieldset><legend className="sr-only">Escolher etapa</legend>{names.map((name, i) => <button type="button" key={name} aria-pressed={current === i} onClick={() => api?.scrollTo(i)}>{i + 1}<span>{['Escolher', 'Preencher', 'Enviar'][i]}</span></button>)}</fieldset>
        <button type="button" onClick={() => api?.scrollNext()} disabled={current === names.length - 1} aria-label="Próxima etapa"><ArrowRight size={18} /></button>
      </div>
      <p className="step-announcement" aria-live="polite">Etapa {current + 1} de 3 · {screens[names[current]].title}</p>
      <CarouselContent>{names.map((name, i) => <CarouselItem key={name} inert={current !== i} aria-hidden={current !== i}><PortalScreen name={name} /></CarouselItem>)}</CarouselContent>
    </Carousel>
    <p className="capture-note">Telas consultadas em 15/09/2026. A identificação da conta foi excluída dos recortes. Opções podem variar conforme a unidade e o perfil.</p>
  </section>;
}
