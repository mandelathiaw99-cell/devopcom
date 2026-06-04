'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  description: string
  status: string
  progress: number
  delivery_date: string
  budget: number
  client_id: string
}

interface Client {
  id: string
  full_name: string
  email: string
}

export default function AdminProjets() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Formulaire
  const [clientId, setClientId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('en_cours')
  const [progress, setProgress] = useState(0)
  const [budget, setBudget] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data: profile } = await supabase
        .from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role !== 'admin') { router.push('/dashboard'); return }

      const { data: projectsData } = await supabase
        .from('projects').select('*').order('created_at', { ascending: false })
      const { data: clientsData } = await supabase
        .from('profiles').select('id, full_name, email').eq('role', 'client')

      setProjects(projectsData || [])
      setClients(clientsData || [])
      setLoading(false)
    }
    fetchData()
  }, [router])

  const handleCreate = async () => {
    if (!clientId || !name) return
    setSaving(true)

    const { data } = await supabase.from('projects').insert({
      client_id: clientId,
      name, description, status,
      progress: Number(progress),
      budget: budget ? Number(budget) : null,
      delivery_date: deliveryDate || null,
      start_date: new Date().toISOString().split('T')[0],
    }).select().single()

    if (data) {
      setProjects(prev => [data, ...prev])
      setShowForm(false)
      setName(''); setDescription(''); setClientId('')
      setBudget(''); setDeliveryDate(''); setProgress(0)
    }
    setSaving(false)
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours'
      case 'livre': return 'Livré'
      case 'revision': return 'En révision'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return '#d4a017'
      case 'livre': return '#22c55e'
      case 'revision': return '#f953c6'
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
              color: item.href === '/admin/projets' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/admin/projets' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/admin/projets' ? 'rgba(212,160,23,.04)' : 'transparent',
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
              Mes <em style={{ color: 'var(--gold)', fontWeight: 600 }}>projets.</em>
            </h1>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
            color: 'var(--black)', fontWeight: 600, fontSize: '12px',
            fontFamily: "'Outfit', sans-serif",
            border: 'none', cursor: 'pointer',
          }}>
            {showForm ? 'Annuler' : '+ Nouveau projet'}
          </button>
        </div>

        {/* Formulaire création */}
        {showForm && (
          <div style={{
            background: 'var(--bg2)', padding: '32px',
            border: '1px solid rgba(212,160,23,.2)',
            marginBottom: '24px',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--gold)', marginBottom: '24px' }}>
              Nouveau projet
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              {/* Client */}
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

              {/* Nom */}
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Nom du projet *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Site vitrine XYZ" style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }} />
              </div>

              {/* Description */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description du projet..." rows={3} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none', resize: 'vertical',
                }} />
              </div>

              {/* Statut */}
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Statut</label>
                <select value={status} onChange={e => setStatus(e.target.value)} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }}>
                  <option value="en_cours">En cours</option>
                  <option value="revision">En révision</option>
                  <option value="livre">Livré</option>
                </select>
              </div>

              {/* Avancement */}
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Avancement : {progress}%</label>
                <input type="range" min="0" max="100" value={progress} onChange={e => setProgress(Number(e.target.value))} style={{ width: '100%', accentColor: '#d4a017' }} />
              </div>

              {/* Budget */}
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Budget (€)</label>
                <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="1500" style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }} />
              </div>

              {/* Date livraison */}
              <div>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Date de livraison</label>
                <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} style={{
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
              {saving ? 'Création...' : 'Créer le projet →'}
            </button>
          </div>
        )}

        {/* Liste projets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {projects.length === 0 ? (
            <div style={{ background: 'var(--bg2)', padding: '48px', border: '1px solid rgba(212,160,23,.08)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                Aucun projet pour le moment.
              </div>
            </div>
          ) : (
            projects.map(project => (
              <div key={project.id} style={{
                background: 'var(--bg2)', padding: '24px 28px',
                border: '1px solid rgba(212,160,23,.08)',
                borderLeft: `3px solid ${getStatusColor(project.status)}`,
                display: 'grid', gridTemplateColumns: '1fr auto',
                alignItems: 'center', gap: '24px',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--white)' }}>{project.name}</div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '1px',
                      padding: '3px 8px', background: 'rgba(212,160,23,.1)',
                      color: getStatusColor(project.status), textTransform: 'uppercase',
                    }}>{getStatusLabel(project.status)}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--blue-muted)', marginBottom: '12px' }}>{project.description}</div>

                  {/* Barre progression */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, height: '3px', background: 'rgba(212,160,23,.1)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${project.progress}%`, background: 'linear-gradient(90deg, #f5d480, #d4a017)', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--gold)' }}>{project.progress}%</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  {project.budget && (
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--gold)' }}>{project.budget}€</div>
                  )}
                  {project.delivery_date && (
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)', marginTop: '4px' }}>
                      Livraison : {new Date(project.delivery_date).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}