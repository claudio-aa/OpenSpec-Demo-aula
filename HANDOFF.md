# Estado para retoma

A apresentação final está em `presentation/output/workshop-agentes-openspec-autocontido.pptx`: 34 slides, 30 minutos de conceitos e 30 de prática, conteúdo essencial visível sem depender das notas. SHA-256: `10efdf45139c16b71194575e075c4a4868a431f74f481e10174de847b4a14d73`. Versões anteriores preservadas.

Três ciclos concluídos com três revisores independentes e um escritor/coordenação. Aluno, docente e metodologista ficaram satisfeitos no âmbito documental; ler `docs/reviews/cycle-03/README.md`. Todos os achados anteriores foram resolvidos no percurso declarado ou retirados explicitamente da rota base. O builder completo continua excluído; a sua configuração não foi certificada.

O percurso reduzido usa artefactos preparados, geração local apenas de decide, integração/testes pela pessoa e inspeção do arquivo de referência. O grupo conserva alteração ativa e declara as pendências no handoff. Após editar ou recuperar a regra, reiniciar o servidor e verificar o caso pago aos 15:00 na interface.

Evidência em `docs/reviews/cycle-02/runtime-evidence.md`: geração local, 26 testes/build/validação/arquivo temporário e API antes/depois de reiniciar. A falha inicial do teste HTTP obsoleto ficou registada. Não foi ensaio com alunos nem medição de 30 minutos; UI não foi clicada. Código e configuração principais não mudaram neste trabalho.

A solução canónica mantém D1 inclusiva de 900000 ms; 900001 é EXPIRED. D1–D6 são decisões didáticas a confirmar, não factos adicionais do enunciado. O simulador não cobra nem controla hardware.

Novas alterações ao PPTX mantêm o modelo três revisores (aluno/docente/metodologista) e um escritor, com pareceres separados e versão identificada.

## Checkpoint 05: change aplicada (`validate-attendant-payment`)

`evaluateExit` aplica a janela por `paymentPoint` (`MACHINE` 900 000 ms, `ATTENDANT` 3 600 000 ms, inclusivas). D8 aprovada; D7, D9 e D10 implementadas como propostas, ainda por aprovar formalmente, e fora de `docs/BRIEF.md` (tarefas 1.1 e 1.2 em aberto). Evidência: `npm test`, `npm run build`, `npm run demo` (`scripts/demo-api.mjs`) e `openspec validate validate-attendant-payment --strict --no-interactive`. Próxima tarefa: aprovar D7, D9 e D10, atualizar `docs/BRIEF.md` e arquivar; depois ensaiar 60 minutos com uma dupla e uma falha de modelo, registando tempos e dúvidas.

## Checkpoint 06: nova capability proposta (`add-park-occupancy`)

Change `add-park-occupancy` proposta e não aplicada: cria a capability `park-occupancy` (só `## ADDED Requirements`) para registar entradas e saídas por parque e consultar lugares livres. É independente de `garage-exit` e não toca em `validate-attendant-payment`, que continua ativa. A divisão dos 850 lugares (300, 300 e 250 em `P1`, `P2` e `P3`) é inventada. D11 a D18 são propostas por aprovar pelo responsável pelo processo e ainda não constam de `docs/BRIEF.md` (tarefas 1.1 e 1.2 em aberto). Sem código nem testes novos. Próxima tarefa: aprovar D11 a D18, atualizar `docs/BRIEF.md` e só depois aplicar.
