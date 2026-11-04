// Demonstração da API sem curl: arranca o servidor numa porta livre, envia os casos
// abaixo e compara cada resposta com o valor esperado. Termina com código 1 se algum falhar.
import { createAppServer } from '../server/index.js';

const pagoAs = '2026-11-02T10:00:00Z';
const VALID = { allowed: true, reason: 'VALID' };
const EXPIRED = { allowed: false, reason: 'EXPIRED' };
const UNPAID = { allowed: false, reason: 'UNPAID' };
const INVALID_INPUT = { allowed: false, reason: 'INVALID_INPUT' };

// Cada caso: etiqueta, pedido enviado, HTTP esperado e resposta esperada.
const pago = (exitAt, extra = {}) => ({ paid: true, paidAt: pagoAs, exitAt, ...extra });
const cases = [
  // Janela de 15 minutos (D1)
  { label: '15 min: 14:59 autorizado',          request: pago('2026-11-02T10:14:59Z'),                                   status: 200, expected: VALID },
  { label: '15 min: 15:00 autorizado',          request: pago('2026-11-02T10:15:00Z'),                                   status: 200, expected: VALID },
  { label: '15 min: 15:00.001 expirado',        request: pago('2026-11-02T10:15:00.001Z'),                               status: 200, expected: EXPIRED },
  { label: '15 min: não pago',                  request: { paid: false, paidAt: null, exitAt: '2026-11-02T10:05:00Z' },  status: 200, expected: UNPAID },
  // Entrada inválida (D4)
  { label: 'Entrada inválida: 30 de fevereiro', request: pago('2026-11-02T10:10:00Z', { paidAt: '2026-02-30T10:00:00Z' }), status: 400, expected: INVALID_INPUT },
  // Janela do vigilante (D8) e ponto de pagamento (D7)
  { label: 'Vigilante 30:00 autorizado',        request: pago('2026-11-02T10:30:00Z', { paymentPoint: 'ATTENDANT' }),   status: 200, expected: VALID },
  { label: 'Caixa 30:00 expirado',              request: pago('2026-11-02T10:30:00Z', { paymentPoint: 'MACHINE' }),     status: 200, expected: EXPIRED },
  { label: 'Vigilante 60:00 autorizado',        request: pago('2026-11-02T11:00:00Z', { paymentPoint: 'ATTENDANT' }),   status: 200, expected: VALID },
  { label: 'Vigilante 60:00.001 (3 600 001 ms) expirado',      request: pago('2026-11-02T11:00:00.001Z', { paymentPoint: 'ATTENDANT' }), status: 200, expected: EXPIRED },
  { label: 'Vigilante sem pagamento: não pago', request: { paid: false, paidAt: null, paymentPoint: 'ATTENDANT', exitAt: '2026-11-02T10:30:00Z' }, status: 200, expected: UNPAID },
  { label: 'paymentPoint null 30:00 expirado',  request: pago('2026-11-02T10:30:00Z', { paymentPoint: null }),           status: 200, expected: EXPIRED },
  { label: 'paymentPoint array inválido',       request: pago('2026-11-02T10:30:00Z', { paymentPoint: ['ATTENDANT'] }),  status: 400, expected: INVALID_INPUT },
  { label: 'paymentPoint inválido ("ATM")',     request: pago('2026-11-02T10:10:00Z', { paymentPoint: 'ATM' }),          status: 400, expected: INVALID_INPUT },
];

const server = createAppServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}/api/exit-decisions`;
let failures = 0;
try {
  for (const { label, request, status, expected } of cases) {
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request) });
    const body = await response.json();
    const ok = response.status === status && JSON.stringify(body) === JSON.stringify(expected);
    if (!ok) failures++;
    console.log(`${ok ? 'OK  ' : 'ERRO'} ${label}\n     pedido:   ${JSON.stringify(request)}\n     resposta: ${JSON.stringify(body)} (HTTP ${response.status})`);
    if (!ok) console.log(`     esperado: ${JSON.stringify(expected)} (HTTP ${status})`);
  }
} finally {
  await new Promise(resolve => server.close(resolve));
}
console.log(failures ? `\n${failures} caso(s) falharam.` : `\nTodos os ${cases.length} casos coincidem com o esperado.`);
process.exit(failures ? 1 : 0);
