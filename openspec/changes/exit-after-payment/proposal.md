## Why

O enunciado CE4 diz: «Após pagamento, o condutor tem 15 minutos para sair; a cancela valida o bilhete se estiver dado como pago no sistema.» O simulador atual ainda não decide: devolve sempre `NOT_IMPLEMENTED`. Esta alteração especifica a decisão de saída com as decisões D1–D6 aprovadas pelo docente, no papel de responsável pelo processo.

## What Changes

- **Novo comportamento de validação**: O simulador avalia condições temporais e decide se uma tentativa de saída pode ser autorizada.
- **Comportamento atual**: o simulador devolve `NOT_IMPLEMENTED` para qualquer tentativa.
- Nova decisão: Recusar com status `EXPIRED` quando tempo exceder 15 minutos após pagamento.

## Capabilities

### New Capabilities

- `exit-validation`: Validação de autorização de saída baseada em estado de pagamento e tempo decorrido desde o pagamento. Permite que o simulador decida se uma tentativa individual é autorizada.

### Modified Capabilities

Sem alterações nestas capacidades, pois não há especificações existentes a modificar. A nova funcionalidade adiciona validação temporal que opera em paralelo à verificação de estado de pagamento.

## Impact

- Código do simulador actual: Adição da lógica temporal para autorização de saída.
- Comportamento testado: Cenários de tempo excedido resultam em recusa automática com `EXPIRED`.
