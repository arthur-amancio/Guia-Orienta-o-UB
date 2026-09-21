# Handoff — Guia do Colaborador UB

## Objetivo e autorização

Guia didático em português para uso do GLPI UB. Prioridade: capturas reais com marcações de onde clicar, explicações por campo e boa leitura no celular. Usuário autorizou commit/push ao GitHub após mudanças. Em 15/09/2026 pediu expressamente NÃO publicar no Sites. A publicação anterior permanece como estava; este trabalho não atualiza nem remove aquela publicação.

## Leitura mínima

- `components/portal-guide.tsx`: dados das capturas, marcações percentuais, legendas, modal de ampliação e carrossel de 3 etapas.
- `app/page.tsx`: seções do guia, pesquisa, links do portal e impressão.
- `app/globals.css`: estilos; regras do tutorial ficam no início. Existem estilos antigos do hero sem uso, preservados para evitar limpeza ampla.
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
- O PDF antigo permanece como arquivo legado, mas os botões agora imprimem a página atual / permitem salvar PDF pelo navegador, evitando entregar conteúdo desatualizado.
- Publicar apenas após nova autorização explícita. Próximo refinamento: capturas sanitizadas de detalhe de chamado e confirmação de envio, quando disponíveis.
- Não há nome ou credencial do colaborador nos arquivos de entrega. Capturas brutas locais ficam fora do checkout e não devem ser copiadas para ele.

## Última validação

Em 16/09/2026: `npm run build` passou; `npx oxlint app components/portal-guide.tsx` passou; `git diff --check` passou. Revisão visual feita em desktop e viewport móvel de 390 × 844: avanço do carrossel, modal nativo de ampliação, rolagem horizontal da captura ampliada e busca sem acento (`urgencia`) funcionaram. Console do navegador ficou sem erros após reabrir a prévia.

Correção posterior em 16/09/2026: `app/page.tsx` já usava `<PortalScreen name="urgencia" />`, mas o registro `screens.urgencia` não havia sido incluído no commit. Isso causava erro 500 ao tentar ler `screen.title`. O registro foi restaurado usando a captura real `public/portal/urgencia.png`, e os nomes aceitos por `PortalScreen` agora são verificados pelo TypeScript. `npm run build`, `npx oxlint app components/portal-guide.tsx` e a abertura de `http://localhost:3000/` passaram após a correção.

`npm run lint` completo ainda falha em componentes-base já existentes (`components/ui/*` e `hooks/use-mobile.ts`), fora do escopo desta entrega. Não atribuir esses erros às capturas novas; o lint restrito acima cobre `app/` e `components/portal-guide.tsx`.

## W1 — fundação do tutorial de seis etapas

Em 21/09/2026 foi criada a fonte única dos seis passos em `content/support-tutorial.ts`, com tipos estritos em `types/tutorial.ts`. O modelo aceita múltiplas capturas por etapa, hotspots percentuais, notas e classificação explícita `observed | guidance`. FAQ e Reservas não integram esse array.

`components/tutorial/annotated-capture.tsx` concentra imagem real, hotspots, legenda e modal. O fluxo atual em `components/portal-guide.tsx` foi mantido visível, mas passou a reutilizar esse componente. A fundação `SupportTutorial` e seu stepper já derivam títulos, contador, conteúdo, capturas e navegação do array único, porém ainda não substituem o carrossel atual.

A prévia supervisionada exigiu trocar o script de desenvolvimento legado de `vinext dev` para `vite` e permitir `terminal.local` no servidor Vite; o build de produção permaneceu inalterado. Build, lint restrito ao código do produto, `git diff --check`, navegação do carrossel e modal passaram. O lint amplo continua acusando somente problemas preexistentes em `components/ui/*`, que não foi alterado.

Limitações preservadas para W2: nenhum asset foi criado ou modificado; `urgencia.png` continua mostrando apenas o final da lista; `chamados.png` continua sem detalhe interno; `descricao-anexos.png` é reutilizada nos passos 4 e 5; `reservas.png` e `scripts/prepare-captures.mjs` não foram corrigidos. Próximo passo: tratar exclusivamente os assets reais e sanitizados do W2 antes de ativar o novo tutorial.
