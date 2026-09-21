# W2 — auditoria dos assets reais

## Inventário pré-alteração

Registro feito antes de modificar qualquer imagem em 21/09/2026. Dimensões e
formatos foram lidos do conteúdo binário, não inferidos pela extensão.

| Asset | Dimensão real | Formato real | Uso | Privacidade |
| --- | ---: | --- | --- | --- |
| `inicio.png` | 1300 × 350 | PNG RGB, 8 bits | Passo 1 | Aprovado |
| `campos.png` | 980 × 515 | PNG RGB, 8 bits | Fonte atual do passo 2 | Aprovado |
| `urgencia.png` | 980 × 450 | PNG RGB, 8 bits | Passo 3 | Aprovado |
| `categoria.png` | 980 × 430 | PNG RGB, 8 bits | Passo 3 | Aprovado |
| `descricao-anexos.png` | 980 × 565 | PNG RGB, 8 bits | Passos 4 e 5 | Aprovado |
| `chamados.png` | 1300 × 420 | PNG RGB, 8 bits | Passo 6 | Aprovado |
| `faq.png` | 1300 × 240 | PNG RGB, 8 bits | Recurso secundário | Aprovado |
| `reservas.png` | 1290 × 520 | JPEG RGB, 8 bits | Recurso secundário | Aprovado; fora do W2 |

Os sete assets usados pelos seis passos correspondem exatamente às dimensões
declaradas em `content/support-tutorial.ts`. A inspeção visual de todos os
arquivos de `public/portal/` não encontrou nomes pessoais, e-mails, iniciais ou
identificação de conta, identificação de usuário, conteúdo de chamados, senhas
ou outras informações confidenciais. A captura de Reservas contém nomes de
ativos e unidade, não dados de usuário, e não será alterada neste marco.

## Avaliação por passo

1. `inicio.png` mostra com clareza **Reportar um problema** e **Solicitar um
   serviço**. Deve ser preservado.
2. `campos.png` comprova os cinco campos, mas Urgência e Categoria competem com
   o foco do passo. Um crop derivado apenas dos pixels sanitizados existentes
   melhora substancialmente a leitura de Dispositivos, Observadores e
   Localização.
3. `categoria.png` é adequada. `urgencia.png` mostra apenas Alta e Muito Alta;
   nenhuma captura real diferente foi encontrada no workspace. O asset deve ser
   preservado e a captura completa continua pendente.
4. `descricao-anexos.png` mostra com clareza Título, Descrição, Anexos e o
   limite observado de 2 MB. Deve ser preservado.
5. A mesma `descricao-anexos.png` já mantém revisão e botão Enviar no contexto.
   Um novo crop não traria ganho suficiente e poderia prejudicar a revisão do
   formulário completo.
6. `chamados.png` comprova filtros, ordenação e estado vazio. Não existe no
   workspace captura real da tela interna de um chamado.

## Decisão de preparação

Criar somente `campos-principais.png`, derivado por crop de `campos.png`, sem
redesenho, texto inserido ou substituição de pixels. Manter todos os assets
originais inalterados. Recalcular dimensões e hotspots do passo 2 após conferir
visualmente o recorte final.

## Resultado final

- `campos-principais.png`: PNG RGB de 500 × 267, derivado de `campos.png` com
  `left: 8`, `top: 248`, `width: 500` e `height: 267`.
- Hotspot 1: `x: 4.3%`, `y: 15.1%`, `width: 92.1%`, `height: 15.4%` —
  Dispositivos do usuário.
- Hotspot 2: `x: 4.3%`, `y: 47.9%`, `width: 92.1%`, `height: 15.4%` —
  Observadores.
- Hotspot 3: `x: 4.3%`, `y: 80.7%`, `width: 92.1%`, `height: 15.4%` —
  Localização.

Os três retângulos foram conferidos sobre a imagem final. Os hashes SHA-256 dos
oito assets preexistentes permaneceram iguais aos do inventário inicial; nenhum
arquivo original foi substituído ou recomprimido. A inspeção final de todos os
assets do tutorial confirmou dimensões, formato, legibilidade, conteúdo real e
ausência das categorias de dados pessoais e confidenciais listadas acima.

Continuam pendentes novas capturas reais e autorizadas para mostrar os cinco
níveis de Urgência na mesma imagem e, se futuramente disponível, a interface
interna de um chamado. Essas pendências não devem ser supridas por reconstrução
ou pela criação de chamados para documentação.
