# Guião de 60 minutos — versão auto contida

Público: 3.º ano de Análise de Sistemas. Os slides contêm os conceitos, comandos essenciais, responsáveis, resultados esperados e condições para avançar. As notas são apoio opcional ao docente.

## Preparação

Preparar clone e acesso às branches, dependências, ORCA/OpenCode/Ollama e os dois modelos antes da aula. O percurso base é local, sem cartão, API paga ou subscrição. Se só houver um modelo preparado, usar outra sessão do mesmo modelo e declarar isso. Instalações não fazem parte dos 60 minutos.

A aplicação é um simulador: não cobra, não abre cancelas nem confirma passagem física. D1–D6 são decisões didáticas, identificadas em BRIEF.md, sujeitas à aprovação do responsável representado na aula.

## Introdução e demonstração: 30 minutos

| Minutos | Conteúdo |
| --- | --- |
| 00–08 | Objetivo, entrega, microprocesso, stakeholders e previsão antes de revelar D1 |
| 08–13 | O que é OpenSpec; regra, contrato e desenho; quatro artefactos |
| 13–23 | Modelo/cliente/agente; tools; command de chat/CLI; skill/perfil; pedido delimitado |
| 23–30 | Percurso completo, contexto pequeno, contributos observados, verificações e preparação |

Commands e skills fornecem instruções; perfis configuram papéis/permissões; o cliente executa ferramentas autorizadas. Não pressupor que um command chama automaticamente uma skill. O percurso com ferramentas é explicado separadamente do pacote curto, que só devolve texto.

## Prática guiada: 30 minutos

| Minutos | Ação e condição para avançar |
| --- | --- |
| 30–34 | Branch própria do starter, baseline de infraestrutura, UI/API preparadas |
| 34–40 | Análise textual, decisão registada, artefactos de referência01 carregados e revistos, aprovação explícita |
| 40–48 | Wrapper e testes preparados de referência02, geração local só de decide, integração humana, testes/build e reinício do servidor |
| 48–52 | Revisão textual de spec/código pelo modelo; diff/testes e reprodução pela pessoa |
| 52–54 | Inspecionar spec e arquivo de referência03; declarar que a alteração do grupo continua ativa |
| 54–58 | HANDOFF fiel ao estado e retoma por sessão nova, sem edição automática |
| 58–60 | Entrega de todos os pares; duas respostas orais amostradas |

Carregar referência não equivale a criar os artefactos do zero. O par deve distinguir o que recebeu, o que aprovou, o que o modelo gerou e o que verificou. A pessoa executa a CLI e integra a função; o perfil builder completo não é necessário nesta rota.

Depois da integração ou recuperação, parar o servidor no Terminal A com Ctrl+C, executar novamente `npm start`, atualizar a interface e confirmar uma tentativa paga aos 15:00 como VALID. O servidor Node não recarrega o módulo automaticamente.

A recuperação preserva a branch do grupo. O PPTX mostra os comandos concretos e as condições temporais. Não usar reset destrutivo nem desenvolver nas branches de referência. Não arquivar uma alteração incompleta por pressão do relógio: a atividade de arquivo é inspeção da referência, e o handoff deve declarar o estado ativo do grupo.

## Avaliação e evidência

Cada par entrega decisão/aprovador, cenário completo, caminho da spec e teste, saída observada, revisão/limites, modelo e checkpoint usado, e próximo passo. Testes verdes não validam a decisão de negócio; validate verifica estrutura documental. Uma crítica do modelo só justifica correção depois de reproduzida e confrontada com o contrato.

O ensaio técnico em [runtime-evidence.md](reviews/cycle-02/runtime-evidence.md) verificou geração local, integração, 26 testes, build e arquivo temporário. Descobriu e registou uma falha inicial por teste HTTP obsoleto do starter. Não foi um ensaio com alunos, nem prova de viabilidade da turma em 30 minutos. O percurso do PPTX termina por inspecionar o arquivo de referência; o ensaio técnico foi além e testou arquivo numa worktree descartável.
