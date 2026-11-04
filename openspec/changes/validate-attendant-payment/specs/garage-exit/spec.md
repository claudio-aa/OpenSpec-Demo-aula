## MODIFIED Requirements

### Requirement: Autorizar dentro da janela aprovada

O sistema SHALL autorizar uma tentativa com pagamento confirmado quando o tempo decorrido desde o pagamento seja não negativo e inferior ou igual à janela do ponto onde o pagamento foi registado. SHALL devolver `allowed: true` e `reason: VALID`. A janela SHALL ser de 900 000 milissegundos quando `paymentPoint` é `MACHINE` ou não está presente, e de 3 600 000 milissegundos quando `paymentPoint` é `ATTENDANT`. A inclusão da fronteira exata corresponde à decisão didática D1 e a janela do vigilante corresponde à decisão D8, com a mesma fronteira inclusiva. Um `paymentPoint` com o valor `null` SHALL ser tratado como não presente (decisão didática D7 e D9).

#### Scenario: Saída antes do limite
- **WHEN** o pagamento está confirmado e a tentativa ocorre 14 minutos e 59 segundos após o pagamento
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

#### Scenario: Saída exatamente no limite
- **WHEN** o pagamento está confirmado e a tentativa ocorre exatamente 15 minutos após o pagamento
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

#### Scenario: Saída no instante do pagamento
- **WHEN** o pagamento está confirmado e os dois instantes são iguais
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

#### Scenario: Pagamento registado pelo vigilante exatamente no limite
- **WHEN** o pagamento está confirmado, `paymentPoint` é `ATTENDANT` e a tentativa ocorre exatamente 60 minutos após o pagamento
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

#### Scenario: Pagamento registado pelo vigilante aos 30 minutos
- **WHEN** o pagamento está confirmado, `paymentPoint` é `ATTENDANT` e a tentativa ocorre 30 minutos após o pagamento
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

#### Scenario: Pagamento na caixa automática exatamente no limite
- **WHEN** o pagamento está confirmado, `paymentPoint` é `MACHINE` e a tentativa ocorre exatamente 15 minutos após o pagamento
- **THEN** a resposta SHALL indicar `allowed: true` e `reason: VALID`

### Requirement: Recusar tentativas sem autorização

O sistema SHALL recusar uma tentativa com dados válidos e sem pagamento com `allowed: false` e `reason: UNPAID`, mesmo que `paymentPoint` esteja presente com um valor válido. SHALL recusar uma tentativa paga cujo tempo decorrido excede a janela do ponto de pagamento (900 000 milissegundos para `MACHINE` ou sem ponto, 3 600 000 milissegundos para `ATTENDANT`) com `allowed: false` e `reason: EXPIRED`. SHALL devolver HTTP 200 para estas decisões de negócio.

#### Scenario: Pagamento inexistente
- **WHEN** `paid` é `false`, `paidAt` é `null` e `exitAt` é válido
- **THEN** a resposta SHALL indicar `UNPAID` e não autorizar a saída

#### Scenario: Janela ultrapassada por um milissegundo
- **WHEN** o pagamento está confirmado e a tentativa ocorre 900 001 milissegundos após o pagamento
- **THEN** a resposta SHALL indicar `EXPIRED` e não autorizar a saída

#### Scenario: Pagamento na caixa automática aos 30 minutos
- **WHEN** o pagamento está confirmado, `paymentPoint` é `MACHINE` e a tentativa ocorre 30 minutos após o pagamento
- **THEN** a resposta SHALL indicar `EXPIRED`, não autorizar a saída e responder HTTP 200

#### Scenario: Pedido sem ponto de pagamento aos 30 minutos
- **WHEN** o pagamento está confirmado, `paymentPoint` não está presente e a tentativa ocorre 30 minutos após o pagamento
- **THEN** a resposta SHALL indicar `EXPIRED` e não autorizar a saída

#### Scenario: Ponto de pagamento nulo aos 30 minutos
- **WHEN** o pagamento está confirmado, `paymentPoint` é `null` e a tentativa ocorre 30 minutos após o pagamento
- **THEN** a resposta SHALL indicar `EXPIRED` e não autorizar a saída

#### Scenario: Janela do vigilante ultrapassada por um milissegundo
- **WHEN** o pagamento está confirmado, `paymentPoint` é `ATTENDANT` e a tentativa ocorre 3 600 001 milissegundos após o pagamento
- **THEN** a resposta SHALL indicar `EXPIRED`, não autorizar a saída e responder HTTP 200

#### Scenario: Ponto de pagamento válido sem pagamento confirmado
- **WHEN** `paid` é `false`, `paidAt` é `null`, `paymentPoint` é `ATTENDANT` e `exitAt` é válido
- **THEN** a resposta SHALL indicar `UNPAID`, não autorizar a saída e responder HTTP 200

### Requirement: Rejeitar entradas inválidas

A API SHALL receber um objeto com `paid` booleano e `exitAt` num timestamp ISO 8601 com timezone explícito. O formato aceite SHALL ser `YYYY-MM-DDTHH:mm:ss`, seguido opcionalmente de uma fração de 1 a 3 dígitos e obrigatoriamente de `Z` ou offset `±HH:mm`. As horas SHALL estar entre 00 e 23, e minutos e segundos entre 00 e 59. `paidAt` SHALL ser `null` ou um timestamp válido com timezone, sendo obrigatório um timestamp quando `paid` é `true`. `paymentPoint` é opcional: quando presente, SHALL ser `null`, `MACHINE` ou `ATTENDANT` (decisão didática D7). Outros valores e tipos incorretos de `paymentPoint` SHALL ser inválidos, mesmo sem pagamento confirmado (decisão didática D10). Datas de calendário inexistentes, campos obrigatórios em falta, tipos incorretos e saída anterior ao pagamento confirmado SHALL produzir HTTP 400, `allowed: false` e `reason: INVALID_INPUT`. Um valor não nulo de `paidAt` SHALL ser validado mesmo sem pagamento confirmado.

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

#### Scenario: Ponto de pagamento desconhecido
- **WHEN** `paid` é `true`, os instantes são válidos e `paymentPoint` é `"ATM"`
- **THEN** a API SHALL responder HTTP 400 e `INVALID_INPUT`

#### Scenario: Ponto de pagamento com tipo incorreto
- **WHEN** `paid` é `true`, os instantes são válidos e `paymentPoint` é o número `1`
- **THEN** a API SHALL responder HTTP 400 e `INVALID_INPUT`

#### Scenario: Ponto de pagamento inválido sem pagamento confirmado
- **WHEN** `paid` é `false`, `paidAt` é `null` e `paymentPoint` é `"ATM"`
- **THEN** a API SHALL responder HTTP 400 e `INVALID_INPUT`
