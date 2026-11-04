## Purpose

Permitir registar entradas e saídas de veículos em cada parque com cancelas e consultar, a qualquer momento, quantos lugares estão ocupados e livres, num simulador em memória.

## ADDED Requirements

### Requirement: Consultar a ocupação de um parque

O sistema SHALL gerir exatamente três parques com os identificadores `P1`, `P2` e `P3`, com as capacidades 300, 300 e 250 lugares, num total de 850 (decisão D11). Os identificadores SHALL ser comparados exatamente, com distinção de maiúsculas e minúsculas. O sistema SHALL responder a `GET /api/parks/{parkId}` com HTTP 200 e `{ parkId, capacity, occupied, free }`, com `occupied` entre 0 e `capacity` e `free` igual a `capacity` menos `occupied`. A consulta SHALL ser apenas de leitura. O estado SHALL ser mantido em memória por instância do servidor e cada instância SHALL começar com `occupied` igual a 0 em todos os parques (decisão D14).

#### Scenario: Estado inicial de um parque
- **WHEN** o servidor acaba de arrancar e se consulta `GET /api/parks/P1`
- **THEN** a resposta SHALL ser HTTP 200 com `{ "parkId": "P1", "capacity": 300, "occupied": 0, "free": 300 }`

#### Scenario: Estado perdido com uma nova instância
- **WHEN** `P1` tem 1 veículo registado e se arranca uma nova instância do servidor
- **THEN** `GET /api/parks/P1` na nova instância SHALL devolver `occupied: 0` e `free: 300`

### Requirement: Consultar a ocupação de todos os parques

O sistema SHALL responder a `GET /api/parks` com HTTP 200 e `{ parks, total }`. `parks` SHALL conter, por esta ordem, os objetos de `P1`, `P2` e `P3`, cada um com `parkId`, `capacity`, `occupied` e `free`. `total` SHALL ter `capacity` igual a 850, `occupied` igual à soma das ocupações e `free` igual a `capacity` menos `occupied`.

#### Scenario: Todos os parques vazios
- **WHEN** o servidor acaba de arrancar e se consulta `GET /api/parks`
- **THEN** a resposta SHALL ser HTTP 200 com `parks` igual a `[{ "parkId": "P1", "capacity": 300, "occupied": 0, "free": 300 }, { "parkId": "P2", "capacity": 300, "occupied": 0, "free": 300 }, { "parkId": "P3", "capacity": 250, "occupied": 0, "free": 250 }]` e `total` igual a `{ "capacity": 850, "occupied": 0, "free": 850 }`

#### Scenario: Total com parques com veículos
- **WHEN** se registam 2 entradas em `P1` e 1 entrada em `P3` e se consulta `GET /api/parks`
- **THEN** `parks` SHALL indicar `occupied` 2, 0 e 1 para `P1`, `P2` e `P3`, e `total` SHALL ser `{ "capacity": 850, "occupied": 3, "free": 847 }`

### Requirement: Registar entradas

O sistema SHALL aceitar `POST /api/parks/{parkId}/events` com o corpo `{ "type": "ENTRY" }` num parque existente que tenha pelo menos um lugar livre. SHALL aumentar `occupied` em 1 e responder HTTP 200 com `accepted: true`, `reason: RECORDED`, `parkId`, `capacity`, `occupied` e `free` posteriores ao registo, sem alterar a contagem dos outros parques. Cada evento é registado por quem chama a API, que simula a cancela (decisão D18). A contagem SHALL depender apenas destes eventos: uma decisão devolvida por `POST /api/exit-decisions`, incluindo `VALID`, SHALL NOT alterar a ocupação de nenhum parque (decisão D15).

#### Scenario: Primeira entrada
- **WHEN** todos os parques estão vazios e se envia `POST /api/parks/P1/events` com `{ "type": "ENTRY" }`
- **THEN** a resposta SHALL ser HTTP 200 com `{ "accepted": true, "reason": "RECORDED", "parkId": "P1", "capacity": 300, "occupied": 1, "free": 299 }` e `GET /api/parks/P2` SHALL devolver `occupied: 0`

#### Scenario: Última entrada que enche o parque
- **WHEN** `P3` tem 249 veículos e se envia `POST /api/parks/P3/events` com `{ "type": "ENTRY" }`
- **THEN** a resposta SHALL ser HTTP 200 com `accepted: true`, `reason: RECORDED`, `occupied: 250` e `free: 0`

#### Scenario: Saída autorizada por garage-exit não altera a ocupação
- **WHEN** `P1` tem 2 veículos e `POST /api/exit-decisions` com `{ "paid": true, "paidAt": "2026-11-02T10:00:00Z", "exitAt": "2026-11-02T10:15:00Z" }` devolve `VALID`
- **THEN** `GET /api/parks/P1` SHALL continuar a indicar `occupied: 2` e `free: 298`

### Requirement: Registar saídas

O sistema SHALL aceitar `POST /api/parks/{parkId}/events` com o corpo `{ "type": "EXIT" }` num parque existente com `occupied` maior que 0. SHALL diminuir `occupied` em 1 e responder HTTP 200 com `accepted: true`, `reason: RECORDED`, `parkId`, `capacity`, `occupied` e `free` posteriores ao registo. Não existe operação para fixar ou corrigir a contagem (decisão D16).

#### Scenario: Saída com veículos no parque
- **WHEN** `P1` tem 2 veículos e se envia `POST /api/parks/P1/events` com `{ "type": "EXIT" }`
- **THEN** a resposta SHALL ser HTTP 200 com `{ "accepted": true, "reason": "RECORDED", "parkId": "P1", "capacity": 300, "occupied": 1, "free": 299 }`

#### Scenario: Saída de um parque cheio liberta um lugar
- **WHEN** `P3` tem 250 veículos e se envia `POST /api/parks/P3/events` com `{ "type": "EXIT" }`
- **THEN** a resposta SHALL ser HTTP 200 com `accepted: true`, `occupied: 249` e `free: 1`

### Requirement: Recusar registos incompatíveis com a ocupação

O sistema SHALL recusar uma entrada num parque com `occupied` igual a `capacity`, com `reason: PARK_FULL` (decisão D12), e uma saída num parque com `occupied` igual a 0, com `reason: NO_VEHICLES` (decisão D13). Ambas as recusas SHALL responder HTTP 200 com `accepted: false`, `reason`, `parkId`, `capacity`, `occupied` e `free`. A ocupação SHALL manter-se inalterada, nunca negativa nem acima de `capacity`.

#### Scenario: Entrada em parque cheio
- **WHEN** `P3` tem 250 veículos e se envia `POST /api/parks/P3/events` com `{ "type": "ENTRY" }`
- **THEN** a resposta SHALL ser HTTP 200 com `{ "accepted": false, "reason": "PARK_FULL", "parkId": "P3", "capacity": 250, "occupied": 250, "free": 0 }` e `GET /api/parks/P3` SHALL continuar a indicar `occupied: 250`

#### Scenario: Saída com o parque vazio
- **WHEN** `P2` tem 0 veículos e se envia `POST /api/parks/P2/events` com `{ "type": "EXIT" }`
- **THEN** a resposta SHALL ser HTTP 200 com `{ "accepted": false, "reason": "NO_VEHICLES", "parkId": "P2", "capacity": 300, "occupied": 0, "free": 300 }`

### Requirement: Rejeitar parque desconhecido

O sistema SHALL responder HTTP 404 com `{ "error": "NOT_FOUND" }` quando o identificador do parque, em `GET /api/parks/{parkId}` ou em `POST /api/parks/{parkId}/events`, não é exatamente `P1`, `P2` ou `P3`. O parque SHALL ser verificado antes do corpo do pedido e nenhuma ocupação SHALL mudar.

#### Scenario: Consulta de um parque inexistente
- **WHEN** se envia `GET /api/parks/P9`
- **THEN** a resposta SHALL ser HTTP 404 com `{ "error": "NOT_FOUND" }`

#### Scenario: Registo num parque inexistente
- **WHEN** todos os parques estão vazios e se envia `POST /api/parks/P9/events` com `{ "type": "ENTRY" }`
- **THEN** a resposta SHALL ser HTTP 404 com `{ "error": "NOT_FOUND" }` e `GET /api/parks` SHALL devolver `total.occupied` igual a 0

#### Scenario: Parque inexistente com corpo inválido
- **WHEN** se envia `POST /api/parks/P9/events` com `{ "type": "PASS" }`
- **THEN** a resposta SHALL ser HTTP 404 com `{ "error": "NOT_FOUND" }`, e não HTTP 400

### Requirement: Rejeitar pedidos de registo inválidos

O sistema SHALL responder HTTP 400 com `{ "accepted": false, "reason": "INVALID_INPUT" }` a um `POST /api/parks/{parkId}/events` a um parque existente quando o corpo não é JSON válido, não é um objeto, ou não tem `type` com exatamente o valor `ENTRY` ou `EXIT`. Qualquer outro tipo de evento, incluindo uma tentativa de fixar a contagem, é inválido (decisão D16). Nenhuma ocupação SHALL mudar.

#### Scenario: Tipo de evento desconhecido
- **WHEN** `P1` tem 2 veículos e se envia `POST /api/parks/P1/events` com `{ "type": "PASS" }`
- **THEN** a resposta SHALL ser HTTP 400 com `{ "accepted": false, "reason": "INVALID_INPUT" }` e `GET /api/parks/P1` SHALL continuar a indicar `occupied: 2`

#### Scenario: JSON malformado
- **WHEN** se envia `POST /api/parks/P1/events` com o corpo `{broken`
- **THEN** a resposta SHALL ser HTTP 400 com `{ "accepted": false, "reason": "INVALID_INPUT" }`, e não com `allowed`
