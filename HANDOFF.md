# Estado para retoma

Checkpoint final: `checkpoint/03-complete`.

Objetivo: avaliar a saída de um parque até 15 minutos após pagamento. O enunciado não resolve a fronteira exata. `docs/BRIEF.md` identifica decisões didáticas para aprovação.

Implementado: regra, validação de entradas, API e interface de simulação. A fronteira de 900 000 ms é inclusiva. Um milissegundo adicional devolve `EXPIRED`.

Revisão concluída: Qwen3 4B produziu uma revisão textual. As suspeitas sobre900001ms foram refutadas pela reprodução do cenário. Ver `docs/REVIEW.md`. Não alterar uma regra correta apenas para satisfazer a crítica do modelo.

Evidência executada: `npm test` passou26 testes, `npm run build` passou e a validação OpenSpec estrita passou. O relatório do ensaio local está em `docs/LOCAL-TRIAL.md`. Confirmar os resultados na nova sessão.

A spec canónica está em `openspec/specs/garage-exit/spec.md`. A alteração foi arquivada em `openspec/changes/archive/2026-11-02-validate-garage-exit/`. A validação da spec e das tarefas arquivadas passou. O workflow deste recorte está concluído.

Próximo exercício opcional: analisar como confirmar passagem física sem confundir autorização com saída efetiva, antes de propor uma nova alteração.
