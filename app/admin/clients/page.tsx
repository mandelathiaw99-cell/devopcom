'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Client {
  id: string
  full_name: string
  email: string
  company: string
  phone: string
  created_at: string
}

export default function AdminClients() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') { router.push('/dashboard'); return }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false })

      setClients(data || [])
      setLoading(false)
    }
    fetchData()
  }, [router])

  const filtered = clients.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase())
  )

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
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', letterSpacing: '4px', color: 'var(--gold)', textTransform: 'uppercase', opacity: .7 }}>C · O · M · ADMIN</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {[
            { label: 'Dashboard', href: '/admin' },
            { label: 'Clients', href: '/admin/clients' },
            { label: 'Projets', href: '/admin/projets' },
            { label: 'Factures', href: '/admin/factures' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 20px', fontSize: '12px',
              color: item.href === '/admin/clients' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/admin/clients' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/admin/clients' ? 'rgba(212,160,23,.04)' : 'transparent',
            }}>{item.label}</Link>
          ))}
        </nav>
        <div style={{ padding: '20px', borderTop: '1px solid rgba(212,160,23,.08)' }}>
          <Link href="/" style={{
            display: 'block', textAlign: 'center', padding: '8px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--blue-muted)', textDecoration: 'none',
            border: '1px solid rgba(212,160,23,.15)', marginBottom: '8px',
          }}>← Site public</Link>
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
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Administration</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Mes <em style={{ color: 'var(--gold)', fontWeight: 600 }}>clients.</em>
          </h1>
        </div>

        {/* Recherche */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un client..."
            style={{
              width: '100%', maxWidth: '400px', padding: '12px 16px',
              background: 'var(--bg2)',
              border: '1px solid rgba(212,160,23,.15)',
              color: 'var(--white)',
              fontFamily: "'Outfit', sans-serif", fontSize: '14px', outline: 'none',
            }}
          />
        </div>

        {/* Liste clients */}
        <div style={{ background: 'var(--bg2)', border: '1px solid rgba(212,160,23,.08)', overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
            padding: '14px 24px',
            borderBottom: '1px solid rgba(212,160,23,.08)',
            background: 'rgba(212,160,23,.04)',
          }}>
            {['Nom', 'Email', 'Entreprise', 'Inscrit le'].map(h => (
              <div key={h} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', opacity: .7 }}>{h}</div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                Aucun client trouvé
              </div>
            </div>
          ) : (
            filtered.map((client, i) => (
              <div key={client.id} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                padding: '16px 24px',
                borderBottom: i < filtered.length - 1 ? '1px solid rgba(212,160,23,.05)' : 'none',
                alignItems: 'center',
                transition: 'background .2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,160,23,.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ fontSize: '13px', color: 'var(--white)', fontWeight: 500 }}>{client.full_name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--blue-muted)' }}>{client.email}</div>
                <div style={{ fontSize: '12px', color: 'var(--blue-muted)' }}>{client.company || '—'}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)' }}>
                  {new Date(client.created_at).toLocaleDateString('fr-FR')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}