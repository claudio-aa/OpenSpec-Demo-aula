import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const scenarios = [
  { label: '14 min 59 s', seconds: 899, paid: true },
  { label: '15 min exatos', seconds: 900, paid: true },
  { label: '15 min 01 s', seconds: 901, paid: true },
  { label: 'Não pago', seconds: 60, paid: false },
];
const messages = { NOT_IMPLEMENTED: 'Regra por implementar', VALID: 'Saída autorizada', UNPAID: 'Bilhete não pago', EXPIRED: 'Prazo ultrapassado', INVALID_INPUT: 'Dados inválidos' };
function App() {
  const [scenario, setScenario] = useState(0);
  const [paid, setPaid] = useState(true);
  const [paidAt, setPaidAt] = useState('2026-11-02T10:00:00Z');
  const [exitAt, setExitAt] = useState('2026-11-02T10:14:59Z');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  function select(index) {
    setScenario(index); setPaid(scenarios[index].paid);
    setPaidAt('2026-11-02T10:00:00Z');
    setExitAt(new Date(Date.parse('2026-11-02T10:00:00Z') + scenarios[index].seconds * 1000).toISOString());
    setResult(null); setError('');
  }
  async function evaluate(event) {
    event.preventDefault(); setBusy(true); setError(''); setResult(null);
    try {
      const response = await fetch('/api/exit-decisions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paid, paidAt: paid ? paidAt : null, exitAt }) });
      const body = await response.json();
      if (!body.reason) throw new Error();
      setResult(body);
    } catch { setError('Não foi possível contactar o servidor. Confirma que está a correr em localhost:3000.'); }
    finally { setBusy(false); }
  }
  return <main>
    <header><a className="brand" href="/" aria-label="Página inicial"><span className="brand-icon">P</span> Gafanhápolis</a><span className="tag">Laboratório de Análise de Sistemas</span></header>
    <section className="intro"><p className="eyebrow">DO REQUISITO À DECISÃO</p><h1>O bilhete pode<br/>autorizar a saída?</h1><p className="lede">Explora a regra dos 15 minutos e verifica como uma decisão de negócio se transforma em software.</p></section>
    <div className="workspace"><section className="panel"><div className="section-title"><span className="step">01</span><h2>Experimentar um cenário</h2></div><div className="scenarios">{scenarios.map((item, index) => <button type="button" key={item.label} className={scenario === index ? 'selected' : ''} onClick={() => select(index)}>{item.label}</button>)}</div>
    <form onSubmit={evaluate}><label className="check"><input type="checkbox" checked={paid} onChange={e => { setPaid(e.target.checked); setScenario(-1); setResult(null); }}/><span>Bilhete pago</span></label><label>Instante do pagamento<input type="text" value={paidAt} disabled={!paid} onChange={e => { setPaidAt(e.target.value); setScenario(-1); setResult(null); }} spellCheck="false"/></label><label>Instante da saída<input type="text" value={exitAt} onChange={e => { setExitAt(e.target.value); setScenario(-1); setResult(null); }} spellCheck="false"/></label><p className="hint">ISO 8601 com fuso horário: Z ou ±hh:mm.</p><button className="submit" disabled={busy}>{busy ? 'A avaliar…' : 'Avaliar saída'}<span aria-hidden="true">↗</span></button></form></section>
    <section className="panel result-panel"><div className="section-title"><span className="step">02</span><h2>Observar a decisão</h2></div><div aria-live="polite" className={'result ' + (result ? (result.allowed ? 'allowed' : 'denied') : '')}><span className="signal" aria-hidden="true">{result ? (result.allowed ? '✓' : '−') : '?'}</span><h3>{result ? messages[result.reason] || result.reason : 'À espera de um cenário'}</h3><p>{result ? 'Resposta produzida pela API do simulador.' : 'Escolhe os dados e avalia a saída para consultar o resultado.'}</p>{result && <pre>{JSON.stringify(result, null, 2)}</pre>}{error && <p role="alert">{error}</p>}</div></section></div>
    <aside><strong>Regra em discussão</strong><p>Um bilhete pago permite sair até 15 minutos após o pagamento. O limite de 15:00 é inclusivo por decisão pedagógica a validar com o responsável pelo requisito.</p></aside><footer>Simulação educativa · Sem pagamentos reais ou ligação a cancelas.</footer>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
