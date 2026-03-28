import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * GrowthMetricVisual — 4-screen system analysis UI for AI Growth Manager hero.
 * Screen 1: Website form (the problem)
 * Screen 2: Problem detection overlay (red highlights)
 * Screen 3: AI suggestions (checklist)
 * Screen 4: Result metrics (animated numbers)
 *
 * This is a SYSTEM, not a chat. No bubbles, no conversation.
 */

const FORM_FIELDS = ['Имя', 'Телефон', 'Email', 'Комментарий'];

const PROBLEMS = [
  { icon: '⚠', text: '62% не доходят до кнопки' },
  { icon: '⚠', text: 'слишком много полей' },
  { icon: '⚠', text: 'низкая видимость CTA' },
];

const SUGGESTIONS = [
  'сократить форму',
  'изменить текст кнопки',
  'добавить быстрый выбор времени',
];

const SCREEN_DURATION = 3800;
const PAUSE_BEFORE_LOOP = 3200;

const GrowthMetricVisual = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [screen, setScreen] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [convFrom, setConvFrom] = useState(1.8);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runCycle = useCallback(() => {
    clearTimers();
    setScreen(0);
    setItemCount(0);
    setConvFrom(1.8);

    let t = 0;

    // Screen 0: form (fields appear sequentially)
    FORM_FIELDS.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setItemCount(i + 1), 300 + i * 200));
    });

    // Screen 1: problems
    t = SCREEN_DURATION;
    timersRef.current.push(setTimeout(() => { setScreen(1); setItemCount(0); }, t));
    PROBLEMS.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setItemCount(i + 1), t + 400 + i * 600));
    });

    // Screen 2: suggestions
    t += SCREEN_DURATION;
    timersRef.current.push(setTimeout(() => { setScreen(2); setItemCount(0); }, t));
    SUGGESTIONS.forEach((_, i) => {
      timersRef.current.push(setTimeout(() => setItemCount(i + 1), t + 400 + i * 500));
    });

    // Screen 3: result with animated number
    t += SCREEN_DURATION;
    timersRef.current.push(setTimeout(() => { setScreen(3); setConvFrom(1.8); }, t));
    const ANIM_STEPS = 25;
    const ANIM_DUR = 1400;
    for (let s = 1; s <= ANIM_STEPS; s++) {
      timersRef.current.push(setTimeout(() => {
        const progress = s / ANIM_STEPS;
        const eased = 1 - Math.pow(1 - progress, 3);
        setConvFrom(1.8 + (2.7 - 1.8) * eased);
      }, t + 300 + (ANIM_DUR / ANIM_STEPS) * s));
    }

    // Loop
    timersRef.current.push(setTimeout(runCycle, t + SCREEN_DURATION + PAUSE_BEFORE_LOOP));
  }, [clearTimers]);

  useEffect(() => {
    if (!revealed) return;
    runCycle();
    return clearTimers;
  }, [revealed, runCycle, clearTimers]);

  return (
    <div ref={wrapRef} className={`gmv${revealed ? ' gmv--revealed' : ''}`}>
      <div className="gmv__card">
        {/* Top system bar */}
        <div className="gmv__bar">
          <span className="gmv__bar-title">GROWTH SYSTEM</span>
          <span className="gmv__bar-status">
            <span className={`gmv__status-dot gmv__status-dot--${screen < 2 ? 'scan' : 'ok'}`} />
            {screen === 0 && 'SCANNING'}
            {screen === 1 && 'DETECTING'}
            {screen === 2 && 'OPTIMIZING'}
            {screen === 3 && 'COMPLETE'}
          </span>
        </div>

        <div className="gmv__body">
          {/* ── Screen 0: Website form ── */}
          {screen === 0 && (
            <div className="gmv__screen gmv__screen--form">
              <span className="gmv__screen-label">WEBSITE FORM</span>
              <div className="gmv__form">
                {FORM_FIELDS.slice(0, itemCount).map((field) => (
                  <div key={field} className="gmv__field gmv__field--enter">
                    <span className="gmv__field-label">{field}</span>
                    <div className="gmv__field-input" />
                  </div>
                ))}
                {itemCount >= FORM_FIELDS.length && (
                  <div className="gmv__field-btn gmv__field--enter">ОТПРАВИТЬ</div>
                )}
              </div>
            </div>
          )}

          {/* ── Screen 1: Problem detection ── */}
          {screen === 1 && (
            <div className="gmv__screen gmv__screen--problems">
              <span className="gmv__screen-label gmv__screen-label--warn">PROBLEMS DETECTED</span>
              <div className="gmv__problems">
                {PROBLEMS.slice(0, itemCount).map((p, i) => (
                  <div key={i} className="gmv__problem gmv__problem--enter">
                    <span className="gmv__problem-icon">{p.icon}</span>
                    <span className="gmv__problem-text">{p.text}</span>
                  </div>
                ))}
              </div>
              {itemCount >= PROBLEMS.length && (
                <div className="gmv__problem-bar gmv__field--enter">
                  <span className="gmv__problem-bar-label">Conversion loss</span>
                  <div className="gmv__problem-bar-track">
                    <div className="gmv__problem-bar-fill" />
                  </div>
                  <span className="gmv__problem-bar-value">-62%</span>
                </div>
              )}
            </div>
          )}

          {/* ── Screen 2: AI suggestions ── */}
          {screen === 2 && (
            <div className="gmv__screen gmv__screen--suggest">
              <span className="gmv__screen-label gmv__screen-label--accent">AI RECOMMENDATIONS</span>
              <div className="gmv__suggestions">
                {SUGGESTIONS.slice(0, itemCount).map((s, i) => (
                  <div key={i} className="gmv__suggestion gmv__suggestion--enter">
                    <span className="gmv__suggestion-check">✔</span>
                    <span className="gmv__suggestion-text">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Screen 3: Result ── */}
          {screen === 3 && (
            <div className="gmv__screen gmv__screen--result">
              <span className="gmv__screen-label gmv__screen-label--ok">RESULT</span>
              <div className="gmv__result">
                <div className="gmv__result-main">
                  <span className="gmv__result-label">Конверсия</span>
                  <div className="gmv__result-numbers">
                    <span className="gmv__result-from">1.8%</span>
                    <span className="gmv__result-arrow">→</span>
                    <span className="gmv__result-to">{convFrom.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="gmv__result-row">
                  <span className="gmv__result-metric">+50%</span>
                  <span className="gmv__result-desc">рост конверсии</span>
                </div>
                <div className="gmv__result-row">
                  <span className="gmv__result-metric">+42%</span>
                  <span className="gmv__result-desc">больше заявок</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Screen indicator */}
        <div className="gmv__screens-bar">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`gmv__screen-pip${screen >= i ? ' gmv__screen-pip--on' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthMetricVisual;
