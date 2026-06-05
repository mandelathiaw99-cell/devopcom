export default function CGV() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
            Conditions commerciales
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '52px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Conditions Générales <em style={{ color: 'var(--gold)', fontWeight: 600 }}>de Vente.</em>
          </h1>
          <div style={{ width: '60px', height: '1px', background: 'var(--gold)', marginTop: '24px', opacity: 0.4 }} />
        </div>

        {[
          {
            title: '1. Objet',
            content: [
              'Les présentes Conditions Générales de Vente (CGV) régissent l\'ensemble des prestations de services réalisées par DevopCom (ci-après "le Prestataire") pour tout client professionnel ou particulier (ci-après "le Client").',
              'Toute commande implique l\'acceptation sans réserve des présentes CGV.',
            ]
          },
          {
            title: '2. Devis et commande',
            content: [
              'Toute prestation fait l\'objet d\'un devis établi par DevopCom, valable 30 jours à compter de sa date d\'émission.',
              'Le devis signé accompagné du versement de l\'acompte vaut bon de commande et marque l\'acceptation des présentes CGV.',
              'DevopCom se réserve le droit de refuser toute commande sans avoir à justifier sa décision.',
            ]
          },
          {
            title: '3. Tarifs',
            content: [
              'Les tarifs sont indiqués en euros hors taxes (HT). La TVA applicable sera ajoutée selon le statut fiscal du Prestataire.',
              'DevopCom se réserve le droit de modifier ses tarifs à tout moment. Les prestations en cours sont facturées au tarif convenu dans le devis.',
            ]
          },
          {
            title: '4. Conditions de paiement',
            content: [
              'Un acompte de 50% du montant total est exigé avant tout démarrage de prestation.',
              'Le solde de 50% est dû à la livraison du projet, avant mise en ligne ou transfert des fichiers sources.',
              'En cas de retard de paiement, des pénalités de 10% par mois de retard seront appliquées de plein droit, sans mise en demeure préalable.',
              'Tout impayé entraînera la suspension immédiate des accès et prestations en cours.',
            ]
          },
          {
            title: '5. Propriété intellectuelle et transfert de droits',
            content: [
              'DevopCom conserve la pleine propriété de l\'ensemble des créations réalisées jusqu\'au paiement intégral de la facture.',
              'À réception du paiement complet, le Client obtient une licence d\'utilisation des créations pour les usages définis dans le devis.',
              'DevopCom se réserve le droit de mentionner la réalisation du projet dans son portfolio et ses supports de communication, sauf accord contraire explicite du Client.',
            ]
          },
          {
            title: '6. Délais de réalisation',
            content: [
              'Les délais indiqués dans le devis sont donnés à titre indicatif et dépendent de la réactivité du Client dans la fourniture des éléments nécessaires.',
              'Tout retard imputable au Client (absence de contenu, validation tardive, demandes supplémentaires) entraîne automatiquement un report du délai de livraison.',
              'DevopCom ne pourra être tenu responsable des retards causés par des tiers ou des circonstances indépendantes de sa volonté.',
            ]
          },
          {
            title: '7. Révisions et modifications',
            content: [
              'Chaque devis inclut un nombre de révisions précisé dans l\'offre choisie.',
              'Toute demande de modification dépassant ce cadre fera l\'objet d\'un devis complémentaire.',
              'Les demandes de modifications majeures en cours de projet pourront entraîner une révision du prix et des délais.',
            ]
          },
          {
            title: '8. Obligations du client',
            content: [
              'Le Client s\'engage à fournir dans les délais convenus l\'ensemble des éléments nécessaires à la réalisation de la prestation (textes, images, accès, identifiants).',
              'Le Client garantit être titulaire des droits sur les éléments fournis à DevopCom et dégage DevopCom de toute responsabilité en cas de litige relatif à ces éléments.',
              'Le Client est seul responsable du contenu publié sur son site ou ses supports.',
            ]
          },
          {
            title: '9. Hébergement et maintenance',
            content: [
              'L\'hébergement et la maintenance du site ne sont pas inclus dans les prestations de création, sauf mention explicite dans le devis.',
              'DevopCom propose des offres de maintenance et d\'hébergement sur devis séparé.',
            ]
          },
          {
            title: '10. Résiliation',
            content: [
              'En cas de résiliation du contrat à l\'initiative du Client, l\'acompte versé reste acquis à DevopCom à titre d\'indemnité forfaitaire.',
              'Si des travaux ont été réalisés au-delà de l\'acompte, une facturation au prorata du travail effectué sera émise.',
            ]
          },
          {
            title: '11. Responsabilité',
            content: [
              'La responsabilité de DevopCom est limitée au montant des sommes effectivement perçues au titre de la prestation concernée.',
              'DevopCom ne pourra être tenu responsable des dommages indirects, pertes de données, pertes de chiffre d\'affaires ou préjudices commerciaux subis par le Client.',
            ]
          },
          {
            title: '12. Droit applicable et litiges',
            content: [
              'Les présentes CGV sont soumises au droit français.',
              'En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux de Bordeaux seront seuls compétents.',
            ]
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600,
              color: 'var(--gold)', marginBottom: '16px',
            }}>{section.title}</h2>
            {section.content.map((line, j) => (
              <p key={j} style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '15px', lineHeight: 1.8,
                color: 'rgba(138,154,181,.8)', marginBottom: '8px',
              }}>{line}</p>
            ))}
          </div>
        ))}

        <div style={{
          marginTop: '48px', padding: '20px 24px',
          border: '1px solid rgba(212,160,23,.1)',
          background: 'rgba(212,160,23,.04)',
        }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--blue-muted)', letterSpacing: '1px' }}>
            Dernière mise à jour : Juin 2026
          </p>
        </div>
      </div>
    </div>
  )
}