## Why

O simulador actual verifica apenas o estado de pagamento, sem considerar o tempo decorrido para autorização de saída. Actualmente é necessário consultar o sistema externo em cada tentativa, violando princípios de desacoplamento. Esta alteração permite validação local com decisão automática após a expiração do período autorizado (15 minutos).

## What Changes

- **Novo comportamento de validação**: O simulador avalia condições temporais e decide se uma tentativa de saída pode ser autorizada.
- **Comportamento actual**: Tentativa de saída é sempre aceita se o bilhete estiver pago, sem verificação temporal.
- Nova decisão: Recusar com status `EXPIRED` quando tempo exceder 15 minutos após pagamento.

## Capabilities

### New Capabilities

- `exit-validation`: Validação de autorização de saída baseada em estado de pagamento e tempo decorrido desde o pagamento. Permite que o simulador decida se uma tentativa individual é autorizada sem consulta externa.

### Modified Capabilities

Sem alterações nestas capacidades, pois não há especificações existentes a modificar. A nova funcionalidade adiciona validação temporal que opera em paralelo à verificação de estado de pagamento.

## Impact

- Código do simulador actual: Adição da lógica temporal para autorização de saída.
- Comportamento testado: Cenários de tempo excedido resultam em recusa automática com `EXPIRED`.
- Integração externa: Reduz dependência a sistemas externos através de validação local.
