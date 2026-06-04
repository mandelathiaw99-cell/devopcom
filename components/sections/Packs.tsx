'use client'

import Link from 'next/link'

const packs = [
  {
    name: 'Starter',
    price: '500€',
    period: '// paiement unique',
    desc: 'Pour démarrer avec une présence web professionnelle.',
    features: [
      'Site vitrine 5 pages',
      'Design responsive',
      'Déploiement Vercel',
      'Formulaire de contact',
      'SEO de base',
    ],
    hot: false,
  },
  {
    name: 'Pro',
    price: '1500€',
    period: '// paiement unique',
    desc: 'Site complet + stratégie com pour les structures ambitieuses.',
    features: [
      'Site Next.js sur-mesure',
      'CMS Sanity intégré',
      'Intégration Stripe',
      'Stratégie réseaux sociaux',
      'Identité visuelle',
      'Formation incluse',
    ],
    hot: true,
  },
  {
    name: 'Studio',
    price: '2500€',
    period: '// sur devis',
    desc: 'Refonte complète + accompagnement stratégique long terme.',
    features: [
      'Audit digital complet',
      'Refonte Next.js from scratch',
      'Dashboard client inclus',
      'Communication 3 mois',
      'Reporting mensuel',
    ],
    hot: false,
  },
  {
    name: 'Retainer',
    price: '400€',
    period: '// par mois',
    desc: 'Suivi mensuel pour maintenir et faire grandir votre digital.',
    features: [
      'Maintenance site',
      '4 posts réseaux/mois',
      'Rapport mensuel',
      'Support prioritaire 48h',
      'Mises à jour sécurité',
    ],
    hot: false,
  },
]

export default function Packs() {
  return (
    <section id="packs" style={{ padding: '112px 56px', background: 'var(--bg2)' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>02 — Tarifs</span>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '52px',
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 300,
          lineHeight: .92, letterSpacing: '-1px', color: 'var(--white)',
        }}>
          Des offres<br />
          <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 600 }}>sans surprise.</em>
        </h2>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--blue-muted)', maxWidth: '320px', lineHeight: 1.8,
          borderLeft: '2px solid var(--gold)', paddingLeft: '14px',
        }}>
          Paiement en 2 ou 3 fois disponible. 50% à la commande, 50% à la livraison.
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '12px',
      }}>
        {packs.map((pack) => (
          <div key={pack.name}
            style={{
              background: pack.hot ? 'var(--bg)' : 'var(--bg3)',
              padding: '38px 30px',
              border: pack.hot ? '1px solid rgba(212,160,23,.35)' : '1px solid rgba(212,160,23,.08)',
              position: 'relative', overflow: 'hidden',
              transition: 'transform .3s, box-shadow .3s',
              boxShadow: pack.hot ? '0 0 40px rgba(212,160,23,.08)' : 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(212,160,23,.12)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = pack.hot ? '0 0 40px rgba(212,160,23,.08)' : 'none'
            }}
          >
            {pack.hot && (
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                padding: '4px 10px', marginBottom: '18px', display: 'inline-block',
                background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                color: 'var(--black)',
              }}>✦ Populaire</div>
            )}

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '28px', fontWeight: 600,
              color: pack.hot ? 'var(--gold3)' : 'var(--gold)',
              letterSpacing: '1px', marginBottom: '6px',
            }}>{pack.name}</div>

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '52px', fontWeight: 600,
              color: 'var(--white)', lineHeight: 1,
            }}>{pack.price}</div>

            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px',
              color: 'var(--blue-muted)', marginBottom: '18px',
            }}>{pack.period}</div>

            <p style={{
              fontSize: '12px', color: 'var(--blue-muted)',
              lineHeight: 1.6, marginBottom: '20px',
            }}>{pack.desc}</p>

            <div style={{ height: '1px', background: 'rgba(212,160,23,.08)', marginBottom: '18px' }} />

            <ul style={{ listStyle: 'none', marginBottom: '28px' }}>
              {pack.features.map(f => (
                <li key={f} style={{
                  fontSize: '12px', color: 'var(--white2)',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(212,160,23,.06)',
                  display: 'flex', gap: '10px',
                }}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0 }}>▸</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="#contact" style={{
              display: 'block', textAlign: 'center', padding: '13px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
              textDecoration: 'none',
              background: pack.hot ? 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)' : 'transparent',
              color: pack.hot ? 'var(--black)' : 'var(--gold)',
              border: pack.hot ? 'none' : '1px solid rgba(212,160,23,.25)',
            }}>
              {pack.name === 'Starter' ? 'Démarrer →' :
               pack.name === 'Pro' ? 'Choisir Pro →' :
               pack.name === 'Studio' ? 'Nous contacter →' : 'Souscrire →'}
            </Link>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '24px', padding: '18px 22px',
        background: 'rgba(212,160,23,.06)',
        border: '1px solid rgba(212,160,23,.12)',
        display: 'flex', gap: '14px', alignItems: 'center',
      }}>
        <p style={{ fontSize: '12px', color: 'var(--blue-muted)', lineHeight: 1.6 }}>
          💳 <strong style={{ color: 'var(--white)' }}>Paiement flexible :</strong> Tous les packs acceptent un échéancier 50/50 ou en 3 fois sur demande. Virement ou Stripe.
        </p>
      </div>
    </section>
  )
}