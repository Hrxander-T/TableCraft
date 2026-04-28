import { useNavigate } from 'react-router-dom'

// --- Feature list ---
const features = [
  { icon: '🎨', title: 'Beautiful Themes', desc: '8 built-in themes, fully customizable' },
  { icon: '📊', title: 'Column Types', desc: 'Text, number, currency, badge, status and more' },
  { icon: '↩️', title: 'Undo / Redo', desc: '30-step history with Ctrl+Z / Ctrl+Y' },
  { icon: '📤', title: '6 Export Formats', desc: 'PNG, PDF, SVG, CSV, LaTeX, JSON' },
  { icon: '📥', title: 'CSV Import', desc: 'Paste or upload CSV files instantly' },
  { icon: '🖥️', title: 'Desktop App', desc: 'Native app for Linux with native file dialogs' },
]

// --- Export format badges ---
const formats = ['PNG', 'PDF', 'SVG', 'CSV', 'LaTeX', 'JSON']

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* --- Navbar --- */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="text-xl font-bold text-blue-600">TableCraft</div>
        <div className="flex gap-4">
          <a href="https://github.com/YOUR_USERNAME/tablecraft" target="_blank" rel="noreferrer"
            className="text-sm text-gray-500 hover:text-gray-800">GitHub</a>
          <button onClick={() => navigate('/app')}
            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Launch App
          </button>
        </div>
      </nav>

      {/* --- Hero --- */}
      <section className="text-center py-20 px-6">
        <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Free & Open Source
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Beautiful tables,<br />without the pain
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          Design, style, and export professional data tables in minutes.
          No spreadsheets. No LaTeX headaches. No code required.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => navigate('/app')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg">
            Launch App →
          </button>
          <a href="https://github.com/YOUR_USERNAME/tablecraft"
            target="_blank" rel="noreferrer"
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 shadow-lg border">
            View on GitHub
          </a>
        </div>

        {/* --- Export format badges --- */}
        <div className="flex gap-2 justify-center mt-8 flex-wrap">
          {formats.map((f) => (
            <span key={f} className="px-3 py-1 bg-white text-gray-600 text-sm rounded-full border shadow-sm">
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* --- Features grid --- */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Everything you need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-semibold text-gray-800 mb-1">{f.title}</div>
              <div className="text-sm text-gray-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="bg-blue-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to build better tables?</h2>
        <p className="text-blue-100 mb-8">Free forever. No account required. Works in your browser.</p>
        <button onClick={() => navigate('/app')}
          className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 shadow-lg">
          Launch TableCraft →
        </button>
      </section>

      {/* --- Footer --- */}
      <footer className="text-center py-6 text-sm text-gray-400">
        TableCraft — MIT License —{' '}
        <a href="https://github.com/YOUR_USERNAME/tablecraft" className="hover:text-gray-600">GitHub</a>
      </footer>

    </div>
  )
}