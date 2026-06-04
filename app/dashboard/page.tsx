'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Profile {
  full_name: string
  email: string
  company: string
  role: string
}

interface Project {
  id: string
  name: string
  status: string
  progress: number
  delivery_date: string
}

interface Invoice {
  id: string
  amount: number
  status: string
  due_date: string
}

interface Message {
  id: string
  content: string
  created_at: string
  read: boolean
}

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })

      const { data: invoicesData } = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })

      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .eq('receiver_id', user.id)
        .eq('read', false)
        .order('created_at', { ascending: false })

      setProfile(profileData)
      setProjects(projectsData || [])
      setInvoices(invoicesData || [])
      setMessages(messagesData || [])
      setLoading(false)
    }

    fetchData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return '#d4a017'
      case 'livre': return '#22c55e'
      case 'revision': return '#f953c6'
      case 'pending': return '#d4a017'
      case 'paid': return '#22c55e'
      default: return '#8a9ab5'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours'
      case 'livre': return 'Livré'
      case 'revision': return 'Révision'
      case 'pending': return 'En attente'
      case 'paid': return 'Payée'
      default: return status
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '24px', color: 'var(--gold)', fontStyle: 'italic',
        }}>Chargement...</div>
      </div>
    )
  }

  const activeProject = projects.find(p => p.status === 'en_cours')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{
        width: '220px', background: 'var(--bg2)',
        borderRight: '1px solid rgba(212,160,23,.08)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(212,160,23,.08)',
        }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '14px', fontWeight: 900, letterSpacing: '2px',
            background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', lineHeight: 1,
          }}>DEVOP</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '7px', letterSpacing: '4px', color: 'var(--gold)',
            textTransform: 'uppercase', opacity: .7,
          }}>C · O · M</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {[
            { label: 'Dashboard', href: '/dashboard', icon: '▪' },
            { label: 'Mon projet', href: '/dashboard/projet', icon: '◦' },
            { label: 'Factures', href: '/dashboard/factures', icon: '◦' },
            { label: 'Messages', href: '/dashboard/messages', icon: '◦' },
            { label: 'Documents', href: '/dashboard/documents', icon: '◦' },
            { label: 'Paramètres', href: '/dashboard/parametres', icon: '◦' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 20px', fontSize: '12px',
              color: item.href === '/dashboard' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/dashboard' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/dashboard' ? 'rgba(212,160,23,.04)' : 'transparent',
            }}>
              <span style={{ fontSize: '10px' }}>{item.icon}</span>
              {item.label}
              {item.label === 'Messages' && messages.length > 0 && (
                <span style={{
                  marginLeft: 'auto',
                  background: 'var(--gold)',
                  color: 'var(--black)',
                  fontSize: '9px', fontWeight: 700,
                  width: '18px', height: '18px',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{messages.length}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '20px' }}>
          <button onClick={handleLogout} style={{
            width: '100%', padding: '10px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--blue-muted)', background: 'transparent',
            border: '1px solid rgba(212,160,23,.15)', cursor: 'pointer',
          }}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '220px', flex: 1, padding: '32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px', fontWeight: 600, color: 'var(--gold)',
          }}>
            Bonjour, {profile?.full_name?.split(' ')[0]} ✦
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '2px', color: 'var(--blue-muted)',
            textTransform: 'uppercase', marginTop: '4px',
          }}>
            {profile?.company || profile?.email}
          </div>
        </div>

        {/* KPIs */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px', marginBottom: '24px',
        }}>
          {[
            { val: projects.length, label: 'Projets actifs' },
            { val: (activeProject?.progress ?? 0) + '%', label: 'Avancement' },
            { val: messages.length, label: 'Messages non lus' },
            { val: invoices.filter(i => i.status === 'pending').length, label: 'Factures en attente' },
          ].map(kpi => (
            <div key={kpi.label} style={{
              background: 'var(--bg2)', padding: '20px',
              border: '1px solid rgba(212,160,23,.08)',
              borderBottom: '2px solid var(--gold)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '36px', fontWeight: 600, color: 'var(--gold)', lineHeight: 1,
              }}>{kpi.val}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase',
                color: 'var(--blue-muted)', marginTop: '4px',
              }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Projets + Factures */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

          {/* Projets */}
          <div style={{
            background: 'var(--bg2)', padding: '24px',
            border: '1px solid rgba(212,160,23,.08)',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--gold)', opacity: .7, marginBottom: '16px',
            }}>Projets actifs</div>

            {projects.length === 0 ? (
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '15px', color: 'var(--blue-muted)', fontStyle: 'italic',
              }}>Aucun projet pour le moment</div>
            ) : (
              projects.slice(0, 4).map(project => (
                <div key={project.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid rgba(212,160,23,.05)',
                  fontSize: '12px', color: 'var(--white)',
                }}>
                  <span>{project.name}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', padding: '2px 8px',
                    background: 'rgba(212,160,23,.1)',
                    color: getStatusColor(project.status),
                    letterSpacing: '1px',
                  }}>{getStatusLabel(project.status)}</span>
                </div>
              ))
            )}
          </div>

          {/* Factures */}
          <div style={{
            background: 'var(--bg2)', padding: '24px',
            border: '1px solid rgba(212,160,23,.08)',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--gold)', opacity: .7, marginBottom: '16px',
            }}>Dernières factures</div>

            {invoices.length === 0 ? (
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '15px', color: 'var(--blue-muted)', fontStyle: 'italic',
              }}>Aucune facture pour le moment</div>
            ) : (
              invoices.slice(0, 4).map(invoice => (
                <div key={invoice.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid rgba(212,160,23,.05)',
                  fontSize: '12px',
                }}>
                  <span style={{ color: 'var(--white)' }}>{invoice.amount}€</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', padding: '2px 8px',
                    background: invoice.status === 'paid' ? 'rgba(34,197,94,.1)' : 'rgba(212,160,23,.1)',
                    color: invoice.status === 'paid' ? '#22c55e' : 'var(--gold)',
                    letterSpacing: '1px',
                  }}>{getStatusLabel(invoice.status)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}