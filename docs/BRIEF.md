# Caso de estudo e recorte do exercício

Fonte: [CE4 Estacionamento em Gafanhapolis](../CE4-Estacionamento%20em%20Gafanhapolis.docx), fornecido para esta demonstração. O título refere Gafanhapolis e o corpo refere Megapolis. Conservamos esta diferença como questão de terminologia a esclarecer, sem inventar duas cidades distintas.

## Factos do enunciado

A empresa municipal gere 1 200 lugares tarifados na via pública, três parques cobertos com capacidade total de 850 lugares, 85 parcómetros e 12 vigilantes em turnos.

Na via pública, o condutor procura um parcómetro, paga com moedas e coloca um talão no veículo. A fiscalização e o registo posterior dos autos dependem de papel e introdução manual de dados. Nos parques cobertos, o condutor retira um bilhete, procura lugar sem indicação de disponibilidade e paga em numerário numa máquina ou junto do vigilante. Após o pagamento, dispõe de 15 minutos para sair. A cancela valida se o bilhete está pago. Os vigilantes registam a ocupação manualmente em folhas de cálculo.

Os problemas incluem falta de moedas, dificuldade em prever o tempo necessário, avarias nas máquinas e informação insuficiente sobre ocupação. O objetivo do caso é propor reengenharia de processos e representá-la com diagramas de atividades UML, explorando serviços digitais e IoT.

## Proposta para a aula

Representar o processo atual de saída e uma proposta de processo com validação digital. Depois, usar uma pequena regra desse processo para demonstrar OpenSpec e agentes. O simulador recebe o estado de pagamento e os instantes de pagamento e de tentativa de saída. Devolve uma decisão verificável e uma razão.

O recorte demonstra uma regra do processo. Não implementa toda a transformação digital nem produz informação real de ocupação. Uma futura alteração poderá explorar eventos de entrada e saída, observando que uma autorização não prova que o veículo atravessou a cancela.

## Decisões do exercício para validação humana

| ID | Tema | Decisão de referência do formador |
| --- | --- | --- |
| D1 | Exatamente 15 minutos | Aceitar até 900 000 ms, inclusive |
| D2 | Janela ultrapassada | Recusar e indicar `EXPIRED`, sem inventar uma nova cobrança |
| D3 | Pagamento inexistente | Recusar com `UNPAID` |
| D4 | Dados incoerentes | Recusar entrada com `INVALID_INPUT` e HTTP 400 |
| D5 | Tempo | Instantes ISO com timezone explícito, cálculo de tempo decorrido |
| D6 | Âmbito | Avaliação simulada sem persistência, sem consumo do bilhete e sem hardware |

D1 a D6 são opções didáticas. O enunciado não define todas estas condições. Na aula, o docente representa o responsável pelo processo e aprova as escolhas antes da implementação.

## Evidência de aprendizagem

Cada grupo explica uma ambiguidade, relaciona uma decisão com um cenário de aceitação e mostra o teste correspondente. O diagrama de atividades deve evidenciar responsável, decisão de pagamento, decisão temporal e caminho de exceção. O código complementa a análise do processo.
