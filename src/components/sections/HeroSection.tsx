const HeroSection = () => {

  return (
    <div className="snap-page hero-page" style={{ position: 'relative' }}>

      {/* ── MOBILE BACKGROUND VIDEO — only on mobile, very low opacity ── */}
      <video
        className="md:hidden"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.09,
          zIndex: 0,
          pointerEvents: 'none',
        }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/ai-workforce-preview.mp4" type="video/mp4" />
      </video>

      <div className="poster-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-0">

          {/* LEFT — Editorial copy */}
          <div className="b-right flex flex-col justify-between p-5 md:p-7 overflow-hidden">

            {/* ── MOBILE: status label as standalone top item ── */}
            <div className="md:hidden" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="system-label">
                СИСТЕМА AI-СОТРУДНИКОВ /
              </span>
              <div className="sys-status">
                <span className="sys-status__dot" />
                <span className="sys-status__label">ОНЛАЙН</span>
              </div>
            </div>

            {/* ── HEADLINE — center slot on mobile (3-item justify-between), top slot on desktop ── */}
            <div>
              {/* Desktop only: status label grouped with headline */}
              <div className="hidden md:flex" style={{ alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span className="system-label">
                  СИСТЕМА AI-СОТРУДНИКОВ /
                </span>
                <div className="sys-status">
                  <span className="sys-status__dot" />
                  <span className="sys-status__label">ОНЛАЙН</span>
                </div>
              </div>

              <h1 className="wf-headline">
                <span className="wf-headline-line">СОЗДАЕМ <span className="heading-latin">AI</span>-</span>
                <span className="wf-headline-line wf-headline-line--mid">СОТРУДНИКОВ</span>
                <span className="wf-headline-line wf-headline-line--accent">ДЛЯ БИЗНЕСА</span>
              </h1>
            </div>

            {/* ── BOTTOM: description + CTA ── */}
            <div>
              <div className="hero-list">
                {[
                  { n: '01', t: 'Не теряют заявки' },
                  { n: '02', t: 'Отвечают за секунды' },
                  { n: '03', t: 'Работают 24/7' },
                ].map(item => (
                  <div key={item.n} className="hero-list__item">
                    <span className="hero-list__num">{item.n}</span>
                    <span className="hero-list__text">{item.t}</span>
                  </div>
                ))}
              </div>

              <a href="#cta" className="btn-primary">
                ОБСУДИТЬ ВНЕДРЕНИЕ →
              </a>
            </div>
          </div>

          {/* RIGHT — Product video (desktop only) */}
          <div
            className="hidden md:block relative overflow-hidden"
            style={{ background: '#fafafa', minHeight: 0 }}
          >
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/video/ai-workforce-preview.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
