# Guião do workshop de 60 minutos

Público: estudantes do 3.º ano de Análise de Sistemas. Resultado: uma regra de negócio especificada e demonstrada num simulador, com evidência de testes e um handoff entre agentes/modelos.

## Preparação anterior à aula

O formador instala e ensaia ORCA, OpenSpec, Node e Ollama. Todos descarregam o repositório e as dependências antes da sessão. Confirmar o modelo local e executar um pedido com uma ferramenta, uma pequena edição e um teste. O ensaio inclui a máquina menos potente da turma. Um modelo que apenas conversa ainda não está validado para este workflow.

Usar o PPTX em `presentation/` na primeira meia hora. Ter uma cópia local, as branches de referência e o simulador compilado. Se a cloud falhar, continuar localmente. Se o agente local falhar, usar o checkpoint e discutir o resultado sem esperar por novas instalações.

## Primeiros 30 minutos com demonstrações curtas

| Minutos | Atividade | Evidência visível |
| --- | --- | --- |
| 0–3 | Objetivo, orçamento zero e plano da aula | Resultado esperado e preparação |
| 3–9 | Conversa e agente: objetivo, ferramentas, observação, ação e verificação | Um pedido delimitado e evidência do terminal |
| 9–13 | Caso de estudo e decisão na fronteira de 15 minutos | Cenários e decisão humana |
| 13–17 | OpenSpec como memória persistente | Proposal, spec, design e tasks da mesma alteração |
| 17–22 | ORCA e divisão de trabalho por modelos | Analista propõe, humano decide, implementador executa, revisor verifica |
| 22–24 | Contexto, limite de quota e handoff | Nova sessão retoma a partir dos ficheiros |
| 24–30 | Estado do protótipo e contributos reais dos modelos | Código integrado, tentativa rejeitada e falso positivo reproduzido |

A demonstração dos papéis usa pedidos sequenciais quando há dependências. Só o trabalho independente corre em paralelo. A análise de ambiguidades e a preparação de uma lista de testes podem correr ao mesmo tempo, em ficheiros distintos. O implementador aguarda as decisões aprovadas. O revisor recebe a spec e o diff depois da implementação.

Na discussão dos contributos, distinguir a preparação pelo assistente principal da pequena função gerada localmente. Mostrar que Qwen3.5 falhou a função completa e que Qwen3 produziu uma crítica incorreta. Executar um teste existente é um contributo diferente de o escrever. Usar [CONTRIBUTIONS.md](CONTRIBUTIONS.md) para a atribuição e as medições. Os pedidos de código têm âmbitos diferentes e não constituem um benchmark equivalente.

## Últimos 30 minutos de prática guiada

| Minutos | Atividade dos estudantes | Ponto de recuperação |
| --- | --- | --- |
| 30–34 | Criar branch de trabalho e executar o starter | `checkpoint/00-starter` |
| 34–40 | Analisar a regra, aprovar a fronteira de 15 minutos e produzir a spec | `checkpoint/01-spec-approved` |
| 40–48 | Pedir uma implementação pequena ao agente local | Mesma spec, ficheiros limitados |
| 48–53 | Executar testes e pedir revisão a outro modelo disponível | `checkpoint/02-implemented` |
| 53–57 | Trocar de sessão/modelo e retomar pelo handoff | `HANDOFF.md` |
| 57–60 | Consolidar a spec e explicar uma decisão e a sua evidência | `checkpoint/03-complete` |

## Condução da análise

Antes de mostrar a solução, perguntar verbalmente o que significa «15 minutos». Recolher os exemplos 14:59, 15:00 e 15:01. O agente pode identificar a ambiguidade, mas o responsável pelo processo escolhe a interpretação. Registar a decisão D1 e só depois aprovar os cenários.

No diagrama de atividades, distinguir «autorizar a saída» de «confirmar que o veículo saiu». A implementação avalia apenas a autorização. Não acrescentar sensores, multas ou tarifários para tornar a solução mais completa.

## Papéis de cada grupo

Um estudante representa o responsável pelo processo e valida decisões. Outro controla o agente e verifica os comandos. Trocar estes papéis depois da implementação. Cada grupo regista qual o modelo usado em cada tarefa. Se só houver um modelo disponível, declarar a revisão como uma segunda passagem, sem a apresentar como revisão por um modelo independente.

## Encerramento da prática

Uma tarefa está concluída quando a spec representa a decisão aprovada, os testes relevantes passam, o resultado da interface corresponde aos cenários e o revisor identifica a evidência. Um relatório do agente a dizer «feito» não substitui estes elementos.

Cada grupo entrega a branch e uma nota curta: decisão tomada, teste demonstrado, modelo usado e próxima tarefa. O docente pode avaliar a qualidade da análise mesmo que o grupo recorra a um checkpoint para recuperar tempo.
