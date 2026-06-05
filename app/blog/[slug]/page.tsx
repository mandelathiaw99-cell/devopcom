'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Image from 'next/image'

const articles = [
  {
    slug: 'pourquoi-next-js-pour-votre-site',
    title: 'Pourquoi Next.js est le meilleur choix pour votre site en 2026',
    excerpt: 'Next.js s\'est imposé comme le framework de référence pour les sites web modernes. Voilà pourquoi c\'est le bon choix pour votre projet.',
    category: 'Développement Web',
    date: '04 Juin 2026',
    readTime: '5 min',
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    sections: [
      {
        type: 'intro',
        text: 'En 2026, choisir le bon framework pour son site web n\'est plus une question technique — c\'est une décision stratégique. Next.js s\'est imposé comme le standard de l\'industrie, et pour de bonnes raisons.',
      },
      {
        type: 'heading',
        text: '1. Performance hors norme',
      },
      {
        type: 'text',
        text: 'Next.js génère vos pages en avance (Static Site Generation) ou à la demande (Server Side Rendering). Le résultat : des temps de chargement inférieurs à une seconde, même sur mobile. Google récompense cette rapidité avec un meilleur classement.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        caption: 'Les Core Web Vitals de Google favorisent les sites rapides.',
      },
      {
        type: 'heading',
        text: '2. SEO natif et puissant',
      },
      {
        type: 'text',
        text: 'Contrairement à React classique qui génère du contenu côté client, Next.js envoie du HTML complet aux moteurs de recherche. Vos pages sont indexées parfaitement, ce qui booste votre visibilité sans effort supplémentaire.',
      },
      {
        type: 'stats',
        items: [
          { value: '40%', label: 'de trafic organique en plus en moyenne' },
          { value: '< 1s', label: 'de temps de chargement moyen' },
          { value: '98/100', label: 'score Lighthouse typique' },
        ]
      },
      {
        type: 'heading',
        text: '3. Stack moderne et scalable',
      },
      {
        type: 'text',
        text: 'Next.js s\'intègre parfaitement avec Supabase, Stripe, Sanity CMS et tous les outils modernes. Vous pouvez démarrer avec une simple landing page et évoluer vers une plateforme SaaS complète — sans repartir de zéro.',
      },
      {
        type: 'heading',
        text: '4. Déploiement en un clic',
      },
      {
        type: 'text',
        text: 'Vercel, créé par les mêmes personnes que Next.js, offre un déploiement automatique à chaque commit. Votre site est en ligne en 30 secondes, avec SSL, CDN mondial et previews automatiques.',
      },
      {
        type: 'quote',
        text: 'Next.js n\'est pas juste un framework — c\'est l\'infrastructure sur laquelle les meilleures équipes du monde construisent leurs produits.',
        author: 'DevopCom',
      },
      {
        type: 'heading',
        text: 'Conclusion',
      },
      {
        type: 'text',
        text: 'Si vous lancez un site en 2026, Next.js est le choix évident. Performance, SEO, scalabilité, écosystème — tout est là. C\'est ce qu\'on utilise chez DevopCom pour tous nos projets clients.',
      },
    ]
  },
  {
    slug: 'strategie-reseaux-sociaux-association',
    title: 'Comment créer une stratégie réseaux sociaux efficace pour votre association',
    excerpt: 'Les associations ont des besoins spécifiques en communication digitale. Voilà comment construire une présence en ligne cohérente et engageante.',
    category: 'Communication',
    date: '03 Juin 2026',
    readTime: '7 min',
    color: '#f953c6',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80',
    sections: [
      {
        type: 'intro',
        text: 'Les associations ont souvent du mal à maintenir une présence digitale cohérente. Entre le bénévolat, les événements et les adhérents à gérer, la communication passe souvent au second plan. Voilà une méthode simple et efficace pour changer ça.',
      },
      {
        type: 'heading',
        text: '1. Définir vos objectifs avant tout',
      },
      {
        type: 'text',
        text: 'Avant de poster quoi que ce soit, posez-vous la question fondamentale : pourquoi êtes-vous sur les réseaux sociaux ? Recruter des membres ? Promouvoir vos événements ? Collecter des dons ? Chaque objectif mène à une stratégie différente.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        caption: 'Une stratégie claire est la base de toute communication efficace.',
      },
      {
        type: 'heading',
        text: '2. Choisir les bons réseaux',
      },
      {
        type: 'text',
        text: 'Pas besoin d\'être partout. Choisissez 2-3 réseaux où se trouve votre communauté cible. Pour les associations étudiantes : Instagram et TikTok. Pour les associations professionnelles : LinkedIn et Twitter. Pour les associations locales : Facebook et Instagram.',
      },
      {
        type: 'stats',
        items: [
          { value: '2-3', label: 'réseaux maximum recommandés' },
          { value: '3x', label: 'plus d\'engagement avec la régularité' },
          { value: '80%', label: 'du contenu doit apporter de la valeur' },
        ]
      },
      {
        type: 'heading',
        text: '3. Créer un calendrier éditorial',
      },
      {
        type: 'text',
        text: 'Planifiez vos publications à l\'avance — au moins 2 semaines. Ça évite le syndrome de la page blanche et garantit une régularité. Des outils comme Notion ou Google Sheets suffisent pour commencer.',
      },
      {
        type: 'quote',
        text: 'La régularité bat toujours la perfection. Mieux vaut poster 3 fois par semaine avec du contenu correct que 1 fois par mois avec du contenu parfait.',
        author: 'DevopCom',
      },
      {
        type: 'heading',
        text: '4. Mesurer et ajuster chaque mois',
      },
      {
        type: 'text',
        text: 'Regardez vos statistiques chaque mois : taux d\'engagement, portée, clics. Ce qui marche, faites-en plus. Ce qui ne marche pas, abandonnez sans regret. Les algorithmes changent — votre stratégie doit s\'adapter.',
      },
    ]
  },
  {
    slug: 'site-web-agence-vs-freelance',
    title: 'Agence web vs Freelance : que choisir pour votre projet digital ?',
    excerpt: 'Vous hésitez entre une agence et un freelance pour votre site web ? On vous aide à faire le bon choix selon votre budget et vos besoins.',
    category: 'Conseils',
    date: '01 Juin 2026',
    readTime: '6 min',
    color: '#d4a017',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
    sections: [
      {
        type: 'intro',
        text: 'C\'est une question que beaucoup de dirigeants de PME et d\'associations se posent. La réponse dépend de plusieurs facteurs : votre budget, la complexité de votre projet, et vos attentes en termes de suivi.',
      },
      {
        type: 'heading',
        text: 'L\'agence web — force collective',
      },
      {
        type: 'text',
        text: 'Une agence web dispose d\'une équipe complète : designer, développeur, chef de projet, rédacteur. Elle offre un processus structuré et une capacité à gérer des projets complexes.',
      },
      {
        type: 'stats',
        items: [
          { value: '5 000€', label: 'budget minimum en agence' },
          { value: '3-6 mois', label: 'délai moyen de livraison' },
          { value: '5+', label: 'interlocuteurs différents' },
        ]
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        caption: 'Une agence offre une équipe complète mais à un coût plus élevé.',
      },
      {
        type: 'heading',
        text: 'Le freelance — agilité et proximité',
      },
      {
        type: 'text',
        text: 'Le freelance offre une relation directe, plus de flexibilité et des tarifs plus compétitifs. L\'interlocuteur unique simplifie la communication et accélère les prises de décision.',
      },
      {
        type: 'stats',
        items: [
          { value: '800€', label: 'budget de départ possible' },
          { value: '2-6 semaines', label: 'délai moyen de livraison' },
          { value: '1', label: 'interlocuteur unique' },
        ]
      },
      {
        type: 'quote',
        text: 'Pour les PME et associations avec un budget maîtrisé, un freelance expert est souvent le meilleur rapport qualité-prix — surtout quand il maîtrise autant le code que la communication.',
        author: 'DevopCom',
      },
      {
        type: 'heading',
        text: 'Notre verdict',
      },
      {
        type: 'text',
        text: 'Pour un projet sous 10 000€ : choisissez un freelance expert. Pour un projet complexe nécessitant plusieurs compétences simultanées : l\'agence peut se justifier. Dans tous les cas, vérifiez le portfolio et demandez des références.',
      },
    ]
  },
  {
    slug: 'identite-visuelle-importance',
    title: 'Pourquoi une identité visuelle forte est indispensable en 2026',
    excerpt: 'Votre logo, vos couleurs, votre typographie — tout ça forme votre identité visuelle. Voilà pourquoi c\'est la base de toute stratégie de communication.',
    category: 'Stratégie Digitale',
    date: '28 Mai 2026',
    readTime: '4 min',
    color: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    sections: [
      {
        type: 'intro',
        text: 'En 2026, les consommateurs font leur choix en quelques secondes. Votre identité visuelle est votre première impression — elle doit être irréprochable et mémorable.',
      },
      {
        type: 'heading',
        text: 'Qu\'est-ce que l\'identité visuelle ?',
      },
      {
        type: 'text',
        text: 'C\'est l\'ensemble des éléments graphiques qui représentent votre marque : logo, palette de couleurs, typographies, style photographique, templates de communication. Tout doit être cohérent.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1609921212029-bb5a28190bee?w=800&q=80',
        caption: 'Une identité visuelle cohérente crée la reconnaissance et la confiance.',
      },
      {
        type: 'stats',
        items: [
          { value: '7s', label: 'pour faire une première impression' },
          { value: '80%', label: 'de reconnaissance de marque via la couleur' },
          { value: '3x', label: 'plus de mémorisation avec une identité forte' },
        ]
      },
      {
        type: 'heading',
        text: 'Les erreurs à éviter absolument',
      },
      {
        type: 'text',
        text: 'Changer de logo tous les ans, utiliser trop de couleurs différentes, mélanger les typographies, utiliser des images de stock génériques — autant d\'erreurs qui diluent votre identité et créent de la confusion.',
      },
      {
        type: 'quote',
        text: 'Une marque forte ne se construit pas avec un grand budget. Elle se construit avec de la cohérence et de la constance dans le temps.',
        author: 'DevopCom',
      },
      {
        type: 'heading',
        text: 'Comment construire une identité forte',
      },
      {
        type: 'text',
        text: 'Définissez vos valeurs, choisissez 2-3 couleurs maximum, sélectionnez 2 typographies complémentaires, créez des templates réutilisables. Ensuite, appliquez cette charte partout — site web, réseaux sociaux, documents, emails.',
      },
    ]
  },
  {
    slug: 'seo-local-bordeaux',
    title: 'SEO local : comment dominer Google à Bordeaux en 2026',
    excerpt: 'Le référencement local est une mine d\'or pour les entreprises bordelaises. Voilà comment apparaître en première position quand vos clients vous cherchent.',
    category: 'Stratégie Digitale',
    date: '25 Mai 2026',
    readTime: '8 min',
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80',
    sections: [
      {
        type: 'intro',
        text: 'Quand un habitant de Bordeaux cherche un prestataire sur Google, il tape "agence web Bordeaux" ou "communication Bordeaux". Si votre site n\'apparaît pas dans les premiers résultats, vous êtes invisible. Voilà comment changer ça.',
      },
      {
        type: 'heading',
        text: '1. Google My Business — la base absolue',
      },
      {
        type: 'text',
        text: 'Créez et optimisez votre fiche Google My Business. Remplissez tous les champs, ajoutez des photos, répondez aux avis. C\'est gratuit et c\'est le levier numéro 1 pour le SEO local.',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
        caption: 'Une fiche Google My Business complète multiplie votre visibilité locale.',
      },
      {
        type: 'stats',
        items: [
          { value: '46%', label: 'des recherches Google ont une intention locale' },
          { value: '72%', label: 'visitent un commerce dans les 5km après recherche' },
          { value: '28%', label: 'des recherches locales aboutissent à un achat' },
        ]
      },
      {
        type: 'heading',
        text: '2. Optimiser votre site pour les mots-clés locaux',
      },
      {
        type: 'text',
        text: 'Intégrez "Bordeaux" naturellement dans vos titres, descriptions et contenus. Créez des pages dédiées pour chaque quartier ou zone géographique que vous ciblez : Mériadeck, Chartrons, Bacalan...',
      },
      {
        type: 'quote',
        text: 'Le SEO local n\'est pas une option pour les entreprises bordelaises — c\'est une nécessité pour survivre dans un marché de plus en plus concurrentiel.',
        author: 'DevopCom',
      },
      {
        type: 'heading',
        text: '3. Les avis clients — votre meilleur atout',
      },
      {
        type: 'text',
        text: 'Demandez systématiquement à vos clients satisfaits de laisser un avis Google. Répondez à tous les avis, positifs comme négatifs. Les algorithmes Google favorisent les entreprises avec beaucoup d\'avis récents.',
      },
    ]
  },
  {
    slug: 'ecommerce-pme-guide-complet',
    title: 'E-commerce pour PME : le guide complet pour vendre en ligne',
    excerpt: 'Lancer une boutique en ligne en 2026 n\'a jamais été aussi accessible. On vous guide étape par étape pour démarrer sans se tromper.',
    category: 'Développement Web',
    date: '20 Mai 2026',
    readTime: '10 min',
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    sections: [
      {
        type: 'intro',
        text: 'En 2026, ne pas vendre en ligne c\'est perdre une part significative de son chiffre d\'affaires. Mais lancer un e-commerce sans méthode, c\'est brûler du budget. Voilà comment bien démarrer.',
      },
      {
        type: 'heading',
        text: '1. Choisir la bonne plateforme',
      },
      {
        type: 'text',
        text: 'Shopify pour les boutiques clé en main, WooCommerce pour plus de flexibilité, Next.js + Stripe pour une solution sur mesure. Le choix dépend de votre budget, de votre catalogue et de vos ambitions.',
      },
      {
        type: 'stats',
        items: [
          { value: '2T€', label: 'de ventes e-commerce en Europe en 2025' },
          { value: '67%', label: 'des acheteurs comparent les prix en ligne' },
          { value: '3s', label: 'max avant qu\'un acheteur quitte un site lent' },
        ]
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
        caption: 'Un tunnel d\'achat optimisé peut doubler votre taux de conversion.',
      },
      {
        type: 'heading',
        text: '2. Optimiser le tunnel d\'achat',
      },
      {
        type: 'text',
        text: 'Chaque étape du tunnel — page produit, panier, paiement — doit être optimisée pour réduire les frictions. Un checkout en 3 clics maximum, plusieurs moyens de paiement, livraison clairement indiquée.',
      },
      {
        type: 'quote',
        text: 'Le meilleur e-commerce n\'est pas celui qui a le plus de produits — c\'est celui qui a le parcours d\'achat le plus fluide.',
        author: 'DevopCom',
      },
      {
        type: 'heading',
        text: '3. La logistique avant le marketing',
      },
      {
        type: 'text',
        text: 'Avant de lancer vos campagnes publicitaires, assurez-vous que votre logistique est irréprochable : délais de livraison respectés, politique de retour claire, service client réactif. Un client déçu ne revient jamais.',
      },
    ]
  },
  {
    slug: 'email-marketing-guide',
    title: 'Email marketing : l\'outil le plus rentable de votre stratégie digitale',
    excerpt: 'En 2026, l\'email reste le canal avec le meilleur ROI. Voilà comment créer des campagnes qui convertissent vraiment.',
    category: 'Communication',
    date: '15 Mai 2026',
    readTime: '6 min',
    color: '#f953c6',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&q=80',
    sections: [
      {
        type: 'intro',
        text: 'Malgré l\'essor des réseaux sociaux, l\'email marketing génère en moyenne 42€ pour chaque euro investi. C\'est le canal le plus rentable du digital — et pourtant souvent sous-utilisé.',
      },
      {
        type: 'heading',
        text: '1. Construire une liste qualifiée',
      },
      {
        type: 'text',
        text: 'Une liste de 500 abonnés engagés vaut mieux que 10 000 contacts inactifs. Proposez un lead magnet (guide gratuit, réduction, accès exclusif) pour attirer des abonnés réellement intéressés par votre offre.',
      },
      {
        type: 'stats',
        items: [
          { value: '42€', label: 'ROI moyen par euro investi' },
          { value: '4 milliards', label: 'd\'utilisateurs email dans le monde' },
          { value: '21%', label: 'taux d\'ouverture moyen B2B' },
        ]
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80',
        caption: 'Un email bien conçu crée une relation durable avec vos clients.',
      },
      {
        type: 'heading',
        text: '2. L\'objet — votre première bataille',
      },
      {
        type: 'text',
        text: 'Si votre objet n\'est pas assez accrocheur, votre email ne sera pas ouvert. Testez plusieurs objets (A/B testing), personnalisez avec le prénom, créez de la curiosité ou de l\'urgence — sans tomber dans le clickbait.',
      },
      {
        type: 'quote',
        text: 'L\'email n\'est pas mort. Il est simplement mal utilisé par ceux qui l\'abandonnent pour les réseaux sociaux.',
        author: 'DevopCom',
      },
    ]
  },
  {
    slug: 'budget-digital-pme',
    title: 'Quel budget digital prévoir pour une PME en 2026 ?',
    excerpt: 'Combien faut-il vraiment investir dans le digital ? On démystifie les coûts et vous aide à prioriser vos dépenses selon vos objectifs.',
    category: 'Conseils',
    date: '10 Mai 2026',
    readTime: '5 min',
    color: '#d4a017',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80',
    sections: [
      {
        type: 'intro',
        text: 'C\'est la question que tout dirigeant se pose : combien dois-je investir dans mon digital ? La réponse varie selon votre secteur, votre taille et vos ambitions — mais voilà un cadre pour vous orienter.',
      },
      {
        type: 'heading',
        text: 'La règle des 10%',
      },
      {
        type: 'text',
        text: 'En général, on recommande d\'allouer entre 5 et 15% de son chiffre d\'affaires au marketing digital. Pour une PME réalisant 200 000€ de CA, c\'est entre 10 000€ et 30 000€ par an.',
      },
      {
        type: 'stats',
        items: [
          { value: '5-15%', label: 'du CA à allouer au digital' },
          { value: '1 500€', label: 'budget minimum pour un site pro' },
          { value: '3 mois', label: 'avant de voir les premiers résultats SEO' },
        ]
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
        caption: 'Priorisez vos investissements selon votre stade de développement.',
      },
      {
        type: 'heading',
        text: 'Où investir en priorité ?',
      },
      {
        type: 'text',
        text: 'Pour une entreprise qui démarre : site web professionnel (priorité absolue), puis identité visuelle, puis SEO. Pour une entreprise établie : publicité payante (Google Ads, Meta Ads), puis email marketing, puis création de contenu.',
      },
      {
        type: 'quote',
        text: 'Le digital n\'est pas une dépense — c\'est un investissement. La question n\'est pas combien ça coûte, mais combien ça rapporte.',
        author: 'DevopCom',
      },
      {
        type: 'heading',
        text: 'Les erreurs budgétaires à éviter',
      },
      {
        type: 'text',
        text: 'Investir massivement en publicité avant d\'avoir un site web qui convertit. Changer d\'agence tous les 6 mois. Vouloir être sur tous les canaux en même temps. Négliger l\'analyse des résultats.',
      },
    ]
  },
]

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const article = articles.find(a => a.slug === slug)
  const related = articles.filter(a => a.slug !== slug).slice(0, 3)

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

      {/* Hero image */}
      <div style={{
        height: '420px',
        backgroundImage: `url(${article.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,14,23,.3), rgba(10,14,23,.85))',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '48px 56px',
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
              color: 'rgba(255,255,255,.5)', marginBottom: '16px',
            }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Accueil</Link>
              <span>→</span>
              <Link href="/blog" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Blog</Link>
              <span>→</span>
              <span style={{ color: article.color }}>{article.category}</span>
            </div>

            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
              padding: '4px 12px', background: `${article.color}33`, color: article.color,
              marginBottom: '16px', display: 'inline-block',
            }}>{article.category}</span>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 300,
              lineHeight: 1.05, color: 'var(--white)',
              marginBottom: '16px', marginTop: '10px',
              maxWidth: '800px',
            }}>{article.title}</h1>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,.5)' }}>
                {article.date}
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,.5)' }}>
                {article.readTime} de lecture
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,.5)' }}>
                Par DevopCom
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {article.sections.map((section, i) => {
            if (section.type === 'intro') {
              return (
                <p key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '22px', color: 'var(--blue-muted)',
                  fontStyle: 'italic', lineHeight: 1.7, marginBottom: '48px',
                  paddingBottom: '48px', borderBottom: '1px solid rgba(212,160,23,.08)',
                }}>{section.text}</p>
              )
            }
            if (section.type === 'heading') {
              return (
                <h2 key={i} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '36px', fontWeight: 600,
                  color: article.color, marginTop: '48px', marginBottom: '20px', lineHeight: 1,
                }}>{section.text}</h2>
              )
            }
            if (section.type === 'text') {
              return (
                <p key={i} style={{
                  fontSize: '15px', color: 'rgba(138,154,181,.9)',
                  lineHeight: 1.9, marginBottom: '20px',
                }}>{section.text}</p>
              )
            }
            if (section.type === 'image') {
              return (
                <div key={i} style={{ margin: '40px 0' }}>
                  <img
                    src={section.src}
                    alt={section.caption}
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', letterSpacing: '1px',
                    color: 'var(--blue-muted)', marginTop: '10px',
                    textAlign: 'center', fontStyle: 'italic',
                  }}>{section.caption}</div>
                </div>
              )
            }
            if (section.type === 'stats') {
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px', margin: '40px 0',
                }}>
                  {section.items!.map((stat, j) => (
                    <div key={j} style={{
                      padding: '24px', textAlign: 'center',
                      background: 'var(--bg2)',
                      border: '1px solid rgba(212,160,23,.08)',
                      borderTop: `2px solid ${article.color}`,
                    }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '36px', fontWeight: 600,
                        color: article.color, lineHeight: 1,
                      }}>{stat.value}</div>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '8px', letterSpacing: '1px',
                        color: 'var(--blue-muted)', marginTop: '8px',
                        textTransform: 'uppercase',
                      }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              )
            }
            if (section.type === 'quote') {
              return (
                <div key={i} style={{
                  margin: '40px 0', padding: '32px 40px',
                  borderLeft: `3px solid ${article.color}`,
                  background: 'var(--bg2)',
                }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '22px', fontStyle: 'italic',
                    color: 'var(--white)', lineHeight: 1.6, marginBottom: '12px',
                  }}>"{section.text}"</p>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px', letterSpacing: '2px',
                    color: article.color, textTransform: 'uppercase',
                  }}>— {section.author}</div>
                </div>
              )
            }
            return null
          })}
        </motion.div>

        {/* CTA fin d'article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px', padding: '48px',
            background: 'var(--bg2)', border: '1px solid rgba(212,160,23,.15)',
            borderLeft: `3px solid ${article.color}`,
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '32px', fontWeight: 300, color: 'var(--white)', marginBottom: '12px',
          }}>
            Vous avez un projet digital ?
          </div>
          <p style={{ fontSize: '14px', color: 'var(--blue-muted)', marginBottom: '28px', lineHeight: 1.7 }}>
            DevopCom vous accompagne de A à Z — de la stratégie à la mise en ligne.<br />
            Devis gratuit et personnalisé en 5 minutes.
          </p>
          <Link href="/devis" style={{
            display: 'inline-block',
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
            color: 'var(--black)', textDecoration: 'none', padding: '16px 40px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
          }}>Démarrer mon projet →</Link>
        </motion.div>

        {/* Articles liés */}
        <div style={{ marginTop: '60px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '24px',
          }}>Articles liés</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {related.map(rel => (
              <Link key={rel.slug} href={`/blog/${rel.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg2)',
                  border: '1px solid rgba(212,160,23,.08)',
                  borderTop: `2px solid ${rel.color}`,
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100px',
                    backgroundImage: `url(${rel.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                  <div style={{ padding: '16px' }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '7px', letterSpacing: '1px', textTransform: 'uppercase',
                      color: rel.color, marginBottom: '8px',
                    }}>{rel.category}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px', fontWeight: 600,
                      color: 'var(--white)', lineHeight: 1.3,
                    }}>{rel.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Retour blog */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
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