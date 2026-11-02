import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import { evaluateExit } from './exit-decision.js';

const dist = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
const invalid = { allowed: false, reason: 'INVALID_INPUT' };
function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}
async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 8192) throw new Error('Request too large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export function createAppServer() {
  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname === '/api/health' && req.method === 'GET') return json(res, 200, { status: 'ok' });
      if (url.pathname === '/api/exit-decisions' && req.method === 'POST') {
        let input;
        try { input = await readJson(req); } catch { return json(res, 400, invalid); }
        const decision = evaluateExit(input);
        return json(res, decision.reason === 'INVALID_INPUT' ? 400 : 200, decision);
      }
      if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'NOT_FOUND' });
      if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'METHOD_NOT_ALLOWED' });
      const requested = decodeURIComponent(url.pathname);
      const path = resolve(dist, '.' + (requested === '/' ? '/index.html' : requested));
      if (!path.startsWith(dist + sep)) return json(res, 404, { error: 'NOT_FOUND' });
      try {
        const content = await readFile(path);
        res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
        res.end(req.method === 'HEAD' ? undefined : content);
      } catch { json(res, 404, { error: 'NOT_FOUND' }); }
    } catch { json(res, 400, invalid); }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  createAppServer().listen(port, '127.0.0.1', () => console.log(`Simulador: http://127.0.0.1:${port}`));
}
