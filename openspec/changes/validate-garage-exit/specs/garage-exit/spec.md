## Purpose

Permitir avaliar uma tentativa simulada de saída de um parque de estacionamento, relacionando o pagamento e o tempo decorrido com uma decisão explicável.

## ADDED Requirements

### Requirement: Autorizar dentro da janela aprovada

O sistema SHALL autorizar uma tentativa com pagamento confirmado quando o tempo decorrido desde o pagamento seja não negativo e inferior ou igual a 900 000 milissegundos. SHALL devolver `allowed: true` e `reason: VALID`. A inclusão da fronteira exata corresponde à decisão didática D1.

#### Scenario: Saída antes do limite
- **WHEN** o pagamento está confirmado e a tentativa ocorre 14 minutos e 59 segundos após o pagamento
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

#### Scenario: Saída exatamente no limite
- **WHEN** o pagamento está confirmado e a tentativa ocorre exatamente 15 minutos após o pagamento
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

#### Scenario: Saída no instante do pagamento
- **WHEN** o pagamento está confirmado e os dois instantes são iguais
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

### Requirement: Recusar tentativas sem autorização

O sistema SHALL recusar uma tentativa com dados válidos e sem pagamento com `allowed: false` e `reason: UNPAID`. SHALL recusar uma tentativa paga cuja janela já terminou com `allowed: false` e `reason: EXPIRED`. SHALL devolver HTTP 200 para estas decisões de negócio.

#### Scenario: Pagamento inexistente
- **WHEN** `paid` é `false`, `paidAt` é `null` e `exitAt` é válido
- **THEN** a resposta SHALL indicar `UNPAID` e não autorizar a saída

#### Scenario: Janela ultrapassada por um milissegundo
- **WHEN** o pagamento está confirmado e a tentativa ocorre 900 001 milissegundos após o pagamento
- **THEN** a resposta SHALL indicar `EXPIRED` e não autorizar a saída

### Requirement: Rejeitar entradas inválidas

A API SHALL receber um objeto com `paid` booleano e `exitAt` num timestamp ISO 8601 com timezone explícito. `paidAt` SHALL ser `null` ou um timestamp válido com timezone, sendo obrigatório um timestamp quando `paid` é `true`. Datas de calendário inexistentes, campos obrigatórios em falta, tipos incorretos e saída anterior ao pagamento confirmado SHALL produzir HTTP 400, `allowed: false` e `reason: INVALID_INPUT`. Um valor não nulo de `paidAt` SHALL ser validado mesmo sem pagamento confirmado.

#### Scenario: Booleano incorreto
- **WHEN** `paid` é a string `"true"`
- **THEN** a API SHALL responder HTTP 400 e `INVALID_INPUT`

#### Scenario: Data impossível ou timezone ausente
- **WHEN** um timestamp obrigatório contém 30 de fevereiro ou não contém timezone
- **THEN** a API SHALL responder HTTP 400 e `INVALID_INPUT`

#### Scenario: Pagamento confirmado sem instante
- **WHEN** `paid` é `true` e `paidAt` é `null`
- **THEN** a API SHALL responder HTTP 400 e `INVALID_INPUT`

#### Scenario: Tentativa anterior ao pagamento
- **WHEN** `paid` é `true` e `exitAt` é anterior a `paidAt`
- **THEN** a API SHALL responder HTTP 400 e `INVALID_INPUT`

### Requirement: Comparar instantes independentemente do timezone

O sistema SHALL calcular tempo decorrido entre instantes absolutos. Representações equivalentes com offsets diferentes SHALL produzir a mesma decisão.

#### Scenario: Instantes equivalentes
- **WHEN** o pagamento ocorre às `10:00:00Z` e a tentativa às `11:15:00+01:00` no mesmo dia
- **THEN** a resposta SHALL indicar `VALID` porque decorreram exatamente 15 minutos
