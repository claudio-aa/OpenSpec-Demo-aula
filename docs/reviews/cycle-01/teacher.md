# Parecer independente — docente de Análise de Sistemas

Data: 2026-11-02. Ciclo 01. Revisor 2, numa simulação do ponto de vista de um docente de uma unidade curricular de Análise de Sistemas do 3.º ano de Informática. Este parecer não constitui validação curricular institucional nem pressupõe um programa de uma instituição concreta.

## Objeto, método e conclusão

Foi revista a apresentação `presentation/output/workshop-agentes-openspec-reestruturado.pptx`, com 22 slides, respetivo texto e notas extraídos do ZIP/XML, e os 22 renders `presentation/.build/slide-01.png` a `slide-22.png`. O texto e notas foram também consultados em `presentation/slides.json`. Foram lidos primeiro README e AGENTS, depois o enunciado DOCX, `docs/BRIEF.md`, `docs/WORKSHOP.md`, `docs/CONTRIBUTIONS.md`, `docs/CHECKPOINTS.md`, prompts 01 a 03, a spec vigente e design/tasks arquivados. Para confirmar o ponto de partida, consultaram-se, sem checkout nem alteração, a árvore OpenSpec, o prompt 01 e a regra do `checkpoint/00-starter`. Não foram consultados os pareceres dos outros revisores.

A apresentação tem uma boa base para ensinar controlo humano de trabalho com agentes: conserva o mesmo exemplo, evidencia rastreabilidade e mostra uma crítica de modelo refutada por execução. Os renders são legíveis, com bom contraste, hierarquia consistente e esquemas fáceis de seguir. O problema principal é pedagógico e operacional: o percurso literal de análise não produz os artefactos que a implementação exige. Além disso, a Análise de Sistemas fica reduzida sobretudo à fronteira temporal de uma função, enquanto o processo, os stakeholders e a separação entre requisito e solução quase desaparecem da experiência visível do aluno.

Recomendo corrigir o P0 e os P1 antes de apresentar o workshop como percurso autónomo de 60 minutos. A soma dos intervalos é efetivamente 30 minutos de introdução mais 30 de prática; esta correção aritmética não demonstra viabilidade em sala. Os materiais reconhecem que falta ensaiar a sessão completa. Não considero necessário aumentar a duração: é preferível reduzir repetições e o número de operações que cada grupo executa.

Prioridades: **P0** impede o objetivo/percurso ou transmite uma ideia central incorreta; **P1** prejudica significativamente a compreensão ou viabilidade; **P2** é uma melhoria útil. As alterações abaixo são propostas do revisor, não decisões já aprovadas para o workshop.

## Achados e alterações propostas

### T01 — A análise termina em texto, mas a implementação começa por exigir artefactos inexistentes — P0

**Slides:** 14, 16, 19 e 20.

**Evidência:** o slide 19 manda usar `prompts/01-analysis.md`. Esse prompt pede uma resposta até 250 palavras, factos, ambiguidades e cenários propostos; não pede escrita de `proposal.md`, spec, design ou tasks. A árvore OpenSpec do starter contém apenas config e `.gitkeep`. O slide 20 usa `prompts/02-build.md`, que exige uma alteração ativa pronta e manda parar se estiver bloqueada. O slide 14 mostra `openspec new change`, mas isso não equivale a preencher os quatro artefactos. As notas do slide 19 mencionam genericamente instruções CLI e oferecem `/opsx-propose` em OpenCode; não há uma operação ORCA inequívoca que faça a passagem entre a resposta analítica, a aprovação e os ficheiros.

**Consequência:** um par que cumpra literalmente a rota projetada pode chegar ao minuto 40 com uma resposta no chat e sem contrato executável pelo próximo agente. O objetivo de usar OpenSpec acaba dependente de uma intervenção adicional do formador ou de saltar para a referência.

**Alteração concreta:** escolher uma rota base e torná-la explícita: após a aprovação humana, o coordenador pede a criação/preenchimento dos quatro artefactos da alteração, lê a spec e confirma estado pronto antes de apply. Indicar os ficheiros autorizados e um critério de conclusão. Em alternativa, distribuir artefactos parcialmente preparados no starter e pedir aos alunos que completem apenas a decisão e cenários. O checkpoint 01 deve ser recuperação, e não um salto implícito que disfarça esta produção.

**Aceitação verificável:** um ensaio a partir de um clone do starter, seguindo só slide 19, prompt e instruções nele referidas, chega a uma alteração ativa com os ficheiros exigidos, D1 aprovada e estado apto para apply. O implementador não precisa de inferir nem inventar a spec. Se o formador fizer a transição numa demonstração, essa responsabilidade e o respetivo tempo ficam escritos.

### T02 — Falta o processo que justifica a regra e os seus responsáveis — P1

**Slides:** 1–4 e 19–22.

**Evidência:** o enunciado pede reengenharia de processos e diagramas de atividades UML. O BRIEF propõe representar processo atual e proposta e pede responsável, decisão de pagamento, decisão temporal e exceção. A apresentação mostra esquemas do workflow de desenvolvimento, mas nenhum diagrama do processo de estacionamento. “Pessoa” não identifica o papel de negócio que pode decidir. Não há nos slides práticos uma entrega de processo ou sequer uma análise de impacto no condutor e na empresa municipal.

**Consequência:** o caso corre o risco de funcionar só como decoração para um exercício de programação. O aluno pode confundir a equipa que programa com os stakeholders que legitimam a regra, e interpretar autorização como saída efetiva ou informação de ocupação.

**Alteração concreta:** incluir um microdiagrama de atividades do recorte, distinguindo o processo descrito na fonte da proposta do simulador. Mostrar condutor e sistema/operador do processo e explicitar que o docente ou aluno representa, na simulação, o responsável autorizado a aprovar a regra. Assinalar pagamento não confirmado e janela ultrapassada sem inventar nova cobrança. A proposta avalia autorização; a passagem física e a ocupação ficam fora. Não é necessário modelar toda a cidade nem implementar BPR completa.

**Aceitação verificável:** um aluno aponta no esquema o facto da fonte, a alteração proposta, quem decide D1, o ponto de decisão e uma exceção; explica em uma frase por que autorização não confirma saída física. A tarefa final pede pelo menos uma anotação ao processo e não só o código.

### T03 — Objetivos e critérios de aprendizagem não estão disponíveis ao aluno no início — P1

**Slides:** 1, 2 e 22.

**Evidência:** a nota do slide 1 enuncia um objetivo geral. O slide 2 apresenta peças e o slide 22 quatro perguntas relevantes, mas não há objetivos observáveis nem critérios de qualidade projetados. Nas notas finais pede-se entrega mínima, mas o aluno só a conhece no fecho se depender da projeção.

**Consequência:** operar ferramentas e obter testes verdes pode parecer o objetivo. A avaliação fica dependente de impressões do docente e da capacidade de cada máquina, em vez de evidência de análise.

**Alteração concreta:** anunciar no início uma entrega curta com quatro evidências: distinguir facto/proposta/decisão; justificar uma decisão por um cenário completo; ligar esse cenário a um teste observado; registar um achado reproduzido ou os limites da revisão e uma retoma por ficheiros. Acrescentar os critérios ao slide de prática, sem multiplicar documentos.

**Aceitação verificável:** antes do minuto 3, o aluno sabe o que entrega e como o docente o aprecia. O fecho retoma exatamente os mesmos critérios. Um grupo que recuperou por checkpoint pode demonstrar os resultados analíticos sem fingir autoria de código.

### T04 — O exemplo de cenário omite uma condição essencial e parece autorizar só pelo tempo — P1

**Slides:** 5 e, principalmente, 15.

**Evidência:** o slide 15 apresenta “WHEN passaram 15 minutos / THEN allowed: true, VALID”. A spec real exige pagamento confirmado e tempo não negativo. O slide 5 e os testes de fronteira projetados também abreviam a decisão a uma duração. O requisito completo existe no repositório, mas não no excerto em que se ensina a escrever um cenário.

**Consequência:** ensina-se um cenário subespecificado precisamente na demonstração de qualidade da especificação. Um aluno pode inferir que bilhete não pago se torna válido ao fim de 15 minutos, ou não perceber quais as pré-condições da função reduzida.

**Alteração concreta:** projetar “pagamento confirmado, dados válidos e tentativa exatamente 900 000 ms após o pagamento” antes do resultado. Incluir um cenário contrastante sem pagamento, ou uma pequena tabela com pagamento e duração. Explicitar “entradas já validadas” quando se tratar apenas de `decide`.

**Aceitação verificável:** o excerto não admite o mesmo resultado com `paid: false`. O aluno prevê corretamente `VALID` no limite pago, `EXPIRED` a 900 001 ms pago e `UNPAID` com dados válidos sem pagamento.

### T05 — A decisão de referência aparece antes da elicitação e os decisores variam entre materiais — P1

**Slides:** 4, 5, 9, 15 e 19.

**Evidência:** o slide 4 já revela D1 inclusiva ao minuto 4; os seguintes repetem a solução. No slide 19 pede-se “Regista o limite inclusivo” em vez de propor alternativas e decidir. O WORKSHOP diz para perguntar antes de mostrar a solução. O BRIEF diz que o docente representa o responsável pelo processo; as notas do slide 19 dizem que a aprovação é do aluno. Nenhuma dessas simulações é errada por si, mas a autoridade fica indefinida.

**Consequência:** a atividade pode avaliar cópia de uma decisão já dada, e não reconhecimento de ambiguidade. Dizer “decisão humana” não basta para ensinar quem tem legitimidade para a tomar.

**Alteração concreta:** pedir primeiro uma previsão individual para 14:59, 15:00 e 15:01 e recolher duas interpretações. Revelar só depois a decisão de referência, rotulada como opção didática aprovada para este exercício. Fixar um papel: o docente valida a regra de referência; um aluno representa esse papel em cada par e justifica/assina o registo. Se forem aceites decisões diferentes, fornecer critérios e testes compatíveis em vez de impor silenciosamente o checkpoint inclusivo.

**Aceitação verificável:** antes da revelação há uma resposta do aluno; o registo final identifica facto, alternativa, escolha, papel que a aprovou e impacto no caso de fronteira. A regra de 10 minutos do slide 7 continua claramente uma hipótese futura.

### T06 — A distinção requisito/design fica reduzida a nomes de ficheiros — P1

**Slides:** 4, 11, 14 e 20.

**Evidência:** o slide 14 separa “cenários de aceitação” de “escolhas técnicas”, o que é útil. As notas, porém, agrupam timestamps, validação e função pura no design. O BRIEF identifica D4/D5 como escolhas didáticas e a spec contém decisões de contrato detalhadas de ISO/timezone/HTTP. O aluno não é levado a classificar o prazo, o formato de entrada e a escolha de uma função pura.

**Consequência:** o aluno pode tratar uma decisão técnica como facto de negócio, ou pensar que tudo o que está em `design.md` dispensa validação com o responsável adequado. Pode também atribuir à fonte as condições do contrato do simulador.

**Alteração concreta:** usar três exemplos concretos: “15 minutos após pagar” é regra proveniente da fonte, inclusividade é decisão humana do exercício, ISO com timezone é contrato escolhido para o simulador e função pura é opção de desenho. Classificar explicitamente cada uma quanto à origem e à pessoa que a aprova. Não apresentar o milissegundo como exigência original do município.

**Aceitação verificável:** perante esses exemplos, o aluno distingue regra de negócio, contrato de interface e implementação e consegue indicar o respetivo registo. D1–D6 não aparecem como requisitos transcritos do enunciado.

### T07 — Verificação documental, verificação do programa e validação com o processo precisam de uma distinção visível — P1

**Slides:** 3, 6, 15 e 17.

**Evidência:** o slide 17 já separa validar artefactos de código aceite, mas a explicação do limite da CLI está nas notas dos slides 15/17. O slide 3 afirma que uma falha de teste regressa ao código; a nota do slide 6 admite corretamente que também pode haver um teste incorreto ou uma decisão mal especificada. A aprovação do responsável não tem uma etapa de validação observável.

**Consequência:** a turma pode sair com a ideia de que `openspec validate` confirma os requisitos ou de que testes verdes validam o processo. A reação automática a uma falha pode ser alterar o código sem examinar a expectativa.

**Alteração concreta:** projetar uma comparação curta: revisão com o responsável verifica adequação da decisão ao processo; CLI verifica estrutura documental; testes e revisão verificam implementação face ao contrato. Trocar o rodapé do slide 3 por “Uma falha exige verificar código, teste e expectativa; dúvida de negócio regressa ao responsável”. Usar o falso positivo do slide 12 para uma previsão antes de revelar a execução.

**Aceitação verificável:** o aluno responde corretamente a “a CLI passou e todos os testes passaram: isso prova que o município queria limite inclusivo?” e identifica a evidência adicional necessária. Não se apresenta arquivo como selo automático de correção.

### T08 — O ritmo depende de operações e recuperações pouco delimitadas — P1

**Slides:** 18–21.

**Evidência:** em seis minutos o par lê, analisa, aprova e deveria produzir quatro artefactos. Em oito minutos implementa a função completa e valida entradas, escreve testes, lê diff e demonstra interface. A referência do slide 11 levou 64,6 s numa só geração e falhou. Em nove minutos o slide 21 pede revisão, reprodução, troca de condutor, handoff e nova sessão/modelo. Há fallback nas notas, mas não um limite temporal projetado nem recuperação concreta no slide. O CONTRIBUTIONS declara que falta ensaio completo.

**Consequência:** o tempo de espera pode consumir a discussão de análise e a reprodução dos achados. Grupos mais lentos chegam ao fecho sem evidência e a troca de modelo torna-se um objetivo em si.

**Alteração concreta:** assumir uma edição pequena sobre contrato preparado, um único modelo local na base e outra sessão para a revisão. Dar um limite por fase: se no minuto 39 faltarem artefactos prontos, usar a referência 01; se no minuto 45 não houver diff testável, usar 02. Mostrar como preservar a branch do grupo e abrir uma retoma sem eliminar trabalho. A troca para outro modelo instalado pode ser demonstrada pelo formador. Dedicar o tempo poupado ao processo e à avaliação.

**Aceitação verificável:** ensaiar os 60 minutos na máquina menos potente prevista, com falha de modelo simulada. Cada par conserva o seu trabalho, atinge a análise/cenário/teste/revisão/handoff e o primeiro bloco termina aos 30. Registar tempos e pontos em que foi necessário recuperar; não inferir viabilidade das medições de uma chamada isolada.

### T09 — O ponto de partida tem instruções contraditórias nas notas — P1

**Slide:** 18.

**Evidência:** o slide cria corretamente uma branch do grupo e usa build mais `npm start`. As notas dizem depois que o comando serve para inspecionar o checkpoint, mandam executar `npm install` e `npm run dev`, e só no fim esclarecem que este último exige outro servidor. README e CHECKPOINTS preparam dependências antes e usam a aplicação compilada. O starter contém `NOT_IMPLEMENTED` na regra e só testes de infraestrutura; não contém o teste de negócio `test/exit-decision.test.js`.

**Consequência:** o docente pode iniciar um segundo percurso técnico, perder os quatro minutos ou interpretar testes iniciais verdes como prova de que a regra já está implementada.

**Alteração concreta:** manter uma única sequência base, a projetada, e remover das notas o percurso concorrente. Dizer o resultado esperado: servidor e UI acessíveis, testes de infraestrutura passam, regra de negócio por implementar. Indicar URL e separar no texto o terminal do servidor do terminal dos restantes comandos.

**Aceitação verificável:** num clone preparado, seguir slide e notas conduz à mesma aplicação em quatro minutos, sem instalação em aula. O par explica por que testes iniciais verdes não provam a autorização de saída. Não alterar a branch de referência.

### T10 — A avaliação final não escala e ainda não distingue contribuição de evidência — P1

**Slides:** 21 e 22.

**Evidência:** as notas do slide 22 pedem a cada par uma resposta de 30 segundos num fecho de três minutos. Isso permite, no máximo, seis pares sem transições, perguntas ou feedback; o tamanho da turma não está especificado. As perguntas são boas, mas uma resposta a apenas uma delas não demonstra toda a cadeia. O guião permite avaliar por checkpoint, mas não indica o que o par analisou, aprovou, executou ou apenas recebeu pronto.

**Consequência:** nem todos serão observados numa turma maior e os mais rápidos podem dominar a demonstração. Uma branch completa pode esconder ausência de compreensão ou autoria indevidamente atribuída ao modelo/aluno.

**Alteração concreta:** recolher uma ficha curta de todos os pares e ouvir uma amostra de dois, com feedback. Distinguir “artefacto de referência”, “alterado pelo grupo”, “gerado pelo modelo” e “verificado pelo grupo”. Recolher uma resposta individual curta antes da conversa do par. Adotar a grelha formativa proposta abaixo.

**Aceitação verificável:** qualquer número de pares consegue entregar a evidência no tempo, e a amostragem oral não substitui a recolha de todos. Um grupo que usou checkpoint é avaliado pela análise e verificações que efetivamente demonstra.

### T11 — Os limites do simulador e o percurso sem custos não estão projetados — P1

**Slides:** 1, 2, 8 e 18–21.

**Evidência:** o README garante a base local sem cartão/subscrição. O BRIEF e AGENTS excluem controlo físico e pagamentos reais. O texto visível dos 22 slides não enuncia estes limites; várias cautelas aparecem nas notas ou guias. O slide 21 projeta “trocar de modelo”, embora a alternativa com o mesmo modelo esteja apenas nas notas.

**Consequência:** o aluno pode interpretar a simulação como solução de acesso/ocupação real ou julgar necessária uma segunda conta/modelo/serviço. O contrato de participação num workshop de orçamento zero fica dependente de informação fora da projeção.

**Alteração concreta:** tornar visível logo na abertura/prática: “Simulador: não cobra, não abre cancelas nem confirma saída física. Percurso base: modelos locais já preparados; sem API paga, cartão ou subscrição. Falha do modelo: checkpoint.” No slide 21 pedir “nova sessão; outro modelo local instalado é opcional”. Não ocupar a aula com novos serviços ou instalações.

**Aceitação verificável:** todos os passos obrigatórios funcionam com os recursos já locais; não exigem cartão, trial ou ativação de billing. O aluno identifica três limites do simulador e sabe que pode concluir com o mesmo modelo numa sessão nova. Este parecer não auditou licenças nem preços externos das ferramentas.

### T12 — Papéis propostos e contributos demonstrados devem ter estatutos explícitos — P2

**Slides:** 9, 11 e 12.

**Evidência:** o slide 9 associa analista e implementador a Qwen 3.5 e revisor a Qwen 3. O CONTRIBUTIONS atribui a preparação principal, validação e testes aos assistentes cloud e documenta apenas tarefas locais menores. As notas dos slides 11/12 fazem a distinção com rigor, mas o slide de papéis pode ser lido como relato de uma cadeia inteira executada nesses modelos. O slide 11 já declara que os âmbitos diferem, o que é uma boa salvaguarda.

**Consequência:** perde-se uma oportunidade de aplicar aos próprios resultados a distinção entre proposta, observação e conclusão. Os alunos podem sobrestimar a autonomia demonstrada ou converter as durações numa comparação de produtividade equivalente.

**Alteração concreta:** rotular slide 9 como atribuição de papéis proposta para a aula, e slides 11/12 como observações de ensaios específicos. Acrescentar, de forma breve, que a app e os testes de referência foram preparados e que o modelo local gerou a pequena função e executou verificações em sessões distintas. Manter o aviso de tarefas diferentes junto ao gráfico.

**Aceitação verificável:** perante o slide, o aluno distingue executar testes existentes de os escrever e distingue uma revisão textual de uma revisão que usou ferramentas. Não se conclui aceleração de tarefas equivalentes a partir de 64,6 s versus 6,35 s.

## O que manteria

- O único caso ao longo da sessão e a decisão D1 como fio de rastreabilidade, com o vizinho 900 001 ms.
- Os slides 5, 7 e 12: origem da expectativa, impacto de mudança e necessidade de reproduzir críticas. A hipótese de 10 minutos está corretamente identificada como não aplicada.
- A responsabilidade humana pela aprovação e a separação entre implementador e revisor, que não edita o código avaliado.
- A distinção entre estado vigente, alteração e arquivo, e os quatro tipos de artefacto OpenSpec, simplificando a execução exigida aos alunos.
- A explicação de ORCA/OpenCode/Ollama no slide 8 e o handoff como memória persistente, sem exigir dois modelos para concluir.
- Os checkpoints como recuperação pedagógica e o aviso de âmbitos diferentes junto ao gráfico de tokens.
- A legibilidade dos 22 renders: não encontrei um bloqueio de leitura por sobreposição ou corte. O investimento prioritário deve ir para conteúdo e alinhamento, conservando a linguagem visual consistente.

## Resultados de aprendizagem e avaliação formativa sugeridos

Proposta de resultados observáveis para esta sessão, sem os apresentar como programa institucional:

| Resultado no fim dos 60 minutos | Evidência mínima | Qualidade observável |
| --- | --- | --- |
| Distinguir fonte, proposta e decisão | Registo de D1 e uma anotação ao microprocesso | Identifica a regra original, uma alternativa, o papel que aprovou e o limite do simulador |
| Especificar uma regra sem omitir condições | Cenário pago no limite e cenário contrastante | Condições, duração/unidade e resultado completos; sem criar cobranças ou hardware |
| Demonstrar rastreabilidade e verificação | Caminho do requisito, nome do teste e saída observada | Expectativa deriva da decisão; identifica o que CLI/testes não provam |
| Rever e passar contexto com honestidade | Achado reproduzido ou lista do que foi verificado; handoff curto | Separa suspeita de defeito, indica modelo/sessão, referência usada e próximo passo |

Usaria uma grelha de quatro critérios com estados “ainda não demonstrado”, “parcial” e “demonstrado”, sem nota sumativa presumida. O docente devolve um comentário sobre a maior lacuna. Testes verdes isolados, quantidade de código e marca/modelo não são critérios de mérito.

Momentos de recolha: previsão individual antes de revelar D1; verificação cruzada entre os dois alunos antes de apply; previsão antes de executar o caso da crítica do revisor; ficha de saída de todos os pares e duas demonstrações amostradas. A ficha final cabe em seis linhas: facto/decisão/aprovador; cenário; spec e teste; saída observada; revisão e limite; modelo, checkpoint e próximo passo. O handoff pode fornecer as últimas linhas, evitando duplicação.

## Sequência e tempos recomendados

Não manteria obrigatoriamente os três blocos simétricos de cinco slides. A simetria visual é menos importante do que resolver a tarefa de análise e deixar o percurso pronto. É possível conservar 22 slides redistribuindo-os e substituindo redundâncias; a contagem, por si, não é critério de qualidade.

| Minutos | Foco e alteração à sequência atual | Evidência/limite |
| --- | --- | --- |
| 00–03 | Abertura, resultados e entrega; limites do simulador e base local | Todos sabem o que irão justificar |
| 03–07 | Contexto do caso e microprocesso atual/proposto, recuperando tempo de esquemas repetidos | Stakeholder, âmbito, decisão e exceção |
| 07–11 | Ambiguidade, previsão e aprovação de D1, antes da resposta projetada | Facto, alternativa e decisão registados |
| 11–14 | Rastreabilidade e requisito/contrato/design | Um cenário completo ligado a um teste |
| 14–18 | Ciclo do agente, ferramentas, papéis e dependências | Base sequencial; paralelismo só como explicação curta |
| 18–20 | Crítica falsa, previsão e reprodução | Suspeita separada de defeito |
| 20–24 | OpenSpec e quatro artefactos com o mesmo exemplo | Mostrar ficheiros reais, sem instalação |
| 24–27 | Apply, verificação documental/comportamental e arquivo | Duas verificações e aprovação humana |
| 27–30 | Demonstração curta da transição análise → artefactos e diagnóstico de prontidão | Confirmar que cada par conhece a rota e o fallback |
| 30–33 | Branch e starter já preparado | UI/infraestrutura funcionam; regra por implementar |
| 33–40 | Análise do recorte e completar/rever contrato preparado | Aprovação e estado pronto; recuperação aos 39 se necessário |
| 40–47 | Pequena implementação e teste de fronteira | Diff limitado; referência aos 45 se não houver resultado testável |
| 47–52 | Testes/build, revisão e reprodução | Saída real e limites da revisão |
| 52–56 | Handoff e retoma numa sessão nova | Próximo passo verificado; outro modelo opcional |
| 56–60 | Ficha de saída de todos e duas respostas orais com feedback | Evidência recolhida dentro do tempo |

Total: introdução/demonstrações 30 minutos; prática guiada e avaliação 30 minutos. O arquivo completo pode ser demonstrado pelo formador no bloco teórico; se também for obrigatório por grupo, é necessário reservar-lhe tempo prático explícito ou retirar outra operação. Não o somaria silenciosamente ao fecho. A proposta depende de ambiente previamente ensaiado e de uma alteração pequena/preparada, não de produzir de raiz uma aplicação completa.

## Limites do parecer e próximo passo

Este é um parecer documental e visual, não uma observação de aula. Não foram medidos tempos com alunos, não se conhece o número de pares nem os conhecimentos prévios, e não foi verificado o funcionamento atual das ferramentas em máquinas da turma. Não foi feita auditoria do código ou dos serviços externos. Os 26 testes referidos nos materiais são evidência reportada nesses materiais, não uma execução realizada nesta revisão. Não executei `npm test` nem `npm run build`, pois não houve alteração funcional nem se pretende certificar o comportamento do simulador neste parecer.

Só foi criado este relatório; não se alteraram PPTX, fontes, código, guias, HANDOFF ou branches. Próxima tarefa proposta: corrigir a transição T01, incorporar o contexto/critério de aprendizagem e ensaiar o percurso completo com uma dupla e uma falha de modelo simulada. Registar o tempo real e o que a dupla consegue explicar; só depois fechar o ritmo definitivo.

---

## Suplemento independente — slides auto contidos

Novo critério explícito recebido após o parecer inicial: os slides devem ensinar por si os conceitos, as distinções e a sequência operacional; as notas do docente têm pouca relevância e não podem conter passos essenciais em falta na projeção. Mantém-se integralmente o parecer acima. Este suplemento aplica o critério mais exigente ao mesmo deck; não é uma revisão dos pareceres de outros membros do painel.

Além dos conteúdos já inspecionados, foram consultados como evidência local os commands `opsx-propose.md`/`opsx-apply.md`, o início da skill `openspec-propose/SKILL.md` e os perfis `workshop-analyst.md`, `workshop-builder.md` e `workshop-reviewer.md` em `.opencode/`. Foram lidos para compreender os materiais instalados; não foram invocados os workflows que descrevem. A existência destes ficheiros no repositório não conta como ensino visível no slide.

**Conclusão suplementar:** a apresentação explica partes do ciclo, mas ainda não funciona como material auto contido para um aluno que não conhece OpenSpec nem a relação entre command, skill, agente, modelo e ferramenta. Há continuidade temática, mas faltam definições e ligações operacionais que o docente teria de fornecer oralmente. Sob o novo critério, apontar para um prompt ou guia não basta para completar essas ligações. Os quatro pontos seguintes acrescentam dimensões distintas; onde aprofundam um achado anterior, a relação está explicitada para evitar dupla contagem.

### S01 — OpenSpec surge como pastas e artefactos antes de se explicar o problema que resolve — P1 adicional

**Slides:** 2 e 13–17.

**Evidência visível:** no slide 2, OpenSpec é apresentado como “decisões, cenários e tarefas em ficheiros” e “estado partilhado”. No slide 13, a explicação passa para `openspec/specs/` e `openspec/changes/<id>/`; no 14, para quatro ficheiros. Há uma explicação útil de organização, mas nenhuma definição inicial reúne propósito, modo de utilização e limites. O aluno ainda tem de inferir por que precisa desta ferramenta, quem lê/escreve os ficheiros, o que a CLI faz e como isso difere de um modelo ou do Git.

**Consequência pedagógica:** pode memorizar uma árvore de diretórios sem compreender que se procura manter a intenção aprovada ligada à alteração e à evidência, inclusive entre sessões/agentes. Pode pensar que OpenSpec gera ou executa autonomamente a solução, ou que é simplesmente outro nome para o conjunto dos ficheiros do projeto.

**Alteração concreta:** antes da árvore, acrescentar uma definição visível, por exemplo: “OpenSpec organiza especificações e propostas de alteração em ficheiros. A CLI orienta os artefactos e verifica a sua estrutura; o agente ajuda a redigi-los e a implementar; a pessoa aprova o significado da regra.” Ligar essa definição ao problema do caso: uma nova sessão precisa de saber se 15:00 é aceite e de onde veio essa escolha. Mostrar então a correspondência intenção aprovada → cenário → tarefa → verificação. Definir também “spec vigente” e “delta” em linguagem corrente, antes de usar os caminhos. Indicar de forma breve que Git guarda versões e que Ollama executa o modelo, sem atribuir essas funções a OpenSpec.

**Aceitação por leitura autónoma:** só com os slides visíveis, um leitor responde: para que se usa OpenSpec neste exercício; que informação conserva; o que fazem pessoa, agente e CLI; o que a validação estrutural não prova. Consegue explicar por que copiar apenas o chat não substitui a spec e por que uma spec continua a precisar de aprovação e testes.

### S02 — Falta ensinar a relação entre commands, skills, agentes, modelos e ferramentas — P1 adicional

**Slides:** 8, 9, 14, 16 e 19–21.

**Evidência visível:** o slide 8 mostra contexto, modelo, OpenCode, ferramenta e observação; é uma boa explicação parcial do loop. O slide 9 mostra papéis e modelos. Os slides 14/16 mostram comandos de terminal e 19/20 apenas caminhos de prompts precedidos de “ORCA:”. A palavra skill e a distinção command/skill não são ensinadas no conteúdo visível. Os slash commands estão nas notas, enquanto os ficheiros locais contêm commands, skills e perfis de agente com configurações diferentes.

**Consequência pedagógica:** o aluno pode confundir uma instrução reutilizável com uma ferramenta executável, assumir que um slash command é um comando de shell ou pensar que mudar o nome do papel implica mudar de modelo. Também não fica claro que pedir uma ação não concede automaticamente as permissões necessárias para a executar.

**Alteração concreta:** ensinar a distinção com exemplos da instalação do workshop, sem universalizar os detalhes para todos os clientes:

| Elemento | Explicação visível proposta | Exemplo e relação |
| --- | --- | --- |
| Pedido | Objetivo e limites que a pessoa entrega | “Analisa a autorização de saída; não implementes” |
| Command do cliente | Entrada que inicia um workflow de instruções | `/opsx-propose validate-garage-exit` na conversa OpenCode, se esta rota for a escolhida |
| Skill | Instruções reutilizáveis para executar um tipo de trabalho | `openspec-propose`, disponibilizada ao cliente/agente; nesta instalação tem workflow semelhante ao command de proposta, sem precisar de invocar ambos |
| Agente/perfil | Papel com instruções, modelo e permissões definidos | Analista lê e propõe; implementador edita os ficheiros autorizados; revisor não edita |
| Modelo | Componente que interpreta contexto e propõe texto/ações | Qwen executado localmente por Ollama; o papel não exige por definição um modelo diferente |
| Ferramenta | Operação executada pelo cliente dentro das permissões | `read`, `edit` ou `bash`; a ferramenta devolve conteúdo, resultado ou erro |
| CLI | Programa chamado no terminal ou por uma ferramenta | `openspec status ...` devolve estado; não é um slash command nem um perfil de agente |

Usar um pequeno excerto legível do perfil analista, com “edit: deny” e “bash: deny”, para tornar concreta a diferença entre instruções e capacidade permitida. O aluno não precisa de decorar a configuração completa. A relação command/skill deve ser apresentada como a configuração desta integração: o deck não deve afirmar que todo o command chama obrigatoriamente uma skill, nem que todas as skills são comandos de terminal.

**Aceitação por leitura autónoma:** o leitor classifica `/opsx-propose`, `openspec status`, `workshop-analyst`, Qwen, `read` e uma skill; identifica onde cada um é usado; explica quem executa a ação e quem impõe permissões. Sabe que o command de proposta inicia planeamento, enquanto a execução de uma tarefa necessita do passo de implementação e dos limites adequados.

### S03 — O fluxo pedido → aprovação → artefactos → ação → evidência precisa de um exemplo contínuo — P0, aprofundamento de T01

**Slides:** 3–6, 8, 14–16 e 19–21.

**Evidência visível e local:** os slides apresentam partes do fluxo em vários esquemas, mas não mostram uma execução completa em que se vejam pedido, agente escolhido, instruções usadas, ação, observação e decisão de continuar/parar. O slide 19 remete para um prompt, e o 20 pressupõe a spec aprovada. A consulta adicional confirma que o perfil analista proíbe edição e bash; portanto, não basta esperar que esse mesmo analista transforme a resposta em quatro ficheiros OpenSpec por iniciativa própria. O perfil implementador delimita a edição aos ficheiros da regra e testes, pelo que também não deve ser apresentado como autor implícito dos artefactos de planeamento.

**Consequência pedagógica:** o leitor pode compreender as caixas isoladas e ainda assim não saber executar o workflow. O salto já identificado em T01 não é resolvido por explicar oralmente que “o agente cria a spec”: é necessário identificar qual sessão/perfil pode fazê-lo, o que recebe e quando a pessoa aprova.

**Alteração concreta:** substituir parte das repetições de D1 por um exemplo contínuo, distribuído pelo número de slides que for necessário para manter legibilidade:

1. **Pedido e âmbito:** a pessoa pede análise de uma tentativa simulada de saída, fornece o facto dos 15 minutos e exclui cobrança/hardware. O analista só lê e devolve alternativas e cenários.
2. **Decisão humana:** a pessoa que representa o responsável pelo processo escolhe D1 e regista a inclusividade como decisão do exercício. A ferramenta não cria esta legitimidade.
3. **Planeamento persistente:** uma sessão/perfil com as permissões de planeamento adequadas cria a alteração e os artefactos; a pessoa revê-os. Mostrar a entrada exata da rota escolhida e o resultado esperado em ficheiros. A rota de proposta não deve ser atribuída ao perfil analista sem edição.
4. **Início de implementação:** depois da aprovação, a pessoa pede explicitamente a tarefa 1.1 ao implementador, com ficheiros permitidos. O agente consulta estado/instruções e lê os artefactos. Se estiver bloqueado, devolve o que falta.
5. **Loop de ferramenta:** o agente propõe uma edição, o cliente aplica-a se autorizada, a ferramenta de teste devolve saída e o agente decide o próximo passo dentro do contrato. O slide identifica separadamente ação e observação.
6. **Revisão e retoma:** a pessoa confronta cenário e execução; o revisor apresenta suspeitas sem editar; o achado é reproduzido. O handoff guarda a evidência e o próximo passo, para nova sessão.

Cada transição deve dizer **quem atua, em que interface, com que entrada, que resultado fica e quando parar**. Escolher uma única rota base para a turma; a alternativa OpenCode/ORCA pode ficar depois, desde que não seja necessária para preencher uma lacuna. Mostrar “Terminal” junto dos comandos CLI e o nome do cliente junto dos slash commands. Não transformar os slides num catálogo de todas as opções instaladas.

**Aceitação por leitura autónoma:** uma dupla, sem notas, consegue ordenar as etapas, identificar o ator que escreve cada artefacto e executar ou explicar o percurso base até à revisão. Não invoca `/opsx` no terminal, não pede escrita ao analista sem edição e não tenta implementar sem contrato pronto. O ensaio continua a partir do starter sem intervenção não documentada do docente. Este aprofundamento mantém a prioridade de T01; não constitui um segundo P0 independente a somar à contagem.

### S04 — Os slides precisam de tornar visível a diferença entre expectativa e observação reproduzível — P1, extensão de T07/T10

**Slides:** 5, 6, 12, 15, 17 e 22.

**Evidência visível:** os slides 5/15 mostram o resultado esperado de fronteira. O slide 12 afirma “Resultado observado EXPIRED”, mas não mostra o pedido concreto, comando de reprodução ou saída de ferramenta que permite ao leitor ligar a observação a esse cenário. O slide 6 diz para observar a saída real, mas não apresenta um exemplo. A separação entre validar estrutura e testar comportamento, bem explicada nas notas, não basta para um aluno distinguir autonomamente uma previsão, uma afirmação do modelo e uma execução demonstrada.

**Consequência pedagógica:** o princípio “exigir evidência” pode ficar reduzido a uma frase de autoridade no próprio slide. O estudante não aprende o formato mínimo de uma reprodução nem a rastreabilidade entre teste executado, condição de pagamento e decisão aprovada.

**Alteração concreta:** incluir um único exemplo legível com três partes claramente identificadas: **expectativa aprovada**, **reprodução executada** e **observação/limite da conclusão**. Usar pagamento confirmado, instantes ou duração explícita, o teste/comando real e o resultado obtido. Se for usada evidência gravada do ensaio, identificá-la como tal e não como execução em direto. Não inventar uma saída para completar o layout. Acrescentar a conclusão humana: a crítica específica foi refutada; isso não prova toda a aplicação nem valida a escolha de negócio. A ficha final deve exigir a mesma estrutura mínima, em vez de pedir apenas “que resultado observámos?”.

**Aceitação por leitura autónoma:** o leitor localiza no slide a origem da expectativa, os dados pagos e o limite testado, o comando/teste executado e a observação correspondente; explica o que esta observação permite concluir e o que continua por validar. Consegue adaptar a reprodução ao caso vizinho sem alterar a regra para fazer o teste passar. Esta é uma extensão do requisito de evidência de T07/T10, não um novo achado sobre a correção do programa.

### Ordem, dimensão e ritmo sob o novo critério

Retiro qualquer leitura da proposta anterior como preferência por conservar 22 slides ou cinco slides por bloco. A dimensão deve resultar da legibilidade do conteúdo indispensável. Há espaço para trocar esquemas repetidos por definições, uma tabela de distinções e o exemplo contínuo, sem aumentar a duração. Auto contido não significa projetar a instalação completa: o ambiente continua preparado antes da sessão, mas os passos de aprendizagem e os comandos essenciais da prática ficam visíveis. Guias podem aprofundar; não completam saltos obrigatórios.

Sequência alternativa proposta, com liberdade de dividir um momento por mais de um slide:

| Minutos | Conteúdo visível indispensável | Resultado |
| --- | --- | --- |
| 00–03 | Objetivos, entrega, caso e limites sem custos | O aluno sabe o que irá demonstrar e o âmbito da simulação |
| 03–08 | Microprocesso, stakeholders, facto/ambiguidade/decisão | D1 é discutida antes de revelar a referência |
| 08–12 | O que é OpenSpec, propósito, spec vigente/delta e artefactos | O aluno explica o papel do contrato persistente |
| 12–17 | Pedido, command, skill, agente, modelo, ferramenta e loop | O aluno distingue instrução, capacidade e execução |
| 17–23 | Exemplo contínuo desde análise até teste, com aprovação intermédia | O percurso operacional fica completo |
| 23–27 | Reprodução da crítica, validação/verificação e arquivo | Expectativa, observação e conclusão são distintas |
| 27–30 | Handoff e mapa da prática, comandos/atores/fallback | A dupla conhece a sequência e os critérios de paragem |
| 30–33 | Branch e execução do starter preparado | Infraestrutura confirmada; regra por implementar |
| 33–40 | Análise e conclusão dos artefactos preparados, aprovação | Contrato pronto ou referência 01 sem perda de trabalho |
| 40–47 | Uma tarefa pequena, teste e build | Implementação limitada ou referência 02 |
| 47–52 | Revisão e reprodução | Achado ou limites documentados |
| 52–56 | Handoff e retoma numa sessão nova | Próximo passo localizado e verificado |
| 56–60 | Entrega de todos, amostra oral e feedback | Evidência de aprendizagem recolhida |

Mantêm-se exatamente 30 minutos de introdução/demonstrações e 30 de prática. A viabilidade desta sequência continua a exigir ensaio, sobretudo da criação dos artefactos e da gestão das permissões. O número de slides deixa de ser restrição; o tempo, a completude e a legibilidade são as restrições relevantes.

### Resumo suplementar

1. **S01/P1:** definir OpenSpec e o seu propósito antes de ensinar pastas e ficheiros.
2. **S02/P1:** ensinar explicitamente commands, skills, agentes, modelos, ferramentas e CLI, com exemplos da instalação.
3. **S03/P0, extensão de T01:** mostrar um percurso completo e exequível; o analista sem edição não pode ser a ponte implícita para os artefactos.
4. **S04/P1, extensão de T07/T10:** apresentar uma reprodução verificável e separar expectativa, saída observada e conclusão humana.

Aceitação global proposta: um leitor da audiência-alvo, sem acesso a notas, consegue explicar estes conceitos, seguir a rota base e justificar D1 com a cadeia spec/cenário/teste/evidência. A revisão permanece documental: este teste de leitura autónoma e o ensaio de sala ainda não foram realizados. Só foi acrescentado este suplemento ao mesmo ficheiro autorizado.
