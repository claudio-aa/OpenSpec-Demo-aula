# Ciclo 02 — revisão independente como aluno

**Veredito: SATISFEITO**, como apresentação auto contida de uma prática guiada com ambiente previamente preparado e percurso reduzido explicitamente declarado. Não identifico P0/P1 remanescente no conteúdo visível. Restam dois P2 abaixo. Este parecer não certifica que uma turma completa termina em 30 minutos.

## Objeto e limites

Candidato congelado: `presentation/output/workshop-agentes-openspec-autocontido.pptx`, 34 slides. SHA-256 confirmado: `bf396f4cf7b7eaa19c48128763145fd75303252db0925bb3c2191782748d7cd3`.

Li README e AGENTS, os campos de conteúdo de `presentation/slides.json` e inspecionei individualmente os 34 renders `presentation/.build/slide-01.png` a `slide-34.png`. Os campos de notas estavam presentes no JSON consultado, mas não contam como evidência nem corrigem omissões neste parecer. Não consultei os pareceres dos colegas. A perspetiva continua a ser uma simulação de aluno do 3.º ano sem conhecimento prévio destas ferramentas, não uma avaliação realizada com estudantes.

Consultei depois `docs/reviews/cycle-02/runtime-evidence.md` para confirmar o alcance do ensaio e, pontualmente, o script/perfil local para verificar a existência do recurso no starter e o tempo limite. Estes materiais não substituem instruções visíveis. Não executei a prática nem testes; não alterei código, slides, fontes ou outros relatórios. O único ficheiro escrito foi este.

## Fundamentação do veredito

Agora consigo definir OpenSpec a partir do slide 6 e distinguir modelo, cliente, agente em execução, command, skill e perfil pelos slides 9–13. Os slides 11–12 distinguem as superfícies de entrada e evitam prometer que um command carrega automaticamente uma skill ou concede permissões.

Consigo também seguir o exemplo completo que a apresentação **efetivamente propõe**: análise textual → pessoa carrega/revê artefactos 01 → aprovação no HANDOFF → pessoa carrega wrapper e três ficheiros da referência 02 → modelo gera apenas `decide` em texto → integração humana → testes/build → revisão/reprodução → inspeção do arquivo 03 → handoff e nova sessão. Os slides 13, 15, 17 e 25–27 deixam claras a preparação e a autoria. Não interpreto isto como implementação autónoma pelo perfil builder, nem como geração dos quatro artefactos pelo analista.

O limite de custo está nos slides 2 e 16. As referências e alternativas manuais permitem continuar sem API paga, cartão, instalação de segundo modelo ou alteração das branches de referência. O slide 31 distingue corretamente o arquivo inspecionado da alteração ainda ativa do grupo.

## Matriz dos problemas anteriores

“Resolvido” significa resolvido para este percurso reduzido e para leitura dos slides; não significa que todas as capacidades da ferramenta tenham sido demonstradas ao vivo.

| Achado anterior | Estado | Evidência visível atual |
| --- | --- | --- |
| A1 — objetivo e entrega tardios | Resolvido | 2 explicita aprendizagem, produto e entrega; 3 delimita processo; 21 declara simulação; 34 concretiza entrega. |
| A2 — análise sem ponte para spec aprovada | Resolvido por percurso explícito | 23 restaura os quatro artefactos; 24 identifica aprovação no HANDOFF e gate humano. Não se promete criação pelo analista. |
| A3 — primeiro passo/sinais de prontidão | Resolvido | 20–22 dão terminal, comandos, branch, baseline de três testes, URL, Terminal A/B e leitura feita pelo script. |
| A4 — recuperação escondida | Resolvido | 22/26 limitam espera; 25 guarda referência; 28 preserva tentativa e recupera; 33 oferece retoma humana. A ressalva do reviewer é P2 abaixo. |
| A5 — spec canónica ausente no starter | Resolvido | 8 e 21 dizem que não existe ainda; 23 dá caminho ativo; 31 mostra a spec vigente só na referência arquivada. |
| A6 — troca de modelo obrigatória | Resolvido | 29 oferece revisão pelo colega; 33 exige sessão nova e torna outro modelo opcional, com identificador efetivo. |
| A7 — vocabulário antes de exemplos | Resolvido para o núcleo | 6 define spec/OpenSpec; 9–13 explicam os elementos; 16 define token/contexto; 25–27 concretizam wrapper, entradas e função. |
| A8 — validação documental/custo | Resolvido | 6 e 18 limitam a validação à estrutura; 24 distingue artefactos done de código concluído; 2/16 explicitam custo zero. |
| B1 — categoria de OpenSpec implícita | Resolvido | 6 diz ferramenta e workflow, problema resolvido, função da CLI e aprovação do significado. |
| B2 — modelo/cliente/agent/command/skill/perfil | Resolvido | 9–13 definem os conceitos, mostram configuração e separam papéis/permissões. |
| B3 — exemplo sem transições de autorização/contexto | Resolvido no percurso declarado | 14–15 apresentam pedido e sequência; 22–28 mostram leituras, cópia humana, aprovação, contrato enviado, edição e testes. |
| B4 — CLI vs slash command vs tool | Resolvido | 10–12 distinguem tool e entradas; 24 executa obtenção de instruções pela pessoa; 26/27 distinguem texto de edição em disco. |

## Problemas restantes concretos

### C2-S1 — Reviewer local sem regra visível de abandono

**P2. Slide 29, em comparação com 22, 26 e 33.**

**Evidência:** há dois caminhos visíveis, “Com segundo modelo preparado” e “Com um único modelo local”. O primeiro executa `node scripts/local-packet.mjs reviewer`, mas não inclui o limite de 90 segundos e `Ctrl+C` dado aos outros pedidos. A alternativa manual está escrita como dependente de ter apenas um modelo, não como recuperação de um reviewer lento ou indisponível.

**Impacto:** um par com dois modelos pode consumir a janela 48–50 à espera, embora a revisão manual já descrita permita continuar. Não é um bloqueio central porque o percurso alternativo está no mesmo slide.

**Correção mínima:** acrescentar “Após 90 s sem saída útil ou em caso de erro, Ctrl+C e seguir a revisão pelo colega à direita”. Não instalar nem trocar para serviço remoto.

**Aceitação:** olhando apenas para o slide 29, o aluno sabe quando interromper e como continuar perante ausência de resposta do segundo modelo.

### C2-S2 — A interface aberta continua a usar o servidor do starter

**P2. Slides 21, 25–28.**

**Evidência:** o slide 21 manda manter `npm start` no Terminal A e identifica `NOT_IMPLEMENTED` como baseline. Depois a pessoa substitui o módulo e executa testes/build no Terminal B. Não há instrução para reiniciar o servidor. Os slides não pedem nova verificação da interface, por isso isto não invalida a evidência obtida pelos testes ou pelo novo processo Node do slide 30.

**Impacto:** se o aluno voltar à interface já aberta, pode continuar a observar a decisão do processo inicial e achar que os testes verdes contradizem a aplicação. Falta explicar a validade temporal dessa baseline.

**Correção mínima:** no slide 28, acrescentar “Para verificar também na interface: no Terminal A, Ctrl+C e npm start; atualizar o browser”. Alternativamente, dizer que a UI foi usada apenas como baseline e que a verificação final desta rota é via testes/comando. A primeira opção é mais útil, se couber no tempo ensaiado.

**Aceitação:** depois da integração, o aluno consegue explicar por que uma página ligada a um processo antigo pode continuar a mostrar `NOT_IMPLEMENTED` e sabe obter uma observação atual.

## Confiança e timing

Confiança alta na leitura e na resolução documental dos A/B: os 34 renders foram inspecionados, sem cortes ou sobreposições que impedissem ler os passos. A quantidade de slides não é, isoladamente, razão para reprovar: a prática usa um slide por operação curta e deixa as instruções disponíveis para consulta.

O cronograma visível mantém 30+30. A evidência técnica confirma a composição do wrapper/testes, a geração local pequena e os resultados, incluindo a falha inicial e respetiva correção. Não confirma o tempo integral com alunos, instalações ou uma sessão multiagente ORCA. Consequentemente, **satisfeito como material auto contido para o percurso guiado com setup pronto; duração coletiva ainda por ensaiar**. As notas não são necessárias para obter as definições, a próxima ação, a condição de aprovação ou a distinção entre referência preparada e contribuição local.
