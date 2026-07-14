import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg2)',
      padding: '52px 56px',
      borderTop: '1px solid rgba(212,160,23,.08)',
    }}>

      {/* Top */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
        gap: '48px', marginBottom: '44px',
        paddingBottom: '44px',
        borderBottom: '1px solid rgba(212,160,23,.08)',
      }}>

        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '18px', fontWeight: 900,
            background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', letterSpacing: '3px', marginBottom: '3px',
          }}>DEVOP</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '7px', letterSpacing: '5px',
            color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '14px',
          }}>C · O · M</div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px', letterSpacing: '2px',
            color: 'rgba(138,154,181,.4)', textTransform: 'uppercase', lineHeight: 1.8,
          }}>
            Votre digital, de A à Z.<br />
            Bordeaux · France · Est. 2026
          </p>
        </div>

        {/* Services */}
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--gold)', opacity: .7, marginBottom: '18px',
          }}>Services</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Développement Web', href: '/#services' },
              { label: 'Communication', href: '/#services' },
              { label: 'Identité Visuelle', href: '/#services' },
              { label: 'E-commerce', href: '/#services' },
              { label: 'Consulting', href: '/#services' },
            ].map(s => (
              <li key={s.label}>
                <Link href={s.href} style={{
                  fontSize: '12px', color: 'var(--blue-muted)',
                  textDecoration: 'none',
                }}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Informations */}
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--gold)', opacity: .7, marginBottom: '18px',
          }}>Informations</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'À propos', href: '/#about' },
              { label: 'Tarifs', href: '/#tarifs' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/devis' },
            ].map(s => (
              <li key={s.label}>
                <Link href={s.href} style={{
                  fontSize: '12px', color: 'var(--blue-muted)',
                  textDecoration: 'none',
                }}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--gold)', opacity: .7, marginBottom: '18px',
          }}>Légal</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Mentions légales', href: '/mentions-legales' },
              { label: 'CGV', href: '/cgv' },
              { label: 'CGU', href: '/cgu' },
              { label: 'RGPD', href: '/rgpd' },
            ].map(s => (
              <li key={s.label}>
                <Link href={s.href} style={{
                  fontSize: '12px', color: 'var(--blue-muted)',
                  textDecoration: 'none',
                }}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '8px', letterSpacing: '2px',
          color: 'rgba(138,154,181,.25)', textTransform: 'uppercase',
        }}>
          © 2026 DevopCom — Entrepreneur individuel · SIREN 107 384 620
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { label: 'in', href: 'https://linkedin.com' },
            { label: 'ig', href: 'https://instagram.com' },
            { label: 'gh', href: 'https://github.com/mandelathiaw99-cell/devopcom' },
          ].map(s => (
            <Link key={s.label} href={s.href} target="_blank" style={{
              width: '32px', height: '32px',
              border: '1px solid rgba(212,160,23,.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', textDecoration: 'none',
              color: 'var(--blue-muted)',
            }}>{s.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}