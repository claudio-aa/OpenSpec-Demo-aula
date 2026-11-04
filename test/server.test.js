import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppServer } from '../server/index.js';

async function withServer(run) {
  const server = createAppServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { await run(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise(resolve => server.close(resolve)); }
}
test('health endpoint is reachable', () => withServer(async base => {
  const response = await fetch(`${base}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
}));
test('API autoriza uma saída exatamente no limite aprovado', () => withServer(async base => {
  const response = await fetch(`${base}/api/exit-decisions`, { method: 'POST', body: JSON.stringify({ paid: true, paidAt: '2026-11-02T10:00:00Z', exitAt: '2026-11-02T10:15:00Z' }) });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { allowed: true, reason: 'VALID' });
}));
test('API distingue uma recusa de negócio de erro de entrada', () => withServer(async base => {
  const unpaid = await fetch(`${base}/api/exit-decisions`, { method: 'POST', body: JSON.stringify({ paid: false, paidAt: null, exitAt: '2026-11-02T10:15:00Z' }) });
  assert.equal(unpaid.status, 200);
  assert.deepEqual(await unpaid.json(), { allowed: false, reason: 'UNPAID' });
  const invalid = await fetch(`${base}/api/exit-decisions`, { method: 'POST', body: JSON.stringify({ paid: 'true', paidAt: null, exitAt: '2026-11-02T10:15:00Z' }) });
  assert.equal(invalid.status, 400);
  assert.deepEqual(await invalid.json(), { allowed: false, reason: 'INVALID_INPUT' });
}));
test('malformed JSON is rejected', () => withServer(async base => {
  const response = await fetch(`${base}/api/exit-decisions`, { method: 'POST', body: '{broken' });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { allowed: false, reason: 'INVALID_INPUT' });
}));
const post = (base, body) => fetch(`${base}/api/exit-decisions`, { method: 'POST', body: JSON.stringify(body) });
const at30 = { paid: true, paidAt: '2026-11-02T10:00:00Z', exitAt: '2026-11-02T10:30:00Z' };
test('API vigilante aos 30 minutos: 200 e VALID', () => withServer(async base => {
  const response = await post(base, { ...at30, paymentPoint: 'ATTENDANT' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { allowed: true, reason: 'VALID' });
}));
test('API caixa automática aos 30 minutos: 200 e EXPIRED', () => withServer(async base => {
  const response = await post(base, { ...at30, paymentPoint: 'MACHINE' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { allowed: false, reason: 'EXPIRED' });
}));
test('API paymentPoint inválido: 400 e INVALID_INPUT', () => withServer(async base => {
  const response = await post(base, { ...at30, paymentPoint: 'ATM' });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { allowed: false, reason: 'INVALID_INPUT' });
}));
test('API paymentPoint array ["ATTENDANT"]: 400 e INVALID_INPUT', () => withServer(async base => {
  const response = await post(base, { ...at30, paymentPoint: ['ATTENDANT'] });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { allowed: false, reason: 'INVALID_INPUT' });
}));
