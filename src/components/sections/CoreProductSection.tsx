import { useEffect, useRef } from "react";
// FolderArchiveCard removed

const CoreProductSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add("ci-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const cards: { num: string; module: string; title: string; items: string[]; status: string }[] = [
    {
      num: '01',
      module: 'MODULE_01',
      title: 'КОММУНИКАЦИЯ\nС КЛИЕНТАМИ',
      items: ['отвечает на сообщения', 'ведёт чаты и звонки', 'работает в Telegram', 'понимает контекст диалога'],
      status: 'АКТИВЕН',
    },
    {
      num: '02',
      module: 'MODULE_02',
      title: 'ПОДДЕРЖКА\nПРОДАЖ',
      items: ['квалифицирует лиды', 'назначает встречи', 'ведёт по воронке', 'выявляет потребность'],
      status: 'В РАБОТЕ',
    },
    {
      num: '03',
      module: 'MODULE_03',
      title: 'УПРАВЛЕНИЕ\nЗАДАЧАМИ',
      items: ['создаёт задачи', 'отслеживает процессы'],
      status: 'АКТИВЕН',
    },
    {
      num: '04',
      module: 'MODULE_04',
      title: 'РАБОТА\nС CRM',
      items: ['записывает данные', 'обновляет статусы'],
      status: 'СИНХРОНИЗАЦИЯ',
    },
    {
      num: '05',
      module: 'MODULE_05',
      title: 'АНАЛИТИКА\nИ РОСТ',
      items: ['анализирует результаты', 'находит узкие места'],
      status: 'РАБОТАЕТ',
    },
  ];

  return (
    <div className="snap-page">
      <div className="poster-container">
        {/* Compact editorial header row */}
        <div className="b-bottom px-5 pt-1 pb-1">
          <p className="system-label" style={{ marginBottom: 0 }}>
            03 / ВОЗМОЖНОСТИ
          </p>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 400,
            fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)',
            lineHeight: 0.92,
            textTransform: 'uppercase' as const,
            letterSpacing: '-0.01em',
            color: '#111',
            marginTop: '4px',
            marginBottom: 0,
          }}>
            ЧТО УМЕЕТ <span className="heading-latin">AI</span>-СОТРУДНИК
          </h2>
          <p style={{
            fontFamily: 'var(--font-tech)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase' as const,
            color: 'rgba(0,0,0,0.65)',
            lineHeight: 1.6,
            marginTop: '4px',
            marginBottom: 0,
          }}>
            ЦИФРОВЫЕ РОЛИ ДЛЯ БИЗНЕСА<br />
            С KPI, ЛОГИКОЙ И ИНТЕГРАЦИЯМИ
          </p>
        </div>

        {/* Cards grid — 3 × 2: row1 = 01 02 03, row2 = 04 05 core */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-1 folder-grid ci-grid"
        >
          {/* System axis line */}
          <div className="ci-system-axis" aria-hidden="true" />

          {cards.map((card, i) => (
            <div
              key={card.num}
              className="layer-card ci-animate"
              style={{ '--ci-delay': `${i * 100}ms` } as React.CSSProperties}
            >
              {/* HEADER zone */}
              <div className="ci-header">
                <div className="ci-axis">
                  <div className="ci-num">{card.num}</div>
                  <div className="ci-vline" />
                </div>
                <div className="ci-module-label">{card.module}</div>
                <h3 className="ci-title">{card.title}</h3>
              </div>

              {/* CONTENT zone */}
              <div className="ci-content">
                <ul className="ci-list">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* FOOTER zone */}
              <div className="ci-footer">
                <div className="ci-status">
                  <span className="ci-status__dot" />
                  <span className="ci-status__label">{card.status}</span>
                </div>
              </div>
            </div>
          ))}

          {/* CORE SYSTEM tile removed */}
        </div>
      </div>
    </div>
  );
};

export default CoreProductSection;
