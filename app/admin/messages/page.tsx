'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Client {
  id: string
  full_name: string
  email: string
}

interface Message {
  id: string
  content: string
  created_at: string
  sender_id: string
  receiver_id: string
  read: boolean
}

export default function AdminMessages() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [adminId, setAdminId] = useState<string | null>(null)
  const channelRef = useRef<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data: profile } = await supabase
        .from('profiles').select('role').eq('id', user.id).single()
      if (profile?.role !== 'admin') { router.push('/dashboard'); return }

      setAdminId(user.id)

      const { data: clientsData } = await supabase
        .from('profiles').select('id, full_name, email')
        .eq('role', 'client').order('full_name')

      setClients(clientsData || [])
      setLoading(false)
    }
    fetchData()
  }, [router])

  useEffect(() => {
    if (!selectedClient || !adminId) return

    // Nettoyer l'ancien channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
    }

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${adminId},receiver_id.eq.${selectedClient.id}),and(sender_id.eq.${selectedClient.id},receiver_id.eq.${adminId})`)
        .order('created_at', { ascending: true })

      setMessages(data || [])

      await supabase.from('messages')
        .update({ read: true })
        .eq('sender_id', selectedClient.id)
        .eq('receiver_id', adminId)
        .eq('read', false)
    }

    fetchMessages()

    // Realtime
    const channel = supabase
      .channel(`messages-admin-${selectedClient.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, (payload) => {
        const msg = payload.new as Message
        if (
          (msg.sender_id === adminId && msg.receiver_id === selectedClient.id) ||
          (msg.sender_id === selectedClient.id && msg.receiver_id === adminId)
        ) {
          setMessages(prev => [...prev, msg])
        }
      })
      .subscribe()

    channelRef.current = channel

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedClient, adminId])

  const handleSend = async () => {
    if (!newMessage.trim() || !adminId || !selectedClient) return
    setSending(true)

    const { data } = await supabase.from('messages').insert({
      sender_id: adminId,
      receiver_id: selectedClient.id,
      content: newMessage,
      read: false,
    }).select().single()

    if (data) {
      setMessages(prev => [...prev, data])
      setNewMessage('')
    }
    setSending(false)
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
            { label: 'Messages', href: '/admin/messages' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 20px', fontSize: '12px',
              color: item.href === '/admin/messages' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/admin/messages' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/admin/messages' ? 'rgba(212,160,23,.04)' : 'transparent',
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
      <div style={{ marginLeft: '220px', flex: 1, display: 'flex', height: '100vh' }}>

        {/* Liste clients */}
        <div style={{
          width: '280px', background: 'var(--bg2)',
          borderRight: '1px solid rgba(212,160,23,.08)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(212,160,23,.08)' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Conversations
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {clients.length === 0 ? (
              <div style={{ padding: '24px', fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                Aucun client
              </div>
            ) : (
              clients.map(client => (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  style={{
                    padding: '16px 20px', cursor: 'pointer',
                    borderBottom: '1px solid rgba(212,160,23,.05)',
                    background: selectedClient?.id === client.id ? 'rgba(212,160,23,.06)' : 'transparent',
                    borderLeft: selectedClient?.id === client.id ? '2px solid var(--gold)' : '2px solid transparent',
                    transition: 'background .2s',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--white)', marginBottom: '4px' }}>
                    {client.full_name}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)' }}>
                    {client.email}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Zone messages */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {!selectedClient ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                  Sélectionnez un client pour démarrer une conversation
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(212,160,23,.08)',
                background: 'var(--bg2)',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f5d480, #d4a017)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 600, color: 'var(--black)',
                }}>{selectedClient.full_name[0]}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--white)' }}>{selectedClient.full_name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)' }}>{selectedClient.email}</div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                      Aucun message — démarrez la conversation
                    </div>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} style={{
                      display: 'flex',
                      justifyContent: msg.sender_id === adminId ? 'flex-end' : 'flex-start',
                    }}>
                      <div style={{
                        maxWidth: '60%', padding: '12px 16px',
                        background: msg.sender_id === adminId
                          ? 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)'
                          : 'var(--bg3)',
                        border: msg.sender_id === adminId ? 'none' : '1px solid rgba(212,160,23,.08)',
                      }}>
                        <div style={{
                          fontSize: '13px', lineHeight: 1.6,
                          color: msg.sender_id === adminId ? 'var(--black)' : 'var(--white)',
                        }}>{msg.content}</div>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                          color: msg.sender_id === adminId ? 'rgba(0,0,0,.5)' : 'var(--blue-muted)',
                          marginTop: '6px',
                        }}>
                          {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(212,160,23,.08)',
                display: 'flex', gap: '12px',
                background: 'var(--bg2)',
              }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={`Répondre à ${selectedClient.full_name}...`}
                  style={{
                    flex: 1, padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)',
                    border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)',
                    fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                  }}
                />
                <button onClick={handleSend} disabled={sending} style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                  color: 'var(--black)', fontWeight: 600, fontSize: '12px',
                  fontFamily: "'Outfit', sans-serif",
                  border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                }}>
                  {sending ? '...' : 'Envoyer →'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}