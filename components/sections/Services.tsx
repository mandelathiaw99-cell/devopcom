'use client'

const services = [
  {
    num: '01',
    icon: '⬡',
    title: 'Développement Web',
    desc: 'Sites vitrine, plateformes, web apps. Code propre, architecture solide, déploiement rapide. Zéro template.',
    tags: ['Next.js 14', 'React', 'Tailwind', 'TypeScript', 'Vercel'],
  },
  {
    num: '02',
    icon: '◈',
    title: 'Communication Digitale',
    desc: 'Stratégie éditoriale, gestion réseaux sociaux, création de contenus visuels percutants. Votre voix, amplifiée.',
    tags: ['Instagram', 'TikTok', 'Carrousels', 'Copywriting'],
  },
  {
    num: '03',
    icon: '◇',
    title: 'Identité Visuelle',
    desc: 'Logo, charte graphique, supports print et digitaux. Une identité cohérente qui inspire confiance.',
    tags: ['Logo', 'Charte', 'Flyers', 'Motion'],
  },
  {
    num: '04',
    icon: '⬟',
    title: 'E-commerce & Paiements',
    desc: 'Boutiques en ligne, billetterie, abonnements. Du clic à la conversion, zéro friction.',
    tags: ['Stripe', 'Supabase', 'Sanity', 'Auth'],
  },
  {
    num: '05',
    icon: '○',
    title: 'Consulting & Stratégie',
    desc: 'Audit digital, recommandations, accompagnement sur-mesure. On analyse, on trace la route.',
    tags: ['Audit', 'Stratégie', 'KPIs', 'Reporting'],
  },
  {
    num: '06',
    icon: '△',
    title: 'Maintenance & Retainer',
    desc: 'Suivi mensuel, mises à jour, optimisation continue. Votre digital entre de bonnes mains.',
    tags: ['Updates', 'SEO', 'Perf', 'Support'],
  },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: '112px 56px', background: 'var(--bg)' }}>

      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>01 — Services</span>
      </div>

      {/* Titre */}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 300,
        lineHeight: .92, marginBottom: '56px', letterSpacing: '-1px',
        color: 'var(--white)',
      }}>
        Ce qu'on fait <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 600 }}>vraiment.</em>
      </h2>

      {/* Grille */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px', background: 'rgba(212,160,23,.06)',
      }}>
        {services.map((svc) => (
          <div key={svc.num} style={{
            background: 'var(--bg2)', padding: '48px 40px',
            position: 'relative', overflow: 'hidden',
            transition: 'background .3s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg3)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg2)')}
          >
            {/* Numéro décoratif */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '80px', fontWeight: 600,
              color: 'rgba(212,160,23,.05)',
              position: 'absolute', bottom: '-12px', right: '16px',
              lineHeight: 1, pointerEvents: 'none',
            }}>{svc.num}</div>

            {/* Icône */}
            <div style={{
              width: '44px', height: '44px', marginBottom: '24px',
              background: 'rgba(212,160,23,.08)',
              border: '1px solid rgba(212,160,23,.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
            }}>{svc.icon}</div>

            {/* Titre */}
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '24px', fontWeight: 600,
              color: 'var(--gold)', marginBottom: '14px', lineHeight: 1.1,
            }}>{svc.title}</h3>

            {/* Description */}
            <p style={{
              fontSize: '13px', color: 'var(--blue-muted)',
              lineHeight: 1.8, marginBottom: '24px',
            }}>{svc.desc}</p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {svc.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px', letterSpacing: '1px',
                  padding: '3px 8px',
                  border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--blue-muted)',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}