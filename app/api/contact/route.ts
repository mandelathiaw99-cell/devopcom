import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, subject, message } = await request.json()

    await resend.emails.send({
      from: 'DevopCom <onboarding@resend.dev>',
      to: 'mandelathiaw99@gmail.com',
      subject: `📩 Nouveau message — ${subject || 'Contact DevopCom'} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a1220; padding: 32px; border-bottom: 3px solid #d4a017;">
            <h1 style="color: #d4a017; font-size: 24px; margin: 0;">DevopCom — Nouveau message</h1>
          </div>
          <div style="background: #f5f5f5; padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666; width: 30%;">Nom</td>
                <td style="padding: 10px; color: #1a1610;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Email</td>
                <td style="padding: 10px; color: #1a1610;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Sujet</td>
                <td style="padding: 10px; color: #1a1610;">${subject || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #666;">Message</td>
                <td style="padding: 10px; color: #1a1610; line-height: 1.6;">${message}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #d4a017; text-align: center;">
              <a href="mailto:${email}" style="color: #000; font-weight: bold; text-decoration: none; font-size: 16px;">
                Répondre à ${name} →
              </a>
            </div>
          </div>
          <div style="background: #0a1220; padding: 20px; text-align: center;">
            <p style="color: #8a9ab5; font-size: 12px; margin: 0;">© 2026 DevopCom — Bordeaux, France</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
  }
}