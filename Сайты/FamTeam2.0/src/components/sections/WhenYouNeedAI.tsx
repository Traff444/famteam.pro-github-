import { useEffect, useRef, useState } from 'react';

const WhenYouNeedAI = () => {
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
        <div ref={ref} className={`pain${vis ? ' pain--vis' : ''}`}>
          <div className="pain__block pain__block--1">
            <span className="pain__line">ЗАЯВКИ</span>
            <span className="pain__line pain__line--accent">ТЕРЯЮТСЯ</span>
          </div>

          <div className="pain__block pain__block--2">
            <span className="pain__line">КЛИЕНТЫ</span>
            <span className="pain__line">НЕ ЖДУТ</span>
          </div>

          <div className="pain__block pain__block--3">
            <span className="pain__line">КОМАНДА</span>
            <span className="pain__line">ПЕРЕГРУЖЕНА</span>
          </div>

          <p className="pain__resolve">AI закрывает это.</p>
        </div>
      </div>
    </div>
  );
};

export default WhenYouNeedAI;
