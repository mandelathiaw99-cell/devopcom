'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: '01', title: 'Découverte',
    desc: 'Un call de 30 min pour cerner vos objectifs, cible et budget. On pose les bases ensemble, sans jargon.',
  },
  {
    num: '02', title: 'Stratégie & Devis',
    desc: 'Proposition claire : architecture, design, planning. Devis détaillé sous 48h. Aucune surprise.',
  },
  {
    num: '03', title: 'Production',
    desc: 'On code, on crée, on produit. Dashboard client pour suivre l\'avancement en temps réel.',
  },
  {
    num: '04', title: 'Livraison & Suivi',
    desc: 'Mise en ligne, formation, documentation. Votre site est live — on reste disponibles.',
  },
]

export default function Process() {
  return (
    <section style={{ padding: '112px 56px', background: 'var(--bg)' }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)',
          }}>03 — Process</span>
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 300,
          lineHeight: .92, marginBottom: '56px', letterSpacing: '-1px', color: 'var(--white)',
        }}>
          Simple.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 600 }}>Efficace.</em>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1px',
        background: 'rgba(212,160,23,.06)',
      }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ backgroundColor: 'var(--bg3)' }}
            style={{
              background: 'var(--bg2)', padding: '48px 36px',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '96px', fontWeight: 600,
              color: 'rgba(212,160,23,.05)',
              position: 'absolute', top: 0, right: '8px',
              lineHeight: 1, pointerEvents: 'none',
            }}>{step.num}</div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '32px' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
              style={{ height: '2px', background: 'rgba(212,160,23,.2)', marginBottom: '28px' }}
            />

            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '22px', fontWeight: 600,
              color: 'var(--gold)', marginBottom: '12px',
            }}>{step.title}</h3>

            <p style={{ fontSize: '13px', color: 'var(--blue-muted)', lineHeight: 1.7 }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}