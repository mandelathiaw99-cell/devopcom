export default function CGU() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
            Conditions d'utilisation
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '52px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Conditions Générales <em style={{ color: 'var(--gold)', fontWeight: 600 }}>d'Utilisation.</em>
          </h1>
          <div style={{ width: '60px', height: '1px', background: 'var(--gold)', marginTop: '24px', opacity: 0.4 }} />
        </div>

        {[
          {
            title: '1. Objet',
            content: [
              'Les présentes Conditions Générales d\'Utilisation (CGU) ont pour objet de définir les modalités et conditions d\'utilisation du site devopcom.fr et des services proposés par DevopCom.',
              'L\'accès et l\'utilisation du site impliquent l\'acceptation pleine et entière des présentes CGU.',
            ]
          },
          {
            title: '2. Accès au site',
            content: [
              'Le site devopcom.fr est accessible gratuitement à tout utilisateur disposant d\'un accès à Internet.',
              'DevopCom se réserve le droit de suspendre, modifier ou interrompre l\'accès au site à tout moment, sans préavis ni indemnité.',
              'DevopCom ne peut être tenu responsable des interruptions dues à des opérations de maintenance, des pannes techniques ou des cas de force majeure.',
            ]
          },
          {
            title: '3. Espace client',
            content: [
              'L\'accès à l\'espace client nécessite la création d\'un compte avec une adresse email valide et un mot de passe.',
              'L\'utilisateur est seul responsable de la confidentialité de ses identifiants de connexion.',
              'Tout accès au site effectué via les identifiants d\'un utilisateur est présumé effectué par cet utilisateur.',
              'En cas de perte ou de vol de ses identifiants, l\'utilisateur doit en informer immédiatement DevopCom.',
            ]
          },
          {
            title: '4. Contenu et comportement des utilisateurs',
            content: [
              'L\'utilisateur s\'engage à utiliser le site et ses services de manière conforme aux lois en vigueur et aux présentes CGU.',
              'Il est strictement interdit de publier, transmettre ou partager tout contenu illicite, diffamatoire, obscène, violent ou portant atteinte aux droits de tiers.',
              'Le Client est seul responsable des contenus qu\'il fournit à DevopCom dans le cadre de ses prestations.',
              'DevopCom se réserve le droit de refuser ou supprimer tout contenu jugé inapproprié, sans préavis ni justification.',
            ]
          },
          {
            title: '5. Propriété intellectuelle',
            content: [
              'L\'ensemble des éléments du site devopcom.fr (design, textes, logos, images, code) est la propriété exclusive de DevopCom.',
              'Toute reproduction, représentation ou utilisation non autorisée de ces éléments est strictement interdite et constitue une contrefaçon.',
              'DevopCom se réserve le droit de mentionner les projets réalisés pour ses clients dans son portfolio, sauf accord contraire explicite.',
            ]
          },
          {
            title: '6. Données personnelles',
            content: [
              'DevopCom collecte et traite les données personnelles des utilisateurs conformément à sa politique de confidentialité (RGPD).',
              'Les données collectées sont utilisées uniquement dans le cadre de la relation commerciale et ne sont pas cédées à des tiers sans consentement.',
              'Pour exercer vos droits, consultez notre page RGPD ou contactez-nous à : contact@devopcom.fr',
            ]
          },
          {
            title: '7. Cookies',
            content: [
              'Le site devopcom.fr peut utiliser des cookies pour améliorer l\'expérience utilisateur et réaliser des statistiques de visite.',
              'L\'utilisateur peut configurer son navigateur pour refuser les cookies, ce qui peut affecter certaines fonctionnalités du site.',
            ]
          },
          {
            title: '8. Liens externes',
            content: [
              'Le site peut contenir des liens vers des sites tiers. DevopCom n\'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs pratiques.',
            ]
          },
          {
            title: '9. Limitation de responsabilité',
            content: [
              'DevopCom ne saurait être tenu responsable des dommages directs ou indirects résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le site.',
              'DevopCom ne garantit pas que le site soit exempt d\'anomalies ou d\'erreurs, ni que celles-ci puissent être corrigées.',
            ]
          },
          {
            title: '10. Modification des CGU',
            content: [
              'DevopCom se réserve le droit de modifier les présentes CGU à tout moment.',
              'Les modifications prennent effet dès leur publication sur le site. Il appartient à l\'utilisateur de consulter régulièrement les CGU.',
            ]
          },
          {
            title: '11. Droit applicable et litiges',
            content: [
              'Les présentes CGU sont soumises au droit français.',
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