# Workflow com contexto limitado

O percurso base usa ORCA e um modelo local para manter a aula independente de quotas externas. Uma sessão gratuita de cloud pode ajudar a analisar ambiguidades ou rever uma pequena alteração. O trabalho continua quando essa sessão acaba, porque o estado útil está em ficheiros versionados.

## Fluxo de trabalho

| Etapa | Responsável | Entrada pequena | Saída verificável |
| --- | --- | --- | --- |
| Análise | Agente analista | Excerto do enunciado e objetivo | Factos, ambiguidades e propostas |
| Decisão | Pessoa responsável pelo processo | Perguntas e opções | Decisões identificadas e aprovadas |
| Especificação | Agente com OpenSpec | Decisões e templates da alteração | Proposal, spec, design e tasks |
| Implementação | Agente local | Artefactos da alteração e ficheiros necessários | Diff pequeno e testes |
| Revisão | Outro modelo disponível | Spec, diff e resultado dos testes | Falhas concretas ou evidência de conformidade |
| Consolidação | Pessoa e CLI OpenSpec | Evidência aceite | Specs atualizadas e alteração arquivada |

O modelo não toma decisões de negócio em nome do cliente. OpenSpec também não garante que uma análise está correta: organiza os artefactos e valida a sua estrutura. A pessoa continua a validar o significado e os testes validam o comportamento implementado.

## Modelos e papéis

O modelo `qwen3.5:4b-orca` é a referência local instalada. Os nomes `qwen3.5:4b` e `qwen3.5:4b-q4_K_M` têm o mesmo identificador local e não contam como dois modelos independentes. Uma configuração diferente do mesmo modelo também não prova diversidade de raciocínio.

Para demonstrar modelos distintos, o revisor usa Qwen 3 4B (`qwen3:4b-reviewer`) e o implementador usa Qwen 3.5 4B. São gerações e pesos diferentes, ainda da família Qwen. Uma família diferente pode fornecer outra perspetiva, sem garantir que a revisão encontra todos os erros. Um analista ou revisor gratuito na cloud é uma extensão opcional. Não pressupor que uma sessão gratuita de navegador fornece uma API para ORCA. A configuração concreta e os limites ficam em [orca-setup.md](orca-setup.md).

Evitar quatro agentes a gerar planos completos para a mesma tarefa. Neste recorte, basta um analista, um implementador e uma revisão curta. A análise e o esboço independente dos testes podem decorrer em paralelo. A implementação depende das decisões, e a revisão depende do diff.

## Orçamento de contexto

Definir um pedido com objetivo, ficheiros a ler, ficheiros a editar, restrições e critério de conclusão. Começar por um pacote escrito de aproximadamente 600–1 200 palavras para a tarefa, ajustado após o ensaio. Este é um objetivo de escrita, não uma medição de tokens nem uma garantia de caber no contexto.

O contexto real inclui instruções do sistema, ferramentas, skills, ficheiros e resultados dos comandos. Os comandos OpenSpec gerados também têm um custo. Não poupar contexto cortando critérios de aceitação. Poupar com alterações menores, saídas curtas, pesquisas dirigidas e sessões novas com handoff.

- Manter uma alteração ativa de cada vez e poucos cenários relevantes.
- Usar a CLI para scaffold, estado e validação, sem pedir ao modelo para reproduzir o terminal.
- Não enviar o DOCX inteiro, o repositório todo ou logs completos em cada tarefa.
- Ler todos os artefactos exigidos pela operação OpenSpec. Mantê-los pequenos em vez de omitir contexto obrigatório.
- Limitar as tentativas de reparação. Após duas tentativas sem progresso, registar o erro e reduzir a tarefa ou usar o checkpoint.
- Medir tokens apenas quando a ferramenta os reporta. Na interface gratuita de chat, registar número de pedidos, tempo e limites observados, sem inventar uma contagem de tokens.

## Comandos e fronteiras

Os comandos `openspec ...` correm no terminal. Nesta instalação, os comandos gerados para OpenCode usam hífen:

```text
/opsx-propose validate-garage-exit
/opsx-apply validate-garage-exit
/opsx-archive validate-garage-exit
```

A documentação genérica pode mostrar `/opsx:propose`. Confirmar sempre os nomes que a integração gerou. ORCA pode executar a CLI e seguir os artefactos sem suportar os mesmos slash commands de OpenCode.

```sh
openspec status --change validate-garage-exit --json
openspec instructions apply --change validate-garage-exit --json
openspec validate validate-garage-exit --strict --no-interactive
```

O comando de apply normal pode continuar por todas as tarefas. Para a aula, instruir explicitamente o agente a executar apenas a tarefa identificada e parar. O modelo lê os artefactos devolvidos pelas instruções, executa o trabalho limitado e regista a evidência. Antes de arquivar, confirmar os testes, as tarefas e os cenários.

## Opções gratuitas

Verificação documental em 2 de novembro de 2026. A disponibilidade real deve ser confirmada antes de cada aula.

| Opção | Papel possível | Condição para usar |
| --- | --- | --- |
| Ollama local | Implementação e revisão de recurso | Modelo descarregado e ensaio de ferramentas concluído |
| ChatGPT Free no navegador | Análise ou revisão curta, com transferência manual | Acesso gratuito disponível na conta, sem subscrição paga nem API presumida |
| GitHub Copilot Free | Revisão ou apoio alternativo | Ativação gratuita sem cartão, quota disponível |
| Benefício GitHub Education | Modelo adicional opcional | Elegibilidade e ativação concluídas antes da aula |
| Gemini API Free Tier | Integração opcional após ensaio | Projeto elegível, sem billing nem cartão |

O GitHub anuncia Copilot Free sem cartão. O benefício de estudante exige verificação e pode demorar a ativar. Google distingue Free Tier de paid tier e avisa que alguns projetos não são elegíveis. Se a ativação apresentar pagamento obrigatório, essa opção fica fora deste workshop. [Copilot Free](https://github.com/features/copilot), [benefício de estudante](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/enable-copilot/set-up-for-students), [Gemini billing](https://ai.google.dev/gemini-api/docs/billing), [elegibilidade Gemini](https://ai.google.dev/gemini-api/docs/troubleshooting).

O acesso gratuito e os limites de OpenAI dependem do produto e da conta. Não usar as condições de uma aplicação como prova de acesso gratuito por API ou por terceiros. [Documentação oficial de planos e uso](https://learn.chatgpt.com/docs/pricing).

Referências técnicas: [OpenSpec](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md), [OpenCode com Ollama](https://opencode.ai/docs/providers/#ollama), [integração Ollama](https://docs.ollama.com/integrations/opencode). As recomendações de contexto entre estas ferramentas diferem. O ensaio deve confirmar memória, velocidade e ferramentas na configuração efetiva, sem prometer que um contexto maior resolve todas as falhas.
