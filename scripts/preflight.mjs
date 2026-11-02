import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);
let failures = 0;
function check(ok, label) {
  console.log(`${ok ? 'OK' : 'FALTA'} ${label}`);
  if (!ok) failures++;
}
const [major, minor] = process.versions.node.split('.').map(Number);
check(major > 22 || (major === 22 && minor >= 12), `Node ${process.versions.node} (mínimo22.12)`);
for (const cli of ['openspec', 'opencode', 'orca']) {
  try {
    const { stdout } = await exec(cli, ['--version'], { timeout: 15_000, shell: process.platform === 'win32' });
    check(true, `${cli}: ${stdout.trim().split('\n').at(0)}`);
  } catch {
    check(false, `${cli} instalado e acessível no PATH`);
  }
}
try {
  const response = await fetch('http://127.0.0.1:11434/api/tags', { signal: AbortSignal.timeout(6000) });
  if (!response.ok) throw new Error();
  const data = await response.json();
  const names = new Set(data.models.map(model => model.name));
  for (const name of ['qwen3.5:4b-orca', 'qwen3:4b-reviewer']) check(names.has(name), `modelo ${name}`);
} catch {
  check(false, 'Ollama a responder em 127.0.0.1:11434');
}
console.log('Este controlo verifica instalação e inventário. Ensaiar também um pedido, uma ferramenta e os testes antes da aula.');
process.exitCode = failures ? 1 : 0;
