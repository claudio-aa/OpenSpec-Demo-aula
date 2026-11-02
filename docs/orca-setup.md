# ORCA local setup

Este guia usa ORCA como gestor de worktrees e sessões, OpenCode como agente e Ollama como fornecedor local. ORCA não fornece um modelo: inicia CLIs de agentes que já estejam instaladas e autenticadas. Com o modelo Ollama, os pedidos ficam no computador e não exigem subscrição, API paga ou cartão. O download dos pesos usa internet e ocupa disco.

## Estado confirmado neste computador

- `orca` 1.4.237, OpenCode 1.19.5, OpenSpec 1.13 e Ollama estão instalados.
- O agente instalado é `opencode`; confirmar no Orca com `orca agent-context` ou na lista de agentes da aplicação.
- `qwen3.5:4b-orca` é o modelo de implementação: ID local `86cc92158529`, 4.2B parâmetros, Q4_K_M e contexto configurado de 65 536 tokens. A capacidade anunciada de ferramentas precisa de ensaio no cliente efetivo.
- `qwen3.5:4b` e `qwen3.5:4b-q4_K_M` têm ambos o ID `d8b0f5e9760c`. São o mesmo modelo e não demonstram diversidade.
- O segundo modelo do exercício é Qwen 3 4B, preparado com o alias `qwen3:4b-reviewer`. É uma geração e pesos diferentes de Qwen 3.5, embora pertença à mesma família de modelos. Isto permite comparar resultados, sem garantir erros independentes.
- O projeto inclui `opencode.json` com o fornecedor local em `http://127.0.0.1:11434/v1`. Não altera a configuração global nem ativa fornecedores pagos.

Este inventário é local e pode mudar. Antes da aula, repetir `ollama list`, `ollama show qwen3.5:4b-orca`, `opencode --version` e `orca --version`. A disponibilidade de um modelo no Ollama não garante que faça uma tarefa bem: executar primeiro um pedido pequeno com chamadas a ferramentas.

Num computador novo, preparar também o modelo base e o alias do implementador. Na máquina do formador, o alias já existia e não foi substituído:

```sh
ollama pull qwen3.5:4b
ollama create qwen3.5:4b-orca -f workshop-config/Modelfile.builder
node scripts/preflight.mjs
```

O preflight só fica totalmente satisfeito depois de preparar o segundo modelo abaixo. Os ficheiros de configuração não descarregam modelos automaticamente.

## Configuração opcional no repositório

O repositório já inclui a configuração de projeto e perfis em `.opencode/agents/workshop-*.md`. Os exemplos em [`../workshop-config/`](../workshop-config/) documentam a preparação, sem alterações globais:

- `opencode.ollama.example.json`: configuração local OpenCode compatível com o formato instalado nesta máquina.
- `prompts/analyst.md`, `prompts/builder.md` e `prompts/reviewer.md`: pedidos curtos com âmbito e entregáveis delimitados.
- `Modelfile.reviewer`: preparação de Qwen 3 4B como segundo modelo local.

Não é necessário copiar os exemplos para ativar os perfis do workshop. Confirmar o mapeamento sem chamar um modelo:

```sh
node scripts/run-agent.mjs analyst --dry-run
node scripts/run-agent.mjs builder --dry-run
node scripts/run-agent.mjs reviewer --dry-run
```

Os perfis são primários para sessões separadas. O revisor não pode editar ficheiros. O implementador só pode editar a regra e o teste de negócio. O formato instalado usa `provider` e `enabled_providers`; a documentação de versões mais novas pode mostrar nomes diferentes.

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

Registar o clone caso ainda não apareça na lista:

```sh
orca repo add --path "$PWD" --json
```

Nesta versão, o lançamento nativo com `--model ollama/...` foi recusado com `capability_unsupported`: o host não conseguiu verificar o lançamento desse modelo. O lançamento sem `--model` abriu OpenCode com o modelo local definido no `opencode.json`. Não apresentar o primeiro caminho como validado.

```sh
orca agent launch --agent opencode --surface terminal \
  --prompt "Lê prompts/01-analysis.md e realiza apenas essa análise." --json
```

Para fixar explicitamente papel e modelo pela CLI do OpenCode, abrir o script num terminal ORCA:

```sh
orca terminal create --title "Analista local" \
  --command "node scripts/run-agent.mjs analyst" --json
orca terminal create --title "Implementador local" \
  --command "node scripts/run-agent.mjs builder" --json
orca terminal create --title "Revisor local" \
  --command "node scripts/run-agent.mjs reviewer" --json
```

Estes três comandos mostram a sequência. Não os iniciar simultaneamente: a implementação espera pela aprovação e a revisão espera pelo diff. Para outras pastas, acrescentar `--worktree path:<caminho-absoluto>`. O script usa `--pure` e desativa descoberta de skills externas, downloads LSP e atualização remota do catálogo. Isto evita carregar instruções pessoais irrelevantes. [Variáveis de ambiente OpenCode](https://opencode.ai/docs/cli/).

O ensaio inicial bloqueou na API compatível. Desativar thinking com `reasoningEffort: none` nas opções de cada modelo em `opencode.json` resolveu esse caso: OpenCode leu um ficheiro com a ferramenta `read` e concluiu o pedido em cerca de19 segundos. A API nativa usa `think: false`. Não basta escrever `/no_think` no texto do pedido. A configuração de fornecedor traduz a opção para `reasoning_effort: none`, suportada pela API compatível. [Controlo de thinking Ollama](https://docs.ollama.com/api/openai-compatibility).

O ensaio de leitura não prova a qualidade da análise nem que qualquer implementação vá terminar no mesmo tempo. Usar o percurso reduzido abaixo se outra tarefa ultrapassar a janela da aula. O arranque do terminal por si só não prova que o agente terminou uma tarefa.

As opções de lançamento são explícitas por sessão. Se forem criados três terminais com o mesmo `--model`, isso são três agentes/sessões, mas não três modelos diferentes. A tarefa da pessoa coordenadora tem de indicar qual agente corre primeiro, o que pode editar e como entregar a evidência.

### Preparação do segundo modelo

Instalar antes da aula, sem fornecedor cloud:

```sh
ollama pull qwen3:4b
ollama create qwen3:4b-reviewer -f workshop-config/Modelfile.reviewer
ollama list
ollama show qwen3:4b-reviewer
```

Só avançar quando `ollama list` e o `show` confirmarem o modelo. O revisor usa `ollama/qwen3:4b-reviewer`. Não é necessário carregar os modelos ao mesmo tempo. Numa máquina com memória limitada, executar os papéis em sequência. Os pedidos reduzidos usam contexto de 8K, enquanto o perfil completo do implementador permite 64K.

O Modelfile do revisor fecha o prefixo de thinking do template Qwen3 distribuído no registo. O percurso reduzido pede saída JSON limitada. No ensaio, isso permitiu concluir uma revisão em cerca de10 segundos. O modelo produziu falsos positivos que os testes refutaram, registados em [REVIEW.md](REVIEW.md). A licença e a proveniência do template constam de `workshop-config/NOTICE.md`.

ORCA passa `--model` ao agente selecionado. A instalação local OpenCode já usa o prefixo `ollama/`; não usar apenas `qwen3.5:4b-orca` em comandos ORCA. Se o modelo não aparecer ou a sessão falhar, não trocar silenciosamente para uma conta cloud: verificar o servidor Ollama e o ID, e continuar manualmente com um único modelo local se necessário.

### Percurso reduzido para uma aula sem esperas

```sh
orca terminal create --title "Analista com pacote curto" \
  --command "node scripts/local-packet.mjs analyst" --json
orca terminal create --title "Decisão com Qwen 3.5" \
  --command "node scripts/local-packet.mjs builder" --json
orca terminal create --title "Revisão com Qwen 3" \
  --command "node scripts/local-packet.mjs reviewer" --json
```

São pedidos a modelos com entrada selecionada, sem ferramentas nem edição automática. A pessoa inspeciona a proposta, aplica-a e executa os testes no terminal. Não apresentar este percurso como um agente autónomo a editar o repositório. ORCA continua a organizar as sessões e os ficheiros OpenSpec conservam as decisões. Ver [ensaio observado](LOCAL-TRIAL.md).

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

