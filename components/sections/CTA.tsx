'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section style={{
      padding: '112px 56px',
      background: 'var(--bg)',
      borderTop: '1px solid rgba(212,160,23,.08)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(212,160,23,.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Divider top */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '60px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ height: '1px', background: 'var(--gold)', margin: '0 auto 24px', opacity: .4 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '20px',
          }}>On démarre ?</div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(44px, 7vw, 96px)', fontWeight: 300,
            lineHeight: .88, letterSpacing: '-2px', color: 'var(--white)',
            marginBottom: '24px',
          }}>
            Votre projet<br />
            <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>mérite mieux.</em>
          </h2>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--blue-muted)',
            fontStyle: 'italic', lineHeight: 1.7, marginBottom: '48px',
            maxWidth: '500px', margin: '0 auto 48px',
          }}>
            Un call de 30 min, sans engagement, sans jargon. On écoute, on conseille, on construit ensemble.
          </p>
        </motion.div>

        {/* Boutons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(212,160,23,.25)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href="/devis" style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600, fontSize: '14px',
              color: 'var(--black)', textDecoration: 'none',
              padding: '18px 48px',
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
              display: 'inline-block',
            }}>
              Envoyer un message →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, borderColor: 'rgba(212,160,23,.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href="#packs" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--gold)', textDecoration: 'none',
              padding: '18px 32px',
              border: '1px solid rgba(212,160,23,.25)',
              display: 'inline-block',
            }}>
              Voir les tarifs
            </Link>
          </motion.div>
        </motion.div>

        {/* Divider bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '64px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'rgba(138,154,181,.25)',
          }}
        >
          Bordeaux · France · Disponible partout
        </motion.div>
      </div>
    </section>
  )
}