import { useState, useEffect, useRef, useCallback } from 'react';

/* ── Step data ── */
const STEPS = [
  { num: '01', label: 'Клиент пишет' },
  { num: '02', label: 'AI отвечает' },
  { num: '03', label: 'Уточняет запрос' },
  { num: '04', label: 'Предлагает решение' },
  { num: '05', label: 'Передаёт в CRM' },
];

/* ── Card state content per step ── */
const CARD_STATES = [
  {
    phase: 'incoming' as const,
    label: 'INCOMING',
    message: 'Хочу записаться на консультацию',
    detail: null,
    result: null,
  },
  {
    phase: 'processing' as const,
    label: 'PROCESSING',
    message: null,
    detail: [
      'проверяет расписание',
      'ищет специалиста',
      'сравнивает слоты',
    ],
    result: null,
  },
  {
    phase: 'processing' as const,
    label: 'ANALYZING',
    message: null,
    detail: [
      'уточнение: дерматолог',
      'время: завтра',
      'подбор ближайших слотов',
    ],
    result: null,
  },
  {
    phase: 'result' as const,
    label: 'RESULT',
    message: null,
    detail: null,
    result: {
      status: 'Клиент записан',
      time: '14:00 — подтверждено',
      crm: 'Данные переданы в CRM',
    },
  },
  {
    phase: 'result' as const,
    label: 'SYNCED',
    message: null,
    detail: null,
    result: {
      status: 'CRM обновлена',
      time: 'Задача создана',
      crm: 'Менеджер уведомлён',
    },
  },
];

const CYCLE_INTERVAL = 3200;

interface AiProductHeroProps {
  /** When true, renders without snap-page wrapper and uses compact spacing */
  embedded?: boolean;
}

const AiProductHero = ({ embedded = false }: AiProductHeroProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Reveal on scroll */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.18 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Auto-cycle steps */
  useEffect(() => {
    if (!revealed) return;

    const advance = () => {
      setActiveStep(prev => {
        const next = prev < STEPS.length - 1 ? prev + 1 : 0;
        if (next === 0) setIsTyping(true);
        return next;
      });
    };

    // Start typing animation for step 0
    setIsTyping(true);
    const typingTimeout = setTimeout(() => setIsTyping(false), 1400);

    timerRef.current = setInterval(advance, CYCLE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(typingTimeout);
    };
  }, [revealed]);

  /* Clear typing after each step 0 */
  useEffect(() => {
    if (activeStep === 0 && isTyping) {
      const t = setTimeout(() => setIsTyping(false), 1400);
      return () => clearTimeout(t);
    }
  }, [activeStep, isTyping]);

  const selectStep = useCallback((i: number) => {
    setActiveStep(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveStep(prev => (prev < STEPS.length - 1 ? prev + 1 : 0));
    }, CYCLE_INTERVAL);
  }, []);

  const cardState = CARD_STATES[activeStep];

  const sectionContent = (
    <section
      ref={sectionRef}
      className={`aph${revealed ? ' aph--revealed' : ''}${embedded ? ' aph--embedded' : ''}`}
      id={embedded ? undefined : 'product'}
    >
      <div className="aph__inner">

        {/* ── LEFT ── */}
        <div className="aph__left">
          <span className="aph__label aph__fade" style={{ '--aph-d': '0ms' } as React.CSSProperties}>
            КАК ЭТО РАБОТАЕТ
          </span>
          <h2 className="aph__headline aph__fade" style={{ '--aph-d': '80ms' } as React.CSSProperties}>
            <span className="heading-latin">AI</span>-СОТРУДНИК
            <br />
            <span className="aph__headline-accent">В ДЕЙСТВИИ</span>
          </h2>
          <p className="aph__sub aph__fade" style={{ '--aph-d': '160ms' } as React.CSSProperties}>
            Полный цикл обработки заявки —
            <br />от входящего сообщения до записи в CRM.
          </p>

          {/* Step flow */}
          <div className="aph__steps aph__fade" style={{ '--aph-d': '240ms' } as React.CSSProperties}>
            {STEPS.map((step, i) => {
              const isDone = i < activeStep;
              const isActive = i === activeStep;
              const isFuture = i > activeStep;

              return (
                <button
                  key={step.num}
                  className={`aph__step${isActive ? ' aph__step--active' : ''}${isDone ? ' aph__step--done' : ''}${isFuture ? ' aph__step--future' : ''}`}
                  onClick={() => selectStep(i)}
                  type="button"
                >
                  <div className="aph__step-rail">
                    <div className="aph__step-node" />
                    {i < STEPS.length - 1 && <div className="aph__step-line" />}
                  </div>
                  <div className="aph__step-body">
                    <span className="aph__step-num">{step.num}</span>
                    <span className="aph__step-label">{step.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="aph__right aph__fade" style={{ '--aph-d': '300ms' } as React.CSSProperties}>
          <div className="aph__card">
            {/* Top bar */}
            <div className="aph__card-bar">
              <span className="aph__card-name">AI Receptionist</span>
              <span className="aph__card-status">
                <span className="aph__card-dot" />
                ONLINE
              </span>
            </div>

            {/* Card body — dynamic content */}
            <div className="aph__card-body" key={activeStep}>

              {/* Incoming message */}
              {cardState.phase === 'incoming' && (
                <div className="aph__state aph__state--incoming">
                  <span className="aph__state-label">INCOMING</span>
                  <div className="aph__msg">
                    <div className="aph__msg-avatar">K</div>
                    <div className="aph__msg-bubble">
                      {isTyping ? (
                        <span className="aph__typing">
                          <span className="aph__typing-dot" />
                          <span className="aph__typing-dot" />
                          <span className="aph__typing-dot" />
                        </span>
                      ) : (
                        <span className="aph__msg-text">{cardState.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Processing */}
              {cardState.phase === 'processing' && (
                <div className="aph__state aph__state--processing">
                  <span className="aph__state-label">{cardState.label}</span>
                  <div className="aph__process">
                    <div className="aph__process-indicator">
                      <span className="aph__spinner" />
                      <span className="aph__process-status">AI анализирует запрос</span>
                    </div>
                    <ul className="aph__process-list">
                      {cardState.detail?.map((item, j) => (
                        <li
                          key={item}
                          className="aph__process-item"
                          style={{ '--proc-d': `${j * 400}ms` } as React.CSSProperties}
                        >
                          <span className="aph__check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Result */}
              {cardState.phase === 'result' && cardState.result && (
                <div className="aph__state aph__state--result">
                  <span className="aph__state-label aph__state-label--success">
                    {cardState.label === 'SYNCED' ? '\u2713 SYNCED' : '\u2713 RESULT'}
                  </span>
                  <div className="aph__result">
                    <div className="aph__result-row aph__result-row--main">
                      <span className="aph__result-icon">✔</span>
                      <span className="aph__result-text">{cardState.result.status}</span>
                    </div>
                    <div className="aph__result-row">
                      <span className="aph__result-meta">{cardState.result.time}</span>
                    </div>
                    <div className="aph__result-row">
                      <span className="aph__result-meta">{cardState.result.crm}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="aph__card-progress">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`aph__card-pip${i <= activeStep ? ' aph__card-pip--on' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  if (embedded) return sectionContent;
  return (
    <div className="snap-page">
      <div className="poster-container">
        {sectionContent}
      </div>
    </div>
  );
};

export default AiProductHero;
