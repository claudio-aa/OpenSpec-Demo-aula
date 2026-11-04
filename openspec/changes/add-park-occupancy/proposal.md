## Why

O enunciado (CE4) descreve três parques cobertos com cancelas e 850 lugares no total, onde a ocupação é registada manualmente pelo vigilante em folhas de cálculo. A Megapolis Mobilidade, E.M. «não tem uma forma de, a qualquer momento, monitorizar a ocupação real dos seus parques». O simulador só avalia saídas (`garage-exit`); não sabe quantos veículos estão em cada parque. Esta alteração trata só da monitorização; a indicação de disponibilidade ao condutor não é tratada (D17).

## What Changes

- Nova capacidade `park-occupancy`: o simulador regista entradas e saídas de veículos em cada parque e responde, a qualquer momento, quantos lugares estão ocupados e livres.
- Novos pontos da API (contrato em `specs/park-occupancy/spec.md`): `POST /api/parks/{parkId}/events` para registar uma entrada ou uma saída, `GET /api/parks/{parkId}` para consultar um parque e `GET /api/parks` para consultar os três e o total.
- A alteração é independente de `garage-exit`: não altera `POST /api/exit-decisions`, `evaluateExit` nem a spec `garage-exit`. A change `validate-attendant-payment` (aplicada, ainda não arquivada) não é tocada.
- Os casos-limite são cenários com valores exatos: parque cheio, saída sem veículos, parque desconhecido e pedido inválido.

## Decisões

O enunciado não define a divisão dos 850 lugares, nem o que acontece com uma entrada num parque cheio, nem os restantes temas da tabela abaixo. Todas as linhas são propostas do autor desta alteração e aguardam aprovação do responsável pelo processo (Megapolis Mobilidade; na aula, o docente). Nenhuma consta de `docs/BRIEF.md`. A spec delta foi escrita segundo estas propostas e muda se alguma for recusada. Detalhe e justificação em `design.md`.

| ID | Estado | Tema | Proposta | Alternativa rejeitada |
| --- | --- | --- | --- | --- |
| D11 | Proposta | Parques e capacidades | Três parques `P1`, `P2` e `P3` com 300, 300 e 250 lugares (soma 850). Valores inventados para o exercício | Divisão igual (283, 283 e 284): números sem leitura intuitiva nos testes. Contagem por piso: o enunciado diz que o condutor circula «pelos pisos», mas não indica pisos nem lugares por piso |
| D12 | Proposta | Entrada com o parque cheio | Entrada recusada com `PARK_FULL`, HTTP 200, ocupação inalterada | Aceitar e ultrapassar a capacidade (ocupação acima de 100 % e lugares livres negativos) |
| D13 | Proposta | Saída com ocupação 0 | Saída recusada com `NO_VEHICLES`, HTTP 200, ocupação inalterada em 0 | Aceitar e manter 0 em silêncio (esconde um registo em falta) |
| D14 | Proposta | Estado | Em memória; cada arranque começa com todos os parques vazios | Guardar em ficheiro ou base de dados (contraria D6) |
| D15 | Proposta | Ligação a bilhetes e a `garage-exit` | Nenhuma: quem chama a API declara cada entrada e cada saída | Contar uma saída sempre que `garage-exit` devolva `VALID` (uma autorização não prova que o veículo atravessou a cancela) |
| D16 | Proposta | Correção pelo vigilante | Sem correção: os únicos eventos são entrada e saída; não há operação para fixar a contagem | Operação para o vigilante fixar a contagem (exige identificação, auditoria e perfis) |
| D17 | Proposta | Âmbito | Só a API de contagem; a indicação de disponibilidade ao condutor fica para outra change | Acrescentar já uma interface ou painel para o condutor (obriga a desenhar a interface e a decidir onde e como se mostra) |
| D18 | Proposta | Quem regista os eventos | A cancela de entrada ou de saída, simulada por quem chama a API; o vigilante deixa de registar manualmente | O vigilante regista cada entrada e saída à mão (mantém o processo manual que o enunciado critica) |

## Capabilities

### New Capabilities

- `park-occupancy`: registo de entradas e saídas por parque e consulta da ocupação e dos lugares livres, em memória.

### Modified Capabilities

Nenhuma. `garage-exit` não muda.

## Impact

Código previsto: um módulo novo em `server/` para o estado e as regras, rotas novas em `server/index.js`, testes novos (um por cenário) e casos novos em `scripts/demo-api.mjs`. `src/main.jsx` não muda. `docs/BRIEF.md` recebe D11 a D18 só quando forem aprovadas. Sem novas dependências, base de dados, autenticação, sensores ou controlo de cancelas (D6).
