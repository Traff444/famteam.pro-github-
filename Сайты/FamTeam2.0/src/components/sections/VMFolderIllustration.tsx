/**
 * VMFolderIllustration — animated card-index folder stack.
 * Desktop only (hidden on mobile via parent class).
 * Hover any row → it lifts up (translateY via .vm-folder-row CSS class).
 */

const ACCENT = '#F0642B';
const MONO = "'JetBrains Mono', 'Courier New', monospace";

const ROW_H  = 30;  // folder row height (px)
const TAB_H  = 17;  // tab ear height (px)
const TAB_UP = 11;  // how far tab sticks above row top (px)

interface F {
  label: string;
  n1?: string;
  n2?: string;
  extra?: string;
  ln?: string;      // left reference number
  active?: boolean; // black tab
  dot?: boolean;
  t: number;        // tab left offset (px, within 340px container)
}

const folders: F[] = [
  { label: 'CLIENTS',    n1: '95',  n2: '94',  t: 130 },
  { label: 'DATA',       n1: '97',  n2: '96',  t: 120 },
  { label: 'WORKFLOWS',  n1: '98',  n2: '98',  t: 148 },
  { label: 'AUTOMATION', n1: '101', n2: '90',  t: 162 },
  { label: 'ANALYTICS',  n1: '102', n2: '92',  t: 138 },
  { label: 'AI_AGENT',   n1: '102', n2: '92',  ln: '104', active: true, t: 134 },
  { label: 'REPORTS',    n1: '103', n2: '94',  t: 152 },
  { label: 'SALES',      n1: '105', n2: '96',  t: 134 },
  { label: 'AI_AGENT',   active: true, t: 204 },
  { label: 'SUPPORT',    n1: '107', t: 143 },
  { label: 'CRM',        ln: '112', t: 154 },
  { label: 'TASKS',      n1: '111', t: 124 },
  { label: 'MESSAGES',   n1: '113', t: 168 },
  { label: 'PROCESS',    n1: '117', active: true, t: 0 },
  { label: 'API',        n1: '110', t: 138 },
  { label: 'AI_MEMORY',  n1: '119', dot: true, t: 149 },
  { label: 'AI_ROUTER',  n1: '120', extra: 'LOGS', dot: true, t: 155 },
  { label: 'EVENTS',     dot: true, t: 172 },
  { label: 'NODE',       active: true, t: 0 },
];

export default function VMFolderIllustration() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#EAEAEA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: 340,
        maxWidth: '100%',
        paddingTop: TAB_UP + 10,
        paddingBottom: 0,
        paddingLeft: 16,
        paddingRight: 16,
      }}>
        {folders.map((f, i) => (
          <div
            key={`${f.label}-${i}`}
            className="vm-folder-row"
            style={{
              height: ROW_H,
              background: '#F7F7F7',
              borderTop: '1px solid rgba(0,0,0,0.07)',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
              paddingRight: 8,
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* ── Tab ear ── */}
            <div style={{
              position: 'absolute',
              top: -TAB_UP,
              left: f.t,
              height: TAB_H,
              paddingLeft: 9,
              paddingRight: 9,
              minWidth: 46,
              background: f.active ? '#111' : '#DCDCDC',
              borderRadius: '3px 3px 0 0',
              border: f.active ? 'none' : '1px solid rgba(0,0,0,0.12)',
              borderBottom: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}>
              <span style={{
                fontFamily: MONO,
                fontSize: 7.5,
                fontWeight: f.active ? 500 : 400,
                letterSpacing: '0.1em',
                color: f.active ? '#fff' : '#444',
                whiteSpace: 'nowrap',
              }}>
                {f.label}
              </span>
            </div>

            {/* ── Left number ── */}
            {f.ln && (
              <span style={{
                fontFamily: MONO,
                fontSize: 7,
                color: 'rgba(0,0,0,0.36)',
                letterSpacing: '0.04em',
                marginRight: 4,
                flexShrink: 0,
              }}>
                {f.ln}
              </span>
            )}

            {/* ── Right: numbers / extra / dot ── */}
            <div style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              flexShrink: 0,
            }}>
              {f.extra && (
                <span style={{ fontFamily: MONO, fontSize: 7, color: 'rgba(0,0,0,0.36)', letterSpacing: '0.08em' }}>
                  {f.extra}
                </span>
              )}
              {f.n1 && (
                <span style={{ fontFamily: MONO, fontSize: 7, color: 'rgba(0,0,0,0.36)' }}>
                  {f.n1}
                </span>
              )}
              {f.n2 && (
                <span style={{ fontFamily: MONO, fontSize: 7, color: 'rgba(0,0,0,0.36)' }}>
                  {f.n2}
                </span>
              )}
              {f.dot && (
                <span style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: ACCENT,
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
              )}
            </div>
          </div>
        ))}

        {/* ── FAMTEAM footer bar ── */}
        <div style={{
          borderTop: '2px solid rgba(0,0,0,0.13)',
          height: 34,
          background: '#F0F0F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: MONO,
            fontSize: 8,
            letterSpacing: '0.22em',
            color: 'rgba(0,0,0,0.38)',
            textTransform: 'uppercase',
          }}>
            FAMTEAM
          </span>
        </div>
      </div>
    </div>
  );
}
