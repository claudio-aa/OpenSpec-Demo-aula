import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateExit } from '../server/exit-decision.js';

const paidAt = '2026-11-02T10:00:00.000Z';
const paid = { paid: true, paidAt, exitAt: '2026-11-02T10:15:00.000Z' };
const valid = { allowed: true, reason: 'VALID' };
const invalid = { allowed: false, reason: 'INVALID_INPUT' };

for (const [label, exitAt] of [
  ['no instante do pagamento', paidAt],
  ['aos 14:59', '2026-11-02T10:14:59Z'],
  ['exatamente aos 15:00', '2026-11-02T10:15:00Z'],
  ['offset equivalente', '2026-11-02T11:15:00+01:00']
]) {
  test(`autoriza ${label}`, () => assert.deepEqual(evaluateExit({ ...paid, exitAt }), valid));
}
for (const exitAt of ['2026-11-02T10:15:00.001Z', '2026-11-02T10:15:01Z']) {
  test(`recusa prazo expirado ${exitAt}`, () => {
    assert.deepEqual(evaluateExit({ ...paid, exitAt }), { allowed: false, reason: 'EXPIRED' });
  });
}
test('recusa sem pagamento confirmado', () => {
  assert.deepEqual(evaluateExit({ paid: false, paidAt: null, exitAt: paid.exitAt }), { allowed: false, reason: 'UNPAID' });
});
for (const [label, input] of [
  ['objeto nulo', null],
  ['array', []],
  ['campo paid em falta', { paidAt, exitAt: paid.exitAt }],
  ['booleano como string', { ...paid, paid: 'true' }],
  ['pagamento sem data', { ...paid, paidAt: null }],
  ['saída sem data', { ...paid, exitAt: null }],
  ['timezone em falta', { ...paid, exitAt: '2026-11-02T10:15:00' }],
  ['timezone inválido', { ...paid, exitAt: '2026-11-02T10:15:00+25:00' }],
  ['calendário impossível', { ...paid, paidAt: '2026-02-30T10:00:00Z' }],
  ['ano não bissexto', { ...paid, paidAt: '2025-02-29T10:00:00Z' }],
  ['hora inválida', { ...paid, paidAt: '2026-11-02T24:00:00Z' }],
  ['saída antes do pagamento', { ...paid, exitAt: '2026-11-02T09:59:59.999Z' }],
  ['data inválida mesmo sem pagamento', { paid: false, paidAt: 'ontem', exitAt: paid.exitAt }]
]) {
  test(`rejeita ${label}`, () => assert.deepEqual(evaluateExit(input), invalid));
}
test('aceita 29 de fevereiro num ano bissexto', () => {
  assert.deepEqual(evaluateExit({ paid: true, paidAt: '2024-02-29T23:59:59Z', exitAt: '2024-03-01T00:14:59Z' }), valid);
});
test('calcula a janela entre dias diferentes', () => {
  assert.deepEqual(evaluateExit({ paid: true, paidAt: '2026-11-02T23:55:00Z', exitAt: '2026-11-03T00:10:00Z' }), valid);
});
