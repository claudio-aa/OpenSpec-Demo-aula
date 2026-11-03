# Ensaio da iteração (3 nov. 2026)

Branch de exploração criado a partir de `checkpoint/00-starter`. A alteração `exit-after-payment` não é aplicada nem arquivada aqui; a implementação equivalente está em `checkpoint/02-implemented` (alteração `validate-garage-exit`).

| Commit | Quem | O quê |
| --- | --- | --- |
| v1 | `qwen3.5:4b-orca`, `/opsx-propose`, agente predefinido do OpenCode | Quatro ficheiros; spec truncada, sem cenários (`validate --strict`: 1 erro) |
| v2 | `qwen3.5:4b-orca`, `/opsx-update` | Spec em inglês, sem delta nem cenários (2 erros); também reescreveu design e tasks com erros novos |
| v3 | Assistente cloud que coordenou o ensaio (no papel do docente) | Delta substituído pela spec de referência; proposta corrigida. A mensagem do commit diz «human revision»: o autor real foi esse assistente |
| v3b | O mesmo assistente | Remove da proposta as alegações restantes de «sistema externo» |
| v3c | O mesmo assistente | design.md e tasks.md substituídos pelos da alteração de referência; BRIEF sem atividade de grupo |
