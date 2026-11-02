# Apresentação do workshop

[Abrir a apresentação PowerPoint](output/workshop-agentes-openspec-v2.pptx)

16 slides editáveis, em português europeu, para uma sessão de 60 minutos com estudantes do 3.º ano de Análise de Sistemas. Os slides 1 a 11 apoiam os primeiros 30 minutos de explicação e demonstrações. Os slides 12 a 16 orientam a prática nos últimos 30 minutos.

As notas do apresentador incluem a duração, o guião de condução, exemplos de prompts e as fontes. A fonte do caso é o documento fornecido no repositório. As escolhas didáticas D1 a D6 encontram-se em [BRIEF.md](../docs/BRIEF.md).

## Utilização na aula

Abrir o PPTX em PowerPoint e usar a vista de apresentador para consultar as notas. Preparar as instalações, o modelo e as dependências antes da aula. Ter o repositório disponível localmente e confirmar o acesso dos estudantes se estiver privado.

Os comandos `/opsx-propose` e `/opsx-apply` pertencem à integração OpenCode deste repositório. Para ORCA, seguir os prompts e comandos CLI do [guia de configuração](../docs/orca-setup.md). A distinção entre papéis e modelos deve ficar explícita: uma nova sessão com o mesmo modelo continua a usar o mesmo modelo.

| Slides | Minutos | Conteúdo |
| --- | --- | --- |
| 1–2 | 00–03 | Objetivo e plano da sessão |
| 3–4 | 03–09 | Chat, ferramentas e ciclo de trabalho |
| 5–6 | 09–15 | Caso, fronteira temporal e decisão humana |
| 7–8 | 15–21 | Artefactos OpenSpec e proposta limitada |
| 9–10 | 21–27 | Papéis, modelos e coordenação com ORCA |
| 11 | 27–30 | Tokens e seleção de contexto |
| 12 | 30–34 | Branch de trabalho e ambiente |
| 13 | 34–40 | Especificação e aprovação |
| 14 | 40–48 | Implementação e testes |
| 15 | 48–57 | Revisão e handoff |
| 16 | 57–60 | Evidência e consolidação |

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

Para alterar a sequência, confirmar que o total continua a ser 60 minutos e que a transição para o laboratório permanece no minuto 30. O gerador exige exatamente 16 slides e tabelas nativas nos slides 6 e 9.
