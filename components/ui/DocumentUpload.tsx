'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface Document {
  id: string
  name: string
  url: string
  type: string
  created_at: string
}

interface DocumentUploadProps {
  clientId: string
  documents: Document[]
  setDocuments: (docs: Document[]) => void
}

export default function DocumentUpload({ clientId, documents, setDocuments }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${clientId}/${Date.now()}.${fileExt}`

    const { error } = await supabase.storage
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

    const { data } = await supabase.from('documents').insert({
      client_id: clientId,
      name: file.name,
      url: urlData.publicUrl,
      type: fileType,
    }).select().single()

    if (data) {
      setDocuments([data, ...documents])
    }

    setUploading(false)
  }

  const handleDelete = async (docId: string, docUrl: string) => {
    const path = docUrl.split('/documents/')[1]
    await supabase.storage.from('documents').remove([path])
    await supabase.from('documents').delete().eq('id', docId)
    setDocuments(documents.filter(d => d.id !== docId))
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)' }}>
          Documents ({documents.length})
        </div>
        <label style={{
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #f5d480, #d4a017, #b8860b)',
          color: 'var(--black)', fontWeight: 600, fontSize: '11px',
          fontFamily: "'Outfit', sans-serif",
          cursor: uploading ? 'not-allowed' : 'pointer',
          opacity: uploading ? .6 : 1,
          display: 'inline-block',
        }}>
          {uploading ? 'Upload...' : '+ Envoyer un fichier'}
          <input type="file" onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
        </label>
      </div>

      {documents.length === 0 ? (
        <div style={{ background: 'var(--bg)', padding: '24px', border: '1px solid rgba(212,160,23,.08)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: 'var(--blue-muted)', fontStyle: 'italic' }}>
            Aucun document — envoyez des fichiers au client
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {documents.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg)', border: '1px solid rgba(212,160,23,.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{getTypeIcon(doc.type)}</span>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--white)', marginBottom: '2px' }}>{doc.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--blue-muted)', letterSpacing: '1px' }}>
                    {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '1px',
                  padding: '6px 12px', border: '1px solid rgba(212,160,23,.2)',
                  color: 'var(--gold)', textDecoration: 'none', textTransform: 'uppercase',
                }}>↓ Voir</a>
                <button onClick={() => handleDelete(doc.id, doc.url)} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '1px',
                  padding: '6px 12px', border: '1px solid rgba(239,68,68,.2)',
                  color: '#ef4444', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase',
                }}>✕</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}