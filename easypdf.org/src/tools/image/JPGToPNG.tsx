import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { convertImage, formatBytes } from '../../lib/imageEngine'
import { Download } from 'lucide-react'

const faqs = [
  {
    question: 'Does converting JPG to PNG improve image quality?',
    answer: 'No. Converting JPG to PNG cannot recover quality that was lost during JPEG compression. The PNG will be a lossless copy of the JPG — meaning no further quality will be lost, but existing JPEG artifacts (blurring, blockiness) will remain.',
  },
  {
    question: 'Why would I convert JPG to PNG?',
    answer: 'Common reasons: you need to edit the image without further quality loss, you want to add transparency to the image in a later editing step, or a platform or application requires PNG format specifically.',
  },
  {
    question: 'Will the PNG file be larger than the JPG?',
    answer: 'Yes, almost always. PNG is a lossless format and stores significantly more data than JPG. A 100 KB JPG photo might become a 500 KB-1 MB PNG. This is expected and normal.',
  },
  {
    question: 'Does the converted PNG support transparency?',
    answer: 'The initial conversion produces a fully opaque PNG (matching the JPG which has no transparency). If you need to add transparency, you would edit the PNG in an image editor afterwards.',
  },
  {
    question: 'Is conversion done in my browser?',
    answer: 'Yes. JPG to PNG conversion uses the HTML5 Canvas API and happens entirely in your browser. Your image never leaves your device.',
  },
]

export default function JPGToPNG() {
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
      const res = await convertImage(f, { format: 'image/png' })
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
        title="JPG to PNG Converter Free Online | EasyPDFKit"
        description="Convert JPG images to PNG format online for free. Lossless PNG output. 100% browser-based — files never leave your device. No signup required."
        canonical="https://easypdfkit.org/jpg-to-png"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'JPG to PNG' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JPG to PNG</h1>
        <p className="text-gray-600 mb-8 text-lg">Convert JPG images to lossless PNG format instantly in your browser.</p>

        <div className="space-y-4">
          <UploadZone
            accept="image/jpeg,image/jpg,.jpg,.jpeg,image/*"
            onFiles={handleFiles}
            label="Click or drag a JPG image here"
            hint="Converted to PNG losslessly in your browser"
          />
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 mt-2">Converting…</p>
            </div>
          )}
          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}
          {result && !loading && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-900 text-sm">{result.filename}</p>
                <p className="text-sm text-gray-500">{formatBytes(result.originalSize)} → {formatBytes(result.convertedSize)}</p>
              </div>
              <button onClick={handleDownload} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Download PNG
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>JPG vs PNG: Understanding the Formats</h2>
          <p>
            JPG (JPEG) uses lossy compression — it discards some image data to achieve small file sizes. This makes JPG ideal for photographs where minor quality loss is acceptable in exchange for significantly smaller files. PNG uses lossless compression, preserving every pixel perfectly. PNG also supports transparency (alpha channel), which JPG does not.
          </p>
          <h2>Best Use Cases for Converting JPG to PNG</h2>
          <ul>
            <li><strong>Further editing:</strong> If you need to edit an image multiple times, working in PNG prevents accumulating JPEG quality loss with each save.</li>
            <li><strong>Adding transparency:</strong> Convert to PNG first if you need to make parts of the image transparent in image editing software.</li>
            <li><strong>Logos and icons:</strong> PNG is preferred for logos and icons that will be placed on various backgrounds.</li>
            <li><strong>Platform requirements:</strong> Some platforms or tools specifically require PNG format.</li>
          </ul>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/png-to-jpg" className="text-blue-600">PNG to JPG</a> — Convert PNG back to JPG for smaller file size</li>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Reduce image file size</li>
            <li><a href="/convert-image" className="text-blue-600">Convert Image</a> — Convert to any format including WebP</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
