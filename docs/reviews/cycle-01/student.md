# Revisão independente 1 — perspetiva de aluno recém-chegado

## Âmbito e método

**Objeto:** os 22 slides de `presentation/output/workshop-agentes-openspec-reestruturado.pptx`, na versão disponível em 2026-11-02.

**Perspetiva simulada:** aluno do 3.º ano de informática, com conhecimentos gerais de programação e testes, mas sem conhecer OpenSpec, ORCA ou workflows agênticos. Isto é uma simulação de leitura, **não uma validação com alunos reais**.

Li primeiro `README.md` e `AGENTS.md`, como exigido. Portanto, a leitura fria não foi completamente cega ao objetivo do repositório: já conhecia a duração, o âmbito da autorização de saída e a restrição de custo. Para evitar preencher as lacunas da apresentação, avaliei depois apenas o texto visível e os renders `presentation/.build/slide-01.png` a `slide-22.png`, por ordem. Não consultei os guias de ensino, os prompts, o código ou os pareceres dos outros revisores. Só após terminar essa passagem li as notas embebidas no PPTX para separar conteúdo projetado de instruções exclusivas do formador.

**Ficheiro único autorizado para escrita:** este relatório. Não alterei apresentação, fontes, código, testes ou HANDOFF. Não executei testes funcionais: a tarefa é uma revisão documental, sem alterações funcionais. Não fiz commits.

**Escala:** P0 impede o objetivo/execução ou transmite uma ideia central incorreta; P1 prejudica significativamente compreensão ou viabilidade; P2 é uma melhoria útil. Não identifico um P0 demonstrado pelos slides. Os obstáculos mais fortes são P1 e podem ser resolvidos com instruções visíveis e pontos de controlo.

## Parecer

Consigo explicar a ideia principal no fim da leitura: uma pessoa resolve a ambiguidade de negócio, uma spec fixa a expectativa, o agente executa uma tarefa limitada e testes/revisão produzem evidência. A apresentação acerta nessa cadeia e mantém o mesmo exemplo quase sempre.

Contudo, ainda não conseguiria conduzir a prática só com os slides. Eu saberia que há quatro artefactos de planeamento, mas no laboratório receberia apenas «ORCA: prompts/01-analysis.md», sem saber como enviar o pedido, como passar da análise aos artefactos, onde registar a aprovação ou qual o sinal visível de que posso implementar. A orientação oral pode resolver isso, mas as notas mostram que contém vários passos essenciais que os slides omitem. O maior ganho não seria acrescentar mais teoria: seria tornar observáveis essas transições.

## Percurso do meu entendimento, bloco a bloco

| Bloco | O que já consigo dizer | Onde ainda me perco |
| --- | --- | --- |
| 1–2, abertura e mapa | Há um problema de estacionamento, pessoas aprovam e agentes executam. OpenSpec guarda decisões e tarefas. | Não sei ainda o que vou entregar ou como será o pequeno programa. ORCA aparece no título e ainda não sei se é o modelo, o editor ou a ferramenta de especificação. |
| 3–7, ciclo | Entendo a ordem análise → cenários → tarefas → código/testes → revisão. Consigo justificar 900000 como aceite e 900001 como expirado depois da escolha humana D1. | «Spec» e «tarefa 1.1» parecem objetos já existentes. O diagrama dos checkpoints parece uma segunda sequência, mas ainda não sei como a usar para recuperar trabalho. |
| 8–12, agentes | Entendo que o modelo propõe ações, o cliente controla ferramentas e o resultado volta como observação. Entendo também que o revisor pode errar e que preciso reproduzir. | Preciso de relacionar o diagrama com uma sessão real. Os nomes ORCA, OpenCode, Ollama, Qwen 3 e Qwen 3.5 acumulam-se. Não sei se os papéis são agentes obrigatórios distintos, escolhas de modelo ou sessões que eu próprio vou abrir. |
| 13–17, OpenSpec | Consigo distinguir spec vigente de alteração proposta e indicar a função dos quatro ficheiros. Vejo a ligação do cenário ao teste. | Não sei se o starter já contém a spec mostrada. O comando `instructions apply` parece próximo de «executar», mas a separação entre obter instruções, pedir ao agente e marcar a tarefa ainda depende do formador. |
| 18–20, início da prática | Consigo criar uma branch e correr os comandos apresentados, assumindo clone e dependências preparados. Sei quais são os prompts e o ficheiro de implementação. | Não sei o gesto exato no ORCA, o resultado esperado dos testes iniciais, o endereço da interface ou quando trocar de terminal. Falta a ponte explícita análise → artefactos aprovados → tarefa 1.1. |
| 21–22, revisão e fecho | Sei que preciso rever, executar testes/build e deixar memória em HANDOFF. As quatro perguntas finais fazem sentido. | Não sei qual o pedido a enviar ao revisor nem o que fazer sem outro modelo instalado. Só no fim deduzo a entrega, mas não tenho uma lista concreta de caminhos/evidência a submeter. |

## Achados e correções específicas

### A1 — O resultado do workshop fica explícito apenas nas notas e no fecho

**Prioridade: P1. Slides: 1–2 e 22.**

- **Evidência visível:** o slide 1 apresenta «Desenvolvimento com agentes» e «Workshop guiado de 60 minutos». O slide 2 apresenta as três peças e o «Resultado verificado», mas não define a alteração que faremos ou os entregáveis. O slide 22 coloca perguntas sobre decisão, rastreabilidade, evidência e responsabilidade.
- **Só nas notas:** a nota 1 formula o objetivo «transformar uma regra de negócio ambígua numa alteração pequena, testada e revista». A nota 22 define «Entrega mínima: decisão da fronteira, caminho da spec, teste correspondente e uma observação da revisão», além do modelo efetivamente usado.
- **Impacto no aluno:** durante os primeiros 30 minutos posso pensar que o objetivo é aprender a instalar/coordenar ferramentas ou construir o sistema do parque. Não tenho uma referência simples para decidir o que merece atenção ou para perceber se terminei.
- **Correção específica:** acrescentar ao início, idealmente no slide 2, uma frase de objetivo e uma entrega curta: «Hoje: especificar e verificar a autorização de saída, num simulador. Entrega: D1 registada, caminho do cenário, teste de fronteira com resultado real e HANDOFF curto». Mostrar uma entrada/saída do simulador ou um recorte da interface. Declarar visivelmente que pagamentos e cancela são simulados. Repetir a mesma lista no fecho, mantendo as perguntas.
- **Critério observável de aceitação:** após o slide 2, um aluno consegue dizer em uma frase o comportamento que vai trabalhar e nomear os quatro elementos da entrega, sem consultar notas ou o README.

### A2 — Falta o percurso operável entre o prompt de análise e a spec aprovada

**Prioridade: P1. Slides: 14, 16 e 19–20.**

- **Evidência visível:** o slide 14 apresenta quatro artefactos e `openspec new change validate-garage-exit`. O 16 pressupõe que os artefactos estão prontos e que existe a tarefa 1.1. O 19 manda usar `prompts/01-analysis.md`, ler dois ficheiros, propor cenários e «Regista o limite inclusivo como decisão humana». O 20 já manda manter «a spec aprovada». Nenhum slide de prática diz que ação cria/redige os quatro artefactos, onde ficam, ou onde o par aprova.
- **Só nas notas:** a nota 19 fala em usar instruções CLI, na alternativa `/opsx-propose validate-garage-exit`, em registar aprovação num comentário de tarefa/diário e em rever uma proposta de referência se a alteração já existir. A nota 16 delimita os dois ficheiros e explica que a pessoa coordenadora atualiza `tasks.md`.
- **Impacto no aluno:** posso produzir apenas uma resposta de chat com três cenários e considerar a análise concluída. Depois não sei onde está a «spec aprovada» que o implementador deve ler. Também posso tratar a resposta do agente como aprovação automática.
- **Correção específica:** transformar o slide 19 numa sequência de ações visíveis, sem apresentar ORCA e OpenCode como dois percursos simultâneos: (1) abrir sessão de analista e enviar o conteúdo do prompt indicado; (2) produzir/rever os quatro ficheiros da alteração `validate-garage-exit` pelo percurso escolhido; (3) o par confirma D1 e os cenários e regista aprovação no local designado; (4) só então iniciar tarefa 1.1. Mostrar caminhos concretos dos ficheiros a abrir e um exemplo de uma linha de tarefa verificável. Manter a alternativa OpenCode num recurso de apoio.
- **Critério observável de aceitação:** no minuto 40, cada par consegue apontar para os artefactos esperados, para o registo de aprovação humana e para a tarefa que autoriza a edição; não basta apontar para uma mensagem do agente.

### A3 — O primeiro passo no ORCA e os sinais de ambiente pronto não estão à vista

**Prioridade: P1. Slides: 8 e 18–19.**

- **Evidência visível:** o slide 18 mostra a criação de branch, `npm test` e `npm run build && npm start`, depois diz «ORCA abre a pasta do projeto» e «O par confirma a interface e os testes iniciais». O slide 19 mostra «ORCA: prompts/01-analysis.md». Não se vê uma sessão, um campo de envio, o URL da interface, o resultado inicial esperado ou a indicação para manter o servidor a correr.
- **Só nas notas:** a nota 18 explica o servidor em localhost:3000, a limitação esperada do starter e o terminal do servidor. A nota 8 explica que o cliente disponibiliza as ferramentas.
- **Impacto no aluno:** «ORCA: caminho» pode significar abrir o ficheiro, colar o caminho ou colar o conteúdo. Se `npm start` ocupar o terminal, posso interrompê-lo para continuar. Sem baseline, um teste a falhar pode parecer erro de instalação ou sucesso de um teste destinado a expor a regra incompleta.
- **Correção específica:** reservar uma demonstração curta e um slide de orientação com o gesto real: pasta → sessão → seleção do modelo local preparado → pedido enviado → primeira leitura observada. Mostrar `http://127.0.0.1:3000`, «manter servidor neste terminal» e «usar outro terminal para testes». Indicar o resultado inicial realmente verificado no starter, incluindo falhas se as houver; não inventar um número de testes. Acrescentar um sinal visual de «pronto para análise».
- **Critério observável de aceitação:** um par com o setup prévio consegue chegar à interface, manter o servidor ativo e obter a primeira leitura do agente sem pedir onde introduzir o prompt. Consegue distinguir a baseline esperada de um problema de instalação.

### A4 — Checkpoints são mostrados como referências, mas a recuperação não é ensinada ao aluno

**Prioridade: P1. Slides: 7 e 18–21.**

- **Evidência visível:** o slide 7 mostra 00–03 e os slides 19–20 nomeiam checkpoints. O 18 avisa corretamente que as branches de referência não são o local de trabalho. Porém, não há limiar de tempo, ação de recuperação ou descrição do trabalho que continua após recuperar.
- **Só nas notas:** a nota 18 prevê ler o artefacto seguinte se o modelo falhar; a 20 prevê recuperar `checkpoint/02-implemented` e até regenerar só `decide`; a 21 aceita continuar com o mesmo modelo. Essas opções são essenciais para a agenda de 30 minutos.
- **Impacto no aluno:** posso gastar os seis minutos de análise a esperar por uma resposta ou tentar corrigir o setup durante o tempo de implementação. A palavra «Checkpoint» pode levar-me a mudar diretamente para a branch de referência, contrariando o aviso do slide 18. Sem uma regra de recuperação, o par perde a revisão e o handoff, que são parte do objetivo.
- **Correção específica:** apresentar um quadro curto «Se bloquearmos» com limite escolhido e ensaiado pelo formador, por exemplo 90 segundos sem progresso útil ou duas tentativas, e indicar o percurso seguro para consultar/recuperar a versão preparada preservando o trabalho do grupo. Dizer o que o par continua a fazer: verificar a decisão, relacionar cenário/teste e rever evidência. Mostrar uma única receita validada para recuperação, ou um comando de apoio do repositório se existir, em vez de deixar inferir `git switch` para a referência.
- **Critério observável de aceitação:** num ensaio em que o modelo não responde, o par retoma em até dois minutos, preserva o seu trabalho e chega ainda à revisão/handoff dentro dos 30 minutos. Não precisa de serviços pagos nem de cartão.

### A5 — A spec vigente do diagrama não existe ainda no ponto de partida do exercício

**Prioridade: P1. Slides: 13, 17–19.**

- **Evidência visível:** o slide 13 apresenta `openspec/specs/` como «O que o sistema deve fazer hoje». O 17 mostra a spec canónica `garage-exit/` após arquivo. O laboratório começa no starter, mas não avisa que a spec canónica mostrada não está lá ainda. O slide 19 não mostra o caminho da spec da alteração.
- **Só nas notas:** a nota 13 diz expressamente que «no checkpoint00 desta demo ainda não existe uma spec canónica garage-exit» e que a figura é a estrutura geral. Esta distinção não está projetada.
- **Impacto no aluno:** se for procurar o requisito em `openspec/specs/garage-exit/` no starter, posso concluir que estou na branch errada, que o clone falhou ou que devo copiar a solução final. Misturo a spec proposta que devo aprovar com a spec vigente que o arquivo criará depois.
- **Correção específica:** acrescentar duas legendas: «No starter: esta primeira regra ainda não tem spec vigente» e «Durante o exercício: cenário em `openspec/changes/validate-garage-exit/specs/garage-exit/spec.md`; após arquivo passa a vigente». Confirmar os caminhos concretos antes de os projetar. Assinalar se arquivar é apenas demonstrado pelo formador ou também faz parte da entrega do par, porque os slides 18–21 não incluem essa ação.
- **Critério observável de aceitação:** perante a árvore do starter, o aluno sabe explicar a ausência da spec canónica e aponta para o local onde irá criar/rever a proposta, sem recorrer às notas.

### A6 — A troca de modelo parece obrigatória, embora a alternativa válida esteja nas notas

**Prioridade: P1. Slides: 9 e 21.**

- **Evidência visível:** o slide 9 associa analista/implementador a Qwen 3.5 e revisor a Qwen 3. O slide 21 diz «53–57: atualizar HANDOFF.md e trocar de modelo». Não indica condição ou alternativa.
- **Só nas notas:** a nota 9 distingue sessão diferente de modelo diferente. A nota 21 diz para selecionar outro modelo **se estiver instalado**, caso contrário usar o mesmo modelo numa sessão nova e declarar isso.
- **Impacto no aluno:** posso achar que preciso instalar um segundo modelo, ou que abrir outro chat já cumpre a troca. Uma máquina com apenas o modelo preparado parece incapaz de concluir a tarefa. Também não percebo se os nomes Qwen são requisitos do método ou escolhas da demonstração.
- **Correção específica:** escrever no slide 21 «Abrir sessão nova para testar o handoff. Se já houver outro modelo local preparado, mudar e registar o identificador; caso contrário, manter o modelo e declarar isso». No slide 9 marcar os modelos como os usados neste exemplo e os papéis como instruções/contextos, sem exigir máquinas/agentes simultâneos. Mostrar o prompt de retoma e o pedido de revisão sem edição que estão nas notas.
- **Critério observável de aceitação:** um par com um único modelo local consegue cumprir a entrega, identifica corretamente modelo e sessão e não inicia instalações nem procura serviços pagos durante os quatro minutos de handoff.

### A7 — O vocabulário técnico antecede os exemplos concretos que o tornam útil

**Prioridade: P2. Slides: 3, 6, 8–11, 13 e 16.**

- **Evidência visível:** «Spec», «tarefa 1.1», «worktrees», «tokens», «contexto», «delta» e «apply» aparecem sem uma definição operacional. O slide 8 distingue verbalmente ORCA/OpenCode/Ollama, o que ajuda, mas não mostra onde o aluno vê cada peça. O 11 salta para `decide(paid, elapsedMs)`, `allowed` e `reason` antes de mostrar o contrato do pequeno programa.
- **Impacto no aluno:** consigo seguir as setas, mas posso memorizar marcas e palavras sem distinguir quem gera texto, quem executa comandos, que ficheiros são memória e o que está efetivamente a ser editado. O gráfico de tokens pode parecer uma comparação de qualidade entre modelos quando são dois pedidos de âmbito diferente ao mesmo modelo.
- **Correção específica:** introduzir apenas as definições necessárias junto da primeira ocorrência: «spec = ficheiro que descreve comportamento esperado», «contexto = informação enviada ao modelo», «token = unidade de texto processada», «worktree = pasta de trabalho Git isolada». Identificar `paid` e `elapsedMs` no exemplo. No slide 11 escrever «Uma execução local, mesmo modelo, tarefas diferentes; não compara o mesmo trabalho» e identificar Qwen 3.5 4B, que só consta da nota. Usar «alteração proposta» em vez de «delta» no primeiro contacto.
- **Critério observável de aceitação:** após o slide 8, um aluno consegue apontar quem organiza sessões, quem executa o modelo e quem corre uma ferramenta; após o 11, consegue explicar que os números não provam uma aceleração para trabalho equivalente.

### A8 — Faltam dois avisos visíveis curtos que protegem o objetivo pedagógico e o orçamento

**Prioridade: P2. Slides: 15, 17 e 18.**

- **Evidência visível:** o slide 17 distingue graficamente «Validar artefactos» de «Código aceite / testes e revisão», uma boa base, mas não explicita o alcance de `openspec validate`. O 18 pressupõe dependências e modelo preparados, sem dizer visivelmente que o percurso é local/gratuito e sem cartão. Nenhum slide projeta a alternativa sem segundo modelo ou sem geração útil.
- **Só nas notas:** as notas 15 e 17 deixam claro que validação documental não executa cenários. As notas de prática incluem a solução preparada como alternativa. O README declara a restrição de custo, mas o aluno não deve ter de a inferir do nome Ollama.
- **Impacto no aluno:** há margem para interpretar «validate» como validação do comportamento. Quem não conhecer as ferramentas pode também não perceber que não precisa criar uma conta, ativar uma API ou procurar crédito para completar o trabalho.
- **Correção específica:** acrescentar junto do comando «verifica estrutura documental; o comportamento verifica-se com testes e revisão». No arranque da prática: «Percurso base local e gratuito, sem cartão. Se o modelo bloquear, continuamos com o checkpoint preparado». Não acrescentar um catálogo de serviços ou planos.
- **Critério observável de aceitação:** o aluno distingue o que comprova `openspec validate` do que comprova `npm test` e sabe terminar a atividade sem conta paga, cartão ou novo modelo.

## Aspetos que manteria

- **A mesma decisão atravessa a aula.** A sequência 4 → 5 → 12 → 15 usa D1, 900000 e 900001 de forma coerente. A repetição acrescenta perspetivas: decisão, rastreabilidade, revisão e cenário. Não a substituiria por quatro casos distintos.
- **Separação explícita entre facto e decisão humana.** O slide 4 rotula «facto da fonte» e «ambiguidade identificada», e atribui a escolha à pessoa. O slide 7 identifica a hipótese dos dez minutos como futura e não aplicada. Isto evita transformar uma sugestão do agente em regra do negócio.
- **Iteração condicionada por evidência.** O slide 6 pede observar a saída real e reduzir a tarefa após duas tentativas sem progresso. O 12 mostra um erro concreto do revisor em vez de prometer que rever com outro modelo garante correção.
- **Dependências antes de paralelismo.** O slide 10 deixa claro que a implementação espera pela spec aprovada e limita paralelismo a tarefas independentes. Não exige paralelismo para concluir o exercício.
- **Mapa de responsabilidades das ferramentas.** A frase final do slide 8 é útil e deve permanecer. Precisa de uma demonstração curta associada, não de ser substituída por mais marcas ou detalhes de instalação.
- **Legibilidade dos renders.** Nos 22 renders inspecionados, o texto principal é grande, o contraste é suficiente e não observei conteúdo cortado ou sobreposições que impedissem ler. As cores e a composição são consistentes. Não afirmo que isto prova legibilidade na sala ou num projetor específico.
- **Perguntas finais.** As quatro perguntas do slide 22 avaliam compreensão e responsabilidade. Mantê-las ao lado da lista de entrega tornaria o fecho mais verificável.

## Cinco perguntas que eu faria na aula

1. «No fim entrego que ficheiros e que resultados? Estamos só a decidir a saída ou também a simular pagamento e bilhete?»
2. «No ORCA abro `prompts/01-analysis.md`, colo o caminho ou envio o conteúdo? Quem cria os quatro ficheiros do OpenSpec?»
3. «Onde fica a minha aprovação da regra dos 15 minutos e como sei que posso começar a tarefa 1.1?»
4. «Se não encontrar a spec em `openspec/specs/` no starter, está errado? Qual é a spec que o implementador deve ler agora?»
5. «Se o modelo demorar ou só tiver um modelo instalado, como continuo sem perder o meu trabalho e sem pagar?»

## Sequência e timing propostos

Não considero necessário acrescentar minutos ou fixar o número em 22. A ordem geral ciclo → agente → OpenSpec é compreensível. A alteração principal seria introduzir o objeto e o resultado antes do vocabulário, reduzir redundância explicativa e usar o tempo recuperado para uma passagem real pelas ferramentas. Proponho manter aproximadamente 22 slides, fundindo parte da explicação de rastreabilidade com o cenário e usando esse espaço para a orientação operacional.

| Tempo | Conteúdo visível e atividade | Sinal de conclusão |
| --- | --- | --- |
| 00–03 | Objetivo, entrega, âmbito simulado, 30+30 e uma entrada/saída do programa. Mapa das três peças. | Aluno sabe o que vai produzir. |
| 03–10 | Ciclo pequeno, ambiguidade D1, requisito → cenário → teste, iteração e mudança futura. | Distingue facto, escolha humana e evidência. |
| 10–17 | Uma sessão real curta: objetivo, ficheiro lido, ação/ferramenta, observação. Sobrepor responsabilidades ORCA/OpenCode/Ollama. Papéis e dependências. | Reconhece uma ação do agente e o limite humano. |
| 17–20 | Tarefa menor e falso positivo do revisor. Breve interpretação dos dados de âmbito diferente. | Sabe reduzir e reproduzir em vez de acreditar no texto. |
| 20–28 | OpenSpec: vigente vs proposta no starter; quatro artefactos concretos; cenário/tarefa; instruções de apply; validação/arquivo. | Consegue localizar contrato e tarefa aprovada. |
| 28–30 | Preview exato do percurso do laboratório e dos fallbacks locais. | Cada par conhece o primeiro gesto e onde parar. |
| 30–34 | Branch, baseline real, interface e sessão preparada. Instalações ficam fora deste tempo. | Ambiente pronto ou percurso preparado escolhido. |
| 34–40 | Análise, produção/revisão dos artefactos e aprovação registada. | Gate: spec/cenários/tarefa visíveis e aprovados. |
| 40–48 | Uma tarefa de implementação com ficheiros delimitados e testes; usar recuperação quando atingir o limite combinado. | Diff pequeno e saída real, ou comparação com implementação preparada declarada. |
| 48–53 | Nova sessão de revisão, sem edição, com prompt projetado e reprodução de um cenário/achado. | Uma observação verificada ou limites do que foi revisto. |
| 53–57 | HANDOFF e retoma por sessão nova. Segundo modelo apenas se já preparado. | Estado resumido a partir dos ficheiros, modelo real registado. |
| 57–60 | Entrega mínima e quatro perguntas finais. | Decisão, caminho da spec, teste/evidência e observação da revisão apresentados. |

A prática soma exatamente 30 minutos e a introdução 30. A exequibilidade é **condicional**: setup ensaiado antes da aula, primeira interação demonstrada, gates explícitos e fallback visível que preserve o trabalho. O cronograma atual não demonstra sozinho que todos os pares conseguem gerar artefactos, implementar e trocar de modelo no tempo previsto. É preciso um ensaio com alguém sem o mapa mental do autor, medindo o tempo até cada gate. Se o setup ainda estiver por fazer no minuto 30, não há evidência para considerar a agenda realizável.

## Limites e confiança

- **Confiança alta** nas lacunas de conteúdo visível: os 22 renders e o texto do PPTX foram inspecionados e depois comparados com as notas.
- **Confiança moderada** no impacto estimado num aluno do 3.º ano: é uma simulação individual, sem observação de alunos reais ou do discurso do formador. Um bom acompanhamento pode resolver várias lacunas, mas isso não as torna visíveis na apresentação.
- Não verifiquei se os comandos executam nesta máquina, se os checkpoints estão disponíveis no remoto, se a CLI instalada corresponde aos comandos ou se o setup está pronto. Não apresento essas possibilidades como falhas demonstradas.
- Não usei documentação externa para corrigir detalhes técnicos de versões. As recomendações de comandos/caminhos devem ser confirmadas pelo autor na versão que vai ensinar.
- Não encontrei prova de erro na decisão inclusiva depois de D1. Não considero 14:59/15:01 no laboratório contraditório com 900001 ms: são resoluções diferentes de cenários, embora valha a pena pedir também o vizinho de um milissegundo quando se pretende demonstrar essa fronteira exata.
- Este parecer é independente. Não li as revisões dos outros membros do painel.

## Próxima tarefa proposta ao autor

Corrigir primeiro A1–A6 no conteúdo projetado, sobretudo o percurso do slide 19 e os gates/fallbacks do laboratório. Depois fazer um ensaio de 30 minutos com o setup pronto e alguém que não conheça os materiais. Recolher tempos e dúvidas antes de mudar o código ou acrescentar mais teoria.


---

## Suplemento — slides auto contidos e workflow com commands, skills e agents

### Novo critério e método

Este suplemento responde ao requisito posterior: **os slides devem ser auto contidos; as notas do docente não compensam omissões no conteúdo projetado**. Preserva integralmente a revisão original. As conclusões anteriores sobre a utilidade do discurso do formador passam a ser apenas um limite histórico daquela passagem, e não um critério de aceitação desta.

Voltei ao conteúdo visível, com foco nos slides 2, 8–9, 13–16 e 18–21. Não consultei pareceres alheios. Depois de identificar as lacunas, consultei apenas os ficheiros locais de command/skill de proposta, os três perfis `.opencode/agents/workshop-*.md` e `prompts/01-analysis.md` para evitar recomendar uma cadeia de execução incompatível com o repositório. A presença desses ficheiros fora da apresentação **não resolve a lacuna de leitura autónoma**.

### Resultado do teste de leitura autónoma

| Pergunta ao aluno, usando apenas os slides | Resultado desta simulação |
| --- | --- |
| O que é OpenSpec? | Consigo dizer que organiza decisões e alterações em ficheiros. Não consigo formular com segurança se é uma convenção documental, uma ferramenta CLI, um modelo ou um agente, nem como estas partes se relacionam. |
| O que distingue modelo, cliente e agente? | O slide 8 permite inferir parte da relação. Falta a definição de agente como conjunto em execução, e falta relacioná-lo com os perfis chamados analista/implementador/revisor no slide 9. |
| O que distingue command, skill e perfil de agent? | Não consigo responder. Skills não surgem no conteúdo visível. Os perfis são apresentados como papéis associados a modelos, sem configuração ou permissões. Os comandos visíveis são de terminal e não há comparação com slash commands. |
| Onde escrevo o primeiro pedido e o que é lido? | Consigo apontar o nome de um prompt, mas não a superfície de entrada nem o pedido completo. Os dois ficheiros do slide 19 são um bom início, mas a leitura de configuração, instruções e artefactos não aparece num percurso único. |
| Que saída espero e o que autorizo a seguir? | Vejo categorias de saídas dispersas. Não consigo percorrer autonomamente análise → proposta escrita → aprovação → execução limitada → teste real com todas as transições explícitas. |

### B1 — A categoria de OpenSpec fica implícita, apesar de se explicar a árvore de pastas

**Prioridade: P1. Slides: 2 e 13–14. Complementa A1 e A5.**

**Evidência:** «OpenSpec = estado partilhado», as pastas `openspec/specs/` e `openspec/changes/<id>/` e «A CLI cria a estrutura. O agente redige». São peças corretas de uma explicação, mas falta a frase que diz o que a ferramenta é e para que entra no workflow. Um leitor pode associar OpenSpec ao modelo que redige ou pensar que o comando gera por si só os requisitos.

**Impacto:** posso decorar quatro nomes de ficheiros sem compreender por que se usa OpenSpec em vez de apenas pedir código ao agente. Também posso atribuir à CLI o raciocínio e a aprovação que pertencem ao agente e à pessoa.

**Mudança mínima:** acrescentar cedo um slide «O que é OpenSpec», antes de detalhar o ciclo: «OpenSpec é uma ferramenta e um workflow para organizar alterações a partir de especificações em ficheiros. A CLI organiza o estado e fornece instruções. O assistente redige e executa tarefas. A pessoa aprova as decisões». Mostrar um exemplo de requisito, o caminho onde fica e a ação seguinte. Distinguir visivelmente: a especificação é conteúdo; OpenSpec é o mecanismo que o organiza neste exercício. Reutilizar o mapa de pastas do slide 13 mais tarde, sem repetir a definição inteira.

**Critério de leitura autónoma:** tapando as notas, o aluno define OpenSpec em duas frases, identifica a função da CLI e explica quem escreve/aprova a regra. Não o identifica como modelo nem atribui ao comando a escolha dos 15 minutos.

### B2 — Faltam as distinções entre modelo, agente em execução e mecanismos reutilizáveis

**Prioridade: P1. Slides: 8–9, 14 e 16. Aprofunda A7 com conceitos pedidos explicitamente pelo utilizador.**

**Evidência:** o slide 8 apresenta «Modelo em Ollama» e ferramentas controladas pelo OpenCode. O 9 associa «Analista / Qwen 3.5» e «Qwen 3 revisor» às entregas. Não aparece a palavra skill, uma definição de command ou um exemplo de perfil de agent. O aluno não tem elementos para saber se mudar o papel implica mudar de modelo ou se uma skill é um agente adicional.

**Impacto:** posso confundir o modelo com o sistema que consegue ler/editar, ou achar que o command, a skill e o perfil são três entidades que obrigatoriamente correm em sequência. Posso ainda concluir que um papel de analista dá ao modelo uma capacidade própria, quando os limites vêm das instruções e permissões do cliente.

**Mudança mínima:** substituir parte da enumeração de marcas por uma definição ligada ao mesmo exemplo, num slide com distinções curtas:

| Conceito | Explicação mínima a projetar | Exemplo local a mostrar |
| --- | --- | --- |
| Modelo | Gera a próxima resposta ou ação proposta a partir do contexto. | Qwen 3.5 servido pelo Ollama. |
| Cliente/runtime | Mantém a interação, disponibiliza ferramentas e aplica permissões. | OpenCode, com as sessões organizadas pelo ORCA. |
| Agente em execução | Usa modelo, instruções, contexto e ferramentas num ciclo de ação/observação para cumprir um objetivo. | A sessão a analisar a regra. |
| Perfil de agent | Configura papel, modelo e limites do agente. | `workshop-analyst`: leitura/análise, sem edição nem bash. |
| Command | Pedido explícito que inicia um procedimento na integração escolhida; distinguir do comando de shell. | `/opsx-propose validate-garage-exit` na entrada do OpenCode. |
| Skill | Instruções reutilizáveis para um tipo de tarefa, usadas pelo assistente quando selecionadas/carregadas pela integração. | `openspec-propose/SKILL.md`, procedimento de preparação dos artefactos. |

O exemplo deve declarar como a instalação realmente escolhe/carrega a skill. **Não desenhar uma seta automática command → skill sem a verificar:** nesta consulta, command e skill contêm procedimentos de proposta semelhantes, o que não prova que um invoque o outro. Também não apresentar todos os conceitos como passos obrigatórios separados.

**Critério de leitura autónoma:** perante seis exemplos retirados do próprio slide, o aluno classifica-os e responde corretamente: «o mesmo modelo pode usar perfis diferentes», «uma skill não é outro modelo» e «as permissões são aplicadas pelo cliente». Consegue apontar o que muda quando se escolhe analista em vez de implementador.

### B3 — Falta um exemplo completo que mostre as mudanças de contexto e de autorização

**Prioridade: P1. Slides: 8–9, 14, 16 e 19–20. Torna A2/A3 verificáveis; não é um pedido de mais uma descrição abstrata.**

**Evidência:** a apresentação tem um ciclo geral (3), um ciclo de ferramentas (8), quatro artefactos (14), aplicação (16) e instruções práticas (19–20). Nenhum percurso reúne «onde escrevo → quem recebe → o que lê → o que pode fazer → o que devolve → onde paro». O slide 19 acaba antes de implementar e o 20 pressupõe a spec aprovada, mas a escrita/aprovação dos artefactos continua entre ambos.

**Verificação posterior:** `prompts/01-analysis.md` pede análise e cenários. O perfil `workshop-analyst` nega `edit`, `bash` e `task`. Portanto, não se deve explicar o percurso como se enviar esse prompt ao analista atual criasse por si só os quatro artefactos. Os ficheiros command/skill de proposta descrevem escrita de artefactos via CLI, exigindo outro executor/permissões. Isto demonstra uma transição por explicar, não prova que uma sessão efetivamente executada na aula tenha falhado.

**Mudança mínima:** acrescentar dois slides de um único exemplo, com excertos curtos e legíveis, preservando D1:

1. **Pedido e proposta:** mostrar a entrada real de ORCA/OpenCode e um pedido integral curto ao analista. Identificar `docs/BRIEF.md` e o ficheiro da regra como leituras, «sem editar» como limite e uma pequena saída esperada com a pergunta dos 15 minutos. Mostrar a pessoa a escolher D1. Depois identificar explicitamente a pessoa ou o perfil autorizado que prepara os artefactos, com o command/skill realmente usado. Mostrar os quatro caminhos produzidos e a aprovação humana.
2. **Aplicação e evidência:** mostrar quem obtém `status`/`instructions apply`, que contexto entrega ao implementador e o pedido «executa só tarefa 1.1». Identificar os dois ficheiros editáveis, a execução de teste e uma saída real capturada, com código de saída e resultado da fronteira. Mostrar o estado final da tarefa, quem o atualiza e a passagem ao revisor sem edição.

Não basta substituir o exemplo por «ver prompts/…». O pedido essencial, a resposta esperada, o local de escrita e a condição de passagem devem estar no slide. O ficheiro de prompt pode continuar como material reutilizável.

**Critério de leitura autónoma:** um aluno consegue narrar a execução inteira sem preencher etapas com «e depois o agente trata disso». Em cada transição identifica executor, ficheiros lidos/escritos, evidência e autorização. Consegue ainda explicar por que o analista não edita e por que implementar exige um pedido posterior à aprovação.

### B4 — O significado e a superfície de execução de cada comando precisam de rótulos explícitos

**Prioridade: P1. Slides: 14, 16 e 18–21. Complementa A3, agora distinguindo comando CLI, slash command e chamada de ferramenta.**

**Evidência:** o slide 14 imprime `openspec new change ...`; o 16 mostra `CLI: status`, `CLI: instructions apply` e depois «Agente lê o contexto e executa a tarefa 1.1». O rodapé diz «O apply normal pode percorrer várias tarefas». Não se distingue o comando que devolve instruções do pedido/workflow que executa trabalho. `read`, `edit` e `bash` são mostrados como ferramentas no 8, mas não há exemplo que separe ferramenta do agente de comando escrito pelo aluno.

**Impacto:** posso interpretar `openspec instructions apply` como execução automática da tarefa, ou copiar um slash command para o terminal quando ele for introduzido. Posso achar que ter o texto de um comando no contexto equivale a ter permissão para o executar. O problema adicional a A3 é a semântica das entradas, não apenas encontrar o campo do ORCA.

**Mudança mínima:** rotular cada bloco por superfície e efeito: «Terminal: CLI devolve estrutura/estado/instruções»; «Entrada do assistente: pedido ou slash command inicia o workflow»; «Ferramenta bash: cliente executa o comando autorizado e devolve stdout/erro». Junto de `instructions apply`, mostrar um excerto curto do resultado com contexto e tarefas e escrever «obtém instruções; a execução é do agente após o pedido». Qualificar a frase do rodapé como workflow/pedido de apply, não como o comando CLI de obtenção de instruções. Mostrar comandos completos apenas onde são para copiar, em vez de `CLI: status` abreviado.

**Verificação posterior:** no perfil `workshop-builder.md`, os padrões `openspec status *` e `openspec instructions *` aparecem sob `permission.edit`, enquanto a lista bash autoriza testes e build. Não executei esse perfil, pelo que não classifico o comportamento como falha comprovada. Para um exemplo didático correto, mostrar a pessoa/coordenador a obter as instruções ou confirmar antes que o executor escolhido está autorizado a esses comandos. Não prometer essa chamada pelo builder apenas com base no diagrama.

**Critério de leitura autónoma:** para cada linha apresentada, o aluno indica onde a escreve, quem a executa e que tipo de saída espera. Distingue obter instruções de aplicar uma alteração e sabe que a ferramenta só corre quando o cliente a autoriza.

### Ordem, tamanho e tempo: recomendação atualizada

Com o requisito de leitura autónoma, já não recomendaria manter rigidamente 22 slides. Proponho **cerca de 24 slides principais**, obtidos com quatro adições e duas condensações, sem ultrapassar os 60 minutos:

- Adicionar a definição concreta de OpenSpec logo após objetivo/mapa.
- Adicionar a distinção command/skill/perfil e modelo/cliente junto do ciclo de ferramentas.
- Adicionar os dois slides do exemplo completo, imediatamente antes da prática, reaproveitando as frases do apply atual.
- Fundir parte da rastreabilidade do atual 5 com o cenário do 15 e colocar o gráfico medido do 11 em apêndice. Mantê-lo disponível como evidência, sem exigir que o aluno processe medição e novo vocabulário na primeira passagem.

Isto dá aproximadamente 19 slides de introdução e cinco de prática. Não é uma razão para acelerar a fala: a descrição passa de blocos separados a um exemplo reutilizado. Uma proposta de distribuição dos primeiros 30 minutos é: **00–04** objetivo, simulador e definição de OpenSpec; **04–11** ciclo e D1; **11–18** agente/modelo/cliente, command/skill/perfil e revisão; **18–24** artefactos, vigente/proposto e limites da validação; **24–30** exemplo completo e instruções de arranque. A prática mantém **30–34 / 34–40 / 40–48 / 48–53 / 53–57 / 57–60**, com gates e fallback de A4 visíveis.

As pré-condições técnicas podem continuar fora dos 60 minutos, mas têm de estar num slide inicial/de preparação com caminho de acesso, confirmação de prontidão e alternativa gratuita. Leitura autónoma não significa instalar todo o ambiente dentro da apresentação. Significa não depender de notas para perceber os conceitos, saber a próxima ação ou reconhecer a saída esperada.

### Aceitação global do suplemento

Proponho um teste simples, ainda não realizado: fornecer apenas o PDF/exportação dos slides a alguém com conhecimentos gerais de programação, sem notas, guias ou explicação oral. Pedir que defina OpenSpec, classifique os seis conceitos de B2 e narre o exemplo de B3 indicando superfícies e saídas. Depois observar o início da prática com o ambiente já pronto. Qualquer etapa essencial que obrigue a consultar o discurso do formador reprova o requisito de autonomia dessa etapa. O ensaio não deve aceitar como prova de aprendizagem a mera reprodução dos termos.

**Confiança:** alta quanto às omissões visíveis; moderada quanto à reação provável de um aluno; nenhuma validação empírica com estudantes. A consulta local posterior serve apenas para verificar a exatidão das recomendações. Mantém-se o limite de zero serviços pagos, cartão ou subscrição.
