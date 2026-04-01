import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { assetUrl } from "@/lib/asset-url";

const ARTICLE = {
  title: "AI-сотрудник для бизнеса: кейсы с ROI и внедрение за 3 дня",
  description:
    "Кейсы внедрения AI-сотрудника с расчётом ROI. Как выбрать решение, избежать ошибок и запустить без разработчика за 3 дня.",
  slug: "ai-sotrudnik-kejsy-vnedrenie",
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  ogImage: "https://famteam.ru/blog/images/vis1-hero-kejsy.webp",
  url: "https://famteam.ru/blog/ai-sotrudnik-kejsy-vnedrenie",
  wordCount: 2800,
  readingTime: "12 мин",
};

const COMPARISON_ROWS = [
  {
    criterion: "Скорость запуска",
    constructor: "1 день",
    freelance: "2–3 месяца",
    ready: "2–4 недели",
  },
  {
    criterion: "Качество диалогов",
    constructor: "Низкое (FAQ-только)",
    freelance: "Зависит от уровня",
    ready: "Высокое (AI)",
  },
  {
    criterion: "Поддержка",
    constructor: "Есть, но ограниченная",
    freelance: "Платная (разработчик)",
    ready: "Включена 24/7",
  },
  {
    criterion: "Гибкость",
    constructor: "Высокая, но в рамках платформы",
    freelance: "Полная, но сложно менять",
    ready: "Высокая, легко масштабировать",
  },
  {
    criterion: "Прозрачность ROI",
    constructor: "Нет",
    freelance: "Неясна",
    ready: "Высокая (можно посчитать)",
  },
  {
    criterion: "Риск фиаско",
    constructor: "Низкий (просто не работает)",
    freelance: "Высокий (может не работать вообще)",
    ready: "Низкий (есть гарантия результата)",
  },
  {
    criterion: "Скрытые затраты",
    constructor: "2–5 ч/месяц на обновления",
    freelance: "$500+ за правки",
    ready: "Минимальны",
  },
  {
    criterion: "Кто отвечает за результат",
    constructor: "Никто (ваша ответственность)",
    freelance: "Разработчик (может быть недоступен)",
    ready: "Поставщик решения",
  },
];

const AiSotrudnikKejsyVnedrenie = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ARTICLE.title,
    description: ARTICLE.description,
    image: ARTICLE.ogImage,
    datePublished: ARTICLE.datePublished,
    dateModified: ARTICLE.dateModified,
    url: ARTICLE.url,
    wordCount: ARTICLE.wordCount,
    inLanguage: "ru",
    author: {
      "@type": "Organization",
      name: "FamTeam",
      url: "https://famteam.ru",
    },
    publisher: {
      "@type": "Organization",
      name: "FamTeam",
      url: "https://famteam.ru",
      logo: {
        "@type": "ImageObject",
        url: "https://famteam.ru/images/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": ARTICLE.url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "FamTeam",
        item: "https://famteam.ru",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Блог",
        item: "https://famteam.ru/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ARTICLE.title,
        item: ARTICLE.url,
      },
    ],
  };

  return (
    <div className="blog-page">
      <Helmet>
        <title>{`${ARTICLE.title} | FamTeam`}</title>
        <meta name="description" content={ARTICLE.description} />
        <link rel="canonical" href={ARTICLE.url} />

        <meta property="og:title" content={ARTICLE.title} />
        <meta property="og:description" content={ARTICLE.description} />
        <meta property="og:url" content={ARTICLE.url} />
        <meta property="og:image" content={ARTICLE.ogImage} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="FamTeam" />
        <meta
          property="article:published_time"
          content={ARTICLE.datePublished}
        />
        <meta
          property="article:modified_time"
          content={ARTICLE.dateModified}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ARTICLE.title} />
        <meta name="twitter:description" content={ARTICLE.description} />
        <meta name="twitter:image" content={ARTICLE.ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Header />

      <article className="blog-article">
        {/* Breadcrumbs */}
        <nav className="blog-breadcrumbs" aria-label="Breadcrumbs">
          <Link to="/">FamTeam</Link>
          <span className="blog-breadcrumbs__sep">/</span>
          <Link to="/blog">Блог</Link>
          <span className="blog-breadcrumbs__sep">/</span>
          <span>Кейсы с ROI и внедрение</span>
        </nav>

        {/* Hero */}
        <header className="blog-hero">
          <div className="blog-meta">
            <time dateTime={ARTICLE.datePublished}>1 апреля 2026</time>
            <span className="blog-meta__dot" />
            <span>{ARTICLE.readingTime}</span>
          </div>
          <h1 className="blog-title">{ARTICLE.title}</h1>
          <p className="blog-subtitle">{ARTICLE.description}</p>
        </header>

        <img
          className="blog-hero-img"
          src={assetUrl("/blog/images/vis1-hero-kejsy.webp")}
          alt="AI-сотрудник для бизнеса — кейсы внедрения с расчётом ROI"
          width={1200}
          height={630}
          loading="eager"
        />

        {/* Content */}
        <div className="blog-content">
          <p>
            В{" "}
            <Link to="/blog/chat-bot-vs-ai-sotrudnik">
              предыдущей статье
            </Link>{" "}
            мы разобрали разницу между обычным чат-ботом и AI-сотрудником.
            Теперь — конкретика: реальные кейсы, расчёт ROI и пошаговый план
            внедрения.
          </p>

          {/* Section 1 */}
          <h2>1. Реальные кейсы с цифрами (конверсия, заявки, экономия)</h2>

          <h3>Кейс 1: Салон &laquo;Нежность&raquo; (Москва, 6 мастеров)</h3>

          <p><strong>Было:</strong></p>
          <ul>
            <li>120 запросов в месяц через Telegram</li>
            <li>45 заявок теряли (администратор не успевает или спит)</li>
            <li>Конверсия: 37%</li>
          </ul>

          <p>
            <strong>Внедрили</strong> AI-сотрудника на основе их данных
            (расписание, услуги, цены).
          </p>

          <p><strong>Стало за месяц:</strong></p>
          <ul>
            <li>115 запросов &rarr; 110 записалось (95% конверсия!)</li>
            <li>
              Администратор теперь помогает только с переносами и жалобами (20%
              от всех диалогов)
            </li>
            <li>
              Выручка выросла на 18% (новые клиенты в те окна, которые раньше
              пропускали)
            </li>
            <li>Стоимость: $600/месяц</li>
          </ul>

          <div className="blog-callout">
            <p className="blog-callout__label">Результат</p>
            <p>Срок окупаемости: 2 недели</p>
          </div>

          <h3>
            Кейс 2: Стоматология &laquo;Улыбка&raquo; (СПб, 3 врача)
          </h3>

          <p><strong>Было:</strong></p>
          <ul>
            <li>150 звонков в месяц</li>
            <li>35% не дозвониваются и уходят к конкурентам</li>
            <li>Телефонистка на &laquo;полставки&raquo;</li>
          </ul>

          <p>
            <strong>Внедрили</strong> AI-сотрудника, который отвечает на 70%
            вопросов без участия врача.
          </p>

          <p><strong>Стало:</strong></p>
          <ul>
            <li>
              +40% новых клиентов (потому что люди больше не боятся звонить.
              Они пишут)
            </li>
            <li>
              Телефонистка сосредоточилась на сложных случаях и жалобах
            </li>
            <li>
              Врач видит только горячие заявки, экономит 3 часа в день
            </li>
            <li>Стоимость: $1200/месяц</li>
          </ul>

          <div className="blog-callout">
            <p className="blog-callout__label">Результат</p>
            <p>Срок окупаемости: 3 недели</p>
          </div>

          <h3>
            Кейс 3: Онлайн-школа &laquo;Английский с нуля&raquo;
            (дистанционно)
          </h3>

          <p><strong>Было:</strong></p>
          <ul>
            <li>300 заявок в месяц</li>
            <li>Конверсия в покупку: 8%</li>
            <li>Менеджер отвечает на вопросы 6 часов в день</li>
          </ul>

          <p>
            <strong>Внедрили</strong> AI-сотрудника с FAQ и сценариями
            возражений.
          </p>

          <p><strong>Стало:</strong></p>
          <ul>
            <li>Конверсия выросла на 40% &rarr; 11,2%</li>
            <li>
              Менеджер теперь готовит материалы вместо переписки
            </li>
            <li>+300 студентов в месяц = +$12,000 выручки</li>
            <li>Стоимость: $900/месяц</li>
          </ul>

          <div className="blog-callout">
            <p className="blog-callout__label">Результат</p>
            <p>Срок окупаемости: 2.5 дня (!)</p>
          </div>

          <img
            className="blog-img"
            src={assetUrl("/blog/images/vis2-kejsy-roi.webp")}
            alt="Сравнение трёх кейсов внедрения AI-сотрудника: конверсия, стоимость, окупаемость"
            width={1200}
            height={630}
            loading="lazy"
          />

          {/* Section 2 */}
          <h2>2. Как выбрать: конструктор, фриланс или готовое решение</h2>

          <p>
            От выбора зависит ROI, скорость запуска и головная боль через
            полгода.
          </p>

          <h3>Вариант 1: Конструктор (Chatbot.com, Landbot, Tildabot)</h3>

          <p><strong>Подходит если:</strong></p>
          <ul className="blog-list--check">
            <li>Нужен FAQ-бот за 100 слов</li>
            <li>Бюджет $0–200/месяц</li>
            <li>Готовы 1–2 раза в месяц обновлять ответы</li>
          </ul>

          <p><strong>Не подходит если:</strong></p>
          <ul className="blog-list--cross">
            <li>Нужна персонализация и переговоры</li>
            <li>Хотите ROI, а не галочку в списке инструментов</li>
            <li>У вас больше 30 вопросов в день через чат</li>
          </ul>

          <div className="blog-callout">
            <p className="blog-callout__label">Реальный пример</p>
            <p>
              Компания внедрила Chatbot.com, первый месяц все довольны. На
              второй месяц пришли клиенты, которые спросили не то, что
              предусмотрено в FAQ. Бот вернулся к &laquo;пожалуйста, свяжитесь с
              менеджером&raquo;. Конверсия упала на 15% по сравнению с месяцем,
              когда бота не было.
            </p>
          </div>

          <p>
            <strong>Стоимость:</strong> $0–200/месяц.{" "}
            <strong>Скрытые затраты:</strong> 2–5 часов в месяц на обновление
            ответов.
          </p>

          <h3>Вариант 2: Фриланс-разработчик</h3>

          <p><strong>Подходит если:</strong></p>
          <ul className="blog-list--check">
            <li>Есть $3000–5000 на разработку</li>
            <li>Готовы ждать 2–3 месяца</li>
            <li>
              Нужен нестандартный сценарий (интеграция с экзотической системой)
            </li>
          </ul>

          <p><strong>Не подходит если:</strong></p>
          <ul className="blog-list--cross">
            <li>Нужна поддержка после запуска</li>
            <li>Разработчик тарифицирует правки как новые услуги</li>
            <li>Хотите масштабировать без переписания кода</li>
          </ul>

          <div className="blog-callout">
            <p className="blog-callout__label">Реальный риск</p>
            <p>
              Разработчик создал хороший бот. На втором месяце нужно добавить 5
              новых услуг в прайс. Разработчик просит $500. Вы можете сделать это
              сами? Нет, потому что код в его голове. Вы платите.
            </p>
          </div>

          <p>
            <strong>Стоимость:</strong> $3000–5000 за разработку + $200–500/месяц
            поддержка.
          </p>

          <h3>Вариант 3: Готовое решение с AI</h3>

          <p><strong>Подходит если:</strong></p>
          <ul className="blog-list--check">
            <li>Хотите работающее решение за 2–4 недели</li>
            <li>Нужна поддержка и обновления</li>
            <li>Важен ROI, а не DIY опыт</li>
            <li>
              Хотите, чтобы бот улучшался сам по мере использования
            </li>
          </ul>

          <p>
            <strong>Реальное преимущество:</strong> вы загружаете прайс
            &laquo;салон красоты&raquo;, и бот понимает контекст (расписание,
            услуги, мастера). Для клиники загружаете другие данные. Бот
            переучится за 3 дня. Это не переделка кода, это работа с данными.
          </p>

          <p>
            <strong>Стоимость:</strong> $600–2000/месяц (обычно $900/месяц для
            салонов и клиник).
          </p>

          <h3>Быстрый расчёт ROI</h3>

          <p>Если вы получаете:</p>
          <ul>
            <li>
              <strong>50 заявок в день</strong> = 1500 в месяц
            </li>
            <li>
              <strong>30% теряются</strong> (нет ответа, ответили поздно) = 450
              потерянных заявок
            </li>
            <li>
              <strong>Средняя стоимость услуги</strong> $80
            </li>
            <li>
              <strong>450 × $80</strong> = $36,000 в месяц теряется
            </li>
          </ul>

          <p>
            Если AI-бот спасёт даже <strong>10% потерянных</strong> = 45 заявок ×
            $80 = $3,600 в месяц дополнительных. Стоимость бота: $900/месяц.
          </p>

          <div className="blog-callout">
            <p className="blog-callout__label">Чистая прибыль</p>
            <p>
              $3,600 − $900 = <strong>$2,700/месяц</strong>. Окупаемость —
              неделя.
            </p>
          </div>

          <img
            className="blog-img"
            src={assetUrl("/blog/images/vis4-roi-kalkulyator.webp")}
            alt="Расчёт ROI AI-сотрудника: от 50 заявок в день до $2700 чистой прибыли в месяц"
            width={1200}
            height={630}
            loading="lazy"
          />

          <div className="blog-table-wrap">
            <table className="blog-table">
              <thead>
                <tr>
                  <th>Критерий</th>
                  <th>Конструктор</th>
                  <th>Фриланс</th>
                  <th>Готовое решение</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td className="blog-table__aspect">{row.criterion}</td>
                    <td className="blog-table__bot">{row.constructor}</td>
                    <td>{row.freelance}</td>
                    <td className="blog-table__ai">{row.ready}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p><strong>Рекомендация:</strong></p>
          <ul>
            <li>
              <strong>Салон, клиника, школа (до 100 заявок/день):</strong>{" "}
              готовое решение
            </li>
            <li>
              <strong>Крупная сеть (100+ заявок/день):</strong> готовое решение +
              разработчик для интеграций
            </li>
            <li>
              <strong>Уникальный бизнес:</strong> разработчик, но только если вы
              готовы к рискам
            </li>
          </ul>

          <p>
            <strong>Вердикт:</strong> 90% бизнесов выбирают готовое решение и
            остаются довольны. 8% выбирают фриланса и потом жалеют. 2% нужен
            конструктор для простых задач.
          </p>

          {/* Section 3 */}
          <h2>3. Внедрение без разработчика: что нужно знать</h2>

          <p>
            Даже если вы выберете готовое решение, нужно подготовить данные. Это
            80% успеха.
          </p>

          <p>
            Многие клиенты думают: &laquo;Куплю готовое решение за $1000/месяц,
            загружу названия услуг и готово&raquo;. Результат: бот отвечает, но
            клиенты уходят, потому что бот не знает, как вы работаете.
          </p>

          <p>
            AI-сотрудник учится на ваших данных. Если вы дали ему только
            прайс-лист без описания, расписание без привязки к мастерам и FAQ из
            интернета — он будет давать &laquo;средние&raquo; ответы. Люди
            фиксируют это на рефлекторном уровне: &laquo;Ощущение, что говорит
            робот&raquo;.
          </p>

          <p>
            <strong>Правильный подход:</strong> потратьте 3–5 дней на подготовку.
            Бот будет отвечать, как ваш реальный менеджер.
          </p>

          <h3>Чек-лист подготовки (1–2 недели)</h3>

          <p><strong>1. Расписание и доступность</strong></p>
          <ul>
            <li>Расписание работы, выходные, перерывы</li>
            <li>Доступные окна сейчас и на месяц вперёд</li>
            <li>Форматы: Google Sheets или загрузить в систему</li>
          </ul>

          <p><strong>2. Прайс и услуги</strong></p>
          <ul>
            <li>Полный прайс-лист с описанием</li>
            <li>Кто выполняет каждую услугу</li>
            <li>Варианты оплаты: наличные, карта, рассрочка</li>
          </ul>

          <p><strong>3. FAQ и частые возражения</strong></p>
          <ul>
            <li>
              20–30 вопросов, которые вы слышите чаще всего (включая
              &laquo;странные&raquo; вопросы)
            </li>
            <li>Ответы в стиле вашего бизнеса</li>
            <li>Ссылки и документы к ответам</li>
          </ul>

          <div className="blog-callout">
            <p className="blog-callout__label">Совет</p>
            <p>
              Попросите менеджеров выписать вопросы из последних 100 чатов.
              Нудно, но это самые реальные вопросы вашей аудитории.
            </p>
          </div>

          <p><strong>4. Интеграции</strong></p>
          <ul>
            <li>
              <strong>CRM</strong> (куда сохранять заявки): Битрикс24, AmoCRM,
              Google Sheets, Телеграм-чат
            </li>
            <li>
              <strong>Платежи:</strong> Яндекс.Касса, Сбербанк, Wave
            </li>
            <li>
              <strong>Календари:</strong> 1С, Google Calendar, своё ПО
            </li>
            <li>
              <strong>Email:</strong> для отправки счётов, подтверждений,
              материалов курса
            </li>
          </ul>

          <p><strong>5. Тон голоса и примеры диалогов</strong></p>
          <ul>
            <li>
              Как вы говорите с клиентом: &laquo;вы&raquo; или &laquo;ты&raquo;,
              с юмором или официально
            </li>
            <li>5–10 примеров диалогов, которые показывают ваш стиль</li>
          </ul>

          <p><strong>Сроки:</strong></p>
          <ul>
            <li>Подготовка данных: 1–2 недели</li>
            <li>Обучение AI на ваших данных: 3–5 дней</li>
            <li>Тестирование: 3–5 дней</li>
            <li>Правки: 3–7 дней</li>
          </ul>

          <p>
            <strong>Итого:</strong> 2–4 недели от &laquo;я хочу&raquo; до
            &laquo;работает&raquo;. Без разработчика.
          </p>

          <img
            className="blog-img"
            src={assetUrl("/blog/images/vis5-cheklist-podgotovki.webp")}
            alt="Чек-лист подготовки данных для AI-сотрудника: 5 шагов за 2-4 недели"
            width={1200}
            height={630}
            loading="lazy"
          />

          <h3>Что происходит после запуска</h3>

          <p>
            <strong>Первый день:</strong> бот работает. Клиенты пишут, бот
            отвечает.
          </p>
          <p>
            <strong>Первый день (вечер):</strong> вы смотрите чат-логи и видите:
            &laquo;Бот ответил правильно в 85% случаев&raquo;. Хорошо.
          </p>
          <p>
            <strong>Вторая неделя:</strong> вы видите, что бот ответил
            неправильно в одном типе вопросов. Вы даёте системе дополнительную
            информацию. Она переучивается за ночь.
          </p>
          <p>
            <strong>Третья неделя:</strong> конверсия выросла на 20%. Менеджер
            говорит: &laquo;Спасибо! Я вижу только горячие заявки, остальное бот
            решает&raquo;.
          </p>
          <p>
            <strong>Четвёртая неделя:</strong> вы смотрите на ROI и понимаете,
            что окупилось. 20 потерянных заявок в месяц × $50–100 = $1000–2000
            спасено. Плата за бота $600–900.
          </p>

          <p>Это похоже на найм сотрудника, но:</p>
          <ul>
            <li>Стоит в 3 раза дешевле</li>
            <li>Не берёт отпуск</li>
            <li>Не устаёт в конце дня</li>
            <li>Улучшается автоматически</li>
          </ul>

          {/* Section 4 */}
          <h2>
            4. Частые ошибки при запуске чат-бота (и как их избежать)
          </h2>

          <h3>
            Ошибка 1: Начать с конструктора, думая, что это сэкономит
          </h3>
          <p>
            Экономит на первый месяц. Потом тратите в 3 раза больше на ручную
            доработку.
          </p>
          <p>
            <strong>Правильно:</strong> оценить объём заявок. Если &gt; 50 в
            день, берите готовое решение или разработчика.
          </p>

          <h3>Ошибка 2: Не обновлять данные в боте</h3>
          <p>
            Клиент видит &laquo;свободные окна в пятницу&raquo;, а в пятницу
            мастер не работает.
          </p>
          <p>
            <strong>Правильно:</strong> настроить автоматическую синхронизацию
            расписания или договориться об обновлениях раз в неделю.
          </p>

          <h3>Ошибка 3: Бот отвечает, но никто не записывается</h3>
          <p>
            Бот отвечает неправильно или диалог ведёт в тупик. Типичный знак: бот
            отвечает на первый вопрос хорошо, клиент переходит на второе
            сообщение — &laquo;Пожалуйста, свяжитесь с менеджером&raquo;. Клиент
            закрывает чат.
          </p>
          <p>
            <strong>Правильно:</strong> слушать чат-логи (первые 50 диалогов),
            находить моменты, где клиент уходит.
          </p>

          <h3>Ошибка 4: Ждать идеального бота перед запуском</h3>
          <p>
            Идеального не будет. Лучше запустить &laquo;70% готовый&raquo; и
            улучшать по реальным диалогам, чем ждать совершенства.
          </p>

          <h3>Ошибка 5: Думать, что бот заменит менеджера</h3>
          <p>
            Не заменит. Но освободит 70% времени менеджера на сложные случаи и
            выстраивание отношений.
          </p>

          <h3>Ошибка 6: Не читать чат-логи в первый месяц</h3>
          <p>
            Бот может работать, но работать неправильно. Вы этого не видите,
            потому что не читаете логи.
          </p>
          <p>
            <strong>Правильно:</strong> первый месяц читайте 20 диалогов в
            неделю (это 1 час). После месяца можно автоматизировать.
          </p>

          {/* Section 5 */}
          <h2>5. Вывод: что выбрать и когда начать</h2>

          <p>
            <strong>Если у вас:</strong> 20–50 заявок в день, малый сервисный
            бизнес (салон, клиника, фитнес, школа)
          </p>
          <p>
            <strong>Лучший выбор:</strong> AI-сотрудник (готовое решение)
          </p>
          <p>
            <strong>Окупаемость:</strong> 2–4 недели
          </p>
          <p>
            <strong>Результат:</strong> −35% потерь заявок, +18–40% конверсии,
            менеджер ценит освобождённое время
          </p>

          <p>
            Каждая потеря заявки — это потеря прибыли, которую вы не можете
            себе позволить. Чат-бот за $600/месяц окупается за 1–3 недели:
          </p>

          <ol>
            <li>
              <strong>Экономия на менеджере:</strong> не нужно нанимать
              дополнительно
            </li>
            <li>
              <strong>Прибыль от потерянных заявок:</strong> 40 потерянных заявок
              × $100 средний чек = $4000 в месяц вернули вы
            </li>
            <li>
              <strong>Улучшение репутации:</strong> клиент получил быстрый ответ
              вместо &laquo;позвоните завтра&raquo;
            </li>
          </ol>

          <p>
            <strong>Правило:</strong> если у вас есть чат в Telegram, WhatsApp
            или Instagram, начните с AI-сотрудника. Если нет, сначала откройте
            чат, потом подключите бота.
          </p>

          <p>
            <strong>Читайте также:</strong>{" "}
            <Link to="/blog/chat-bot-vs-ai-sotrudnik">
              Чат-бот vs AI-сотрудник: в чём разница
            </Link>
          </p>

          {/* CTA */}
          <div className="blog-cta">
            <img
              className="blog-img"
              src={assetUrl("/blog/images/vis7-cta.webp")}
              alt="Записаться на бесплатную консультацию по внедрению AI-сотрудника"
              width={1200}
              height={630}
              loading="lazy"
              style={{ marginBottom: "1.5rem" }}
            />
            <p>
              <strong>
                AI-сотрудник для вашего бизнеса за 2–4 недели
              </strong>
            </p>
            <ul>
              <li>Оценим ваш поток заявок</li>
              <li>Покажем кейс из вашей ниши</li>
              <li>Рассчитаем ROI для вашего бизнеса</li>
              <li>Расскажем план запуска без разработчика</li>
            </ul>
            <a href="/contact" className="blog-cta__btn">
              Бесплатная консультация 15 минут
            </a>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="site-footer" style={{ marginTop: "auto" }}>
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <Link
              to="/"
              className="site-footer__logo"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              FAM<span className="text-brand-accent">TEAM</span>
            </Link>
            <span className="site-footer__tagline">
              AI-сотрудники, которые приносят заявки
            </span>
          </div>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <Link to="/" className="site-footer__link">
              Главная
            </Link>
            <Link to="/blog" className="site-footer__link">
              Блог
            </Link>
            <Link to="/contact" className="site-footer__link">
              Контакты
            </Link>
          </nav>
        </div>
        <div className="site-footer__copy">FamTeam &copy; 2025</div>
      </footer>
    </div>
  );
};

export default AiSotrudnikKejsyVnedrenie;
