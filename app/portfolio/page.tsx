'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 'abess',
    num: '01',
    title: 'ABESS',
    subtitle: 'Association Bordelaise des Étudiants Sénégalais',
    category: 'Web + Communication',
    year: '2025',
    description: 'Refonte complète du site de l\'association — espace membre, billetterie en ligne, calendrier des événements, boutique et système de paiement Stripe. Une plateforme communautaire complète pour la diaspora sénégalaise de Bordeaux.',
    tags: ['Next.js', 'Supabase', 'Stripe', 'Tailwind', 'Vercel'],
    url: 'https://assosabess.com',
    color: '#00853F',
    metrics: [
      { val: '500+', label: 'Membres' },
      { val: '9', label: 'Partenaires' },
      { val: '100%', label: 'Sur-mesure' },
    ],
  },
  {
    id: 'easytud',
    num: '02',
    title: 'EasyTud',
    subtitle: 'Accompagnement des étudiants internationaux',
    category: 'Communication + Stratégie',
    year: '2026',
    description: 'Création des supports de communication pour le lancement — carrousels Instagram/TikTok, flyers physiques, rapport d\'activité et stratégie de contenu pour la startup bordelaise spécialisée dans l\'accompagnement des étudiants internationaux.',
    tags: ['Communication', 'Identité visuelle', 'Réseaux sociaux', 'Print'],
    url: 'https://easytud.com',
    color: '#2563eb',
    metrics: [
      { val: '3', label: 'Supports créés' },
      { val: '48h', label: 'Délai livraison' },
      { val: '100%', label: 'Satisfaction' },
    ],
  },
  {
    id: 'consulat',
    num: '03',
    title: 'Consulat Général du Sénégal',
    subtitle: 'Institution officielle — Bordeaux',
    category: 'Digital + Communication',
    year: '2026',
    description: 'Gestion de la plateforme E-consulat et communication digitale du Consulat Général du Sénégal à Bordeaux. Accompagnement dans la transition numérique et la modernisation des outils de communication institutionnelle.',
    tags: ['E-consulat', 'Communication', 'Institutionnel', 'Digital'],
    url: '#',
    color: '#d4a017',
    metrics: [
      { val: '1000+', label: 'Usagers' },
      { val: '100%', label: 'Institutionnel' },
      { val: 'Bordeaux', label: 'Localisation' },
    ],
  },
  {
    id: 'devopcom',
    num: '04',
    title: 'DevopCom',
    subtitle: 'Agence digitale — Plateforme SaaS',
    category: 'Web + SaaS',
    year: '2026',
    description: 'Conception et développement de la plateforme DevopCom — site vitrine premium, système d\'authentification, dashboard client, panel admin, questionnaire de devis automatique et système d\'emails automatisés.',
    tags: ['Next.js', 'Supabase', 'Framer Motion', 'Resend', 'Vercel'],
    url: 'https://devopcom.fr',
    color: '#7c3aed',
    metrics: [
      { val: '10+', label: 'Pages' },
      { val: 'SaaS', label: 'Architecture' },
      { val: '100%', label: 'Sur-mesure' },
    ],
  },
  {
    id: 'aaed',
    num: '05',
    title: 'AAED',
    subtitle: 'Auto-Entrepreneurs Africains de la Diaspora',
    category: 'Web + Paiement + Sécurité',
    year: '2026',
    description: 'Plateforme complète pour l\'association fédérant plus de 1500 entrepreneurs africains de la diaspora — gestion d\'événements, système de réservation de stands (Bronze, Gold, Culinaire) via Stripe, dashboard membre à 9 espaces incluant messagerie et marketplace, cartes de membre numériques avec QR code, et audit de sécurité complet.',
    tags: ['Next.js', 'Supabase', 'Stripe', 'Resend', 'Vercel'],
    url: 'https://aaed.fr',
    color: '#8B5E34',
    metrics: [
      { val: '1500+', label: 'Membres' },
      { val: '9', label: 'Espaces membre' },
      { val: '100%', label: 'Sur-mesure' },
    ],
  },
]

export default function Portfolio() {
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
            }}>Portfolio — Projets réalisés</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 300,
            lineHeight: .88, letterSpacing: '-2px', color: 'var(--white)',
            marginBottom: '24px',
          }}>
            Ce qu'on a<br />
            <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>construit.</em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--blue-muted)',
            fontStyle: 'italic', maxWidth: '600px', lineHeight: 1.7,
          }}>
            Chaque projet est unique. Voilà ce qu'on a accompli pour nos clients — en code, en design et en communication.
          </p>
        </motion.div>
      </div>

      {/* Projets */}
      <div style={{ padding: '0 56px 80px' }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            style={{
              padding: '64px 0',
              borderBottom: '1px solid rgba(212,160,23,.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Infos */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '72px', fontWeight: 600, lineHeight: 1,
                  color: 'rgba(212,160,23,.08)',
                }}>{project.num}</span>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--gold)', marginBottom: '4px',
                  }}>{project.category} · {project.year}</div>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600,
                    color: 'var(--white)', lineHeight: .9,
                  }}>{project.title}</h2>
                </div>
              </div>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16px', color: 'var(--blue-muted)',
                fontStyle: 'italic', marginBottom: '8px',
              }}>{project.subtitle}</p>

              <p style={{
                fontSize: '13px', color: 'var(--blue-muted)',
                lineHeight: 1.8, marginBottom: '24px',
              }}>{project.description}</p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '4px 10px',
                    border: `1px solid ${project.color}33`,
                    color: project.color,
                  }}>{tag}</span>
                ))}
              </div>

              {/* CTA */}
              {project.url !== '#' && (
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--black)', textDecoration: 'none',
                    padding: '12px 28px',
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                  }}
                >
                  Voir le projet →
                </motion.a>
              )}
            </div>

            {/* Métriques */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.metrics.map((metric, j) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + j * 0.1, duration: 0.5 }}
                  style={{
                    background: 'var(--bg2)', padding: '24px 28px',
                    border: '1px solid rgba(212,160,23,.08)',
                    borderLeft: `3px solid ${project.color}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                >
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '36px', fontWeight: 600,
                    color: project.color, lineHeight: 1,
                  }}>{metric.val}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'var(--blue-muted)',
                  }}>{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA bas de page */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          padding: '80px 56px',
          textAlign: 'center',
          background: 'var(--bg2)',
          borderTop: '1px solid rgba(212,160,23,.08)',
        }}
      >
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300,
          color: 'var(--white)', marginBottom: '24px', lineHeight: 1,
        }}>
          Votre projet sera<br />
          <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>le prochain.</em>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link href="/devis" style={{
            display: 'inline-block',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600, fontSize: '14px',
            color: 'var(--black)', textDecoration: 'none',
            padding: '18px 48px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
            clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
          }}>
            Démarrer mon projet →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}