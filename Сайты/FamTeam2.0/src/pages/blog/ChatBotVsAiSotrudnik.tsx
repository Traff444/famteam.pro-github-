import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { assetUrl } from "@/lib/asset-url";

const ARTICLE = {
  title: "Чат-бот vs AI-сотрудник: в чём разница для салона, клиники и школы",
  description:
    "Сравнение чат-бота и AI-сотрудника для салонов, клиник и онлайн-школ. Таблица отличий, примеры диалогов и ROI по нишам.",
  slug: "chat-bot-vs-ai-sotrudnik",
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  ogImage: "https://famteam.ru/blog/images/vis1-hero-bot-vs-ai.webp",
  url: "https://famteam.ru/blog/chat-bot-vs-ai-sotrudnik",
  wordCount: 1800,
  readingTime: "8 мин",
};

const COMPARISON_ROWS = [
  {
    aspect: "Как работает",
    bot: "Сравнивает текст клиента с базой ключевых слов",
    ai: "Понимает смысл и контекст",
  },
  {
    aspect: "Может ответить, если клиент спросил не точно",
    bot: "Нет (вернёт \"Не понял\")",
    ai: "Да (разберётся с опечатками, синонимами, контекстом)",
  },
  {
    aspect: "Может вести переговоры",
    bot: "Только по готовому сценарию",
    ai: "Может спорить, убеждать, находить компромисс",
  },
  {
    aspect: "Помнит историю с клиентом",
    bot: "Если вручную сохранили в CRM",
    ai: "Да, вспомнит прошлые разговоры и подстроится",
  },
  {
    aspect: "Может заказать доставку / записать в календарь",
    bot: "Только если есть интеграция",
    ai: "Да, самостоятельно",
  },
  {
    aspect: "Стоимость внедрения",
    bot: "$0\u2013500 в месяц",
    ai: "$500\u20133000 в месяц",
  },
  {
    aspect: "Время внедрения",
    bot: "1 день (шаблон)",
    ai: "2\u20134 недели (обучение на ваших данных)",
  },
  {
    aspect: "Качество диалога после 1 месяца",
    bot: "Не меняется",
    ai: "Улучшается с каждым диалогом",
  },
];

const ChatBotVsAiSotrudnik = () => {
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
          <span>Чат-бот vs AI-сотрудник</span>
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
          src={assetUrl("/blog/images/vis1-hero-bot-vs-ai.webp")}
          alt="Обложка: обычный чат-бот с шаблонной ссылкой vs AI-сотрудник с персональным ответом клиенту"
          width={1200}
          height={630}
          loading="eager"
        />

        {/* Content */}
        <div className="blog-content">
          {/* Section 1 */}
          <h2>1. Зачем бизнесу чат-бот в 2026: цифры и реальность</h2>

          <p>
            Клиент ожидает ответа за 5 минут. Автоответчик в Telegram или
            WhatsApp стал базовым инструментом для любого бизнеса.
          </p>

          <p>
            <strong>Цифры:</strong>
          </p>
          <ul>
            <li>
              80% клиентов предпочитают писать в мессенджер, чем звонить
            </li>
            <li>
              Компании, использующие автоответчики, теряют на 20% меньше заявок
            </li>
            <li>
              Время ответа на запрос влияет на конверсию сильнее, чем цена. Если
              вы ответили в течение часа, конверсия в 7 раз выше, чем если
              ответили через день
            </li>
            <li>
              В 2024-2026 году 35% клиентов предпочитают{" "}
              <strong>не общаться с человеком</strong> до первого контакта в
              офис/кабинет. Они хотят решить свой вопрос через бота
            </li>
          </ul>

          <p>
            Конкуренты уже внедрили базовый чат-бот. Если у вас его нет, вы
            проигрываете. Если есть только обычный бот, вы теряете 40% клиентов
            на том же этапе, где конкурент с AI-сотрудником переводит их в
            заявку.
          </p>

          <div className="blog-callout">
            <p className="blog-callout__label">Реальная история</p>
            <p>
              Две клиники в одном районе. У первой — обычный Telegram-бот с FAQ.
              У второй — AI-сотрудник. Обе получают 150 новых запросов в месяц.
              Первая закрывает 37% — 55 пациентов. Вторая закрывает 65% — 97
              пациентов. Разница в $4,500 в месяц прибыли (при средней стоимости
              услуги $80).
            </p>
          </div>

          <p>
            Чат-боты, которые продают конструкторы (Chatbot.com, Landbot,
            Tildabot), справляются только с простыми сценариями. Они хороши для
            FAQ и первичной сортировки, но ломаются уже на втором вопросе
            клиента.
          </p>

          <div className="blog-dialog">
            <p className="blog-dialog__label">Реальный диалог с обычным ботом</p>
            <div className="blog-dialog__line">
              <span className="blog-dialog__who">Клиент:</span> Как записаться
              на маникюр?
            </div>
            <div className="blog-dialog__line">
              <span className="blog-dialog__who blog-dialog__who--bot">
                Бот:
              </span>{" "}
              Перейдите по ссылке https://...
            </div>
            <div className="blog-dialog__line">
              <span className="blog-dialog__who">Клиент:</span> А в субботу
              есть свободные слоты в 14:00?
            </div>
            <div className="blog-dialog__line">
              <span className="blog-dialog__who blog-dialog__who--bot">
                Бот:
              </span>{" "}
              Перейдите по ссылке https://...
            </div>
            <div className="blog-dialog__line blog-dialog__line--lost">
              <span className="blog-dialog__who">Клиент:</span>{" "}
              <em>в это время звонит конкуренту</em>
            </div>
          </div>

          <p>
            Заявка потеряна, потому что бот не понял контекст. Технически бот
            правильный. Бизнесу он не помогает.
          </p>

          <img
            className="blog-img"
            src={assetUrl("/blog/images/vis2-data-4-stats.webp")}
            alt="Статистика: 80% клиентов предпочитают мессенджер, ответ в течение часа даёт 7-кратный рост конверсии, разница в прибыли — $4,500/мес"
            width={1200}
            height={630}
            loading="lazy"
          />

          {/* Section 2 */}
          <h2>2. Что умеет обычный чат-бот (и где он ломается)</h2>

          <p>
            <strong>Чат-бот из конструктора — это шаблонный ответчик.</strong>{" "}
            Можно сравнить с автоответчиком на телефоне: &laquo;Отделение
            работает с 9 до 18&raquo;. Точно, но бесполезно, если ты звонишь в
            9:05 и тебе нужен именно Иван Иванович.
          </p>

          <p>Он может:</p>
          <ul className="blog-list--check">
            <li>Распознать ключевые слова (&laquo;маникюр&raquo;, &laquo;запись&raquo;, &laquo;цена&raquo;)</li>
            <li>Вернуть готовый ответ из базы знаний</li>
            <li>Переформатировать текст (заглавные буквы, смайлики)</li>
            <li>Отправить ссылку на форму или оставить заявку в Excel</li>
          </ul>

          <p>
            <strong>НЕ может:</strong>
          </p>
          <ul className="blog-list--cross">
            <li>
              Понять, что клиент спрашивает о наличии свободных мест в субботу
              именно потому, что ему важен выходной день
            </li>
            <li>
              Самостоятельно проверить расписание и предложить альтернативный
              день
            </li>
            <li>
              Вести переговоры, если клиент просит скидку или есть жалоба
            </li>
            <li>
              Запомнить, что клиент уже писал месяц назад и забыл прийти, и
              осторожнее начать разговор
            </li>
          </ul>

          <p>
            <strong>Результат:</strong> 40% диалогов с обычным ботом
            заканчиваются сообщением &laquo;Пожалуйста, свяжитесь с менеджером
            по номеру...&raquo; Клиент вернулся туда же, откуда начинал.
          </p>

          {/* Section 3 */}
          <h2>3. AI-сотрудник vs чат-бот: в чём принципиальная разница</h2>

          <p>
            <strong>
              AI-сотрудник — это нейросеть, которая учится на вашем бизнесе и
              ведёт себя как реальный человек.
            </strong>
          </p>

          <div className="blog-table-wrap">
            <table className="blog-table">
              <thead>
                <tr>
                  <th>Аспект</th>
                  <th>Обычный чат-бот</th>
                  <th>AI-сотрудник</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td className="blog-table__aspect">{row.aspect}</td>
                    <td className="blog-table__bot">{row.bot}</td>
                    <td className="blog-table__ai">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            <strong>Главное отличие:</strong> обычный бот отвечает по скрипту,
            AI-сотрудник решает задачу клиента.
          </p>

          <img
            className="blog-img"
            src={assetUrl("/blog/images/vis3-comparison-table.webp")}
            alt="Сравнительная таблица: обычный чат-бот vs AI-сотрудник по 8 параметрам — от способа работы до стоимости"
            width={1200}
            height={630}
            loading="lazy"
          />

          <h3>Как это работает на практике</h3>

          <div className="blog-comparison">
            <div className="blog-comparison__col blog-comparison__col--bot">
              <p className="blog-comparison__label">Обычный бот</p>
              <p>
                Входные данные: название услуги, цена, краткое описание.
                <br />
                Алгоритм: если клиент написал [ключевое слово], вернуть [готовый
                ответ].
                <br />
                Результат: клиент получает ответ за 0.5 секунды, но часто не
                подходит по контексту.
              </p>
            </div>
            <div className="blog-comparison__col blog-comparison__col--ai">
              <p className="blog-comparison__label">AI-сотрудник</p>
              <p>
                Входные данные: прайс-лист, расписание, примеры диалогов, тон
                голоса, 30 FAQ, история клиента.
                <br />
                Алгоритм: большая языковая модель анализирует текст клиента,
                понимает <strong>намерение</strong>, вспоминает релевантные
                данные, генерирует ответ в стиле вашего бизнеса.
                <br />
                Результат: клиент получает персональный ответ за 3-5 секунд,
                который решает его задачу или предлагает альтернативу.
              </p>
            </div>
          </div>

          <h3>Пример разницы</h3>

          <p>
            Клиент пишет: &laquo;у вас есть пилинг? мне надо за выходные
            подготовиться к свадьбе&raquo;
          </p>

          <div className="blog-comparison">
            <div className="blog-comparison__col blog-comparison__col--bot">
              <p className="blog-comparison__label">Обычный бот</p>
              <p>
                &laquo;Да, у нас есть пилинг. Выезд услуги: https://...&raquo;
              </p>
            </div>
            <div className="blog-comparison__col blog-comparison__col--ai">
              <p className="blog-comparison__label">AI-сотрудник</p>
              <p>
                &laquo;Поздравляю с предстоящей свадьбой! Да, пилинг есть. За
                выходные? Если это суббота, рекомендую приходить в пятницу
                вечером. Выходного дня хватит на заживление. Пилинг занимает 45
                минут, стоит 2000р. Свободны: сегодня 18:00, завтра 10:00 и
                15:00. Какой удобнее?&raquo;
              </p>
            </div>
          </div>

          <p>
            Первый ответ дал информацию. Второй решил задачу клиента. Конверсия
            растёт на 30-40%.
          </p>

          <img
            className="blog-img"
            src={assetUrl("/blog/images/vis4-dialogs-peeling.webp")}
            alt="Сравнение диалогов: обычный бот даёт ссылку, AI-сотрудник поздравляет со свадьбой, рекомендует день и предлагает слоты"
            width={1200}
            height={630}
            loading="lazy"
          />

          <img
            className="blog-img"
            src={assetUrl("/blog/images/vis5-niches-roi.webp")}
            alt="Четыре ниши для AI-сотрудника: салоны +35-45%, клиники +25%, школы +40%, фитнес — очередь в 3 раза меньше"
            width={1200}
            height={630}
            loading="lazy"
          />

          {/* Section 4 */}
          <h2>4. Применение по нишам: где AI-сотрудник окупается за месяц</h2>

          <h3>Салоны красоты и спа</h3>
          <p>
            <strong>Проблема:</strong> запись в расписание, уточнение услуг,
            переносы в последний момент.
          </p>
          <p>
            <strong>Реальные вопросы, которые теряют заявки:</strong>
          </p>
          <ul>
            <li>
              &laquo;Я хочу стрижку, как у Ани, но покороче. Это долго?&raquo;
            </li>
            <li>
              &laquo;А можно завтра в 14:00? Нет? А в 16?&raquo;
            </li>
            <li>
              &laquo;Это больно? Это долго? Это дорого?&raquo; (три разных
              вопроса в одном сообщении)
            </li>
          </ul>
          <p>
            <strong>ROI:</strong> сокращение потерь заявок на 35-45%, без найма
            дополнительного администратора.
          </p>

          <h3>Клиники и стоматологии</h3>
          <p>
            <strong>Проблема:</strong> люди боятся звонить, стесняются спрашивать
            деликатные вопросы, ищут отзывы о враче.
          </p>
          <p>
            <strong>Реальные вопросы:</strong>
          </p>
          <ul>
            <li>&laquo;Это больно? Под наркозом?&raquo;</li>
            <li>&laquo;Сколько это стоит?&raquo;</li>
            <li>
              &laquo;Я записывался год назад и не пришёл, примут ли меня?&raquo;
            </li>
          </ul>
          <p>
            Врачи подтверждают: такие сообщения приходят регулярно. Люди
            стесняются звонить.
          </p>
          <p>
            <strong>ROI:</strong> +25% первичных приёмов, меньше &laquo;отказов в
            боязни&raquo;.
          </p>

          <h3>Онлайн-школы и курсы</h3>
          <p>
            <strong>Проблема:</strong> много вопросов &laquo;А это для
            меня?&raquo;, &laquo;Есть гарантия?&raquo;, &laquo;Какие
            платежи?&raquo;
          </p>
          <p>
            Специфика: люди не платят наугад. Они хотят быть{" "}
            <strong>уверены</strong>, что курс для их уровня.
          </p>
          <p>
            <strong>ROI:</strong> +40% конверсии на покупку, 80% вопросов
            решаются без менеджера.
          </p>

          <h3>Фитнес-центры</h3>
          <p>
            <strong>Проблема:</strong> запись на тренировку, выбор программы,
            статус абонемента.
          </p>
          <p>
            <strong>ROI:</strong> очередь в администратора сокращается в 3 раза,
            члены клуба довольны, тренер может сосредоточиться на тренировке
            вместо приёма звонков.
          </p>

          {/* CTA */}
          <div className="blog-cta">
            <p>
              Какой ROI даёт AI-сотрудник на практике? В следующей статье —
              реальные кейсы с цифрами и пошаговый план внедрения без
              разработчика.
            </p>
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
            <Link to="/" className="site-footer__logo" style={{ textDecoration: "none", color: "inherit" }}>
              FAM<span className="text-brand-accent">TEAM</span>
            </Link>
            <span className="site-footer__tagline">
              AI-сотрудники, которые приносят заявки
            </span>
          </div>
          <nav className="site-footer__nav" aria-label="Footer navigation">
            <Link to="/" className="site-footer__link">Главная</Link>
            <Link to="/blog" className="site-footer__link">Блог</Link>
            <Link to="/contact" className="site-footer__link">Контакты</Link>
          </nav>
        </div>
        <div className="site-footer__copy">FamTeam &copy; 2025</div>
      </footer>
    </div>
  );
};

export default ChatBotVsAiSotrudnik;
