'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Document {
  id: string
  name: string
  url: string
  type: string
  created_at: string
}

export default function Documents() {
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      setUserId(user.id)

      const { data } = await supabase
        .from('documents')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })

      setDocuments(data || [])
      setLoading(false)

      // Realtime
      const channel = supabase
        .channel('documents-changes')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'documents',
          filter: `client_id=eq.${user.id}`,
        }, (payload) => {
          setDocuments(prev => [payload.new as Document, ...prev])
        })
        .subscribe()

      return () => supabase.removeChannel(channel)
    }
    fetchData()
  }, [router])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !userId) return
    const file = e.target.files[0]
    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    const { data: uploadData, error } = await supabase.storage
      .from('documents')
      .upload(fileName, file)

    if (error) {
      console.error('Upload error:', error)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName)

    const fileType = fileExt === 'pdf' ? 'pdf' :
      ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt || '') ? 'image' :
      ['mp4', 'mov', 'avi'].includes(fileExt || '') ? 'video' :
      fileExt === 'zip' ? 'zip' : 'file'

    await supabase.from('documents').insert({
      client_id: userId,
      name: file.name,
      url: urlData.publicUrl,
      type: fileType,
    })

    setUploading(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄'
      case 'image': return '🖼️'
      case 'video': return '🎥'
      case 'zip': return '📦'
      default: return '📎'
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: 'var(--gold)', fontStyle: 'italic' }}>Chargement...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{
        width: '220px', background: 'var(--bg2)',
        borderRight: '1px solid rgba(212,160,23,.08)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(212,160,23,.08)' }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: '14px', fontWeight: 900, letterSpacing: '2px',
            background: 'linear-gradient(90deg, #f953c6, #7c3aed, #2563eb, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1,
          }}>DEVOP</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', letterSpacing: '4px', color: 'var(--gold)', textTransform: 'uppercase', opacity: .7 }}>C · O · M</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Mon projet', href: '/dashboard/projet' },
            { label: 'Factures', href: '/dashboard/factures' },
            { label: 'Messages', href: '/dashboard/messages' },
            { label: 'Documents', href: '/dashboard/documents' },
            { label: 'Paramètres', href: '/dashboard/parametres' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 20px', fontSize: '12px',
              color: item.href === '/dashboard/documents' ? 'var(--gold)' : 'rgba(138,154,181,.6)',
              textDecoration: 'none',
              borderLeft: item.href === '/dashboard/documents' ? '2px solid var(--gold)' : '2px solid transparent',
              background: item.href === '/dashboard/documents' ? 'rgba(212,160,23,.04)' : 'transparent',
            }}>{item.label}</Link>
          ))}
        </nav>
        <div style={{ padding: '20px' }}>
          <button onClick={async () => { await supabase.auth.signOut(); router.push('/') }} style={{
            width: '100%', padding: '10px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--blue-muted)', background: 'transparent',
            border: '1px solid rgba(212,160,23,.15)', cursor: 'pointer',
          }}>Déconnexion</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: '220px', flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Documents</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
              Mes <em style={{ color: 'var(--gold)', fontWeight: 600 }}>documents.</em>
            </h1>
          </div>

          {/* Upload */}
          <label style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
            color: 'var(--black)', fontWeight: 600, fontSize: '12px',
            fontFamily: "'Outfit', sans-serif",
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? .6 : 1,
            display: 'inline-block',
          }}>
            {uploading ? 'Upload...' : '+ Envoyer un fichier'}
            <input
              type="file"
              onChange={handleUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </div>

        {documents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: 'var(--bg2)', padding: '48px', border: '1px solid rgba(212,160,23,.08)', textAlign: 'center' }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'var(--blue-muted)', fontStyle: 'italic', marginBottom: '8px' }}>
              Aucun document pour le moment.
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '2px', color: 'var(--blue-muted)', textTransform: 'uppercase' }}>
              Envoyez un fichier ou attendez les livrables de DevopCom
            </div>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
            {documents.map((doc, i) => (
              <motion.a
                key={doc.id}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(212,160,23,.08)' }}
                style={{
                  background: 'var(--bg2)', padding: '24px',
                  border: '1px solid rgba(212,160,23,.08)',
                  textDecoration: 'none', display: 'block',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{getTypeIcon(doc.type)}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 600, color: 'var(--white)', marginBottom: '6px', wordBreak: 'break-all' }}>{doc.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '1px', color: 'var(--blue-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
                  {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                </div>
                <div style={{
                  padding: '8px 16px', textAlign: 'center',
                  background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
                  color: 'var(--black)', fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700,
                }}>
                  Télécharger →
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}