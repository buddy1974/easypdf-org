import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { convertImage, formatBytes } from '../../lib/imageEngine'
import type { ImageFormat } from '../../lib/imageEngine'
import { Download } from 'lucide-react'
import { cn } from '../../lib/utils'

const formats: { value: ImageFormat; label: string; desc: string }[] = [
  { value: 'image/jpeg', label: 'JPG', desc: 'Lossy, small file size. Best for photos.' },
  { value: 'image/png', label: 'PNG', desc: 'Lossless, supports transparency.' },
  { value: 'image/webp', label: 'WebP', desc: 'Modern format, smaller than JPG/PNG.' },
]

const faqs = [
  {
    question: 'When should I use JPG vs PNG vs WebP?',
    answer: 'Use JPG for photographs and images without transparency — it offers small file sizes. Use PNG when you need transparency (transparent backgrounds) or lossless quality. Use WebP for web images as it offers the best compression of the three while supporting both transparency and lossy/lossless modes.',
  },
  {
    question: 'Will converting JPG to PNG improve quality?',
    answer: 'No. Converting from JPG to PNG does not recover quality lost during the original JPG compression. The conversion is lossless going forward, but any existing JPEG artifacts remain. PNG will simply preserve what is already there without further loss.',
  },
  {
    question: 'Does converting to WebP maintain transparency?',
    answer: 'Yes. WebP supports full transparency (alpha channel), similar to PNG. When you convert a transparent PNG to WebP, the transparency is preserved.',
  },
  {
    question: 'Is my image uploaded to servers?',
    answer: 'No. All conversion happens directly in your browser using the HTML5 Canvas API. Your images never leave your device.',
  },
  {
    question: 'What happens to the background when converting a transparent PNG to JPG?',
    answer: 'JPG does not support transparency, so transparent areas will be filled with a solid white background during conversion. If you need to preserve transparency, convert to WebP or PNG instead.',
  },
]

export default function ConvertImage() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState<ImageFormat>('image/webp')
  const [quality, setQuality] = useState(0.85)
  const [result, setResult] = useState<{ url: string; originalSize: number; convertedSize: number; filename: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = (files: File[]) => {
    if (files[0]) { setFile(files[0]); setResult(null); setError('') }
  }

  const handleConvert = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const res = await convertImage(file, { format, quality })
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
        title="Convert Image Format | JPG PNG WebP Free | EasyPDFKit"
        description="Convert images between JPG, PNG, and WebP formats online for free. 100% client-side processing. No signup required."
        canonical="https://easypdfkit.org/convert-image"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'Convert Image' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Convert Image Format</h1>
        <p className="text-gray-600 mb-8 text-lg">Convert images between JPG, PNG, and WebP formats. Runs entirely in your browser.</p>

        <div className="space-y-5">
          <UploadZone
            accept="image/*"
            onFiles={handleFiles}
            label="Click or drag an image here"
            hint="Supports JPG, PNG, WebP, GIF, BMP, and more"
          />

          {file && (
            <>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Convert to:</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {formats.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      onClick={() => { setFormat(value); setResult(null) }}
                      className={cn(
                        'border-2 rounded-xl p-4 text-left transition-all',
                        format === value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <p className={cn('font-bold text-lg mb-1', format === value ? 'text-blue-700' : 'text-gray-900')}>{label}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {format !== 'image/png' && (
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700">Quality: {Math.round(quality * 100)}%</label>
                  </div>
                  <input
                    type="range" min={10} max={100}
                    value={Math.round(quality * 100)}
                    onChange={e => { setQuality(Number(e.target.value) / 100); setResult(null) }}
                    className="w-full accent-blue-600"
                  />
                </div>
              )}

              <button
                onClick={handleConvert}
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Converting…' : `Convert to ${formats.find(f => f.value === format)?.label}`}
              </button>
            </>
          )}

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

          {result && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{result.filename}</p>
                <p className="text-sm text-gray-500">{formatBytes(result.originalSize)} → {formatBytes(result.convertedSize)}</p>
              </div>
              <button onClick={handleDownload} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Download
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Choosing the Right Image Format</h2>
          <p>
            The image format you choose significantly impacts file size, quality, and compatibility. JPG (JPEG) is the most widely supported format, ideal for photographs and images with many colors. PNG is the go-to format when transparency is needed, or for screenshots, logos, and images with large areas of flat color. WebP is Google's modern image format that typically produces files 25-35% smaller than JPG at equivalent quality while also supporting transparency — making it excellent for web use.
          </p>
          <h2>When to Convert Image Formats</h2>
          <ul>
            <li><strong>PNG to JPG:</strong> When you want to reduce file size and don't need transparency. Great for photographs saved as PNG.</li>
            <li><strong>JPG to PNG:</strong> When you need transparency or want a lossless copy going forward.</li>
            <li><strong>Any format to WebP:</strong> For web images where you want the smallest possible file size for fastest loading.</li>
            <li><strong>WebP to JPG/PNG:</strong> When you receive a WebP image but need a more universally compatible format for older software or email clients.</li>
          </ul>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Reduce file size without format change</li>
            <li><a href="/resize-image" className="text-blue-600">Resize Image</a> — Change image dimensions</li>
            <li><a href="/webp-to-jpg" className="text-blue-600">WebP to JPG</a> — Quick WebP to JPG conversion</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
