# Parecer metodológico independente — ciclo 01

Data: 2 de novembro de 2026. Papel: revisor 3, engenharia de software, workflows agênticos e desenho instrucional. Este parecer é uma simulação profissional de revisão, sem alegar certificação externa. Não foram consultados os pareceres dos outros revisores.

## Âmbito e conclusão

Objeto: `presentation/output/workshop-agentes-openspec-reestruturado.pptx`, 22 slides, respetivas notas e renders `presentation/.build/slide-01.png` a `slide-22.png`. Li primeiro `README.md` e `AGENTS.md`, apliquei a orientação de inspeção da skill Presentations e confrontei o deck com os guias, prompts, perfis e scripts necessários. O único ficheiro escrito é este relatório. Não alterei apresentação, código, configuração, branches, checkpoints ou HANDOFF.

A estrutura conceptual é sólida e o tempo indicado soma exatamente 30 minutos de introdução e 30 de prática. A apresentação ainda precisa de correções operacionais antes de ser usada como percurso que os estudantes conseguem seguir do starter ao arquivo. A principal fragilidade não é a definição das ferramentas: é a passagem entre análise, artefactos OpenSpec e execução, combinada com uma promessa prática mais ampla do que os ensaios locais sustentam.

Identifico cinco achados P1 e dois P2. Não confirmo P0 nesta inspeção: existem percursos de recuperação documentados e não executei a sessão prática completa. P0 significa impedir o objetivo/execução ou transmitir uma ideia central incorreta; P1 prejudica significativamente compreensão/viabilidade; P2 é uma melhoria útil. As correções propostas são recomendações para decisão humana, não mudanças já realizadas.

## Evidência e limites de verificação

- Vi os 22 renders individualmente. Os diagramas e textos têm boa legibilidade nesta resolução, sem cortes materiais que impeçam compreender os fluxos. Não abri o ficheiro no PowerPoint.
- Inspecionei o ZIP/XML do PPTX: os 22 títulos e as 22 notas correspondem aos valores de `presentation/slides.json`. As observações sobre as notas não dependem apenas da fonte JSON.
- Li `docs/WORKFLOW.md`, `docs/orca-setup.md`, `docs/CONTRIBUTIONS.md`, `docs/LOCAL-TRIAL.md`, `docs/WORKSHOP.md`, `docs/BRIEF.md`, `docs/REVIEW.md`, `docs/CHECKPOINTS.md`, os quatro prompts numerados, `scripts/local-packet.mjs`, `scripts/run-agent.mjs`, `scripts/preflight.mjs`, os perfis builder/reviewer, `opencode.json`, `package.json`, o config e as tasks OpenSpec e os comandos gerados relevantes.
- Consultei `origin/checkpoint/00-starter` sem mudar de branch: contém apenas config e `.gitkeep` nas pastas OpenSpec; a regra devolve `NOT_IMPLEMENTED`. Confirmei o prompt de análise nessa referência.
- Executei apenas controlos sem modelos e sem mutações: `openspec archive --help`, `openspec new change --help`, `node scripts/run-agent.mjs builder --dry-run` e `node scripts/local-packet.mjs reviewer --dry-run`. Estes confirmam comandos e seleção de entradas/perfis, não execução de ferramentas pelo modelo.
- Não repeti `npm test` nem `npm run build`, porque não fiz alterações funcionais e a tarefa é avaliar a apresentação. Os 26 testes e medições citados são evidência registada nos artefactos, não uma nova execução deste revisor.
- Para resolver a interpretação técnica de permissões consultei uma fonte primária: [OpenCode — Permissions](https://opencode.ai/docs/permissions/), em 2 de novembro de 2026. A documentação distingue regras `edit` por caminho e `bash` por comando e dá precedência às permissões do agente. A conclusão sobre o perfil instalado continua a ser uma análise estática, sem reprodução de um bloqueio em runtime.

## Aspetos sólidos a preservar

1. **Decisão humana e rastreabilidade.** Slides 4–5 e 15 distinguem a frase do enunciado, a ambiguidade de 15:00, D1 e o teste de fronteira. A hipótese de 10 minutos do slide 7 está claramente marcada como futura e não aplicada. Os guias identificam D1–D6 como decisões didáticas, evitando inventar requisitos do cliente.
2. **Divisão de responsabilidades técnica.** Slide 8 mostra modelo, cliente que verifica permissões, ferramenta e observação. A frase final separa corretamente ORCA, OpenCode e Ollama. O retorno da observação ao modelo explica o ciclo agêntico com mais precisão do que uma lista de marcas.
3. **Dependências e revisão.** Slides 9–10 fazem a implementação esperar pela aprovação e distinguem tarefas independentes. As notas preservam revisão sem edição, modelos diferentes ainda da mesma família e sessões diferentes com o mesmo modelo. O exemplo não apresenta paralelismo proposto como paralelismo medido.
4. **Honestidade sobre contributos e medições.** Slide 11 avisa visivelmente que os âmbitos diferem. As notas e `CONTRIBUTIONS.md` atribuem validação, testes e preparação aos assistentes principais/cloud e só a pequena função ao modelo local. Os totais 2659 e 187 correspondem às somas de entrada e saída registadas. Não há base para um benchmark de aceleração equivalente, e o deck não deve perder esta ressalva.
5. **Verificação das críticas.** Slide 12 apresenta um falso positivo concreto e reproduzível. As notas distinguem a revisão textual da sessão separada em que Qwen 3 chamou `npm test`. Executar testes existentes não se confunde com autoria dos testes.
6. **OpenSpec com fronteiras adequadas.** Slides 13–17 separam estado vigente/delta, dependências dos artefactos, contexto de apply e consolidação. As notas de 15 e 17 dizem que validação documental não prova comportamento. Os comandos com hífen são coerentes com os ficheiros gerados locais. `openspec archive --help` confirma o percurso CLI que atualiza specs, distinguível do slash command que pode escolher não sincronizar.
7. **Recuperação gratuita.** Os scripts e a configuração usam Ollama local e não têm fallback cloud silencioso. Os checkpoints e o handoff permitem continuar sem quota externa. Não encontrei uma dependência paga obrigatória no percurso indicado.

## Achados

### M01 — P1 — Falta a operação que transforma a análise em alteração OpenSpec pronta

**Slides:** 19 → 20, relacionados com 14 e 16. **Localização do problema:** slide prático e instruções de condução; não é erro da definição teórica de OpenSpec.

**Evidência verificável:** o slide 19 indica `ORCA: prompts/01-analysis.md`. Esse prompt, linhas 3–5, só pede leitura, até 250 palavras e cenários propostos, terminando antes de implementar. Não pede criação de proposal, delta spec, design ou tasks. O starter tem `openspec/config.yaml` e `.gitkeep`, mas nenhuma alteração ativa. O slide 20 chama `prompts/02-build.md`, cuja linha 5 exige `status` e `instructions apply` da alteração `validate-garage-exit` e ordena parar se faltar contexto. As notas de 19 mencionam a alternativa `/opsx-propose`, mas não tornam explícito quem a executa no percurso ORCA, quando os ficheiros são produzidos ou qual o estado de saída esperado.

**Consequência:** um par que segue literalmente o slide faz análise textual e chega ao implementador sem contrato em ficheiros. Um agente correto deve parar. Mostrar apenas o checkpoint resolve o andamento da aula, mas oculta o passo central que o bloco OpenSpec pretende ensinar.

**Correção concreta:** dividir os seis minutos de 19 entre analisar/decidir e criar ou carregar uma alteração identificada. Escolher explicitamente: a pessoa executa propose com as decisões aprovadas, ou retoma `checkpoint/01-spec-approved` e verifica os quatro artefactos. Indicar no slide uma saída mínima, por exemplo `openspec/changes/validate-garage-exit/` com spec e tasks prontas. Distinguir criação pelos alunos de inspeção de referência preparada.

**Critério de aceitação:** num clone iniciado em `origin/checkpoint/00-starter`, um formador que siga apenas o guião e as notas chega a `status` com os artefactos necessários prontos antes de apply. Nenhuma criação essencial depende de uma instrução oral não registada. O percurso de checkpoint é identificado como recuperação.

### M02 — P1 — O perfil do implementador não autoriza os comandos OpenSpec que o prompt exige

**Slides:** 16 e 20. **Localização do problema:** configuração de suporte, não sintaxe dos comandos desenhados no slide.

**Evidência verificável:** `.opencode/agents/workshop-builder.md:10–11` coloca `openspec status *` e `openspec instructions *` em `permission.edit`. Em `permission.bash:16–20`, existe `'*': deny` e só estão autorizados o teste Node, `npm test` e `npm run build`. `prompts/02-build.md:5` exige precisamente os dois comandos OpenSpec. `scripts/run-agent.mjs` e o seu dry-run selecionam `workshop-builder`. Pela [semântica oficial de permissões](https://opencode.ai/docs/permissions/), permitir um caminho de edição não permite executar o comando em bash.

**Consequência:** o caminho de agente configurado pode bloquear logo na descoberta dos contextFiles, mesmo que a spec já exista. A falha seria facilmente atribuída ao modelo pequeno, quando a configuração está a impedir o trabalho pedido.

**Correção concreta:** permitir apenas os comandos OpenSpec de leitura necessários no bloco `bash`, mantendo a edição limitada aos dois ficheiros. Rever também a cópia de exemplo se partilhar o erro. Não abrir uma autorização genérica para todo o terminal.

**Critério de aceitação:** depois de corrigir a configuração, um ensaio local do perfil efetivo mostra chamadas bem-sucedidas a `status` e `instructions apply`, leitura do contexto, execução do teste e paragem nos ficheiros permitidos. Registar a evidência. **Grau de certeza:** incompatibilidade estática elevada; não reproduzi a recusa de ferramenta nem afirmo que já foi observada nesta sessão.

### M03 — P1 — O percurso prático principal exige mais autonomia do que o ensaio local demonstra

**Slides:** 8–9, 18–21, sobretudo 20. **Localização do problema:** seleção do percurso e expectativa de execução; os guias reconhecem a limitação melhor do que os slides práticos.

**Evidência verificável:** o slide 20 pede editar regra e testes de negócio e executar testes em oito minutos. `LOCAL-TRIAL.md:7–15` regista falha da função completa e sucesso apenas de `decide` com entradas validadas. Linhas 27–33 demonstram uma leitura com ferramenta e revisão JSON. `orca-setup.md:91–95` exclui o revisor completo do percurso cronometrado e diz que leitura não prova conclusão de implementação. `CONTRIBUTIONS.md:3` diz que falta ensaio da sessão completa. O preflight verifica inventário, não edição/teste. A alternativa reduzida só aparece nas notas de 20, após a tentativa do agente completo, e o slide 9 chama ao implementador uma entrega de diff/testes sem indicar quem a aplica no percurso reduzido.

**Consequência:** os estudantes podem passar a janela de implementação a esperar por um percurso ainda não demonstrado, e confundir geração de texto pelo modelo com agente a editar e testar. Os papéis ficam conceptual e operacionalmente desalinhados.

**Correção concreta:** escolher antes da aula um percurso base comprovado. Até haver ensaio integral, usar como base explícita pacote curto → pessoa inspeciona/aplica → pessoa executa testes, mais uma demonstração curta e separada do ciclo de ferramentas. Deixar o agente completo como extensão após ensaio. Mostrar nos slides 19–21 o comando efetivo de cada percurso, o responsável e um limite de espera concreto. A política de duas tentativas deve caber nesse limite e não significar duas esperas sem duração definida.

**Critério de aceitação:** ensaio registado na máquina menos potente prevista, desde o starter até handoff, dentro dos 30 minutos. Cada tarefa declara se é pedido a modelo sem ferramentas, agente com ferramentas ou ação humana. O plano de recuperação tem um gatilho temporal e preserva o trabalho do grupo conforme `CHECKPOINTS.md`.

### M04 — P1 — O pacote de revisão não recebe o diff nem a evidência que o fluxo diz entregar

**Slides:** 9 e 21, relacionados com 12. **Localização do problema:** contrato entre esquema e script recomendado.

**Evidência verificável:** slide 9 e `orca-setup.md:133` descrevem o revisor como consumidor de spec, diff e evidência. O slide 21 manda rever spec, diff e testes. Porém `scripts/local-packet.mjs:19–22` envia apenas spec e `server/exit-decision.js`; o dry-run confirma esses dois ficheiros. Não envia `test/exit-decision.test.js`, o diff da branch do grupo nem a saída de testes. O próprio prompt do pacote declara corretamente que é revisão textual sem execução. O script completo de reviewer tem outros contextos, mas o guia exclui-o do caminho cronometrado.

**Consequência:** a revisão demonstrada é leitura estática da spec e do estado do código. Não verifica se a alteração introduziu uma regressão, se os testes existem ou se a evidência apresentada corresponde ao diff. Não basta a pessoa correr `git diff` ao lado para que o modelo o receba.

**Correção concreta:** manter o pacote pequeno, mas fornecer o diff relevante, os testes necessários e um resumo da execução da branch do grupo; ou alterar a promessa visível para «modelo revê spec e código; pessoa revê diff e executa testes». Separar explicitamente a evidência observada pela pessoa da inspecionada pelo modelo.

**Critério de aceitação:** dry-run ou registo de entradas demonstra que os artefactos anunciados chegam ao revisor, ou o slide atribui cada verificação ao participante que realmente a fez. O relatório não afirma execução de testes pelo pacote e identifica limitações.

### M05 — P1 — A prática não reserva nem instrui a consolidação que fecha o ciclo OpenSpec

**Slides:** 17, 21 e 22. **Localização do problema:** guião prático, com discrepância entre deck e workshop.

**Evidência verificável:** slide 17 ensina validação + código aceite → archive → spec vigente e histórico. Mas a prática usa 48–53 para revisão, 53–57 para handoff/troca e 57–60 exclusivamente para perguntas finais. As notas de 21 referem checkpoint 03 como referência; as de 22 só pedem respostas e entrega mínima. Não há comando prático de `validate`, atualização de tasks ou `archive`. `docs/WORKSHOP.md` reserva 57–60 para «Consolidar a spec e explicar» e as tasks OpenSpec incluem validação antes de arquivar.

**Consequência:** a sessão pode terminar com alteração ativa, tasks por atualizar e handoff anterior à consolidação, apesar de o ciclo ter sido apresentado como completo. A necessidade de arquivar corretamente só foi vista na teoria.

**Correção concreta:** reservar dois minutos explícitos para confirmar evidência, atualizar tasks, validar e arquivar, ou declarar que os estudantes verificam um arquivo de referência em vez de o criar. Fazer o handoff final refletir esse estado. Se a revisão encontrar um defeito real, deixar estado incompleto documentado em vez de arquivar por pressão do relógio.

**Critério de aceitação:** a prática acaba com spec canónica e arquivo verificáveis, ou com uma pendência explícita de consolidação e razão para não arquivar. O guião tem duração e responsável para essa operação e concorda com as notas.

### M06 — P2 — As notas de arranque mantêm instruções contraditórias

**Slide:** 18. **Localização do problema:** notas do apresentador, não comandos visíveis principais.

**Evidência verificável:** o slide cria uma branch própria a partir de `origin/checkpoint/00-starter` e usa `npm run build && npm start`. As notas dizem que «o comando do slide serve para inspecionar o checkpoint», embora ele crie a branch de trabalho. Também mandam executar `npm install`, `npm test` e `npm run dev`, e mais adiante explicam corretamente que dev inicia apenas Vite e precisa do servidor Node separado. README e CHECKPOINTS usam instalação antecipada com `npm ci` e build/start.

**Consequência:** o docente pode improvisar dois modos de execução e consumir os quatro minutos a resolver uma API indisponível ou dependências. A branch criada também pode ser explicada incorretamente.

**Correção concreta:** uma instrução coerente nas notas: dependências instaladas antes da aula, branch do grupo a partir do remote checkpoint, teste, build e servidor Node. Manter dev como alternativa apenas no guia de preparação, com os dois processos explícitos.

**Critério de aceitação:** um formador segue o slide e as notas sem escolher entre instruções incompatíveis e obtém UI + API no mesmo endereço indicado pelo README.

### M07 — P2 — O retorno por falha pode ser lido como obrigação de corrigir sempre o código

**Slides:** 3 e 6, relacionado com 17. **Localização do problema:** simplificação do diagrama/texto visível; as notas já contêm a distinção correta.

**Evidência verificável:** o slide 3 afirma «Uma falha no teste regressa ao código». O slide 6 encaminha toda a falha para «reproduzir e corrigir» e daí para «Editar uma função». As notas de 6 reconhecem que a falha pode estar no código, no teste ou na decisão/spec. A seta geral do slide 3 só sai da revisão para análise, e a revisão/arquivo não mostra um retorno concreto para defeito técnico.

**Consequência:** um aluno pode inferir que teste vermelho significa sempre código errado ou que qualquer falha exige refazer toda a análise. Isso prejudica o diagnóstico que o próprio exemplo de falso positivo procura ensinar.

**Correção concreta:** usar «Falha: reproduzir e localizar a causa» e mostrar dois retornos: técnico para implementação/teste e negócio/contrato para decisão humana/spec. Não exigir um diagrama com todos os detalhes; bastam as duas categorias e as suas condições.

**Critério de aceitação:** perante três exemplos — bug de código, expectativa de teste incorreta e ambiguidade de negócio — um estudante consegue escolher o retorno correto sem consultar as notas e sem alterar silenciosamente a decisão aprovada.

## Ordem, tamanho e timing propostos

Recomendo 20 slides em vez de 22, mantendo rigorosamente 30 + 30 minutos. A redução é uma proposta editorial: fundir os atuais 5 e 15 num exemplo de rastreabilidade aprofundado quando o cenário OpenSpec for apresentado; fundir 6 e 12 num diagnóstico com teste falhado e falso positivo. O tempo libertado deve ir para demonstração e instruções operacionais, não para mais conceitos.

| Tempo | Conteúdo e evidência | Duração |
| --- | --- | --- |
| 00–02 | Objetivo, âmbito simulado e mapa das três peças | 2 min |
| 02–09 | Ciclo, facto/ambiguidade/decisão e mudança de regra | 7 min |
| 09–18 | Ciclo do agente, papéis, dependências, isolamento e diagnóstico com reprodução | 9 min |
| 18–21 | Contexto pequeno, contributo local e comparação com âmbitos diferentes | 3 min |
| 21–28 | OpenSpec: vigente/delta, artefactos, cenário ligado ao teste e apply limitado | 7 min |
| 28–30 | Validação/arquivo, handoff e escolha explícita do percurso gratuito de recurso | 2 min |
| 30–33 | Branch e baseline já preparados; confirmar UI/API | 3 min |
| 33–40 | Analisar, aprovar e criar/carregar artefactos OpenSpec | 7 min |
| 40–47 | Pequena implementação, integração e testes; recurso temporal explícito | 7 min |
| 47–52 | Revisão com entradas corretas e reprodução de um achado | 5 min |
| 52–54 | Tasks, validação e consolidação, ou pendência justificada | 2 min |
| 54–57 | Handoff e retoma numa sessão nova, confirmando estado | 3 min |
| 57–60 | Entrega curta e discussão de decisões/evidência | 3 min |

O percurso dos alunos deve usar os modelos sequencialmente na configuração de memória limitada. A demonstração de paralelismo pode continuar conceptual ou preparada, com ficheiros distintos ou worktrees e revisão antes de integrar. Não precisa de consumir dois modelos simultâneos durante a prática.

## Riscos residuais e limites do parecer

- O limite de contexto não é a soma de palavras do pedido. `WORKFLOW.md` já explica sistema, ferramentas, skills e saídas. O slide 11 pode ganhar uma frase operacional: reduzir a tarefa, conservar critérios, persistir estado e abrir sessão nova. Os tempos medidos de uma execução não predizem a latência de uma turma.
- A base local reduz dependência de quotas externas, mas depende de memória, modelos descarregados e chamadas a ferramentas ensaiadas. Convém que o slide de recurso mostre «quota cloud termina → continuar pelos ficheiros localmente», sem exigir ativação de conta, API, trial ou billing. Cloud gratuita permanece opcional e nunca é recuperação automática.
- Trocar de modelo não elimina erros correlacionados; Qwen 3 e 3.5 continuam da mesma família. O deck e os guias já o dizem. Uma nova sessão do mesmo modelo é uma segunda passagem, não revisão independente por outro modelo.
- O recorte trata autorização simulada. Não permite concluir que houve pagamento real ou passagem física do veículo. Esta fronteira está nos guias e deve ser dita oralmente antes da prática.
- O starter tem a função por implementar. Os seus testes iniciais não devem ser comparados com os 26 testes da referência como se fossem a mesma suite executada sobre o mesmo estado. O guia distingue-os; o formador deve mostrar o estado efetivo.
- Este parecer não é um benchmark de modelos, auditoria do software, verificação de licenças, revisão integral do caso UML ou teste de hardware de sala. Não avaliei a entrega dos estudantes nem medi a sessão completa. As prioridades refletem evidência documental, inspeção visual e controlos locais sem execução de modelos.

## Estado e próxima tarefa

Revisão concluída, sem alterações ao deck. Próxima tarefa recomendada: decidir o percurso base, corrigir a passagem análise → artefactos e a autorização do perfil, alinhar as entradas da revisão, depois ensaiar os 30 minutos práticos antes de alterar o conteúdo final da apresentação. Conservar as ressalvas sobre autoria, scopes diferentes, falsos positivos e validação documental.

---

## Suplemento — leitura autónoma dos slides

Este suplemento responde ao requisito explícito posterior: os slides têm de ser auto contidos; notas do docente e guias não compensam conteúdo essencial ausente. O parecer original fica preservado como registo do primeiro critério de avaliação. As ressalvas que antes estavam adequadamente documentadas nas notas passam agora a precisar de expressão visível quando condicionam a compreensão ou a execução.

**Conclusão revista:** os esquemas ajudam quem já sabe o que são OpenSpec e um agente, mas ainda não ensinam de forma autónoma como uma pessoa inicia o workflow, como entram commands e skills, qual o papel da configuração do agente e que operação efetivamente altera ficheiros. A correção exige uma pequena sequência explicativa, não apenas acrescentar nomes aos diagramas atuais. As virtudes originais de rigor e evidência mantêm-se, mas algumas só estão acessíveis ao docente e precisam de chegar ao slide.

### Verificações adicionais

Inspecionei novamente o conteúdo visível dos 22 slides e fiz inventário dos ficheiros com `rg --files`. Existem comandos em `.opencode/commands/`, skills em `.opencode/skills/<nome>/SKILL.md` e perfis em `.opencode/agents/`. Li como fontes de revisão, sem executar os seus workflows, `openspec-apply-change/SKILL.md`, `openspec-propose/SKILL.md`, `opsx-apply.md`, `opsx-propose.md`, `workshop-analyst.md` e o script de arranque.

Executei `openspec instructions apply --help` e `opencode run --help`. Estes controlos confirmam a interface da CLI instalada; não lançam agente nem provam uma implementação. Consultei as fontes primárias [Commands](https://opencode.ai/docs/commands/), [Agent Skills](https://opencode.ai/docs/skills/) e [Agents](https://opencode.ai/docs/agents/) do OpenCode, em 2 de novembro de 2026, para confirmar conceitos e locais de invocação. Não usei exemplos de fornecedores pagos.

Há uma distinção local verificável que deve orientar qualquer novo esquema: `.opencode/commands/opsx-apply.md` contém diretamente os passos de status, instructions, leitura e implementação. A skill `openspec-apply-change` também contém um workflow. Não encontrei no command uma obrigação de carregar essa skill pelo nome. A existência de ambos não prova a cadeia «command chama skill, que chama agente». O script `run-agent.mjs:24–27` lê diretamente um prompt e inicia `opencode run` com agente e modelo; também não demonstra carga de skill.

### S01 — P1 — A definição de OpenSpec não apresenta ainda o propósito e os limites necessários

**Slides:** 2 e 13–17. **Reclassificação:** o aspeto sólido original «OpenSpec com fronteiras adequadas» é válido para o conjunto slides + notas. Para leitura autónoma, a cobertura é insuficiente.

**Evidência visível:** o slide 2 resume OpenSpec a decisões, cenários e tarefas em ficheiros e a «estado partilhado». O slide 13 começa por duas pastas; o 14 já apresenta quatro artefactos e uma CLI. Falta uma definição inicial que articule problema, solução e intervenientes. O slide 17 diz «validar artefactos», mas a ressalva inequívoca de que isso não executa os cenários está nas notas. O aluno não vê que a CLI devolve estrutura/instruções e que a redação/implementação depende de pessoa ou agente.

**Consequência:** OpenSpec pode parecer um gerador de código, um motor autónomo de agentes ou apenas uma convenção de pastas. O benefício de conservar o contrato entre sessões e a diferença entre validar forma e executar comportamento não ficam suficientemente estabelecidos.

**Proposta concreta:** antes do inventário de pastas, um slide «O que é OpenSpec neste exercício», com uma definição curta: «OpenSpec organiza uma alteração em especificações e tarefas guardadas no repositório. A CLI fornece estrutura, estado e instruções. A pessoa aprova o contrato; um agente ou pessoa implementa-o e executa testes.» Usar o exemplo único «D1: 15:00 é aceite» para mostrar decisão → cenário → tarefa → evidência. Acrescentar visivelmente «validate verifica os artefactos; npm test executa os testes».

**Critério de leitura autónoma:** depois de ler esse slide e o mapa, um estudante explica o problema resolvido por OpenSpec, identifica os ficheiros persistidos e distingue aprovação, validação documental e execução de testes, sem consultar notas. Não atribui a OpenSpec um modelo ou edição automática.

### S02 — P1 — Commands, skills e perfis de agente estão ausentes da explicação visível

**Slides:** 8–10 e 14–16, com impacto em 19–20. **Tipo:** lacuna conceptual nova sob o requisito de autonomia.

**Evidência visível e local:** nenhum dos 22 slides define skill nem apresenta o respetivo ficheiro. Nenhum mostra os slash commands OpenCode. Os comandos visíveis de 14 e 16 são CLI, embora a integração também forneça `.opencode/commands/opsx-propose.md` e `opsx-apply.md`. Os papéis de 9 são rotulados por modelo, sem explicar `.opencode/agents/workshop-*.md`. No repositório, os três tipos existem e têm responsabilidades diferentes.

**Consequência:** o aluno pode chamar «agente» a um ficheiro de prompt, esperar que um command carregue automaticamente uma skill, ou supor que uma skill inicia um processo e concede ferramentas. Fica sem vocabulário para perceber por que o mesmo modelo pode atuar com papéis e permissões diferentes.

**Proposta concreta:** dois quadros pequenos, em slides adjacentes, com um exemplo real por conceito. A distinção seguinte deve aparecer visivelmente, sem transportar os ficheiros completos para o slide:

| Conceito | Responsabilidade | Exemplo real/local e entrada |
| --- | --- | --- |
| CLI | Processo que executa uma operação e devolve resultado | `openspec status --change validate-garage-exit --json`, no terminal do projeto |
| Slash command | Nome para um template de pedido ao agente | `/opsx-apply validate-garage-exit`, na caixa de entrada do OpenCode; definido em `.opencode/commands/opsx-apply.md` |
| Skill | Instruções reutilizáveis que o cliente pode disponibilizar ao agente | `.opencode/skills/openspec-apply-change/SKILL.md`; no OpenCode, carga sob pedido pela ferramenta `skill`, quando disponível e autorizada |
| Perfil de agente | Configuração de instruções, modelo, passos e permissões para uma sessão | `.opencode/agents/workshop-builder.md`; selecionado por `--agent workshop-builder` no arranque usado pelo script |

A frase de ligação deve dizer: «O command fornece um pedido. A skill fornece instruções quando é carregada. A sessão do agente usa o modelo e as ferramentas permitidas.» O command e a skill podem orientar o mesmo workflow sem um chamar necessariamente o outro. Não apresentar `allowed-tools` escrito num SKILL.md como prova de autorização efetiva do cliente; as permissões ativas continuam a precisar de verificação.

**Critério de leitura autónoma:** o estudante classifica quatro exemplos reais, diz onde são introduzidos/carregados e responde corretamente que criar um SKILL.md não inicia um agente nem altera código. Consegue identificar a configuração de papel sem a confundir com os pesos Qwen. A carga efetiva de uma skill só é anunciada como observada se existir um evento de ferramenta ou evidência equivalente.

### S03 — P1 — Falta o início concreto do fluxo e a fronteira entre obter instruções e editar

**Slides:** 8, 14, 16 e 19–20. **Reclassificação:** reforça M01/M03; as referências nas notas deixam de mitigar a ausência operacional visível.

**Evidência:** o slide 8 começa em «contexto selecionado», sem mostrar quem enviou o pedido e como entrou numa sessão. O slide 16 imprime `openspec instructions apply --change ...` e depois salta para «agente executa». O help instalado diz que o comando devolve instruções enriquecidas; o ficheiro `opsx-apply.md:23–68` separa status, instructions e leitura antes da implementação. Os slides 19–20 mostram `ORCA: prompts/01-analysis.md` e `ORCA: prompts/02-build.md`, que são referências a ficheiros, sem uma sintaxe universal de execução ou um local de entrada definido.

**Consequência:** o aluno não sabe se deve escrever o caminho no terminal, no ORCA ou no OpenCode. Pode esperar edição após executar apenas `instructions apply`, ou supor que a CLI é um agente. O loop interno correto do slide 8 não resolve a falta da cadeia exterior que o inicia.

**Proposta concreta:** um exemplo anotado com seis passos: pessoa envia pedido delimitado → cliente inicia sessão com perfil e modelo → modelo propõe chamada de ferramenta → cliente verifica permissão e executa → resultado volta ao modelo → pessoa observa diff/testes e aceita ou devolve. Distinguir com duas etiquetas as ações «devolve texto/JSON» e «pode alterar ficheiros». No slide prático, substituir a referência ambígua por um comando real com indicação «terminal do projeto dentro do ORCA», ou por uma instrução explícita de colar o pedido na sessão OpenCode. O roteiro proposto abaixo mostra o exemplo sem alegar nova execução.

**Critério de leitura autónoma:** um estudante inicia o pedido no local correto, sabe antecipar se a próxima operação só devolve instruções ou pode editar, identifica no registo a ferramenta efetiva e não declara conclusão apenas porque o processo arrancou. Um evento `edit`/patch ou diff é evidência de edição; texto a sugerir código não o é.

### S04 — P1 — O conteúdo visível mistura papéis com modelos e omite a modalidade sem ferramentas

**Slides:** 9, 11–12 e 19–21. **Reclassificação:** M03/M04 mantêm P1, agora também por insuficiência conceptual visível.

**Evidência:** o slide 9 rotula «Analista Qwen 3.5», «Implementador Qwen 3.5» e «Qwen 3 revisor saída em JSON». O leitor vê nomes de modelos e saídas, mas não vê perfil, cliente, permissões ou que JSON no percurso recomendado é uma resposta de modelo sem ferramentas. O slide 11 mostra a decisão integrada, sem a atribuição visível da aplicação manual/integração e da validação preparada separadamente. Os guias e script confirmam estas diferenças, mas só o docente lhes tem acesso durante a projeção.

**Consequência:** «modelo», «papel» e «agente» podem parecer equivalentes. A turma pode atribuir edição e execução de testes ao modelo que apenas respondeu por texto. Um mesmo modelo em duas sessões pode ainda ser confundido com dois modelos independentes.

**Proposta concreta:** no esquema de papéis, separar o nome do papel do modelo e acrescentar a modalidade, por exemplo «Revisor — Qwen 3 — pacote textual sem ferramentas; pessoa reproduz». No implementador reduzido: «Qwen gera decide; pessoa aplica e executa testes». Num pequeno exemplo de perfil, mostrar três linhas reais: `mode: primary`, `model: ollama/qwen3.5:4b-orca` e uma permissão de edição autorizada. Explicar que iniciar sessões é uma ação explícita, enquanto o perfil é configuração. O defeito de permissões M02 deve ser corrigido e ensaiado antes de mostrar esse perfil como funcional.

**Critério de leitura autónoma:** o estudante responde «quem gerou? quem aplicou? quem executou? quem decidiu?» para cada etapa, identifica o modelo efetivo e distingue outra sessão do mesmo modelo de outra revisão por pesos diferentes. Os contributos locais ficam visíveis sem depender da explicação do docente.

### S05 — P1 — Os retornos de diagnóstico precisam de ser corretos sem explicação oral

**Slides:** 3 e 6. **Reclassificação:** M07 passa de P2 para P1 sob o requisito de leitura autónoma.

**Evidência:** permanece visível «Uma falha no teste regressa ao código», e o único retorno local de 6 aponta para editar uma função. A distinção entre bug de implementação, teste incorreto e regra mal definida está só nas notas. Num deck auto contido, essas notas não corrigem a afirmação categórica que o estudante lê.

**Consequência:** o fluxo ensinado pode induzir a alterar código para satisfazer qualquer teste ou crítica, em vez de localizar primeiro a causa. Este erro entra em conflito com o bom exemplo do revisor que acusa um defeito inexistente.

**Proposta concreta:** tornar o diagnóstico uma decisão visível: «Falha reproduzida: onde está a contradição?» com dois retornos principais, «implementação/teste técnico → corrigir e repetir» e «contrato/negócio → pessoa decide e atualiza spec». Uma suspeita não reproduzida permanece registada como suspeita. Usar 900001 ms como exemplo único, ligando a explicação ao falso positivo do slide 12.

**Critério de leitura autónoma:** o aluno escolhe o retorno adequado para bug, expectativa de teste errada e ambiguidade, e explica por que o falso positivo não exige alteração do código. Nenhuma seta obriga a alterar uma decisão humana para obter testes verdes.

### Pequena sequência explicativa proposta, com exemplo único

Proponho cinco ecrãs consecutivos, total de oito minutos, antes da descrição detalhada dos artefactos. Podem resultar da reformulação de slides existentes e de duas ou três inserções; não fixo o número final de slides. O mesmo exemplo de autorização de saída deve atravessar os cinco:

1. **OpenSpec e o problema que resolve — 1,5 min.** Definição de S01, D1 e ficheiros que permitem retomar a alteração. Mostrar que o contrato sobrevive ao chat.
2. **Command, skill e perfil — 2 min.** Quadro de S02, com caminhos locais reais e local de entrada. Incluir a relação não automática command/skill.
3. **Execução de um pedido pelo agente — 2 min.** Pessoa, sessão OpenCode, perfil, Qwen em Ollama, tools, observação e próximo passo. ORCA enquadra a organização de terminais/worktrees, não substitui o ciclo do cliente.
4. **Um pedido concreto para D1 — 1,5 min.** A cadeia anotada abaixo, com ferramenta que lê estado e ferramenta que altera efetivamente um ficheiro. Não depender de uma demonstração ao vivo para que o leitor compreenda a sequência.
5. **Evidência e retorno — 1 min.** Saída real de teste, diff e decisão sobre aceitar/rever; separar falha técnica de dúvida de negócio e incluir o recurso sem ferramentas.

**Exemplo concreto para o quarto ecrã:** partir de uma alteração já aprovada e pronta em `checkpoint/01-spec-approved`. Esta pré-condição deve estar escrita; o exemplo não resolve automaticamente a lacuna de criação identificada em M01.

| Passo visível | Onde acontece | O que faz e o que se pode concluir |
| --- | --- | --- |
| Pessoa introduz `node scripts/run-agent.mjs builder` | Terminal do projeto, aberto/organizado no ORCA | O script lê `prompts/02-build.md` e inicia OpenCode com `--agent workshop-builder` e `--model ollama/qwen3.5:4b-orca`. O processo arrancar não prova sucesso. |
| OpenCode envia pedido e contexto ao modelo local | Sessão do cliente, com Ollama como fornecedor | O modelo propõe a próxima ação dentro do contexto disponível. O perfil define o papel e as permissões aplicáveis. |
| Chamada de `bash` com `openspec status ... --json` e `openspec instructions apply ... --json` | Ferramenta executada pelo cliente, se autorizada | A CLI devolve estado e contexto. Obter instructions não implementa código. |
| Chamada de `read` dos contextFiles | Ferramenta da sessão | O conteúdo efetivamente lido volta ao modelo. Uma skill pode ser carregada se for escolhida/disponível; não é um passo implícito demonstrado por este script. |
| Modelo propõe alteração; cliente executa ferramenta de edição autorizada | Ficheiro da regra e teste permitidos | É aqui que a implementação pode mudar no disco. Deve surgir um diff verificável. |
| `bash` executa `npm test` e `npm run build`; pessoa revê evidência | Ferramenta/terminal e revisão humana | Saída observada e diff permitem avaliar o recorte. A pessoa coordenadora atualiza tasks conforme trabalho totalmente concluído. |

**Estado de verificação deste exemplo:** o script, o mapeamento e as interfaces CLI foram inspecionados; o dry-run confirmou agente/modelo/prompt. Não executei esta cadeia completa, nem uma edição, nem os testes com o modelo. A sua utilização como percurso operacional depende de corrigir M02 e ensaiar M03. O slide proposto deve identificar o exemplo como fluxo explicado até haver registo de execução.

**Alternativa do slash command, a explicar sem a confundir com o exemplo:** numa sessão OpenCode com papel e âmbito adequados, `/opsx-apply validate-garage-exit` é introduzido na caixa de entrada do OpenCode. O nome corresponde ao ficheiro command local e o cliente fornece esse template ao agente. As permissões e a limitação explícita à tarefa continuam necessárias, pois o workflow normal percorre tarefas. A skill homónima existe, mas a sua carga não decorre automaticamente desse comando no material inspecionado. Não executei o slash command. Não deve ser apresentado como comando de shell nem como seleção automática do perfil `workshop-builder`.

**Recurso sem ferramentas:** `node scripts/local-packet.mjs builder`, introduzido no terminal do projeto, pede ao modelo apenas texto de uma função. A pessoa inspeciona e aplica a proposta e executa os testes. O comando existe e foi inspecionado; não foi novamente executado com modelo neste suplemento. Esta caixa de recurso deve fazer parte do slide, porque altera quem é responsável pela edição.

### Reorganização compatível com 60 minutos

A proposta de 20 slides no parecer inicial deixa de ser uma recomendação de tamanho. O novo critério favorece mais ecrãs curtos, cada um com uma explicação completa, e a fusão de exemplos repetidos. Não recomendo comprimir definições novas dentro de letras menores nos slides atuais.

| Primeiros 30 minutos | Conteúdo | Duração |
| --- | --- | --- |
| 00–02 | Objetivo e mapa do caso | 2 min |
| 02–08 | Ciclo, decisão humana e retornos | 6 min |
| 08–16 | Cinco ecrãs explicativos de OpenSpec e execução agêntica acima | 8 min |
| 16–19 | Papéis, dependências, isolamento e seleção de contexto | 3 min |
| 19–24 | Artefactos OpenSpec e cenário ligado ao teste | 5 min |
| 24–27 | Contributos realmente observados, âmbitos diferentes e falso positivo | 3 min |
| 27–30 | Apply limitado, arquivo e handoff com evidência | 3 min |

Os últimos 30 minutos mantêm a distribuição proposta no parecer original: 3 de baseline, 7 de análise/artefactos, 7 de implementação pequena, 5 de revisão, 2 de consolidação, 3 de handoff e 3 de fecho. As instruções visíveis de cada fase têm de indicar local de entrada, ação, pré-condição, responsável e evidência de saída. A disponibilidade de notas deixa de integrar o critério de conclusão.

### Resumo do suplemento

- **P1 novo:** definir visivelmente o que é OpenSpec, para que serve e onde termina a validação documental.
- **P1 novo:** explicar command, skill e perfil de agente com ficheiros e entradas reais, sem cadeia automática inventada.
- **P1 reforçado:** tornar explícito o início do pedido, a diferença CLI/slash command e a operação que efetivamente edita.
- **P1 reforçado:** separar papel, cliente, modelo e modo textual sem ferramentas; atribuir ações a quem as realiza.
- **M07 elevado a P1:** corrigir retornos visíveis de diagnóstico, pois as notas já não compensam a simplificação.

Suplemento concluído sem modificar outros ficheiros, executar modelos ou alterar o deck. Próxima tarefa para a síntese: incorporar estes requisitos de leitura autónoma na proposta de reestruturação e depois validar a sequência operacional em ensaio local.
