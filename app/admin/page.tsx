'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Stats {
  totalClients: number
  totalProjects: number
  totalInvoices: number
  pendingInvoices: number
  totalRevenue: number
}

interface Client {
  id: string
  full_name: string
  email: string
  company: string
  created_at: string
}

export default function Admin() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    totalProjects: 0,
    totalInvoices: 0,
    pendingInvoices: 0,
    totalRevenue: 0,
  })
  const [recentClients, setRecentClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      // Vérifier que c'est un admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        router.push('/dashboard')
        return
      }

      // Récupérer les stats
      const { data: clients } = await supabase.from('profiles').select('*').eq('role', 'client')
      const { data: projects } = await supabase.from('projects').select('*')
      const { data: invoices } = await supabase.from('invoices').select('*')

      setStats({
        totalClients: clients?.length || 0,
        totalProjects: projects?.length || 0,
        totalInvoices: invoices?.length || 0,
        pendingInvoices: invoices?.filter(i => i.status === 'pending').length || 0,
        totalRevenue: invoices?.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0) || 0,
      })

      setRecentClients(clients?.slice(0, 5) || [])
      setLoading(false)
    }
    fetchData()
  }, [router])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--gold)', fontStyle: 'italic' }}>Chargement...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* Sidebar Admin */}
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
              color: item.href === '/admin' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/admin' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/admin' ? 'rgba(212,160,23,.04)' : 'transparent',
            }}>{item.label}</Link>
          ))}
        </nav>
        <div style={{ padding: '20px', borderTop: '1px solid rgba(212,160,23,.08)' }}>
          <Link href="/" style={{
            display: 'block', textAlign: 'center', padding: '8px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--blue-muted)', textDecoration: 'none',
            border: '1px solid rgba(212,160,23,.15)',
            marginBottom: '8px',
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

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Administration</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Dashboard <em style={{ color: 'var(--gold)', fontWeight: 600 }}>Admin.</em>
          </h1>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '32px' }}>
          {[
            { val: stats.totalClients, label: 'Clients' },
            { val: stats.totalProjects, label: 'Projets' },
            { val: stats.totalInvoices, label: 'Factures' },
            { val: stats.pendingInvoices, label: 'En attente' },
            { val: stats.totalRevenue + '€', label: 'Revenus' },
          ].map(kpi => (
            <div key={kpi.label} style={{
              background: 'var(--bg2)', padding: '20px',
              border: '1px solid rgba(212,160,23,.08)',
              borderBottom: '2px solid var(--gold)',
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{kpi.val}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--blue-muted)', marginTop: '4px' }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Clients récents */}
        <div style={{ background: 'var(--bg2)', border: '1px solid rgba(212,160,23,.08)', overflow: 'hidden' }}>
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(212,160,23,.08)',
            background: 'rgba(212,160,23,.04)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', opacity: .7 }}>
              Clients récents
            </div>
            <Link href="/admin/clients" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none',
            }}>Voir tous →</Link>
          </div>

          {recentClients.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                Aucun client pour le moment
              </div>
            </div>
          ) : (
            recentClients.map((client, i) => (
              <div key={client.id} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto',
                padding: '16px 24px',
                borderBottom: i < recentClients.length - 1 ? '1px solid rgba(212,160,23,.05)' : 'none',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--white)', fontWeight: 500 }}>{client.full_name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)', marginTop: '2px' }}>{client.email}</div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--blue-muted)' }}>{client.company || '—'}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)' }}>
                  {new Date(client.created_at).toLocaleDateString('fr-FR')}
                </div>
                <Link href={`/admin/clients`} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '1px',
                  padding: '4px 12px', border: '1px solid rgba(212,160,23,.2)',
                  color: 'var(--gold)', textDecoration: 'none', textTransform: 'uppercase',
                }}>Voir →</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}