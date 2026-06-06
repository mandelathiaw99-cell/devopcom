import { NextResponse } from 'next/server'

function generateScore(url: string, sector: string) {
  // Génère des scores réalistes basés sur l'URL et le secteur
  const hasHttps = url.startsWith('https') ? 10 : 0
  const hasWww = url.includes('www') ? 5 : 0
  const domainLength = url.length < 20 ? 10 : url.length < 30 ? 5 : 0
  const base = 45 + hasHttps + hasWww + domainLength + Math.floor(Math.random() * 20)
  return Math.min(base, 95)
}

export async function POST(request: Request) {
  try {
    const { url, company, sector } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL requise' }, { status: 400 })
    }

    const seoScore = generateScore(url, sector)
    const perfScore = generateScore(url, sector) - 5
    const socialScore = generateScore(url, sector) - 10
    const globalScore = Math.floor((seoScore + perfScore + socialScore) / 3)

    const sectorRecommendations: Record<string, string[]> = {
      restaurant: [
        'Créez une fiche Google My Business complète avec photos de vos plats et horaires à jour',
        'Intégrez un système de réservation en ligne directement sur votre site',
        'Publiez du contenu régulier sur Instagram avec vos plats du jour',
        'Collectez et répondez aux avis Google — ils influencent 90% des décisions',
        'Créez une page menu optimisée SEO avec vos spécialités comme mots-clés',
      ],
      association: [
        'Créez une page "Rejoindre l\'association" avec formulaire d\'inscription en ligne',
        'Publiez régulièrement vos événements sur les réseaux sociaux et Google',
        'Optimisez votre référencement local avec votre ville dans les mots-clés',
        'Intégrez un système de don ou cotisation en ligne pour faciliter les adhésions',
        'Créez du contenu de blog sur vos actions pour améliorer votre visibilité',
      ],
      commerce: [
        'Optimisez vos fiches produits avec des descriptions riches en mots-clés',
        'Intégrez Google Shopping pour apparaître dans les résultats de recherche produits',
        'Créez un programme de fidélité digital pour fidéliser vos clients',
        'Améliorez la vitesse de chargement — chaque seconde perdue réduit les ventes de 7%',
        'Activez les avis clients automatiques après chaque achat',
      ],
      tech: [
        'Créez du contenu technique (blog, tutoriels) pour attirer des leads qualifiés',
        'Optimisez votre présence sur LinkedIn — réseau clé pour les startups B2B',
        'Mettez en place un système de démo ou essai gratuit pour convertir les visiteurs',
        'Créez des études de cas détaillées avec vos clients existants',
        'Intégrez un chatbot IA pour qualifier les prospects 24h/24',
      ],
      default: [
        `Optimisez les balises title et meta description de ${company || 'votre site'} avec vos mots-clés principaux`,
        'Créez du contenu de blog régulier — minimum 2 articles par mois pour améliorer votre SEO',
        'Améliorez la vitesse de chargement en optimisant vos images et en utilisant un CDN',
        'Développez votre présence sur les réseaux sociaux adaptés à votre secteur',
        'Mettez en place Google Analytics pour suivre et optimiser vos performances',
      ],
    }

    const recommendations = sectorRecommendations[sector] || sectorRecommendations.default

    const result = {
      score: globalScore,
      summary: `${company || 'Votre site'} présente une présence digitale ${globalScore >= 70 ? 'correcte mais perfectible' : 'qui nécessite des améliorations importantes'}. Avec les bonnes optimisations, vous pouvez significativement améliorer votre visibilité en ligne et attirer plus de clients.`,
      seo: {
        score: seoScore,
        details: [
          url.startsWith('https') ? '✓ Certificat SSL détecté — bon pour le SEO' : '✗ Pas de HTTPS — pénalité SEO importante',
          `La structure de l'URL ${url.length < 25 ? 'est courte et claire' : 'pourrait être simplifiée'} pour le référencement`,
          'Les balises meta et la structure des titres doivent être optimisées pour vos mots-clés cibles',
        ],
      },
      performance: {
        score: perfScore,
        details: [
          'La vitesse de chargement est un facteur clé — visez moins de 3 secondes',
          'Optimisez vos images en utilisant le format WebP pour réduire le poids',
          'Activez la mise en cache du navigateur pour améliorer les visites répétées',
        ],
      },
      social: {
        score: socialScore,
        details: [
          `La présence sur les réseaux sociaux ${sector === 'restaurant' || sector === 'commerce' ? 'est essentielle pour votre secteur' : 'peut être améliorée'}`,
          'Une stratégie de contenu régulière augmente la notoriété de votre marque',
          'Les réseaux sociaux génèrent du trafic qualifié vers votre site web',
        ],
      },
      strategy: {
        recommendations,
      },
    }

    // Simuler un délai réaliste
    await new Promise(r => setTimeout(r, 1000))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analyser error:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'analyse' }, { status: 500 })
  }
}