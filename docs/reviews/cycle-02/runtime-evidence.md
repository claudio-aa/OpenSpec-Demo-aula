# Evidência técnica do percurso reduzido

Data: 2026-11-03. Execução numa worktree temporária em `/tmp/OpenSpec-Demo-cycle-02-evidence`, sem alterar a worktree principal, sem commits e sem push.

## Percurso executado

1. Worktree criada em `origin/checkpoint/00-starter`.
2. Artefactos `openspec/changes/validate-garage-exit` restaurados de `origin/checkpoint/01-spec-approved`.
3. `server/exit-decision.js`, `test/exit-decision.test.js`, `test/server.test.js` e `scripts/local-packet.mjs` restaurados de `origin/checkpoint/02-implemented`. O código inicial de decisão foi temporariamente substituído por um stub, preservando o wrapper de datas, para isolar a função que o pedido do modelo deveria gerar.
4. Dependências existentes reutilizadas por symlink para `node_modules`; não foi executado `npm ci` nem descarregado código de fornecedor.
5. `openspec status --change validate-garage-exit --json` mostrou os quatro artefactos planeados concluídos. `openspec validate validate-garage-exit --strict --no-interactive` passou.
6. `node scripts/local-packet.mjs builder` chamou localmente `qwen3.5:4b-orca` sem fallback cloud. O modelo devolveu uma função `decide(paid, elapsedMs)` completa em 7,43 s: sem pagamento → `UNPAID`; mais de 900000 ms → `EXPIRED`; restantes entradas já validadas → `VALID`. O Ollama reportou 104 tokens de entrada, 91 de saída e resposta completa.
7. Integrada somente essa função no wrapper. O teste `node --test test/exit-decision.test.js` passou 22/22.

## Incompatibilidade encontrada e recuperação

Na primeira composição, mantive `test/server.test.js` do starter, que espera `NOT_IMPLEMENTED`. Depois de integrar a regra, esse teste HTTP falhou: 24/25 passaram. A implementação estava a devolver `VALID`, como o contrato aprovado exige. A recuperação foi restaurar também `test/server.test.js` de `origin/checkpoint/02-implemented`, sem alterar a implementação para satisfazer a expectativa obsoleta do starter.

Com os quatro ficheiros de referência02 coerentes:

- `npm test`: 26/26 passaram (22 testes da regra e quatro de infraestrutura/API), em 131 ms reportados pelo runner.
- `npm run build`: passou em 0,48 s.
- Casos explícitos: 900000 ms → `VALID`; 900001 ms → `EXPIRED`; sem pagamento → `UNPAID`.
- Validação OpenSpec estrita repetida: passou. `openspec archive validate-garage-exit --yes --json` arquivou como `2026-11-03-validate-garage-exit`; a saída reportou `totals.added: 4`, correspondente aos quatro requisitos da capability `garage-exit` numa única spec, não a quatro ficheiros spec.

## Limites

Este foi um percurso técnico curto com um pedido a modelo local sem ferramentas; a pessoa coordenadora integrou a função e executou os testes. Não foi uma sessão multiagente dentro da interface ORCA, comparação medida entre modelos ou ensaio com alunos. Não foi medido o tempo total da atividade de 30 minutos. A revisão dos cenários foi confirmada pelos testes existentes; não se afirma que um revisor independente executou ferramentas.

O percurso não usou API paga, cloud, cartão, subscrição ou trial. As três saídas principais `900000`, `900001` e `unpaid` foram verificadas pelos testes. O resultado de qualquer revisão automática continua sujeito a validação humana.

## Verificação do import no arranque do servidor

Adenda, 2026-11-03. Repeti em `/tmp/OpenSpec-Demo-import-restart`, uma worktree temporária de `origin/checkpoint/00-starter`. `server/index.js` importa `evaluateExit` estaticamente no arranque (linha 5). `PORT` é configurável, mas a porta 3000 estava livre; foi usada essa porta. O build passou em 0,50 s usando o symlink das dependências existentes. Não executei o modelo.

Iniciei `npm start` e enviei um POST à API em HTTP:

```sh
curl -sS -w '\nHTTP %{http_code}\n' -H 'Content-Type: application/json' \
  -d '{"paid":true,"paidAt":"2026-11-02T10:00:00.000Z","exitAt":"2026-11-02T10:15:00.000Z"}' \
  http://127.0.0.1:3000/api/exit-decisions
```

Antes de restaurar os ficheiros, a resposta foi `HTTP 200`, `{"allowed":false,"reason":"NOT_IMPLEMENTED"}`. Restaurei `server/exit-decision.js`, `test/exit-decision.test.js` e `test/server.test.js` de `origin/checkpoint/02-implemented` com o servidor ainda ativo e repeti exatamente o mesmo POST: continuou a responder `HTTP 200`, `NOT_IMPLEMENTED`. Depois de parar e iniciar de novo `npm start`, o mesmo pedido respondeu `HTTP 200`, `{"allowed":true,"reason":"VALID"}`. Um POST pago com `exitAt` `2026-11-02T10:15:00.001Z` respondeu `HTTP 200`, `{"allowed":false,"reason":"EXPIRED"}`.

Isto confirma o efeito observado do import em cache no processo Node: alterar o módulo não muda a decisão do servidor já iniciado; o reinício carrega a implementação restaurada. Foi uma verificação da API via HTTP, sem abrir nem clicar na interface. O processo foi interrompido, a porta 3000 ficou sem listener e a worktree temporária foi removida.
