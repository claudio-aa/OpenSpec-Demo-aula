## 1. Configuração do Simulador

- [ ] 1.1 Adicionar campo `timestamp_do_pagamento` ao modelo de bilhete e verificar que o teste existente ainda passa (cenário de pagamento válido)

## 2. Implementação da Validação Temporal

- [ ] 2.1 Criar função `validar_authorizacao_saida(bilhete, timestamp_tentativa_`) que recebe os dados do bilhete e o instante da tentativa
- [ ] 2.2 Implementar cálculo de intervalo em milissegundos usando a Decisão D8 (timestamps ISO 8601)
- [ ] 2.3 Adicionar verificação de tempo decorrido com limite de 900000 ms (Decisão D1 do briefing)
- [ ] 2.4 Gerar resposta `EXPIRED` automaticamente quando tempo exceder e o sistema não tiver cobrado após 15 minutos

## 3. Decisão de Negócio e Erros

- [ ] 3.1 Garantir que erros de pagamento (`UNPAID`, `INVALID_INPUT`) sejam tratados independentemente da expiração temporal
- [ ] 3.2 Testar cenários múltiplos de saída consecutiva (uma válida, depois uma inválida)

## 4. Verificação e Validação

- [ ] 4.1 Executar todos os testes existentes para garantir compatibilidade regressiva
