export default function Marquee() {
  const items = [
    'Next.js 14', 'Développement Web', 'Communication Digitale',
    'Stripe Payments', 'Sanity CMS', 'Réseaux Sociaux',
    'Identité Visuelle', 'Supabase', 'Vercel Deploy',
    'Dashboard Client', 'SEO Technique', 'Framer Motion',
  ]

  return (
    <div style={{
      overflow: 'hidden', padding: '12px 0',
      borderTop: '1px solid rgba(212,160,23,.08)',
      borderBottom: '1px solid rgba(212,160,23,.08)',
      background: 'var(--bg2)',
    }}>
      <div style={{
        display: 'flex', width: 'max-content',
        animation: 'scroll 32s linear infinite',
      }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'rgba(138,154,181,.4)', padding: '0 28px', whiteSpace: 'nowrap',
          }}>
            <span style={{ color: 'var(--gold)', marginRight: '28px' }}>✦</span>
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}