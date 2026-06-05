export default function MentionsLegales() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
            Informations légales
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '52px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
            Mentions <em style={{ color: 'var(--gold)', fontWeight: 600 }}>légales.</em>
          </h1>
          <div style={{ width: '60px', height: '1px', background: 'var(--gold)', marginTop: '24px', opacity: 0.4 }} />
        </div>

        {/* Sections */}
        {[
          {
            title: '1. Éditeur du site',
            content: [
              'Le site devopcom.fr est édité par DevopCom, agence de communication et développement digital.',
              'Statut : Auto-entrepreneur / Entreprise individuelle',
              'Responsable de publication : Mandela Thiaw',
              'Email : contact@devopcom.fr',
              'Siège social : Bordeaux, France',
            ]
          },
          {
            title: '2. Hébergement',
            content: [
              'Le site est hébergé par Vercel Inc.',
              '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
              'Site web : https://vercel.com',
            ]
          },
          {
            title: '3. Propriété intellectuelle',
            content: [
              'L\'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) est la propriété exclusive de DevopCom, à l\'exception des marques, logos ou contenus appartenant à d\'autres sociétés partenaires ou auteurs.',
              'Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l\'accord exprès par écrit de DevopCom.',
            ]
          },
          {
            title: '4. Limitation de responsabilité',
            content: [
              'DevopCom s\'efforce d\'assurer l\'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, DevopCom ne peut garantir l\'exactitude, la précision ou l\'exhaustivité des informations mises à disposition.',
              'DevopCom décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.',
            ]
          },
          {
            title: '5. Liens hypertextes',
            content: [
              'Le site devopcom.fr peut contenir des liens hypertextes vers d\'autres sites. DevopCom n\'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.',
            ]
          },
          {
            title: '6. Droit applicable',
            content: [
              'Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.',
            ]
          },
          {
            title: '7. Contact',
            content: [
              'Pour toute question relative au site ou à son contenu, vous pouvez nous contacter à : contact@devopcom.fr',
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