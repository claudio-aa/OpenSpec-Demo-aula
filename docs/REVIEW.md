# Revisão e evidência da solução de referência

## Verificações executadas

- `npm test`: 26 testes passaram, incluindo 22 da regra e quatro de infraestrutura/API.
- `npm run build`: compilação da interface concluída.
- Validação OpenSpec estrita da alteração: passou antes do arquivo.
- HTTP local: a página compilada foi servida e a API autorizou exatamente15 minutos.
- Checkpoints00 e01: os três testes de infraestrutura passaram. O starter compilou. A alteração do checkpoint01 passou a validação OpenSpec.

Os testes cobrem instante do pagamento, 14:59, 15:00, 15:00.001, 15:01, ausência de pagamento, entradas inválidas, calendário, ano bissexto, ordem temporal e equivalência de offsets. As decisões de negócio válidas usam HTTP200 e entradas inválidas usam HTTP400.

## Revisão com outro modelo local

O implementador usou Qwen3.5 4B para a função de decisão reduzida. O revisor usou Qwen3 4B, uma geração e pesos diferentes, através de `scripts/local-packet.mjs`. A revisão textual não executou testes. O relatório completo está em [examples/qwen3-review.json](../examples/qwen3-review.json).

O modelo alegou em duas entradas que900001ms seria aceite. A suspeita foi reproduzida contra a implementação, com este resultado:

```text
900000 {"allowed":true,"reason":"VALID"}
900001 {"allowed":false,"reason":"EXPIRED"}
```

Os achados eram falsos positivos. Não se alterou o código para satisfazer o revisor. A referência segue a decisão D1 e os testes correspondentes. Uma revisão feita por outro modelo continua a exigir reprodução e avaliação humana.

## Limites da evidência

A solução avalia pedidos simulados, sem persistência, pagamento real ou equipamento físico. A revisão não é uma auditoria de produção. A leitura de um ficheiro por um agente e a conclusão de uma resposta não provam que a sua interpretação é correta. O enunciado e as decisões aprovadas continuam a definir o comportamento esperado.
