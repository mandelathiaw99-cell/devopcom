'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface AnalysisResult {
  score: number
  seo: { score: number; details: string[] }
  performance: { score: number; details: string[] }
  social: { score: number; details: string[] }
  strategy: { recommendations: string[] }
  summary: string
}

export default function Analyser() {
  const [url, setUrl] = useState('')
  const [company, setCompany] = useState('')
  const [sector, setSector] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')

  const steps = [
    'Analyse de votre site web...',
    'Vérification du SEO...',
    'Analyse de la performance...',
    'Génération de la stratégie IA...',
    'Compilation du rapport...',
  ]

  const handleAnalyse = async () => {
    if (!url) return
    setAnalyzing(true)
    setError('')
    setResult(null)
    setStep(0)

    // Animation des étapes
    for (let i = 0; i < steps.length; i++) {
      setStep(i)
      await new Promise(r => setTimeout(r, 1500))
    }

    try {
      const res = await fetch('/api/analyser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, company, sector }),
      })

      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError('Une erreur est survenue. Vérifiez l\'URL et réessayez.')
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
            }}>Analyseur Digital — Propulsé par IA</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 300,
            lineHeight: .88, letterSpacing: '-2px', color: 'var(--white)', marginBottom: '24px',
          }}>
            Analysez votre<br />
            <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>présence digitale.</em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--blue-muted)',
            fontStyle: 'italic', maxWidth: '600px', lineHeight: 1.7, marginBottom: '40px',
          }}>
            Entrez l'URL de votre site et notre IA génère un rapport complet — SEO, performance, stratégie digitale et recommandations personnalisées.
          </p>

          {/* Formulaire */}
          <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                  letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                  display: 'block', marginBottom: '8px',
                }}>URL de votre site *</label>
                <input
                  type="url" value={url} onChange={e => setUrl(e.target.value)}
                  placeholder="https://votresite.com"
                  style={{
                    width: '100%', padding: '14px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.2)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif",
                    fontSize: '14px', outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px',
                  letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                  display: 'block', marginBottom: '8px',
                }}>Nom de l'entreprise</label>
                <input
                  type="text" value={company} onChange={e => setCompany(e.target.value)}
                  placeholder="Votre entreprise"
                  style={{
                    width: '100%', padding: '14px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif",
                    fontSize: '14px', outline: 'none',
                  }}
                />
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
                  <option value="immobilier">Immobilier</option>
                  <option value="sante">Santé / Bien-être</option>
                  <option value="education">Education / Formation</option>
                  <option value="tech">Tech / Startup</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <motion.button
              onClick={handleAnalyse}
              disabled={analyzing || !url}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '16px',
                background: (!url || analyzing) ? 'rgba(212,160,23,.3)' : 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                color: 'var(--black)', fontWeight: 600, fontSize: '14px',
                fontFamily: "'Outfit', sans-serif",
                border: 'none', cursor: (!url || analyzing) ? 'not-allowed' : 'pointer',
                marginTop: '8px',
              }}
            >
              {analyzing ? 'Analyse en cours...' : 'Analyser maintenant — Gratuit →'}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Animation analyse */}
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
                border: '2px solid rgba(212,160,23,.2)',
                borderTop: '2px solid var(--gold)',
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
                  background: i <= step ? 'var(--gold)' : 'rgba(212,160,23,.2)',
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
            color: '#ef4444', fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px', letterSpacing: '1px',
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
            {/* Score global */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '16px',
              }}>Score Global</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                style={{
                  width: '160px', height: '160px', margin: '0 auto 16px',
                  borderRadius: '50%',
                  background: `conic-gradient(${getScoreColor(result.score)} ${result.score * 3.6}deg, rgba(212,160,23,.1) 0deg)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: 'var(--bg)', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '48px', fontWeight: 600,
                    color: getScoreColor(result.score), lineHeight: 1,
                  }}>{result.score}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '1px', color: 'var(--blue-muted)',
                    textTransform: 'uppercase',
                  }}>/100</div>
                </div>
              </motion.div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '24px', color: getScoreColor(result.score), fontWeight: 600,
              }}>{getScoreLabel(result.score)}</div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic',
                maxWidth: '600px', margin: '12px auto 0', lineHeight: 1.6,
              }}>{result.summary}</p>
            </div>

            {/* Scores détaillés */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'SEO', score: result.seo.score, details: result.seo.details, icon: '🔍' },
                { label: 'Performance', score: result.performance.score, details: result.performance.details, icon: '⚡' },
                { label: 'Présence Sociale', score: result.social.score, details: result.social.details, icon: '📱' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{
                    background: 'var(--bg2)', padding: '28px',
                    border: '1px solid rgba(212,160,23,.08)',
                    borderTop: `3px solid ${getScoreColor(item.score)}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>{item.icon}</span>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                        letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                      }}>{item.label}</span>
                    </div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '32px', fontWeight: 600, color: getScoreColor(item.score),
                    }}>{item.score}</div>
                  </div>

                  {/* Barre */}
                  <div style={{ height: '4px', background: 'rgba(212,160,23,.1)', marginBottom: '16px' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      style={{ height: '100%', background: getScoreColor(item.score) }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.details.map((detail, j) => (
                      <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: getScoreColor(item.score), flexShrink: 0, marginTop: '2px' }}>▸</span>
                        <span style={{ fontSize: '12px', color: 'var(--blue-muted)', lineHeight: 1.5 }}>{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stratégie IA */}
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
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '9px',
                  letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)',
                }}>Stratégie IA — Recommandations personnalisées</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {result.strategy.recommendations.map((rec, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                    padding: '12px 16px', background: 'var(--bg)',
                    border: '1px solid rgba(212,160,23,.06)',
                  }}>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '20px', fontWeight: 600, color: 'var(--gold)',
                      flexShrink: 0, lineHeight: 1,
                    }}>{i + 1}</span>
                    <span style={{ fontSize: '13px', color: 'var(--white)', lineHeight: 1.6 }}>{rec}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px', fontWeight: 300, color: 'var(--white)', marginBottom: '16px',
              }}>
                Vous voulez améliorer ces scores ?
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
                  <button onClick={() => { setResult(null); setUrl(''); setCompany(''); setSector('') }} style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
                    color: 'var(--blue-muted)', padding: '16px 40px',
                    background: 'transparent', border: '1px solid rgba(212,160,23,.2)', cursor: 'pointer',
                  }}>Analyser un autre site</button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}