# Apresentação do workshop

[Abrir a apresentação PowerPoint](output/workshop-agentes-openspec.pptx)

19 slides editáveis, em português europeu, para uma sessão de 60 minutos com estudantes do 3.º ano de Análise de Sistemas. Os slides 1 a 14 apoiam os primeiros 30 minutos de explicação e demonstrações. Os slides 15 a 19 orientam a prática nos últimos 30 minutos.

As notas do apresentador incluem a duração, o guião de condução, exemplos de prompts e as fontes. A fonte do caso é o documento fornecido no repositório. As escolhas didáticas D1 a D6 encontram-se em [BRIEF.md](../docs/BRIEF.md).

Os slides 12 a 14 apresentam o estado do protótipo, a autoria da preparação e os contributos observados dos modelos locais. Incluem a função pequena integrada, a tentativa completa rejeitada e o falso positivo do revisor. O [registo de contributos](../docs/CONTRIBUTIONS.md) distingue geração de código, execução de ferramentas e preparação dos testes.

## Utilização na aula

Abrir o PPTX em PowerPoint e usar a vista de apresentador para consultar as notas. Preparar as instalações, o modelo e as dependências antes da aula. Ter o repositório disponível localmente e confirmar o acesso dos estudantes se estiver privado.

Os comandos `/opsx-propose` e `/opsx-apply` pertencem à integração OpenCode deste repositório. Para ORCA, seguir os prompts e comandos CLI do [guia de configuração](../docs/orca-setup.md). A distinção entre papéis e modelos deve ficar explícita: uma nova sessão com o mesmo modelo continua a usar o mesmo modelo.

| Slides | Minutos | Conteúdo |
| --- | --- | --- |
| 1–2 | 00–03 | Objetivo e plano da sessão |
| 3–4 | 03–09 | Chat, ferramentas e ciclo de trabalho |
| 5–6 | 09–13 | Caso, fronteira temporal e decisão humana |
| 7–8 | 13–17 | Artefactos OpenSpec e proposta limitada |
| 9–10 | 17–22 | Papéis, modelos e coordenação com ORCA |
| 11 | 22–24 | Tokens e seleção de contexto |
| 12–14 | 24–30 | Estado do demo, contributos locais e falso positivo |
| 15 | 30–34 | Branch de trabalho e ambiente |
| 16 | 34–40 | Especificação e aprovação |
| 17 | 40–48 | Implementação e testes |
| 18 | 48–57 | Revisão e handoff |
| 19 | 57–60 | Evidência e consolidação |

## Edição e reconstrução

O próprio PPTX permite editar texto, tabelas e a imagem. Para regenerar o documento:

- `slides.json` contém o texto, os intervalos de tempo e as notas.
- `build.mjs` define o desenho de 16:9 e usa `@oai/artifact-tool`.
- `assets/parking.png` contém a imagem extraída do enunciado.
- `.build/` contém renders e ficheiros de validação privados e fica fora do Git.

O gerador usa o runtime de apresentações fornecido pelo ambiente Codex. Não instala dependências. É possível indicar `RUNTIME_ROOT`, `RUNTIME_NODE_MODULES` e `PRESENTATIONS_SKILL` se o runtime estiver noutro local. Em reconstruções, indicar um nome novo através de `PPTX_FILENAME`, pois a finalização preserva os ficheiros existentes.

```sh
PPTX_FILENAME=workshop-agentes-openspec-rev2.pptx node presentation/build.mjs
```

Para alterar a sequência, confirmar que o total continua a ser 60 minutos e que a transição para o laboratório permanece no minuto 30. O gerador deriva a contagem de slides de `slides.json` e verifica as tabelas nativas nos slides 6 e 9.
