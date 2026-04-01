import { useState } from 'react';

const CARDS = [
  {
    n: '01',
    title: 'РАБОТАЕТ В РЕАЛЬНОМ БИЗНЕСЕ',
    short: 'Внедрено и протестировано',
    details: [
      { n: '01', t: 'Обрабатывает входящие без задержек' },
      { n: '02', t: 'Доводит клиентов до заявки' },
      { n: '03', t: 'Фиксирует каждое обращение в CRM' },
      { n: '04', t: 'Выдерживает нагрузку' },
    ],
    outcome: 'Проверено на реальных клиентах и деньгах',
    strip: 0,
  },
  {
    n: '02',
    title: 'ДОВОДИМ ДО РЕЗУЛЬТАТА',
    short: 'Не просто внедрение, а рост заявок',
    details: [
      { n: '01', t: 'Проектируем сценарий под вашу воронку' },
      { n: '02', t: 'Тестируем на реальных диалогах' },
      { n: '03', t: 'Оптимизируем конверсию в заявку' },
      { n: '04', t: 'Встраиваем в ваш процесс' },
    ],
    outcome: 'Не демо, а работающая система',
    strip: 2,
  },
  {
    n: '03',
    title: 'СИСТЕМА С KPI',
    short: 'Каждый AI работает на метрики',
    details: [
      { n: '01', t: 'Понимает этап воронки клиента' },
      { n: '02', t: 'Знает цель каждого диалога' },
      { n: '03', t: 'Передаёт лид дальше по цепочке' },
      { n: '04', t: 'Измеряется по результату' },
    ],
    outcome: 'Выполняет функцию, а не просто отвечает',
    strip: 3,
  },
];

const STRIP = ['Прозрачность', 'Контроль', 'Предсказуемость', 'Управляемость'];

const CompetitiveSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="snap-page">
      <div className="poster-container" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Desktop title */}
        <div className="why__title-desktop">
          <div className="b-bottom overflow-hidden flex items-center" style={{ minHeight: '60px' }}>
            <span className="massive-type" style={{ fontSize: 'clamp(2rem, 7vw, 7rem)' }}>ПОЧЕМУ</span>
          </div>
          <div className="grid grid-cols-2 b-bottom overflow-hidden" style={{ minHeight: '60px' }}>
            <div className="b-right flex items-center">
              <span className="massive-type text-brand-accent" style={{ fontSize: 'clamp(2rem, 7vw, 7rem)' }}>FAM</span>
            </div>
            <div className="flex items-center">
              <span className="massive-type" style={{ fontSize: 'clamp(2rem, 7vw, 7rem)' }}>TEAM</span>
            </div>
          </div>
          <div className="why__sub-row">
            <span className="why__sub-text">Почему бизнес выбирает нас</span>
          </div>
        </div>

        {/* Mobile title */}
        <div className="why__title-mobile">
          <h2 className="display-type" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', lineHeight: 0.95, color: '#111' }}>
            ПОЧЕМУ<br /><span className="text-brand-accent">FAMTEAM</span>
          </h2>
          <span className="why__sub-text" style={{ marginTop: '8px' }}>Почему бизнес выбирает нас</span>
        </div>

        {/* Cards */}
        <div className="why__grid">
          {CARDS.map((c, i) => (
            <div
              key={c.n}
              className={`why__card${hovered === i ? ' why__card--hover' : ''}${hovered !== null && hovered !== i ? ' why__card--dim' : ''}${expanded === i ? ' why__card--expanded' : ''}${i < 2 ? ' why__card--border' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="why__card-top">
                <span className="why__card-num">{c.n}</span>
                <h3 className="why__card-title">{c.title}</h3>
                <p className="why__card-short">{c.short}</p>
              </div>

              <div className="why__card-expand">
                <div className="why__card-sep" />
                <div className="why__card-details">
                  {c.details.map((d) => (
                    <div key={d.n} className="why__card-detail">
                      <span className="why__card-detail-num">{d.n}</span>
                      <span className="why__card-detail-text">{d.t}</span>
                    </div>
                  ))}
                </div>
                <div className="why__card-outcome">{c.outcome}</div>
              </div>

              <div className="why__card-line" />
            </div>
          ))}
        </div>

        {/* Strip */}
        <div className="why__strip">
          {STRIP.map((w, i) => (
            <div
              key={w}
              className={`why__strip-item${hovered !== null && CARDS[hovered].strip === i ? ' why__strip-item--active' : ''}`}
            >
              {w}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitiveSection;
