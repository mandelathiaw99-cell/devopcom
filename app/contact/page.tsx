'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSend = async () => {
    if (!name || !email || !message) return
    setSending(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (res.ok) {
        setSent(true)
      } else {
        setError('Une erreur est survenue. Réessayez.')
      }
    } catch {
      setError('Une erreur est survenue. Réessayez.')
    }
    setSending(false)
  }

  const infos = [
    { label: 'Email', value: 'contact@devopcom.fr', icon: '✉' },
    { label: 'Localisation', value: 'Bordeaux, France', icon: '📍' },
    { label: 'Disponibilité', value: 'Lun — Ven, 9h — 18h', icon: '🕐' },
    { label: 'Réponse garantie', value: 'Sous 48h', icon: '⚡' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '68px' }}>

      {/* Header */}
      <div style={{
        padding: '80px 56px 60px',
        borderBottom: '1px solid rgba(212,160,23,.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)',
            }}>Contact — Parlons de votre projet</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 300,
            lineHeight: .88, letterSpacing: '-2px', color: 'var(--white)', marginBottom: '24px',
          }}>
            On démarre<br />
            <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>quand vous voulez.</em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--blue-muted)',
            fontStyle: 'italic', maxWidth: '600px', lineHeight: 1.7,
          }}>
            Un projet, une question, une collaboration ? On répond sous 48h, sans engagement, sans jargon.
          </p>
        </motion.div>
      </div>

      {/* Contenu */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '0',
        minHeight: '600px',
      }}>

        {/* Infos */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            padding: '60px 56px',
            background: 'var(--bg2)',
            borderRight: '1px solid rgba(212,160,23,.08)',
          }}
        >
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px', fontWeight: 600, color: 'var(--gold)', marginBottom: '32px',
          }}>Informations</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
            {infos.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  padding: '20px', background: 'var(--bg)',
                  border: '1px solid rgba(212,160,23,.08)',
                }}
              >
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{info.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--gold)', marginBottom: '4px',
                  }}>{info.label}</div>
                  <div style={{ fontSize: '14px', color: 'var(--white)' }}>{info.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Réseaux */}
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--blue-muted)', marginBottom: '16px',
            }}>Réseaux sociaux</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'LinkedIn', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'GitHub', href: 'https://github.com/mandelathiaw99-cell' },
              ].map(r => (
                <motion.a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(212,160,23,.5)' }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '8px 14px', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--blue-muted)', textDecoration: 'none',
                  }}
                >{r.label}</motion.a>
              ))}
            </div>
          </div>

          {/* Devis rapide */}
          <div style={{ marginTop: '48px' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--blue-muted)', marginBottom: '12px',
            }}>Vous préférez un devis automatique ?</div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/devis" style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--black)', textDecoration: 'none',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              }}>Faire le questionnaire →</Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{ padding: '60px 56px' }}
        >
          {sent ? (
            <div style={{ textAlign: 'center', paddingTop: '80px' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{ fontSize: '64px', marginBottom: '24px' }}
              >✦</motion.div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '40px', fontWeight: 300, color: 'var(--gold)', marginBottom: '16px',
              }}>Message envoyé !</h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px', color: 'var(--blue-muted)', fontStyle: 'italic', marginBottom: '32px',
              }}>
                Je vous recontacte sous 48h.
              </p>
              <button onClick={() => setSent(false)} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--blue-muted)', background: 'transparent',
                border: '1px solid rgba(212,160,23,.15)', padding: '10px 24px', cursor: 'pointer',
              }}>Envoyer un autre message</button>
            </div>
          ) : (
            <>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px', fontWeight: 600, color: 'var(--gold)', marginBottom: '32px',
              }}>Votre message</div>

              {/* Nom + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                    letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                    display: 'block', marginBottom: '8px',
                  }}>Nom complet *</label>
                  <input
                    type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Votre nom"
                    style={{
                      width: '100%', padding: '12px 16px',
                      background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                      color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                    letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                    display: 'block', marginBottom: '8px',
                  }}>Email *</label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    style={{
                      width: '100%', padding: '12px 16px',
                      background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                      color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Sujet */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                  letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                  display: 'block', marginBottom: '8px',
                }}>Sujet</label>
                <input
                  type="text" value={subject} onChange={e => setSubject(e.target.value)}
                  placeholder="Objet de votre message"
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                  }}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                  letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                  display: 'block', marginBottom: '8px',
                }}>Message *</label>
                <textarea
                  value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Décrivez votre projet, vos besoins, votre budget..."
                  rows={6}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px',
                    outline: 'none', resize: 'vertical',
                  }}
                />
              </div>

              {/* Erreur */}
              {error && (
                <div style={{
                  padding: '12px 16px', marginBottom: '16px',
                  background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)',
                  color: '#ef4444', fontSize: '13px',
                }}>{error}</div>
              )}

              {/* Bouton */}
              <motion.button
                onClick={handleSend}
                disabled={sending || !name || !email || !message}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%', padding: '16px',
                  background: (!name || !email || !message) ? 'rgba(212,160,23,.3)' : 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                  color: 'var(--black)', fontWeight: 600, fontSize: '13px',
                  fontFamily: "'Outfit', sans-serif",
                  border: 'none', cursor: (!name || !email || !message) ? 'not-allowed' : 'pointer',
                  letterSpacing: '1px',
                }}
              >
                {sending ? 'Envoi en cours...' : 'Envoyer le message →'}
              </motion.button>

              <div style={{
                marginTop: '16px', textAlign: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px', letterSpacing: '1px', color: 'var(--blue-muted)',
                textTransform: 'uppercase',
              }}>
                Réponse garantie sous 48h · Sans engagement
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}