'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Invoice {
  id: string
  amount: number
  status: string
  due_date: string
  paid_at: string
  created_at: string
}

export default function Factures() {
  const router = useRouter()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data } = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })

      setInvoices(data || [])
      setLoading(false)
    }
    fetchData()
  }, [router])

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente'
      case 'paid': return 'Payée'
      case 'overdue': return 'En retard'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#d4a017'
      case 'paid': return '#22c55e'
      case 'overdue': return '#ef4444'
      default: return '#8a9ab5'
    }
  }

  const totalPending = invoices.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0)
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0)

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
              color: item.href === '/dashboard/factures' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/dashboard/factures' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/dashboard/factures' ? 'rgba(212,160,23,.04)' : 'transparent',
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
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Factures</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Mes <em style={{ color: 'var(--gold)', fontWeight: 600 }}>factures.</em>
          </h1>
        </div>

        {/* Résumé */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
          {[
            { label: 'Total factures', val: invoices.length },
            { label: 'En attente', val: totalPending + '€' },
            { label: 'Total payé', val: totalPaid + '€' },
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

        {/* Liste factures */}
        {invoices.length === 0 ? (
          <div style={{ background: 'var(--bg2)', padding: '48px', border: '1px solid rgba(212,160,23,.08)', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
              Aucune facture pour le moment.
            </div>
          </div>
        ) : (
          <div style={{ background: 'var(--bg2)', border: '1px solid rgba(212,160,23,.08)', overflow: 'hidden' }}>
            {/* Header tableau */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
              padding: '14px 24px',
              borderBottom: '1px solid rgba(212,160,23,.08)',
              background: 'rgba(212,160,23,.04)',
            }}>
              {['Numéro', 'Montant', 'Échéance', 'Statut'].map(h => (
                <div key={h} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', opacity: .7 }}>{h}</div>
              ))}
            </div>
            {invoices.map((invoice, i) => (
              <div key={invoice.id} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                padding: '16px 24px',
                borderBottom: i < invoices.length - 1 ? '1px solid rgba(212,160,23,.05)' : 'none',
                alignItems: 'center',
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--blue-muted)' }}>
                  #{invoice.id.slice(0, 8).toUpperCase()}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: 'var(--white)' }}>
                  {invoice.amount}€
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--blue-muted)' }}>
                  {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('fr-FR') : '—'}
                </div>
                <div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '1px',
                    padding: '4px 10px', textTransform: 'uppercase',
                    background: `rgba(${invoice.status === 'paid' ? '34,197,94' : invoice.status === 'overdue' ? '239,68,68' : '212,160,23'},.1)`,
                    color: getStatusColor(invoice.status),
                  }}>{getStatusLabel(invoice.status)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}