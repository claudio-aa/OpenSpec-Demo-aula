# OpenSpec e agentes com orçamento zero

Workshop guiado de 60 minutos para o 3.º ano de Análise de Sistemas. Os primeiros 30 minutos apresentam workflows agênticos. Os restantes 30 ligam um problema de estacionamento a uma especificação, uma implementação pequena e testes verificáveis.

O ambiente usa ORCA, OpenSpec e modelos locais através de Ollama. OpenCode fica disponível como alternativa de terminal. O percurso base funciona sem APIs pagas, cartão de crédito ou subscrição. Acesso gratuito à cloud é opcional e pode acabar a meio da sessão.

## Materiais

- [Guião dos 60 minutos](docs/WORKSHOP.md)
- [Ciclo, agentes e OpenSpec explicados passo a passo](docs/TEACHING-FLOW.md)
- [Caso de estudo e decisões em aberto](docs/BRIEF.md)
- [Workflow, papéis e consumo de contexto](docs/WORKFLOW.md)
- [Configuração ORCA e modelos](docs/orca-setup.md)
- [Checkpoints Git e recuperação](docs/CHECKPOINTS.md)
- [Prompts pequenos por tarefa](prompts/)
- [Apresentação auto contida e guião de utilização](presentation/)
- [Revisões independentes da apresentação](docs/reviews/cycle-03/README.md)
- [Estado para retomar o trabalho](HANDOFF.md)
- [Ensaio local e exemplo de uma tarefa demasiado ampla](docs/LOCAL-TRIAL.md)
- [Revisão, falsos positivos e evidência dos testes](docs/REVIEW.md)
- [Estado do demo e contributos reais dos modelos](docs/CONTRIBUTIONS.md)

## Exercício

O enunciado diz que, após pagar, o condutor tem 15 minutos para sair do parque. Vamos especificar e implementar apenas a autorização de saída. Pagamentos, bilhetes e cancela são simulados. A fronteira de exatamente 15 minutos exige uma decisão explícita do responsável pelo processo.

Stack: React na interface, Node no servidor e `node:test` nos testes. O projeto evita base de dados, autenticação e integrações externas para concentrar a aula na análise e na validação.

## Execução

Requisito: Node 22.12+ ou 24+. Instalar antes da aula:

```sh
npm ci
npm test
npm run build
npm run demo   # envia casos à API e compara com o esperado, sem curl
npm start
```

Para os modelos e ferramentas do workshop, seguir [orca-setup.md](docs/orca-setup.md) e executar `node scripts/preflight.mjs`.

Abrir `http://127.0.0.1:3000`. O servidor serve a interface compilada e a API. Após editar a interface, repetir o build. Para desenvolvimento com atualização da interface, consultar os scripts em `package.json`.

## Checkpoints

| Branch | Estado | Utilização |
| --- | --- | --- |
| `checkpoint/00-starter` | App preparada, regra por implementar | Início da prática |
| `checkpoint/01-spec-approved` | Spec e decisões aprovadas | Recuperar a fase de análise |
| `checkpoint/02-implemented` | Implementação e testes | Comparar uma solução |
| `checkpoint/03-complete` | Specs consolidadas e handoff | Rever o ciclo completo |
| `main` | Material final do formador | Preparação e consulta |

Criar uma branch própria a partir do starter. Não desenvolver diretamente nas branches de referência. Ver os comandos em [CHECKPOINTS.md](docs/CHECKPOINTS.md).

## Estado e limites

Este repositório contém uma solução didática para uma parte do caso de estudo. As decisões do exercício não são requisitos adicionais do enunciado. Os documentos de processo mantêm essa distinção. O setup de modelos deve ser ensaiado antes da aula: a existência de um modelo instalado não demonstra que ele consegue executar ferramentas com fiabilidade.

Os materiais do curso e a apresentação usam pt-PT. O enunciado original permanece na raiz.
