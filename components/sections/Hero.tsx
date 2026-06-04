'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [counts, setCounts] = useState({ projets: 0, score: 0, secteurs: 0, taux: 0 })

  useEffect(() => {
    setMounted(true)

    // Compteurs animés
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const ease = 1 - Math.pow(1 - progress, 3)
      setCounts({
        projets: Math.floor(ease * 10),
        score: Math.floor(ease * 95),
        secteurs: Math.floor(ease * 3),
        taux: Math.floor(ease * 100),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    })
  }

  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: '68px',
      display: 'grid',
      gridTemplateRows: '1fr auto',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg2)',
    }}>

      {/* Background mesh */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(212,160,23,.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 10% 80%, rgba(124,58,237,.06) 0%, transparent 55%),
            radial-gradient(ellipse 30% 30% at 50% 50%, rgba(6,182,212,.04) 0%, transparent 50%)
          `,
        }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .4,
        backgroundImage: `
          linear-gradient(rgba(212,160,23,.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,160,23,.04) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 100%)',
      }} />

      {/* Ornements coins */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="hero-orn"
        style={{
          position: 'absolute', top: '88px', left: '56px',
          width: '80px', height: '80px',
          borderLeft: '1px solid rgba(212,160,23,.15)',
          borderTop: '1px solid rgba(212,160,23,.15)',
          pointerEvents: 'none',
        }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="hero-orn"
        style={{
          position: 'absolute', bottom: '80px', right: '56px',
          width: '80px', height: '80px',
          borderRight: '1px solid rgba(212,160,23,.15)',
          borderBottom: '1px solid rgba(212,160,23,.15)',
          pointerEvents: 'none',
        }} />

      {/* Contenu principal */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(24px, 5vw, 80px) clamp(20px, 5vw, 56px) 40px',
        position: 'relative', zIndex: 2,
      }}>

        {/* Eyebrow */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}
        >
          <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, #f5d480, #d4a017)', flexShrink: 0 }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(7px, 1.5vw, 9px)', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>Agence digitale · Bordeaux · Est. 2026</span>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }}
          />
        </motion.div>

        {/* Titre */}
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(56px, 12vw, 160px)',
            fontWeight: 300, lineHeight: .88, letterSpacing: '-2px', marginBottom: 0,
          }}
        >
          <span style={{ color: 'var(--white)', display: 'block' }}>VOTRE</span>
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(232,228,220,.12)', display: 'block' }}>DIGITAL</span>
          <motion.span
            initial={{ backgroundPosition: '200% center' }}
            animate={{ backgroundPosition: '0% center' }}
            transition={{ delay: 0.8, duration: 1.5 }}
            style={{ color: 'var(--gold)', fontStyle: 'italic', fontWeight: 600 }}
          >DE A À Z.</motion.span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          style={{ display: 'flex', alignItems: 'center', margin: '24px 0 20px' }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #b8903f, #d4a017)' }} />
          <motion.div
            animate={{ rotate: [45, 90, 45] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '8px', height: '8px',
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 10px rgba(212,160,23,.3)',
              flexShrink: 0, margin: '0 2px',
            }}
          />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #d4a017, #b8903f, transparent)' }} />
        </motion.div>

        {/* Description + CTA */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 400, lineHeight: 1.7,
            color: 'var(--blue-muted)', fontStyle: 'italic', marginBottom: '24px',
          }}>
            <strong style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--white)' }}>
              Développement web Next.js, communication digitale, stratégie.
            </strong>
            <br />
            On code votre présence, on la fait rayonner — du premier pixel au dernier clic.
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { href: '#packs', label: 'Voir les offres →', bg: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)', color: 'var(--black)', shadow: 'rgba(212,160,23,.3)' },
              { href: '/devis', label: 'Devis gratuit →', bg: 'linear-gradient(135deg, #f953c6, #7c3aed, #2563eb)', color: 'var(--white)', shadow: 'rgba(124,58,237,.3)' },
              { href: '#services', label: 'Nos services →', bg: 'linear-gradient(135deg, #06b6d4, #0284c7, #1d4ed8)', color: 'var(--white)', shadow: 'rgba(6,182,212,.3)' },
            ].map((btn, i) => (
              <motion.div
                key={btn.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: `0 12px 40px ${btn.shadow}` }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href={btn.href} style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600, fontSize: 'clamp(12px, 2vw, 14px)',
                  color: btn.color, textDecoration: 'none',
                  padding: 'clamp(12px, 2vw, 17px) clamp(24px, 4vw, 40px)',
                  background: btn.bg,
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                  display: 'inline-block',
                }}>{btn.label}</Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ display: 'flex', borderTop: '1px solid rgba(212,160,23,.08)', overflowX: 'auto' }}
      >
        {[
          { n: counts.projets + '+', l: 'Projets livrés' },
          { n: counts.score + '+', l: 'Score Lighthouse' },
          { n: counts.secteurs + '', l: 'Secteurs' },
          { n: counts.taux + '%', l: 'Sur-mesure' },
          { n: '48h', l: 'Réponse garantie' },
        ].map((stat, i) => (
          <motion.div
            key={stat.l}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 + i * 0.1 }}
            style={{
              flex: '1 0 auto', padding: 'clamp(16px, 3vw, 26px) clamp(16px, 3vw, 32px)',
              borderRight: '1px solid rgba(212,160,23,.08)',
              background: 'var(--bg)', minWidth: '80px',
            }}
          >
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600,
              color: 'var(--gold)', lineHeight: 1,
            }}>{stat.n}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(7px, 1vw, 8px)', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--blue-muted)', marginTop: '4px',
            }}>{stat.l}</div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-orn { display: none !important; }
        }
      `}</style>
    </section>
  )
}