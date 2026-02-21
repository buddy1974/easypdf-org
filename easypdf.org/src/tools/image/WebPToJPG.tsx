import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { convertImage, formatBytes } from '../../lib/imageEngine'
import { Download } from 'lucide-react'

const faqs = [
  {
    question: 'Why convert WebP to JPG?',
    answer: 'WebP is a modern format with excellent compression, but older software, email clients, and some applications don\'t support it. Converting to JPG ensures maximum compatibility across all devices and platforms.',
  },
  {
    question: 'Will I lose quality converting WebP to JPG?',
    answer: 'If the source WebP used lossy compression (which most do), converting to JPG at a high quality setting produces minimal visible quality loss. However, since JPG also uses lossy compression, some additional quality degradation occurs. For lossless conversion, convert to PNG instead.',
  },
  {
    question: 'Does the tool handle WebP with transparency?',
    answer: 'Yes, but JPG doesn\'t support transparency. Any transparent areas in the WebP image will be filled with a white background in the JPG output. If you need to preserve transparency, convert to PNG instead.',
  },
  {
    question: 'Is my image uploaded to servers?',
    answer: 'No. Conversion happens entirely in your browser. Your images never leave your device.',
  },
  {
    question: 'Can I batch convert multiple WebP files?',
    answer: 'Currently, our tool processes one image at a time. For batch processing, you can use each image separately, or check our Bulk Image Renamer tool for managing multiple files.',
  },
]

export default function WebPToJPG() {
  const [result, setResult] = useState<{ url: string; originalSize: number; convertedSize: number; filename: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = async (files: File[]) => {
    const f = files[0]
    if (!f) return
    setResult(null)
    setError('')
    setLoading(true)
    try {
      const res = await convertImage(f, { format: 'image/jpeg', quality: 0.9 })
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
    }
    setLoading(false)
  }

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result.url
    a.download = result.filename
    a.click()
  }

  return (
    <>
      <MetaTags
        title="WebP to JPG Converter Free Online | EasyPDFKit"
        description="Convert WebP images to JPG format online for free. Fast, browser-based conversion. Files never leave your device. No signup required."
        canonical="https://easypdfkit.org/webp-to-jpg"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'WebP to JPG' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">WebP to JPG</h1>
        <p className="text-gray-600 mb-8 text-lg">Convert WebP images to universally compatible JPG format. Instant, private, 100% in-browser.</p>

        <div className="space-y-4">
          <UploadZone
            accept="image/webp,image/*"
            onFiles={handleFiles}
            label="Click or drag a WebP image here"
            hint="Converted to JPG automatically at 90% quality"
          />

          {loading && (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 mt-2">Converting…</p>
            </div>
          )}

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

          {result && !loading && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{result.filename}</p>
                  <p className="text-sm text-gray-500">{formatBytes(result.originalSize)} → {formatBytes(result.convertedSize)}</p>
                </div>
                <button onClick={handleDownload} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  <Download size={16} />
                  Download JPG
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>About WebP and JPG Formats</h2>
          <p>
            WebP is a modern image format developed by Google that offers superior compression compared to traditional formats. WebP images are typically 25-35% smaller than equivalent JPG files and 26% smaller than equivalent PNG files. However, WebP's relatively recent introduction means it isn't universally supported by all software, particularly older applications, some email clients, and certain content management systems.
          </p>
          <p>
            JPG (Joint Photographic Experts Group) is the most widely supported image format in the world. Every device, application, browser, and platform supports JPG. When you need guaranteed compatibility, JPG is the safe choice.
          </p>
          <h2>When to Convert WebP to JPG</h2>
          <ul>
            <li>Sharing images via email with recipients who use older email clients</li>
            <li>Uploading to platforms that don't accept WebP (some stock photo sites, older CMS platforms)</li>
            <li>Editing in older photo software that doesn't support WebP</li>
            <li>Printing services that require JPG or PNG format</li>
            <li>Sending to clients or colleagues who may have compatibility issues with WebP</li>
          </ul>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/webp-to-png" className="text-blue-600">WebP to PNG</a> — Convert WebP to PNG (lossless)</li>
            <li><a href="/convert-image" className="text-blue-600">Convert Image</a> — Convert between any image formats</li>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Reduce image file size</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
