import { useState, useEffect, useRef, useCallback } from 'react';

const STEPS = [
  {
    num: '01',
    action: 'Клиент пишет',
    content: (
      <div className="ss__msg">
        <span className="ss__msg-name">Анна</span>
        <div className="ss__msg-bubble ss__msg-bubble--user">
          Есть вечерние записи?
        </div>
      </div>
    ),
  },
  {
    num: '02',
    action: 'AI отвечает',
    content: (
      <div className="ss__msg">
        <span className="ss__msg-name ss__msg-name--ai">AI</span>
        <div className="ss__msg-bubble ss__msg-bubble--ai">
          Да, есть на сегодня и завтра.<br />
          Вам на какое время?
        </div>
      </div>
    ),
  },
  {
    num: '03',
    action: 'Уточняет задачу',
    content: (
      <div className="ss__dialog">
        <div className="ss__msg">
          <span className="ss__msg-name">Анна</span>
          <div className="ss__msg-bubble ss__msg-bubble--user">Сегодня после 18</div>
        </div>
        <div className="ss__msg">
          <span className="ss__msg-name ss__msg-name--ai">AI</span>
          <div className="ss__msg-bubble ss__msg-bubble--ai">
            Подойдёт 19:00. Записать?
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '04',
    action: 'Формирует заявку',
    content: (
      <div className="ss__lead-card">
        <span className="ss__lead-badge">НОВАЯ ЗАЯВКА</span>
        <div className="ss__lead-row"><span>Имя</span><span>Анна</span></div>
        <div className="ss__lead-row"><span>Услуга</span><span>Маникюр</span></div>
        <div className="ss__lead-row"><span>Время</span><span>Сегодня 19:00</span></div>
        <div className="ss__lead-row"><span>Контакт</span><span>+375 XX XXX</span></div>
      </div>
    ),
  },
  {
    num: '05',
    action: 'Передаёт в CRM',
    content: (
      <div className="ss__crm">
        <span className="ss__crm-icon">✓</span>
        <span className="ss__crm-title">ЗАЯВКА В CRM</span>
        <p className="ss__crm-sub">Менеджер получает готового клиента</p>
      </div>
    ),
  },
];

const SystemSplit = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(p => (p + 1) % STEPS.length);
        setFading(false);
      }, 200);
    }, 3500);
  }, []);

  useEffect(() => {
    if (!vis) return;
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [vis, startAuto]);

  const switchTo = (i: number) => {
    if (i === active) return;
    if (autoRef.current) clearInterval(autoRef.current);
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 150);
    setTimeout(startAuto, 8000);
  };

  return (
    <div className="snap-page" id="system">
      <div className="poster-container" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="ss__header">
          <h2 className="display-type ss__title">КАК ПОЯВЛЯЕТСЯ <span className="text-brand-accent">ЗАЯВКА</span></h2>
          <p className="ss__subtitle">AI обрабатывает обращение и превращает его в готовый лид.</p>
        </div>

        {/* Desktop split */}
        <div ref={ref} className={`ss${vis ? ' ss--vis' : ''}`}>
          {/* Left — dark */}
          <div className="ss__left">
            <span className="ss__label">ПРОЦЕСС</span>
            <div className="ss__timeline">
              {STEPS.map((s, i) => (
                <button
                  key={s.num}
                  type="button"
                  className={`ss__step${i === active ? ' ss__step--active' : ''}${i < active ? ' ss__step--done' : ''}`}
                  onClick={() => switchTo(i)}
                >
                  <span className="ss__dot" />
                  <span className="ss__step-num">{s.num}</span>
                  <span className="ss__step-text">{s.action}</span>
                </button>
              ))}
              <div className="ss__line" style={{ '--ss-progress': `${(active / (STEPS.length - 1)) * 100}%` } as React.CSSProperties} />
            </div>
          </div>

          {/* Right — light */}
          <div className="ss__right">
            <div className={`ss__content${fading ? ' ss__content--fade' : ''}`}>
              {STEPS[active].content}
            </div>
          </div>
        </div>

        {/* Mobile — sequential */}
        <div className="ss__mobile">
          {STEPS.map((s, i) => (
            <div key={s.num} className="ss__mobile-item" style={{ '--ss-d': `${i * 100}ms` } as React.CSSProperties}>
              <div className="ss__mobile-head">
                <span className="ss__mobile-num">{s.num}</span>
                <span className="ss__mobile-action">{s.action}</span>
              </div>
              <div className="ss__mobile-body">
                {s.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemSplit;
