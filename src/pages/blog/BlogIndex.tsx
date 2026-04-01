import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { assetUrl } from "@/lib/asset-url";

const ARTICLES = [
  {
    slug: "ai-sotrudnik-kejsy-vnedrenie",
    title: "AI-сотрудник для бизнеса: кейсы с ROI и внедрение за 3 дня",
    description:
      "Кейсы внедрения AI-сотрудника с расчётом ROI. Как выбрать решение, избежать ошибок и запустить без разработчика за 3 дня.",
    image: "/blog/images/vis1-hero-kejsy.webp",
    date: "1 апреля 2026",
    readingTime: "12 мин",
  },
  {
    slug: "chat-bot-vs-ai-sotrudnik",
    title: "Чат-бот vs AI-сотрудник: в чём разница для салона, клиники и школы",
    description:
      "Сравнение чат-бота и AI-сотрудника для салонов, клиник и онлайн-школ. Таблица отличий, примеры диалогов и ROI по нишам.",
    image: "/blog/images/vis1-hero-bot-vs-ai.webp",
    date: "1 апреля 2026",
    readingTime: "8 мин",
  },
];

const BlogIndex = () => {
  return (
    <div className="blog-page">
      <Helmet>
        <title>Блог | FamTeam</title>
        <meta
          name="description"
          content="Блог FamTeam: статьи об AI-сотрудниках для бизнеса, автоматизации и росте конверсии."
        />
        <link rel="canonical" href="https://famteam.ru/blog" />
        <meta property="og:title" content="Блог | FamTeam" />
        <meta
          property="og:description"
          content="Блог FamTeam: статьи об AI-сотрудниках для бизнеса, автоматизации и росте конверсии."
        />
        <meta property="og:url" content="https://famteam.ru/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="FamTeam" />
      </Helmet>

      <Header />

      <main className="blog-index">
        <div className="blog-index__header">
          <h1 className="blog-index__title">БЛОГ</h1>
          <p className="blog-index__sub">
            AI-сотрудники, автоматизация и рост конверсии
          </p>
        </div>

        <div className="blog-index__grid">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              to={`/blog/${a.slug}`}
              className="blog-card"
            >
              <img
                className="blog-card__img"
                src={assetUrl(a.image)}
                alt={a.title}
                width={600}
                height={315}
                loading="lazy"
              />
              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <time>{a.date}</time>
                  <span>{a.readingTime}</span>
                </div>
                <h2 className="blog-card__title">{a.title}</h2>
                <p className="blog-card__desc">{a.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

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

export default BlogIndex;
