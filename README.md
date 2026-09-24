# Guia do Colaborador — Universidade Brasil

<img src="public/ub-logo.png" alt="Universidade Brasil" width="96">

Guia visual para orientar colaboradores da Universidade Brasil no uso do [Portal de Suporte UB](https://suporte.ub.edu.br/Helpdesk). O projeto apresenta telas reais do portal, marcações numeradas e instruções curtas para ajudar na abertura e no acompanhamento de chamados.

O guia é uma documentação externa. O registro, o envio e o acompanhamento dos chamados continuam sendo realizados no Portal de Suporte oficial.

## Sobre o projeto

O objetivo é reduzir dúvidas no preenchimento de chamados e facilitar a identificação dos campos e ações do portal. A experiência foi organizada para leitura rápida em computadores, tablets e celulares, com uma etapa por vez e acesso direto ao Portal de Suporte.

O tutorial segue cinco etapas:

1. Escolher o tipo de atendimento.
2. Definir urgência e categoria.
3. Descrever o problema e anexar evidências.
4. Revisar e enviar.
5. Acompanhar o chamado.

FAQ e Reservas aparecem como recursos secundários e não fazem parte desse fluxo.

## Recursos

- Tutorial guiado com navegação por etapas.
- Capturas reais e sanitizadas do Portal de Suporte.
- Hotspots numerados sobre os elementos relevantes de cada tela.
- Destaque do hotspot correspondente ao passar o mouse, focar ou tocar em uma legenda.
- Ampliação das capturas em diálogo nativo, com rolagem quando necessário.
- Stepper responsivo para desktop e dispositivos móveis.
- Navegação por teclado, foco visível, anúncio de mudança de etapa e suporte a `prefers-reduced-motion`.

## Tecnologias

- React 19 e TypeScript.
- Vinext e Vite para desenvolvimento e build.
- CSS global e CSS Modules para os estilos da interface.
- Sharp para reprodução dos recortes autorizados das capturas.
- npm para instalação e execução dos scripts.

## Executando localmente

### Requisitos

- Node.js 22.13 ou superior.
- npm compatível com o arquivo `package-lock.json`.

### Instalação e desenvolvimento

```bash
npm ci
npm run dev
```

O comando de desenvolvimento informa no terminal o endereço local da aplicação.

## Validação

```bash
npm run build
npx tsc --noEmit
npx oxlint app components/tutorial content types scripts/prepare-captures.mjs
npx oxfmt --check app components/tutorial content types scripts docs README.md
git diff --check
```

O lint global (`npm run lint`) também examina componentes-base existentes em `components/ui/` e `hooks/`. Esses arquivos possuem apontamentos anteriores a esta entrega; por isso, a validação do tutorial é executada sobre o código que compõe a funcionalidade.

## Estrutura principal

```text
app/                    Página, layout e estilos globais
components/tutorial/    Tutorial, stepper, capturas anotadas e diálogo
content/                Fonte única das cinco etapas e dos hotspots
types/                  Tipos do modelo do tutorial
public/portal/          Capturas reais e sanitizadas do portal
scripts/                Preparação reproduzível dos recortes autorizados
docs/                   Histórico técnico e auditoria dos assets
```

## Privacidade das capturas

As imagens utilizadas são capturas reais do Portal de Suporte UB. Identificações pessoais e informações de conta foram removidas fisicamente antes do versionamento.

Novas capturas devem seguir o mesmo processo: usar somente telas reais e autorizadas, remover dados pessoais antes do commit e nunca reconstruir ou completar a interface artificialmente. Campos e opções podem variar conforme o perfil, a unidade e futuras atualizações do portal.

Nenhum chamado ou reserva deve ser enviado apenas para produzir documentação.

## Manutenção

Antes de alterar o projeto, consulte:

- [`AGENTS.md`](AGENTS.md), com as regras de trabalho e privacidade;
- [`docs/HANDOFF.md`](docs/HANDOFF.md), com decisões técnicas e limitações conhecidas;
- [`docs/W2-ASSET-AUDIT.md`](docs/W2-ASSET-AUDIT.md), com a auditoria das capturas.

O fluxo recomendado é: criar ou atualizar uma branch, executar as validações aplicáveis, revisar o diff e abrir um Pull Request para aprovação antes do merge ou da publicação.

## Status

O tutorial está em revisão interna para aprovação. A existência deste repositório não indica que a versão atual esteja publicada.
