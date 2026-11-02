# Estado do demo e contributos dos modelos

O protótipo da autorização de saída está implementado e verificado, com 26 testes a passar, build concluído e alteração OpenSpec arquivada. Existem quatro checkpoints, guiões, prompts e uma apresentação para os 60 minutos. Falta ensaiar a sessão completa com o docente e os alunos. O protótipo simula apenas um recorte do caso de estudo.

## Autoria da preparação

O assistente principal e os agentes cloud prepararam a estrutura React/Node, a validação de entradas, os testes, os artefactos OpenSpec e os materiais. Os modelos locais receberam tarefas menores. A pessoa responsável pelo processo deve confirmar as decisões didáticas antes de as adotar no exercício.

| Modelo e tarefa | Resultado observado | Aproveitamento |
| --- | --- | --- |
| Qwen 3.5 4B, função completa | Falhou casos básicos e lançou erro com entrada nula | Resposta rejeitada |
| Qwen 3.5 4B, apenas `decide(paid, elapsedMs)` | Gerou os ramos de pagamento e limite temporal | Código integrado na referência |
| Qwen 3.5 4B, leitura com ferramenta OpenCode | Leu o ficheiro, mas confundiu motivos de recusa na explicação | Demonstração de ferramenta e de erro de interpretação |
| Qwen 3 4B, revisão textual em JSON | Alegou que 900001 ms seria aceite | Falso positivo refutado por execução |
| Qwen 3 4B, execução separada com ferramenta | Chamou `bash` com `npm test` e observou 26 testes, zero falhas e exit 0 | Verificação da execução dos testes existentes |

O último ensaio não atribui a autoria dos testes ao modelo local. Também não transforma a revisão textual anterior numa revisão que executou ferramentas. Foram tarefas e sessões diferentes.

## Medições observadas

| Pedido | Entrada | Saída | Duração |
| --- | --- | --- | --- |
| Função completa, Qwen 3.5 | 1 052 tokens | 1 607 tokens | 64,6 s |
| Apenas decisão, Qwen 3.5 | 100 tokens | 87 tokens | 6,35 s |
| Revisão JSON, Qwen 3 | 1 805 tokens | 173 tokens | 9,85 s |

São valores de execuções individuais. Os dois pedidos de código têm âmbitos diferentes. A redução do pedido também retirou trabalho de validação, pelo que estes valores não medem aceleração para uma tarefa equivalente.

## Implicação para o workshop

Preparar o contexto e o contrato antes de pedir código. Atribuir aos modelos pequenos tarefas delimitadas, inspecionar a resposta e verificar os cenários aprovados. Reproduzir cada crítica antes de alterar o código. Os checkpoints permitem continuar a aula quando uma tarefa excede o tempo disponível.

Detalhes: [ensaio local](LOCAL-TRIAL.md), [revisão e reprodução](REVIEW.md), [relatório JSON do revisor](../examples/qwen3-review.json) e [função integrada](../server/exit-decision.js).
