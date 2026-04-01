// src/data/roles-config.ts
// Single source of truth for all AI role data.
// Used by: RolePage (detail pages).

export interface CapabilityGroup {
  title: string;
  items: string[];
  example?: string;
}

export interface ResultCard {
  title: string;
  desc: string;
}

export interface RoleConfig {
  slug: 'receptionist' | 'analyst' | 'sales' | 'growth' | 'creator';
  path: string;
  order: number;
  num: string;
  label: string;
  navLabel: string;
  title: string;
  subtitle: string;
  tagline: string;
  heroBullets: string[];
  cardSummary: string[];
  description: string[];
  capabilities: string[];
  capabilityGroups: CapabilityGroup[];
  howItWorks: string[];
  bestFor: string[];
  bestForNote: string;
  results: ResultCard[];
  kpi: { label: string; value: string }[];
  customBullets: string[];
  nextDesc?: string;
  customTitle?: string;
  customSubtitle?: string;
  cardImage: string;
  heroImage: string;
  ctaLabel: string;
}

export const ROLES: RoleConfig[] = [
  {
    slug: 'receptionist',
    path: '/roles/receptionist',
    order: 1,
    num: 'NO.001',
    label: 'AI RECEPTIONIST',
    navLabel: 'AI Receptionist',
    title: 'AI RECEPTIONIST',
    subtitle: 'AI WORKFORCE ROLE',
    tagline: 'Обрабатывает входящие обращения,\nобщается с клиентами\nи доводит до записи без участия менеджера.',
    heroBullets: [
      'отвечает за секунды',
      'ведёт диалог как человек',
      'записывает и фиксирует заявки',
    ],
    cardSummary: ['отвечает клиентам', 'ведёт диалог', 'записывает встречи'],
    description: [
      'AI Receptionist обрабатывает входящие заявки из сайта, мессенджеров и других каналов.',
      'Он отвечает на вопросы клиентов, ведёт диалог и помогает довести разговор до записи или следующего шага.',
      'Система запоминает контекст разговоров и может адаптироваться под сценарии бизнеса.',
    ],
    capabilities: [
      'отвечает на сообщения',
      'ведёт диалог',
      'записывает клиентов',
      'помнит разговор',
      'передаёт данные в CRM',
    ],
    capabilityGroups: [
      {
        title: 'КОММУНИКАЦИЯ',
        items: ['отвечает сразу, без ожидания', 'ведёт диалог как администратор', 'учитывает контекст обращения', 'работает в Telegram и на сайте'],
        example: 'Здравствуйте. Опишите задачу — сориентирую и подберу удобное время.',
      },
      {
        title: 'КОНВЕРСИЯ',
        items: ['доводит клиента до записи', 'квалифицирует обращения', 'предлагает следующий шаг', 'снижает потери заявок'],
        example: 'Клиент записан на 14:00 → CRM обновлена',
      },
      {
        title: 'ПАМЯТЬ',
        items: ['запоминает клиента', 'хранит историю диалогов', 'учитывает прошлые обращения'],
        example: '«Вы были у нас в марте — всё понравилось?»',
      },
      {
        title: 'ИНТЕГРАЦИИ',
        items: ['передаёт данные в CRM', 'обновляет статусы', 'подключается к API'],
        example: 'Bitrix24, AmoCRM, Telegram Bot API',
      },
    ],
    howItWorks: [
      'Клиент пишет в чат, Telegram или форму',
      'AI отвечает мгновенно',
      'Уточняет запрос и задаёт вопросы',
      'Предлагает запись или решение',
      'Передаёт данные в CRM',
    ],
    bestFor: ['клиники', 'образование', 'сервисный бизнес', 'консалтинг', 'локальные услуги'],
    bestForNote: 'Подстраивается под любой процесс работы с клиентами',
    results: [
      { title: 'ОТВЕЧАЕТ СРАЗУ', desc: 'клиент не ждёт' },
      { title: 'ВСЕ ЗАЯВКИ', desc: 'ничего не теряется' },
      { title: '24/7', desc: 'без выходных' },
    ],
    kpi: [
      { label: 'Response time', value: 'мгновенно' },
      { label: 'Lead coverage', value: '100%' },
      { label: 'Working hours', value: '24/7' },
    ],
    customBullets: [
      'настраиваем тон общения под ваш бизнес',
      'подключаем к вашей CRM и каналам',
      'выстраиваем логику обработки заявок',
    ],
    cardImage: '/images/roles/receptionist-card.webp',
    heroImage: '/images/roles/receptionist-hero.webp',
    ctaLabel: 'ОБСУДИТЬ ВНЕДРЕНИЕ',
  },
  {
    slug: 'analyst',
    path: '/roles/analyst',
    order: 2,
    num: 'NO.002',
    label: 'AI ANALYST',
    navLabel: 'AI Analyst',
    title: 'AI ANALYST',
    subtitle: 'AI WORKFORCE ROLE',
    tagline: 'Анализирует заявки,\nнаходит точки роста\nи предлагает гипотезы улучшений.',
    heroBullets: [
      'выявляет узкие места',
      'предлагает гипотезы роста',
      'формирует отчёты автоматически',
    ],
    cardSummary: ['анализирует заявки', 'находит узкие места', 'предлагает гипотезы'],
    description: [
      'AI Analyst анализирует входящие заявки, взаимодействие клиентов и процессы продаж.',
      'Он помогает находить узкие места в воронке и выявляет точки роста.',
      'Система может предлагать гипотезы для улучшения процессов и повышения конверсии.',
    ],
    capabilities: [
      'анализирует заявки',
      'выявляет узкие места',
      'предлагает гипотезы роста',
      'отслеживает показатели',
      'формирует отчёты',
    ],
    capabilityGroups: [
      {
        title: 'СБОР ДАННЫХ',
        items: ['агрегирует заявки из каналов', 'собирает метрики воронки', 'отслеживает поведение клиентов'],
        example: '142 заявки за неделю → 3 источника',
      },
      {
        title: 'АНАЛИЗ',
        items: ['выявляет узкие места', 'находит паттерны поведения', 'сравнивает периоды и сегменты'],
        example: 'Конверсия −12% → причина: время ответа',
      },
      {
        title: 'ИНСАЙТЫ',
        items: ['предлагает гипотезы роста', 'прогнозирует конверсию', 'приоритизирует возможности'],
        example: 'Автоответ → прогноз +18% конверсия',
      },
      {
        title: 'ОТЧЁТНОСТЬ',
        items: ['формирует отчёты', 'отслеживает KPI в реальном времени', 'отправляет дайджесты команде'],
        example: 'Еженедельный дайджест → Slack / Email',
      },
    ],
    howItWorks: [
      'Система подключается к источникам данных',
      'AI собирает и нормализует метрики',
      'Анализирует паттерны и отклонения',
      'Формирует инсайты и рекомендации',
      'Отправляет отчёты в команду',
    ],
    bestFor: ['e-commerce', 'SaaS', 'маркетинг', 'онлайн сервисы', 'образование'],
    bestForNote: 'Подстраивается под любую воронку и процесс продаж',
    results: [
      { title: 'ИНСАЙТЫ КАЖДЫЙ ДЕНЬ', desc: 'данные превращаются в решения' },
      { title: '100% ПОКРЫТИЕ', desc: 'ни один канал не упускается' },
      { title: 'НЕПРЕРЫВНАЯ ОПТИМИЗАЦИЯ', desc: 'система учится и улучшается' },
    ],
    kpi: [
      { label: 'Insights', value: 'ежедневно' },
      { label: 'Data coverage', value: '100%' },
      { label: 'Optimization', value: 'continuous' },
    ],
    customBullets: [
      'метрики и KPI под вашу воронку',
      'подключение к вашим источникам данных',
      'формат отчётов под команду',
    ],
    cardImage: '/images/roles/analyst-card.webp',
    heroImage: '/images/roles/analyst-hero.webp',
    ctaLabel: 'ОБСУДИТЬ ВНЕДРЕНИЕ',
  },
  {
    slug: 'sales',
    path: '/roles/sales',
    order: 3,
    num: 'NO.003',
    label: 'AI SALES AGENT',
    navLabel: 'AI Sales Agent',
    title: 'AI SALES AGENT',
    subtitle: 'AI WORKFORCE ROLE',
    tagline: 'Звонит лидам,\nвыявляет потребность\nи назначает встречи.',
    heroBullets: [
      'обзванивает лидов автоматически',
      'квалифицирует и фильтрует заявки',
      'назначает встречи без менеджера',
    ],
    cardSummary: ['обзванивает лидов', 'квалифицирует заявки', 'назначает встречи'],
    description: [
      'AI Sales Agent работает с входящими и исходящими лидами.',
      'Он может звонить клиентам, выявлять потребности и квалифицировать заявки.',
      'Система помогает довести лид до встречи или следующего этапа воронки.',
    ],
    capabilities: [
      'обзванивает лидов',
      'выявляет потребность',
      'консультирует',
      'назначает встречи',
      'фиксирует результаты разговоров',
    ],
    capabilityGroups: [
      {
        title: 'КОНТАКТ',
        items: ['обзванивает лидов', 'инициирует диалог', 'работает по расписанию и триггерам'],
        example: '«Добрый день! Вы оставляли заявку...»',
      },
      {
        title: 'КВАЛИФИКАЦИЯ',
        items: ['выявляет потребность', 'оценивает готовность к покупке', 'фильтрует нецелевые заявки'],
        example: 'Бюджет ✓ Потребность ✓ Сроки ✓',
      },
      {
        title: 'КОНВЕРСИЯ',
        items: ['назначает встречи', 'ведёт по воронке', 'предлагает следующий шаг'],
        example: 'Демо: четверг, 11:00 → календарь',
      },
      {
        title: 'ФИКСАЦИЯ',
        items: ['записывает результаты разговоров', 'обновляет CRM', 'передаёт данные менеджеру'],
        example: 'Карточка лида → CRM → уведомление',
      },
    ],
    howItWorks: [
      'Система получает лид из CRM или формы',
      'AI звонит и начинает диалог',
      'Выявляет потребность и квалифицирует',
      'Предлагает встречу или следующий шаг',
      'Фиксирует результат в CRM',
    ],
    bestFor: ['образование', 'недвижимость', 'консалтинг', 'сервисные компании', 'продажи по лидам'],
    bestForNote: 'Подстраивается под любой цикл продаж',
    results: [
      { title: '100% КОНТАКТ', desc: 'каждый лид получает звонок' },
      { title: 'БОЛЬШЕ ВСТРЕЧ', desc: 'конверсия из лида в встречу растёт' },
      { title: '24/7', desc: 'роль работает без выходных' },
    ],
    kpi: [
      { label: 'Lead contact rate', value: '100%' },
      { label: 'Meetings booked', value: 'рост' },
      { label: 'Working hours', value: '24/7' },
    ],
    customBullets: [
      'скрипт и логика разговора под вашу нишу',
      'интеграция с CRM и календарём',
      'правила квалификации лидов',
    ],
    cardImage: '/images/roles/sales-card.webp',
    heroImage: '/images/roles/sales-hero.webp',
    ctaLabel: 'ОБСУДИТЬ ВНЕДРЕНИЕ',
  },
  {
    slug: 'growth',
    path: '/roles/growth',
    order: 4,
    num: 'NO.004',
    label: 'AI GROWTH MANAGER',
    navLabel: 'AI Growth Manager',
    title: 'AI GROWTH MANAGER',
    subtitle: 'AI WORKFORCE ROLE',
    tagline: 'Находит, где вы теряете клиентов\nи увеличивает конверсию сайта.',
    heroBullets: [
      'показывает где теряются клиенты',
      'увеличивает конверсию сайта',
      'предлагает и внедряет улучшения',
    ],
    cardSummary: ['анализирует сайт', 'находит слабые места', 'увеличивает заявки'],
    description: [
      'AI Growth Manager анализирует поведение пользователей на сайте и находит точки потерь.',
      'Он выявляет слабые места в воронке и предлагает конкретные улучшения.',
      'Система помогает увеличить количество заявок без увеличения рекламного бюджета.',
    ],
    capabilities: [
      'анализирует сайт',
      'находит слабые места',
      'увеличивает конверсию',
      'предлагает улучшения',
      'внедряет изменения',
    ],
    capabilityGroups: [
      {
        title: 'АНАЛИТИКА',
        items: ['анализирует поведение пользователей', 'отслеживает воронку конверсии', 'находит точки потерь', 'сравнивает периоды'],
        example: '62% пользователей не доходят до кнопки записи',
      },
      {
        title: 'ДИАГНОСТИКА',
        items: ['выявляет слабые места форм', 'оценивает UX-барьеры', 'анализирует скорость загрузки', 'проверяет мобильную версию'],
        example: 'Форма содержит 6 полей — конверсия падает на 40%',
      },
      {
        title: 'РЕКОМЕНДАЦИИ',
        items: ['предлагает конкретные изменения', 'приоритизирует по влиянию', 'даёт прогноз эффекта', 'формирует план действий'],
        example: 'Сократить форму до 3 полей → прогноз +25% заявок',
      },
      {
        title: 'ВНЕДРЕНИЕ',
        items: ['вносит изменения на сайт', 'проводит A/B тесты', 'отслеживает результат', 'итерирует улучшения'],
        example: 'A/B тест: новая форма → +32% конверсия за 7 дней',
      },
    ],
    howItWorks: [
      'Анализирует сайт и поведение',
      'Находит слабые места',
      'Предлагает улучшения',
      'Внедряет изменения',
      'Увеличивает заявки',
    ],
    bestFor: ['медицина', 'образование', 'e-commerce', 'сервисы', 'SaaS'],
    bestForNote: 'Подстраивается под любой тип сайта и воронку',
    results: [
      { title: 'БОЛЬШЕ ЗАЯВОК', desc: 'без увеличения рекламы' },
      { title: 'ПОНЯТНАЯ ВОРОНКА', desc: 'видно где теряются клиенты' },
      { title: 'РОСТ КОНВЕРСИИ', desc: 'измеримый результат' },
    ],
    kpi: [
      { label: 'Conversion lift', value: '+20-40%' },
      { label: 'Insights', value: 'ежедневно' },
      { label: 'A/B tests', value: 'continuous' },
    ],
    customBullets: [
      'настраиваем под вашу воронку и метрики',
      'подключаем к аналитике и CRM',
      'выстраиваем план оптимизации под ваш бизнес',
    ],
    customTitle: 'НУЖЕН РОСТ ЗАЯВОК?',
    customSubtitle: 'Покажем, где ваш сайт теряет клиентов и как это исправить.',
    cardImage: '/images/roles/growth-card.webp',
    heroImage: '/images/roles/growth-hero.webp',
    ctaLabel: 'УВЕЛИЧИТЬ ЗАЯВКИ',
  },
  {
    slug: 'creator',
    path: '/roles/creator',
    order: 5,
    num: 'NO.005',
    label: 'AI CREATOR',
    navLabel: 'AI Creator',
    title: 'AI CREATOR',
    subtitle: 'SMM & контент',
    tagline: 'Создаёт контент, который привлекает клиентов\nи ведёт коммуникацию с аудиторией.',
    heroBullets: [
      'создаёт посты, которые приводят клиентов',
      'адаптирует контент под стиль бренда',
      'отвечает на комментарии и переводит их в заявки',
    ],
    cardSummary: [
      'контент под стиль бренда',
      'автопубликация',
      'ответы аудитории',
    ],
    description: [
      'Создаёт контент, который привлекает клиентов.',
      'Ведёт коммуникацию с аудиторией.',
    ],
    capabilities: [
      'генерация текстов',
      'адаптация стиля',
      'планирование публикаций',
      'ответы на комментарии',
    ],
    capabilityGroups: [
      {
        title: 'ГЕНЕРАЦИЯ',
        items: [
          'создаёт посты под стиль бренда',
          'адаптирует тон и формат',
          'генерирует идеи для контента',
          'пишет тексты для разных платформ',
        ],
        example: '«5 причин автоматизировать приём клиентов»',
      },
      {
        title: 'ПУБЛИКАЦИЯ',
        items: [
          'планирует график публикаций',
          'публикует автоматически',
          'оптимизирует время постинга',
          'адаптирует под каждую платформу',
        ],
        example: 'Instagram: пост опубликован в 18:30 — пик активности',
      },
      {
        title: 'КОММУНИКАЦИЯ',
        items: [
          'отвечает на комментарии',
          'переводит в личные сообщения',
          'квалифицирует запросы',
          'передаёт горячих лидов',
        ],
        example: '«Напишите в ЛС — подберём решение под ваш бизнес»',
      },
      {
        title: 'АНАЛИТИКА',
        items: [
          'отслеживает охваты и вовлечённость',
          'анализирует лучший контент',
          'формирует отчёт по результатам',
          'предлагает улучшения',
        ],
        example: 'Вовлечённость +45% после смены формата постов',
      },
    ],
    howItWorks: [
      'Анализирует бренд и аудиторию',
      'Генерирует контент-план',
      'Создаёт посты',
      'Публикует по расписанию',
      'Отвечает аудитории',
    ],
    bestFor: [
      'Клиники',
      'Образование',
      'E-Commerce',
      'Сервисы',
    ],
    bestForNote: 'Любой бизнес, которому нужен контент в соцсетях',
    results: [
      { title: 'контент без команды', desc: 'посты создаются автоматически' },
      { title: 'рост аудитории', desc: 'регулярные публикации увеличивают охват' },
      { title: 'лиды из соцсетей', desc: 'комментарии переводятся в заявки' },
    ],
    kpi: [
      { label: 'Постов/нед', value: '12' },
      { label: 'Охват', value: '+65%' },
      { label: 'Лиды', value: '+38%' },
    ],
    customBullets: [
      'настраиваем тон и стиль под ваш бренд',
      'подключаем к вашим соцсетям и каналам',
      'выстраиваем контент-стратегию',
    ],
    cardImage: '/images/roles/creator-card.webp',
    heroImage: '/images/roles/creator-hero.webp',
    ctaLabel: 'СОЗДАВАТЬ КОНТЕНТ',
  },
];

/** Active roles (shown in navigation). Old roles still accessible by direct URL. */
const ACTIVE_SLUGS = ['receptionist', 'growth', 'creator'] as const;

/** Look up a role by slug. Returns undefined if not found. */
export function getRoleBySlug(slug: string): RoleConfig | undefined {
  return ROLES.find(r => r.slug === slug);
}

/** Get next ACTIVE role. Skips deprecated roles (analyst, sales). */
export function getNextRole(slug: string): RoleConfig | null {
  const activeRoles = ROLES.filter(r => ACTIVE_SLUGS.includes(r.slug as typeof ACTIVE_SLUGS[number]));
  const idx = activeRoles.findIndex(r => r.slug === slug);
  if (idx === -1 || idx >= activeRoles.length - 1) return null;
  return activeRoles[idx + 1];
}

/** Get previous ACTIVE role. Skips deprecated roles. */
export function getPrevRole(slug: string): RoleConfig | null {
  const activeRoles = ROLES.filter(r => ACTIVE_SLUGS.includes(r.slug as typeof ACTIVE_SLUGS[number]));
  const idx = activeRoles.findIndex(r => r.slug === slug);
  if (idx <= 0) return null;
  return activeRoles[idx - 1];
}
