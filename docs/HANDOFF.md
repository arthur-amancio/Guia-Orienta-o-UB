# Handoff — Guia do Colaborador UB

## Objetivo e autorização

Guia didático em português para uso do GLPI UB. Prioridade: capturas reais com marcações de onde clicar, explicações por campo e boa leitura no celular. Usuário autorizou commit/push ao GitHub após mudanças. Em 15/09/2026 pediu expressamente NÃO publicar no Sites. A publicação anterior permanece como estava; este trabalho não atualiza nem remove aquela publicação.

## Leitura mínima

- `content/support-tutorial.ts`: fonte única dos seis passos, capturas, hotspots e classificação de evidência.
- `components/tutorial/`: tutorial, stepper, captura anotada, modal e estilos exclusivos do fluxo.
- `app/page.tsx`: estrutura estática com header, tutorial, recursos secundários e footer.
- `app/globals.css`: tokens, base institucional e estilos globais compartilhados pelas capturas e pela página.
- `public/portal/`: somente recortes revisados do sistema real; identificação da conta excluída fisicamente.
- `scripts/prepare-captures.mjs`: recorta capturas reais locais com sharp; não gera UI, não modifica textos. Entrada fora do repositório, ex.: `node scripts/prepare-captures.mjs ../work`. Coordenadas só valem para os tamanhos de origem daquela sessão.

## Stack e comandos

React 19 + TypeScript + Vinext/Vite; npm e package-lock existentes. `npm ci`, `npm run dev`, `npm run build`, `npm run lint`. Build em `dist/` é ignorado. O projeto contém configuração legada de Sites/Cloudflare; não alterar ou publicar sem novo pedido.

## Evidências em 15/09/2026

Portal autenticado inspecionado no navegador com autorização do usuário. Home tem Procure artigos de ajuda, Reportar um problema (`/Form/Render/1`), Solicitar um serviço (`/Form/Render/2`), Criar um chamado, Ver seus chamados e Fazer uma reserva.

Ambos os formulários mostram Urgência, Categoria, Dispositivos do usuário, Observadores, Localização, Título, Descrição e Anexos, além de Enviar. Descrição tem asterisco. Limite mostrado de anexos: 2 MB. Urgências: Muito Baixa, Baixa, Média, Alta, Muito Alta. Categorias têm busca e subcategorias. Capturas feitas em branco, sem submissão.

Chamados (`/front/ticket.php`) exibiu filtros, ordenação e “Nenhum resultado encontrado”. NÃO foi validada a interface interna de um chamado nem uma confirmação de envio. As orientações de histórico/resposta/status são gerais e explicitamente identificadas. Para completar essa parte, usar conta autorizada com chamado disponível ou captura aprovada, ocultando todos os dados pessoais; nunca fabricar um chamado para a documentação.

FAQ (`/front/helpdesk.faq.php`) tem Pesquisar, Navegar e busca. Reservas (`/front/reservationitem.php`) tem busca de item livre por período e calendário por item. Não foi confirmada reserva nem aberto formulário preenchido.

## Entrega e pendências

- Tutorial real substitui as imagens geradas anteriormente. Os três PNGs antigos `public/suporte-*.png` foram retirados da árvore atual e permanecem recuperáveis no histórico do Git; não reutilizar.
- As anotações são elementos HTML sobre os pixels reais, para manter a captura original legível. Legendas permanecem acessíveis e ampliação mostra imagem com largura mínima para ler no celular.
- O PDF antigo e os botões de impressão foram removidos no W4 porque o arquivo estava desatualizado e a página interativa renderiza somente a etapa ativa.
- Publicar apenas após nova autorização explícita. Próximo refinamento: capturas sanitizadas de detalhe de chamado e confirmação de envio, quando disponíveis.
- Não há nome ou credencial do colaborador nos arquivos de entrega. Capturas brutas locais ficam fora do checkout e não devem ser copiadas para ele.

## Última validação

Em 16/09/2026: `npm run build` passou; `npx oxlint app components/portal-guide.tsx` passou; `git diff --check` passou. Revisão visual feita em desktop e viewport móvel de 390 × 844: avanço do carrossel, modal nativo de ampliação, rolagem horizontal da captura ampliada e busca sem acento (`urgencia`) funcionaram. Console do navegador ficou sem erros após reabrir a prévia.

Correção posterior em 16/09/2026: `app/page.tsx` já usava `<PortalScreen name="urgencia" />`, mas o registro `screens.urgencia` não havia sido incluído no commit. Isso causava erro 500 ao tentar ler `screen.title`. O registro foi restaurado usando a captura real `public/portal/urgencia.png`, e os nomes aceitos por `PortalScreen` agora são verificados pelo TypeScript. `npm run build`, `npx oxlint app components/portal-guide.tsx` e a abertura de `http://localhost:3000/` passaram após a correção.

`npm run lint` completo ainda falha em componentes-base já existentes (`components/ui/*` e `hooks/use-mobile.ts`), fora do escopo desta entrega. Não atribuir esses erros às capturas novas; valide de forma restrita os arquivos de produto alterados.

## W1 — fundação do tutorial de seis etapas

Em 21/09/2026 foi criada a fonte única dos seis passos em `content/support-tutorial.ts`, com tipos estritos em `types/tutorial.ts`. O modelo aceita múltiplas capturas por etapa, hotspots percentuais, notas e classificação explícita `observed | guidance`. FAQ e Reservas não integram esse array.

`components/tutorial/annotated-capture.tsx` concentra imagem real, hotspots, legenda e modal. O fluxo atual em `components/portal-guide.tsx` foi mantido visível, mas passou a reutilizar esse componente. A fundação `SupportTutorial` e seu stepper já derivam títulos, contador, conteúdo, capturas e navegação do array único, porém ainda não substituem o carrossel atual.

A prévia supervisionada exigiu trocar o script de desenvolvimento legado de `vinext dev` para `vite` e permitir `terminal.local` no servidor Vite; o build de produção permaneceu inalterado. Build, lint restrito ao código do produto, `git diff --check`, navegação do carrossel e modal passaram. O lint amplo continua acusando somente problemas preexistentes em `components/ui/*`, que não foi alterado.

Limitações preservadas para W2: nenhum asset foi criado ou modificado; `urgencia.png` continua mostrando apenas o final da lista; `chamados.png` continua sem detalhe interno; `descricao-anexos.png` é reutilizada nos passos 4 e 5; `reservas.png` e `scripts/prepare-captures.mjs` não foram corrigidos. Próximo passo: tratar exclusivamente os assets reais e sanitizados do W2 antes de ativar o novo tutorial.

## W2 — preparação dos assets reais

Em 21/09/2026, a configuração temporária de preview do W1 foi removida: `npm run dev` voltou a usar `vinext dev`, sem `host` ou `allowedHosts` específicos do ambiente Work. A nota `unverified-submit-confirmation` passou de `observed` para `guidance`.

O inventário técnico e visual está em `docs/W2-ASSET-AUDIT.md`. Os oito assets preexistentes foram preservados byte a byte. Foi criado somente `public/portal/campos-principais.png` (500 × 267), crop real e sanitizado de `campos.png` para destacar Dispositivos, Observadores e Localização. O passo 2 usa o novo recorte com dimensões e hotspots recalculados; o carrossel atual continua usando o asset original.

`scripts/prepare-captures.mjs` agora reproduz esse recorte a partir de `campos.png`, e `sharp` 0.34.5 foi declarado diretamente como dependência de desenvolvimento. Permanecem pendentes uma captura real com a lista completa de Urgência e uma captura autorizada do detalhe de chamado. FAQ, Reservas, PDF legado e o fluxo visual atual não foram alterados.

Validação final do W2: `npm ci`, `npm run build`, lint restrito aos arquivos de código alterados e `git diff --check` passaram. A reprodução isolada do novo crop gerou arquivo idêntico byte a byte, e dimensões, formatos, privacidade, legibilidade e hotspots foram conferidos visualmente para todos os assets do tutorial.

## W3A — ativação funcional do tutorial

Em 21/09/2026, `app/page.tsx` passou a montar `SupportTutorial` no lugar do `GuidedCarousel`. O guia longo continua abaixo da página para remoção somente no W4, e a implementação antiga permanece no código como etapa de migração, sem um segundo tutorial principal visível.

Os seis passos continuam derivados exclusivamente de `supportTutorialSteps`. Stepper, Anterior, Próximo, seleção direta, duas capturas do passo 3, hotspots, legendas, modal e classificação de evidência foram preservados. No sexto passo, o Próximo desabilitado foi substituído por `Abrir Portal de Suporte` em nova aba.

Build, lint restrito e `git diff --check` passaram. A inspeção em navegador desktop e 390 × 844 ficou bloqueada no ambiente de execução porque um servidor externo ao checkout permaneceu ocupando a única porta da prévia mesmo após a parada supervisionada; nenhum processo desconhecido foi encerrado e nenhuma configuração específica do ambiente foi reintroduzida. A validação visual e do console deve ser repetida no W3B ou no primeiro ambiente de preview disponível.

## W3B — UX, mobile e acessibilidade

Em 22/09/2026, as trocas por Anterior, Próximo e pelo stepper passaram a focar o título da nova etapa e reposicioná-lo no início da área visível, sem rolagem no primeiro render e respeitando `prefers-reduced-motion`. O stepper mantém títulos derivados de `supportTutorialSteps`, diferencia etapa atual, visitadas e ainda não visitadas e usa, em telas menores, um resumo compacto com seis seletores acessíveis. O anúncio dinâmico agora combina posição e título da etapa.

O diálogo nativo devolve explicitamente o foco ao botão que abriu a captura. A distinção entre evidência observada e orientação geral ganhou uma explicação única e labels mais discretos. O passo 3 explicita a sequência das duas capturas; o passo 4 recebeu um checklist curto, tipado e classificado como orientação geral. As classificações existentes, hotspots e assets não foram alterados.

A prévia continuou indisponível: `npm run dev` encontrou um servidor Vinext externo no PID 15, diretório `/site`, ocupando `localhost:4173`. O processo não foi encerrado e nenhuma configuração do projeto foi modificada. Assim, desktop, tablet, viewports móveis, console, foco/scroll e diálogo ainda precisam de inspeção visual/interativa no primeiro ambiente disponível; build, lint restrito e verificações de diff foram usados como validação estática.

Dívida explícita para W4: o guia longo preservado abaixo do tutorial contém textos mais assertivos que a evidência documentada, inclusive instruções para aguardar uma confirmação e guardar o número do chamado. Não propagar essas afirmações para o tutorial novo sem nova evidência real.

## W4 — consolidação e identidade institucional

Em 22/09/2026, `app/page.tsx` tornou-se um Server Component estático e passou a conter somente header institucional, `SupportTutorial`, dois recursos secundários e footer. A pesquisa, a grade de tópicos, a navegação lateral, as oito seções documentais e o checklist final foram removidos. FAQ e Reservas agora aparecem apenas como cards breves que direcionam ao endereço principal validado do Portal de Suporte.

`components/portal-guide.tsx`, incluindo `GuidedCarousel`, `PortalScreen` e o registro duplicado `screens`, foi excluído após busca confirmar ausência de consumidores. Os estilos correspondentes, além de regras antigas de hero e do guia longo, foram removidos de `app/globals.css`. O `CaptureViewer` compartilhado e toda a lógica funcional e acessível do tutorial W3B foram preservados.

O CTA de impressão foi removido: imprimir a página interativa entregaria silenciosamente apenas a etapa ativa, e criar uma representação paralela dos seis passos contrariaria a fonte única. `public/guia-suporte-ub.pdf` também foi excluído porque não possuía consumidor e continha afirmações não comprovadas sobre confirmação, número e estados internos de chamado.

O visual final usa azul-marinho, azul secundário, branco, cinzas claros e dourado pontual. Vermelho permanece exclusivo de hotspots e números das capturas. A estrutura responsiva cobre header, stepper compacto, capturas, navegação, recursos e footer sem introduzir novos fluxos ou assets.

A tentativa de prévia do W4 continuou bloqueada pelo servidor Vinext externo no PID 15, diretório `/site`, em `localhost:4173`. Nenhum processo foi encerrado e nenhuma configuração foi alterada. A revisão de desktop e 390 × 844, incluindo console e modal, ainda precisa ser repetida em ambiente com a porta de preview disponível; neste marco foram executadas revisão estática de 320–1440 px, busca de referências, build, lint restrito e verificação de diff.
