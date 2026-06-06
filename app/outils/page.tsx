'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const outils = [
  {
    icon: '🔍',
    title: 'Analyseur de présence digitale',
    description: 'Entrez l\'URL de votre site et obtenez un rapport complet — SEO, performance, et stratégie digitale personnalisée générée par IA.',
    href: '/analyser',
    color: '#d4a017',
    tags: ['SEO', 'Performance', 'Stratégie IA'],
    cta: 'Analyser mon site →',
  },
  {
    icon: '📱',
    title: 'Auditeur de réseaux sociaux',
    description: 'Entrez votre handle Instagram, TikTok, Facebook ou LinkedIn et recevez un audit complet — engagement, contenu et recommandations.',
    href: '/audit-social',
    color: '#f953c6',
    tags: ['Instagram', 'TikTok', 'Engagement'],
    cta: 'Auditer mes réseaux →',
  },
]

export default function Outils() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '68px' }}>

      {/* Header */}
      <div style={{
        padding: '80px 56px 60px',
        borderBottom: '1px solid rgba(212,160,23,.08)',
        background: 'var(--bg2)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)',
            }}>Outils gratuits — Propulsés par IA</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 300,
            lineHeight: .88, letterSpacing: '-2px', color: 'var(--white)', marginBottom: '24px',
          }}>
            Nos outils<br />
            <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>digitaux.</em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--blue-muted)',
            fontStyle: 'italic', maxWidth: '600px', lineHeight: 1.7,
          }}>
            Des outils gratuits propulsés par intelligence artificielle pour analyser et améliorer votre présence digitale.
          </p>
        </motion.div>
      </div>

      {/* Outils */}
      <div style={{ padding: '60px 56px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {outils.map((outil, i) => (
            <motion.div
              key={outil.href}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: `0 24px 64px ${outil.color}15` }}
              style={{
                background: 'var(--bg2)', padding: '40px',
                border: '1px solid rgba(212,160,23,.08)',
                borderTop: `3px solid ${outil.color}`,
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Icon */}
              <div style={{
                width: '64px', height: '64px',
                background: `${outil.color}15`,
                border: `1px solid ${outil.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '24px',
              }}>{outil.icon}</div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {outil.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '3px 8px',
                    background: `${outil.color}15`,
                    color: outil.color,
                    border: `1px solid ${outil.color}33`,
                  }}>{tag}</span>
                ))}
              </div>

              {/* Titre */}
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px', fontWeight: 600,
                color: 'var(--white)', lineHeight: 1.1, marginBottom: '16px',
              }}>{outil.title}</h2>

              {/* Description */}
              <p style={{
                fontSize: '13px', color: 'var(--blue-muted)',
                lineHeight: 1.8, marginBottom: '32px', flex: 1,
              }}>{outil.description}</p>

              {/* Badge gratuit */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '20px',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                  padding: '4px 10px',
                  background: 'rgba(34,197,94,.1)',
                  color: '#22c55e',
                  border: '1px solid rgba(34,197,94,.2)',
                }}>✓ Gratuit</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                  padding: '4px 10px',
                  background: 'rgba(212,160,23,.1)',
                  color: 'var(--gold)',
                  border: '1px solid rgba(212,160,23,.2)',
                }}>⚡ Instantané</div>
              </div>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href={outil.href} style={{
                  display: 'block', textAlign: 'center',
                  fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '13px',
                  color: 'var(--black)', textDecoration: 'none', padding: '14px',
                  background: `linear-gradient(135deg, ${outil.color}, ${outil.color}cc)`,
                }}>{outil.cta}</Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA bas de page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px', padding: '48px',
            background: 'var(--bg2)',
            border: '1px solid rgba(212,160,23,.08)',
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 300,
            color: 'var(--white)', marginBottom: '16px',
          }}>
            Vous voulez aller plus loin ?
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '18px', color: 'var(--blue-muted)', fontStyle: 'italic', marginBottom: '28px',
          }}>
            Nos outils vous donnent les diagnostics — notre équipe vous donne les solutions.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link href="/devis" style={{
              display: 'inline-block',
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
              color: 'var(--black)', textDecoration: 'none', padding: '16px 48px',
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
            }}>Demander un devis gratuit →</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}