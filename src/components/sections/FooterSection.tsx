import { useState } from 'react';
import { useContactForm } from '@/hooks/useContactForm';

const FOOTER_LINKS = [
  { id: 'about', label: 'Что это' },
  { id: 'products', label: 'Продукты' },
  { id: 'system', label: 'Как это работает' },
  { id: 'cta', label: 'Контакты' },
];

const FooterSection = () => {
  const { form, setForm, sent, sending, error, handleSubmit } = useContactForm();
  const [focused, setFocused] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="snap-page" id="cta">
      <div className="poster-container" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* CTA */}
        <div className="ft-cta">
          <div className="ft-cta__left">
            <span className="ft-cta__label">СЛЕДУЮЩИЙ ШАГ</span>
            <h2 className="display-type ft-cta__title">
              ЗАПУСТИМ<br />
              <span className="ft-cta__title-mid"><span className="heading-latin">AI</span>-СОТРУДНИКА</span><br />
              <span className="ft-cta__title-accent">ПОД ВАШУ ЗАДАЧУ</span>
            </h2>
            <p className="ft-cta__sub">
              Покажем, как это будет работать в вашем бизнесе
            </p>
            <div className="ft-cta__value">
              <span className="ft-cta__value-label">В ОТВЕТ ВЫ ПОЛУЧИТЕ</span>
              <div className="ft-cta__value-list">
                {[
                  { n: '01', t: 'Готовый сценарий работы AI под ваш бизнес' },
                  { n: '02', t: 'Где и как AI будет общаться с клиентами' },
                  { n: '03', t: 'Как это встроится в ваш процесс без команды' },
                ].map(item => (
                  <div key={item.n} className="ft-cta__value-item">
                    <span className="ft-cta__value-num">{item.n}</span>
                    <span className="ft-cta__value-text">{item.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ft-cta__right">
            {!sent ? (
              <form className="ft-form" onSubmit={handleSubmit}>
                <div className={`ft-form__field${focused === 'name' ? ' ft-form__field--focus' : ''}`}>
                  <input
                    type="text" className="ft-form__input" placeholder="Имя"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
                <div className={`ft-form__field${focused === 'contact' ? ' ft-form__field--focus' : ''}`}>
                  <input
                    type="text" className="ft-form__input" placeholder="Telegram / WhatsApp / Email"
                    value={form.contact}
                    onChange={e => setForm({ ...form, contact: e.target.value })}
                    onFocus={() => setFocused('contact')}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
                <div className={`ft-form__field${focused === 'task' ? ' ft-form__field--focus' : ''}`}>
                  <textarea
                    className="ft-form__input ft-form__textarea" placeholder="Краткое описание задачи"
                    value={form.task}
                    onChange={e => setForm({ ...form, task: e.target.value })}
                    onFocus={() => setFocused('task')}
                    onBlur={() => setFocused(null)}
                    rows={2}
                  />
                </div>
                <button type="submit" className="ft-form__btn" disabled={sending}>
                  {sending ? 'ОТПРАВКА...' : 'ОБСУДИТЬ ВНЕДРЕНИЕ AI-СОТРУДНИКА →'}
                </button>
                {error && <p style={{ color: 'var(--c-brand-accent)', fontFamily: 'var(--f-tech)', fontSize: '12px', marginTop: '8px' }}>{error}</p>}
                <p style={{
                  fontFamily: 'var(--f-tech)',
                  fontSize: '11px',
                  letterSpacing: '0.06em',
                  color: 'var(--c-text-secondary)',
                  marginTop: '12px',
                  marginBottom: '0',
                }}>
                  Покажем на вашем кейсе за 24 часа
                </p>
                <div className="ft-form__meta">
                  <span className="ft-form__signal"><span className="ft-form__pulse" />AI system online</span>
                </div>
              </form>
            ) : (
              <div className="ft-form__success">
                <span className="ft-form__success-icon">✓</span>
                <p className="ft-form__success-title">Заявка принята</p>
                <p className="ft-form__success-sub">Свяжемся и покажем, как AI будет работать на ваш бизнес</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <div className="site-footer__brand">
              <span className="site-footer__logo">FAM<span className="text-brand-accent">TEAM</span></span>
              <span className="site-footer__tagline">AI-сотрудники, которые приносят заявки</span>
            </div>
            <nav className="site-footer__nav" aria-label="Footer navigation">
              {FOOTER_LINKS.map(l => (
                <a key={l.id} href={`#${l.id}`} className="site-footer__link" onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="site-footer__copy">FamTeam © 2025</div>
        </footer>
      </div>
    </div>
  );
};

export default FooterSection;
