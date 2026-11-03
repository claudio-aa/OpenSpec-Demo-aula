# Ciclo 02 — parecer independente de docente

Data: 2026-11-03. Perspetiva simulada de um docente de Análise de Sistemas do 3.º ano de Informática; não constitui validação curricular institucional.

**Veredito: satisfeito no plano documental, para o percurso guiado e preparado que os slides agora declaram.** Não identifiquei P0 ou P1 pedagógicos remanescentes. Há três melhorias P2. Este veredito não certifica a duração numa turma nem uma execução autónoma completa por agentes.

## Objeto e critério

Candidato congelado: `presentation/output/workshop-agentes-openspec-autocontido.pptx`, SHA-256 confirmado `bf396f4cf7b7eaa19c48128763145fd75303252db0925bb3c2191782748d7cd3`.

Lidos primeiro README e AGENTS. Inspecionados o texto visível do PPTX por ZIP/XML, `presentation/slides.json` e todos os 34 renders `presentation/.build/slide-01.png` a `slide-34.png`. A avaliação da autonomia usa o conteúdo projetado; as notas não compensaram omissões. Consultei o meu parecer anterior e a evidência técnica expressamente disponibilizada em `runtime-evidence.md`, sem consultar pareceres de outros revisores. Confirmei também a spec da referência 01 e que o script de pacotes tem o mesmo objeto Git nas referências 00 e 02.

O critério forte foi: os slides devem ensinar conceitos, distinções, sequência e critérios de conclusão, sem depender de explicações essenciais ocultas. Usar o repositório como objeto da prática é compatível com isso quando os slides indicam a operação, os ficheiros a abrir, o que verificar e quem decide. Não exigi reproduzir a totalidade da spec nos slides nem executar um builder completo que o próprio percurso exclui.

## Matriz dos achados anteriores

“Resolvido” significa resolvido documentalmente no âmbito agora declarado, não resultado observado com alunos.

| Achado do ciclo 01 | Estado no ciclo 02 | Evidência visível e limite |
| --- | --- | --- |
| T01 — Texto analítico sem ponte para artefactos | **Resolvido** | 15 e 23–24 identificam a pessoa, o restauro da referência 01, os quatro ficheiros, a revisão e a aprovação. Não se atribui escrita ao analista sem edição. |
| T02 — Processo e responsáveis ausentes | **Resolvido no recorte; P2 residual R01** | 3–5 mostram condutor, sistema, responsável, decisão e fronteira entre autorizar e sair. Não substituem uma análise BPR/UML completa, que também não é agora prometida. |
| T03 — Objetivos/entrega pouco visíveis | **Resolvido; precisão P2 em R02** | 2 anuncia aprendizagem e entrega; 32/34 explicitam os elementos que permitem apreciar a compreensão e a evidência. |
| T04 — Cenário sem pagamento confirmado | **Resolvido** | 5 explicita pagamento e dados válidos e contrasta UNPAID; 30 executa `paid:true`, dois instantes e a duração exata. |
| T05 — Solução revelada antes da elicitação/decisor variável | **Resolvido** | 4 recolhe previsão antes de 5 revelar D1. O docente representa o responsável; 22/24 conservam a aprovação humana. |
| T06 — Requisito e design confundidos | **Resolvido** | 7 distingue regra, contrato e desenho; declara que ISO/HTTP/funções são escolhas do simulador. |
| T07 — Validação/verificação indistintas | **Resolvido** | 18 distingue adequação da regra, estrutura documental e concordância código/expectativa. 24 distingue planeamento done de código concluído. |
| T08 — Ritmo e recuperação indefinidos | **Correção documental satisfeita; ensaio em aberto** | 19–34 distribuem a prática em fases; 22/26/33 têm limite de 90 s e alternativa; 25/28 preservam tentativa e referência. Ainda não se mediu o percurso total com uma dupla. |
| T09 — Arranque contraditório | **Resolvido na projeção** | 20–21 dão uma rota, URL, terminais A/B, três testes iniciais e NOT_IMPLEMENTED. 25 atualiza também o teste HTTP preparado. |
| T10 — Fecho que não escala/autoria obscura | **Resolvido** | 34 recolhe branch e HANDOFF de todos, sem fila de apresentações. 32 exige contributos, referência usada, resultados e limites reais. |
| T11 — Limites/custos fora dos slides | **Resolvido** | 2/16 declaram base local sem pagamento/cartão/subscrição; 21 exclui pagamentos/cancelas reais e prova de saída; 29/33 evitam instalação/troca obrigatória de modelo. |
| T12 — Papéis propostos confundidos com contributos | **Resolvido** | 13/15 delimitam o percurso humano; 17 identifica ensaios separados, revisão textual, testes preparados e integração humana. |
| S01 — Definição/propósito de OpenSpec ausentes | **Resolvido** | 6 define ferramenta/workflow, problema, CLI, pessoa e agente; 8 distingue artefactos ativos e localização após arquivo. |
| S02 — Commands/skills/agentes/ferramentas | **Resolvido; redação P2 em R03** | 9–13 distinguem modelo, cliente, agente, tool, comando de chat, CLI, skill e perfil com permissões. |
| S03 — Exemplo completo não exequível | **Resolvido pela rota preparada explícita** | 15 resume atores/entregas; 20–30 mostram comandos, restauros, integração e reprodução; 31 mantém alteração do grupo ativa e só inspeciona o arquivo 03. Não se apresenta esta rota como edição autónoma de ponta a ponta. |
| S04 — Expectativa e observação sem reprodução | **Resolvido** | 5 fixa expectativa; 28 identifica teste e resultados reais a registar; 30 mostra comando, pedido pago, saída gravada e limite da conclusão. |

## Achados remanescentes

### R01 — Identificar como proposta a intervenção do vigilante — P2

**Slide/evidência:** 3 termina com “Vigilante trata exceções”, sem marcar essa atribuição como proposta ou decisão de referência. O diagrama identifica o sistema como simulado, mas a frase pode ainda ser lida como facto operacional da fonte. O enunciado refere vigilante e pagamento, sem definir genericamente o tratamento de todas as exceções.

**Impacto:** enfraquece ligeiramente a distinção entre fonte e proposta, importante para Análise de Sistemas. Não altera a função implementada nem bloqueia a prática.

**Correção concreta:** escrever “Proposta para este recorte: vigilante trata exceções, sujeita a aprovação” ou retirar a atribuição e manter “Tratamento de exceções a validar com o responsável”. Não é necessário acrescentar um slide ou implementar uma exceção.

**Aceitação:** só pela leitura do slide, o aluno distingue a atribuição proposta do facto dos 15 minutos e identifica quem a aprovaria.

### R02 — Afinar o verbo do objetivo à atividade efetivamente avaliada — P2

**Slides/evidência:** 2 anuncia “Especificar e verificar”; 15/23 declaram que a especificação é preparada e o grupo a revê/aprova. 34 avalia explicação e rastreabilidade, não produção de uma spec original.

**Impacto:** pode criar uma expectativa superior à evidência recolhida. Aprovar criticamente uma referência é uma atividade válida, mas não demonstra por si a capacidade de escrever uma especificação de raiz. A autoria está suficientemente explicitada para isto não constituir um bloqueio.

**Correção concreta:** ajustar a primeira frase para “Analisar, aprovar uma especificação e verificar uma autorização de saída simulada”. Se se quiser manter “especificar”, pedir uma pequena contribuição observável, como reescrever um cenário completo antes de o comparar com a referência, dentro do tempo já reservado.

**Aceitação:** o objetivo visível corresponde exatamente ao produto do aluno e aos critérios da entrega, sem atribuir-lhe a autoria dos artefactos preparados.

### R03 — Clarificar a relação command/skill numa frase ambígua — P2

**Slide/evidência:** 12 termina com “Command não prova a sua carga”. O referente de “sua” é pouco claro numa distinção que está a ser ensinada pela primeira vez.

**Impacto:** uma dúvida local de linguagem pode levar o aluno a pensar que o command falha a carregar o próprio texto, quando o ponto relevante é não inferir que a skill foi carregada.

**Correção concreta:** substituir por “Invocar um command não prova que uma skill foi carregada”. Conservar a explicação de que carregar instruções não inicia processos nem aumenta permissões.

**Aceitação:** o leitor explica que command e skill são mecanismos de instrução distintos nesta instalação e que a invocação de um não demonstra a utilização do outro.

## Ritmo, evidência e limites do veredito

Os intervalos visíveis e os valores em `slides.json` somam **30 minutos de conceitos/exemplos (1–19) e 30 minutos de prática (20–34)**. Os 34 slides não são, por si, excesso: os práticos funcionam como passos curtos de um procedimento. Todos os renders foram legíveis nesta inspeção, incluindo comandos e código; não detetei corte ou sobreposição que impedisse seguir o conteúdo.

A prática permanece exigente: cada fase dura dois minutos e quatro artefactos têm de ser revistos entre 36–40. A redução de âmbito, as referências preparadas e os limites de espera tornam o plano documentalmente defensável. É preciso ensaiar na máquina prevista para a turma e observar o tempo de leitura e discussão, além do tempo de inferência. A evidência runtime relata testes/build e uma função local integrada por uma pessoa; declara expressamente que não mediu os 30 minutos nem foi uma sessão ORCA com alunos. Não a usei para preencher conteúdo ausente dos slides nem como prova de aprendizagem.

A leitura do deck permite agora explicar o propósito de OpenSpec, distinguir commands/skills/perfis/modelos/tools, localizar a aprovação humana e seguir uma rota concreta desde análise até evidência e retoma. A geração de texto sem ferramentas, a integração humana e a execução efetiva são identificadas. O arquivo 03 é uma referência inspecionada; a alteração do grupo permanece ativa, coerentemente com o handoff.

Este parecer não certifica BPR/UML completa, autonomia multiagente de ponta a ponta, licenças externas, comportamento em todas as máquinas ou resultados de aprendizagem de alunos reais. Não executei testes/build nesta revisão e não atribuo a mim a execução reportada em runtime-evidence. Não consultei pareceres de colegas. Só foi criado este ficheiro; não se alteraram deck, fontes, código, HANDOFF ou commits.

**Próximo passo recomendado:** aplicar as pequenas clarificações P2 quando conveniente e realizar um ensaio de 60 minutos com uma dupla, usando apenas os slides e o clone preparado. Registar onde precisou de explicação adicional, tempo real de revisão dos artefactos e evidência que conseguiu justificar no fecho. A ausência desse ensaio limita o veredito à suficiência documental; não converte automaticamente a sua viabilidade numa falha já demonstrada.
