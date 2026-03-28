import { useState, useEffect, useRef } from 'react';

/**
 * CreatorVisual — Hero card for AI Creator.
 * Shows a mini social post preview with animated metrics.
 */

const CreatorVisual = () => {
  const [revealed, setRevealed] = useState(false);
  const [views, setViews] = useState(240);
  const [likes, setLikes] = useState(18);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const run = () => {
      setViews(240); setLikes(18);
      const N = 25; const D = 2000;
      const timers: ReturnType<typeof setTimeout>[] = [];
      for (let s = 1; s <= N; s++) {
        timers.push(setTimeout(() => {
          const e = 1 - Math.pow(1 - s / N, 3);
          setViews(Math.round(240 + 1940 * e));
          setLikes(Math.round(18 + 114 * e));
        }, 3000 + (D / N) * s));
      }
      timers.push(setTimeout(run, 8000));
      return timers;
    };
    const t = run();
    return () => t.forEach(clearTimeout);
  }, [revealed]);

  return (
    <div ref={ref} className={`cv${revealed ? ' cv--on' : ''}`}>
      <div className="cv__head">
        <span className="cv__tag">AI Creator</span>
        <span className="cv__status">● PUBLISHING</span>
      </div>
      <div className="cv__post">
        <div className="cv__img" />
        <div className="cv__text">
          <span className="cv__line">5 причин автоматизировать</span>
          <span className="cv__line cv__line--dim">приём клиентов...</span>
        </div>
      </div>
      <div className="cv__metrics">
        <span className="cv__metric">👁 {views.toLocaleString('ru')}</span>
        <span className="cv__metric">♥ {likes}</span>
        <span className="cv__metric cv__metric--acc">+3 лида</span>
      </div>
      <div className="cv__bar">
        <div className="cv__bar-fill" style={{ width: revealed ? '72%' : '0%' }} />
      </div>
    </div>
  );
};

export default CreatorVisual;
