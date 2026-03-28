import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

const DEFAULTS = {
  siteName: "FamTeam",
  baseUrl: "https://famteam.ru",
  title: "FamTeam — AI-сотрудники для бизнеса",
  description:
    "FamTeam внедряет AI-сотрудников: AI Receptionist, Growth Manager, Creator. Обрабатывают заявки, увеличивают конверсию, создают контент 24/7.",
  ogImage: "https://famteam.ru/images/og-cover.png",
};

const SEO = ({ title, description, path = "/", ogImage }: SEOProps) => {
  const fullTitle = title
    ? `${title} | ${DEFAULTS.siteName}`
    : DEFAULTS.title;
  const desc = description || DEFAULTS.description;
  const url = `${DEFAULTS.baseUrl}${path}`;
  const image = ogImage || DEFAULTS.ogImage;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content={DEFAULTS.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
