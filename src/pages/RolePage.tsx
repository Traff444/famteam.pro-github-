import { useParams, Navigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import AiSystemVisual, { type ChatLine } from '@/components/ui/AiSystemVisual';
import GrowthMetricVisual from '@/components/ui/GrowthMetricVisual';
import AiProductHero from '@/components/sections/AiProductHero';
import GrowthProductHero from '@/components/sections/GrowthProductHero';
import CreatorVisual from '@/components/ui/CreatorVisual';
import CreatorProductHero from '@/components/sections/CreatorProductHero';
import { getRoleBySlug, getNextRole } from '@/data/roles-config';

/* ── Reveal hook ── */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('rp-revealed'); obs.disconnect(); } },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Niche content for "Where it works" ── */
const GROWTH_NICHE_CONTENT: Record<string, { explanation: string; example: string }> = {
  'медицина': {
    explanation: 'Анализирует страницу записи, находит барьеры и оптимизирует форму для увеличения записей.',
    example: '62% не доходят до кнопки записи → сокращаем форму, конверсия +34%',
  },
  'образование': {
    explanation: 'Оптимизирует лендинги курсов, улучшает формы регистрации и увеличивает конверсию заявок.',
    example: 'Страница курса: 3.1% → 5.4% конверсия после оптимизации формы',
  },
  'e-commerce': {
    explanation: 'Анализирует корзину и чекаут, снижает отказы и увеличивает завершённые покупки.',
    example: 'Брошенные корзины: 74% → 58% после упрощения чекаута',
  },
  'сервисы': {
    explanation: 'Оптимизирует страницы услуг, улучшает CTA и упрощает путь до заявки.',
    example: 'Заявки с сайта: +42% за 2 недели после редизайна формы',
  },
  'saas': {
    explanation: 'Улучшает trial-воронку, оптимизирует лендинг и увеличивает конверсию регистраций.',
    example: 'Sign-up rate: 2.1% → 3.8% после A/B теста заголовка и формы',
  },
};

const CREATOR_NICHE_CONTENT: Record<string, { explanation: string; example: string }> = {
  'клиники': {
    explanation: 'Создаёт контент о здоровье, публикует посты и переводит комментарии в записи.',
    example: '«5 симптомов, которые нельзя игнорировать» → +45% охвата, 8 записей из комментариев',
  },
  'образование': {
    explanation: 'Генерирует образовательный контент, продвигает курсы и отвечает на вопросы аудитории.',
    example: '«Как выбрать курс за 3 шага» → 2 400 просмотров, 12 заявок через ЛС',
  },
  'e-commerce': {
    explanation: 'Создаёт карточки товаров, обзоры и акции, отвечает на вопросы покупателей.',
    example: 'Серия постов о новинках → +38% переходов на сайт за неделю',
  },
  'сервисы': {
    explanation: 'Публикует кейсы, советы и акции, привлекает клиентов через соцсети.',
    example: '«До/после» пост ремонта → 1 800 просмотров, 6 заявок',
  },
};

const NICHE_CONTENT: Record<string, { explanation: string; example: string; chat: ChatLine[] }> = {
  'клиники': {
    explanation: 'Записывает пациентов на приём, уточняет симптомы и помогает выбрать подходящего специалиста.',
    example: 'Опишите симптомы — сориентирую по специалисту и подберу удобное время.',
    chat: [
      { from: 'client', delay: 0,     text: 'Здравствуйте, мне плохо' },
      { from: 'ai',     delay: 1000,  text: 'Добрый день. Опишите симптомы — сориентирую по специалисту и подберу время.' },
      { from: 'client', delay: 1200,  text: 'Температура и горло' },
      { from: 'ai',     delay: 1000,  text: 'По симптомам оптимально начать с терапевта. Ближайшее время: сегодня 16:00 или завтра 14:00.' },
      { from: 'client', delay: 1000,  text: 'Сегодня' },
      { from: 'ai',     delay: 1000,  text: 'Записала вас на сегодня в 16:00 к терапевту ✅' },
    ],
  },
  'образование': {
    explanation: 'Подбирает программу обучения, отвечает на вопросы и записывает на курс.',
    example: 'Какое направление интересует? Подберу подходящую программу.',
    chat: [
      { from: 'client', delay: 0,     text: 'Хочу чему-то научиться' },
      { from: 'ai',     delay: 1000,  text: 'Добрый день. Какое направление вас интересует? Подберу подходящую программу.' },
      { from: 'client', delay: 1200,  text: 'Что-то про маркетинг' },
      { from: 'ai',     delay: 1000,  text: 'Есть базовый курс по маркетингу — подходит для старта. Записать на пробное занятие?' },
      { from: 'client', delay: 1000,  text: 'Да' },
      { from: 'ai',     delay: 1000,  text: 'Записала. Ссылка на занятие отправлена в письме ✅' },
    ],
  },
  'сервисный бизнес': {
    explanation: 'Принимает заявки, уточняет задачу и назначает мастера на удобное время.',
    example: 'Опишите проблему — уточню детали и назначу мастера.',
    chat: [
      { from: 'client', delay: 0,     text: 'Что-то сломалось' },
      { from: 'ai',     delay: 1000,  text: 'Добрый день. Опишите проблему — уточню детали и назначу мастера.' },
      { from: 'client', delay: 1200,  text: 'Кондиционер не охлаждает' },
      { from: 'ai',     delay: 1000,  text: 'Требуется диагностика системы. Могу назначить мастера: сегодня вечером или завтра утром.' },
      { from: 'client', delay: 1000,  text: 'Завтра утром' },
      { from: 'ai',     delay: 1000,  text: 'Мастер назначен на завтра в 10:00 ✅' },
    ],
  },
  'консалтинг': {
    explanation: 'Квалифицирует запрос, подбирает формат консультации и записывает к специалисту.',
    example: 'Опишите ситуацию — подберу формат и специалиста.',
    chat: [
      { from: 'client', delay: 0,     text: 'Нужна помощь' },
      { from: 'ai',     delay: 1000,  text: 'Добрый день. Опишите ситуацию — подберу формат консультации и специалиста.' },
      { from: 'client', delay: 1200,  text: 'Бизнес проседает' },
      { from: 'ai',     delay: 1000,  text: 'Рекомендую стратегическую сессию. Ближайшее время: среда 15:00, стратег Алексей.' },
      { from: 'client', delay: 1000,  text: 'Да, подходит' },
      { from: 'ai',     delay: 1000,  text: 'Записала вас на среду в 15:00 к стратегу Алексею ✅' },
    ],
  },
  'локальные услуги': {
    explanation: 'Принимает обращения, уточняет адрес и организует выезд специалиста.',
    example: 'Какая задача и где находитесь? Оформлю заявку.',
    chat: [
      { from: 'client', delay: 0,     text: 'Нужен мастер' },
      { from: 'ai',     delay: 1000,  text: 'Добрый день. Какая задача и где вы находитесь? Оформлю заявку.' },
      { from: 'client', delay: 1200,  text: 'Минск, течёт кран' },
      { from: 'ai',     delay: 1000,  text: 'Задача для сантехника. Ближайший выезд — сегодня в 18:00. Подходит?' },
      { from: 'client', delay: 1000,  text: 'Подходит' },
      { from: 'ai',     delay: 1000,  text: 'Заявка оформлена. Мастер будет в 18:00 ✅' },
    ],
  },
};

/* ── Page ── */
const RolePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const role = getRoleBySlug(slug ?? '');
  if (!role) return <Navigate to="/404" replace />;

  const next = getNextRole(role.slug);

  /* Module state */
  const [activeModule, setActiveModule] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);

  /* Niche state */
  const [activeNiche, setActiveNiche] = useState(0);
  const [nicheKey, setNicheKey] = useState(0); // for fade transition

  /* Reveal refs */
  const heroRef = useReveal<HTMLElement>();
  const modulesRef = useReveal<HTMLElement>();
  const whereRef = useReveal<HTMLElement>();
  const resultRef = useReveal<HTMLElement>();
  const customRef = useReveal<HTMLElement>();

  /* Reset on slug change */
  useEffect(() => {
    setActiveModule(0);
    setMobileOpen(0);
    setActiveNiche(0);
    setNicheKey(0);
    const scrollEl = document.querySelector('.role-free-scroll');
    if (scrollEl) scrollEl.scrollTop = 0;
  }, [slug]);

  const selectModule = useCallback((i: number) => setActiveModule(i), []);
  const selectNiche = useCallback((i: number) => {
    if (i === activeNiche) return;
    setActiveNiche(i);
    setNicheKey(k => k + 1);
  }, [activeNiche]);

  const isGrowth = role.slug === 'growth';
  const isCreator = role.slug === 'creator';

  /* Compute active chat scenario for hero visual (receptionist only) */
  const activeScenario = useMemo(() => {
    if (isGrowth || isCreator) return undefined;
    const nicheItem = role.bestFor[activeNiche];
    const content = NICHE_CONTENT[nicheItem.toLowerCase()];
    return content?.chat;
  }, [activeNiche, role.bestFor, isGrowth]);

  const seoMeta: Record<string, { title: string; description: string }> = {
    receptionist: {
      title: 'AI Receptionist — обработка заявок 24/7',
      description: 'AI-сотрудник обрабатывает входящие из мессенджеров и соцсетей, ведёт диалог и доводит до заявки. Без найма менеджеров.',
    },
    growth: {
      title: 'AI Growth Manager — рост конверсии сайта',
      description: 'AI анализирует воронку, находит где теряются клиенты и увеличивает конверсию из трафика в заявки на 20–40%.',
    },
    creator: {
      title: 'AI Creator — контент для соцсетей',
      description: 'AI создаёт посты, адаптирует под стиль бренда и переводит комментарии в заявки. Контент без команды.',
    },
  };

  const currentSeo = seoMeta[role.slug] || { title: role.title, description: role.subtitle };

  return (
    <div className="site-root">
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        path={`/roles/${role.slug}`}
      />
      <Header />

      <div className="role-free-scroll">
        <div className="rp-wrap">

          {/* ── Back ── */}
          <Link to="/#product" className="rp-back">&larr; ВСЕ РОЛИ</Link>

          {/* ═══ 01 / РОЛЬ ═══ */}
          <section ref={heroRef} className="rp-hero rp-stagger">
            <div className="rp-hero__left">
              <span className="rp-label rp-item" style={{ '--rp-d': '0ms' } as React.CSSProperties}>
                01 / РОЛЬ
              </span>
              <h1 className="rp-hero__title rp-item" style={{ '--rp-d': '60ms' } as React.CSSProperties}>
                {role.title}
              </h1>
              <div className="rp-hero__desc rp-item" style={{ '--rp-d': '120ms' } as React.CSSProperties}>
                {role.tagline.split('\n').map((line, i) => (
                  <p key={i} className="rp-hero__desc-line">{line}</p>
                ))}
              </div>
              <div className="rp-hero__features rp-item" style={{ '--rp-d': '160ms' } as React.CSSProperties}>
                {role.heroBullets.map((f, i) => (
                  <div key={f} className="rp-hero__feat">
                    <span className="rp-hero__feat-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="rp-hero__feat-text">{f}</span>
                  </div>
                ))}
              </div>
              {/* Desktop CTA — hidden on mobile */}
              <a
                href="/#cta"
                className="btn-primary rp-hero__cta-desktop rp-item"
                style={{ '--rp-d': '280ms' } as React.CSSProperties}
              >
                {role.ctaLabel} &rarr;
              </a>
            </div>
            <div className="rp-hero__right rp-item" style={{ '--rp-d': '200ms' } as React.CSSProperties}>
              {isGrowth ? <GrowthMetricVisual /> : !isCreator ? <AiSystemVisual scenario={activeScenario} /> : null}
            </div>
            {/* Mobile CTA — hidden on desktop */}
            <a
              href="/#cta"
              className="btn-primary rp-hero__cta-mobile rp-item"
              style={{ '--rp-d': '320ms' } as React.CSSProperties}
            >
              {role.ctaLabel} &rarr;
            </a>
          </section>

          {/* ── Bridge text ── */}
          <div className="rp-bridge">
            <span className="rp-bridge__text">Смотрите, как это работает на практике</span>
            <span className="rp-bridge__arrow">↓</span>
          </div>

          {/* ═══ 02 / AI В ДЕЙСТВИИ ═══ */}
          {isGrowth ? (
            <GrowthProductHero embedded />
          ) : isCreator ? (
            <CreatorProductHero embedded />
          ) : (
            <div className="rp-action-block">
              <AiProductHero embedded />
            </div>
          )}

          {/* ═══ DASHBOARD (Growth only) ═══ */}
          {/* Dashboard is now inside GrowthProductHero */}

          {/* ═══ 03 / МОДУЛИ ═══ */}
          <section ref={modulesRef} className="rp-section rp-section--bordered rp-stagger">
            <span className="rp-label rp-item" style={{ '--rp-d': '0ms' } as React.CSSProperties}>
              03 / МОДУЛИ
            </span>

            {/* Desktop */}
            <div className="rp-mod rp-mod--desktop rp-item" style={{ '--rp-d': '80ms' } as React.CSSProperties}>
              <nav className="rp-mod__nav">
                {role.capabilityGroups.map((g, i) => (
                  <button
                    key={g.title}
                    className={`rp-mod__btn${i === activeModule ? ' rp-mod__btn--on' : ''}`}
                    onClick={() => selectModule(i)}
                    onMouseEnter={() => selectModule(i)}
                  >
                    <span className="rp-mod__btn-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="rp-mod__btn-label">{g.title}</span>
                  </button>
                ))}
              </nav>
              <div className="rp-mod__panel" key={activeModule}>
                <h3 className="rp-mod__panel-title">{role.capabilityGroups[activeModule].title}</h3>
                <ul className="rp-mod__panel-list">
                  {role.capabilityGroups[activeModule].items.map(item => (
                    <li key={item}><span className="rp-dot" />{item}</li>
                  ))}
                </ul>
                {role.capabilityGroups[activeModule].example && (
                  <div className="rp-mod__example">
                    <span className="rp-mod__example-label">ПРИМЕР</span>
                    <span className="rp-mod__example-text">{role.capabilityGroups[activeModule].example}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile */}
            <div className="rp-mod--mobile rp-item" style={{ '--rp-d': '80ms' } as React.CSSProperties}>
              {role.capabilityGroups.map((g, i) => (
                <div key={g.title} className={`rp-acc${mobileOpen === i ? ' rp-acc--open' : ''}`}>
                  <button
                    className="rp-acc__btn"
                    onClick={() => setMobileOpen(prev => prev === i ? null : i)}
                  >
                    <span className="rp-acc__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="rp-acc__title">{g.title}</span>
                    <span className="rp-acc__icon">{mobileOpen === i ? '\u2212' : '+'}</span>
                  </button>
                  {mobileOpen === i && (
                    <div className="rp-acc__body">
                      <ul className="rp-acc__list">
                        {g.items.map(item => (
                          <li key={item}><span className="rp-dot" />{item}</li>
                        ))}
                      </ul>
                      {g.example && (
                        <div className="rp-mod__example">
                          <span className="rp-mod__example-label">ПРИМЕР</span>
                          <span className="rp-mod__example-text">{g.example}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ═══ 04 / ГДЕ РАБОТАЕТ ═══ */}
          <section ref={whereRef} className="rp-section rp-section--bordered rp-stagger">
            <span className="rp-label rp-item" style={{ '--rp-d': '0ms' } as React.CSSProperties}>
              04 / ГДЕ РАБОТАЕТ
            </span>
            <h2 className="rp-where__heading rp-item" style={{ '--rp-d': '40ms' } as React.CSSProperties}>
              ГДЕ <span className="heading-latin">AI</span> ДАЁТ МАКСИМАЛЬНЫЙ ЭФФЕКТ
            </h2>
            <div className="rp-where rp-item" style={{ '--rp-d': '80ms' } as React.CSSProperties}>
              {role.bestFor.map((item, i) => (
                <button
                  key={item}
                  type="button"
                  className={`rp-where__card${i === activeNiche ? ' rp-where__card--active' : ''}`}
                  onClick={() => selectNiche(i)}
                >
                  <span className="rp-where__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rp-where__text">{item}</span>
                </button>
              ))}
            </div>
            {(() => {
              const nicheItem = role.bestFor[activeNiche];
              const content = isGrowth
                ? GROWTH_NICHE_CONTENT[nicheItem.toLowerCase()]
                : isCreator
                ? CREATOR_NICHE_CONTENT[nicheItem.toLowerCase()]
                : NICHE_CONTENT[nicheItem.toLowerCase()];
              if (!content) return (
                <p className="rp-where__note rp-item" style={{ '--rp-d': '200ms' } as React.CSSProperties}>
                  {role.bestForNote}
                </p>
              );
              return (
                <div className="rp-niche" key={nicheKey}>
                  <p className="rp-niche__explain">{content.explanation}</p>
                  <div className="rp-niche__example">
                    <span className="rp-niche__label">{isGrowth ? 'РЕЗУЛЬТАТ' : isCreator ? 'ПРИМЕР' : 'СЦЕНАРИЙ'}</span>
                    <p className="rp-niche__msg">{content.example}</p>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* ═══ 05 / РЕЗУЛЬТАТ ═══ */}
          <section ref={resultRef} className="rp-section rp-section--bordered rp-stagger">
            <span className="rp-label rp-item" style={{ '--rp-d': '0ms' } as React.CSSProperties}>
              05 / РЕЗУЛЬТАТ
            </span>
            <div className="rp-results-v2">
              {role.results.map((r, i) => (
                <div
                  key={r.title}
                  className="rp-res-v2 rp-item"
                  style={{ '--rp-d': `${80 + i * 100}ms` } as React.CSSProperties}
                >
                  <span className="rp-res-v2__num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="rp-res-v2__body">
                    <span className="rp-res-v2__title">{r.title}</span>
                    <span className="rp-res-v2__line" />
                    <span className="rp-res-v2__desc">{r.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ 06 / КАСТОМИЗАЦИЯ ═══ */}
          <section ref={customRef} className="rp-custom rp-stagger">
            <div className="rp-custom__inner">
              <div className="rp-custom__left">
                <span className="rp-label rp-label--light rp-item" style={{ '--rp-d': '0ms' } as React.CSSProperties}>
                  06 / КАСТОМИЗАЦИЯ
                </span>
                <h2 className="rp-custom__title rp-item" style={{ '--rp-d': '60ms' } as React.CSSProperties}>
                  {role.customTitle ?? 'АДАПТИРУЕТСЯ ПОД ВАШ БИЗНЕС'}
                </h2>
                <p className="rp-custom__text rp-item" style={{ '--rp-d': '120ms' } as React.CSSProperties}>
                  {role.customSubtitle ?? 'Каждый AI-сотрудник настраивается под ваши процессы, каналы и сценарии.'}
                </p>
              </div>
              <div className="rp-custom__right rp-item" style={{ '--rp-d': '160ms' } as React.CSSProperties}>
                <ul className="rp-custom__bullets">
                  {role.customBullets.map(b => (
                    <li key={b}>
                      <span className="rp-custom__check">&#10003;</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="/#cta"
                  className="btn-primary btn-primary--light rp-item"
                  style={{ '--rp-d': '240ms' } as React.CSSProperties}
                >
                  Настроить AI под свой бизнес &rarr;
                </a>
              </div>
            </div>
          </section>

          {/* ═══ 07 / СЛЕДУЮЩАЯ РОЛЬ ═══ */}
          {next && (
            <nav className="rp-next rp-section--bordered">
              <span className="rp-label">07 / СЛЕДУЮЩАЯ РОЛЬ</span>
              <Link to={next.path} className="rp-next__link">
                <div className="rp-next__info">
                  <span className="rp-next__name">{next.label}</span>
                  <span className="rp-next__desc">{next.tagline.split('\n')[0]}</span>
                </div>
                <span className="rp-next__arrow">&rarr;</span>
              </Link>
            </nav>
          )}


        </div>
      </div>
    </div>
  );
};

export default RolePage;
