## 1. Decisões

- [ ] 1.1 Pedir ao responsável pelo processo (Megapolis Mobilidade; na aula, o docente) que aprove, altere ou recuse D11 a D18 e registar o resultado em `HANDOFF.md`; se alguma for recusada, rever `specs/park-occupancy/spec.md` antes de implementar
- [ ] 1.2 Quando D11 a D18 forem aprovadas, acrescentá-las à tabela de decisões de `docs/BRIEF.md` e confirmar que a tabela tem D11 a D18 aprovadas (D7, D9 e D10 da change `validate-attendant-payment` seguem o seu próprio estado)

## 2. Implementação

- [ ] 2.1 Criar `server/park-occupancy.js` com o estado dos três parques (D11, D14) e as operações de registar um evento (D12, D13) e de consultar um parque e todos, e confirmar com os testes da tarefa 3
- [ ] 2.2 Acrescentar em `server/index.js` as rotas `POST /api/parks/{parkId}/events`, `GET /api/parks/{parkId}` e `GET /api/parks`, com 404 `NOT_FOUND` para parque desconhecido e 400 `INVALID_INPUT` (com `accepted`) para pedido inválido, apanhando localmente os erros de leitura do corpo em vez de os deixar para o `catch` geral, e confirmar com os testes da tarefa 3
- [ ] 2.3 Confirmar que `server/exit-decision.js`, `src/main.jsx` e `openspec/specs/garage-exit/` não foram alterados (`git diff --stat`) e que `npm test` e `npm run build` continuam a passar

## 3. Testes

- [ ] 3.1 Criar `test/park-occupancy.test.js` com um servidor novo por teste e uma função auxiliar que envia `ENTRY` N vezes pela API pública (assim se obtêm «P3 com 249» e «P3 com 250»), e acrescentar os testes dos cenários de `Consultar a ocupação de um parque` e `Consultar a ocupação de todos os parques`, um por cenário; confirmar com `npm test`
- [ ] 3.2 Acrescentar os testes dos cenários de `Registar entradas`, `Registar saídas` e `Recusar registos incompatíveis com a ocupação`, um por cenário, incluindo o cenário em que `VALID` de `garage-exit` não altera a ocupação; confirmar com `npm test`
- [ ] 3.3 Acrescentar os testes dos cenários de `Rejeitar parque desconhecido` e `Rejeitar pedidos de registo inválidos`, um por cenário, e confirmar com `npm test`. O teste de JSON malformado verifica `accepted` e não `allowed`. Os outros casos inválidos exercitam-se por testes ou `curl`; a interface não os cobre

## 4. Demonstração e fecho

- [ ] 4.1 Generalizar `scripts/demo-api.mjs` para além de `POST /api/exit-decisions`, mantendo os 13 casos atuais, e acrescentar casos novos com valores exatos: entrada em `P1` (`occupied: 1`), `P3` cheio recusado com `PARK_FULL` (o script enche `P3` em silêncio, com 250 `ENTRY`, antes do caso impresso), saída com `P2` vazio recusada com `NO_VEHICLES`, e consulta de `GET /api/parks`; confirmar com `npm run demo`
- [ ] 4.2 Atualizar `HANDOFF.md` e confirmar `openspec validate add-park-occupancy --strict --no-interactive`, `npm test` e `npm run build` antes de arquivar
