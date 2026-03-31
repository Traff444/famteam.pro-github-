import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Чем AI-сотрудник отличается от чат-бота?",
    a: "Чат-бот отвечает по шаблону. AI-сотрудник понимает контекст разговора, ведёт клиента по сценарию продажи и сам фиксирует заявку в CRM. Он работает как менеджер — с целью довести диалог до результата.",
  },
  {
    q: "Сколько времени занимает внедрение?",
    a: "Первый AI-сотрудник запускается за 1-2 недели. Мы проектируем сценарий под вашу воронку, подключаем к каналам (сайт, мессенджеры, соцсети) и тестируем на реальных диалогах.",
  },
  {
    q: "Нужна ли техническая команда на нашей стороне?",
    a: "Нет. FamTeam берёт на себя проектирование, внедрение и поддержку. Вам не нужны разработчики или IT-отдел. Достаточно описать текущий процесс работы с клиентами.",
  },
  {
    q: "Какие каналы поддерживаются?",
    a: "Telegram, WhatsApp, Instagram Direct, виджет на сайте, email. AI-сотрудник работает во всех каналах одновременно и передаёт заявки в вашу CRM.",
  },
  {
    q: "Что если AI ответит неправильно?",
    a: "AI-сотрудник работает по утверждённому сценарию — он не импровизирует. Если диалог выходит за рамки сценария, AI передаёт клиента живому менеджеру. Каждый диалог записывается, ошибки видны сразу.",
  },
  {
    q: "Сколько это стоит?",
    a: "Зависит от объёма: количество каналов, сложность сценария, нагрузка. Обсудим на консультации — покажем, как это будет работать в вашем бизнесе и назовём точную стоимость.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="snap-page" id="faq" style={{ background: '#fafafa' }}>
      <div className="poster-container">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <h2 className="display-type" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
            ЧАСТЫЕ ВОПРОСЫ
          </h2>
          <p style={{ opacity: 0.6, marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Ответы на вопросы, которые задают перед внедрением AI-сотрудников для бизнеса.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: i === 0 ? '8px 8px 0 0' : i === FAQ_ITEMS.length - 1 ? '0 0 8px 8px' : '0',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: 500,
                    fontFamily: 'inherit',
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                  <span style={{
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                    marginLeft: '1rem',
                    opacity: 0.4,
                  }}>+</span>
                </button>
                {openIndex === i && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    opacity: 0.7,
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
