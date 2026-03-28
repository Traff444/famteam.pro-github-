/**
 * FolderArchiveCard — system archive folder stack.
 *
 * The parent `.layer-card` IS the front folder.
 * This component renders:
 *   1. Subtle back layers for stacking depth (above card, z-negative)
 *   2. Large interior folder tabs — the main visual (inside card)
 *      with index rail, labels, and an active AI_AGENT tab.
 *
 * The tab list occupies ~70% of the card height.
 * Back layers are minimal depth cues (3 unlabeled edges).
 */

const ACCENT = '#F0642B';

interface Tab {
  idx: string;
  label: string;
  active?: boolean;
  dot?: boolean;
}

const tabs: Tab[] = [
  { idx: '01', label: 'CLIENTS' },
  { idx: '02', label: 'WORKFLOWS', dot: true },
  { idx: '03', label: 'AUTOMATION' },
  { idx: '04', label: 'ANALYTICS', dot: true },
  { idx: '05', label: 'AI_AGENT', active: true },
];

/* Back layers: grey rectangles peeking above the card for depth */
const BACK_LAYERS = 3;
const LAYER_STEP = 3;

export default function FolderArchiveCard() {
  return (
    <>
      {/* ── Back layers for stacking depth ── */}
      <div
        style={{
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        {Array.from({ length: BACK_LAYERS }, (_, i) => {
          const offset = (BACK_LAYERS - i) * LAYER_STEP;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: -offset,
                bottom: offset,
                background: '#1f1f1f',
                border: '1px solid #333',
                borderRadius: '0 4px 4px 4px',
                zIndex: -(BACK_LAYERS - i),
              }}
            >
              {/* Small empty tab ear — folder shape hint */}
              <div
                style={{
                  position: 'absolute',
                  top: -4,
                  left: i * 30 + 8,
                  width: 22,
                  height: 5,
                  background: '#1f1f1f',
                  border: '1px solid #333',
                  borderBottomColor: '#1f1f1f',
                  borderRadius: '2px 2px 0 0',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Interior: folder tab list with index rail ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        {/* Index rail — thin vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 4,
            bottom: '30%',
            width: 1,
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(240,100,43,0.2))',
            zIndex: 0,
          }}
        />

        {/* Tab stack — 70% of card */}
        <div
          style={{
            flex: 7,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {tabs.map((tab) => {
            const isActive = !!tab.active;

            return (
              <div
                key={tab.label}
                style={{
                  flex: 1,
                  maxHeight: 28,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  paddingLeft: 6,
                  paddingRight: 8,
                  background: isActive ? 'rgba(240,100,43,0.15)' : 'transparent',
                  borderRadius: isActive ? '3px' : '0',
                  borderTop: isActive ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Active left accent bar */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '18%',
                      bottom: '18%',
                      width: 2,
                      borderRadius: 1,
                      background: ACCENT,
                    }}
                  />
                )}

                {/* Index number */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    letterSpacing: '0.08em',
                    color: isActive
                      ? 'rgba(240,100,43,0.6)'
                      : 'rgba(255,255,255,0.2)',
                    width: 16,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {tab.idx}
                </span>

                {/* Thin separator */}
                <div
                  style={{
                    width: 1,
                    alignSelf: 'stretch',
                    margin: '4px 0',
                    background: isActive
                      ? 'rgba(240,100,43,0.35)'
                      : 'rgba(255,255,255,0.06)',
                    flexShrink: 0,
                  }}
                />

                {/* Label */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                    flex: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </span>

                {/* Indicator dot */}
                {(tab.dot || isActive) && (
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: ACCENT,
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom — FAMTEAM ARCHIVE label */}
        <div
          style={{
            flex: 3,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 7,
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.08)',
              textTransform: 'uppercase' as const,
            }}
          >
            FAMTEAM ARCHIVE
          </span>
        </div>
      </div>
    </>
  );
}
