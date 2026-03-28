import { useState, useEffect, useRef } from 'react';

const SCENARIOS = [
  {
    num: '01',
    niche: 'Салон красоты',
    before: [
      'заявки приходят в Instagram',
      'отвечают вручную',
      'часть клиентов теряется',
    ],
    after: [
      'AI отвечает сразу',
      'ведёт диалог с клиентом',
      'записывает в расписание',
    ],
    result: 'Нет пропущенных заявок. Администратор не перегружен.',
  },
  {
    num: '02',
    niche: 'Онлайн-школа',
    before: [
      'много входящих сообщений',
      'менеджеры не успевают',
      'клиенты «остывают»',
    ],
    after: [
      'AI отвечает мгновенно',
      'квалифицирует клиента',
      'передаёт только готовых',
    ],
    result: 'Быстрее обработка. Меньше нагрузки.',
  },
  {
    num: '03',
    niche: 'Услуги',
    before: [
      'заявки приходят в разное время',
      'часть обращений теряется',
      'нет системы',
    ],
    after: [
      'AI фиксирует все обращения',
      'задаёт вопросы',
      'формирует заявку',
    ],
    result: 'Менеджер работает с готовыми лидами.',
  },
];

const RealitySection = () => {
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

  // Auto-rotate
  useEffect(() => {
    if (!vis) return;
    autoRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(p => (p + 1) % SCENARIOS.length);
        setFading(false);
      }, 250);
    }, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [vis]);

  const switchTo = (i: number) => {
    if (i === active) return;
    if (autoRef.current) clearInterval(autoRef.current);
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 200);
  };

  const s = SCENARIOS[active];

  return (
    <div className="snap-page">
      <div className="poster-container">
        <div ref={ref} className={`rl${vis ? ' rl--vis' : ''}`}>
          {/* Left */}
          <div className="rl__left">
            <span className="rl__label">СЦЕНАРИИ</span>
            <h2 className="display-type rl__title">
              КАК ЭТО<br />
              ВЫГЛЯДИТ<br />
              <span className="text-brand-accent">В РЕАЛЬНОСТИ</span>
            </h2>
            <p className="rl__sub">
              Типовые сценарии работы<br />
              AI-сотрудников в бизнесе.
            </p>
          </div>

          {/* Right */}
          <div className="rl__right">
            {/* Switcher */}
            <div className="rl__tabs">
              {SCENARIOS.map((sc, i) => (
                <button
                  key={sc.num}
                  type="button"
                  onClick={() => switchTo(i)}
                  className={`rl__tab${i === active ? ' rl__tab--active' : ''}`}
                >
                  {sc.num}
                </button>
              ))}
            </div>

            {/* Scenario card */}
            <div className={`rl__card${fading ? ' rl__card--fade' : ''}`}>
              <span className="rl__niche">{s.niche}</span>

              <div className="rl__phase">
                <span className="rl__phase-label">ДО ВНЕДРЕНИЯ</span>
                {s.before.map((b, j) => (
                  <span key={j} className="rl__phase-item">— {b}</span>
                ))}
              </div>

              <div className="rl__divider" />

              <div className="rl__phase">
                <span className="rl__phase-label rl__phase-label--accent">ПОСЛЕ ВНЕДРЕНИЯ</span>
                {s.after.map((a, j) => (
                  <span key={j} className="rl__phase-item">— {a}</span>
                ))}
              </div>

              <p className="rl__result">{s.result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealitySection;
