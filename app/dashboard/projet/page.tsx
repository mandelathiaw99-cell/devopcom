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
  start_date: string
  delivery_date: string
  budget: number
}

export default function MonProjet() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })

      setProjects(data || [])
      setLoading(false)
    }
    fetchData()
  }, [router])

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
              color: item.href === '/dashboard/projet' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/dashboard/projet' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/dashboard/projet' ? 'rgba(212,160,23,.04)' : 'transparent',
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
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Mon projet</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Suivi de <em style={{ color: 'var(--gold)', fontWeight: 600 }}>mes projets.</em>
          </h1>
        </div>

        {projects.length === 0 ? (
          <div style={{
            background: 'var(--bg2)', padding: '48px',
            border: '1px solid rgba(212,160,23,.08)', textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--blue-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
              Aucun projet en cours pour le moment.
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>
              Contactez-nous pour démarrer votre projet →
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projects.map(project => (
              <div key={project.id} style={{
                background: 'var(--bg2)', padding: '32px',
                border: '1px solid rgba(212,160,23,.08)',
                borderLeft: `3px solid ${getStatusColor(project.status)}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--white)', marginBottom: '6px' }}>{project.name}</h2>
                    <p style={{ fontSize: '13px', color: 'var(--blue-muted)', lineHeight: 1.6 }}>{project.description}</p>
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px',
                    padding: '6px 14px', background: `rgba(212,160,23,.1)`,
                    color: getStatusColor(project.status), textTransform: 'uppercase',
                  }}>{getStatusLabel(project.status)}</span>
                </div>

                {/* Barre de progression */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', color: 'var(--blue-muted)', textTransform: 'uppercase' }}>Avancement</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 600, color: 'var(--gold)' }}>{project.progress}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(212,160,23,.1)', borderRadius: '2px' }}>
                    <div style={{
                      height: '100%', width: `${project.progress}%`,
                      background: 'linear-gradient(90deg, #f5d480, #d4a017)',
                      borderRadius: '2px', transition: 'width .5s ease',
                    }} />
                  </div>
                </div>

                {/* Dates & Budget */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {[
                    { label: 'Début', val: project.start_date ? new Date(project.start_date).toLocaleDateString('fr-FR') : '—' },
                    { label: 'Livraison prévue', val: project.delivery_date ? new Date(project.delivery_date).toLocaleDateString('fr-FR') : '—' },
                    { label: 'Budget', val: project.budget ? project.budget + '€' : '—' },
                  ].map(info => (
                    <div key={info.label} style={{ background: 'var(--bg)', padding: '16px', border: '1px solid rgba(212,160,23,.06)' }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--blue-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>{info.label}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 600, color: 'var(--white)' }}>{info.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}