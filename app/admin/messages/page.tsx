'use client'

import { useEffect, useState } from 'react'
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

export default function Messages() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      setUserId(user.id)

      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: true })

      setMessages(data || [])
      setLoading(false)

      // Marquer les messages comme lus
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('receiver_id', user.id)
        .eq('read', false)

      // Realtime
      const channel = supabase
        .channel('client-messages')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        }, (payload) => {
          const msg = payload.new as Message
          if (msg.sender_id === user.id || msg.receiver_id === user.id) {
            setMessages(prev => [...prev, msg])
          }
        })
        .subscribe()

      return () => supabase.removeChannel(channel)
    }
    fetchData()
  }, [router])

  const handleSend = async () => {
    if (!newMessage.trim() || !userId) return
    setSending(true)

    await supabase.from('messages').insert({
      sender_id: userId,
      receiver_id: ADMIN_ID,
      content: newMessage,
      read: false,
    })

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
              color: item.href === '/dashboard/messages' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/dashboard/messages' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/dashboard/messages' ? 'rgba(212,160,23,.04)' : 'transparent',
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
      <div style={{ marginLeft: '220px', flex: 1, padding: '32px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Messages</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Mes <em style={{ color: 'var(--gold)', fontWeight: 600 }}>messages.</em>
          </h1>
        </div>

        {/* Zone messages */}
        <div style={{
          flex: 1, background: 'var(--bg2)',
          border: '1px solid rgba(212,160,23,.08)',
          display: 'flex', flexDirection: 'column',
          minHeight: '400px',
        }}>
          {/* Messages */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
                  Aucun message pour le moment.
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '2px', color: 'var(--blue-muted)', textTransform: 'uppercase', marginTop: '8px' }}>
                  Envoyez un message à l'équipe DevopCom
                </div>
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} style={{
                  display: 'flex',
                  justifyContent: msg.sender_id === userId ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '60%', padding: '12px 16px',
                    background: msg.sender_id === userId
                      ? 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)'
                      : 'var(--bg3)',
                    border: msg.sender_id === userId ? 'none' : '1px solid rgba(212,160,23,.08)',
                  }}>
                    <div style={{
                      fontSize: '13px',
                      color: msg.sender_id === userId ? 'var(--black)' : 'var(--white)',
                      lineHeight: 1.6,
                    }}>{msg.content}</div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '8px', letterSpacing: '1px',
                      color: msg.sender_id === userId ? 'rgba(0,0,0,.5)' : 'var(--blue-muted)',
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
          }}>
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Écrivez votre message..."
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
      </div>
    </div>
  )
}