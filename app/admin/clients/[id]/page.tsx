'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Client {
  id: string
  full_name: string
  email: string
  company: string
  phone: string
  created_at: string
}

interface Project {
  id: string
  name: string
  description: string
  status: string
  progress: number
  budget: number
  delivery_date: string
  start_date: string
}

interface Invoice {
  id: string
  amount: number
  status: string
  due_date: string
  created_at: string
}

export default function ClientDetail() {
  const router = useRouter()
  const params = useParams()
  const clientId = params.id as string

  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  // Nouveau projet
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectDesc, setProjectDesc] = useState('')
  const [projectStatus, setProjectStatus] = useState('en_cours')
  const [projectProgress, setProjectProgress] = useState(0)
  const [projectBudget, setProjectBudget] = useState('')
  const [projectDeadline, setProjectDeadline] = useState('')

  // Nouvelle facture
  const [showInvoiceForm, setShowInvoiceForm] = useState(false)
  const [invoiceAmount, setInvoiceAmount] = useState('')
  const [invoiceDueDate, setInvoiceDueDate] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role !== 'admin') { router.push('/dashboard'); return }

      const { data: clientData } = await supabase.from('profiles').select('*').eq('id', clientId).single()
      const { data: projectsData } = await supabase.from('projects').select('*').eq('client_id', clientId).order('created_at', { ascending: false })
      const { data: invoicesData } = await supabase.from('invoices').select('*').eq('client_id', clientId).order('created_at', { ascending: false })

      setClient(clientData)
      setProjects(projectsData || [])
      setInvoices(invoicesData || [])
      setLoading(false)
    }
    fetchData()
  }, [router, clientId])

  const handleUpdateProject = async (projectId: string, status: string, progress: number) => {
    await supabase.from('projects').update({ status, progress }).eq('id', projectId)
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status, progress } : p))
    setSuccess('Projet mis à jour ✓')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleCreateProject = async () => {
    if (!projectName) return
    setSaving(true)

    const { data } = await supabase.from('projects').insert({
      client_id: clientId,
      name: projectName,
      description: projectDesc,
      status: projectStatus,
      progress: projectProgress,
      budget: projectBudget ? Number(projectBudget) : null,
      delivery_date: projectDeadline || null,
      start_date: new Date().toISOString().split('T')[0],
    }).select().single()

    if (data) {
      setProjects(prev => [data, ...prev])
      setShowProjectForm(false)
      setProjectName(''); setProjectDesc(''); setProjectBudget(''); setProjectDeadline('')
      setSuccess('Projet créé ✓')
      setTimeout(() => setSuccess(''), 3000)
    }
    setSaving(false)
  }

  const handleCreateInvoice = async () => {
    if (!invoiceAmount) return
    setSaving(true)

    const { data } = await supabase.from('invoices').insert({
      client_id: clientId,
      amount: Number(invoiceAmount),
      status: 'pending',
      due_date: invoiceDueDate || null,
    }).select().single()

    if (data) {
      setInvoices(prev => [data, ...prev])
      setShowInvoiceForm(false)
      setInvoiceAmount(''); setInvoiceDueDate('')
      setSuccess('Facture créée ✓')
      setTimeout(() => setSuccess(''), 3000)
    }
    setSaving(false)
  }

  const handleInvoiceStatus = async (invoiceId: string, status: string) => {
    await supabase.from('invoices').update({
      status,
      paid_at: status === 'paid' ? new Date().toISOString() : null,
    }).eq('id', invoiceId)
    setInvoices(prev => prev.map(i => i.id === invoiceId ? { ...i, status } : i))
    setSuccess('Facture mise à jour ✓')
    setTimeout(() => setSuccess(''), 3000)
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours'
      case 'livre': return 'Livré'
      case 'revision': return 'En révision'
      case 'pending': return 'En attente'
      case 'paid': return 'Payée'
      case 'overdue': return 'En retard'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': case 'pending': return '#d4a017'
      case 'livre': case 'paid': return '#22c55e'
      case 'revision': return '#f953c6'
      case 'overdue': return '#ef4444'
      default: return '#8a9ab5'
    }
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

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Link href="/admin/clients" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--blue-muted)', textDecoration: 'none',
            marginBottom: '16px', display: 'inline-block',
          }}>← Retour aux clients</Link>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 600, color: 'var(--white)', lineHeight: 1 }}>
                {client?.full_name}
              </h1>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--blue-muted)', marginTop: '4px' }}>
                {client?.email} · {client?.company || 'Sans entreprise'} · {client?.phone || 'Pas de téléphone'}
              </div>
            </div>

            {/* Actions rapides */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowProjectForm(!showProjectForm)} style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                color: 'var(--black)', fontWeight: 600, fontSize: '12px',
                fontFamily: "'Outfit', sans-serif", border: 'none', cursor: 'pointer',
              }}>+ Projet</button>
              <button onClick={() => setShowInvoiceForm(!showInvoiceForm)} style={{
                padding: '10px 20px',
                background: 'rgba(212,160,23,.1)', color: 'var(--gold)', fontSize: '12px',
                fontFamily: "'Outfit', sans-serif", border: '1px solid rgba(212,160,23,.25)', cursor: 'pointer',
              }}>+ Facture</button>
              <a href={`mailto:${client?.email}`} style={{
                padding: '10px 20px',
                background: 'transparent', color: 'var(--blue-muted)', fontSize: '12px',
                fontFamily: "'Outfit', sans-serif", border: '1px solid rgba(212,160,23,.15)',
                textDecoration: 'none', display: 'inline-block',
              }}>✉ Email</a>
            </div>
          </div>
        </div>

        {/* Success message */}
        {success && (
          <div style={{
            padding: '12px 16px', marginBottom: '24px',
            background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.2)',
            color: '#22c55e', fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
          }}>{success}</div>
        )}

        {/* Formulaire nouveau projet */}
        {showProjectForm && (
          <div style={{ background: 'var(--bg2)', padding: '32px', border: '1px solid rgba(212,160,23,.2)', marginBottom: '24px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--gold)', marginBottom: '24px' }}>
              Nouveau projet
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Nom *</label>
                <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="Nom du projet" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Statut</label>
                <select value={projectStatus} onChange={e => setProjectStatus(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none' }}>
                  <option value="en_cours">En cours</option>
                  <option value="revision">En révision</option>
                  <option value="livre">Livré</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Budget (€)</label>
                <input type="number" value={projectBudget} onChange={e => setProjectBudget(e.target.value)} placeholder="1500" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Livraison</label>
                <input type="date" value={projectDeadline} onChange={e => setProjectDeadline(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Description</label>
                <textarea value={projectDesc} onChange={e => setProjectDesc(e.target.value)} placeholder="Description du projet..." rows={2} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none', resize: 'vertical' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Avancement : {projectProgress}%</label>
                <input type="range" min="0" max="100" value={projectProgress} onChange={e => setProjectProgress(Number(e.target.value))} style={{ width: '100%', accentColor: '#d4a017' }} />
              </div>
            </div>
            <button onClick={handleCreateProject} disabled={saving} style={{
              marginTop: '20px', padding: '12px 32px',
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              color: 'var(--black)', fontWeight: 600, fontSize: '13px',
              fontFamily: "'Outfit', sans-serif", border: 'none', cursor: 'pointer',
            }}>{saving ? 'Création...' : 'Créer le projet →'}</button>
          </div>
        )}

        {/* Formulaire nouvelle facture */}
        {showInvoiceForm && (
          <div style={{ background: 'var(--bg2)', padding: '32px', border: '1px solid rgba(212,160,23,.2)', marginBottom: '24px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--gold)', marginBottom: '24px' }}>Nouvelle facture</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Montant (€) *</label>
                <input type="number" value={invoiceAmount} onChange={e => setInvoiceAmount(e.target.value)} placeholder="1500" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Échéance</label>
                <input type="date" value={invoiceDueDate} onChange={e => setInvoiceDueDate(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)', color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none' }} />
              </div>
            </div>
            <button onClick={handleCreateInvoice} disabled={saving} style={{
              marginTop: '20px', padding: '12px 32px',
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              color: 'var(--black)', fontWeight: 600, fontSize: '13px',
              fontFamily: "'Outfit', sans-serif", border: 'none', cursor: 'pointer',
            }}>{saving ? 'Création...' : 'Créer la facture →'}</button>
          </div>
        )}

        {/* Projets */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>
            Projets ({projects.length})
          </div>

          {projects.length === 0 ? (
            <div style={{ background: 'var(--bg2)', padding: '32px', border: '1px solid rgba(212,160,23,.08)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>Aucun projet — cliquez sur "+ Projet" pour en créer un</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {projects.map(project => (
                <div key={project.id} style={{
                  background: 'var(--bg2)', padding: '24px',
                  border: '1px solid rgba(212,160,23,.08)',
                  borderLeft: `3px solid ${getStatusColor(project.status)}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--white)', marginBottom: '4px' }}>{project.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--blue-muted)' }}>{project.description}</div>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--gold)' }}>
                      {project.budget ? project.budget + '€' : '—'}
                    </div>
                  </div>

                  {/* Barre progression */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--blue-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Avancement</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--gold)' }}>{project.progress}%</span>
                    </div>
                    <input
                      type="range" min="0" max="100" value={project.progress}
                      onChange={e => handleUpdateProject(project.id, project.status, Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#d4a017' }}
                    />
                  </div>

                  {/* Statut */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['en_cours', 'revision', 'livre'].map(s => (
                      <button key={s} onClick={() => handleUpdateProject(project.id, s, project.progress)} style={{
                        padding: '6px 14px',
                        background: project.status === s ? `${getStatusColor(s)}22` : 'transparent',
                        border: `1px solid ${project.status === s ? getStatusColor(s) : 'rgba(212,160,23,.15)'}`,
                        color: project.status === s ? getStatusColor(s) : 'var(--blue-muted)',
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                        letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer',
                      }}>{getStatusLabel(s)}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Factures */}
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px' }}>
            Factures ({invoices.length})
          </div>

          {invoices.length === 0 ? (
            <div style={{ background: 'var(--bg2)', padding: '32px', border: '1px solid rgba(212,160,23,.08)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>Aucune facture — cliquez sur "+ Facture" pour en créer une</div>
            </div>
          ) : (
            <div style={{ background: 'var(--bg2)', border: '1px solid rgba(212,160,23,.08)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '14px 24px', borderBottom: '1px solid rgba(212,160,23,.08)', background: 'rgba(212,160,23,.04)' }}>
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
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--blue-muted)' }}>#{invoice.id.slice(0, 8).toUpperCase()}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: 'var(--white)' }}>{invoice.amount}€</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--blue-muted)' }}>
                    {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('fr-FR') : '—'}
                  </div>
                  <select value={invoice.status} onChange={e => handleInvoiceStatus(invoice.id, e.target.value)} style={{
                    padding: '4px 8px', background: 'var(--bg)',
                    border: `1px solid ${getStatusColor(invoice.status)}`,
                    color: getStatusColor(invoice.status),
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', outline: 'none', cursor: 'pointer',
                  }}>
                    <option value="pending">En attente</option>
                    <option value="paid">Payée</option>
                    <option value="overdue">En retard</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}