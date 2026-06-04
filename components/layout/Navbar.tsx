'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Tarifs', href: '#packs' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Devis', href: '/devis' },
    { label: 'À propos', href: '#about' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '68px', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,18,32,.97)' : 'rgba(10,18,32,.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212,160,23,.1)',
        transition: 'background .3s',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '17px', fontWeight: 900, letterSpacing: '3px',
            background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', lineHeight: 1,
            filter: 'drop-shadow(0 0 8px rgba(124,58,237,.3))',
          }}>DEVOP</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '7px', letterSpacing: '5px', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>C · O · M</div>
        </Link>

        {/* Liens desktop */}
        <ul style={{
          display: 'flex', gap: '36px', listStyle: 'none',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          margin: 0, padding: 0,
        }} className="nav-desktop">
          {links.map(link => (
            <li key={link.href}>
              <Link href={link.href} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--blue-muted)', textDecoration: 'none',
              }}>{link.label}</Link>
            </li>
          ))}
        </ul>

        {/* Boutons desktop */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} className="nav-desktop">
          <Link href="/auth/login" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--blue-muted)', textDecoration: 'none', padding: '8px 18px',
            border: '1px solid rgba(212,160,23,.2)',
          }}>Se connecter</Link>
          <Link href="/devis" style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600, fontSize: '12px',
            color: 'var(--black)', textDecoration: 'none', padding: '10px 24px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
          }}>Devis gratuit →</Link>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '8px',
          }}>
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold)', transition: 'transform .3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold)', transition: 'opacity .3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold)', transition: 'transform .3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '68px', left: 0, right: 0, zIndex: 199,
          background: 'rgba(10,18,32,.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,160,23,.1)',
          padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {links.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--white)', textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid rgba(212,160,23,.08)',
              }}>{link.label}</Link>
          ))}
          <Link href="/auth/login"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--gold)', textDecoration: 'none',
              padding: '12px 0',
              borderBottom: '1px solid rgba(212,160,23,.08)',
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
      )}

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