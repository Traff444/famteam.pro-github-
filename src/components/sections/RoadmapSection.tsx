const RoadmapSection = () => {
  return (
    <div className="snap-page">
      <div className="poster-container">
        <div className="p-4 b-bottom flex items-center gap-4" style={{ background: 'var(--c-accent)' }}>
          <span className="pill pill--white">Стратегия</span>
          <h2 className="display-type" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--c-white)' }}>
            Дорожная карта — 24 месяца
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
          {/* Phase 1 */}
          <div className="p-5 md:p-8 b-right flex flex-col justify-between">
            <div>
              <span className="pill mb-2">Этап 1</span>
              <h3 className="display-type text-2xl md:text-3xl mt-2">СТУДИЯ</h3>
              <h4 className="display-type text-2xl md:text-3xl text-brand-accent mb-3">ЭТАП</h4>
              <p className="text-xs font-medium u-caps mb-3" style={{ color: '#999' }}>0–12 месяцев</p>
              <div className="accent-line mb-3" />
              <ul className="space-y-1">
                {['AI Менеджер в 10–20 компаниях', 'Обкатка AI Юриста и AI HR', 'Стандартизация логики ролей', 'Формирование базы KPI'].map((item) => (
                  <li key={item} className="text-xs flex items-start gap-2">
                    <span className="text-brand-accent font-medium">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="b-all p-2 mt-3">
              <p className="text-xs font-medium u-caps">Цель: Повторяемая архитектура</p>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="p-5 md:p-8 flex flex-col justify-between" style={{ background: 'var(--c-black)', color: 'var(--c-white)' }}>
            <div>
              <span className="pill pill--white mb-2">Этап 2</span>
              <h3 className="display-type text-2xl md:text-3xl mt-2">ПЛАТФОРМА</h3>
              <h4 className="display-type text-2xl md:text-3xl text-brand-accent mb-3">ПЕРЕХОД</h4>
              <p className="text-xs font-medium u-caps mb-3" style={{ opacity: 0.5 }}>12–24 месяца</p>
              <div className="accent-line mb-3" />
              <ul className="space-y-1">
                {['Панель управления AI-сотрудниками', 'Полу-SaaS формат', 'Модульная система ролей', 'Управляемая эволюция'].map((item) => (
                  <li key={item} className="text-xs flex items-start gap-2">
                    <span className="text-brand-accent font-medium">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-2 mt-3" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
              <p className="text-xs font-medium u-caps">Цель: Архитектура → Продукт</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;
