# ORCA local setup

Este guia usa ORCA como gestor de worktrees e sessões, OpenCode como agente e Ollama como fornecedor local. ORCA não fornece um modelo: inicia CLIs de agentes que já estejam instaladas e autenticadas. Com o modelo Ollama, os pedidos ficam no computador e não exigem subscrição, API paga ou cartão. O download dos pesos usa internet e ocupa disco.

## Estado confirmado neste computador

- `orca` 1.4.237, OpenCode 1.19.5, OpenSpec 1.13 e Ollama estão instalados.
- O agente instalado é `opencode`; confirmar no Orca com `orca agent-context` ou na lista de agentes da aplicação.
- `qwen3.5:4b-orca` é o único modelo Qwen distinto instalado: ID local `86cc92158529`, 4.2B parâmetros, Q4_K_M, ferramentas e contexto efetivo de 65 536 tokens na configuração Ollama existente.
- `qwen3.5:4b` e `qwen3.5:4b-q4_K_M` têm ambos o ID `d8b0f5e9760c`. São o mesmo modelo e não demonstram diversidade.
- O ID de modelo que OpenCode/ORCA reconhecem nesta instalação é `ollama/qwen3.5:4b-orca`. A configuração global existente aponta para `http://127.0.0.1:11434/v1` e só ativa o fornecedor local Ollama. Não é necessário alterar essa configuração global para usar a instalação existente.

Este inventário é local e pode mudar. Antes da aula, repetir `ollama list`, `ollama show qwen3.5:4b-orca`, `opencode --version` e `orca --version`. A disponibilidade de um modelo no Ollama não garante que faça uma tarefa bem: executar primeiro um pedido pequeno com chamadas a ferramentas.

## Configuração opcional no repositório

Os exemplos estão em [`../workshop-config/`](../workshop-config/). São modelos para copiar ou adaptar, não alterações globais:

- `opencode.ollama.example.json`: configuração local OpenCode compatível com o formato instalado nesta máquina.
- `prompts/analyst.md`, `prompts/builder.md` e `prompts/reviewer.md`: pedidos curtos com âmbito e entregáveis delimitados.
- `prompts/reviewer-gemma3.md`: revisor para uma segunda família, apenas depois de instalar e confirmar `gemma3:4b`.

OpenCode procura agentes de projeto em `.opencode/agents/`. Para ativar perfis Markdown no clone:

```sh
mkdir -p .opencode/agents
cp workshop-config/prompts/analyst.md .opencode/agents/analyst.md
cp workshop-config/prompts/builder.md .opencode/agents/builder.md
cp workshop-config/prompts/reviewer.md .opencode/agents/reviewer.md
```

Os perfis são primários para cada sessão. O perfil `reviewer-gemma3.md` pode ser copiado para `.opencode/agents/reviewer.md` quando Gemma 3 estiver disponível; não manter dois perfis com o mesmo nome. Se o projeto já tiver `opencode.json`, combinar as definições do exemplo com o ficheiro existente em vez de o substituir. O formato instalado neste computador usa `provider` e `enabled_providers`; a documentação de versões mais novas pode mostrar nomes diferentes.

Verificar Ollama, o agente e os modelos sem imprimir credenciais:

```sh
ollama list
ollama show qwen3.5:4b-orca
opencode models ollama
orca agent-context
orca status --json
```

Ollama precisa de estar em execução. A app Ollama normalmente inicia o serviço. Se não estiver, iniciar o serviço pelo método habitual do sistema e confirmar que responde em `127.0.0.1:11434`; não alterar a exposição de rede para usar apenas no mesmo computador.

## Lançar sessões no ORCA

No terminal aberto na raiz do projeto, confirmar o runtime e o repositório no ORCA:

```sh
orca status --json
orca repo list --json
```

Para criar um worktree isolado com OpenCode e Qwen local:

```sh
orca worktree create \
  --name analise-saida \
  --agent opencode \
  --model ollama/qwen3.5:4b-orca \
  --surface terminal \
  --setup skip \
  --prompt "$(cat workshop-config/prompts/analyst.md)" \
  --json
```

Para abrir uma sessão adicional noutro worktree, usar `orca agent launch --worktree path:<caminho> --agent opencode --model <provider/model> --prompt "..." --json`. Para modelos de chat com esforço configurável, ORCA aceita `--effort <nível>` quando `--model` também é indicado; Ollama não expõe níveis de esforço para este modelo.

As opções de lançamento são explícitas por sessão. Se forem criados três terminais com o mesmo `--model`, isso são três agentes/sessões, mas não três modelos diferentes. A tarefa da pessoa coordenadora tem de indicar qual agente corre primeiro, o que pode editar e como entregar a evidência.

### Demonstração com dois modelos distintos

O catálogo local atual só contém a família Qwen. Para ter um implementador e um revisor de famílias diferentes, instalar previamente outro modelo local, sem fornecedor cloud:

```sh
ollama pull gemma3:4b
ollama list
ollama show gemma3:4b
```

Só avançar quando `ollama list` mostrar `gemma3:4b` e o `show` confirmar o modelo. O ficheiro `prompts/reviewer-gemma3.md` fixa o revisor nessa família com `ollama/gemma3:4b`. O ensaio deve executar implementação e revisão em sessões OpenCode separadas; não é necessário carregar ambos ao mesmo tempo. Uma máquina com memória limitada pode ter de descarregar o primeiro modelo antes de chamar o segundo.

ORCA passa `--model` ao agente selecionado. A instalação local OpenCode já usa o prefixo `ollama/`; não usar apenas `qwen3.5:4b-orca` em comandos ORCA. Se o modelo não aparecer ou a sessão falhar, não trocar silenciosamente para uma conta cloud: verificar o servidor Ollama e o ID, e continuar manualmente com um único modelo local se necessário.

## Papéis, sequência e controlo

1. **Analista:** só lê o excerto do enunciado e as fontes indicadas; devolve factos, ambiguidades, propostas e perguntas. A pessoa decide ambiguidades.
2. **Implementador:** recebe decisões e um único item OpenSpec; altera apenas ficheiros permitidos e executa só a validação/teste definidos no pedido.
3. **Revisor:** recebe especificação, diff e evidência; aponta defeitos com ficheiro/linha e não edita o que está a rever.

Análise e preparação de cenários de teste podem correr em paralelo se os ficheiros forem distintos. A implementação espera pela decisão. A revisão espera pelo diff. Em trabalho paralelo, atribuir um conjunto de ficheiros diferente a cada agente ou usar worktrees separados. Rever diffs antes de integrar.

ORCA também tem comandos de orchestration para criar runs, tarefas, workers e mensagens. Criar uma run ou tarefa não inicia por si só um agente; a distribuição exige uma ação explícita de dispatch/worker. Para esta aula, os worktrees e prompts explícitos são a sequência mais simples de observar. Ver `orca orchestration --help` antes de preparar uma demonstração de dispatch.

## Referências

- [ORCA: referência CLI](https://www.onorca.dev/docs/cli/reference) e [agentes suportados](https://www.onorca.dev/docs/agents/supported).
- [OpenCode: fornecedores](https://opencode.ai/docs/providers/) e [agentes](https://opencode.ai/docs/agents/).
- [Ollama: integração OpenCode](https://docs.ollama.com/integrations/opencode).

