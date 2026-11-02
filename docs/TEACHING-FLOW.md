# Mapa pedagógico dos três blocos

A aula acompanha a autorização de saída do parque. A pessoa aprova uma interpretação da regra, o agente executa uma tarefa delimitada e OpenSpec guarda o contrato e o estado do trabalho. Cada bloco tem cinco slides com esquemas editáveis. As setas indicam dependência ou passagem de uma entrega, e os caminhos de retorno representam correção ou necessidade de esclarecimento.

## Ciclo de desenvolvimento

| Slide | O que o esquema mostra | Implicação a explicar |
| --- | --- | --- |
| 3 | Analisar, especificar, dividir, implementar e rever | Uma geração de código cobre só uma parte do ciclo |
| 4 | Frase dos 15 minutos, ambiguidade e escolha D1 | A decisão de negócio precede o código |
| 5 | D1 ligada à spec, ao código e aos testes vizinhos | A expectativa do teste vem do requisito |
| 6 | Ler contrato, editar, testar e regressar à correção | Uma falha altera a próxima ação do agente |
| 7 | Hipótese de novo prazo e checkpoints | Alterar um requisito propaga-se aos testes e à implementação |

A hipótese dos 10 minutos serve apenas para explicar propagação. Não altera o enunciado nem o protótipo existente. O caso real do exercício continua a usar 15 minutos, com a convenção inclusiva D1 sujeita a confirmação pelo docente.

## Uso dos agentes

| Slide | O que o esquema mostra | Implicação a explicar |
| --- | --- | --- |
| 8 | Contexto, modelo, controlo de permissões, ferramenta e observação | OpenCode executa ferramentas e devolve o resultado ao modelo |
| 9 | Analista, pessoa, implementador e revisor com entregas diferentes | Um papel não equivale a um modelo e uma proposta não equivale a aprovação |
| 10 | Duas tarefas independentes e uma decisão de consolidação | Só há paralelismo útil quando o trabalho não depende da entrega anterior |
| 11 | Tokens observados e função de decisão reduzida | Reduzir o âmbito pode tornar uma tarefa viável num modelo pequeno |
| 12 | Crítica de Qwen3 e reprodução do cenário | A evidência pode refutar o próprio revisor |

ORCA organiza sessões e worktrees. OpenCode controla o ciclo com ferramentas. Ollama serve os modelos. O percurso do revisor Qwen3 na aula usa JSON sem ferramentas, e a pessoa reproduz os achados. A chamada de `npm test` por Qwen3 foi um ensaio separado. Os dois pedidos de código do gráfico têm âmbitos diferentes e não são um benchmark de aceleração para o mesmo trabalho.

## Workflow OpenSpec

| Slide | O que o esquema mostra | Implicação a explicar |
| --- | --- | --- |
| 13 | Specs vigentes, alteração proposta e código | O agente precisa do estado atual e do delta pretendido |
| 14 | Proposal alimenta specs e design, que alimentam tasks | O planeamento define o contrato e a unidade de execução |
| 15 | D1, um cenário WHEN/THEN e dois testes de fronteira | O contrato define resultados observáveis |
| 16 | Estado, instruções apply, contexto, tarefa e evidência | Um checkbox só representa trabalho efetivamente concluído |
| 17 | Validação documental e aceitação do código antes do arquivo | Arquivar consolida a spec e conserva o histórico da alteração |

Os comandos do exemplo destinam-se à branch do grupo criada a partir de `checkpoint/00-starter`. Em `main`, a alteração de referência já foi arquivada. Criar uma pasta com a CLI não escreve automaticamente o conteúdo dos artefactos: o assistente redige-os a partir das decisões, e a pessoa revê-os.

`openspec validate` verifica a estrutura documental. `npm test` verifica os cenários implementados. As duas operações têm objetivos diferentes e convergem na decisão de aceitar a alteração.

## Ritmo da sessão

Os slides 1 e 2 abrem a sessão. O ciclo ocupa os minutos 2 a 10, os agentes os minutos 10 a 20 e OpenSpec os minutos 20 a 30. Os slides 18 a 22 orientam a prática entre os minutos 30 e 60. Cada slide central tem uma implicação explícita no rodapé e notas para o docente.
