import { useEffect, useRef, useState } from 'react';

const STEPS = [
  { num: '01', title: 'Разбираем ваш процесс', desc: 'где теряются заявки и время' },
  { num: '02', title: 'Проектируем AI-сотрудника', desc: 'под задачи бизнеса' },
  { num: '03', title: 'Встраиваем в процессы', desc: 'без сложной интеграции' },
  { num: '04', title: 'Запускаем и улучшаем', desc: 'система развивается со временем' },
];

const HowWeWork = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="snap-page">
      <div className="poster-container">
        <div ref={ref} className={`hww${vis ? ' hww--vis' : ''}`}>
          <div className="hww__head">
            <span className="hww__label">ПРОЦЕСС</span>
            <h2 className="display-type hww__title">
              КАК МЫ<br />
              <span className="text-brand-accent">РАБОТАЕМ</span>
            </h2>
          </div>

          <div className="hww__steps">
            {STEPS.map((st, i) => (
              <div
                key={st.num}
                className="hww__step"
                style={{ '--hww-d': `${i * 150}ms` } as React.CSSProperties}
              >
                <span className="hww__step-num">{st.num}</span>
                <div className="hww__step-body">
                  <span className="hww__step-title">{st.title}</span>
                  <span className="hww__step-desc">{st.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="hww__closing">
            Вы не покупаете инструмент.<br />
            <em>Вы получаете работающую систему.</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
