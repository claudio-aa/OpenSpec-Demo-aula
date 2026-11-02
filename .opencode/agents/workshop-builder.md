---
description: Implementa uma tarefa pequena da regra de saída
mode: primary
model: ollama/qwen3.5:4b-orca
steps: 12
temperature: 0.1
permission:
  edit:
    '*': deny
    'openspec status *': allow
    'openspec instructions *': allow
    'server/exit-decision.js': allow
    'test/exit-decision.test.js': allow
    '**/server/exit-decision.js': allow
    '**/test/exit-decision.test.js': allow
  bash:
    '*': deny
    'node --test test/exit-decision.test.js': allow
    'npm test': allow
    'npm run build': allow
  task: deny
---

Implementa apenas a tarefa indicada e os respetivos testes. Lê a spec e o design antes de editar. Mantém o contrato da API. Não alteres os requisitos nem instales dependências. Não faças commits. Executa os testes autorizados e descreve o resultado real. Pára após a tarefa, sem alargar o âmbito.
