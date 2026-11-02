import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const roles = {
  analyst: { agent: 'workshop-analyst', model: 'ollama/qwen3.5:4b-orca', prompt: 'prompts/01-analysis.md' },
  builder: { agent: 'workshop-builder', model: 'ollama/qwen3.5:4b-orca', prompt: 'prompts/02-build.md' },
  reviewer: { agent: 'workshop-reviewer', model: 'ollama/qwen3:4b-reviewer', prompt: 'prompts/03-review.md' }
};
const role = roles[process.argv[2]];
if (!role) {
  console.error('Uso: node scripts/run-agent.mjs analyst|builder|reviewer [--dry-run]');
  process.exit(2);
}
if (process.argv.includes('--dry-run')) {
  console.log(JSON.stringify(role, null, 2));
  process.exit(0);
}
const activeSpec = 'openspec/changes/validate-garage-exit/specs/garage-exit/spec.md';
const resolvedSpec = existsSync(activeSpec) ? activeSpec : 'openspec/specs/garage-exit/spec.md';
const context = process.argv[2] === 'reviewer'
  ? `A spec desta sessão é ${resolvedSpec}. Lê esse caminho exato e server/exit-decision.js e test/exit-decision.test.js. Executa npm test. Não procures a spec noutro caminho. O diff de referência é git diff checkpoint/01-spec-approved..checkpoint/02-implemented -- server test.\n\n`
  : '';
const prompt = context + await readFile(role.prompt, 'utf8') + '\n/no_think\nNão narres o raciocínio. Usa as ferramentas necessárias e apresenta apenas o resultado breve.';
const args = ['run', '--pure', '--agent', role.agent, '--model', role.model, '--format', 'json', prompt];
console.error(`Papel: ${process.argv[2]}; agente: ${role.agent}; modelo: ${role.model}`);
const child = spawn('opencode', args, {
  stdio: 'inherit', shell: false,
  env: {
    ...process.env,
    OPENCODE_DISABLE_MODELS_FETCH: 'true',
    OPENCODE_DISABLE_EXTERNAL_SKILLS: 'true',
    OPENCODE_DISABLE_CLAUDE_CODE: 'true',
    OPENCODE_DISABLE_LSP_DOWNLOAD: 'true'
  }
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
