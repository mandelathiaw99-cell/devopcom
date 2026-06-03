'use client'

const tags = [
  'Next.js', 'Tailwind', 'Supabase', 'Stripe',
  'Sanity', 'Framer Motion', 'Vercel', 'SEO',
]

const cards = [
  {
    title: 'Développement',
    desc: 'Next.js · React · Tailwind · Supabase · Stripe · Vercel',
    full: false,
  },
  {
    title: 'Communication',
    desc: 'Stratégie éditoriale · Réseaux sociaux · Identité visuelle',
    full: false,
  },
  {
    title: 'Bordeaux 🇫🇷 — Disponible partout',
    desc: 'Télétravail, déplacements, clients internationaux. La distance ne change rien à la qualité.',
    full: true,
  },
]

export default function About() {
  return (
    <section id="about" style={{
      padding: '112px 56px',
      background: 'var(--bg2)',
      borderTop: '1px solid rgba(212,160,23,.08)',
    }}>

      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>04 — À propos</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>

        {/* Gauche */}
        <div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(44px, 5vw, 68px)', fontWeight: 300,
            lineHeight: .92, marginBottom: '24px', letterSpacing: '-1px',
            color: 'var(--white)',
          }}>
            Pas une agence.<br />
            Un <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 600 }}>partenaire.</em>
          </h2>

          <p style={{ fontSize: '14px', color: 'var(--blue-muted)', lineHeight: 1.85, marginBottom: '14px' }}>
            DevopCom, c'est l'expertise d'un professionnel qui maîtrise autant le code que la communication. Pas de sous-traitance, pas de template, pas de blabla.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--blue-muted)', lineHeight: 1.85, marginBottom: '14px' }}>
            Basé à Bordeaux, actif partout. On travaille avec des associations, institutions, PME et startups qui veulent un digital à leur hauteur.
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: '28px' }}>
            {tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                padding: '5px 12px',
                border: '1px solid rgba(212,160,23,.15)',
                color: 'var(--blue-muted)',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Droite — Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {cards.map(card => (
            <div key={card.title} style={{
              gridColumn: card.full ? 'span 2' : 'span 1',
              background: card.full
                ? 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)'
                : 'var(--bg3)',
              padding: '28px 24px',
              border: card.full ? 'none' : '1px solid rgba(212,160,23,.08)',
              transition: 'border-color .3s, box-shadow .3s',
            }}
              onMouseEnter={e => {
                if (!card.full) {
                  e.currentTarget.style.borderColor = 'rgba(212,160,23,.25)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,160,23,.07)'
                }
              }}
              onMouseLeave={e => {
                if (!card.full) {
                  e.currentTarget.style.borderColor = 'rgba(212,160,23,.08)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px', fontWeight: 600,
                color: card.full ? 'var(--black)' : 'var(--gold)',
                marginBottom: '6px',
              }}>{card.title}</div>
              <p style={{
                fontSize: '11px',
                color: card.full ? 'rgba(6,13,24,.7)' : 'var(--blue-muted)',
                lineHeight: 1.6,
              }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}