'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

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

interface Notification {
  id: string
  message: string
  type: 'project' | 'invoice' | 'message'
}

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (message: string, type: 'project' | 'invoice' | 'message') => {
    const id = Math.random().toString(36).slice(2)
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data: profileData } = await supabase
        .from('profiles').select('*').eq('id', user.id).single()

      const { data: projectsData } = await supabase
        .from('projects').select('*').eq('client_id', user.id)
        .order('created_at', { ascending: false })

      const { data: invoicesData } = await supabase
        .from('invoices').select('*').eq('client_id', user.id)
        .order('created_at', { ascending: false })

      const { data: messagesData } = await supabase
        .from('messages').select('*').eq('receiver_id', user.id)
        .eq('read', false).order('created_at', { ascending: false })

      setProfile(profileData)
      setProjects(projectsData || [])
      setInvoices(invoicesData || [])
      setMessages(messagesData || [])
      setLoading(false)

      // 🔴 Realtime — écouter les changements de projets
      const projectsChannel = supabase
        .channel('projects-changes')
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'projects',
          filter: `client_id=eq.${user.id}`,
        }, (payload) => {
          setProjects(prev => prev.map(p =>
            p.id === payload.new.id ? { ...p, ...payload.new } : p
          ))
          addNotification(`Projet "${payload.new.name}" mis à jour — ${payload.new.progress}%`, 'project')
        })
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'projects',
          filter: `client_id=eq.${user.id}`,
        }, (payload) => {
          setProjects(prev => [payload.new as Project, ...prev])
          addNotification(`Nouveau projet créé : "${payload.new.name}"`, 'project')
        })
        .subscribe()

      // 🔴 Realtime — écouter les changements de factures
      const invoicesChannel = supabase
        .channel('invoices-changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'invoices',
          filter: `client_id=eq.${user.id}`,
        }, (payload) => {
          if (payload.eventType === 'INSERT') {
            setInvoices(prev => [payload.new as Invoice, ...prev])
            addNotification(`Nouvelle facture de ${payload.new.amount}€`, 'invoice')
          } else if (payload.eventType === 'UPDATE') {
            setInvoices(prev => prev.map(i =>
              i.id === payload.new.id ? { ...i, ...payload.new } : i
            ))
            if (payload.new.status === 'paid') {
              addNotification(`Facture de ${payload.new.amount}€ marquée comme payée`, 'invoice')
            }
          }
        })
        .subscribe()

      // 🔴 Realtime — écouter les nouveaux messages
      const messagesChannel = supabase
        .channel('messages-changes')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`,
        }, (payload) => {
          setMessages(prev => [payload.new as Message, ...prev])
          addNotification('Nouveau message reçu', 'message')
        })
        .subscribe()

      return () => {
        supabase.removeChannel(projectsChannel)
        supabase.removeChannel(invoicesChannel)
        supabase.removeChannel(messagesChannel)
      }
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

  const getNotifColor = (type: string) => {
    switch (type) {
      case 'project': return '#d4a017'
      case 'invoice': return '#22c55e'
      case 'message': return '#7c3aed'
      default: return '#8a9ab5'
    }
  }

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'project': return '📊'
      case 'invoice': return '💰'
      case 'message': return '💬'
      default: return '🔔'
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--gold)', fontStyle: 'italic' }}>Chargement...</div>
    </div>
  )

  const activeProject = projects.find(p => p.status === 'en_cours')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* Notifications temps réel */}
      <div style={{
        position: 'fixed', top: '80px', right: '20px', zIndex: 1000,
        display: 'flex', flexDirection: 'column', gap: '8px',
        maxWidth: '320px',
      }}>
        <AnimatePresence>
          {notifications.map(notif => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'var(--bg2)',
                border: `1px solid ${getNotifColor(notif.type)}44`,
                borderLeft: `3px solid ${getNotifColor(notif.type)}`,
                padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: '10px',
                boxShadow: `0 8px 32px rgba(0,0,0,.3)`,
              }}
            >
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{getNotifIcon(notif.type)}</span>
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase',
                  color: getNotifColor(notif.type), marginBottom: '2px',
                }}>Mise à jour</div>
                <div style={{ fontSize: '12px', color: 'var(--white)', lineHeight: 1.4 }}>{notif.message}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
                  marginLeft: 'auto', background: 'var(--gold)', color: 'var(--black)',
                  fontSize: '9px', fontWeight: 700, width: '18px', height: '18px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{messages.length}</span>
              )}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '20px' }}>
          <button onClick={handleLogout} style={{
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
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: 'var(--gold)' }}>
            Bonjour, {profile?.full_name?.split(' ')[0]} ✦
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', color: 'var(--blue-muted)', textTransform: 'uppercase', marginTop: '4px' }}>
            {profile?.company || profile?.email}
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { val: projects.length, label: 'Projets actifs' },
            { val: (activeProject?.progress ?? 0) + '%', label: 'Avancement' },
            { val: messages.length, label: 'Messages non lus' },
            { val: invoices.filter(i => i.status === 'pending').length, label: 'Factures en attente' },
          ].map(kpi => (
            <motion.div
              key={kpi.label}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'var(--bg2)', padding: '20px',
                border: '1px solid rgba(212,160,23,.08)',
                borderBottom: '2px solid var(--gold)',
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{kpi.val}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--blue-muted)', marginTop: '4px' }}>{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Projets + Factures */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

          {/* Projets */}
          <div style={{ background: 'var(--bg2)', padding: '24px', border: '1px solid rgba(212,160,23,.08)' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', opacity: .7, marginBottom: '16px' }}>Projets actifs</div>

            {projects.length === 0 ? (
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>Aucun projet pour le moment</div>
            ) : (
              projects.slice(0, 4).map(project => (
                <motion.div
                  key={project.id}
                  layout
                  style={{
                    padding: '10px 0', borderBottom: '1px solid rgba(212,160,23,.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--white)' }}>{project.name}</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', padding: '2px 8px',
                      background: 'rgba(212,160,23,.1)', color: getStatusColor(project.status), letterSpacing: '1px',
                    }}>{getStatusLabel(project.status)}</span>
                  </div>
                  {/* Mini barre de progression */}
                  <div style={{ height: '3px', background: 'rgba(212,160,23,.1)', borderRadius: '2px' }}>
                    <motion.div
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, #f5d480, #d4a017)', borderRadius: '2px' }}
                    />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--gold)', marginTop: '4px', textAlign: 'right' }}>
                    {project.progress}%
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Factures */}
          <div style={{ background: 'var(--bg2)', padding: '24px', border: '1px solid rgba(212,160,23,.08)' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', opacity: .7, marginBottom: '16px' }}>Dernières factures</div>

            {invoices.length === 0 ? (
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>Aucune facture pour le moment</div>
            ) : (
              invoices.slice(0, 4).map(invoice => (
                <motion.div
                  key={invoice.id}
                  layout
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 0', borderBottom: '1px solid rgba(212,160,23,.05)', fontSize: '12px',
                  }}
                >
                  <span style={{ color: 'var(--white)' }}>{invoice.amount}€</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', padding: '2px 8px',
                    background: invoice.status === 'paid' ? 'rgba(34,197,94,.1)' : 'rgba(212,160,23,.1)',
                    color: invoice.status === 'paid' ? '#22c55e' : 'var(--gold)', letterSpacing: '1px',
                  }}>{getStatusLabel(invoice.status)}</span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}