# Ensaio local e redução da tarefa

Este registo descreve o ensaio realizado nesta preparação, sem apresentar uma comparação universal entre modelos.

## Primeiro pedido

Ollama recebeu um pedido para `qwen3.5:4b-orca`, com a spec da autorização de saída, para gerar uma função JavaScript completa. A API reportou 1 052 tokens de entrada, 1 607 de saída e aproximadamente 64,6 segundos. O modelo escreveu validação de datas e a regra numa única resposta.

A inspeção e a execução de três cenários simples revelaram falhas: exatamente15 minutos devolvia `INVALID_INPUT`, a ausência de pagamento também devolvia `INVALID_INPUT`, e uma entrada `null` provocava `TypeError`. A explicação do modelo dizia cumprir os requisitos, mas o código não os cumpria. A resposta não foi integrada.

## Tarefa reduzida

O segundo pedido assumiu entradas já validadas e pediu apenas a função `decide(paid, elapsedMs)`. A API reportou 100 tokens de entrada, 87 de saída e aproximadamente 6,35 segundos. A função devolveu `UNPAID`, `EXPIRED` ou `VALID` com a fronteira aprovada. Essa função integra a solução de referência, juntamente com validação de entradas preparada e revista separadamente.

Os pedidos fazem trabalhos diferentes. Estes valores ilustram a redução de âmbito e de contexto, sem provar uma melhoria equivalente para o problema completo.

## Utilização na aula

`scripts/local-packet.mjs` reproduz pedidos pequenos para análise, geração da decisão e revisão textual. O script não dá ferramentas ao modelo e não edita ficheiros. O estudante lê a proposta antes de a integrar. Esta interação complementa a demonstração de um agente com ferramentas em OpenCode.

```sh
node scripts/local-packet.mjs builder
```

Se o agente completo bloquear, usar este percurso reduzido ou o checkpoint. Não ocupar a aula a repetir pedidos extensos. Registar sempre o que o modelo fez e o que a pessoa ou outro agente corrigiu.
