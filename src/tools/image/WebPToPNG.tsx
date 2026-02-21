import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { convertImage, formatBytes } from '../../lib/imageEngine'
import { Download } from 'lucide-react'

const faqs = [
  {
    question: 'Does WebP to PNG preserve transparency?',
    answer: 'Yes. Both WebP and PNG support transparency (alpha channel). When you convert a WebP image with a transparent background to PNG, the transparency is fully preserved.',
  },
  {
    question: 'Why is the PNG output larger than the WebP?',
    answer: 'PNG is a lossless format and stores more image data than WebP. WebP uses more advanced compression algorithms to achieve smaller files. So it is normal for a PNG to be larger than an equivalent WebP image.',
  },
  {
    question: 'Is the conversion lossless?',
    answer: 'The conversion from WebP to PNG is lossless — the PNG output will be a pixel-perfect copy of the WebP source. No quality is lost in the PNG format.',
  },
  {
    question: 'Do I need to install any software?',
    answer: 'No. Conversion happens entirely in your browser using the built-in HTML5 Canvas API. No installation required, and no files are uploaded to any server.',
  },
  {
    question: 'What if my WebP uses lossy compression?',
    answer: 'Most WebP images use lossy compression (similar to JPG). Converting a lossy WebP to PNG will not recover any quality that was lost during the original WebP compression — but the PNG will preserve exactly what is in the WebP without any additional loss.',
  },
]

export default function WebPToPNG() {
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
        title="WebP to PNG Converter Free Online | EasyPDFKit"
        description="Convert WebP images to PNG format online for free. Lossless conversion with full transparency support. 100% browser-based. No signup required."
        canonical="https://easypdfkit.org/webp-to-png"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'WebP to PNG' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">WebP to PNG</h1>
        <p className="text-gray-600 mb-8 text-lg">Convert WebP images to PNG format. Preserves transparency. Lossless conversion in your browser.</p>

        <div className="space-y-4">
          <UploadZone
            accept="image/webp,image/*"
            onFiles={handleFiles}
            label="Click or drag a WebP image here"
            hint="Transparency is preserved in the PNG output"
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
          <h2>WebP vs PNG: Key Differences</h2>
          <p>
            WebP and PNG are both modern image formats that support transparency, but they serve different purposes. WebP is optimized for web delivery — it achieves smaller file sizes through advanced compression algorithms. PNG is a lossless format optimized for portability and compatibility, ensuring pixel-perfect quality and maximum software support.
          </p>
          <h2>Why Convert WebP to PNG?</h2>
          <p>
            Despite WebP's advantages for web use, there are many situations where PNG is the better choice. Image editing software like Photoshop, GIMP, and older versions of many applications have better PNG support than WebP. If you need to edit a WebP image in a tool that doesn't support WebP, converting to PNG first is the right approach. PNG is also preferred for screenshots, logos, and images that need to be shared across many different platforms.
          </p>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/webp-to-jpg" className="text-blue-600">WebP to JPG</a> — Convert WebP to JPG for smaller file size</li>
            <li><a href="/convert-image" className="text-blue-600">Convert Image</a> — Convert between any formats</li>
            <li><a href="/png-to-jpg" className="text-blue-600">PNG to JPG</a> — Convert PNG to JPG</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
