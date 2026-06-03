'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      <div style={{
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
      <div style={{
        position: 'absolute', top: '88px', left: '56px',
        width: '80px', height: '80px',
        borderLeft: '1px solid rgba(212,160,23,.15)',
        borderTop: '1px solid rgba(212,160,23,.15)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '80px', right: '56px',
        width: '80px', height: '80px',
        borderRight: '1px solid rgba(212,160,23,.15)',
        borderBottom: '1px solid rgba(212,160,23,.15)',
        pointerEvents: 'none',
      }} />

      {/* Contenu principal */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px 56px 40px', position: 'relative', zIndex: 2,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity .8s ease, transform .8s ease',
      }}>

        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          marginBottom: '32px',
        }}>
          <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, #f5d480, #d4a017)' }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            Agence digitale · Bordeaux · Est. 2026
          </span>
          <div style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: 'var(--gold)',
            animation: 'blink 2s ease-in-out infinite',
          }} />
        </div>

        {/* Titre */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(72px, 11vw, 160px)',
          fontWeight: 300, lineHeight: .88, letterSpacing: '-2px',
          marginBottom: 0,
        }}>
          <span style={{ color: 'var(--white)', display: 'block' }}>VOTRE</span>
          <span style={{
            color: 'transparent',
            WebkitTextStroke: '1px rgba(232,228,220,.12)',
            display: 'block',
          }}>DIGITAL</span>
          <span style={{
            color: 'var(--gold)',
            fontStyle: 'italic', fontWeight: 600,
          }}>DE A À Z.</span>
        </h1>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center',
          margin: '32px 0 28px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #b8903f, #d4a017)' }} />
          <div style={{
            width: '8px', height: '8px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
            transform: 'rotate(45deg)',
            boxShadow: '0 0 10px rgba(212,160,23,.4)',
            flexShrink: 0, margin: '0 2px',
          }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #d4a017, #b8903f, transparent)' }} />
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '20px', fontWeight: 400, lineHeight: 1.7,
            color: 'var(--blue-muted)', maxWidth: '440px', fontStyle: 'italic',
          }}>
            <strong style={{ fontStyle: 'normal', fontWeight: 600, color: 'var(--white)' }}>
              Développement web Next.js, communication digitale, stratégie.
            </strong>
            <br />
            On code votre présence, on la fait rayonner — du premier pixel au dernier clic.
          </p>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <Link href="#packs" style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600, fontSize: '14px',
              color: 'var(--black)', textDecoration: 'none', padding: '17px 40px',
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              boxShadow: '0 8px 32px rgba(212,160,23,.25)',
              display: 'inline-block',
            }}>
              Voir les offres →
            </Link>
            <Link href="#services" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--blue-muted)', textDecoration: 'none', padding: '15px 28px',
              border: '1px solid rgba(212,160,23,.2)',
            }}>
              Nos services
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'flex',
        borderTop: '1px solid rgba(212,160,23,.08)',
      }}>
        {[
          { n: '10+', l: 'Projets livrés' },
          { n: '95+', l: 'Score Lighthouse' },
          { n: '3', l: 'Secteurs' },
          { n: '100%', l: 'Sur-mesure' },
          { n: '48h', l: 'Réponse garantie' },
        ].map((stat) => (
          <div key={stat.l} style={{
            flex: 1, padding: '26px 32px',
            borderRight: '1px solid rgba(212,160,23,.08)',
            background: 'var(--bg)',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '44px', fontWeight: 600,
              color: 'var(--gold)', lineHeight: 1,
            }}>{stat.n}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--blue-muted)',
              marginTop: '4px',
            }}>{stat.l}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .2; }
        }
      `}</style>
    </section>
  )
}