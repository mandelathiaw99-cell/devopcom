'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: '68px', padding: '0 56px',
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

      {/* Liens centre */}
      <ul style={{
        display: 'flex', gap: '36px', listStyle: 'none',
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
      }}>
        {[
          { label: 'Services', href: '#services' },
          { label: 'Tarifs', href: '#packs' },
          { label: 'Dashboard', href: '#dashboard' },
          { label: 'À propos', href: '#about' },
        ].map((link) => (
          <li key={link.href}>
            <Link href={link.href} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--blue-muted)', textDecoration: 'none',
              transition: 'color .2s',
            }}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Boutons droite */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Link href="/dashboard" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--blue-muted)', textDecoration: 'none', padding: '8px 18px',
          border: '1px solid rgba(212,160,23,.2)',
          transition: 'border-color .2s, color .2s',
        }}>
          Se connecter
        </Link>
        <Link href="#contact" style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600, fontSize: '12px',
          color: 'var(--black)', textDecoration: 'none', padding: '10px 24px',
          background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
        }}>
          Démarrer →
        </Link>
      </div>
    </nav>
  )
}