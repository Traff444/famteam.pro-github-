import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

/**
 * SystemInAction — Single card, 5 states, clickable steps.
 * Uses single interval for auto-play. Click pauses and resumes.
 */

const STEPS = [
  { num: '01', label: 'Входящее сообщение' },
  { num: '02', label: 'Ответ за 3 секунды' },
  { num: '03', label: 'AI ведет диалог' },
  { num: '04', label: 'Заявка фиксируется' },
  { num: '05', label: 'Конверсия растет' },
];

const AUTO_DELAY = 3500;
const CLICK_DELAY = 5000;

const SystemInAction = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [step, setStep] = useState(0);
  const [key, setKey] = useState(0);
  const versionRef = useRef(0); // incremented on each click to invalidate old chains

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Schedule next step via setTimeout (not setInterval)
  const scheduleNext = (currentStep: number, delay: number, version: number) => {
    setTimeout(() => {
      if (versionRef.current !== version) return; // stale — a click happened
      const next = (currentStep + 1) % STEPS.length;
      setStep(next);
      setKey(k => k + 1);
      scheduleNext(next, AUTO_DELAY, version);
    }, delay);
  };

  useEffect(() => {
    if (!revealed) return;
    const v = ++versionRef.current;
    scheduleNext(0, AUTO_DELAY, v);
  }, [revealed]);

  const handleClick = (i: number) => {
    const v = ++versionRef.current; // invalidate all pending timeouts
    flushSync(() => {
      setStep(i);
      setKey(k => k + 1);
    });
    scheduleNext(i, CLICK_DELAY, v);
  };

  return (
    <div className="snap-page">
      <div className="poster-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div ref={ref} className={`sia3${revealed ? ' sia3--on' : ''}`}>

          {/* Left */}
          <div className="sia3__left">
            <span className="sia3__label">КАК ЭТО РАБОТАЕТ</span>
            <h2 className="sia3__title">ОТ СООБЩЕНИЯ К ЗАЯВКЕ<br /><span className="sia3__acc">В ДЕЙСТВИИ</span></h2>
            <p className="sia3__sub">Типовой сценарий: соцсети → диалог → заявка → CRM</p>
            <div className="sia3__steps">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleClick(i)}
                  className={`sia3__step${i <= step ? ' sia3__step--on' : ''}${i === step ? ' sia3__step--active' : ''}`}
                >
                  <div className="sia3__rail">
                    <div className="sia3__dot" />
                    {i < STEPS.length - 1 && <div className="sia3__line" />}
                  </div>
                  <div className="sia3__step-body">
                    <span className="sia3__step-num">{s.num}</span>
                    <span className="sia3__step-text">{s.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="sia3__right-col">
          <div className="sia3__card" key={key}>
            {step === 0 && (
              <div className="sia3__state">
                <span className="sia3__state-tag">AI CREATOR</span>
                <div className="sia3__post">
                  <div className="sia3__post-img">
                    <span className="sia3__post-t">ТРЕНИРОВКА</span>
                    <span className="sia3__post-s">ДЛЯ НОВИЧКОВ</span>
                  </div>
                  <p className="sia3__post-line sia3__post-line--bold">Тренировка для новичков</p>
                  <p className="sia3__post-line">— минус 3 кг за 30 дней</p>
                  <p className="sia3__post-line">Первое занятие бесплатно</p>
                </div>
                <div className="sia3__status sia3__status--ok">опубликовано в Instagram</div>
              </div>
            )}

            {step === 1 && (
              <div className="sia3__state">
                <span className="sia3__state-tag">ВХОДЯЩЕЕ СООБЩЕНИЕ</span>
                <div className="sia3__dialog">
                  <div className="sia3__msg sia3__msg--client">
                    <span className="sia3__msg-who">АННА</span>
                    Есть вечерние занятия?
                  </div>
                </div>
                <div className="sia3__status">входящее из Instagram</div>
              </div>
            )}

            {step === 2 && (
              <div className="sia3__state">
                <span className="sia3__state-tag">AI RECEPTIONIST</span>
                <div className="sia3__dialog">
                  <div className="sia3__msg sia3__msg--client">
                    <span className="sia3__msg-who">АННА</span>
                    Есть вечерние занятия?
                  </div>
                  <div className="sia3__msg sia3__msg--ai">
                    <span className="sia3__msg-who">AI</span>
                    Да, есть в 19:00 и 21:00. Записать вас?
                  </div>
                  <div className="sia3__msg sia3__msg--client">
                    <span className="sia3__msg-who">АННА</span>
                    Да, на 19:00
                  </div>
                </div>
                <div className="sia3__status sia3__status--ok">AI ведёт диалог</div>
              </div>
            )}

            {step === 3 && (
              <div className="sia3__state">
                <span className="sia3__state-tag sia3__state-tag--green">НОВАЯ ЗАЯВКА</span>
                <div className="sia3__lead">
                  <div className="sia3__lead-row"><span>Имя</span><b>Анна</b></div>
                  <div className="sia3__lead-row"><span>Услуга</span><b>Фитнес</b></div>
                  <div className="sia3__lead-row"><span>Время</span><b>19:00</b></div>
                  <div className="sia3__lead-row"><span>Источник</span><b>Instagram</b></div>
                </div>
                <div className="sia3__status sia3__status--green">заявка создана автоматически</div>
              </div>
            )}

            {step === 4 && (
              <div className="sia3__state">
                <span className="sia3__state-tag">AI GROWTH MANAGER</span>
                <div className="sia3__analytics">
                  <div className="sia3__an-row">
                    <span className="sia3__an-label">Конверсия</span>
                    <div className="sia3__an-val-row">
                      <span className="sia3__an-old">1.8%</span>
                      <span className="sia3__an-arrow">→</span>
                      <span className="sia3__an-new">2.5%</span>
                    </div>
                  </div>
                  <div className="sia3__an-insight">
                    <span className="sia3__an-insight-tag">ОБНАРУЖЕНО</span>
                    <p className="sia3__an-insight-text">Длинная форма снижает конверсию на 62%</p>
                  </div>
                  <div className="sia3__an-fix">
                    <span className="sia3__an-fix-tag">РЕШЕНИЕ</span>
                    <p className="sia3__an-fix-text">✓ сократить форму до 3 полей</p>
                    <p className="sia3__an-fix-text">✓ изменить текст CTA</p>
                  </div>
                </div>
                <div className="sia3__status sia3__status--ok">система оптимизирована</div>
              </div>
            )}
          </div>
          <span className="sia3__micro">ни одно обращение не теряется</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemInAction;
