'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Services', href: '/#services' },
    { label: 'Tarifs', href: '/#packs' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Outils', href: '/outils' },
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '68px', padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,13,24,.98)' : 'rgba(6,13,24,.85)',
        backdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(212,160,23,.15)' : '1px solid rgba(212,160,23,.06)',
        transition: 'all .4s ease',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,.3)' : 'none',
      }}>

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '18px', fontWeight: 900, letterSpacing: '4px',
              background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', lineHeight: 1,
              filter: 'drop-shadow(0 0 12px rgba(124,58,237,.4))',
            }}>DEVOP</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '7px', letterSpacing: '6px', textTransform: 'uppercase',
              color: 'var(--gold)', opacity: .8,
            }}>C · O · M</div>
          </Link>
        </motion.div>

        {/* Liens desktop */}
        <ul style={{
          display: 'flex', gap: '4px', listStyle: 'none',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          margin: 0, padding: 0,
        }} className="nav-desktop">
          {links.map(link => (
            <li key={link.href} style={{ position: 'relative' }}>
              <Link href={link.href} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                color: isActive(link.href) ? 'var(--gold)' : 'var(--blue-muted)',
                textDecoration: 'none',
                padding: '8px 14px',
                display: 'block',
                position: 'relative',
                transition: 'color .2s ease',
              }}
                onMouseEnter={e => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = 'var(--white)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(link.href)) {
                    e.currentTarget.style.color = 'var(--blue-muted)'
                  }
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeLink"
                    style={{
                      position: 'absolute', bottom: '2px', left: '14px', right: '14px',
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, #d4a017, transparent)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Boutons desktop */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} className="nav-desktop">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/auth/login" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--blue-muted)', textDecoration: 'none', padding: '9px 18px',
              border: '1px solid rgba(212,160,23,.2)',
              transition: 'all .2s ease',
              display: 'block',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212,160,23,.5)'
                e.currentTarget.style.color = 'var(--gold)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(212,160,23,.2)'
                e.currentTarget.style.color = 'var(--blue-muted)'
              }}
            >Se connecter</Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(212,160,23,.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href="/devis" style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600, fontSize: '12px',
              color: 'var(--black)', textDecoration: 'none', padding: '10px 24px',
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              display: 'block',
            }}>Devis gratuit →</Link>
          </motion.div>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px',
          }}>
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold)', originX: 0.5 }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold)' }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold)', originX: 0.5 }}
          />
        </button>
      </nav>

      {/* Menu mobile */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 199,
          background: 'rgba(6,13,24,.98)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(212,160,23,.1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                color: isActive(link.href) ? 'var(--gold)' : 'rgba(138,154,181,.7)',
                textDecoration: 'none',
                padding: '14px 16px',
                borderBottom: '1px solid rgba(212,160,23,.06)',
                borderLeft: isActive(link.href) ? '2px solid var(--gold)' : '2px solid transparent',
                background: isActive(link.href) ? 'rgba(212,160,23,.04)' : 'transparent',
              }}>{link.label}</Link>
          ))}
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/auth/login"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--gold)', textDecoration: 'none',
                padding: '12px 16px', textAlign: 'center',
                border: '1px solid rgba(212,160,23,.25)',
              }}>Se connecter</Link>
            <Link href="/devis"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600, fontSize: '13px',
                color: 'var(--black)', textDecoration: 'none',
                padding: '14px', textAlign: 'center',
                background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              }}>Devis gratuit →</Link>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
          .nav-desktop { display: flex !important; }
        }
      `}</style>
    </>
  )
}