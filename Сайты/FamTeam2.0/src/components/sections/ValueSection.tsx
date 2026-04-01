const ValueSection = () => {
  return (
    <div className="snap-page">
      <div className="poster-container">
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
          {/* Problems */}
          <div className="p-6 md:p-8 b-right flex flex-col justify-center">
            <span className="pill mb-3">Проблема рынка</span>
            <h2 className="display-type mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              Почему это <span className="text-brand-accent">важно</span>
            </h2>
            <div className="space-y-2">
              {[
                { n: '01', t: 'Рутина перегружает команду' },
                { n: '02', t: 'Нет прозрачности процессов' },
                { n: '03', t: 'Зависимость от людей' },
                { n: '04', t: 'Рост штата = рост затрат' },
                { n: '05', t: 'Отсутствие системности' },
              ].map((p) => (
                <div key={p.n} className="flex gap-3 items-baseline">
                  <span className="text-brand-accent font-medium" style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem' }}>{p.n}</span>
                  <span className="font-medium u-caps text-xs">{p.t}</span>
                </div>
              ))}
            </div>
            <div className="b-all p-3 mt-4">
              <p className="text-xs italic">Люди должны заниматься стратегией, а не рутиной.</p>
            </div>
          </div>

          {/* Value */}
          <div className="p-6 md:p-8 flex flex-col justify-center" style={{ background: 'var(--c-black)', color: 'var(--c-white)' }}>
            <span className="pill pill--white mb-3">Ценность</span>
            <h2 className="display-type mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              Через <span className="text-brand-accent">3 месяца</span>
            </h2>
            <div className="space-y-2 mb-4">
              {['Нет пропущенных лидов', 'Прозрачная конверсия', 'Освобождённая команда', 'Снижение тревожности'].map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <span className="text-brand-accent font-medium">✓</span>
                  <span className="text-sm">{r}</span>
                </div>
              ))}
            </div>
            <div className="accent-line mb-3" />
            <p className="text-xs" style={{ opacity: 0.8, lineHeight: 1.4 }}>
              Мы не заменяем людей. Мы берём на себя рутину, чтобы команда занималась ростом.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueSection;
