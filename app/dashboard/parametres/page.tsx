'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Profile {
  full_name: string
  email: string
  company: string
  phone: string
}

export default function Parametres() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [fullName, setFullName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data)
        setFullName(data.full_name || '')
        setCompany(data.company || '')
        setPhone(data.phone || '')
      }
      setLoading(false)
    }
    fetchData()
  }, [router])

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('profiles')
      .update({ full_name: fullName, company, phone })
      .eq('id', user.id)

    setSaving(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--gold)', fontStyle: 'italic' }}>Chargement...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{
        width: '220px', background: 'var(--bg2)',
        borderRight: '1px solid rgba(212,160,23,.08)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(212,160,23,.08)' }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: '14px', fontWeight: 900, letterSpacing: '2px',
            background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1,
          }}>DEVOP</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', letterSpacing: '4px', color: 'var(--gold)', textTransform: 'uppercase', opacity: .7 }}>C · O · M</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Mon projet', href: '/dashboard/projet' },
            { label: 'Factures', href: '/dashboard/factures' },
            { label: 'Messages', href: '/dashboard/messages' },
            { label: 'Documents', href: '/dashboard/documents' },
            { label: 'Paramètres', href: '/dashboard/parametres' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 20px', fontSize: '12px',
              color: item.href === '/dashboard/parametres' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/dashboard/parametres' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/dashboard/parametres' ? 'rgba(212,160,23,.04)' : 'transparent',
            }}>{item.label}</Link>
          ))}
        </nav>
        <div style={{ padding: '20px' }}>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }} style={{
            width: '100%', padding: '10px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--blue-muted)', background: 'transparent',
            border: '1px solid rgba(212,160,23,.15)', cursor: 'pointer',
          }}>Déconnexion</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '220px', flex: 1, padding: '32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Paramètres</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Mon <em style={{ color: 'var(--gold)', fontWeight: 600 }}>profil.</em>
          </h1>
        </div>

        <div style={{ maxWidth: '560px' }}>
          <div style={{ background: 'var(--bg2)', padding: '40px', border: '1px solid rgba(212,160,23,.08)' }}>

            {/* Nom complet */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                Nom complet
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'rgba(212,160,23,.04)',
                  border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)',
                  fontFamily: "'Outfit', sans-serif", fontSize: '14px', outline: 'none',
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                value={profile?.email || ''}
                disabled
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'rgba(212,160,23,.02)',
                  border: '1px solid rgba(212,160,23,.08)',
                  color: 'var(--blue-muted)',
                  fontFamily: "'Outfit', sans-serif", fontSize: '14px', outline: 'none',
                  cursor: 'not-allowed',
                }}
              />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--blue-muted)', marginTop: '4px', letterSpacing: '1px' }}>
                L'email ne peut pas être modifié
              </div>
            </div>

            {/* Entreprise */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                Entreprise / Organisation
              </label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Votre entreprise"
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'rgba(212,160,23,.04)',
                  border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)',
                  fontFamily: "'Outfit', sans-serif", fontSize: '14px', outline: 'none',
                }}
              />
            </div>

            {/* Téléphone */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                Téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+33 6 00 00 00 00"
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'rgba(212,160,23,.04)',
                  border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)',
                  fontFamily: "'Outfit', sans-serif", fontSize: '14px', outline: 'none',
                }}
              />
            </div>

            {/* Success */}
            {success && (
              <div style={{
                padding: '12px 16px', marginBottom: '20px',
                background: 'rgba(34,197,94,.1)',
                border: '1px solid rgba(34,197,94,.2)',
                color: '#22c55e', fontSize: '13px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
              }}>✓ Profil mis à jour avec succès</div>
            )}

            {/* Bouton */}
            <button onClick={handleSave} disabled={saving} style={{
              width: '100%', padding: '14px',
              background: saving ? 'rgba(212,160,23,.5)' : 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              color: 'var(--black)', fontWeight: 600, fontSize: '13px',
              fontFamily: "'Outfit', sans-serif",
              border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              letterSpacing: '1px',
            }}>
              {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}