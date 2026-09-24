# Handoff — Guia do Colaborador UB

## Objetivo e autorização

Guia didático em português para uso do GLPI UB. Prioridade: capturas reais com marcações de onde clicar, explicações por campo e boa leitura no celular. Usuário autorizou commit/push ao GitHub após mudanças. Em 15/09/2026 pediu expressamente NÃO publicar no Sites. A publicação anterior permanece como estava; este trabalho não atualiza nem remove aquela publicação.

## Leitura mínima

- `content/support-tutorial.ts`: fonte única das cinco etapas, capturas, hotspots e classificação de evidência.
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

## W5 — QA final

Em 22/09/2026, a revisão completa de W1–W4 confirmou os seis passos, a fonte única, os links externos, o foco gerenciado, o diálogo nativo, os estados do stepper e a separação `observed | guidance`. As seis capturas usadas foram reinspecionadas: formato e dimensões coincidem com o modelo, os hotspots permanecem dentro das imagens e não há nomes, e-mails, conta identificável, senha ou conteúdo confidencial visível.

Foram corrigidos dois defeitos no CSS global: o link do rodapé não recebe mais margem lateral junto de `width: 100%` entre 461 e 680 px, evitando overflow/alinhamento inconsistente; e as regras legadas de `@media print` foram removidas, pois impressão não é uma funcionalidade suportada. Não houve alteração em capturas, conteúdo factual ou dependências.

`npm run dev` continuou bloqueado pelo Vinext externo no PID 15, diretório `/site`, em `localhost:4173`. Uma instância de produção deste checkout respondeu corretamente em porta alternativa, mas o navegador supervisionado bloqueou o acesso à porta local e à rota `terminal.local`; por isso, não houve inspeção visual, teste interativo dos viewports nem leitura do console. Nenhum processo desconhecido foi encerrado e nenhuma configuração foi alterada. O PR do W5 deve permanecer em Draft com essa limitação explícita até a validação visual externa.

A entrega final está na branch `feat/guided-support-tutorial` e no PR Draft [#1](https://github.com/arthur-amancio/Guia-Orienta-o-UB/pull/1), sem merge e sem publicação.

## W6 — simplificação didática baseada em teste real

Em 22/09/2026, o fluxo principal foi reduzido de seis para cinco etapas: escolher o atendimento; definir urgência e categoria; descrever e anexar; revisar e enviar; acompanhar. Dispositivo, Observadores e Localização deixaram de constituir uma etapa e são mencionados somente por uma nota opcional: campos adicionais devem ser preenchidos apenas quando houver uma opção aplicável ao caso.

O conteúdo visível foi condensado em ações curtas, com a captura posicionada antes de notas e checklist. Cada hotspot passou a ter rótulo de ação e uma frase breve; `observed | guidance` continua obrigatório no modelo, mas os indicadores visuais ficaram secundários. A checklist de descrição foi reduzida a ocorrido, local, início, mensagem de erro e tentativas já realizadas.

`public/portal/categoria-pesquisa.png` (500 × 350) foi criado exclusivamente por crop de pixels da captura real e sanitizada `categoria.png`. Seus três hotspots foram recalculados para campo, busca e opções. O recorte anterior `campos-principais.png` foi removido por não integrar mais o fluxo, e o pipeline passou a reproduzir somente o novo recorte de Categoria.

O modal agora usa um palco interno que centraliza a captura horizontalmente quando ela cabe e mantém rolagem horizontal quando sua largura real excede a viewport. Nenhum pixel, controle ou texto de interface foi fabricado.

A pendência do menu de Urgência foi resolvida com uma captura real e sanitizada que mostra os cinco níveis completos. Continuam desejáveis, sem bloquear o tutorial, capturas reais separadas de título/descrição, anexos e revisão/Enviar, além de detalhe interno ou confirmação somente se esse material existir de forma autorizada. Nunca criar ou enviar um chamado para obtê-las.

A prévia supervisionada do W6 continuou indisponível porque o processo Vinext externo no PID 15, diretório `/site`, ocupa a porta exclusiva do ambiente. O supervisor confirmou que não havia uma prévia deste checkout para encerrar. Nenhum processo desconhecido foi interrompido e nenhuma configuração foi alterada; portanto, centralização do modal, rolagem horizontal e viewports de 1440/390/320 px foram revisadas por código, mas não validadas interativamente no navegador neste marco.

### Atualização curta de Urgência e Categoria

Em 22/09/2026, `urgencia-completa.png` (460 × 260) substituiu o recorte parcial e passou a mostrar Muito Baixa, Baixa, Média, Alta e Muito Alta. `categoria-selecao.png` (500 × 322) substituiu o recorte anterior e registra busca, Redefinição de senha selecionada e opções de Impressora. Ambos são crops diretos de capturas reais fornecidas pelo usuário, sem reconstrução ou alteração dos pixels da interface. Dimensões, hotspots e classificações de evidência foram recalculados; a recomendação de escolher a opção mais específica permanece `guidance`, enquanto abertura, busca e opções visíveis são `observed`.

## W7 — hierarquia didática e precisão das evidências

Em 23/09/2026, todos os hotspots, notas e checklist das cinco etapas foram auditados. Reportar um problema, Solicitar um serviço, os campos Título e Descrição, o botão Enviar e a ordenação por Última atualização passaram a `observed`, pois os elementos foram registrados diretamente nas capturas. Revisão antes do envio, privacidade, impacto da urgência, escolha da opção mais específica, campos adicionais, checklist e abertura futura de um chamado permanecem `guidance`.

As legendas passaram a destacar a ação acima da explicação, com labels de evidência neutros e menores. Urgência e Categoria receberam separação sutil; checklist e notas ficaram visualmente secundárias. O texto visível caiu de 333 para 327 palavras. A revisão estática do modal confirmou a centralização por `capture-stage`; o padding horizontal passou a proteger os números dos hotspots também no início do scroll mobile.

As capturas futuras são apenas melhorias: recortes focados de Título/Descrição, Anexos e revisão/Enviar, além de detalhe interno de chamado somente com material real autorizado. Urgência e Categoria não são mais pendências. A prévia continuou bloqueada pelo processo Vinext externo à árvore atual; nenhum processo foi encerrado e nenhuma configuração foi alterada. A pendência de QA visual externo foi encerrada no W9.

## W8 — correções do QA visual externo

O teste do usuário em desktop e mobile identificou o contorno dourado do título focado programaticamente, header sticky alto no celular, espaço vazio ao redor das duas capturas da etapa 2 e na lista de chamados, botão Enviar aparecendo antecipadamente na etapa 3 e badges de evidência repetitivos. O título mantém foco e rolagem acessíveis sem outline não interativo; o header deixa de ser sticky até 820 px; Urgência e Categoria aparecem lado a lado somente em desktop largo (a partir de 1100 px). O modal e seus controles não foram alterados.

As etapas 3 e 5 agora usam `descricao-anexos-foco.png` (980 × 465) e `chamados-foco.png` (1300 × 150), crops dos respectivos PNGs reais já sanitizados. O primeiro exclui Enviar sem perder Título, Descrição e Anexos; o segundo preserva Status, Última atualização e “Nenhum resultado encontrado”, removendo apenas o espaço vazio inferior. `prepare-captures.mjs` reproduz ambos a partir dos assets sanitizados; dimensões e hotspots foram recalculados e conferidos sobrepostos aos pixels reais. Os originais permanecem para reprodução, e `descricao-anexos.png` continua na etapa 4. A classificação `observed | guidance` permanece intacta nos dados, mas seus badges e a chave visual foram removidos da experiência principal.

As seis capturas usadas nas cinco etapas foram conferidas programaticamente (PNG, dimensões, IDs e bounds dos hotspots); os dois novos crops reproduziram byte a byte os arquivos versionados. Build, TypeScript, Oxlint restrito, Oxfmt e diff-check passaram. A tentativa de prévia local em W8 retornou o mesmo Vinext externo, PID 15 em `/site`, ocupando `localhost:4173`; não houve inspeção interativa deste checkout em 320/360/390 px nem teste de console pelo Work, e nenhum processo/configuração foi alterado para contornar isso. O usuário concluiu posteriormente o QA visual/interativo local da branch após W8; veja W9. As capturas reais adicionais de detalhe interno e confirmação continuam dependentes de material autorizado; não presumir telas posteriores ao envio.

## W9 — fechamento do QA e preparação do PR

O usuário concluiu o QA visual/interativo da branch em seu ambiente local após W8 e confirmou o resultado visual. O ambiente Work realizou a revisão completa do diff da feature e as validações técnicas, sem reivindicar a inspeção visual local do usuário. Oxfmt encontrou somente a formatação do link do rodapé em `app/page.tsx`, corrigida sem mudança de comportamento. `npm ci`, build, TypeScript, Oxlint restrito, Oxfmt e diff-check passaram. A auditoria confirmou cinco etapas, seis PNGs ativos com dimensões e hotspots válidos, IDs únicos, evidências `observed | guidance` válidas e crops reproduzíveis byte a byte. A inspeção das seis capturas não identificou dados pessoais ou confidenciais.

Branch `feat/guided-support-tutorial`; PR [#1](https://github.com/arthur-amancio/Guia-Orienta-o-UB/pull/1) atualizado e retirado de Draft para revisão. Nenhum workflow/status de CI estava disponível no HEAD verificado. Não houve merge nem publicação. Melhorias futuras de capturas internas dependem de material real autorizado e não bloqueiam esta revisão.

## W10 — experimento de polimento UI/UX

Branch isolada `experiment/w10-ui-ux-polish`, criada da `main` em `75b0d15a3392052a56c7f3a2bf3080f8cdf50d66`. O fluxo, os cinco passos, o texto, os hotspots, os assets e as URLs permanecem iguais ao baseline. A legenda agora é um controle com alvo de 48 px: mouse, foco de teclado ou toque realçam o hotspot numerado correspondente, enquanto os demais ficam apenas menos destacados. A versão ampliada usa a mesma ligação. O destaque é discreto e desliga transições com `prefers-reduced-motion`.

Foram ajustados ritmo de espaços, escala dos títulos, estados de botões e stepper, cartões secundários, rodapé e apresentação do diálogo sem alterar seu foco, centralização ou rolagem. O header continua não sticky até 820 px. A inspeção estática inclui os breakpoints 320–1440 px; a validação visual/interativa **desta branch experimental** ainda depende de teste externo nos seis viewports solicitados. O Vinext externo em `/site` ocupou a porta padrão e o navegador supervisionado bloqueou a instância deste checkout na porta alternativa com `ERR_BLOCKED_BY_CLIENT`; nenhum processo alheio ou configuração versionada foi alterado.

Build, TypeScript, Oxlint restrito à feature, Oxfmt dos arquivos alterados e diff-check passaram. O lint global ainda encontra erros preexistentes em `components/ui/*` e `hooks/use-mobile.ts`, fora deste experimento. Nenhum PR, merge ou deploy faz parte do W10; a decisão de incorporar ou rejeitar o polimento requer comparação visual local com a `main`.
