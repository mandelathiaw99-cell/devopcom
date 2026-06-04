'use client'

import { motion } from 'framer-motion'

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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)',
        }}>04 — À propos</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '52px', alignItems: 'start',
      }}>

        {/* Gauche */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(44px, 5vw, 68px)', fontWeight: 300,
            lineHeight: .92, marginBottom: '24px', letterSpacing: '-1px', color: 'var(--white)',
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

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginTop: '28px' }}>
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ borderColor: 'rgba(212,160,23,.5)', color: 'var(--gold)' }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                  padding: '5px 12px',
                  border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--blue-muted)',
                  cursor: 'default',
                }}>{tag}</motion.span>
            ))}
          </div>
        </motion.div>

        {/* Droite — Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={!card.full ? {
                borderColor: 'rgba(212,160,23,.25)',
                boxShadow: '0 8px 32px rgba(212,160,23,.07)',
              } : {}}
              style={{
                gridColumn: card.full ? 'span 2' : 'span 1',
                background: card.full
                  ? 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)'
                  : 'var(--bg3)',
                padding: '28px 24px',
                border: card.full ? 'none' : '1px solid rgba(212,160,23,.08)',
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}