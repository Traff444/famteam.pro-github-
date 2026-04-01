import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * CreatorProductHero — "Как это работает" for AI Creator.
 * LIGHT 3-column grid: ГЕНЕРАЦИЯ → ПОСТ → РЕЗУЛЬТАТ.
 * Sequential L→R reveal. Equal-height cards. Status anchored bottom.
 */

// 5 sequential steps: col1 → arrow1 → col2 → arrow2 → col3
type Step = 0 | 1 | 2 | 3 | 4 | 5;

const IDEAS = [
  '5 причин начать тренировки',
  'Как убрать живот за 30 дней',
  'Ошибки новичков в зале',
];

interface Props { embedded?: boolean; }

const CreatorProductHero = ({ embedded = false }: Props) => {
  const wrapRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState(0);
  const [leads, setLeads] = useState(0);
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
    setStep(0); setViews(0); setComments(0); setLeads(0);

    // Sequential: col1(0) → arrow1(1) → col2(2) → arrow2(3) → col3(4) → hold(5)
    const delays = [800, 1600, 2400, 3200, 4000];
    delays.forEach((d, i) => {
      timers.current.push(setTimeout(() => setStep((i + 1) as Step), d));
    });

    // Animate metrics when col3 appears (step 4+)
    const mStart = delays[3] + 400;
    const N = 20; const mDur = 1600;
    for (let s = 1; s <= N; s++) {
      timers.current.push(setTimeout(() => {
        const e = 1 - Math.pow(1 - s / N, 3);
        setViews(Math.round(3420 * e));
        setComments(Math.round(12 * e));
        setLeads(Math.round(3 * e));
      }, mStart + (mDur / N) * s));
    }

    // Loop after hold
    timers.current.push(setTimeout(run, delays[4] + 5000));
  }, [clear]);

  useEffect(() => { if (revealed) { run(); return clear; } }, [revealed, run, clear]);

  const content = (
    <section ref={wrapRef} className={`gph-dash${revealed ? ' gph-dash--revealed' : ''}${embedded ? ' gph-dash--embedded' : ''}`}>
      <div className="gph-dash__header">
        <span className="gph-dash__label">КАК ЭТО РАБОТАЕТ</span>
        <h2 className="gph-dash__title">КОНТЕНТ<br /><span className="gph-dash__title-accent">КОТОРЫЙ ПРИВОДИТ КЛИЕНТОВ</span></h2>
        <p className="gph-dash__sub">AI генерирует идеи, создаёт посты и приводит заявки из соцсетей.</p>
      </div>

      <div className="cpipe">
        {/* Col 1 */}
        <div className={`cpipe__col${step >= 0 ? ' cpipe__col--on' : ''}`} style={{ '--cpipe-delay': '0ms' } as React.CSSProperties}>
          <div className="cpipe__top">
            <span className="cpipe__num">01</span>
            <span className="cpipe__label">ГЕНЕРАЦИЯ</span>
            <span className="cpipe__caption">AI подбирает тему</span>
          </div>
          <div className="cpipe__card cpipe__body">
            {IDEAS.map((idea, i) => (
              <div key={i} className={`cpipe__idea${i === 0 ? ' cpipe__idea--picked' : ''}`}>
                <span className="cpipe__idea-check">{i === 0 ? '✓' : '○'}</span>
                <span className="cpipe__idea-text">{idea}</span>
              </div>
            ))}
          </div>
          <div className="cpipe__bottom">
            <span className="cpipe__status cpipe__status--ok">✓ тема выбрана</span>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className={`cpipe__arrow${step >= 1 ? ' cpipe__arrow--on' : ''}`}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14h16m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Col 2 */}
        <div className={`cpipe__col${step >= 2 ? ' cpipe__col--on' : ''}`}>
          <div className="cpipe__top">
            <span className="cpipe__num">02</span>
            <span className="cpipe__label">ПОСТ</span>
            <span className="cpipe__caption">AI создаёт и публикует</span>
          </div>
          <div className="cpipe__card cpipe__body cpipe__card--post">
            <div className="cpipe__post-img">
              <span className="cpipe__post-img-t">ТРЕНИРОВКА</span>
              <span className="cpipe__post-img-s">ДЛЯ НОВИЧКОВ</span>
            </div>
            <div className="cpipe__post-text">
              <p>5 причин начать тренировки</p>
              <p className="cpipe__post-dim">— минус 3 кг за 30 дней</p>
              <p className="cpipe__post-dim">Первое занятие бесплатно</p>
            </div>
          </div>
          <div className="cpipe__bottom">
            <span className="cpipe__status cpipe__status--ok">✓ опубликовано</span>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className={`cpipe__arrow${step >= 3 ? ' cpipe__arrow--on' : ''}`}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14h16m-5-5l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Col 3 */}
        <div className={`cpipe__col${step >= 4 ? ' cpipe__col--on' : ''}`}>
          <div className="cpipe__top">
            <span className="cpipe__num">03</span>
            <span className="cpipe__label">РЕЗУЛЬТАТ</span>
            <span className="cpipe__caption">Контент приводит заявки</span>
          </div>
          <div className="cpipe__card cpipe__body">
            <div className="cpipe__res-row">
              <span className="cpipe__res-val">{views.toLocaleString('ru')}</span>
              <span className="cpipe__res-lbl">охват</span>
            </div>
            <div className="cpipe__res-row">
              <span className="cpipe__res-val">{comments}</span>
              <span className="cpipe__res-lbl">комментарии</span>
            </div>
            <div className="cpipe__res-row cpipe__res-row--acc">
              <span className="cpipe__res-val">+{leads}</span>
              <span className="cpipe__res-lbl">заявки</span>
            </div>
          </div>
          <div className="cpipe__bottom">
            <span className="cpipe__status cpipe__status--green">+{leads} заявки</span>
          </div>
        </div>
      </div>
    </section>
  );

  if (embedded) return content;
  return <div className="snap-page"><div className="poster-container">{content}</div></div>;
};

export default CreatorProductHero;
