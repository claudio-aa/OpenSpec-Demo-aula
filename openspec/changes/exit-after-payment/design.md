## Context

O simulador actual realiza apenas validação de estado ao aceitar tentativas de saída. A decisão temporal pode ser verificada em tempo real a partir do timestamp de pagamento armazenado no simulador, sem comunicação inter-sistema. O contexto é local e estático, com persistência em memória (sem armazenamento externo ou hardware).

## Goals / Non-Goals

**Goals:**
- Implementar lógica de validação temporal que decida autorização de saída com base no tempo decorrido desde o pagamento
- Decidir automaticamente com status `EXPIRED` quando tempo exceder 15 minutos após pagamento
- Manter consistência com decisão de negócio (D1 em docs/BRIEF.md)

**Non-Goals:**
- Implementar persistência de dados ou hardware no simulador
- Processar pagamentos reais ou inter-comunicar com sistemas externos
- Registrar eventos completos de ocupação em folhas de cálculo

## Decisions

### D7 - Validação Local sem Consulta Externa
**Decision**: A autorização será decidiva no simulador baseada no estado interno do bilhete e timestamp de pagamento.
**Rationale**: Minimiza dependência externa e simplifica a validação de cenários isolados.
**Alternatives considerados**: Consulta inter-sistema (mais complexo, maior latência).

### D8 - Tempo em milissegundos ISO 8601
**Decision**: Timestamps são armazenados e processados em milissegundos ISO 8601 com timezone explícita.
**Rationale**: Permite cálculo preciso de intervalo entre eventos; alinhado com Decisão D5 do briefing.
**Alternatives considerados**: Horas formatadas, segundos Unix (perde informação sub-hora).

### D9 - Recusa sem Nova Cobrança
**Decision**: Tentativas após 15 minutos resultam em recusa com `EXPIRED`, sem tentar cobrar novamente.
**Rationale**: Respeita Decisão D2 do briefing; evitaria cobranças indevidas por sistema antigo.
**Alternatives considerados**: Nova cobrança automática (violaria princípio de não inventar comportamentos).

## Risks / Trade-offs

- **R1**: Simples não permite rastreamento complexo → Mitigação: escopo limitado a regra de saída única.
- **R2**: Teste manual requer cálculo preciso de tempo → Mitigação: casos de teste com timestamps calculados exatos.

## Migration Plan

1. Adicionar timestamp de pagamento ao simulador (exige alteração no esquema de entrada de dados).
2. Implementar lógica de validação temporal no processador de saída.
3. Manter compatibilidade total com cenário não-expirado para migração sem interrupção.

## Open Questions

Nenhuma questão aberta; todas as decisões técnicas alinhadas com Decisões D1-D6 do briefing foram tomadas.
