'use client';

import Image from 'next/image';
import {
  ArrowRight, BookOpen, CalendarDays, CheckCircle2, CircleAlert,
  ClipboardCheck, Download, ExternalLink, FileText, ListChecks, Search,
  ShieldCheck, TicketCheck, UserRoundCheck
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { PortalScreen } from '@/components/portal-guide';
import { SupportTutorial } from '@/components/tutorial/support-tutorial';

const SUPPORT = 'https://suporte.ub.edu.br/Helpdesk';
const normalizeSearch = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('pt-BR');

const topics = [
  { id: 'acesso', title: 'Conheça o portal', icon: BookOpen, terms: 'home acesso rápido catálogo chamados reservas faq' },
  { id: 'escolha', title: 'Problema ou solicitação?', icon: ListChecks, terms: 'diferença reportar solicitar serviço erro pedido' },
  { id: 'abrir', title: 'Abrir um chamado', icon: TicketCheck, terms: 'abrir enviar formulário chamado passo a passo' },
  { id: 'campos', title: 'Preencher os campos', icon: FileText, terms: 'urgência categoria dispositivo observador localização título descrição anexo' },
  { id: 'categorias', title: 'Escolher a categoria', icon: ClipboardCheck, terms: 'backup email impressora internet rede software totvs rm wifi usuário' },
  { id: 'qualidade', title: 'Escrever um bom chamado', icon: ShieldCheck, terms: 'exemplo título descrição evidência privacidade mensagem erro' },
  { id: 'acompanhar', title: 'Acompanhar chamados', icon: UserRoundCheck, terms: 'status novo pendente solucionado fechado resposta histórico' },
  { id: 'faq-reservas', title: 'FAQ e reservas', icon: CalendarDays, terms: 'artigos ajuda pesquisar reserva equipamento calendário' },
];


function Steps({ items }: { items: string[] }) {
  return <ol className="steps">{items.map((item, i) => <li key={item}><span>{i + 1}</span><p>{item}</p></li>)}</ol>;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const normalized = normalizeSearch(query.trim());
  const matches = useMemo(() => normalized ? topics.filter(t => normalizeSearch(`${t.title} ${t.terms}`).includes(normalized)) : topics, [normalized]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Guia do Colaborador UB - início">
          <Image src="/ub-logo.png" alt="Universidade Brasil" width={48} height={48} priority />
          <span><strong>Guia do Colaborador</strong><small>Universidade Brasil</small></span>
        </a>
        <nav aria-label="Ações principais">
          <button className="download-link" type="button" onClick={() => window.print()}><Download size={17} /> Imprimir guia</button>
          <a className="support-link" href={SUPPORT} target="_blank" rel="noreferrer">Abrir o Suporte <ArrowRight size={17} /></a>
        </nav>
      </header>

      <div id="inicio">
        <SupportTutorial />
      </div>

      <section className="guide-search" aria-label="Pesquisa no guia">
        <div><p className="eyebrow">Encontre sua resposta</p><h2>Como podemos ajudar?</h2></div>
        <label className="searchbox">
          <Search size={20} aria-hidden="true" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar: urgência, anexo, status..." aria-label="Pesquisar no guia" />
        </label>
      </section>

      <section className="topic-strip" aria-label="Tópicos do guia">
        <div className="topic-grid">
          {matches.map(({ id, title, icon: Icon }) => <a key={id} href={`#${id}`}><Icon size={19} /><span>{title}</span><ArrowRight size={15} /></a>)}
          {matches.length === 0 && <p className="no-results">Nenhum tópico encontrado. Tente “urgência”, “categoria”, “status” ou “reserva”.</p>}
        </div>
      </section>

      <div className="page-shell">
        <aside className="side-nav">
          <p>Neste guia</p>
          {topics.map(({ id, title }) => <a key={id} href={`#${id}`}>{title}</a>)}
          <button className="side-pdf" type="button" onClick={() => window.print()}><Download size={16} /> Imprimir / salvar PDF</button>
        </aside>

        <article className="guide">
          <section id="acesso" className="guide-section">
            <p className="section-number">01</p>
            <h2>Conheça o portal</h2>
            <p>O portal reúne os pedidos de Tecnologia da Informação da UB. A página inicial oferece pesquisa, atalhos e um resumo dos chamados em andamento e solucionados.</p>
            <div className="feature-grid">
              {[
                ['Home', 'Atalhos e visão resumida do atendimento.'],
                ['Catálogo de serviços', 'Formulários para problema e solicitação.'],
                ['Chamados', 'Histórico, status e atualizações.'],
                ['Reservas', 'Itens disponíveis e calendário.'],
                ['FAQ', 'Artigos e orientações publicadas.'],
              ].map(([name, desc]) => <div className="feature" key={name}><strong>{name}</strong><span>{desc}</span></div>)}
            </div>
            <div className="notice"><CircleAlert size={20} /><p><strong>Antes de abrir:</strong> confirme o sistema ou equipamento, registre a mensagem de erro e verifique se outras pessoas também foram afetadas.</p></div>
          </section>

          <section id="escolha" className="guide-section">
            <p className="section-number">02</p>
            <h2>Problema ou solicitação?</h2>
            <p>Escolher a opção correta ajuda o chamado a chegar ao atendimento adequado.</p>
            <div className="choice-grid">
              <div className="choice-card problem"><CircleAlert /><p>Algo que funcionava apresentou falha?</p><h3>Reportar um problema</h3><span>Internet sem conexão, erro ao imprimir, sistema indisponível ou acesso que deixou de funcionar.</span><a href="https://suporte.ub.edu.br/Form/Render/1" target="_blank" rel="noreferrer">Abrir formulário <ExternalLink size={15} /></a></div>
              <div className="choice-card service"><ClipboardCheck /><p>Precisa criar, instalar ou alterar algo?</p><h3>Solicitar um serviço</h3><span>Instalação de software, criação de acesso, configuração ou novo recurso.</span><a href="https://suporte.ub.edu.br/Form/Render/2" target="_blank" rel="noreferrer">Abrir formulário <ExternalLink size={15} /></a></div>
            </div>
            <div className="rule"><strong>Regra rápida</strong><span>Defeito em algo existente = problema. Nova entrega, instalação ou alteração = solicitação.</span></div>
          </section>

          <section id="abrir" className="guide-section">
            <p className="section-number">03</p><h2>Como abrir um chamado</h2>
            <Steps items={[
              'Acesse o portal de Suporte da UB.',
              'Escolha “Reportar um problema” ou “Solicitar um serviço”.',
              'Preencha os campos, revise o conteúdo e acrescente evidências úteis.',
              'Clique em “Enviar” apenas uma vez e aguarde a confirmação.',
              'Guarde o número do chamado para acompanhar o atendimento.'
            ]} />
            <a className="primary-action" href={SUPPORT} target="_blank" rel="noreferrer">Ir para o portal de Suporte <ExternalLink size={17} /></a>
          </section>

          <section id="campos" className="guide-section">
            <p className="section-number">04</p><h2>Como preencher cada campo</h2>
            <div className="field-list">
              {[
                ['Urgência', 'Informe o impacto real. Não marque alta apenas para tentar antecipar o atendimento.'],
                ['Categoria', 'Escolha o assunto mais próximo e, quando existir, a subcategoria mais específica.'],
                ['Dispositivos do usuário', 'Selecione o equipamento relacionado, se ele estiver cadastrado e for relevante.'],
                ['Observadores', 'Inclua somente pessoas que realmente precisam acompanhar o chamado.'],
                ['Localização', 'Informe a unidade ou o local em que a situação ocorre.'],
                ['Título', 'Use uma frase curta: sistema ou equipamento + problema ou pedido.'],
                ['Descrição', 'Explique o que tentou fazer, o que aconteceu, onde, quando e qual mensagem apareceu.'],
                ['Anexos', 'Adicione arquivos úteis sem expor senhas ou informações confidenciais. O portal informa limite de 2 MB.'],
              ].map(([name, desc]) => <div key={name}><strong>{name}</strong><p>{desc}</p></div>)}
            </div>
            <div className="urgency"><h3>Entendendo a urgência</h3><div><span><b>Muito baixa / Baixa</b>Baixo impacto; é possível aguardar.</span><span><b>Média</b>Impacto normal, limitado ou com alternativa.</span><span><b>Alta / Muito alta</b>Bloqueio relevante ou impacto amplo.</span></div></div>
            <PortalScreen name="urgencia" />
          </section>

          <section id="categorias" className="guide-section">
            <p className="section-number">05</p><h2>Como escolher a categoria</h2>
            <p>Escolha uma subcategoria sempre que ela representar melhor o assunto. As opções podem ser atualizadas pela administração.</p>
            <PortalScreen name="categoria" />
            <div className="category-grid">
              {[
                ['Backup', 'Executar, restaurar e validar'], ['E-mail corporativo', 'Alteração, criação, bloqueio e senha'],
                ['Impressora', 'Scanner, falha, cota e toner'], ['Internet e Wi-Fi', 'Queda ou falha de conexão'],
                ['Rede', 'Pastas, mapeamento e permissões'], ['Software', 'Instalação de programas'],
                ['Usuário de rede', 'Criação, bloqueio, desbloqueio e senha'], ['Demais categorias', 'Câmeras, Certificado Digital, RM, TOTVS e Instruções de Trabalho'],
              ].map(([name, desc]) => <div key={name}><CheckCircle2 size={18} /><span><strong>{name}</strong><small>{desc}</small></span></div>)}
            </div>
            <p className="tip"><strong>Não encontrou a categoria exata?</strong> Escolha a mais próxima e explique a situação com clareza na descrição.</p>
          </section>

          <section id="qualidade" className="guide-section">
            <p className="section-number">06</p><h2>Como escrever um bom chamado</h2>
            <div className="example-box"><p>Título recomendado</p><strong>Impressora da secretaria não imprime arquivos PDF</strong><span>Evite títulos vagos como “Ajuda”, “Urgente” ou “Não funciona”.</span></div>
            <h3 className="subheading">Na descrição, responda:</h3>
            <div className="question-grid">{['O que você tentou fazer?', 'O que aconteceu?', 'Onde ocorreu?', 'Quando começou?', 'Quem foi afetado?', 'O que já foi tentado?'].map((q, i) => <div key={q}><span>{i + 1}</span>{q}</div>)}</div>
            <div className="example-text"><strong>Exemplo fictício</strong><p>Ao tentar imprimir um PDF na impressora da secretaria, o documento permanece na fila. A situação começou hoje às 9h e ocorre com todos os PDFs. Reiniciei o aplicativo, mas o problema continua.</p></div>
            <div className="privacy"><ShieldCheck /><p><strong>Proteja as informações:</strong> confira se as capturas não mostram senhas, dados pessoais, acadêmicos ou outros conteúdos confidenciais.</p></div>
          </section>

          <section id="acompanhar" className="guide-section">
            <p className="section-number">07</p><h2>Como acompanhar seus chamados</h2>
            <PortalScreen name="chamados" />
            <p>A tela interna varia conforme o atendimento e suas permissões. Ao encontrar um chamado, abra-o para consultar o histórico. As orientações abaixo são gerais; os botões internos não estão ilustrados porque a consulta usada para este guia não retornou chamados.</p>
            <Steps items={[
              'Abra o menu “Chamados” ou o atalho “Ver seus chamados”.',
              'Localize o número, título, status e datas do atendimento.',
              'Abra o chamado para ler atualizações e pedidos de informação.',
              'Responda no próprio chamado para preservar o histórico.',
              'Após a solução, confira se o serviço voltou a funcionar.'
            ]} />
            <div className="status-row">{[['Novo / Em atendimento','Registrado ou em análise'],['Pendente','Aguardando informação ou dependência'],['Solucionado','Solução registrada para conferência'],['Fechado','Atendimento encerrado']].map(([s,d]) => <div key={s}><strong>{s}</strong><span>{d}</span></div>)}</div>
            <p className="tip"><strong>Evite duplicidade:</strong> complemente o chamado existente em vez de abrir outro para o mesmo assunto.</p>
          </section>

          <section id="faq-reservas" className="guide-section">
            <p className="section-number">08</p><h2>FAQ e reservas</h2>
            <PortalScreen name="faq" />
            <PortalScreen name="reservas" />
            <div className="two-columns">
              <div><BookOpen /><h3>Consultar a FAQ</h3><p>Pesquise por palavras-chave ou navegue pelas categorias. Se o artigo não resolver, informe no chamado o que já foi tentado.</p></div>
              <div><CalendarDays /><h3>Reservar um item</h3><p>Consulte o item, a localização e o calendário. Selecione o período e revise tudo antes de confirmar. A disponibilidade varia por unidade.</p></div>
            </div>
          </section>

          <section className="final-check">
            <div><p className="eyebrow">Antes de enviar</p><h2>Checklist do chamado</h2></div>
            <ul>{['Escolhi problema ou solicitação corretamente.', 'Selecionei a categoria mais específica.', 'Escrevi um título claro.', 'Expliquei contexto, impacto e mensagem de erro.', 'Revisei os anexos e removi dados confidenciais.'].map(i => <li key={i}><CheckCircle2 />{i}</li>)}</ul>
          </section>
        </article>
      </div>

      <footer><Image src="/ub-logo-white.png" alt="Universidade Brasil" width={54} height={54} /><div><strong>Guia do Colaborador</strong><span>Material de orientação para uso do portal de Suporte.</span></div><a href={SUPPORT} target="_blank" rel="noreferrer">suporte.ub.edu.br <ExternalLink size={15} /></a></footer>
    </main>
  );
}
