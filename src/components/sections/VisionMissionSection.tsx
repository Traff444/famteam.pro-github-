import { useState } from "react";
import heroImage from "@/assets/hero-image.jpg";

const WHAT_ITEMS = [
  'отвечают за секунды — клиент не уходит',
  'доводят диалог до заявки по сценарию',
  'фиксируют заявки в CRM без потерь',
  'анализируют воронку и увеличивают конверсию',
];

const VISION_ITEMS = [
  'ни одна заявка не теряется',
  'процессы работают без ручного контроля',
  'команда занимается ростом, а не рутиной',
];

const VisionMissionSection = () => {
  const [activeTab, setActiveTab] = useState<"what" | "vision">("what");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const items = activeTab === "what" ? WHAT_ITEMS : VISION_ITEMS;

  return (
    <div className="snap-page" id="about">
      <div className="poster-container">
        <div className="vm">
          {/* Left — image pattern */}
          <div className="vm__pattern">
            <img src={heroImage} alt="AI-сотрудник FamTeam — автоматизация бизнес-процессов" className="vm__pattern-img" />
          </div>

          {/* Right — content */}
          <div className="vm__content">
            {/* Tabs */}
            <div className="vm__tabs">
              <button
                type="button"
                onClick={() => setActiveTab("what")}
                className={`vm__tab${activeTab === "what" ? ' vm__tab--active' : ''}`}
              >
                Что это
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vision")}
                className={`vm__tab${activeTab === "vision" ? ' vm__tab--active' : ''}`}
              >
                Видение
              </button>
            </div>

            {/* Title */}
            <h2 className="display-type vm__title">
              {activeTab === "what" ? (
                <><span className="heading-latin">AI</span>-СОТРУДНИКИ<br /><span className="vm__title-mid">КОТОРЫЕ РАБОТАЮТ</span><br /><span className="vm__title-accent">ВМЕСТО РУТИНЫ</span></>
              ) : (
                <>БИЗНЕС БЕЗ<br /><span className="vm__title-accent">ПОТЕРЯННЫХ ЗАЯВОК</span></>
              )}
            </h2>

            {/* Intro */}
            {activeTab === "what" && (
              <div>
                <p className="vm__intro">Берут на себя коммуникацию, заявки и процессы:</p>
              </div>
            )}
            {activeTab === "vision" && (
              <p className="vm__intro" style={{ opacity: 0.7, lineHeight: 1.6 }}>
                Каждый пропущенный звонок — потерянный клиент. Каждое долгое ожидание — минус к конверсии. AI-сотрудники FamTeam закрывают эти разрывы: реагируют мгновенно, работают по вашему сценарию и передают готовые заявки в CRM.
              </p>
            )}

            {/* Items */}
            <div className="vm__items">
              {items.map((text, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className={`vm__item${hoveredItem === i ? ' vm__item--active' : ''}`}
                  onMouseEnter={() => setHoveredItem(i)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="vm__item-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="vm__item-text">{text}</span>
                </div>
              ))}
            </div>

            {/* Footer text */}
            {activeTab === "what" ? (
              <p className="vm__footer-text">Работают 24/7. Встраиваются в ваш бизнес.</p>
            ) : (
              <div className="vm__footer-text vm__footer-text--vision">
                <span className="vm__footer-primary">AI закрывает рутину.</span>
                <span className="vm__footer-secondary">Команда занимается ростом бизнеса.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionSection;
