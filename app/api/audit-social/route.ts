import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { handle, platform, sector } = await request.json()

    if (!handle) {
      return NextResponse.json({ error: 'Handle requis' }, { status: 400 })
    }

    // Génère des scores réalistes
    const base = 40 + Math.floor(Math.random() * 40)
    const engagementScore = base + Math.floor(Math.random() * 15)
    const contentScore = base + Math.floor(Math.random() * 15)
    const strategyScore = base + Math.floor(Math.random() * 15)
    const globalScore = Math.floor((engagementScore + contentScore + strategyScore) / 3)

    // Followers estimés selon la plateforme
    const followersMap: Record<string, string[]> = {
      instagram: ['1.2K', '3.5K', '8.7K', '15K', '42K'],
      tiktok: ['2.1K', '5.8K', '12K', '28K', '95K'],
      facebook: ['850', '2.3K', '6.1K', '18K', '35K'],
      linkedin: ['450', '1.1K', '3.2K', '7.8K', '12K'],
    }

    const followers = followersMap[platform] || followersMap.instagram
    const estimated = followers[Math.floor(Math.random() * followers.length)]

    // Taux d'engagement selon le score
    const engagementRate = engagementScore >= 80 ? `${(3 + Math.random() * 4).toFixed(1)}%`
      : engagementScore >= 60 ? `${(1.5 + Math.random() * 2).toFixed(1)}%`
      : `${(0.5 + Math.random() * 1).toFixed(1)}%`

    // Recommandations par secteur et plateforme
    const recommendations: Record<string, string[]> = {
      restaurant: [
        'Publiez des Reels de 15-30 secondes montrant la préparation de vos plats — le format vidéo génère 3x plus d\'engagement',
        'Utilisez les hashtags locaux comme #bordeauxfood #restaurantbordeaux pour attirer une audience locale',
        'Créez une série hebdomadaire "Plat du jour" pour fidéliser votre communauté',
        'Collaborez avec des food bloggers bordelais pour augmenter votre visibilité',
        'Activez les Stories quotidiennes — elles maintiennent votre compte en haut des feeds',
      ],
      association: [
        'Partagez les coulisses de vos événements en temps réel avec les Stories',
        'Créez du contenu éducatif sur votre mission pour attirer de nouveaux membres',
        'Utilisez les Lives pour retransmettre vos événements importants',
        'Mettez en avant les témoignages de vos membres pour humaniser votre association',
        'Créez un hashtag unique pour votre association et encouragez les membres à l\'utiliser',
      ],
      mode: [
        'Publiez des lookbooks et des "get ready with me" — très performants sur Instagram et TikTok',
        'Collaborez avec des micro-influenceurs (5K-50K) pour un ROI optimal',
        'Utilisez les fonctionnalités Shopping d\'Instagram pour vendre directement',
        'Créez du contenu "before/after" et des tutoriels styling',
        'Postez 3-4 fois par semaine avec une esthétique cohérente',
      ],
      sport: [
        'Partagez des transformations et des success stories de vos clients',
        'Créez des défis fitness avec un hashtag dédié pour créer de l\'engagement',
        'Publiez des conseils rapides en format Reels de 15 secondes',
        'Utilisez TikTok — le secteur sport y est très actif et viral',
        'Proposez des challenges mensuels pour fidéliser votre communauté',
      ],
      default: [
        `Augmentez la fréquence de publication sur ${platform} — visez minimum 4 posts par semaine`,
        'Utilisez le format vidéo (Reels/TikTok) — il génère en moyenne 3x plus de portée que les photos',
        'Engagez activement avec votre communauté — répondez aux commentaires dans les 2 premières heures',
        'Analysez vos meilleurs posts et reproduisez ce qui fonctionne',
        'Créez du contenu en coulisses pour humaniser votre marque et créer de l\'attachement',
      ],
    }

    const recs = recommendations[sector] || recommendations.default

    const engagementDetails: Record<string, string[]> = {
      instagram: [
        engagementScore >= 70 ? 'Bon taux d\'interaction sur vos publications' : 'Taux d\'engagement en dessous de la moyenne du secteur',
        'Les stories génèrent plus d\'interactions que les posts classiques',
        'Les Reels obtiennent une portée organique supérieure',
      ],
      tiktok: [
        engagementScore >= 70 ? 'Bon taux de complétion des vidéos' : 'Le taux de complétion pourrait être amélioré',
        'Les vidéos de 15-30 secondes performent le mieux sur TikTok',
        'L\'algorithme favorise les comptes qui postent régulièrement',
      ],
      facebook: [
        engagementScore >= 70 ? 'Bonne interaction avec votre communauté' : 'L\'engagement organique Facebook est en baisse globalement',
        'Les vidéos natives Facebook génèrent plus d\'engagement que les liens externes',
        'Les groupes Facebook peuvent amplifier votre portée organique',
      ],
      linkedin: [
        engagementScore >= 70 ? 'Bon taux d\'engagement professionnel' : 'Le contenu pourrait être mieux adapté au réseau professionnel',
        'Les articles longs formats performent bien sur LinkedIn',
        'Les posts personnels génèrent plus d\'engagement que les posts corporate',
      ],
    }

    const contentDetails = [
      contentScore >= 70 ? 'La cohérence visuelle de votre feed est satisfaisante' : 'La cohérence visuelle pourrait être améliorée',
      'Variez les formats — carousel, vidéo, photo, texte',
      'Intégrez des call-to-action clairs dans vos publications',
    ]

    const result = {
      handle,
      platform,
      score: globalScore,
      summary: `Le compte @${handle} sur ${platform} montre une présence ${globalScore >= 70 ? 'correcte avec des axes d\'amélioration identifiés' : 'qui nécessite une stratégie plus structurée'}. Avec les bonnes optimisations, vous pouvez significativement augmenter votre engagement et votre visibilité.`,
      followers: {
        estimated,
        growth: `+${Math.floor(Math.random() * 15) + 2}% ce mois`,
      },
      engagement: {
        rate: engagementRate,
        score: Math.min(engagementScore, 95),
        details: engagementDetails[platform] || engagementDetails.instagram,
      },
      content: {
        score: Math.min(contentScore, 95),
        details: contentDetails,
      },
      strategy: {
        score: Math.min(strategyScore, 95),
        recommendations: recs,
      },
    }

    await new Promise(r => setTimeout(r, 1000))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Audit social error:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'audit' }, { status: 500 })
  }
}