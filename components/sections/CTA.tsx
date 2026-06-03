import Link from 'next/link'

export default function CTA() {
  return (
    <section id="contact" style={{
      padding: '120px 56px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg)',
      borderTop: '1px solid rgba(212,160,23,.1)',
    }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,160,23,.06) 0%, transparent 70%)',
      }} />

      {/* Filigrane */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '180px', fontWeight: 600,
        color: 'rgba(212,160,23,.03)',
        whiteSpace: 'nowrap', pointerEvents: 'none',
        letterSpacing: '10px',
      }}>DevopCom</div>

      {/* Label */}
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '14px', marginBottom: '24px',
      }}>
        <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #f5d480, #d4a017)' }} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
          color: 'var(--gold)',
        }}>Prêt à démarrer ?</span>
        <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, #d4a017, #f5d480)' }} />
      </div>

      {/* Titre */}
      <h2 style={{
        position: 'relative',
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        fontSize: 'clamp(72px, 11vw, 150px)',
        color: 'var(--white)',
        lineHeight: .88, marginBottom: '20px', letterSpacing: '-2px',
      }}>
        ON<br />
        <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 600 }}>DÉMARRE ?</em>
      </h2>

      {/* Sous-titre */}
      <p style={{
        position: 'relative',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '18px', fontStyle: 'italic',
        color: 'var(--blue-muted)', marginBottom: '44px',
      }}>
        Un projet en tête ? On en parle en 30 min — sans engagement, sans jargon.
      </p>

      {/* Boutons */}
      <div style={{
        position: 'relative',
        display: 'flex', gap: '14px', justifyContent: 'center',
      }}>
        <Link href="mailto:contact@devopcom.fr" style={{
          background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
          color: 'var(--black)', padding: '18px 48px',
          fontWeight: 600, fontSize: '14px',
          textDecoration: 'none',
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
          boxShadow: '0 8px 32px rgba(212,160,23,.2)',
          display: 'inline-block',
          fontFamily: "'Outfit', sans-serif",
        }}>
          Envoyer un message →
        </Link>
        <Link href="#packs" style={{
          border: '1px solid rgba(212,160,23,.3)',
          color: 'var(--gold)', padding: '18px 48px',
          fontSize: '13px', textDecoration: 'none',
          display: 'inline-block',
          fontFamily: "'Outfit', sans-serif",
          transition: 'border-color .2s, background .2s',
        }}>
          Voir les tarifs
        </Link>
      </div>
    </section>
  )
}