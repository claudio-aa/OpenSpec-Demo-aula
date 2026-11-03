# Parecer metodológico independente — ciclo 02

Data: 3 de novembro de 2026. Revisor 3: metodologia de engenharia de software, workflows agênticos e desenho instrucional. Simulação profissional, sem alegação de certificação externa.

**Candidato congelado:** `presentation/output/workshop-agentes-openspec-autocontido.pptx`.

**SHA-256 verificado:** `bf396f4cf7b7eaa19c48128763145fd75303252db0925bb3c2191782748d7cd3`.

**Veredito: não satisfeito neste hash.** A revisão conceptual e a leitura autónoma estão substancialmente satisfeitas. Resta um P1 no roteiro de execução: o servidor iniciado no starter fica a servir a implementação antiga depois da integração. É necessária uma correção pontual e nova revisão do candidato resultante. Não identifiquei outro P0/P1 neste âmbito.

## Método e limites

Li primeiro README e AGENTS. Inspecionei os 34 renders individualmente e o conteúdo de `presentation/slides.json`. Confirmei no ZIP/XML do PPTX os 34 títulos e a existência de 34 slides. A soma das durações é 30 minutos nos slides 1–19 e 30 nos slides 20–34.

Confrontei o conteúdo visível com `scripts/local-packet.mjs`, o perfil `workshop-analyst`, `package.json`, `server/index.js`, o módulo de decisão e as tasks dos checkpoints relevantes. O script e o perfil consultados não apresentam diferenças entre starter e referência 02 que invalidem as entradas anunciadas. Li `docs/reviews/cycle-02/runtime-evidence.md` como registo de execução fornecido. Não consultei pareceres dos colegas. O único ficheiro escrito é este relatório.

Notas e guias foram usados para confirmar factos, sem compensar conteúdo essencial ausente no slide. Não executei modelos, testes, build, servidor ou a prática integral. A evidência de 26 testes, build e geração local é atribuída ao registo de execução, não a uma reprodução independente deste revisor. Não foi necessário voltar a consultar fontes externas: a semântica command/skill/perfil já verificada no ciclo anterior foi confrontada com os exemplos locais.

## Matriz dos achados anteriores

| ID anterior | Estado no candidato | Evidência visível e conclusão |
| --- | --- | --- |
| M01 — análise sem criação/carregamento de artefactos | Satisfeito | Slides 23–24: pessoa restaura os quatro artefactos de 01, abre os ficheiros, lê contextFiles, aprova e regista D1. A análise textual não é apresentada como criação automática. |
| M02 — permissões CLI incorretas no builder | Retirado da base; não declarado corrigido | Slide 13 exclui expressamente o builder completo. Slides 22–29 usam pacote textual e ações humanas. O defeito do perfil completo não bloqueia esta rota; a sua futura utilização exigiria correção e ensaio próprios. |
| M03 — autonomia prática não demonstrada | Satisfeito por redução explícita de âmbito | Slides 15, 17 e 25–28: wrapper/testes preparados, Qwen gera apenas decide, pessoa integra e verifica. Não há promessa de agente autónomo completo. Há limites de espera e recuperação. |
| M04 — reviewer não recebe entradas anunciadas | Satisfeito | Slides 16, 17 e 29 dizem spec ativa + código, sem diff nem execução de testes. Corresponde aos dois ficheiros enviados pelo script. O par consulta diff/testes separadamente. |
| M05 — arquivo não operacionalizado | Satisfeito por inspeção e pendência explícitas | Slides 31–32: comandos inspecionam a referência 03, grupo permanece com alteração ativa, só marca tarefas realizadas e regista arquivo pendente. Não se declara conclusão inexistente. |
| M06 — arranque contraditório | Satisfeito no conteúdo visível | Slides 20–21: branch do grupo, árvore limpa, build/start, URL, Terminal A e B e resultado esperado do starter. Surge porém o novo problema de reinício descrito abaixo. |
| M07 — falha regressa sempre ao código | Satisfeito | Slide 18 distingue significado, estrutura e execução, manda inspecionar código/teste/spec e mantém crítica não reproduzida como suspeita. Slide 28 condiciona recuperação à falha estar na função. |
| S01 — falta definição de OpenSpec | Satisfeito | Slide 6 define ferramenta/workflow, problema de retoma, CLI e aprovação humana. Slides 8, 18 e 24 distinguem artefactos, validação documental e código concluído. |
| S02 — command/skill/perfil ausentes ou confundidos | Satisfeito | Slides 11–12 dão entrada OpenCode versus terminal, exemplos locais e efeitos. Skill entra no contexto quando carregada; perfil configura papel/modelo/permissões e exige início de sessão. Não há cadeia automática command → skill inventada. |
| S03 — não se sabe onde iniciar ou o que edita | Satisfeito | Slides 10–12 mostram ferramentas e superfícies; 22–24 distinguem texto, cópia de ficheiros e instruções; 27 atribui a edição ao editor humano; 33 fornece arranque real de nova sessão. |
| S04 — papel/modelo e autoria confundidos | Satisfeito | Slides 9, 13, 15 e 17 separam modelo, cliente, sessão, ORCA, papel e contributos. Slides 26–29 identificam geração textual, integração humana e revisão sem tools. |
| S05 — diagnóstico dependia das notas | Satisfeito | Slides 18, 28 e 30 apresentam diagnóstico, recuperação condicionada e reprodução concreta visivelmente, sem remeter a decisão essencial para notas. |

«Satisfeito» nesta matriz refere-se à correção documental do problema anterior no percurso reduzido. Não certifica a competência dos alunos, latência de sala ou funcionamento de percursos que o candidato exclui.

## Achado restante

### C02-M01 — P1 — O servidor do starter não é reiniciado após mudar a regra

**Slides:** 21 e 25–28, com efeito sobre a interface aberta durante o resto da prática.

**Evidência verificável:** o slide 21 manda executar `npm start` no Terminal A e mantê-lo em execução. `package.json` define start como `node server/index.js`, sem modo watch. `server/index.js` importa `evaluateExit` de `./exit-decision.js` e usa essa função nas respostas HTTP. A função do starter devolve `NOT_IMPLEMENTED`. O slide 25 restaura esse módulo de 02; o 27 substitui decide e o 28 pode recuperar novamente o ficheiro. Não há ordem posterior para parar e reiniciar o processo no Terminal A. Os testes e a reprodução do slide 30 arrancam processos Node novos, pelo que podem observar código atualizado enquanto o servidor previamente iniciado continua com o módulo antigo em memória.

**Impacto:** a turma pode obter 26 testes verdes e uma reprodução correta na CLI, mas a UI/API que o próprio roteiro deixou aberta continua a responder `NOT_IMPLEMENTED`. O guião fica inconsistente com o estado do programa em execução e pode induzir diagnóstico errado da integração. O build da interface não recarrega o módulo do servidor.

**Correção concreta:** acrescentar ao conteúdo visível do slide 28, após a versão final da função e os testes/build: «Terminal A: Ctrl+C e npm start. Atualizar a interface e verificar uma tentativa paga aos 15:00». Tornar explícito que a recuperação da referência também exige reinício. Cabe no bloco 46–48 ou por uma pequena redistribuição interna dos dois minutos; não exige aumentar o workshop.

**Critério de aceitação:** seguindo o roteiro desde o starter, a mesma UI aberta em `http://127.0.0.1:3000` deixa de mostrar `NOT_IMPLEMENTED` e observa `VALID` no caso pago de exatamente 15 minutos depois da integração/reinício. Se houve recuperação, o procedimento continua válido. O novo slide deve indicar quem reinicia, em que terminal e a verificação que confirma o efeito. Um teste HTTP iniciado noutro processo não substitui esta confirmação do servidor da aula.

**Grau de certeza e limite:** evidência estática forte da ausência de recarga/reinício; não reproduzi o cenário dinâmico. `runtime-evidence.md` regista composição, testes, build e arquivo numa worktree, mas não este servidor contínuo do starter. A correção proposta precisa de verificação pontual de execução.

## Aspetos sólidos e viabilidade

- A sequência visível agora permite explicar OpenSpec e o ciclo agêntico sem depender de notas. `instructions apply` é descrito como leitura de instruções, e edição tem um responsável e uma operação observável.
- Os cenários de D1 incluem pagamento e dados válidos. A regra de negócio, o contrato do simulador e o desenho técnico têm camadas distintas. A inclusão do limite é uma referência aprovada pelo docente, precedida da previsão do par.
- Os três ficheiros de 02 carregados no slide 25 incluem o teste HTTP, evitando a expectativa obsoleta `NOT_IMPLEMENTED` descoberta no ensaio. Não se altera implementação correta para satisfazer esse teste antigo.
- A revisão textual não ganha capacidades ou entradas que não teve. O falso positivo exige reprodução e a sessão distinta de execução de testes continua devidamente atribuída.
- As recuperações preservam branch, aprovação e tentativa; o handoff declara alteração ativa e arquivo pendente. Ler referência arquivada é uma opção didática explícita, não uma afirmação de que o grupo já arquivou.
- A base é local, sem API paga ou fallback cloud obrigatório. O segundo modelo e a troca de pesos são opcionais e não se confundem com uma nova sessão do mesmo modelo.

Os blocos somam 60 minutos e a nova quantidade de slides não constitui, por si, um defeito: 15 slides práticos servem como instruções de duas em duas minutos. A margem de leitura/execução é apertada nos slides 23–25 e 30–33. Os limites de 90 segundos, código preparado e revisão manual tornam o plano plausível, mas não demonstram que toda a turma o conclui em 30 minutos. O registo técnico declara corretamente que não mediu a atividade inteira nem foi ensaio com alunos. Esta limitação não é um P1 documental adicional e deve permanecer no parecer.

## Próxima revisão

Corrigir apenas a sequência de reinício e confirmação da API/UI, congelar novo hash e realizar revisão pontual dos slides afetados e da evidência dessa operação. O candidato atual permanece **não satisfeito por um P1**; as correções anteriores não precisam de ser reabertas sem mudança ou nova evidência.
