import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * GrowthProductHero — "Как это работает" for Growth Manager.
 * ARCHITECTURE: FRAME (fixed size) + CANVAS (content inside).
 * Frame = laptop screen. Canvas = SaaS dashboard.
 * Nothing escapes the frame. Animation = cursor + highlights + numbers.
 */

type Phase = 'idle' | 'hover' | 'highlight' | 'apply' | 'result';
const PHASES: Phase[] = ['idle', 'hover', 'highlight', 'apply', 'result'];
const DURATIONS: Record<Phase, number> = {
  idle: 2000, hover: 2500, highlight: 3000, apply: 1500, result: 5000,
};

interface Props { embedded?: boolean; }

const GrowthProductHero = ({ embedded = false }: Props) => {
  const wrapRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [conv, setConv] = useState(1.8);
  const [leads, setLeads] = useState(94);
  const [form, setForm] = useState(860);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = []; }, []);

  const run = useCallback(() => {
    clear();
    setPhase('idle'); setConv(1.8); setLeads(94); setForm(860);
    let t = 0;
    PHASES.forEach((p, i) => {
      if (!i) return;
      t += DURATIONS[PHASES[i - 1]];
      timers.current.push(setTimeout(() => setPhase(p), t));
    });
    const rs = t; const N = 30; const D = 1800;
    for (let s = 1; s <= N; s++) {
      timers.current.push(setTimeout(() => {
        const e = 1 - Math.pow(1 - s / N, 3);
        setConv(+(1.8 + 0.7 * e).toFixed(1));
        setLeads(Math.round(94 + 40 * e));
        setForm(Math.round(860 + 274 * e));
      }, rs + 400 + (D / N) * s));
    }
    timers.current.push(setTimeout(run, t + DURATIONS.result + 2000));
  }, [clear]);

  useEffect(() => { if (revealed) { run(); return clear; } }, [revealed, run, clear]);

  const pi = PHASES.indexOf(phase);
  const hover = pi >= 1;
  const hl = pi >= 2;
  const res = phase === 'result';

  const content = (
    <section ref={wrapRef} className={`gph-dash${revealed ? ' gph-dash--revealed' : ''}${embedded ? ' gph-dash--embedded' : ''}`}>
      <div className="gph-dash__header">
        <span className="gph-dash__label">КАК ЭТО РАБОТАЕТ</span>
        <h2 className="gph-dash__title"><span className="heading-latin">AI</span> НАХОДИТ ПРОБЛЕМЫ<br /><span className="gph-dash__title-accent">И ИСПРАВЛЯЕТ ИХ</span></h2>
        <p className="gph-dash__sub">Анализирует данные, находит где теряются клиенты и внедряет изменения — автоматически.</p>
      </div>

      {/* ═══ FRAME — fixed size, overflow hidden ═══ */}
      <div className="gdf">
        {/* ── Sidebar ── */}
        <nav className="gdf__side">
          <div className="gdf__side-logo">F</div>
          <div className="gdf__side-item gdf__side-item--on">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
          </div>
          <div className="gdf__side-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2 4h12v1H2zm0 3.5h12v1H2zm0 3.5h12v1H2z"/></svg>
          </div>
          <div className="gdf__side-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3l2 2"/></svg>
          </div>
          <div className="gdf__side-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M3 2l10 6-10 6z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
          </div>
          <div className="gdf__side-sep" />
          <div className="gdf__side-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a3 3 0 013 3v2H5V4a3 3 0 013-3zM4 7h8v6a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" fill="none" stroke="currentColor" strokeWidth="1.3"/></svg>
          </div>
        </nav>

        {/* ── Canvas — all dashboard content ── */}
        <div className="gdf__canvas">
          {/* Top bar */}
          <div className="gdf__top">
            <div className="gdf__top-l">
              <span className="gdf__top-title">FamTeam Analytics</span>
              <span className="gdf__top-proj">famteam.pro</span>
            </div>
            <div className="gdf__top-r">
              <span className="gdf__top-period">30 дней</span>
              <span className="gdf__top-live"><span className={`gdf__dot${res ? ' gdf__dot--ok' : ''}`} />{res ? 'UPDATED' : 'LIVE'}</span>
            </div>
          </div>

          {/* KPI */}
          <div className="gdf__kpi">
            <div className={`gdf__kpi-item${res ? ' gdf__kpi-item--up' : ''}`}>
              <span className="gdf__kpi-label">Конверсия</span>
              <span className="gdf__kpi-val">{conv.toFixed(1)}%</span>
              {res && <span className="gdf__kpi-delta">+39%</span>}
            </div>
            <div className={`gdf__kpi-item${res ? ' gdf__kpi-item--up' : ''}`}>
              <span className="gdf__kpi-label">Заявки</span>
              <span className="gdf__kpi-val">{leads}</span>
              {res && <span className="gdf__kpi-delta">+42%</span>}
            </div>
            <div className="gdf__kpi-item">
              <span className="gdf__kpi-label">Визиты</span>
              <span className="gdf__kpi-val">3 240</span>
              <span className="gdf__kpi-delta gdf__kpi-delta--muted">+18%</span>
            </div>
          </div>

          {/* Main 3-col grid */}
          <div className="gdf__grid3">
            {/* Donut */}
            <div className="gdf__cell">
              <span className="gdf__cell-t">Источники</span>
              <svg viewBox="0 0 64 64" className="gdf__donut">
                <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
                <circle cx="32" cy="32" r="24" fill="none" stroke="var(--c-accent)" strokeWidth="8" strokeDasharray="93 151" strokeLinecap="round"/>
                <circle cx="32" cy="32" r="24" fill="none" stroke="#818cf8" strokeWidth="8" strokeDasharray="42 202" strokeDashoffset="-93" strokeLinecap="round"/>
                <circle cx="32" cy="32" r="24" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="15 229" strokeDashoffset="-135" strokeLinecap="round"/>
                <text x="32" y="34" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">3 240</text>
              </svg>
              <div className="gdf__legend">
                <span><i style={{background:'var(--c-accent)'}}/>62%</span>
                <span><i style={{background:'#818cf8'}}/>28%</span>
                <span><i style={{background:'#f59e0b'}}/>10%</span>
              </div>
            </div>

            {/* Bars */}
            <div className="gdf__cell">
              <span className="gdf__cell-t">Каналы</span>
              <div className="gdf__bars">
                <div className="gdf__bar"><span>Реклама</span><div className="gdf__bar-track"><div style={{width:'70%',background:'#818cf8'}}/></div><span>2.8%</span></div>
                <div className="gdf__bar"><span>Органика</span><div className="gdf__bar-track"><div style={{width:'48%',background:'var(--c-accent)'}}/></div><span>1.9%</span></div>
                <div className="gdf__bar"><span>Соцсети</span><div className="gdf__bar-track"><div style={{width:'30%',background:'#f59e0b'}}/></div><span>1.2%</span></div>
              </div>
            </div>

            {/* Graph */}
            <div className="gdf__cell">
              <span className="gdf__cell-t">Конверсия 30д</span>
              <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="gdf__graph">
                <polyline points="0,45 25,43 50,47 75,40 100,43 125,38 150,41 175,39 200,40" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
                {res && <polyline points="0,45 25,43 50,47 75,40 100,35 125,28 150,24 175,18 200,14" fill="none" stroke="#22c55e" strokeWidth="1.5" className="gdf__graph-grow"/>}
                <circle cx={res?200:175} cy={res?14:39} r="3" fill={res?'#22c55e':'#f59e0b'} className="gdf__pulse"/>
              </svg>
            </div>
          </div>

          {/* Bottom 2-col */}
          <div className="gdf__grid2">
            {/* Funnel */}
            <div className={`gdf__cell gdf__cell--funnel${hover ? ' gdf__cell--hl' : ''}`}>
              <span className="gdf__cell-t">Воронка</span>
              <div className="gdf__funnel">
                <div className="gdf__f-row"><div className="gdf__f-bar" style={{width:'100%'}}/><span>Визиты</span><b>3 240</b></div>
                <div className={`gdf__f-row${hover&&!res?' gdf__f-row--warn':''}`}><div className="gdf__f-bar" style={{width:res?'35%':'27%'}}/><span>Форма</span><b>{form}</b></div>
                <div className="gdf__f-row"><div className="gdf__f-bar gdf__f-bar--acc" style={{width:res?'4%':'3%'}}/><span>Заявки</span><b>{leads}</b></div>
              </div>
              <div className={`gdf__f-conv${hover&&!res?' gdf__f-conv--warn':''}${res?' gdf__f-conv--ok':''}`}>
                {conv.toFixed(1)}% {hover&&!res&&'⚠'}
              </div>
            </div>

            {/* AI Insight — always visible */}
            <div className={`gdf__cell gdf__cell--ai${hl?' gdf__cell--ai-on':''}`}>
              <span className="gdf__cell-t">AI Insight</span>
              <div className="gdf__insights">
                <div className="gdf__ins"><span className="gdf__ins-tag">ОБНАРУЖЕНО</span><span>Форма снижает конверсию</span></div>
                <div className="gdf__ins"><span className="gdf__ins-tag gdf__ins-tag--red">ПРИЧИНА</span><span>6 полей — 62% уходят</span></div>
                <div className="gdf__ins"><span className="gdf__ins-tag gdf__ins-tag--blue">ПОТЕНЦИАЛ</span><span>+40% заявок</span></div>
                <div className="gdf__ins gdf__ins--fix">
                  <span className="gdf__ins-tag gdf__ins-tag--acc">РЕШЕНИЕ</span>
                  <span>✔ 3 поля ✔ быстрый выбор ✔ CTA</span>
                </div>
                <button className={`gdf__apply${phase==='apply'?' gdf__apply--pulse':''}`} type="button">Применить</button>
              </div>
            </div>
          </div>

          {/* Cursor */}
          {hover && !res && (
            <div className={`gdf__cur gdf__cur--p${pi}`}>
              <svg width="14" height="18" viewBox="0 0 16 20" fill="none"><path d="M1 1L1 15L5 11L9 19L11 18L7 10L13 10L1 1Z" fill="white" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/></svg>
            </div>
          )}

          {/* Success */}
          {res && <div className="gdf__ok">✓ Применено</div>}
        </div>
      </div>
    </section>
  );

  if (embedded) return content;
  return <div className="snap-page"><div className="poster-container">{content}</div></div>;
};

export default GrowthProductHero;
