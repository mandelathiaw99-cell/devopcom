'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ADMIN_ID = '6fefcc20-9563-430a-ae2a-1ca203d09314'

interface Message {
  id: string
  content: string
  created_at: string
  read: boolean
  sender_id: string
  receiver_id: string
}

interface Client {
  id: string
  email: string
  full_name?: string
}

export default function AdminMessages() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const selectedClientRef = useRef<Client | null>(null)

  useEffect(() => {
    selectedClientRef.current = selectedClient
  }, [selectedClient])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.id !== ADMIN_ID) { router.push('/'); return }

      const { data: allMessages } = await supabase
        .from('messages')
        .select('sender_id')
        .neq('sender_id', ADMIN_ID)

      const clientIds = [...new Set((allMessages || []).map((m: { sender_id: string }) => m.sender_id))]

      if (clientIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, email, full_name')
          .in('id', clientIds)

        setClients(profiles || [])
        if (profiles && profiles.length > 0) {
          setSelectedClient(profiles[0])
          selectedClientRef.current = profiles[0]
        }
      }

      setLoading(false)
    }
    fetchData()
  }, [router])

  useEffect(() => {
    if (!selectedClient) return

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${selectedClient.id},receiver_id.eq.${ADMIN_ID}),and(sender_id.eq.${ADMIN_ID},receiver_id.eq.${selectedClient.id})`
        )
        .order('created_at', { ascending: true })

      setMessages(data || [])

      await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_id', selectedClient.id)
        .eq('receiver_id', ADMIN_ID)
        .eq('read', false)
    }

    fetchMessages()

    // Realtime sans filter — on filtre manuellement dans le callback
    const channel = supabase
      .channel(`admin-conv-${selectedClient.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, (payload) => {
        const msg = payload.new as Message
        const currentClient = selectedClientRef.current
        if (!currentClient) return

        const isClientToAdmin = msg.sender_id === currentClient.id && msg.receiver_id === ADMIN_ID
        const isAdminToClient = msg.sender_id === ADMIN_ID && msg.receiver_id === currentClient.id

        if (isClientToAdmin || isAdminToClient) {
          setMessages(prev => {
            // Éviter les doublons
            if (prev.find(m => m.id === msg.id)) return prev
            return [...prev, msg]
          })
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [selectedClient])

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedClient) return
    setSending(true)

    const { error } = await supabase.from('messages').insert({
      sender_id: ADMIN_ID,
      receiver_id: selectedClient.id,
      content: newMessage,
      read: false,
    })

    if (error) console.error('Erreur envoi:', error)

    setNewMessage('')
    setSending(false)
  }

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
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/" style={{
            display: 'block', padding: '10px', textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--gold)', textDecoration: 'none',
            border: '1px solid rgba(212,160,23,.15)',
          }}>→ Site public</Link>
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
          width: '260px', background: 'var(--bg2)',
          borderRight: '1px solid rgba(212,160,23,.08)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(212,160,23,.08)' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>Conversations</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {clients.length === 0 ? (
              <div style={{ padding: '24px', fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                Aucun message reçu
              </div>
            ) : (
              clients.map(client => (
                <button key={client.id} onClick={() => setSelectedClient(client)} style={{
                  width: '100%', padding: '16px 20px', textAlign: 'left',
                  background: selectedClient?.id === client.id ? 'rgba(212,160,23,.08)' : 'transparent',
                  border: 'none',
                  borderLeft: selectedClient?.id === client.id ? '2px solid var(--gold)' : '2px solid transparent',
                  borderBottom: '1px solid rgba(212,160,23,.04)',
                  cursor: 'pointer',
                }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '13px', color: 'var(--white)', fontWeight: 500 }}>
                    {client.full_name || 'Client'}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)', marginTop: '4px' }}>
                    {client.email}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Zone chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px' }}>
          {!selectedClient ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                Sélectionnez une conversation
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>Conversation avec</div>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
                  <em style={{ color: 'var(--gold)', fontWeight: 600 }}>{selectedClient.full_name || selectedClient.email}</em>
                </h1>
              </div>

              <div style={{
                flex: 1, background: 'var(--bg2)',
                border: '1px solid rgba(212,160,23,.08)',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {messages.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                        Aucun message dans cette conversation.
                      </div>
                    </div>
                  ) : (
                    messages.map(msg => {
                      const isAdmin = msg.sender_id === ADMIN_ID
                      return (
                        <div key={msg.id} style={{
                          display: 'flex',
                          justifyContent: isAdmin ? 'flex-end' : 'flex-start',
                        }}>
                          <div style={{
                            maxWidth: '60%', padding: '12px 16px',
                            background: isAdmin
                              ? 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)'
                              : 'rgba(255,255,255,0.06)',
                            border: isAdmin ? 'none' : '1px solid rgba(212,160,23,.15)',
                          }}>
                            {!isAdmin && (
                              <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase',
                                color: 'var(--gold)', marginBottom: '6px',
                              }}>
                                {selectedClient.full_name || 'Client'}
                              </div>
                            )}
                            <div style={{
                              fontSize: '13px',
                              color: isAdmin ? '#000' : 'var(--white)',
                              lineHeight: 1.6,
                            }}>{msg.content}</div>
                            <div style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '8px', letterSpacing: '1px',
                              color: isAdmin ? 'rgba(0,0,0,.5)' : 'var(--blue-muted)',
                              marginTop: '6px',
                            }}>
                              {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div style={{
                  padding: '16px 24px',
                  borderTop: '1px solid rgba(212,160,23,.08)',
                  display: 'flex', gap: '12px',
                }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Répondre au client..."
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}