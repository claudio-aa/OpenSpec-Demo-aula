## Context

Ver `proposal.md` para motivação e a spec `garage-exit` para comportamento. O starter já expõe `POST /api/exit-decisions` e uma interface React. A regra está isolada em `server/exit-decision.js`.

## Goals / Non-Goals

**Goals:** manter a regra determinística e independente do relógio da máquina, recebendo ambos os instantes no pedido. Separar a decisão do transporte HTTP para permitir testes rápidos.

**Non-Goals:** validar pagamentos reais, inferir passagem física na cancela, manter estado de bilhetes ou calcular novas cobranças. Os instantes recebidos servem apenas o simulador.

## Decisions

- Usar milissegundos decorridos em vez de minutos arredondados para preservar a fronteira aprovada. Um milissegundo adicional já excede a janela.
- Exigir timezone e validar o calendário antes da comparação. O parsing permissivo de datas pode normalizar datas inexistentes.
- Reutilizar o contrato `{ allowed, reason }` existente. HTTP 400 representa erro de entrada, e HTTP 200 representa uma decisão de negócio válida, incluindo recusa.
- Manter a função pura e usar `node:test`, evitando dependências adicionais. Ler o relógio diretamente dificultaria reproduzir os cenários.

## Risks / Trade-offs

O cliente do simulador pode escolher os instantes e o estado de pagamento. Esta flexibilidade serve a aula e não constitui prova de pagamento nem controlo de acesso adequado a produção. A aplicação não grava decisões, pelo que chamadas repetidas avaliam novamente o mesmo pedido.
