'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const steps = [
  {
    id: 'welcome',
    title: 'Bienvenue chez DevopCom',
    subtitle: 'Commençons par faire connaissance.',
  },
  {
    id: 'project',
    title: 'Votre projet',
    subtitle: 'Dites-nous ce que vous voulez construire.',
  },
  {
    id: 'details',
    title: 'Les détails',
    subtitle: 'Pour mieux cadrer votre projet.',
  },
  {
    id: 'confirmation',
    title: 'C\'est parti !',
    subtitle: 'Votre espace est prêt.',
  },
]

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Formulaire
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')
  const [projectDesc, setProjectDesc] = useState('')
  const [budget, setBudget] = useState('')
  const [deadline, setDeadline] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      setUser(user)
      setLoading(false)
    }
    fetchUser()
  }, [router])

  const handleNext = () => setCurrentStep(prev => prev + 1)

  const handleFinish = async () => {
    if (!user) return
    setSaving(true)

    // Mettre à jour le profil
    await supabase.from('profiles').update({
      company,
      phone,
    }).eq('id', user.id)

    // Créer le projet automatiquement
    if (projectName) {
      await supabase.from('projects').insert({
        client_id: user.id,
        name: projectName,
        description: projectDesc,
        status: 'en_cours',
        progress: 0,
        budget: budget ? Number(budget) : null,
        delivery_date: deadline || null,
        start_date: new Date().toISOString().split('T')[0],
      })
    }

    // Email de bienvenue
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        name: user.user_metadata?.full_name || 'Client',
        projectName,
        projectType,
        budget,
      }),
    })

    setSaving(false)
    setCurrentStep(3)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--gold)', fontStyle: 'italic' }}>Chargement...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>

      <div style={{ width: '100%', maxWidth: '600px' }}>

        {/* Progress */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            {steps.map((step, i) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.div
                  animate={{
                    background: i <= currentStep ? 'linear-gradient(135deg, #f5d480, #d4a017)' : 'rgba(212,160,23,.1)',
                    scale: i === currentStep ? 1.2 : 1,
                  }}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 700,
                    color: i <= currentStep ? 'var(--black)' : 'var(--blue-muted)',
                  }}
                >{i + 1}</motion.div>
                {i < steps.length - 1 && (
                  <div style={{
                    height: '1px', width: '60px',
                    background: i < currentStep ? 'var(--gold)' : 'rgba(212,160,23,.15)',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'var(--bg2)', padding: '48px 40px',
            border: '1px solid rgba(212,160,23,.15)',
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: 900, letterSpacing: '3px',
              background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>DEVOP</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', letterSpacing: '5px', color: 'var(--gold)', textTransform: 'uppercase' }}>C · O · M</div>
          </div>

          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>
            Étape {currentStep + 1} sur {steps.length}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, color: 'var(--white)', marginBottom: '8px' }}>
            {steps[currentStep].title}
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', color: 'var(--blue-muted)', fontStyle: 'italic', marginBottom: '32px' }}>
            {steps[currentStep].subtitle}
          </p>

          {/* Étape 1 — Bienvenue */}
          {currentStep === 0 && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  Entreprise / Organisation
                </label>
                <input
                  type="text" value={company} onChange={e => setCompany(e.target.value)}
                  placeholder="Nom de votre structure"
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                  }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  Téléphone
                </label>
                <input
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="+33 6 00 00 00 00"
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                  }}
                />
              </div>
              <button onClick={handleNext} style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                color: 'var(--black)', fontWeight: 600, fontSize: '13px',
                fontFamily: "'Outfit', sans-serif", border: 'none', cursor: 'pointer',
              }}>Continuer →</button>
            </div>
          )}

          {/* Étape 2 — Projet */}
          {currentStep === 1 && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  Nom du projet *
                </label>
                <input
                  type="text" value={projectName} onChange={e => setProjectName(e.target.value)}
                  placeholder="Mon site vitrine"
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  Type de projet
                </label>
                <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }}>
                  <option value="">Sélectionner...</option>
                  <option value="vitrine">Site vitrine</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">Plateforme SaaS</option>
                  <option value="com">Communication digitale</option>
                  <option value="refonte">Refonte complète</option>
                </select>
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  Description
                </label>
                <textarea
                  value={projectDesc} onChange={e => setProjectDesc(e.target.value)}
                  placeholder="Décrivez votre projet en quelques mots..."
                  rows={3}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px',
                    outline: 'none', resize: 'vertical',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setCurrentStep(0)} style={{
                  flex: 1, padding: '14px',
                  background: 'transparent', color: 'var(--blue-muted)', fontSize: '13px',
                  fontFamily: "'Outfit', sans-serif", border: '1px solid rgba(212,160,23,.15)', cursor: 'pointer',
                }}>← Retour</button>
                <button onClick={handleNext} disabled={!projectName} style={{
                  flex: 2, padding: '14px',
                  background: !projectName ? 'rgba(212,160,23,.3)' : 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                  color: 'var(--black)', fontWeight: 600, fontSize: '13px',
                  fontFamily: "'Outfit', sans-serif", border: 'none', cursor: !projectName ? 'not-allowed' : 'pointer',
                }}>Continuer →</button>
              </div>
            </div>
          )}

          {/* Étape 3 — Détails */}
          {currentStep === 2 && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  Budget estimé (€)
                </label>
                <select value={budget} onChange={e => setBudget(e.target.value)} style={{
                  width: '100%', padding: '12px 16px',
                  background: 'var(--bg)', border: '1px solid rgba(212,160,23,.15)',
                  color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                }}>
                  <option value="">Sélectionner...</option>
                  <option value="500">Moins de 500€</option>
                  <option value="1500">500€ — 1 500€</option>
                  <option value="3000">1 500€ — 3 000€</option>
                  <option value="5000">3 000€ et plus</option>
                </select>
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>
                  Date de livraison souhaitée
                </label>
                <input
                  type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(212,160,23,.04)', border: '1px solid rgba(212,160,23,.15)',
                    color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontSize: '13px', outline: 'none',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setCurrentStep(1)} style={{
                  flex: 1, padding: '14px',
                  background: 'transparent', color: 'var(--blue-muted)', fontSize: '13px',
                  fontFamily: "'Outfit', sans-serif", border: '1px solid rgba(212,160,23,.15)', cursor: 'pointer',
                }}>← Retour</button>
                <button onClick={handleFinish} disabled={saving} style={{
                  flex: 2, padding: '14px',
                  background: saving ? 'rgba(212,160,23,.5)' : 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                  color: 'var(--black)', fontWeight: 600, fontSize: '13px',
                  fontFamily: "'Outfit', sans-serif", border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                }}>{saving ? 'Création...' : 'Lancer mon projet →'}</button>
              </div>
            </div>
          )}

          {/* Étape 4 — Confirmation */}
          {currentStep === 3 && (
            <div style={{ textAlign: 'center' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                style={{ fontSize: '64px', marginBottom: '24px' }}
              >🎉</motion.div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px', color: 'var(--blue-muted)', fontStyle: 'italic', marginBottom: '32px', lineHeight: 1.7,
              }}>
                Votre projet <strong style={{ color: 'var(--white)' }}>{projectName}</strong> a été créé. Je vous contacte sous 48h pour démarrer.
              </p>
              <button onClick={() => router.push('/dashboard')} style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                color: 'var(--black)', fontWeight: 600, fontSize: '13px',
                fontFamily: "'Outfit', sans-serif", border: 'none', cursor: 'pointer',
              }}>Accéder à mon dashboard →</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}