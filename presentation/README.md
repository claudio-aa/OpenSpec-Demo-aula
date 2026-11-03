# Workshop com agentes e OpenSpec

[Abrir a apresentação auto contida](output/workshop-agentes-openspec-autocontido.pptx)

34 slides editáveis em português europeu para o 3.º ano de Análise de Sistemas. O conteúdo essencial está nos slides. As notas acrescentam fontes e orientação secundária. A apresentação mantém 30 minutos de introdução e 30 de prática.

A versão anterior, [reestruturada](output/workshop-agentes-openspec-reestruturado.pptx), permanece preservada.

## Percurso da aula

| Slides | Minutos | Trabalho |
| --- | --- | --- |
| 1–5 | 00–08 | Objetivo, microprocesso, stakeholders, previsão e decisão D1 |
| 6–8 | 08–13 | Definição de OpenSpec, contrato e artefactos |
| 9–13 | 13–21 | Modelo, cliente, agente, tools, command, skill e permissões |
| 14–18 | 21–29 | Pedido limitado, percurso completo, contexto e evidência |
| 19 | 29–30 | Preparação e mapa da prática |
| 20–21 | 30–34 | Branch do grupo, três testes de infraestrutura e interface |
| 22–24 | 34–40 | Análise textual, referência01, revisão e aprovação humana |
| 25–28 | 40–48 | Referência02, geração de decide, integração humana e testes |
| 29–30 | 48–52 | Revisão e reprodução de uma crítica |
| 31–34 | 52–60 | Arquivo de referência, handoff, nova sessão e entrega |

A rota base usa pedidos pequenos a um modelo local, sem ferramentas, através de `scripts/local-packet.mjs`. A pessoa carrega os artefactos preparados, aprova a regra, integra a função e executa comandos. Os ensaios de agentes com ferramentas aparecem como evidência separada. O perfil completo do builder não faz parte do percurso cronometrado.

O checkpoint01 contém a proposta aprovada de referência e uma função ainda por implementar. Para integrar apenas `decide`, a prática carrega três ficheiros preparados do checkpoint02: a regra com validação de entradas, o teste de negócio e o teste HTTP atualizado. O teste HTTP do starter esperava `NOT_IMPLEMENTED`; conservar essa expectativa depois de implementar seria incoerente.

A atividade inspeciona o arquivo do checkpoint03 sem arquivar a branch do grupo. O handoff do grupo declara a alteração ativa, trabalho realmente concluído e pendências. A entrega de todos os pares inclui a decisão, o cenário, a ligação spec/teste, a saída observada, a revisão e a retoma. Recuperações preservam a branch e uma cópia da tentativa.

## Preparação e limites

Preparar o clone, os acessos, Node, dependências, OpenSpec, ORCA, OpenCode e o modelo antes da aula. O segundo modelo é opcional. O fluxo usa serviços locais, sem API paga, cartão ou subscrição. Um bloqueio do modelo conduz à referência preparada, sem procurar um serviço pago.

As versões concretas e a preparação técnica estão em [orca-setup.md](../docs/orca-setup.md). O [ensaio técnico de 03-11-2026](../docs/reviews/cycle-02/runtime-evidence.md) confirma a integração reduzida, 26 testes e build. Não equivale a um ensaio completo dos 30 minutos com estudantes nem a execução autónoma de todo o workflow.

## Edição e geração

- `slides.json`: texto visível, minutos e notas.
- `build.mjs`: composição, renderização e exportação com `@oai/artifact-tool`.
- `diagrams.mjs`: esquemas nativos editáveis.
- `assets/parking.png`: imagem extraída do enunciado fornecido.
- `.build/`: renders e ficheiros de trabalho privados, excluídos do Git.

O gerador usa o runtime de apresentações fornecido pelo Codex e não instala dependências. `RUNTIME_ROOT`, `RUNTIME_NODE_MODULES` e `PRESENTATIONS_SKILL` permitem indicar outra localização do mesmo runtime. Cada geração deve usar um nome novo:

```sh
PPTX_FILENAME=workshop-agentes-openspec-revisao.pptx node presentation/build.mjs
```

As validações de quantidade, tabelas e gráficos derivam de `slides.json`; não há números de slide fixos no gerador. Ao editar a sequência, preservar a transição para prática no minuto 30 e o total 60. Todos os comandos essenciais devem continuar legíveis e identificados como terminal, entrada do cliente ou operação no editor.

Revisão final: os três pareceres ficaram satisfeitos no âmbito documental. Ver [ciclo03](../docs/reviews/cycle-03/README.md); continua necessário ensaio com alunos.
