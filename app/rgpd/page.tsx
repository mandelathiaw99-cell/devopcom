export default function RGPD() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
            Protection des données
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '52px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Politique de <em style={{ color: 'var(--gold)', fontWeight: 600 }}>confidentialité.</em>
          </h1>
          <div style={{ width: '60px', height: '1px', background: 'var(--gold)', marginTop: '24px', opacity: 0.4 }} />
        </div>

        {[
          {
            title: '1. Responsable du traitement',
            content: [
              'Le responsable du traitement des données personnelles collectées sur le site devopcom.fr est :',
              'DevopCom — Mandela Thiaw',
              'Email : contact@devopcom.fr',
              'Siège social : Bordeaux, France',
            ]
          },
          {
            title: '2. Données collectées',
            content: [
              'Dans le cadre de l\'utilisation du site et de ses services, DevopCom collecte les données suivantes :',
              '— Données d\'identification : nom, prénom, adresse email',
              '— Données professionnelles : nom de l\'entreprise, secteur d\'activité',
              '— Données de connexion : adresse IP, données de navigation, cookies',
              '— Données de communication : messages échangés via le formulaire de contact ou l\'espace client',
              '— Données financières : informations de facturation (hors données bancaires qui ne transitent pas par nos serveurs)',
            ]
          },
          {
            title: '3. Finalités du traitement',
            content: [
              'Les données collectées sont utilisées pour les finalités suivantes :',
              '— Gestion de la relation client et suivi des projets',
              '— Envoi de devis, factures et communications commerciales',
              '— Amélioration de nos services et de l\'expérience utilisateur',
              '— Respect de nos obligations légales et comptables',
              '— Sécurisation de l\'accès à l\'espace client',
            ]
          },
          {
            title: '4. Base légale du traitement',
            content: [
              'Le traitement de vos données repose sur les bases légales suivantes :',
              '— Exécution d\'un contrat : traitement nécessaire à la réalisation des prestations commandées',
              '— Consentement : pour l\'envoi de communications marketing (révocable à tout moment)',
              '— Obligation légale : conservation des données comptables et fiscales',
              '— Intérêt légitime : amélioration de nos services et sécurité du site',
            ]
          },
          {
            title: '5. Durée de conservation',
            content: [
              'Vos données sont conservées pour les durées suivantes :',
              '— Données clients actifs : pendant toute la durée de la relation commerciale',
              '— Données de prospects : 3 ans à compter du dernier contact',
              '— Données de facturation : 10 ans conformément aux obligations légales',
              '— Données de connexion : 12 mois',
              'Au-delà de ces délais, vos données sont supprimées ou anonymisées.',
            ]
          },
          {
            title: '6. Destinataires des données',
            content: [
              'Vos données personnelles ne sont jamais vendues à des tiers.',
              'Elles peuvent être partagées avec les sous-traitants techniques suivants dans le cadre strict de l\'exécution de nos services :',
              '— Supabase (base de données) — Union Européenne',
              '— Vercel (hébergement) — États-Unis, avec garanties appropriées',
              '— Resend (envoi d\'emails) — États-Unis, avec garanties appropriées',
              '— Stripe (paiement) — États-Unis, certifié PCI-DSS',
            ]
          },
          {
            title: '7. Vos droits',
            content: [
              'Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :',
              '— Droit d\'accès : obtenir une copie de vos données personnelles',
              '— Droit de rectification : corriger des données inexactes ou incomplètes',
              '— Droit à l\'effacement : demander la suppression de vos données',
              '— Droit à la limitation : restreindre le traitement de vos données',
              '— Droit à la portabilité : recevoir vos données dans un format structuré',
              '— Droit d\'opposition : vous opposer au traitement de vos données',
              '— Droit de retrait du consentement : à tout moment pour les traitements basés sur votre consentement',
            ]
          },
          {
            title: '8. Exercer vos droits',
            content: [
              'Pour exercer vos droits, contactez-nous par email à : contact@devopcom.fr',
              'Nous nous engageons à répondre à toute demande dans un délai maximum d\'un mois.',
              'En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l\'Informatique et des Libertés) : www.cnil.fr',
            ]
          },
          {
            title: '9. Cookies',
            content: [
              'Le site devopcom.fr utilise des cookies pour :',
              '— Maintenir votre session de connexion',
              '— Mémoriser vos préférences',
              '— Analyser l\'audience du site (statistiques anonymes)',
              'Vous pouvez à tout moment paramétrer votre navigateur pour refuser les cookies. Cela peut affecter certaines fonctionnalités du site.',
            ]
          },
          {
            title: '10. Sécurité des données',
            content: [
              'DevopCom met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou divulgation.',
              'Le site est sécurisé par un certificat SSL (HTTPS). Les mots de passe sont chiffrés et ne sont jamais stockés en clair.',
              'En cas de violation de données susceptible d\'engendrer un risque pour vos droits et libertés, vous en serez informé dans les meilleurs délais.',
            ]
          },
          {
            title: '11. Modification de la politique',
            content: [
              'DevopCom se réserve le droit de modifier la présente politique de confidentialité à tout moment.',
              'Toute modification sera publiée sur cette page avec mise à jour de la date de révision.',
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