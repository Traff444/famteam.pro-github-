import SEO from '@/components/SEO';
import Header from '@/components/Header';
import { useContactForm } from '@/hooks/useContactForm';

const Contact = () => {
  const { form, setForm, sent, sending, error, handleSubmit } = useContactForm();

  return (
    <div className="site-root">
      <SEO
        title="Контакты — обсудить внедрение AI-сотрудника"
        description="Опишите задачу — мы спроектируем AI-сотрудника под ваш бизнес. Ответим за 24 часа."
        path="/contact"
      />
      <Header />
      <div className="contact-page">
        <div className="contact-wrap">
          {!sent ? (
            <>
              <span className="contact-label">КОНТАКТЫ</span>
              <h1 className="display-type contact-title">
                СПРОЕКТИРУЕМ<br />
                <span className="text-brand-accent"><span className="heading-latin">AI</span>-СОТРУДНИКА</span>
              </h1>
              <p className="contact-sub">
                Опишите задачу — мы свяжемся и предложим решение.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-field">
                  <label className="contact-field__label">Имя</label>
                  <input
                    type="text"
                    className="contact-field__input"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-field__label">Контакт (телефон или email)</label>
                  <input
                    type="text"
                    className="contact-field__input"
                    value={form.contact}
                    onChange={e => setForm({ ...form, contact: e.target.value })}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label className="contact-field__label">Опишите задачу</label>
                  <textarea
                    className="contact-field__input contact-field__textarea"
                    value={form.task}
                    onChange={e => setForm({ ...form, task: e.target.value })}
                    rows={4}
                  />
                </div>
                <button type="submit" className="contact-submit" disabled={sending}>
                  {sending ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ →'}
                </button>
                {error && <p style={{ color: 'var(--c-brand-accent)', fontSize: '14px', marginTop: '8px' }}>{error}</p>}
              </form>
            </>
          ) : (
            <div className="contact-success">
              <h2 className="display-type" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
                СПАСИБО<span className="text-brand-accent">!</span>
              </h2>
              <p className="contact-sub">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
