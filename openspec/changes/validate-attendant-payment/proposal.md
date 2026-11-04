## Why

O enunciado (CE4, parques com cancelas) indica que, ao sair, o condutor paga na caixa automática ou junto do vigilante, e que a caixa avaria com facilidade. A spec `garage-exit` arquivada só sabe se o bilhete está pago: não distingue onde o pagamento foi registado. O responsável pelo processo aprovou que o vigilante pode dar uma saída com janela até 60 minutos, o que obriga a conhecer esse ponto.

## What Changes

- O pedido de decisão passa a poder indicar o ponto de pagamento (caixa automática ou vigilante) num campo opcional `paymentPoint`.
- Para pedidos válidos, a janela de saída passa a depender do ponto de pagamento: 15 minutos (900 000 ms) na caixa automática ou sem ponto indicado, 60 minutos (3 600 000 ms) quando o pagamento foi registado pelo vigilante. Uma tentativa 30 minutos após o pagamento passa a ser autorizada com `ATTENDANT` e recusada com `EXPIRED` com `MACHINE`.
- Um valor de `paymentPoint` desconhecido ou de tipo incorreto passa a ser entrada inválida.
- Os pedidos sem o campo continuam a ser avaliados como até agora: a alteração não é incompatível com os pedidos atuais.

## Decisões

D1 a D6 de `docs/BRIEF.md` mantêm-se. D8 foi aprovada pelo responsável pelo processo (o docente, 4 nov 2026). D7, D9 e D10 são propostas e aguardam aprovação do responsável pelo processo (Megapolis Mobilidade; na aula, o docente). Detalhe em `design.md`.

| ID | Estado | Decisão |
| --- | --- | --- |
| D7 | Proposta | Campo opcional `paymentPoint` com `MACHINE` ou `ATTENDANT`; `null` equivale a ausente; outro valor é `INVALID_INPUT` |
| D8 | **Aprovada** | Pagamento registado pelo vigilante: janela até 60 minutos (3 600 000 ms, fronteira inclusiva por interpretação, seguindo D1). Caixa automática: D1 |
| D9 | Proposta | Campo ausente: decisão como antes desta alteração (janela de D1) |
| D10 | Proposta | `paymentPoint` é validado mesmo com `paid: false`; valor válido com `paid: false` dá `UNPAID`, valor inválido dá `INVALID_INPUT` |

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `garage-exit`: três requisitos mudam (`Autorizar dentro da janela aprovada`, `Recusar tentativas sem autorização`, `Rejeitar entradas inválidas`). `Comparar instantes independentemente do timezone` não muda.

## Impact

Código afetado: `server/exit-decision.js` (função `evaluateExit`), testes em `test/exit-decision.test.js` e `test/server.test.js`, e o formulário em `src/main.jsx`, que hoje envia apenas `paid`, `paidAt` e `exitAt`. `server/index.js` não precisa de mudar: passa o corpo do pedido a `evaluateExit` e devolve 400 quando a razão é `INVALID_INPUT`. `docs/BRIEF.md` recebe D8. Sem novas dependências, pagamentos reais, persistência ou controlo de equipamentos (D6).
