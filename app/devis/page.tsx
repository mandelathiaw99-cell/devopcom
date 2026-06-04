'use client'

import { useState } from 'react'
import Link from 'next/link'

const steps = [
  {
    id: 'type',
    question: 'Quel type de projet avez-vous ?',
    options: [
      { label: 'Site vitrine', icon: '🌐', value: 'vitrine', points: { starter: 3, pro: 1, studio: 0, retainer: 0 } },
      { label: 'E-commerce / Paiements', icon: '🛒', value: 'ecommerce', points: { starter: 0, pro: 3, studio: 2, retainer: 0 } },
      { label: 'Refonte complète', icon: '🔄', value: 'refonte', points: { starter: 0, pro: 1, studio: 3, retainer: 0 } },
      { label: 'Communication digitale', icon: '📱', value: 'com', points: { starter: 1, pro: 2, studio: 1, retainer: 2 } },
    ],
  },
  {
    id: 'budget',
    question: 'Quel est votre budget estimé ?',
    options: [
      { label: 'Moins de 500€', icon: '💰', value: 'low', points: { starter: 3, pro: 0, studio: 0, retainer: 1 } },
      { label: '500€ — 1 500€', icon: '💳', value: 'mid', points: { starter: 1, pro: 3, studio: 0, retainer: 1 } },
      { label: '1 500€ — 3 000€', icon: '💎', value: 'high', points: { starter: 0, pro: 2, studio: 3, retainer: 1 } },
      { label: '3 000€ et plus', icon: '🏆', value: 'premium', points: { starter: 0, pro: 1, studio: 3, retainer: 2 } },
    ],
  },
  {
    id: 'delai',
    question: 'Quel est votre délai souhaité ?',
    options: [
      { label: 'Urgent (< 2 semaines)', icon: '⚡', value: 'urgent', points: { starter: 3, pro: 1, studio: 0, retainer: 0 } },
      { label: 'Normal (1 — 2 mois)', icon: '📅', value: 'normal', points: { starter: 1, pro: 3, studio: 2, retainer: 1 } },
      { label: 'Flexible (3 mois+)', icon: '🗓️', value: 'flexible', points: { starter: 0, pro: 2, studio: 3, retainer: 2 } },
    ],
  },
  {
    id: 'services',
    question: 'Quels services vous intéressent ?',
    options: [
      { label: 'Développement web uniquement', icon: '💻', value: 'dev', points: { starter: 2, pro: 1, studio: 1, retainer: 0 } },
      { label: 'Communication uniquement', icon: '📣', value: 'com', points: { starter: 0, pro: 1, studio: 0, retainer: 3 } },
      { label: 'Web + Communication', icon: '🚀', value: 'both', points: { starter: 0, pro: 3, studio: 2, retainer: 1 } },
      { label: 'Maintenance / Suivi mensuel', icon: '🔧', value: 'maintenance', points: { starter: 0, pro: 0, studio: 0, retainer: 3 } },
    ],
  },
  {
    id: 'structure',
    question: 'Vous représentez quelle structure ?',
    options: [
      { label: 'Particulier / Freelance', icon: '👤', value: 'particulier', points: { starter: 3, pro: 1, studio: 0, retainer: 0 } },
      { label: 'Association', icon: '🤝', value: 'asso', points: { starter: 2, pro: 2, studio: 1, retainer: 1 } },
      { label: 'PME / Startup', icon: '🏢', value: 'pme', points: { starter: 0, pro: 3, studio: 2, retainer: 2 } },
      { label: 'Institution / Grande entreprise', icon: '🏛️', value: 'institution', points: { starter: 0, pro: 1, studio: 3, retainer: 2 } },
    ],
  },
]

const packs = {
  starter: {
    name: 'Starter',
    price: '500€',
    desc: 'Parfait pour démarrer avec une présence web professionnelle.',
    features: ['Site vitrine 5 pages', 'Design responsive', 'Déploiement Vercel', 'Formulaire de contact', 'SEO de base'],
  },
  pro: {
    name: 'Pro',
    price: '1 500€',
    desc: 'La solution complète pour les structures ambitieuses.',
    features: ['Site Next.js sur-mesure', 'CMS Sanity intégré', 'Intégration Stripe', 'Stratégie réseaux sociaux', 'Identité visuelle', 'Formation incluse'],
  },
  studio: {
    name: 'Studio',
    price: '2 500€',
    desc: 'Refonte complète + accompagnement stratégique long terme.',
    features: ['Audit digital complet', 'Refonte Next.js from scratch', 'Dashboard client inclus', 'Communication 3 mois', 'Reporting mensuel'],
  },
  retainer: {
    name: 'Retainer',
    price: '400€/mois',
    desc: 'Suivi mensuel pour maintenir et faire grandir votre digital.',
    features: ['Maintenance site', '4 posts réseaux/mois', 'Rapport mensuel', 'Support prioritaire 48h', 'Mises à jour sécurité'],
  },
}

type PackKey = 'starter' | 'pro' | 'studio' | 'retainer'

export default function Devis() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [scores, setScores] = useState({ starter: 0, pro: 0, studio: 0, retainer: 0 })
  const [result, setResult] = useState<PackKey | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleAnswer = (option: typeof steps[0]['options'][0]) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: option.value }
    const newScores = {
      starter: scores.starter + option.points.starter,
      pro: scores.pro + option.points.pro,
      studio: scores.studio + option.points.studio,
      retainer: scores.retainer + option.points.retainer,
    }
    setAnswers(newAnswers)
    setScores(newScores)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const recommended = Object.entries(newScores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0] as PackKey
      setResult(recommended)
    }
  }

  const handleSend = async () => {
    if (!name || !email) return
    setSending(true)
    try {
      await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          pack: packs[result!].name,
          answers,
        }),
      })
      setSent(true)
    } catch (error) {
      console.error(error)
    }
    setSending(false)
  }

  const progress = ((currentStep) / steps.length) * 100

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '68px' }}>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '68px', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(10,18,32,.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212,160,23,.1)',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: '17px', fontWeight: 900, letterSpacing: '3px',
            background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1,
          }}>DEVOP</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--gold)' }}>C · O · M</div>
        </Link>
        <Link href="/" style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--blue-muted)', textDecoration: 'none',
        }}>← Retour</Link>
      </nav>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 24px' }}>

        {!result ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px',
              }}>Questionnaire devis — {currentStep + 1}/{steps.length}</div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 300,
                color: 'var(--white)', lineHeight: 1.1,
              }}>{steps[currentStep].question}</h1>
            </div>

            <div style={{
              height: '2px', background: 'rgba(212,160,23,.1)',
              marginBottom: '48px', borderRadius: '1px', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${progress}%`,
                background: 'linear-gradient(90deg, #f5d480, #d4a017)',
                transition: 'width .4s ease',
              }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '12px',
            }}>
              {steps[currentStep].options.map((option) => (
                <button key={option.value} onClick={() => handleAnswer(option)} style={{
                  background: 'var(--bg2)', padding: '28px 24px',
                  border: '1px solid rgba(212,160,23,.1)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'border-color .2s, background .2s, transform .2s',
                  display: 'flex', alignItems: 'center', gap: '16px',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--gold)'
                    e.currentTarget.style.background = 'var(--bg3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(212,160,23,.1)'
                    e.currentTarget.style.background = 'var(--bg2)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span style={{ fontSize: '28px', flexShrink: 0 }}>{option.icon}</span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '18px', fontWeight: 600, color: 'var(--white)',
                  }}>{option.label}</span>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button onClick={() => setCurrentStep(currentStep - 1)} style={{
                marginTop: '32px', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-muted)',
              }}>← Question précédente</button>
            )}
          </>
        ) : sent ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>✦</div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '40px', fontWeight: 300, color: 'var(--gold)', marginBottom: '16px',
            }}>Demande envoyée !</h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '18px',
              color: 'var(--blue-muted)', fontStyle: 'italic', marginBottom: '32px',
            }}>
              Je vous recontacte sous 48h pour discuter de votre projet.
            </p>
            <Link href="/" style={{
              background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
              color: 'var(--black)', padding: '14px 32px',
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
              textDecoration: 'none', display: 'inline-block',
            }}>← Retour à l'accueil</Link>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px',
              }}>Notre recommandation</div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 300,
                color: 'var(--white)', lineHeight: 1.1,
              }}>
                Le pack <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>
                  {packs[result].name}
                </em> vous correspond.
              </h2>
            </div>

            <div style={{
              background: 'var(--bg2)', padding: '40px',
              border: '1px solid rgba(212,160,23,.25)',
              marginBottom: '32px',
              boxShadow: '0 0 40px rgba(212,160,23,.08)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, color: 'var(--gold)' }}>{packs[result].name}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 600, color: 'var(--white)', lineHeight: 1 }}>{packs[result].price}</div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                  color: 'var(--black)', padding: '6px 16px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700,
                }}>✦ Recommandé</div>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--blue-muted)', lineHeight: 1.7, marginBottom: '24px' }}>{packs[result].desc}</p>

              <div style={{ height: '1px', background: 'rgba(212,160,23,.08)', marginBottom: '20px' }} />

              <ul style={{ listStyle: 'none' }}>
                {packs[result].features.map(f => (
                  <li key={f} style={{
                    fontSize: '13px', color: 'var(--white2)',
                    padding: '8px 0', borderBottom: '1px solid rgba(212,160,23,.05)',
                    display: 'flex', gap: '10px',
                  }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>▸</span>{f}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--bg2)', padding: '32px', border: '1px solid rgba(212,160,23,.08)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--gold)', marginBottom: '24px' }}>
                Demander ce devis
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Nom complet *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom" style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                  }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Email *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                  }} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Décrivez votre projet (optionnel)</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Décrivez votre projet en quelques mots..." rows={4} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px',
                  outline: 'none', resize: 'vertical',
                }} />
              </div>

              <button onClick={handleSend} disabled={sending || !name || !email} style={{
                width: '100%', padding: '14px',
                background: (!name || !email) ? 'rgba(212,160,23,.3)' : 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                color: 'var(--black)', fontWeight: 600, fontSize: '13px',
                fontFamily: "'Outfit', sans-serif",
                border: 'none', cursor: (!name || !email) ? 'not-allowed' : 'pointer',
                letterSpacing: '1px',
              }}>
                {sending ? 'Envoi en cours...' : `Demander le devis ${packs[result].name} →`}
              </button>

              <button onClick={() => { setResult(null); setCurrentStep(0); setScores({ starter: 0, pro: 0, studio: 0, retainer: 0 }); setAnswers({}) }} style={{
                width: '100%', marginTop: '12px', padding: '10px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-muted)',
              }}>
                ← Recommencer le questionnaire
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}