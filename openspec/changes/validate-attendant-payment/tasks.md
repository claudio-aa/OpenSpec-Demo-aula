## 1. Decisões

- [ ] 1.1 Confirmar com o responsável pelo processo D7, D9 e D10 (D8 já aprovada) e registar o resultado em `HANDOFF.md`; se alguma for recusada, rever `specs/garage-exit/spec.md`
- [ ] 1.2 Quando D7, D9 e D10 forem aprovadas, acrescentá-las à tabela de decisões de `docs/BRIEF.md` (D8 já lá consta) e confirmar que a tabela tem D1 a D10 aprovadas

## 2. Regra de decisão

- [ ] 2.1 Validar `paymentPoint` e escolher a janela em `evaluateExit` (`server/exit-decision.js`) segundo D7 a D10, e confirmar com os testes da tarefa 3.1

## 3. Testes

- [ ] 3.1 Acrescentar em `test/exit-decision.test.js` os cenários da spec delta: `ATTENDANT` autorizado aos 60:00 e aos 30:00; `ATTENDANT` com 3 600 001 ms é `EXPIRED`; `MACHINE` autorizado aos 15:00 e `EXPIRED` aos 30:00; pedido sem campo e com `null` aos 30:00 é `EXPIRED`; `paid: false` com `ATTENDANT` é `UNPAID`; `"ATM"`, o número `1` e `"ATM"` com `paid: false` são `INVALID_INPUT`. Confirmar com `npm test`
- [ ] 3.2 Acrescentar em `test/server.test.js` um caso HTTP com `ATTENDANT` aos 30 minutos (200, `VALID`), um com `MACHINE` aos 30 minutos (200, `EXPIRED`) e um com valor inválido (400), e confirmar com `npm test`

## 4. Interface e fecho

- [ ] 4.1 Acrescentar a seleção opcional de ponto de pagamento em `src/main.jsx`, enviada só quando `paid` é `true`, e confirmar com `npm run build`. A interface cobre os casos válidos; os inválidos ficam nos testes da tarefa 3
- [ ] 4.2 Atualizar `HANDOFF.md` e confirmar `openspec validate validate-attendant-payment --strict --no-interactive` antes de arquivar
