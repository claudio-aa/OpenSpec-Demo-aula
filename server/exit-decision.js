const invalid = () => ({ allowed: false, reason: 'INVALID_INPUT' });

// Subconjunto ISO do contrato: segundos, precisão até ms e timezone explícito.
function instant(value) {
  if (typeof value !== 'string') return NaN;
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-](\d{2}):(\d{2}))$/.exec(value);
  if (!match) return NaN;
  const [, yearText, monthText, dayText, hourText, minuteText, secondText, , , offsetHour, offsetMinute] = match;
  const [year, month, day, hour, minute, second] = [yearText, monthText, dayText, hourText, minuteText, secondText].map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month < 1 || month > 12 || day < 1 || day > days[month - 1]) return NaN;
  if (hour > 23 || minute > 59 || second > 59) return NaN;
  if (offsetHour !== undefined && (Number(offsetHour) > 23 || Number(offsetMinute) > 59)) return NaN;
  return Date.parse(value);
}

// Gerado por Qwen 3.5 4B numa tarefa reduzida e validado pelos testes do contrato.
// O parâmetro windowMs foi acrescentado na change validate-attendant-payment (Claude Sonnet).
function decide(paid, elapsedMs, windowMs = 900000) {
  if (!paid) {
    return { allowed: false, reason: 'UNPAID' };
  }
  if (elapsedMs > windowMs) {
    return { allowed: false, reason: 'EXPIRED' };
  }
  return { allowed: true, reason: 'VALID' };
}

// Janela por ponto de pagamento: D1 (caixa automática) e D8 (vigilante), ambas inclusivas.
const windows = { MACHINE: 900000, ATTENDANT: 3600000 };

export function evaluateExit(input) {
  if (input === null || typeof input !== 'object' || Array.isArray(input) || typeof input.paid !== 'boolean') return invalid();
  const exitAt = instant(input.exitAt);
  const paidAt = input.paidAt === null ? null : instant(input.paidAt);
  if (!Number.isFinite(exitAt) || (paidAt !== null && !Number.isFinite(paidAt))) return invalid();
  if (input.paid && (paidAt === null || exitAt < paidAt)) return invalid();
  // D7/D10: paymentPoint opcional, null equivale a ausente e é validado mesmo com paid: false.
  const point = input.paymentPoint ?? 'MACHINE';
  if (typeof point !== 'string' || !Object.hasOwn(windows, point)) return invalid();
  return decide(input.paid, paidAt === null ? 0 : exitAt - paidAt, windows[point]);
}
