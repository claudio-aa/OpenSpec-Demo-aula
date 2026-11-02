# Estado para retoma

Checkpoint: `checkpoint/02-implemented`.

Objetivo: avaliar a saída de um parque até 15 minutos após pagamento. O enunciado não resolve a fronteira exata. `docs/BRIEF.md` identifica decisões didáticas para aprovação.

Implementado: regra, validação de entradas, API e interface de simulação. A fronteira de 900 000 ms é inclusiva. Um milissegundo adicional devolve `EXPIRED`.

Próxima tarefa: revisão independente da alteração OpenSpec `validate-garage-exit`, registo da evidência e arquivo. Usar `prompts/03-review.md`. Não alterar as decisões aprovadas para fazer passar testes.

Evidência executada: `npm test` passou 26 testes, `npm run build` passou e a validação OpenSpec estrita passou. O relatório do ensaio local está em `docs/LOCAL-TRIAL.md`. Confirmar os resultados na nova sessão.
