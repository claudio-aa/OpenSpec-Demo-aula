# Conclusões do primeiro ciclo: três revisores e um escritor

## Conclusão do escritor

A apresentação tem uma base visual legível e um exemplo coerente, mas **ainda não satisfaz o requisito de leitura autónoma**. A lacuna principal é de explicação e execução: faltam as definições e relações de OpenSpec, commands, skills e agents; faltam também operações explícitas entre a análise, os artefactos aprovados e a implementação.

Ter esquemas de um fluxo não equivale a ensinar os conceitos e a mostrar como o aluno o percorre. As notas e os guias contêm várias explicações corretas, mas o utilizador esclareceu que **os slides devem ser auto contidos**. Por isso, informação essencial escondida nas notas conta como informação em falta na apresentação.

Este ciclo entrega conclusões e propostas, sem alterar o PPTX, a aplicação ou a configuração. Os três pareceres são simulações independentes por agentes de IA, não validação com estudantes reais, aprovação institucional ou um ensaio de aula. O agente principal assume o papel de escritor e integra os pareceres. Não foi imposta diversidade de modelos aos revisores.

## Pareceres e evidência

- [Aluno que chega agora à aula](student.md): leitura inicial apenas dos slides visíveis, seguida de notas; o README obrigatório já lhe dera o enquadramento geral.
- [Docente de Análise de Sistemas](teacher.md): alinhamento entre caso, análise de processos, objetivos, atividade e avaliação.
- [Metodologista/especialista](methodologist.md): precisão do fluxo, contratos entre participantes, configuração e viabilidade face ao que foi ensaiado.
- [Protocolo, versão e critérios](PROTOCOL.md): mandato, separação de ficheiros e identificação da apresentação avaliada.

Os três inspecionaram os 22 renders e o conteúdo do PPTX. Cada um escreveu só o próprio parecer, sem consultar os outros. Após a clarificação do utilizador, receberam uma passagem suplementar independente centrada na auto contenção e nos conceitos commands/skills/agents. Os suplementos preservam os pareceres iniciais.

Na primeira passagem houve 27 observações, com sobreposição: oito do aluno, doze do docente e sete do metodologista. Não são 27 defeitos distintos. O docente classificou a passagem análise → artefactos como P0; os outros classificaram-na P1, por admitirem facilitação ou recuperação documentada. O desacordo é de severidade, não sobre a existência da lacuna. Os suplementos devem ser lidos em conjunto com essa primeira passagem.

## O que cada perspetiva acrescentou

**Aluno:** percebe a cadeia decisão → spec → código → teste, mas não saberia iniciar e concluir a prática apenas com a projeção. Não sabe o gesto no ORCA, onde produzir e aprovar os quatro artefactos, como distinguir a spec proposta da vigente no starter ou como recuperar sem perder trabalho. O vocabulário aparece antes do exemplo que o torna compreensível.

**Docente:** o caso de estacionamento está demasiado reduzido à fronteira temporal de uma função. O enunciado e o BRIEF justificam um microprocesso e stakeholders; não foi fornecido um programa curricular oficial. Faltam objetivos/entrega no início, pré-condições no cenário mostrado, elicitação antes de revelar D1 e avaliação formativa recolhida de todos os pares. Não basta obter testes verdes.

**Metodologista:** o percurso operacional promete mais do que os ensaios locais demonstraram. O pacote reduzido é um pedido a modelo sem ferramentas, não um agente a editar e testar. Há uma incompatibilidade estática no perfil do builder e uma divergência entre os inputs anunciados ao revisor e os que o script efetivamente envia. A consolidação ensinada na teoria não tem operação/tempo explícitos na prática.

## Correções consolidadas propostas pelo escritor

Aceitar uma recomendação nesta tabela significa incluí-la no trabalho editorial seguinte; não significa que já foi implementada ou que a respetiva evidência de aceitação existe. As correções C13–C16 exprimem o requisito posterior do utilizador e são prioritárias para o novo storyboard, em conjunto com C01.

| ID | Correção a tratar | Origem no painel | Critério de aceitação proposto |
| --- | --- | --- | --- |
| C01 | Mostrar a operação análise → decisão → criação/revisão dos quatro artefactos → estado pronto. Indicar quem pode escrever cada ficheiro. | A2; T01; M01 | A partir do starter, o percurso escrito chega a uma alteração ativa pronta sem depender de uma instrução oral extra. Uma resposta de chat não é confundida com spec aprovada. |
| C02 | Escolher uma rota base ensaiada, com pedidos pequenos, responsabilidade de integração explícita e recuperação temporal. Separar pedido a modelo de agente com ferramentas. | A3, A4; T08; M03 | A prática completa cabe nos 30 minutos numa máquina de referência e também com falha de modelo simulada, preservando o trabalho do grupo. |
| C03 | Corrigir e confirmar permissões de leitura CLI no perfil builder. | M02 | Os comandos OpenSpec necessários são autorizados em bash, mantendo a edição restrita. Ensaio posterior regista execução real; a inspeção atual é apenas estática. |
| C04 | Alinhar o contrato do revisor com os inputs reais: spec/código apenas, ou acrescentar diff e evidência selecionados. | M04; T12 | O que os slides dizem que o modelo recebeu coincide com o pacote efetivo. Ações da pessoa e do modelo ficam identificadas; não se inventa execução de testes. |
| C05 | Mostrar o estado inicial, caminhos da alteração e baseline do starter; eliminar notas de arranque contraditórias. | A3, A5; T09; M06 | Fica claro que não há spec canónica desta primeira regra no starter, que os testes iniciais são de infraestrutura e como abrir UI/API mantendo o servidor ativo. |
| C06 | Reservar consolidação ou declarar que se verifica um arquivo de referência. Atualizar o handoff conforme o estado real. | A5; M05 | Há responsável e tempo para tasks/validate/archive, ou pendência explícita. Um defeito real não é arquivado apenas para cumprir o relógio. |
| C07 | Anunciar objetivo, produto e critérios de qualidade no início; recolher uma entrega curta de todos os pares. | A1; T03, T10 | Antes do minuto 3, o aluno sabe o que entrega. O fecho recolhe decisão, cenário, spec/teste, resultado observado e revisão/retoma, sem exigir apresentações de todos em três minutos. |
| C08 | Contextualizar o microprocesso e os stakeholders; recolher uma previsão antes de revelar D1 e fixar quem representa o aprovador. | T02, T05 | O aluno distingue facto, proposta e decisão humana, aponta o decisor e uma exceção e explica por que autorizar não prova saída física. D1 continua uma referência didática, sem alterar silenciosamente o negócio. |
| C09 | Corrigir o cenário incompleto e distinguir regra, contrato do simulador e desenho técnico. | T04, T06 | O cenário explicita pagamento confirmado e entradas válidas. O aluno prevê VALID no limite pago, EXPIRED um milissegundo depois e UNPAID sem pagamento; não atribui ISO/HTTP/função pura ao enunciado original. |
| C10 | Mostrar o alcance de cada verificação e os retornos por tipo de falha. | A8; T07; M07, metodologista S05 | O aluno distingue revisão com o responsável, validate documental e testes; perante uma falha, examina código, teste e expectativa antes de escolher o retorno. |
| C11 | Definir o vocabulário no primeiro uso e distinguir papel, perfil, sessão e modelo. Nova sessão é obrigatória para o ensaio de handoff; segundo modelo já preparado é opcional. | A6, A7; T11, T12; metodologista S04 | O aluno explica os papéis de ORCA/OpenCode/Ollama e conclui a retoma com um só modelo local, declarando o identificador real. O gráfico não é interpretado como benchmark equivalente. |
| C12 | Projetar âmbito e custo: simulação, sem pagamentos/cancelas reais; percurso local sem cartão/subscrição; cloud gratuita opcional. Atribuir honestamente os contributos. | A1, A8; T11, T12; M03 | O aluno sabe os limites e consegue concluir sem novos serviços. Distingue app/testes preparados, pequena função local integrada e ensaios separados de revisão e execução. |
| C13 | Definir OpenSpec, problema resolvido, responsabilidades e limites antes do inventário de pastas. | Aluno B1; docente S01; metodologista S01 | Só com os slides, o leitor define OpenSpec, distingue ferramenta, especificação, modelo e Git e explica por que a regra persiste entre sessões. |
| C14 | Ensinar command, skill e perfil de agent com exemplos locais, além de modelo/cliente/tools. | Aluno B2; docente S02; metodologista S02 | O leitor classifica os elementos, identifica as superfícies e explica que instruções não concedem permissões nem iniciam processos sozinhas. Não há seta automática command → skill sem evidência. |
| C15 | Mostrar um exemplo contínuo, com local de entrada, contexto lido, executor autorizado e operação que efetivamente escreve. | Aluno B3, B4; docente S03; metodologista S03 | O leitor percorre do pedido até evidência sem notas. Distingue obter instructions de implementar e não atribui criação de ficheiros ao analista sem edição. |
| C16 | Projetar uma reprodução concreta: expectativa, dados, comando, observação e limite da conclusão. | Docente S04; metodologista S04, S05 | A evidência existente é identificada como gravada ou em direto; uma afirmação do modelo não substitui a saída. O aluno consegue reproduzir o caso e escolher o retorno correto. |

As propostas de correção da configuração e dos scripts são trabalho de suporte futuro, não alterações realizadas neste ciclo. Se forem implementadas, exigem verificações adequadas e os testes/build previstos pelo repositório para alterações funcionais.

## Contexto indispensável no conteúdo visível

A próxima versão deve cobrir os pontos seguintes nos próprios slides, com o mesmo exemplo do parque:

1. **O que é OpenSpec e que problema resolve.** Um workflow e ferramentas para manter especificações de comportamento e alterações em ficheiros, apoiando o trabalho de pessoas e agentes. Explicar o que acrescenta a um pedido no chat. Distinguir da aplicação, do modelo e do Git; estrutura válida não garante requisito correto nem programa correto.
2. **O que é um fluxo agêntico.** Objetivo e limites → contexto → modelo propõe ação → cliente verifica permissões → ferramenta executa → resultado regressa ao modelo → próxima ação ou paragem. Identificar decisão humana e evidência em cada ponto relevante.
3. **Command de chat e comando de terminal.** `/opsx-propose validate-garage-exit` é entrada na integração OpenCode; `openspec status --change validate-garage-exit --json` é uma chamada CLI no terminal. Mostrar o local de introdução e a saída de cada um. ORCA organiza as sessões; não se deve colar um slash command num terminal como se fosse CLI.
4. **Skill.** Conjunto de instruções reutilizáveis que pode ser carregado pelo cliente/agente, aqui exemplificado por um `SKILL.md`. Não é um modelo nem uma ferramenta que executa sozinha. Carregar instruções consome contexto. Não desenhar como obrigatório um salto command → skill se a integração concreta não o faz.
5. **Agent e perfil de papel.** Mostrar instruções, modelo, contexto e permissões de um perfil, distinguindo o papel do modelo que o executa. O perfil analista atual é de leitura; não pode, por si, criar artefactos ou executar CLI. A transição para uma pessoa ou perfil autorizado a escrever tem de ser explícita.
6. **Um exemplo completo.** Pedido com ambiguidade → decisão humana identificada → planeamento em ficheiros → aprovação → pedido limitado de implementação → diff e teste observado → revisão sem edição → consolidação ou pendência → handoff e nova sessão. Cada passo tem ator, entrada, ação/local, saída e condição para avançar. Resultado esperado, suspeita de um modelo e saída realmente observada devem ter rótulos diferentes.

Na inspeção local, `.opencode/commands/opsx-propose.md` e `.opencode/skills/openspec-propose/SKILL.md` contêm instruções de workflow semelhantes. Isso não prova uma chamada automática de um ao outro. `scripts/run-agent.mjs` seleciona perfil/modelo e envia um prompt; também não prova que a skill tenha sido carregada. Estes detalhes devem ser ensinados com a integração realmente usada, sem uma cadeia simplificada mas falsa.

## Divergências e decisões editoriais

- **Gravidade da transição para OpenSpec:** existe consenso sobre a lacuna, não sobre o rótulo P0/P1. Para o escritor, é uma correção obrigatória antes de tratar o percurso como autónomo. A existência de um checkpoint não torna visível o passo em falta.
- **Número de slides:** inicialmente o metodologista sugeriu 20, o aluno aproximadamente 22 e o docente redistribuição sem fixação. No suplemento, o aluno passou a sugerir cerca de 24; docente e metodologista deixaram a contagem livre. O requisito de auto contenção torna as contagens provisórias. Não conservar os 22 nem os três blocos de cinco por simetria. Primeiro fechar conceitos, exemplo e ações; depois dividir em slides legíveis e ajustar o tempo.
- **Gerar ou inspecionar os artefactos em aula:** ambos são percursos possíveis, mas não podem ficar misturados. A proposta do escritor é preparar estrutura/modelos antes da aula e tornar explícito o que o grupo completa, aprova e verifica. Gerar a app inteira ou quatro documentos extensos do zero não é objetivo desta sessão.
- **Agente completo ou pacote curto:** a evidência atual sustenta a pequena função e tarefas separadas de leitura/teste, não o fluxo autónomo integral cronometrado. O pacote curto pode ser base, com integração humana declarada e uma demonstração real separada de ferramentas. Promover o percurso de agente completo a base exige ensaio registado.
- **Arquivo por todos os grupos:** o metodologista propõe reservar uma operação curta; o docente admite demonstração pelo formador. A próxima escrita deve escolher e declarar uma opção. Não acrescentar ambas silenciosamente ao fecho.

## Proposta de organização para o próximo storyboard

Isto é uma proposta do escritor, ainda não ensaiada. Não fixa a contagem de slides.

| Minutos | Conteúdo/ação |
| --- | --- |
| 00–03 | Objetivo, entrega, âmbito simulado, breve definição de OpenSpec e uma entrada/saída do exemplo |
| 03–07 | Microprocesso, stakeholders, ambiguidade e previsão antes de D1 |
| 07–10 | Ciclo de desenvolvimento e rastreabilidade da decisão |
| 10–16 | Fluxo agêntico; modelo/cliente/tools, commands, skills e agents com exemplo |
| 16–19 | Contexto pequeno, contributos locais e crítica refutada por execução |
| 19–27 | Definição de OpenSpec, artefactos, cenário completo e percurso real de propose/apply/archive |
| 27–30 | Receita visível da prática, condições de avanço e recuperação |
| 30–33 | Branch própria e baseline preparada |
| 33–40 | Analisar, registar decisão e completar/rever artefactos da alteração |
| 40–47 | Implementar uma função pequena, integrar e executar testes |
| 47–52 | Rever com inputs declarados e reproduzir uma observação |
| 52–54 | Confirmar tarefas, validar e consolidar ou registar pendência |
| 54–57 | Handoff e retoma por nova sessão; outro modelo apenas se já preparado |
| 57–60 | Entrega de todos e duas respostas orais amostradas |

A teoria/demonstração ocupa 30 minutos e a prática outros 30. Caso a auto contenção exija mais slides, aumentar a contagem sem reduzir letra ou esconder instruções nas notas; retirar repetições e não somar conteúdo ao relógio. Um ensaio deve mostrar se o ritmo resulta, incluindo uma máquina lenta e uma falha de modelo.

## Critério de fecho do próximo ciclo

Os mesmos três pontos de vista devem rever a versão escrita. Além da correção factual/visual, o aluno precisa de conseguir responder, só com os slides: o que é OpenSpec; para que serve; o que distingue command, skill e agent; quem executa uma ferramenta; onde se escreve cada comando; que ficheiros surgem; quem aprova; como se testa e como se retoma. As lacunas operacionais precisam de evidência de ensaio, não apenas texto mais confiante.

O PPTX desta revisão mantém o SHA-256 registado no protocolo. Não foram executados modelos locais nem repetidos testes/build da aplicação neste ciclo. As conclusões são documentais e visuais; falta validação com pessoas reais.
