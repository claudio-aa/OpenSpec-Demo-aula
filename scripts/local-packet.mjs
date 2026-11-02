// Recurso para modelos pequenos: pedido delimitado, sem ferramentas ou edição automática.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const role = process.argv[2];
const activeSpec = 'openspec/changes/validate-garage-exit/specs/garage-exit/spec.md';
const spec = existsSync(activeSpec) ? activeSpec : 'openspec/specs/garage-exit/spec.md';
const jobs = {
  analyst: {
    model: 'qwen3.5:4b-orca',
    files: ['docs/BRIEF.md'],
    instruction: 'Analisa a regra de saída após pagamento. Separa factos de decisões didáticas. Identifica a ambiguidade de exatamente15 minutos e propõe três cenários. Até200 palavras. Não escrevas código.'
  },
  builder: {
    model: 'qwen3.5:4b-orca',
    files: [],
    instruction: 'Write only JavaScript function decide(paid, elapsedMs). Inputs already validated. paid is boolean. elapsedMs is finite nonnegative milliseconds if paid. If paid is false return {allowed:false,reason:"UNPAID"}; else if elapsedMs>900000 return {allowed:false,reason:"EXPIRED"}; else return {allowed:true,reason:"VALID"}. No comments. No markdown. No imports.'
  },
  reviewer: {
    model: 'qwen3:4b-reviewer',
    files: [spec, 'server/exit-decision.js'],
    instruction: 'Review the supplied spec and source. Return ONLY the required JSON, in Portuguese, up to150 words total. findings lists only concrete reproducible defects, otherwise empty. checked names cases inspected:900000ms,900001ms,unpaid,invalid inputs. limitations states this is textual review and no tests were executed. Do not narrate analysis or invent tool execution.',
    format: {
      type: 'object',
      properties: {
        findings: { type: 'array', maxItems: 3, items: { type: 'object', properties: { scenario: { type: 'string' }, problem: { type: 'string' } }, required: ['scenario', 'problem'], additionalProperties: false } },
        checked: { type: 'array', maxItems: 5, items: { type: 'string' } },
        limitations: { type: 'string' }
      },
      required: ['findings', 'checked', 'limitations'],
      additionalProperties: false
    }
  }
};
const job = jobs[role];
if (!job) {
  console.error('Uso: node scripts/local-packet.mjs analyst|builder|reviewer [--dry-run]');
  process.exit(2);
}
if (process.argv.includes('--dry-run')) {
  console.log(JSON.stringify({ role, ...job }, null, 2));
  process.exit(0);
}
const blocks = await Promise.all(job.files.map(async file => `FICHEIRO ${file}\n${await readFile(file, 'utf8')}`));
const prompt = [job.instruction, ...blocks, '/no_think'].join('\n\n');
console.error(`Papel: ${role}; modelo local: ${job.model}; ficheiros: ${job.files.join(', ') || 'nenhum'}`);
try {
  const response = await fetch('http://127.0.0.1:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(120_000),
    body: JSON.stringify({
      model: job.model,
      stream: false,
      think: false,
      format: job.format,
      messages: [{ role: 'user', content: prompt }],
      options: { num_ctx: 8192, num_predict: 768, temperature: 0.1 }
    })
  });
  const result = await response.json();
  if (!response.ok || result.error) throw new Error(result.error || `HTTP ${response.status}`);
  console.log(result.message.content);
  console.error(JSON.stringify({ model: result.model, inputTokens: result.prompt_eval_count, outputTokens: result.eval_count, seconds: result.total_duration / 1e9, complete: result.done_reason === 'stop' }));
  if (result.done_reason !== 'stop') {
    console.error('Resposta terminou pelo limite: resultado incompleto, não aceitar como conclusão.');
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`Pedido local falhou: ${error.message}. Sem fallback cloud.`);
  process.exitCode = 1;
}
