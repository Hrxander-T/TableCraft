import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

// --- Feature list ---
const features = [
  { icon: '🎨', title: 'Beautiful Themes', desc: '8 built-in themes, fully customizable to your brand' },
  { icon: '📊', title: 'Column Types', desc: 'Text, number, currency, badge, status — rendered perfectly' },
  { icon: '↩️', title: 'Undo / Redo', desc: '30-step history. Ctrl+Z / Ctrl+Y, always.' },
  { icon: '📤', title: '6 Export Formats', desc: 'PNG, PDF, SVG, CSV, LaTeX, JSON — pixel perfect' },
  { icon: '📥', title: 'CSV Import', desc: 'Paste or upload CSV files. Auto-detects columns.' },
  { icon: '🖥️', title: 'Desktop App', desc: 'Native Linux app with native file dialogs via Tauri' },
]

const formats = ['PNG', 'PDF', 'SVG', 'CSV', 'LaTeX', 'JSON']

// --- Animated counter ---
function useCountUp(target: number, duration = 1200) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      if (ref.current) ref.current.textContent = Math.floor(start).toString()
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return ref
}

// --- Stat item ---
function Stat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useCountUp(value)
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 40, fontWeight: 800, color: '#60a5fa', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
        <span ref={ref}>0</span>{suffix}
      </div>
      <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: '#0a0f1e', minHeight: '100vh', color: '#f1f5f9' }}>

      {/* --- Navbar --- */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 48px', borderBottom: '1px solid #1e293b',
        position: 'sticky', top: 0, background: '#0a0f1eee', backdropFilter: 'blur(12px)', zIndex: 100,
      }}>
        
        <div style={{ fontSize: 20, fontWeight: 700, color: '#60a5fa', letterSpacing: '-0.02em' }}>
          Table<span style={{ color: '#f1f5f9' }}>Craft</span>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="https://github.com/Hrxander-T/tablecraft" target="_blank" rel="noreferrer"
            style={{ color: '#94a3b8', fontSize: 14, textDecoration: 'none' }}>GitHub</a>

          <button onClick={() => navigate('/app')} style={{
            padding: '8px 20px', background: '#2563eb', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>Launch App →</button>
        </div>
      </nav>

      {/* --- Hero --- */}
      <section style={{ textAlign: 'center', padding: '100px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* --- Background glow --- */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, #1e40af33 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-block', background: '#1e3a5f', color: '#60a5fa',
          fontSize: 12, fontWeight: 600, padding: '4px 14px', borderRadius: 999,
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24,
          border: '1px solid #2563eb44',
        }}>
          Free & Open Source · MIT License
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1,
          letterSpacing: '-0.03em', margin: '0 auto 20px', maxWidth: 800,
          fontFamily: 'Georgia, serif',
        }}>
          Beautiful tables,<br />
          <span style={{ color: '#60a5fa' }}>without the pain.</span>
        </h1>

        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Design, style, and export professional data tables in minutes.
          No spreadsheets. No LaTeX headaches. No code required.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/app')} style={{
            padding: '14px 32px', background: '#2563eb', color: '#fff',
            border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 0 32px #2563eb66',
          }}>Launch App →</button>
          <a href="https://github.com/Hrxander-T/tablecraft" target="_blank" rel="noreferrer" style={{
            padding: '14px 32px', background: 'transparent', color: '#f1f5f9',
            border: '1px solid #334155', borderRadius: 10, fontSize: 16, fontWeight: 600,
            cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
          }}>View on GitHub</a>
        </div>

        {/* --- Format badges --- */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
          {formats.map((f) => (
            <span key={f} style={{
              padding: '4px 14px', background: '#0f172a', color: '#94a3b8',
              fontSize: 12, borderRadius: 999, border: '1px solid #1e293b',
              fontFamily: 'monospace', letterSpacing: '0.05em',
            }}>{f}</span>
          ))}
        </div>
      </section>

      {/* --- Stats --- */}
      <section style={{
        display: 'flex', justifyContent: 'center', gap: 64, flexWrap: 'wrap',
        padding: '48px 24px', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b',
        background: '#0d1424',
      }}>
        <Stat value={8} label="Themes" />
        <Stat value={6} label="Export Formats" />
        <Stat value={6} label="Column Types" />
        <Stat value={30} label="Undo Steps" />
      </section>

      {/* --- Features grid --- */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Everything you need
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>
            Built for developers, researchers, writers, and analysts.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: '#0d1424', border: '1px solid #1e293b', borderRadius: 16,
              padding: '28px', transition: 'border-color 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1e293b')}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section style={{
        textAlign: 'center', padding: '80px 24px',
        background: 'linear-gradient(180deg, #0a0f1e 0%, #0f2044 50%, #0a0f1e 100%)',
        borderTop: '1px solid #1e293b',
      }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>
          Ready to build better tables?
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>
          Free forever. No account required. Works in your browser.
        </p>
        <button onClick={() => navigate('/app')} style={{
          padding: '16px 40px', background: '#2563eb', color: '#fff',
          border: 'none', borderRadius: 12, fontSize: 18, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 0 48px #2563eb55',
        }}>Launch TableCraft →</button>
      </section>

      {/* --- Footer --- */}
      <footer style={{
        textAlign: 'center', padding: '24px', fontSize: 13,
        color: '#475569', borderTop: '1px solid #1e293b',
      }}>
        TableCraft · MIT License ·{' '}
        <a href="https://github.com/Hrxander-T/tablecraft"
          style={{ color: '#60a5fa', textDecoration: 'none' }}>GitHub</a>
      </footer>

    </div>
  )
}