import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * GrowthDashboard — Full-width SaaS analytics dashboard.
 * Dark theme, reference: Traffic Analytics dashboard style.
 * Animated cursor interaction + AI insight stream.
 * ALL TEXT IN RUSSIAN.
 */

/* ── Animation phases ── */
type Phase = 'idle' | 'scan' | 'insight' | 'cause' | 'impact' | 'solution' | 'apply' | 'result';

const PHASE_ORDER: Phase[] = ['idle', 'scan', 'insight', 'cause', 'impact', 'solution', 'apply', 'result'];
const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 1800,
  scan: 2200,
  insight: 2200,
  cause: 2000,
  impact: 2000,
  solution: 2400,
  apply: 1400,
  result: 4000,
};

const GrowthDashboard = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [convRate, setConvRate] = useState(1.8);
  const [leads, setLeads] = useState(94);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clear = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runCycle = useCallback(() => {
    clear();
    setPhase('idle');
    setConvRate(1.8);
    setLeads(94);

    let t = 0;
    PHASE_ORDER.forEach((p, i) => {
      if (i === 0) return;
      t += PHASE_DURATIONS[PHASE_ORDER[i - 1]];
      timersRef.current.push(setTimeout(() => setPhase(p), t));
    });

    // Animate numbers in result phase
    const resultStart = t;
    const STEPS = 30;
    const DUR = 1600;
    for (let s = 1; s <= STEPS; s++) {
      timersRef.current.push(setTimeout(() => {
        const p = s / STEPS;
        const e = 1 - Math.pow(1 - p, 3);
        setConvRate(1.8 + (2.5 - 1.8) * e);
        setLeads(Math.round(94 + (134 - 94) * e));
      }, resultStart + 400 + (DUR / STEPS) * s));
    }

    // Loop
    timersRef.current.push(setTimeout(runCycle, t + PHASE_DURATIONS.result + 2500));
  }, [clear]);

  useEffect(() => {
    if (!revealed) return;
    runCycle();
    return clear;
  }, [revealed, runCycle, clear]);

  const pi = PHASE_ORDER.indexOf(phase);
  const isResult = phase === 'result';
  const showInsightPanel = pi >= 2; // from 'insight' onwards
  const showSolution = pi >= 5;
  const showApplyBtn = phase === 'apply';

  return (
    <div ref={wrapRef} className={`gd${revealed ? ' gd--revealed' : ''}`}>
      {/* Section header */}
      <div className="gd__section-head">
        <span className="gd__section-label">ДАШБОРД СИСТЕМЫ</span>
        <p className="gd__section-sub">Интерфейс, в котором AI принимает решения и показывает результат</p>
      </div>

      {/* Dashboard screen */}
      <div className="gd__screen">

        {/* ── Top bar ── */}
        <div className="gd__topbar">
          <div className="gd__topbar-left">
            <span className="gd__topbar-logo">Аналитика роста</span>
            <span className="gd__topbar-sub">Система оптимизации заявок</span>
          </div>
          <div className="gd__topbar-right">
            <span className="gd__topbar-period">Последние 30 дней</span>
            <span className="gd__topbar-live">
              <span className={`gd__dot${isResult ? ' gd__dot--ok' : ''}`} />
              {isResult ? 'UPDATED' : 'LIVE'}
            </span>
          </div>
        </div>

        {/* ── KPI row ── */}
        <div className="gd__kpi-row">
          <div className={`gd__kpi${isResult ? ' gd__kpi--up' : ''}`}>
            <span className="gd__kpi-label">Конверсия</span>
            <span className="gd__kpi-val">{convRate.toFixed(1)}%</span>
            {isResult && <span className="gd__kpi-change">+39%</span>}
          </div>
          <div className={`gd__kpi${isResult ? ' gd__kpi--up' : ''}`}>
            <span className="gd__kpi-label">Заявки</span>
            <span className="gd__kpi-val">{leads}</span>
            {isResult && <span className="gd__kpi-change">+42%</span>}
          </div>
          <div className="gd__kpi">
            <span className="gd__kpi-label">Визиты</span>
            <span className="gd__kpi-val">3 240</span>
            <span className="gd__kpi-change gd__kpi-change--neutral">+18%</span>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="gd__grid">

          {/* Col 1: Traffic sources */}
          <div className="gd__card gd__card--sources">
            <span className="gd__card-title">Источники трафика</span>
            <div className="gd__donut">
              <svg viewBox="0 0 80 80" className="gd__donut-svg">
                <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="var(--c-accent)" strokeWidth="10"
                  strokeDasharray="117 189" strokeDashoffset="0" strokeLinecap="round" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#818cf8" strokeWidth="10"
                  strokeDasharray="53 253" strokeDashoffset="-117" strokeLinecap="round" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#f59e0b" strokeWidth="10"
                  strokeDasharray="19 287" strokeDashoffset="-170" strokeLinecap="round" />
                <text x="40" y="38" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight="500">3 240</text>
                <text x="40" y="50" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7">визитов</text>
              </svg>
            </div>
            <div className="gd__source-list">
              <div className="gd__source"><span className="gd__source-dot" style={{background:'var(--c-accent)'}} />Органика<span className="gd__source-pct">62%</span></div>
              <div className="gd__source"><span className="gd__source-dot" style={{background:'#818cf8'}} />Реклама<span className="gd__source-pct">28%</span></div>
              <div className="gd__source"><span className="gd__source-dot" style={{background:'#f59e0b'}} />Соцсети<span className="gd__source-pct">10%</span></div>
            </div>
          </div>

          {/* Col 2: Conversion by channel */}
          <div className="gd__card gd__card--channels">
            <span className="gd__card-title">Конверсия по каналам</span>
            <div className="gd__bars">
              <div className="gd__bar-row">
                <span className="gd__bar-name">Реклама</span>
                <div className="gd__bar-track"><div className="gd__bar-fill" style={{width:'70%', background:'#818cf8'}} /></div>
                <span className="gd__bar-val">2.8%</span>
              </div>
              <div className="gd__bar-row">
                <span className="gd__bar-name">Органика</span>
                <div className="gd__bar-track"><div className="gd__bar-fill" style={{width:'48%', background:'var(--c-accent)'}} /></div>
                <span className="gd__bar-val">1.9%</span>
              </div>
              <div className="gd__bar-row">
                <span className="gd__bar-name">Соцсети</span>
                <div className="gd__bar-track"><div className="gd__bar-fill" style={{width:'30%', background:'#f59e0b'}} /></div>
                <span className="gd__bar-val">1.2%</span>
              </div>
            </div>
          </div>

          {/* Col 3: Graph */}
          <div className="gd__card gd__card--graph">
            <span className="gd__card-title">Конверсия за 30 дней</span>
            <div className="gd__graph-area">
              <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="gd__graph-svg">
                <polyline
                  points="0,60 30,58 60,62 90,55 120,58 150,52 180,56 210,54 240,55 270,53 300,54"
                  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
                />
                {isResult && (
                  <polyline
                    points="0,60 30,58 60,62 90,55 120,50 150,42 180,38 210,32 240,28 270,24 300,20"
                    fill="none" stroke="#22c55e" strokeWidth="2" className="gd__graph-grow"
                  />
                )}
                {pi >= 1 && !isResult && (
                  <circle cx="210" cy="54" r="4" fill="#f59e0b" className="gd__pulse-dot" />
                )}
                {isResult && (
                  <circle cx="300" cy="20" r="4" fill="#22c55e" className="gd__pulse-dot" />
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="gd__bottom">

          {/* Funnel */}
          <div className={`gd__card gd__card--funnel${pi >= 1 ? ' gd__card--highlight' : ''}`}>
            <span className="gd__card-title">Воронка конверсии</span>
            <div className="gd__funnel">
              <div className="gd__funnel-step">
                <div className="gd__funnel-bar" style={{width:'100%'}} />
                <div className="gd__funnel-meta"><span>Визиты</span><span>3 240</span></div>
              </div>
              <div className={`gd__funnel-step${pi >= 1 && !isResult ? ' gd__funnel-step--warn' : ''}`}>
                <div className="gd__funnel-bar" style={{width: isResult ? '35%' : '27%'}} />
                <div className="gd__funnel-meta"><span>Форма</span><span>{isResult ? '1 134' : '860'}</span></div>
              </div>
              <div className="gd__funnel-step">
                <div className="gd__funnel-bar gd__funnel-bar--accent" style={{width: isResult ? '4.1%' : '2.9%'}} />
                <div className="gd__funnel-meta"><span>Заявки</span><span>{leads}</span></div>
              </div>
              <div className={`gd__funnel-conv${pi >= 1 && !isResult ? ' gd__funnel-conv--warn' : ''}${isResult ? ' gd__funnel-conv--ok' : ''}`}>
                Конверсия формы: {convRate.toFixed(1)}% {pi >= 1 && !isResult && '⚠'}
              </div>
            </div>
          </div>

          {/* AI Insight stream */}
          <div className="gd__card gd__card--ai">
            <span className="gd__card-title">AI Insight</span>
            <div className="gd__insights">
              {pi >= 2 && (
                <div className="gd__insight gd__insight--enter">
                  <span className="gd__insight-badge">ОБНАРУЖЕНО</span>
                  <p className="gd__insight-text">Длинная форма записи снижает конверсию</p>
                </div>
              )}
              {pi >= 3 && (
                <div className="gd__insight gd__insight--enter">
                  <span className="gd__insight-badge gd__insight-badge--cause">ПРИЧИНА</span>
                  <p className="gd__insight-text">6 полей в форме — 62% уходят до отправки</p>
                </div>
              )}
              {pi >= 4 && (
                <div className="gd__insight gd__insight--enter">
                  <span className="gd__insight-badge gd__insight-badge--impact">ПОТЕНЦИАЛ</span>
                  <p className="gd__insight-text">Оптимизация может дать +40% заявок</p>
                </div>
              )}
              {showSolution && (
                <div className="gd__insight gd__insight--enter gd__insight--solution">
                  <span className="gd__insight-badge gd__insight-badge--fix">РЕШЕНИЕ</span>
                  <div className="gd__insight-fixes">
                    <span>✔ сократить форму до 3 полей</span>
                    <span>✔ добавить быстрый выбор услуги</span>
                    <span>✔ изменить CTA</span>
                  </div>
                  {showApplyBtn && (
                    <button className="gd__apply-btn" type="button">Применить</button>
                  )}
                </div>
              )}
              {isResult && (
                <div className="gd__insight gd__insight--enter gd__insight--result">
                  <span className="gd__insight-badge gd__insight-badge--ok">РЕЗУЛЬТАТ</span>
                  <p className="gd__insight-text">Конверсия выросла с 1.8% до 2.5% — изменения сохранены</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cursor */}
        {pi >= 1 && pi <= 6 && (
          <div className={`gd__cursor gd__cursor--p${pi}`}>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M1 1L1 15L5 11L9 19L11 18L7 10L13 10L1 1Z" fill="white" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
            </svg>
          </div>
        )}

        {/* Success banner */}
        {isResult && (
          <div className="gd__success">✓ Изменения применены</div>
        )}
      </div>
    </div>
  );
};

export default GrowthDashboard;
