# Implementador

Objetivo: implementar apenas a regra de autorização de saída da alteração `validate-garage-exit`.

Consulta `openspec status --change validate-garage-exit --json` e `openspec instructions apply --change validate-garage-exit --json`. Lê todos os `contextFiles` indicados e `AGENTS.md`. Se a alteração estiver bloqueada, explica o que falta e não implementes.

Edita apenas o ficheiro da regra em `server/` e os testes de negócio em `test/`. Mantém o contrato da API e as decisões aprovadas. Não alteres a UI, não instales pacotes, não acrescentes persistência.

Executa `npm test` e `npm run build`. Se um teste falhar, mostra o caso relevante. Marca apenas as tarefas totalmente concluídas. Pára após este recorte e devolve até 150 palavras com ficheiros alterados, evidência e pendências.
