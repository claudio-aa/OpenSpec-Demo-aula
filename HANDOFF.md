# Estado para retoma

## Código e materiais de referência

`main` contém a solução do simulador de autorização de saída, arquivada em `openspec/changes/archive/2026-11-02-validate-garage-exit/`; spec vigente em `openspec/specs/garage-exit/spec.md`. D1 aceita 900 000 ms inclusive; 900 001 ms devolve EXPIRED. D1–D6 são decisões didáticas a confirmar pelo responsável, não factos adicionais do enunciado.

Evidência anterior registada: 26 testes, build e validação OpenSpec passaram. Não foram repetidos neste ciclo documental. Qwen3 apresentou uma crítica falsa, refutada por reprodução; ver `docs/REVIEW.md` e `docs/CONTRIBUTIONS.md`.

O PPTX atual tem 22 slides e permanece inalterado: `presentation/output/workshop-agentes-openspec-reestruturado.pptx`. SHA-256: `cbc150a08224f3f1b32f68c7f30ec6e46b7aec3a1c0ac87e316c34c5361d5efd`.

## Primeiro ciclo de revisão concluído

Ler `docs/reviews/cycle-01/README.md` e os três pareceres independentes com suplementos: aluno sem contexto, docente de Análise de Sistemas e metodologista. O agente principal assume o papel de escritor. São perspetivas simuladas por IA; falta ensaio com pessoas reais.

Requisito explícito do utilizador: slides auto contidos; notas do docente secundárias. Faltam definição/propósito de OpenSpec, commands/skills/agents e exemplo completo com interfaces, permissões e evidência. A prática tem uma lacuna análise textual → artefactos OpenSpec. Há também um risco estático nas permissões bash do builder, ainda sem reprodução. Este ciclo não alterou PPTX, código, configuração ou checkpoints.

Próxima tarefa: escritor criar storyboard que resolva as correções consolidadas, com tamanho livre e 30+30 minutos; produzir nova versão sem esconder passos essenciais nas notas. Depois repetir as três revisões e ensaiar o percurso. Preservar o trabalho do utilizador e a versão anterior. O protocolo de revisores/escritor está em `docs/reviews/cycle-01/PROTOCOL.md`.
