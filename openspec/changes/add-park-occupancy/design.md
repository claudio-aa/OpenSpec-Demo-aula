## Context

Ver `proposal.md` para a motivação. Estado antes da alteração, verificado no código:

- `server/index.js` serve `GET /api/health` e `POST /api/exit-decisions`. Qualquer outro caminho em `/api/` responde 404 com `{ error: 'NOT_FOUND' }`, seja qual for o método.
- Entrada inválida responde HTTP 400 com `{ allowed: false, reason: 'INVALID_INPUT' }`. JSON malformado ou corpo com mais de 8192 bytes também dão 400. Recusas de negócio de `garage-exit` respondem HTTP 200.
- `createAppServer()` não guarda estado entre pedidos: `evaluateExit` é uma função pura. Não existe nenhum código sobre parques, lugares ou ocupação.
- `src/main.jsx` só chama `/api/exit-decisions`.
- A decisão D6 de `docs/BRIEF.md` fixa «avaliação simulada sem persistência, sem consumo do bilhete e sem hardware». `docs/BRIEF.md` observa que «uma autorização não prova que o veículo atravessou a cancela» e sugere eventos de entrada e saída como futura alteração.

Factos do enunciado usados: «3 parques de estacionamento cobertos com sistema de cancelas (capacidade total: 850 lugares)»; o condutor procura lugar vago «sem indicação de disponibilidade»; a ocupação é registada manualmente pelo vigilante em folhas de cálculo; a empresa não consegue monitorizar a ocupação real a qualquer momento. O enunciado não diz como os 850 lugares se dividem, quais os identificadores dos parques, nem o que fazer nos casos-limite.

## Decisões propostas — a aguardar aprovação do responsável pelo processo

As escolhas abaixo são propostas do autor desta alteração, não factos do enunciado. Só o responsável pelo processo (Megapolis Mobilidade; na aula, o docente) as pode aprovar. D1 a D6 e D8 estão aprovadas; D7, D9 e D10 são propostas da change `validate-attendant-payment`. A spec delta segue estas propostas e muda se alguma for recusada. As decisões escolhem a opção mais simples que torna o exemplo claro.

- **D11 — Parques e capacidades.** Três parques com os identificadores `P1`, `P2` e `P3`, com 300, 300 e 250 lugares (total 850). A divisão e os identificadores são inventados para o exercício e não vêm do enunciado; só o total de 850 vem. A comparação de identificadores é exata (`p1` não existe). Alternativas: divisão igual (283, 283 e 284), que dá números pouco legíveis nos exemplos; contagem por piso, rejeitada porque o enunciado diz que o condutor circula «pelos pisos» mas não indica pisos nem lugares por piso. Como `P3` tem 250 lugares, é o parque usado nos cenários de parque cheio.
- **D12 — Entrada com o parque cheio.** Se `occupied` já é igual a `capacity`, a entrada é recusada com `accepted: false` e `reason: PARK_FULL`, HTTP 200 (recusa de negócio, como em `garage-exit`), e a ocupação não muda. Alternativa: aceitar a entrada e deixar a ocupação passar a capacidade (falsearia «lugares livres», que ficariam negativos). Nota: o simulador não controla cancelas (D6); a recusa é só a resposta do registo, não abre nem fecha nada.
- **D13 — Saída com ocupação 0.** Uma saída num parque com `occupied` igual a 0 é recusada com `accepted: false` e `reason: NO_VEHICLES`, HTTP 200, e a ocupação continua em 0 (nunca negativa). Alternativas: aceitar e manter 0 em silêncio, ou tratar como entrada inválida com HTTP 400. Escolhida a recusa de negócio porque o pedido está bem formado e o problema é o estado do parque, tal como `UNPAID` e `EXPIRED`.
- **D14 — Estado em memória.** Cada instância de `createAppServer()` tem o seu estado, que começa com todos os parques a 0 veículos. Reiniciar o servidor apaga a contagem. Sem ficheiros nem base de dados, em coerência com D6. Alternativa: persistir (ficheiro ou base de dados); fora de âmbito. Consequência: uma contagem não sobrevive a um reinício e não serve como registo real.
- **D15 — Independência de bilhetes e de `garage-exit`.** A contagem não depende de bilhetes nem de `/api/exit-decisions`: uma entrada ou saída só é contada quando alguém a regista com `POST /api/parks/{parkId}/events`. Uma decisão `VALID` de `garage-exit` não decrementa nada. Alternativa: contar automaticamente uma saída quando `garage-exit` devolve `VALID`; rejeitada porque obrigaria a alterar `garage-exit` e porque autorizar a saída não prova que o veículo passou a cancela. A spec `garage-exit` e o seu código não mudam.
- **D16 — Sem correção da contagem.** Os únicos eventos são `ENTRY` e `EXIT`. Não existe operação para o vigilante fixar um valor absoluto. Se a contagem se afastar da realidade, o simulador não a corrige; o efeito visível é D13 (saída recusada a 0) ou D12 (entrada recusada com o parque «cheio»). Alternativa: operação de correção pelo vigilante; exigiria identificação do vigilante, registo de quem corrigiu e perfis de acesso, tudo fora do simulador.

- **D17 — Âmbito.** Só a API de contagem. O enunciado descreve o condutor a procurar lugar «sem indicação de disponibilidade», mas esta alteração não entrega nada ao condutor: a indicação de disponibilidade ao condutor fica para outra change. Alternativa: acrescentar já uma interface ou painel para o condutor; obrigaria a desenhar a interface e a decidir onde e como a informação se mostra.
- **D18 — Quem regista os eventos.** Cada entrada e cada saída é registada pela cancela de entrada ou de saída, simulada por quem chama a API; o vigilante deixa de registar manualmente. O simulador não controla cancelas (D6): quem chama a API faz de cancela. Alternativa: o vigilante registar cada evento à mão; mantém o processo manual que o enunciado aponta como problema.

## Goals / Non-Goals

**Goals:** registar entradas e saídas por parque e responder à ocupação e aos lugares livres de um parque ou de todos, com cenários testáveis incluindo parque cheio, saída a 0, parque desconhecido e pedido inválido.

**Non-Goals:** ligação a `garage-exit` ou a bilhetes (D15), indicação de disponibilidade ao condutor (D17), pagamentos, sensores ou IoT e controlo de cancelas (D6), persistência (D14), histórico, estatísticas e análise de longo prazo, correção da contagem (D16), identificação do vigilante, autenticação, e interface em `src/main.jsx`.

## Decisions

As escolhas abaixo são técnicas e do autor da alteração. Não alteram regras de negócio, mas fixam o contrato que os testes verificam.

- Novo módulo `server/park-occupancy.js` com o estado e as regras (função que cria o estado e operações de registar e consultar), à semelhança de `server/exit-decision.js`. `server/index.js` só trata de encaminhar caminhos e devolver os códigos HTTP; cada `createAppServer()` cria o seu estado (D14), o que isola os testes.
- Um só ponto de escrita: `POST /api/parks/{parkId}/events` com o corpo `{ "type": "ENTRY" }` ou `{ "type": "EXIT" }`. Entrada e saída são o mesmo recurso com tipos diferentes, em vez de dois caminhos. Outros campos do corpo são ignorados, como em `/api/exit-decisions`.
- Resposta de um registo (HTTP 200): `{ accepted, reason, parkId, capacity, occupied, free }`, com `reason` igual a `RECORDED`, `PARK_FULL` ou `NO_VEHICLES`. A ocupação devolvida é a de depois do pedido.
- Consultas: `GET /api/parks/{parkId}` devolve `{ parkId, capacity, occupied, free }`; `GET /api/parks` devolve `{ parks: [...], total: { capacity, occupied, free } }` com os parques por ordem `P1`, `P2`, `P3`.
- Pedido inválido (JSON malformado, corpo que não é objeto, `type` ausente ou fora de `ENTRY` e `EXIT`): HTTP 400 e `{ accepted: false, reason: 'INVALID_INPUT' }`, com a mesma estrutura `{ <campo>: false, reason }` do erro de `/api/exit-decisions` (`{ allowed: false, reason: 'INVALID_INPUT' }`), mas com `accepted` e não `allowed`, porque registar um evento não é uma autorização. A rota nova tem de apanhar localmente os erros de `readJson`, porque o `catch` geral de `server/index.js` (linha 45) devolve `allowed`. Parque desconhecido: HTTP 404 e `{ error: 'NOT_FOUND' }`, a mesma forma do 404 existente. O parque é verificado antes do corpo.
- Nos testes, os estados de "P3 com 249" e "P3 com 250" obtêm-se com uma função auxiliar que envia `ENTRY` N vezes pela API pública, com um servidor novo por teste. A demonstração (`npm run demo`) enche `P3` em silêncio antes do caso impresso.
- Métodos não previstos nestes caminhos continuam a cair no 404 genérico de `/api/`, sem código novo.
- Sem interface: os casos inválidos e de parque cheio exercitam-se com testes, `npm run demo` ou `curl`.

## Risks / Trade-offs

- [As propostas D11 a D18 podem ser recusadas] → rever a spec delta, as tarefas e os testes; a divisão de lugares e os identificadores em especial são inventados e é provável que o responsável os queira trocar.
- [Sem interface para o condutor (D17), a informação só chega a quem chama a API] → assumido; fica para outra change.
- [O estado é declarado por quem chama a API e não prova que o veículo atravessou a cancela] → aceitável no simulador (D6, D15); não serve de registo real.
- [Sem correção (D16), um registo em falta ou a mais deixa a contagem errada até reiniciar] → assumido como limitação do simulador; fica à vista de quem estuda o processo.
- [Estado partilhado em memória] → depois de ler o corpo (`await readJson`), a verificação e o incremento ou decremento são código síncrono, sem `await` pelo meio, e o Node executa-o sem intercalar outro pedido; por isso dois pedidos não ultrapassam a capacidade nem tornam a contagem negativa. Várias cancelas em simultâneo ficam, portanto, seguras neste simulador; vários processos ou persistência ficam fora de âmbito (D14).
