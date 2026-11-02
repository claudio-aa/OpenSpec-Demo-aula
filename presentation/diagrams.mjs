// Esquemas funcionais pedidos para a aula, com objetos nativos editáveis.
export function drawDiagram(slide, data, ctx) {
  const { font, text, colors: C } = ctx;
  const palette = {
    source: { fill: '#EDF1EF', stroke: '#667A7B', color: C.ink },
    artifact: { fill: '#FFFFFF', stroke: '#8D9C99', color: C.ink },
    agent: { fill: '#E1F5EF', stroke: C.teal, color: C.ink },
    human: { fill: C.ink, stroke: C.ink, color: C.white },
    tool: { fill: '#F0F3F1', stroke: '#667A7B', color: C.ink }
  };
  const nodes = new Map();
  for (const node of data.nodes) {
    const p = palette[node.role || 'artifact'];
    const shape = slide.shapes.add({
      geometry: 'rect', name: node.id,
      position: { left: node.x, top: node.y, width: node.w, height: node.h },
      fill: p.fill,
      line: { fill: p.stroke, width: 1.5 }
    });
    shape.text = node.label;
    shape.text.style = {
      typeface: font, fontSize: node.size || 26, color: p.color,
      bold: false, alignment: 'center', verticalAlignment: 'middle',
      wrap: 'square', autoFit: 'none',
      insets: { left: 12, right: 12, top: 8, bottom: 8 }
    };
    nodes.set(node.id, shape);
  }
  const connect = (source, target, options = {}, arrow = true) => slide.shapes.connect(source, target, {
    kind: options.kind || 'elbow',
    fromSide: options.fromSide, toSide: options.toSide,
    line: { style: options.dash ? 'dashed' : 'solid', fill: options.color || C.teal, width: 2.5 },
    tail: { type: arrow ? 'arrow' : 'none', width: 'med', length: 'med' }
  });
  for (const edge of data.edges || []) connect(nodes.get(edge.source), nodes.get(edge.target), edge);
  for (const [index, route] of (data.routes || []).entries()) {
    const waypoints = route.via.map(([x, y], j) => slide.shapes.add({
      geometry: 'rect', name: `routing-${index}-${j}`,
      position: { left: x, top: y, width: 1, height: 1 },
      fill: 'none', line: { fill: 'none', width: 0 }
    }));
    const chain = [nodes.get(route.source), ...waypoints, nodes.get(route.target)];
    for (let j = 0; j < chain.length - 1; j++) connect(chain[j], chain[j + 1], {
      kind: 'straight', dash: route.dash, color: route.color,
      fromSide: j === 0 ? route.fromSide : undefined,
      toSide: j === chain.length - 2 ? route.toSide : undefined
    }, j === chain.length - 2);
    if (route.label) {
      const l = route.label;
      text(slide, l.text, l.x, l.y, l.w, l.h, l.size || 24, l.color || C.teal, false);
    }
  }
  for (const l of data.labels || []) text(slide, l.text, l.x, l.y, l.w, l.h, l.size || 24, l.color || C.muted, l.bold || false);
}

export function drawTrialChart(slide, data, ctx) {
  const { font, text, colors: C, applyChartFont } = ctx;
  const total = data.chart.categories.map((_, i) => data.chart.series.reduce((n, series) => n + series.values[i], 0));
  text(slide, 'Tokens de entrada e saída numa execução', 70, 175, 850, 40, 25, C.muted);
  const chart = slide.charts.add('bar', {
    position: { left: 70, top: 220, width: 760, height: 240 },
    categories: ['Decisão (integrada)', 'Completa (rejeitada)'],
    series: [{ name: 'Tokens', values: [...total].reverse(), fill: C.teal,
      points: [{ idx: 0, fill: C.teal }, { idx: 1, fill: '#93B7B4' }] }],
    barOptions: { direction: 'bar', grouping: 'clustered', gapWidth: 90 },
    hasLegend: false,
    xAxis: { visible: true, textStyle: { fontSize: 24, fill: C.ink }, line: { fill: 'none', width: 0 } },
    yAxis: { visible: true, min: 0, max: 3100, majorGridlines: null, textStyle: { fontSize: 24, fill: C.ink }, line: { fill: 'none', width: 0 } },
    dataLabels: { showValue: true, position: 'outEnd', textStyle: { fontSize: 26, bold: true, fill: C.ink } },
    chartFill: 'none', plotAreaFill: 'none', chartLine: { fill: 'none', width: 0 }
  });
  applyChartFont(chart, { fontFamily: font });
  text(slide, '64,6 s\nCasos básicos falharam.\n\n6,35 s\nFunção decide integrada.', 900, 225, 310, 255, 25, C.ink);
  drawDiagram(slide, {
    nodes: [
      { id: 'input', label: 'Entradas já validadas', x: 70, y: 490, w: 300, h: 65, role: 'artifact', size: 25 },
      { id: 'decide', label: 'decide(paid, elapsedMs)', x: 455, y: 490, w: 370, h: 65, role: 'agent', size: 25 },
      { id: 'output', label: 'allowed e reason', x: 910, y: 490, w: 300, h: 65, role: 'artifact', size: 25 }
    ],
    edges: [{ source: 'input', target: 'decide', fromSide: 'right', toSide: 'left' }, { source: 'decide', target: 'output', fromSide: 'right', toSide: 'left' }]
  }, ctx);
}
