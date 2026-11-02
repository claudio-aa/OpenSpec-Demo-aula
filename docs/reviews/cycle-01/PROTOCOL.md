# Protocolo do primeiro ciclo de revisão

## Mandato e versão de referência

Pedido: avaliar a apresentação com, pelo menos, três revisores e um escritor. Neste primeiro ciclo, entregar as conclusões antes de alterar o PPTX. A quantidade de slides pode mudar; mantêm-se os 60 minutos, com 30 de introdução e 30 de prática guiada, e o cenário sem serviços pagos/cartão.

- Base Git: `202f68d9810f7d09e24b7416da4396304d91459b`.
- Apresentação: `presentation/output/workshop-agentes-openspec-reestruturado.pptx` (22 slides).
- SHA-256: `cbc150a08224f3f1b32f68c7f30ec6e46b7aec3a1c0ac87e316c34c5361d5efd`.
- Idioma e público: pt-PT; 3.º ano de informática, Análise de Sistemas.

## Equipa e independência

| Função | Agente | Entrega exclusiva |
| --- | --- | --- |
| Revisor: aluno sem contexto prévio | `review_student` | `student.md` |
| Revisor: docente responsável por Análise de Sistemas | `review_teacher` | `teacher.md` |
| Revisor: metodologista/especialista | `review_methodologist` | `methodologist.md` |
| Escritor e integração editorial | Agente principal, `/root` | Protocolo, síntese e handoff; PPTX apenas numa fase de escrita |

Os três revisores receberam tarefas em contextos novos, sem histórico do chat nem pareceres dos colegas. Cada um leu o README e as instruções do repositório. O aluno fez primeiro uma leitura dos slides visíveis, deixando as notas para uma segunda passagem. A leitura não foi inteiramente cega: o README obrigatório já explicava duração, âmbito e custo. Os restantes confrontaram slides e notas com os artefactos relevantes. Os três inspecionaram os renders dos 22 slides.

São perspetivas simuladas por agentes de IA. Não são entrevistas com alunos reais, aprovação de um docente real ou validação institucional. Os agentes usam o modelo disponibilizado nesta sessão; três papéis não demonstram diversidade de modelos nem independência estatística de erros. O ensaio de aprendizagem com pessoas continua necessário.

Cada revisor só escreve no próprio relatório. Não altera a apresentação, o código, os relatórios dos colegas ou o handoff comum. O escritor compara os pareceres com a evidência, assinala desacordos e evita tratar uma votação como prova.

## Critério dos achados

Cada achado deve identificar o slide ou artefacto, a evidência observada, a consequência, uma correção concreta e um critério de aceitação.

- **P0:** impede o objetivo/execução ou transmite uma ideia central incorreta.
- **P1:** prejudica significativamente a compreensão ou a viabilidade.
- **P2:** melhoria útil que não impede o percurso.

Uma lacuna nos slides pode estar coberta pelas notas ou pelos guias. Essa distinção deve ficar explícita. Um risco detetado por leitura de configuração não equivale a uma falha reproduzida. As propostas curriculares são recomendações para este workshop, sem pressupor um programa oficial não fornecido.

## Ciclos de trabalho

1. Congelar e identificar a versão da apresentação.
2. Recolher três pareceres independentes com evidência.
3. O escritor consolida: aceitar, adiar ou rejeitar cada correção, com justificação.
4. Apresentar as conclusões do primeiro ciclo ao utilizador.
5. Na fase seguinte de escrita, alterar apenas os ficheiros acordados e produzir uma versão nova do PPTX.
6. Repetir as três revisões sobre essa versão, verificando os critérios pendentes e novos problemas.

O fim de um ciclo não implica aprovação automática. O número de slides serve o percurso de aprendizagem, sem conservar artificialmente os 22 atuais. Este primeiro ciclo não executa chamadas a modelos locais nem repete testes da aplicação; verifica os materiais e regista os limites dessa verificação.

## Clarificação do utilizador durante o ciclo

O utilizador tornou obrigatório que os slides sejam **auto contidos** e explicitou duas lacunas: contexto do que é OpenSpec e explicação do fluxo agêntico com **commands, skills e agents**. As notas do docente são secundárias e não compensam omissões no conteúdo projetado.

Cada revisor recebeu uma tarefa suplementar independente para avaliar o conteúdo visível contra este critério. Os suplementos são acrescentados aos próprios relatórios, preservando o parecer inicial. O escritor deve tratar definições, relações, passos, locais de introdução de comandos, saídas e critérios de avanço como conteúdo dos slides. Notas e guias podem conter aprofundamento; não podem conter o único exemplar de uma instrução essencial.

Critério transversal de aceitação: uma pessoa do público-alvo consegue, apenas com os slides, explicar o propósito de OpenSpec, distinguir command de skill e de agent, identificar modelo/cliente/ferramenta, e seguir um exemplo desde pedido até artefacto, decisão humana, implementação, verificação e retoma. Este critério ainda não foi validado com alunos reais.
