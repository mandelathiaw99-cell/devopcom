'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

const articles = [
  {
    slug: 'pourquoi-next-js-pour-votre-site',
    title: 'Pourquoi Next.js est le meilleur choix pour votre site en 2026',
    excerpt: 'Next.js s\'est imposé comme le framework de référence pour les sites web modernes. Voilà pourquoi c\'est le bon choix pour votre projet.',
    category: 'Développement Web',
    date: '04 Juin 2026',
    readTime: '5 min',
    color: '#2563eb',
    content: `
Next.js est aujourd'hui le framework JavaScript le plus utilisé pour créer des sites web modernes. Mais pourquoi ce choix s'impose-t-il en 2026 ?

## Performance avant tout

Next.js génère des pages statiques et dynamiques avec une rapidité impressionnante. Le résultat : des sites qui chargent en moins d'une seconde, ce qui améliore drastiquement l'expérience utilisateur et le référencement Google.

## SEO intégré

Contrairement aux applications React classiques, Next.js génère le HTML côté serveur. Les moteurs de recherche indexent parfaitement votre contenu, ce qui booste votre visibilité sur Google.

## Stack moderne et scalable

Avec Next.js, vous bénéficiez d'une architecture qui peut évoluer avec votre business — de la simple landing page à la plateforme SaaS complexe.

## Conclusion

Si vous lancez un site en 2026, Next.js est le choix évident. C'est ce qu'on utilise chez DevopCom pour tous nos projets.
    `,
  },
  {
    slug: 'strategie-reseaux-sociaux-association',
    title: 'Comment créer une stratégie réseaux sociaux efficace pour votre association',
    excerpt: 'Les associations ont des besoins spécifiques en communication digitale. Voilà comment construire une présence en ligne cohérente et engageante.',
    category: 'Communication',
    date: '03 Juin 2026',
    readTime: '7 min',
    color: '#f953c6',
    content: `
Les associations ont souvent du mal à maintenir une présence digitale cohérente. Voilà une méthode simple et efficace.

## Définir vos objectifs

Avant de poster quoi que ce soit, définissez ce que vous voulez accomplir : recruter des membres, promouvoir des événements, collecter des dons ?

## Choisir les bons réseaux

Pas besoin d'être partout. Choisissez 2-3 réseaux où se trouve votre communauté et concentrez-vous dessus.

## Créer un calendrier éditorial

Planifiez vos publications à l'avance — au moins 2 semaines. Ça évite le syndrome de la page blanche et garantit une régularité.

## Mesurer et ajuster

Regardez vos statistiques chaque mois. Ce qui marche, faites-en plus. Ce qui ne marche pas, abandonnez.

## Conclusion

Une bonne stratégie réseaux sociaux n'est pas compliquée. C'est avant tout une question de régularité et de cohérence.
    `,
  },
  {
    slug: 'site-web-agence-vs-freelance',
    title: 'Agence web vs Freelance : que choisir pour votre projet digital ?',
    excerpt: 'Vous hésitez entre une agence et un freelance pour votre site web ? On vous aide à faire le bon choix selon votre budget et vos besoins.',
    category: 'Conseils',
    date: '01 Juin 2026',
    readTime: '6 min',
    color: '#d4a017',
    content: `
C'est une question que beaucoup se posent. Voilà une comparaison honnête pour vous aider à choisir.

## L'agence web

**Avantages :**
- Équipe complète — designer, développeur, chef de projet
- Processus structuré
- Support et maintenance facilités

**Inconvénients :**
- Budget plus élevé
- Moins de flexibilité
- Interlocuteurs multiples

## Le freelance

**Avantages :**
- Tarifs plus compétitifs
- Interlocuteur unique
- Plus de flexibilité

**Inconvénients :**
- Disponibilité variable
- Compétences limitées à une personne

## DevopCom — Le meilleur des deux mondes

Chez DevopCom, vous bénéficiez de l'expertise d'un professionnel qui maîtrise autant le code que la communication — sans les coûts d'une agence traditionnelle.

## Conclusion

Pour les PME et associations avec un budget maîtrisé, un freelance expert comme DevopCom est souvent le meilleur choix.
    `,
  },
  {
    slug: 'identite-visuelle-importance',
    title: 'Pourquoi une identité visuelle forte est indispensable en 2026',
    excerpt: 'Votre logo, vos couleurs, votre typographie — tout ça forme votre identité visuelle. Voilà pourquoi c\'est la base de toute stratégie de communication.',
    category: 'Stratégie Digitale',
    date: '28 Mai 2026',
    readTime: '4 min',
    color: '#06b6d4',
    content: `
En 2026, les consommateurs font leur choix en quelques secondes. Votre identité visuelle est votre première impression — elle doit être irréprochable.

## Qu'est-ce que l'identité visuelle ?

C'est l'ensemble des éléments graphiques qui représentent votre marque : logo, couleurs, typographies, style photographique, templates de communication.

## Pourquoi c'est crucial

Une identité visuelle cohérente crée la confiance. Les marques reconnues instantanément — Apple, Nike, McDonald's — ont toutes une identité visuelle forte et cohérente.

## Les erreurs à éviter

- Changer de logo tous les ans
- Utiliser trop de couleurs différentes
- Mélanger les typographies

## Comment construire une identité forte

1. Définissez vos valeurs
2. Choisissez 2-3 couleurs maximum
3. Sélectionnez 2 typographies complémentaires
4. Créez des templates réutilisables

## Conclusion

Investir dans une identité visuelle forte dès le départ vous économise du temps et de l'argent sur le long terme.
    `,
  },
]

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '96px', color: 'var(--gold)', fontWeight: 300 }}>404</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--blue-muted)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>Article non trouvé</div>
          <Link href="/blog" style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
            color: 'var(--black)', textDecoration: 'none', padding: '14px 32px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)', display: 'inline-block',
          }}>← Retour au blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '68px' }}>

      {/* Header article */}
      <div style={{
        padding: '60px 56px',
        borderBottom: '1px solid rgba(212,160,23,.08)',
        background: 'var(--bg2)',
        borderTop: `3px solid ${article.color}`,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--blue-muted)', marginBottom: '24px',
          }}>
            <Link href="/" style={{ color: 'var(--blue-muted)', textDecoration: 'none' }}>Accueil</Link>
            <span>→</span>
            <Link href="/blog" style={{ color: 'var(--blue-muted)', textDecoration: 'none' }}>Blog</Link>
            <span>→</span>
            <span style={{ color: article.color }}>{article.category}</span>
          </div>

          {/* Catégorie */}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
            padding: '4px 12px', background: `${article.color}22`, color: article.color,
            marginBottom: '20px', display: 'inline-block',
          }}>{article.category}</span>

          {/* Titre */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 300,
            lineHeight: 1.05, letterSpacing: '-1px',
            color: 'var(--white)', marginBottom: '20px', marginTop: '12px',
          }}>{article.title}</h1>

          {/* Meta */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'var(--blue-muted)' }}>
              {article.date}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'var(--blue-muted)' }}>
              {article.readTime} de lecture
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'var(--blue-muted)' }}>
              DevopCom
            </span>
          </div>
        </motion.div>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Extrait */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '20px', color: 'var(--blue-muted)',
            fontStyle: 'italic', lineHeight: 1.7, marginBottom: '40px',
            paddingBottom: '40px', borderBottom: '1px solid rgba(212,160,23,.08)',
          }}>{article.excerpt}</p>

          {/* Corps de l'article */}
          <div style={{ color: 'var(--white)', lineHeight: 1.8 }}>
            {article.content.trim().split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return (
                  <h2 key={i} style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '32px', fontWeight: 600,
                    color: article.color, marginTop: '40px', marginBottom: '16px', lineHeight: 1,
                  }}>{line.replace('## ', '')}</h2>
                )
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={i} style={{ fontWeight: 600, color: 'var(--white)', marginBottom: '8px' }}>
                    {line.replace(/\*\*/g, '')}
                  </p>
                )
              }
              if (line.startsWith('- ')) {
                return (
                  <div key={i} style={{
                    display: 'flex', gap: '10px', marginBottom: '8px',
                    fontSize: '14px', color: 'var(--blue-muted)',
                  }}>
                    <span style={{ color: article.color, flexShrink: 0 }}>▸</span>
                    {line.replace('- ', '')}
                  </div>
                )
              }
              if (line.match(/^\d\./)) {
                return (
                  <div key={i} style={{
                    display: 'flex', gap: '10px', marginBottom: '8px',
                    fontSize: '14px', color: 'var(--blue-muted)',
                  }}>
                    <span style={{ color: article.color, flexShrink: 0 }}>{line[0]}.</span>
                    {line.replace(/^\d\.\s/, '')}
                  </div>
                )
              }
              if (line.trim() === '') return <div key={i} style={{ height: '16px' }} />
              return (
                <p key={i} style={{ fontSize: '15px', color: 'var(--blue-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                  {line}
                </p>
              )
            })}
          </div>
        </motion.div>

        {/* CTA fin d'article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px', padding: '40px',
            background: 'var(--bg2)', border: '1px solid rgba(212,160,23,.15)',
            borderLeft: `3px solid ${article.color}`,
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px', fontWeight: 300, color: 'var(--white)', marginBottom: '12px',
          }}>
            Vous avez un projet ?
          </div>
          <p style={{ fontSize: '13px', color: 'var(--blue-muted)', marginBottom: '24px' }}>
            Parlons-en — devis gratuit en 5 minutes.
          </p>
          <Link href="/devis" style={{
            display: 'inline-block',
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '13px',
            color: 'var(--black)', textDecoration: 'none', padding: '14px 32px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
          }}>Démarrer mon projet →</Link>
        </motion.div>

        {/* Retour blog */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link href="/blog" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--blue-muted)', textDecoration: 'none',
          }}>← Retour au blog</Link>
        </div>
      </div>
    </div>
  )
}