import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, message, pack, answers } = await request.json()

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
                <td style="padding: 10px; font-weight: bold; color: #666;">Email client</td>
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
  }
}