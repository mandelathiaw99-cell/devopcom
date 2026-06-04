import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { email, name, projectName, projectType, budget } = await request.json()

    // Email de bienvenue au client
    await resend.emails.send({
      from: 'DevopCom <onboarding@resend.dev>',
      to: 'mandelathiaw99@gmail.com',
      subject: `🚀 Nouveau client onboardé — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0a1220; padding: 32px; border-bottom: 3px solid #d4a017;">
            <h1 style="color: #d4a017; font-size: 24px; margin: 0;">DevopCom — Nouveau client</h1>
          </div>
          <div style="background: #f5f5f5; padding: 32px;">
            <h2 style="color: #1a1610;">🎉 ${name} vient de s'onboarder !</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Email</td>
                <td style="padding: 10px; color: #1a1610;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Projet</td>
                <td style="padding: 10px; color: #1a1610;">${projectName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #666;">Type</td>
                <td style="padding: 10px; color: #1a1610;">${projectType || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #666;">Budget</td>
                <td style="padding: 10px; color: #1a1610;">${budget ? budget + '€' : '—'}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #d4a017; text-align: center;">
              <a href="mailto:${email}" style="color: #000; font-weight: bold; text-decoration: none; font-size: 16px;">
                Contacter ${name} →
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
    console.error('Onboarding error:', error)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
  }
}