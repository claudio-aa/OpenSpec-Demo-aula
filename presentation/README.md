# Apresentação do workshop

[Abrir a apresentação revista](output/workshop-agentes-openspec-reestruturado.pptx)

22 slides editáveis, em português europeu, para uma sessão de 60 minutos com estudantes do 3.º ano de Análise de Sistemas. A introdução contém três blocos de cinco slides: ciclo de desenvolvimento, agentes e OpenSpec. Os slides 18 a 22 orientam os 30 minutos de prática guiada.

As notas do apresentador incluem a duração, o guião de condução, exemplos de prompts e as fontes. A fonte do caso é o documento fornecido no repositório. As escolhas didáticas D1 a D6 encontram-se em [BRIEF.md](../docs/BRIEF.md).

Os esquemas mostram entradas, saídas, responsáveis e retornos para correção. São objetos PowerPoint editáveis, incluindo conectores. O gráfico do slide 11 usa os valores dos ensaios locais e inclui uma folha de dados incorporada. O [registo de contributos](../docs/CONTRIBUTIONS.md) distingue geração de código, execução de ferramentas e preparação dos testes. O [mapa pedagógico](../docs/TEACHING-FLOW.md) explica o objetivo e a implicação de cada um dos 15 slides centrais.

A versão anterior permanece em `output/workshop-agentes-openspec.pptx` para comparação. A revisão fica num ficheiro separado porque a anterior estava aberta no PowerPoint durante a edição.

## Utilização na aula

Abrir o PPTX em PowerPoint e usar a vista de apresentador para consultar as notas. Preparar as instalações, o modelo e as dependências antes da aula. Ter o repositório disponível localmente e confirmar o acesso dos estudantes se estiver privado.

Os comandos `/opsx-propose` e `/opsx-apply` pertencem à integração OpenCode deste repositório. Para ORCA, seguir os prompts e comandos CLI do [guia de configuração](../docs/orca-setup.md). A distinção entre papéis e modelos deve ficar explícita: uma nova sessão com o mesmo modelo continua a usar o mesmo modelo.

| Slides | Minutos | Conteúdo |
| --- | --- | --- |
| 1–2 | 00–02 | Abertura e ligação entre as três peças |
| 3–7 | 02–10 | Cinco slides sobre o ciclo de desenvolvimento |
| 8–12 | 10–20 | Cinco slides sobre agentes, papéis e ferramentas |
| 13–17 | 20–30 | Cinco slides sobre o workflow OpenSpec |
| 18 | 30–34 | Branch de trabalho e ambiente |
| 19 | 34–40 | Especificação e aprovação |
| 20 | 40–48 | Implementação e testes |
| 21 | 48–57 | Revisão e handoff |
| 22 | 57–60 | Evidência e consolidação |

## Edição e reconstrução

O próprio PPTX permite editar texto, esquemas, conectores, gráfico e imagem. Para regenerar o documento:

- `slides.json` contém o texto, os intervalos de tempo e as notas.
- `build.mjs` define o desenho de 16:9 e usa `@oai/artifact-tool`.
- `diagrams.mjs` desenha os esquemas funcionais e o gráfico como objetos nativos.
- `assets/parking.png` contém a imagem extraída do enunciado.
- `.build/` contém renders e ficheiros de validação privados e fica fora do Git.

O gerador usa o runtime de apresentações fornecido pelo ambiente Codex. Não instala dependências. É possível indicar `RUNTIME_ROOT`, `RUNTIME_NODE_MODULES` e `PRESENTATIONS_SKILL` se o runtime estiver noutro local. Em reconstruções, indicar um nome novo através de `PPTX_FILENAME`, pois a finalização preserva os ficheiros existentes.

```sh
PPTX_FILENAME=workshop-agentes-openspec-rev2.pptx node presentation/build.mjs
```

Para alterar a sequência, confirmar que o total continua a ser 60 minutos e que a transição para o laboratório permanece no minuto 30. O gerador deriva a contagem de `slides.json` e verifica o gráfico nativo do slide 11, incluindo os dados incorporados.
