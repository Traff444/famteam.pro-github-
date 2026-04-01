import { useEffect, useRef, useState, useCallback } from 'react';
import { assetUrl } from '@/lib/asset-url';

/**
 * AiSystemVisual — Premium AI chat demo card
 * Linear demo: messages appear sequentially, then loop.
 * No fake interactions. Honest product demonstration.
 */

export interface ChatLine {
  from: 'client' | 'ai';
  text: string;
  delay: number;
}

const DEFAULT_SCRIPT: ChatLine[] = [
  { from: 'client', delay: 0,     text: 'Здравствуйте, мне плохо' },
  { from: 'ai',     delay: 1000,  text: 'Добрый день. Опишите симптомы — сориентирую по специалисту и подберу время.' },
  { from: 'client', delay: 1200,  text: 'Температура и горло' },
  { from: 'ai',     delay: 1000,  text: 'По симптомам оптимально начать с терапевта. Ближайшее время: сегодня 16:00 или завтра 14:00.' },
  { from: 'client', delay: 1000,  text: 'Сегодня' },
  { from: 'ai',     delay: 1000,  text: 'Записала вас на сегодня в 16:00 к терапевту ✅' },
];

const VISIBLE_WINDOW = 4;
const PAUSE_BEFORE_LOOP = 4000;
const MOBILE_BREAKPOINT = 1024;

interface AiSystemVisualProps {
  scenario?: ChatLine[];
}

const AiSystemVisual = ({ scenario }: AiSystemVisualProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [currentScript, setCurrentScript] = useState<ChatLine[]>(scenario ?? DEFAULT_SCRIPT);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingIdx, setTypingIdx] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prevScenarioRef = useRef(scenario);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const playSequence = useCallback((script: ChatLine[]) => {
    clearTimers();
    setCurrentScript(script);
    setVisibleCount(0);
    setTypingIdx(null);
    setIsFading(false);

    let cumulative = 400;

    script.forEach((line, i) => {
      cumulative += line.delay;
      timersRef.current.push(setTimeout(() => setTypingIdx(i), cumulative));

      const typingDuration = line.from === 'client' ? 400 : 800;
      const revealDelay = cumulative + typingDuration;
      timersRef.current.push(setTimeout(() => {
        setTypingIdx(null);
        setVisibleCount(i + 1);
      }, revealDelay));

      cumulative = revealDelay;
    });

    timersRef.current.push(setTimeout(() => playSequence(script), cumulative + PAUSE_BEFORE_LOOP));
  }, [clearTimers]);

  const showInstant = useCallback((script: ChatLine[]) => {
    clearTimers();
    setCurrentScript(script);
    setTypingIdx(null);
    setIsFading(false);
    setVisibleCount(script.length);
  }, [clearTimers]);

  useEffect(() => {
    if (!revealed) return;
    const script = scenario ?? DEFAULT_SCRIPT;
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile) showInstant(script);
    else playSequence(script);
    return clearTimers;
  }, [revealed]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!revealed) return;
    if (scenario === prevScenarioRef.current) return;
    prevScenarioRef.current = scenario;

    const script = scenario ?? DEFAULT_SCRIPT;
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

    setIsFading(true);
    timersRef.current.push(setTimeout(() => {
      if (isMobile) showInstant(script);
      else playSequence(script);
    }, isMobile ? 200 : 250));
  }, [scenario, revealed, playSequence, showInstant]);

  const allShown = currentScript.slice(0, visibleCount);
  const windowStart = Math.max(0, allShown.length - VISIBLE_WINDOW);
  const visibleLines = allShown.slice(windowStart);

  const MascotAvatar = () => (
    <img
      className="asv__mascot"
      src={assetUrl("/images/logo.webp")}
      alt="AI"
      width={32}
      height={32}
    />
  );

  return (
    <div ref={wrapRef} className={`asv${revealed ? ' asv--revealed' : ''}`}>
      <div className="asv__card asv__card--chat">
        <div className="asv__bar">
          <span className="asv__bar-title">AI Receptionist</span>
          <span className="asv__bar-status">
            <span className="asv__online-dot" />
            ONLINE
          </span>
        </div>

        <div className={`asv__chat-body${isFading ? ' asv__chat-body--fading' : ''}`}>
          {visibleLines.map((line, i) => (
            <div
              key={`${windowStart + i}-${line.text}`}
              className={`asv__chat-row asv__chat-row--${line.from === 'client' ? 'in' : 'out'} asv__chat-row--enter`}
            >
              {line.from === 'ai' && <MascotAvatar />}
              {line.from === 'client' && (
                <div className="asv__chat-avatar">K</div>
              )}
              <div className={`asv__chat-bubble asv__chat-bubble--${line.from === 'client' ? 'in' : 'out'}`}>
                <span className="asv__chat-text">{line.text}</span>
              </div>
            </div>
          ))}

          {typingIdx !== null && typingIdx < currentScript.length && (
            <div
              className={`asv__chat-row asv__chat-row--${currentScript[typingIdx].from === 'client' ? 'in' : 'out'} asv__chat-row--enter`}
            >
              {currentScript[typingIdx].from === 'ai' && <MascotAvatar />}
              {currentScript[typingIdx].from === 'client' && (
                <div className="asv__chat-avatar">K</div>
              )}
              <div className={`asv__chat-bubble asv__chat-bubble--${currentScript[typingIdx].from === 'client' ? 'in' : 'out'}`}>
                <span className="asv__typing">
                  <span className="asv__typing-dot" />
                  <span className="asv__typing-dot" />
                  <span className="asv__typing-dot" />
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="asv__progress">
          <div
            className="asv__progress-fill"
            style={{ width: `${(visibleCount / currentScript.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AiSystemVisual;
