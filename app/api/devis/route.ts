import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message, pack, answers } = await request.json()

    // Email à toi (notification)
    await resend.emails.send({
      from: 'DevopCom <onboarding@resend.dev>',
      to: 'thiawmandela@gmail.com',
      subject: `🔥 Nouveau devis — Pack ${pack} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a1220; padding: 32px; border-bottom: 3px solid #d4a017;">
            <h1 style="color: #d4a017; font-size: 24px; margin: 0;">DevopCom — Nouveau devis</h1>
          </div>
          <div style="background: #f5f5f5; padding: 32px;">
            <h2 style="color: #1a1610; font-size: 20px;">Pack recommandé : ${pack}</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Nom</td>
                <td style="padding: 10px; color: #1a1610;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Email</td>
                <td style="padding: 10px; color: #1a1610;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Type projet</td>
                <td style="padding: 10px; color: #1a1610;">${answers?.type || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Budget</td>
                <td style="padding: 10px; color: #1a1610;">${answers?.budget || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Délai</td>
                <td style="padding: 10px; color: #1a1610;">${answers?.delai || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Services</td>
                <td style="padding: 10px; color: #1a1610;">${answers?.services || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Structure</td>
                <td style="padding: 10px; color: #1a1610;">${answers?.structure || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #666;">Message</td>
                <td style="padding: 10px; color: #1a1610;">${message || '—'}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #d4a017; text-align: center;">
              <a href="mailto:${email}" style="color: #000; font-weight: bold; text-decoration: none; font-size: 16px;">
                Répondre à ${name} →
              </a>
            </div>
          </div>
        </div>
      `,
    })

    // Email de confirmation au client
    await resend.emails.send({
      from: 'DevopCom <onboarding@resend.dev>',
      to: email,
      subject: `✦ Votre demande de devis DevopCom — Pack ${pack}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a1220; padding: 32px; border-bottom: 3px solid #d4a017;">
            <h1 style="color: #d4a017; font-size: 24px; margin: 0;">DevopCom</h1>
            <p style="color: #8a9ab5; margin: 8px 0 0;">Votre digital, de A à Z.</p>
          </div>
          <div style="background: #f5f5f5; padding: 32px;">
            <h2 style="color: #1a1610;">Bonjour ${name},</h2>
            <p style="color: #444; line-height: 1.7; margin-top: 12px;">
              Merci pour votre demande de devis ! J'ai bien reçu votre projet et vous recontacterai sous <strong>48h</strong> pour discuter des détails.
            </p>
            <div style="background: #0a1220; padding: 24px; margin: 24px 0; border-left: 4px solid #d4a017;">
              <p style="color: #d4a017; font-weight: bold; margin: 0 0 8px;">Pack recommandé : ${pack}</p>
              <p style="color: #8a9ab5; margin: 0; font-size: 14px;">Sur la base de vos réponses au questionnaire</p>
            </div>
            <p style="color: #444; line-height: 1.7;">
              En attendant, n'hésitez pas à consulter notre site pour en savoir plus sur nos services.
            </p>
            <div style="margin-top: 24px; text-align: center;">
              <a href="https://devopcom.vercel.app" 
                style="background: #d4a017; color: #000; padding: 14px 32px; text-decoration: none; font-weight: bold; display: inline-block;">
                Visiter DevopCom →
              </a>
            </div>
          </div>
          <div style="background: #0a1220; padding: 20px; text-align: center;">
            <p style="color: #8a9ab5; font-size: 12px; margin: 0;">
              © 2026 DevopCom — Bordeaux, France
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
  }
}