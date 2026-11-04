# Checkpoints e recuperação

Cada checkpoint tem uma branch de referência. Os commits principais 00 a 03 seguem a evolução do exercício. As branches podem incluir commits adicionais de manutenção dos materiais e da configuração, preservando o estado funcional de cada etapa. O trabalho de cada estudante fica numa branch própria.

## Início da prática

```sh
git clone https://github.com/claudio-aa/OpenSpec-Demo.git
cd OpenSpec-Demo
git switch -c trabalho/grupo-01 origin/checkpoint/00-starter
npm ci
npm test
npm run build
npm start
```

O repositório é inicialmente privado. O formador prepara os acessos ou distribui uma cópia antes da aula. A sessão não inclui esperar por convites ou instalar dependências.

## Pontos de referência

| Branch | Conteúdo | Critério |
| --- | --- | --- |
| `checkpoint/00-starter` | Interface, servidor e função por implementar | App inicia e testes de infraestrutura passam |
| `checkpoint/01-spec-approved` | Proposal, spec, design e tasks | Decisões e cenários aprovados, validação OpenSpec passa |
| `checkpoint/02-implemented` | Regra e testes de negócio | Testes e build passam |
| `checkpoint/03-complete` | Spec consolidada, arquivo e handoff | Estado persistido para nova sessão |
| `checkpoint/04-change-proposed` | Change `validate-attendant-payment` proposta e não aplicada, que modifica a spec `garage-exit` já arquivada; só D8 aprovada, D7, D9 e D10 por aprovar | Validação OpenSpec passa e `npm test` continua igual ao checkpoint 03 |
| `checkpoint/05-change-applied` | Change `validate-attendant-payment` aplicada e por arquivar: janela por ponto de pagamento, interface, 42 testes, `npm run demo` | `npm test` 42/42, `npm run build`, `npm run demo` 13/13 e `openspec validate --strict` passam |
| `checkpoint/06-new-capability-proposed` | Change `add-park-occupancy` proposta e não aplicada: cria a capability nova `park-occupancy` com `## ADDED Requirements`, independente de `garage-exit`; D11 a D18 por aprovar. A change `validate-attendant-payment` continua ativa e intocada | Validação OpenSpec passa e `npm test` continua igual ao checkpoint 05 |

## Recuperação sem perder o trabalho

Antes de trocar de branch, guardar as alterações num commit próprio. Se existir trabalho incompleto, um commit WIP na branch do grupo preserva-o.

```sh
git status --short
git add README.md
git commit -m "WIP: guardar alterações do grupo"
```

Substituir `README.md` pelos ficheiros que se pretende guardar. Inspecionar o diff antes de adicionar. Não usar `reset --hard` nem apagar a branch do grupo para recuperar tempo.

Criar outra branch a partir de um checkpoint:

```sh
git switch -c trabalho/grupo-01-retoma origin/checkpoint/01-spec-approved
```

Para inspecionar uma etapa sem mudar a pasta atual, usar um worktree:

```sh
git worktree add ../openspec-referencia origin/checkpoint/02-implemented
```

O worktree de referência fica em detached HEAD, adequado para leitura. Para o editar, criar uma branch própria nesse worktree.

## Comparação das etapas

```sh
git diff origin/checkpoint/00-starter..origin/checkpoint/01-spec-approved -- openspec
git diff origin/checkpoint/01-spec-approved..origin/checkpoint/02-implemented -- server test
git log --oneline --all --decorate
```

Git guarda snapshots verificáveis. O chat ajuda a executar uma tarefa, mas o checkpoint e os artefactos permitem que outro agente ou estudante a retome.
