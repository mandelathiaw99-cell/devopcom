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
  created_at: string
  client_id: string
}

interface Client {
  id: string
  full_name: string
  email: string
}

export default function AdminFactures() {
  const router = useRouter()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Formulaire
  const [clientId, setClientId] = useState('')
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data: profile } = await supabase
        .from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role !== 'admin') { router.push('/dashboard'); return }

      const { data: invoicesData } = await supabase
        .from('invoices').select('*').order('created_at', { ascending: false })
      const { data: clientsData } = await supabase
        .from('profiles').select('id, full_name, email').eq('role', 'client')

      setInvoices(invoicesData || [])
      setClients(clientsData || [])
      setLoading(false)
    }
    fetchData()
  }, [router])

  const handleCreate = async () => {
    if (!clientId || !amount) return
    setSaving(true)

    const { data } = await supabase.from('invoices').insert({
      client_id: clientId,
      amount: Number(amount),
      status,
      due_date: dueDate || null,
    }).select().single()

    if (data) {
      setInvoices(prev => [data, ...prev])
      setShowForm(false)
      setClientId(''); setAmount(''); setDueDate('')
      setStatus('pending')
    }
    setSaving(false)
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    await supabase.from('invoices').update({
      status: newStatus,
      paid_at: newStatus === 'paid' ? new Date().toISOString() : null,
    }).eq('id', id)

    setInvoices(prev => prev.map(inv =>
      inv.id === id ? { ...inv, status: newStatus } : inv
    ))
  }

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

  const getClientName = (clientId: string) => {
    return clients.find(c => c.id === clientId)?.full_name || '—'
  }

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0)
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0)

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
              color: item.href === '/admin/factures' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/admin/factures' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/admin/factures' ? 'rgba(212,160,23,.04)' : 'transparent',
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Administration</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
              Mes <em style={{ color: 'var(--gold)', fontWeight: 600 }}>factures.</em>
            </h1>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
            color: 'var(--black)', fontWeight: 600, fontSize: '12px',
            fontFamily: "'Outfit', sans-serif", border: 'none', cursor: 'pointer',
          }}>
            {showForm ? 'Annuler' : '+ Nouvelle facture'}
          </button>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { val: invoices.length, label: 'Total factures' },
            { val: totalPending + '€', label: 'En attente' },
            { val: totalRevenue + '€', label: 'Revenus encaissés' },
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

        {/* Formulaire */}
        {showForm && (
          <div style={{
            background: 'var(--bg2)', padding: '32px',
            border: '1px solid rgba(212,160,23,.2)', marginBottom: '24px',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--gold)', marginBottom: '24px' }}>
              Nouvelle facture
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Client *</label>
                <select value={clientId} onChange={e => setClientId(e.target.value)} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }}>
                  <option value="">Sélectionner un client</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.full_name} — {c.email}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Montant (€) *</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1500" style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }} />
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Statut</label>
                <select value={status} onChange={e => setStatus(e.target.value)} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }}>
                  <option value="pending">En attente</option>
                  <option value="paid">Payée</option>
                  <option value="overdue">En retard</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Date d'échéance</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }} />
              </div>
            </div>
            <button onClick={handleCreate} disabled={saving} style={{
              marginTop: '24px', padding: '14px 32px',
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              color: 'var(--black)', fontWeight: 600, fontSize: '13px',
              fontFamily: "'Outfit', sans-serif", border: 'none', cursor: 'pointer',
            }}>
              {saving ? 'Création...' : 'Créer la facture →'}
            </button>
          </div>
        )}

        {/* Liste factures */}
        <div style={{ background: 'var(--bg2)', border: '1px solid rgba(212,160,23,.08)', overflow: 'hidden' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            padding: '14px 24px',
            borderBottom: '1px solid rgba(212,160,23,.08)',
            background: 'rgba(212,160,23,.04)',
          }}>
            {['Numéro', 'Client', 'Montant', 'Échéance', 'Statut'].map(h => (
              <div key={h} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', opacity: .7 }}>{h}</div>
            ))}
          </div>

          {invoices.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>Aucune facture</div>
            </div>
          ) : (
            invoices.map((invoice, i) => (
              <div key={invoice.id} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                padding: '16px 24px',
                borderBottom: i < invoices.length - 1 ? '1px solid rgba(212,160,23,.05)' : 'none',
                alignItems: 'center',
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--blue-muted)' }}>
                  #{invoice.id.slice(0, 8).toUpperCase()}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--white)' }}>{getClientName(invoice.client_id)}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: 'var(--white)' }}>{invoice.amount}€</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--blue-muted)' }}>
                  {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('fr-FR') : '—'}
                </div>
                <select
                  value={invoice.status}
                  onChange={e => handleStatusChange(invoice.id, e.target.value)}
                  style={{
                    padding: '4px 8px',
                    background: 'var(--bg)',
                    border: `1px solid ${getStatusColor(invoice.status)}`,
                    color: getStatusColor(invoice.status),
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', letterSpacing: '1px', outline: 'none', cursor: 'pointer',
                  }}
                >
                  <option value="pending">En attente</option>
                  <option value="paid">Payée</option>
                  <option value="overdue">En retard</option>
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}