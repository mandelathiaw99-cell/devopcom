'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email ou mot de passe incorrect')
      setLoading(false)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
      }
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>

      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'var(--bg2)',
        border: '1px solid rgba(212,160,23,.15)',
        padding: '48px 40px',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '22px', fontWeight: 900, letterSpacing: '3px',
            background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>DEVOP</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '7px', letterSpacing: '5px', textTransform: 'uppercase',
            color: 'var(--gold)', marginTop: '2px',
          }}>C · O · M</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '14px', color: 'var(--blue-muted)',
            marginTop: '16px', fontStyle: 'italic',
          }}>Connectez-vous à votre espace client</div>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', marginBottom: '32px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,160,23,.3))' }} />
          <div style={{ width: '6px', height: '6px', background: 'var(--gold)', transform: 'rotate(45deg)', margin: '0 12px' }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(212,160,23,.3), transparent)' }} />
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--gold)', display: 'block', marginBottom: '8px',
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(212,160,23,.04)',
                border: '1px solid rgba(212,160,23,.15)',
                color: 'var(--white)',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px', outline: 'none',
              }}
            />
          </div>

          {/* Mot de passe */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--gold)', display: 'block', marginBottom: '8px',
            }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(212,160,23,.04)',
                border: '1px solid rgba(212,160,23,.15)',
                color: 'var(--white)',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px', outline: 'none',
              }}
            />
          </div>

          {/* Erreur */}
          {error && (
            <div style={{
              padding: '12px 16px', marginBottom: '20px',
              background: 'rgba(239,68,68,.1)',
              border: '1px solid rgba(239,68,68,.2)',
              color: '#ef4444', fontSize: '13px',
            }}>{error}</div>
          )}

          {/* Bouton */}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? 'rgba(212,160,23,.5)' : 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
            color: 'var(--black)', fontWeight: 600, fontSize: '13px',
            fontFamily: "'Outfit', sans-serif",
            border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '1px',
          }}>
            {loading ? 'Connexion...' : 'Se connecter →'}
          </button>
        </form>

        {/* Lien inscription */}
        <div style={{
          textAlign: 'center', marginTop: '24px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '2px',
          color: 'var(--blue-muted)',
        }}>
          Pas encore de compte ?{' '}
          <Link href="/auth/inscription" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            S'inscrire
          </Link>
        </div>

        {/* Retour accueil */}
        <div style={{
          textAlign: 'center', marginTop: '12px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px', letterSpacing: '2px',
        }}>
          <Link href="/" style={{ color: 'var(--blue-muted)', textDecoration: 'none' }}>
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}