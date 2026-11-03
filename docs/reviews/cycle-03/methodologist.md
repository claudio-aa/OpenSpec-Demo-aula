# Parecer metodológico independente — ciclo 03

Data: 3 de novembro de 2026. Revisor 3: metodologia de engenharia de software, workflows agênticos e desenho instrucional. Simulação profissional, sem alegação de certificação externa.

**Candidato:** `presentation/output/workshop-agentes-openspec-autocontido.pptx`.

**SHA-256 verificado:** `10efdf45139c16b71194575e075c4a4868a431f74f481e10174de847b4a14d73`.

**Veredito: satisfeito no âmbito documental e operacional reduzido revisto.** O P1 C02-M01 está resolvido. Não identifico P0/P1 nem novos P2 nos deltas inspecionados. Mantêm-se as conclusões e os limites do meu parecer do ciclo 02 para os restantes slides.

## Verificação pontual

Inspecionei os renders dos slides **2, 3, 12, 21, 28 e 29**, a fonte correspondente e os textos no XML do PPTX. As alterações estão visíveis, legíveis e não dependem de notas para explicar a correção. O ficheiro tem 34 slides e as durações na fonte continuam a somar 30 minutos de introdução e 30 de prática.

| Ponto | Resultado e evidência visível |
| --- | --- |
| C02-M01: servidor antigo após integração | **Resolvido.** Slide 21 explica ausência de recarga automática e antecipa reinício no slide 28. Slide 28 manda a pessoa usar Ctrl+C e `npm start` no Terminal A após integração e após qualquer recuperação. Exige atualizar a UI e verificar pagamento confirmado aos 15:00, esperando VALID. |
| Recuperação e validação | Slide 28 mantém diagnóstico antes de recuperar, cópia da tentativa e repetição de testes/build após recuperação. O reinício já não fica implícito. |
| Quota temporal da revisão | Slide 29 limita a espera a erro, 90 segundos totais ou duas tentativas sem progresso e manda passar à revisão pelo colega. Mantém entradas reais do pacote, ausência de diff/resultados e reprodução das suspeitas. Não introduz serviço remoto obrigatório. |
| Objetivo e âmbito | Slide 2 passa a analisar/aprovar uma spec e verificar uma autorização simulada, coerente com uso de artefactos preparados. |
| Exceções de negócio | Slide 3 deixa o tratamento de exceções como tema a validar com o responsável. Não atribui silenciosamente uma nova responsabilidade operacional ao vigilante. |
| Command e skill | Slide 12 torna explícito que invocar um command não prova carga de skill. Mantém perfil, modelo e permissões separados e início explícito da sessão. |

As distinções conceptuais anteriormente satisfeitas permanecem válidas: CLI/status/instructions não equivalem a implementação; pacote local gera texto; pessoa integra e testa; reviewer recebe spec e código; grupo inspeciona arquivo preparado e mantém a sua alteração ativa com pendência no handoff. O builder completo continua fora da base, pelo que não considero resolvida nem necessária para esta rota a configuração desse percurso excluído.

## Evidência de execução e limites

Li a adenda **«Verificação do import no arranque do servidor»** em `docs/reviews/cycle-02/runtime-evidence.md`. O registo descreve uma worktree temporária do starter, API HTTP a responder NOT_IMPLEMENTED, restauração dos ficheiros ainda com o processo ativo e persistência dessa resposta, seguida de reinício e respostas VALID em 900000 ms e EXPIRED em 900001 ms. Confirma o mecanismo e a correção do P1.

Essa evidência é fornecida pelo ensaio técnico registado, não uma execução deste revisor. Foi uma confirmação da **API via HTTP**, sem abrir nem clicar na interface. Não a apresento como verificação visual da UI. O slide inclui agora o passo de atualização e confirmação pelo aluno, que faltava ao roteiro.

Não executei modelos, testes, build ou servidor nesta revisão pontual. Não alterei apresentação, fontes, outros pareceres ou commits. O único ficheiro escrito é este relatório.

Continua por demonstrar a conclusão de toda a prática em 30 minutos por alunos. A distribuição está documentalmente coerente e as recuperações têm limites; a evidência técnica não mede o tempo total, não é ensaio com turma, benchmark ou demonstração de autonomia agêntica completa. Estes limites não invalidam o percurso reduzido que o candidato declara.

## Encerramento

C02-M01 encerrado. Não é necessária nova iteração metodológica por achado P0/P1 neste hash. O passo seguinte de validação pedagógica é um ensaio cronometrado com participantes, conservando a distinção entre o que está documentado, o que foi executado tecnicamente e o que ainda não foi observado numa aula.
