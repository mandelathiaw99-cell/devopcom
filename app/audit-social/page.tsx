'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface AuditResult {
  handle: string
  platform: string
  score: number
  summary: string
  followers: { estimated: string; growth: string }
  engagement: { rate: string; score: number; details: string[] }
  content: { score: number; details: string[] }
  strategy: { score: number; recommendations: string[] }
}

export default function AuditSocial() {
  const [handle, setHandle] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [sector, setSector] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')

  const steps = [
    'Recherche du profil...',
    'Analyse des publications...',
    'Calcul du taux d\'engagement...',
    'Analyse de la stratégie...',
    'Génération du rapport...',
  ]

  const handleAudit = async () => {
    if (!handle) return
    setAnalyzing(true)
    setError('')
    setResult(null)
    setStep(0)

    for (let i = 0; i < steps.length; i++) {
      setStep(i)
      await new Promise(r => setTimeout(r, 1500))
    }

    try {
      const res = await fetch('/api/audit-social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, platform, sector }),
      })

      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError('Une erreur est survenue. Vérifiez le handle et réessayez.')
    }

    setAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e'
    if (score >= 60) return '#d4a017'
    return '#ef4444'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Moyen'
    return 'À améliorer'
  }

  const platformColors: Record<string, string> = {
    instagram: '#f953c6',
    tiktok: '#06b6d4',
    facebook: '#2563eb',
    linkedin: '#0077b5',
  }

  const platformIcons: Record<string, string> = {
    instagram: '📸',
    tiktok: '🎵',
    facebook: '👥',
    linkedin: '💼',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '68px' }}>

      {/* Header */}
      <div style={{
        padding: '80px 56px 60px',
        borderBottom: '1px solid rgba(212,160,23,.08)',
        background: 'var(--bg2)',
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
            }}>Auditeur Social — Propulsé par IA</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 300,
            lineHeight: .88, letterSpacing: '-2px', color: 'var(--white)', marginBottom: '24px',
          }}>
            Auditez vos<br />
            <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>réseaux sociaux.</em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--blue-muted)',
            fontStyle: 'italic', maxWidth: '600px', lineHeight: 1.7, marginBottom: '40px',
          }}>
            Entrez votre handle et notre IA analyse votre présence sociale — engagement, contenu, stratégie et recommandations personnalisées.
          </p>

          {/* Formulaire */}
          <div style={{ maxWidth: '700px' }}>

            {/* Sélection plateforme */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                display: 'block', marginBottom: '12px',
              }}>Plateforme</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['instagram', 'tiktok', 'facebook', 'linkedin'].map(p => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    style={{
                      padding: '10px 20px', cursor: 'pointer',
                      background: platform === p ? `${platformColors[p]}22` : 'transparent',
                      border: `1px solid ${platform === p ? platformColors[p] : 'rgba(212,160,23,.15)'}`,
                      color: platform === p ? platformColors[p] : 'var(--blue-muted)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}
                  >
                    <span>{platformIcons[p]}</span>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                  letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                  display: 'block', marginBottom: '8px',
                }}>Handle / Nom du compte *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <div style={{
                    padding: '14px 12px',
                    background: 'rgba(212,160,23,.08)',
                    border: '1px solid rgba(212,160,23,.2)',
                    borderRight: 'none',
                    color: 'var(--gold)',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '14px',
                  }}>@</div>
                  <input
                    type="text" value={handle} onChange={e => setHandle(e.target.value)}
                    placeholder="votrecompte"
                    style={{
                      flex: 1, padding: '14px 16px',
                      background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.2)',
                      color: 'var(--white)', fontFamily: "'Outfit', sans-serif",
                      fontSize: '14px', outline: 'none',
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                  letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                  display: 'block', marginBottom: '8px',
                }}>Secteur d'activité</label>
                <select value={sector} onChange={e => setSector(e.target.value)} style={{
                  width: '100%', padding: '14px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif",
                  fontSize: '14px', outline: 'none',
                }}>
                  <option value="">Sélectionner...</option>
                  <option value="restaurant">Restaurant / Food</option>
                  <option value="commerce">Commerce / Retail</option>
                  <option value="association">Association</option>
                  <option value="consulting">Consulting / Services</option>
                  <option value="mode">Mode / Beauté</option>
                  <option value="sport">Sport / Fitness</option>
                  <option value="tech">Tech / Startup</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <motion.button
              onClick={handleAudit}
              disabled={analyzing || !handle}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '16px',
                background: (!handle || analyzing) ? 'rgba(212,160,23,.3)' : 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                color: 'var(--black)', fontWeight: 600, fontSize: '14px',
                fontFamily: "'Outfit', sans-serif",
                border: 'none', cursor: (!handle || analyzing) ? 'not-allowed' : 'pointer',
                marginTop: '8px',
              }}
            >
              {analyzing ? 'Audit en cours...' : 'Auditer maintenant — Gratuit →'}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Animation */}
      <AnimatePresence>
        {analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: '60px 56px', textAlign: 'center' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '60px', height: '60px', margin: '0 auto 24px',
                border: `2px solid ${platformColors[platform]}33`,
                borderTop: `2px solid ${platformColors[platform]}`,
                borderRadius: '50%',
              }}
            />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '24px', color: 'var(--white)', marginBottom: '12px',
            }}>
              {steps[step]}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {steps.map((_, i) => (
                <div key={i} style={{
                  width: i <= step ? '24px' : '8px', height: '4px',
                  background: i <= step ? platformColors[platform] : 'rgba(212,160,23,.2)',
                  transition: 'all .3s',
                }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Erreur */}
      {error && (
        <div style={{ padding: '24px 56px' }}>
          <div style={{
            padding: '16px 24px',
            background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)',
            color: '#ef4444', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px',
          }}>{error}</div>
        </div>
      )}

      {/* Résultats */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ padding: '60px 56px' }}
          >
            {/* Header résultat */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: `${platformColors[result.platform]}22`,
                border: `2px solid ${platformColors[result.platform]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px',
              }}>{platformIcons[result.platform]}</div>
              <div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '32px', fontWeight: 600, color: 'var(--white)', lineHeight: 1,
                }}>@{result.handle}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: platformColors[result.platform], marginTop: '4px',
                }}>{result.platform}</div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '56px', fontWeight: 600,
                  color: getScoreColor(result.score), lineHeight: 1,
                }}>{result.score}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                  letterSpacing: '2px', color: getScoreColor(result.score), textTransform: 'uppercase',
                }}>{getScoreLabel(result.score)}</div>
              </div>
            </div>

            {/* Résumé */}
            <div style={{
              padding: '24px', background: 'var(--bg2)',
              border: '1px solid rgba(212,160,23,.08)',
              borderLeft: `3px solid ${platformColors[result.platform]}`,
              marginBottom: '32px',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px', color: 'var(--white)', fontStyle: 'italic', lineHeight: 1.7,
              }}>{result.summary}</p>
            </div>

            {/* Stats estimées */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              <div style={{ background: 'var(--bg2)', padding: '20px', border: '1px solid rgba(212,160,23,.08)' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-muted)', marginBottom: '8px' }}>Abonnés estimés</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, color: 'var(--gold)' }}>{result.followers.estimated}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#22c55e', marginTop: '4px' }}>{result.followers.growth}</div>
              </div>
              <div style={{ background: 'var(--bg2)', padding: '20px', border: '1px solid rgba(212,160,23,.08)' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-muted)', marginBottom: '8px' }}>Taux d'engagement</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, color: getScoreColor(result.engagement.score) }}>{result.engagement.rate}</div>
              </div>
            </div>

            {/* Scores détaillés */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Engagement', score: result.engagement.score, details: result.engagement.details, icon: '❤️' },
                { label: 'Contenu', score: result.content.score, details: result.content.details, icon: '🎨' },
                { label: 'Stratégie', score: result.strategy.score, details: [], icon: '📊' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{
                    background: 'var(--bg2)', padding: '24px',
                    border: '1px solid rgba(212,160,23,.08)',
                    borderTop: `3px solid ${getScoreColor(item.score)}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>{item.icon}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>{item.label}</span>
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 600, color: getScoreColor(item.score) }}>{item.score}</div>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(212,160,23,.1)', marginBottom: '12px' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ height: '100%', background: getScoreColor(item.score) }}
                    />
                  </div>
                  {item.details.map((detail, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: getScoreColor(item.score), flexShrink: 0 }}>▸</span>
                      <span style={{ fontSize: '12px', color: 'var(--blue-muted)', lineHeight: 1.5 }}>{detail}</span>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Recommandations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                background: 'var(--bg2)', padding: '32px',
                border: '1px solid rgba(212,160,23,.15)',
                borderLeft: '3px solid var(--gold)',
                marginBottom: '40px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>🤖</span>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Recommandations IA — Plan d'action
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {result.strategy.recommendations.map((rec, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                    padding: '12px 16px', background: 'var(--bg)',
                    border: '1px solid rgba(212,160,23,.06)',
                  }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, color: 'var(--gold)', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: '13px', color: 'var(--white)', lineHeight: 1.6 }}>{rec}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, color: 'var(--white)', marginBottom: '16px' }}>
                Vous voulez améliorer votre présence sociale ?
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/devis" style={{
                    display: 'inline-block',
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
                    color: 'var(--black)', textDecoration: 'none', padding: '16px 40px',
                    background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                  }}>Demander un devis gratuit →</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <button onClick={() => { setResult(null); setHandle(''); setSector('') }} style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
                    color: 'var(--blue-muted)', padding: '16px 40px',
                    background: 'transparent', border: '1px solid rgba(212,160,23,.2)', cursor: 'pointer',
                  }}>Auditer un autre compte</button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}