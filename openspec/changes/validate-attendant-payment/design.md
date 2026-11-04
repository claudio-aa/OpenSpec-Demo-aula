## Context

Ver `proposal.md` para a motivação. Estado atual, verificado no código:

- `evaluateExit` em `server/exit-decision.js` valida `paid` (booleano), `exitAt` e `paidAt` e decide por tempo decorrido (`> 900000` ms é `EXPIRED`). Não lê nenhum outro campo.
- `paidAt: null` significa "sem valor" e é aceite; `paidAt` ausente é rejeitado.
- Com `paid: false`, um `paidAt` preenchido é validado e a decisão é `UNPAID` (`test/exit-decision.test.js`, caso «data inválida mesmo sem pagamento» para o inválido).
- Campos desconhecidos no corpo do pedido são ignorados, não rejeitados.
- `server/index.js` devolve HTTP 400 apenas quando `reason` é `INVALID_INPUT`.
- `src/main.jsx` envia `{ paid, paidAt, exitAt }`.
- Os testes atuais não usam ponto de pagamento.

## Decisão aprovada

- **D8 — Janela do vigilante (aprovada pelo responsável pelo processo, o docente, em 4 nov 2026).** «O vigilante pode dar uma saída com janela até 60 minutos.» Pagamentos registados com `ATTENDANT` têm janela de 3 600 000 ms. `MACHINE` mantém os 900 000 ms de D1. Ler «até» como inclusivo é uma interpretação que segue D1, não uma frase do enunciado nem da aprovação; o responsável pode corrigi-la. D2 aplica-se com a janela do ponto de pagamento: ultrapassada, `EXPIRED`.

## Decisões propostas — a aguardar aprovação do responsável pelo processo

O enunciado diz apenas que se paga na caixa automática ou ao vigilante e que a caixa avaria. Não define o modelo do dado nem o tratamento de pedidos antigos. As escolhas abaixo são propostas do autor desta alteração. Só o responsável pelo processo (Megapolis Mobilidade; na aula, o docente) as pode aprovar. A spec delta foi escrita segundo estas propostas e muda se alguma for recusada. D1 a D6 mantêm-se.

- **D7 — Modelo do dado.** Campo opcional `paymentPoint` com os valores `MACHINE` (caixa automática) e `ATTENDANT` (vigilante). `null` equivale a ausente, em coerência com `paidAt: null` («sem valor»). Outros valores e tipos não string são `INVALID_INPUT` com HTTP 400 (D4). Alternativas: tratar `null` como inválido (mais estrito, assimétrico com `paidAt`); booleano `attendantPaid` (difícil de estender a um terceiro ponto de pagamento).
- **D9 — Compatibilidade.** Um pedido sem `paymentPoint` continua válido e é avaliado como antes: janela de D1, `UNPAID` se não pago. Alternativa: campo obrigatório quando `paid` é `true`; seria incompatível com os pedidos atuais e com a interface.
- **D10 — Coerência com `paid: false`.** `paymentPoint` é validado como `paidAt`: um valor inválido é `INVALID_INPUT`, mesmo com `paid: false`; um valor válido com `paid: false` termina em `UNPAID`. Alternativa: rejeitar qualquer `paymentPoint` com `paid: false` como dado incoerente (D4); mais estrito, mas trata o campo de forma diferente de `paidAt`.

Consequência: o ponto de pagamento passa a alterar a decisão (D8), mas a resposta continua a ser `{ allowed, reason }` sem devolver o ponto, como em `validate-garage-exit`.

## Goals / Non-Goals

**Goals:** aplicar a janela de cada ponto de pagamento no pedido existente, preservando os pedidos atuais.

**Non-Goals:** modelar avarias da caixa ou o estado do equipamento, pagamento em numerário, valores cobrados, identificação do vigilante, persistência (D6), e prova de que o veículo atravessou a cancela.

## Decisions

- Validar `paymentPoint` em `evaluateExit` com as restantes validações de entrada, antes de decidir, e escolher a janela a partir dele. Sem mudança em `server/index.js`.
- Tratar `null` e ausente como o mesmo caso (D7); qualquer outro valor fora de `MACHINE` e `ATTENDANT` é inválido.
- Expor o campo na interface como seleção opcional. A interface só demonstra os casos válidos; os casos inválidos exercitam-se com testes ou `curl`.

## Risks / Trade-offs

- [As propostas D7, D9 e D10 podem ser recusadas] → rever a spec delta e as tarefas antes de `/opsx-apply`.
- [O campo é declarado pelo cliente do simulador e não prova onde o pagamento ocorreu; um cliente pode escolher `ATTENDANT` para obter 60 minutos] → aceitável no simulador (D6); não serve de controlo em produção.
- [Ler «até 60 minutos» como inclusivo pode divergir da intenção] → está assinalado como interpretação em D8.
