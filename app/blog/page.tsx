'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const categories = ['Tous', 'Développement Web', 'Communication', 'Stratégie Digitale', 'Conseils']

const articles = [
  {
    slug: 'pourquoi-next-js-pour-votre-site',
    title: 'Pourquoi Next.js est le meilleur choix pour votre site en 2026',
    excerpt: 'Next.js s\'est imposé comme le framework de référence pour les sites web modernes. Voilà pourquoi c\'est le bon choix pour votre projet.',
    category: 'Développement Web',
    date: '04 Juin 2026',
    readTime: '5 min',
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  },
  {
    slug: 'strategie-reseaux-sociaux-association',
    title: 'Comment créer une stratégie réseaux sociaux efficace pour votre association',
    excerpt: 'Les associations ont des besoins spécifiques en communication digitale. Voilà comment construire une présence en ligne cohérente et engageante.',
    category: 'Communication',
    date: '03 Juin 2026',
    readTime: '7 min',
    color: '#f953c6',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
  },
  {
    slug: 'site-web-agence-vs-freelance',
    title: 'Agence web vs Freelance : que choisir pour votre projet digital ?',
    excerpt: 'Vous hésitez entre une agence et un freelance pour votre site web ? On vous aide à faire le bon choix selon votre budget et vos besoins.',
    category: 'Conseils',
    date: '01 Juin 2026',
    readTime: '6 min',
    color: '#d4a017',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  },
  {
    slug: 'identite-visuelle-importance',
    title: 'Pourquoi une identité visuelle forte est indispensable en 2026',
    excerpt: 'Votre logo, vos couleurs, votre typographie — tout ça forme votre identité visuelle. Voilà pourquoi c\'est la base de toute stratégie de communication.',
    category: 'Stratégie Digitale',
    date: '28 Mai 2026',
    readTime: '4 min',
    color: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    slug: 'seo-local-bordeaux',
    title: 'SEO local : comment dominer Google à Bordeaux en 2026',
    excerpt: 'Le référencement local est une mine d\'or pour les entreprises bordelaises. Voilà comment apparaître en première position quand vos clients vous cherchent.',
    category: 'Stratégie Digitale',
    date: '25 Mai 2026',
    readTime: '8 min',
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
  },
  {
    slug: 'ecommerce-pme-guide-complet',
    title: 'E-commerce pour PME : le guide complet pour vendre en ligne',
    excerpt: 'Lancer une boutique en ligne en 2026 n\'a jamais été aussi accessible. On vous guide étape par étape pour démarrer sans se tromper.',
    category: 'Développement Web',
    date: '20 Mai 2026',
    readTime: '10 min',
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  },
  {
    slug: 'email-marketing-guide',
    title: 'Email marketing : l\'outil le plus rentable de votre stratégie digitale',
    excerpt: 'En 2026, l\'email reste le canal avec le meilleur ROI. Voilà comment créer des campagnes qui convertissent vraiment.',
    category: 'Communication',
    date: '15 Mai 2026',
    readTime: '6 min',
    color: '#f953c6',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80',
  },
  {
    slug: 'budget-digital-pme',
    title: 'Quel budget digital prévoir pour une PME en 2026 ?',
    excerpt: 'Combien faut-il vraiment investir dans le digital ? On démystifie les coûts et vous aide à prioriser vos dépenses selon vos objectifs.',
    category: 'Conseils',
    date: '10 Mai 2026',
    readTime: '5 min',
    color: '#d4a017',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered = activeCategory === 'Tous'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '68px' }}>

      {/* Header */}
      <div style={{
        padding: '80px 56px 60px',
        borderBottom: '1px solid rgba(212,160,23,.08)',
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
            }}>Blog — Ressources & Conseils</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px, 8vw, 100px)', fontWeight: 300,
            lineHeight: .88, letterSpacing: '-2px', color: 'var(--white)', marginBottom: '24px',
          }}>
            Le digital,<br />
            <em style={{ color: 'var(--gold)', fontWeight: 600, fontStyle: 'italic' }}>expliqué.</em>
          </h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--blue-muted)',
            fontStyle: 'italic', maxWidth: '600px', lineHeight: 1.7,
          }}>
            Conseils, stratégies et ressources pour développer votre présence digitale.
          </p>
        </motion.div>

        {/* Catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '32px' }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                padding: '8px 16px', cursor: 'pointer',
                background: activeCategory === cat ? 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)' : 'transparent',
                color: activeCategory === cat ? 'var(--black)' : 'var(--blue-muted)',
                border: activeCategory === cat ? 'none' : '1px solid rgba(212,160,23,.15)',
              }}
            >{cat}</motion.button>
          ))}
        </motion.div>
      </div>

      {/* Article featured */}
      {activeCategory === 'Tous' && (
        <div style={{ padding: '60px 56px 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href={`/blog/${articles[0].slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                background: 'var(--bg2)',
                border: '1px solid rgba(212,160,23,.08)',
                borderTop: `3px solid ${articles[0].color}`,
                overflow: 'hidden',
                marginBottom: '48px',
              }}>
                <div style={{ padding: '48px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                    padding: '4px 12px',
                    background: `${articles[0].color}22`,
                    color: articles[0].color,
                    marginBottom: '20px', display: 'inline-block',
                  }}>À la une</span>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '36px', fontWeight: 600,
                    color: 'var(--white)', lineHeight: 1.15, marginBottom: '16px', marginTop: '12px',
                  }}>{articles[0].title}</h2>
                  <p style={{ fontSize: '14px', color: 'var(--blue-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                    {articles[0].excerpt}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)' }}>
                      {articles[0].date}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--blue-muted)' }}>
                      {articles[0].readTime} de lecture
                    </span>
                  </div>
                  <div style={{
                    marginTop: '32px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                    color: articles[0].color,
                  }}>Lire l'article →</div>
                </div>
                <div style={{
                  backgroundImage: `url(${articles[0].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '320px',
                }} />
              </div>
            </Link>
          </motion.div>
        </div>
      )}

      {/* Grille articles */}
      <div style={{ padding: activeCategory === 'Tous' ? '0 56px 60px' : '60px 56px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {(activeCategory === 'Tous' ? filtered.slice(1) : filtered).map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(212,160,23,.08)' }}
              style={{
                background: 'var(--bg2)',
                border: '1px solid rgba(212,160,23,.08)',
                borderTop: `3px solid ${article.color}`,
                overflow: 'hidden',
              }}
            >
              {/* Image */}
              <div style={{
                height: '180px',
                backgroundImage: `url(${article.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />

              <div style={{ padding: '28px' }}>
                {/* Catégorie + temps */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '4px 10px',
                    background: `${article.color}22`,
                    color: article.color,
                  }}>{article.category}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '1px',
                    color: 'var(--blue-muted)',
                  }}>{article.readTime}</span>
                </div>

                {/* Titre */}
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '22px', fontWeight: 600,
                  color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px',
                }}>{article.title}</h2>

                {/* Extrait */}
                <p style={{
                  fontSize: '13px', color: 'var(--blue-muted)',
                  lineHeight: 1.7, marginBottom: '24px',
                }}>{article.excerpt}</p>

                {/* Footer */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: '16px', borderTop: '1px solid rgba(212,160,23,.06)',
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px', letterSpacing: '1px', color: 'var(--blue-muted)',
                  }}>{article.date}</span>
                  <Link href={`/blog/${article.slug}`} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                    color: article.color, textDecoration: 'none',
                  }}>Lire →</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}