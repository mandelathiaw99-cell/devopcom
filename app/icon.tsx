import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0a1220',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Bordure or */}
        <div style={{
          position: 'absolute',
          inset: 1,
          border: '1px solid #d4a017',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Lettre D stylisée */}
          <div style={{
            fontFamily: 'serif',
            fontSize: 18,
            fontWeight: 900,
            background: 'linear-gradient(135deg, #f5d480, #d4a017)',
            backgroundClip: 'text',
            color: '#d4a017',
            letterSpacing: '-1px',
          }}>
            D
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}