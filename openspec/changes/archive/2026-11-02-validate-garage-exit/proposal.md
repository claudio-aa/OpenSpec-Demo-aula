## Why

O processo do parque prevê uma janela de 15 minutos após pagamento, mas o starter não avalia essa regra. Uma decisão explícita e testável permite demonstrar a ligação entre análise do processo e comportamento do sistema.

## What Changes

- Avaliar o pagamento e o tempo decorrido numa tentativa de saída simulada.
- Explicar a decisão com um código estável e rejeitar dados inválidos.
- Verificar cenários aprovados com testes automáticos.

As decisões D1 a D6 de `docs/BRIEF.md` constituem a referência aprovada pelo formador para este exercício. Cada grupo confirma a aprovação antes de aplicar a alteração.

## Capabilities

### New Capabilities

- `garage-exit`: autorização simulada de saída de um parque após pagamento.

### Modified Capabilities

Nenhuma. Não existem capacidades anteriores neste starter.

## Impact

Regra em `server/exit-decision.js`, testes em `test/` e resposta da API existente. A interface já permite experimentar os cenários. Não introduz dependências, pagamentos reais, persistência ou controlo de equipamentos.
