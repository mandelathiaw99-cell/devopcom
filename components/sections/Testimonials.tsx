const testimonials = [
  {
    quote: 'Une refonte complète en un temps record. Le résultat dépasse largement nos attentes — design, performance, tout y est.',
    name: 'Association ABESS',
    role: 'Bordeaux · Association étudiante',
    initial: 'A',
  },
  {
    quote: 'Mandela comprend à la fois le technique et la communication. C\'est rare. Il a traduit notre vision en quelque chose de concret.',
    name: 'EasyTud',
    role: 'Bordeaux · Startup étudiante',
    initial: 'E',
  },
  {
    quote: 'Sérieux, réactif, créatif. Notre présence digitale a été entièrement repensée et les retours sont unanimement positifs.',
    name: 'Consulat Général du Sénégal',
    role: 'Bordeaux · Institution officielle',
    initial: 'C',
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: '112px 56px', background: 'var(--bg2)' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>05 — Ils nous font confiance</span>
      </div>

      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 300,
        lineHeight: .92, marginBottom: '56px', letterSpacing: '-1px',
        color: 'var(--white)',
      }}>
        Ce qu'ils <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 600 }}>disent.</em>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '14px',
      }}>
        {testimonials.map((t) => (
          <div key={t.name} style={{
            background: 'var(--bg3)', padding: '36px 30px',
            border: '1px solid rgba(212,160,23,.08)',
            position: 'relative', overflow: 'hidden',
            borderTop: '2px solid var(--gold)',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '56px', fontWeight: 600,
              color: 'var(--gold)', lineHeight: .8,
              marginBottom: '16px', opacity: .4,
            }}>"</div>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px', color: 'var(--white2)',
              lineHeight: 1.7, fontStyle: 'italic', marginBottom: '22px',
            }}>{t.quote}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px', fontWeight: 600, color: 'var(--black)',
                flexShrink: 0,
              }}>{t.initial}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white)' }}>{t.name}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px', letterSpacing: '1px',
                  color: 'var(--blue-muted)', textTransform: 'uppercase', marginTop: '2px',
                }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}