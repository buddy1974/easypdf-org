import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { compressImage, formatBytes } from '../../lib/imageEngine'
import { Download } from 'lucide-react'

const faqs = [
  {
    question: 'Does image compression affect quality?',
    answer: 'At higher quality settings (70-100%), compression is nearly invisible to the human eye. At lower settings (below 50%), you will begin to see quality reduction, particularly in areas with fine detail or smooth gradients. For web use, quality settings of 70-85% are generally recommended.',
  },
  {
    question: 'Is my image uploaded to your servers?',
    answer: 'No. Image compression happens entirely in your browser using the HTML5 Canvas API. Your image never leaves your device. This means compression is instant and completely private.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'You can compress JPG, PNG, and WebP images. JPG and WebP images support lossy compression with the quality slider. PNG images support lossless compression only, so the quality slider has less effect on PNG files.',
  },
  {
    question: 'Why is my compressed PNG larger than the original?',
    answer: 'PNG is a lossless format, so the quality slider has limited impact. If your PNG already contains compressed data, re-encoding it may not reduce the size — and could slightly increase it. For maximum PNG compression, try converting to WebP or JPG instead using our Convert Image tool.',
  },
  {
    question: 'What quality setting should I use?',
    answer: 'For web images: 75-85% is the sweet spot between quality and file size. For social media: 80-90% works well. For thumbnails and small previews where quality is less critical: 60-70% is fine. For printing or professional use: 90% or higher.',
  },
]

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(0.8)
  const [result, setResult] = useState<{ url: string; originalSize: number; convertedSize: number; filename: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = async (files: File[]) => {
    const f = files[0]
    if (!f) return
    setFile(f)
    setResult(null)
    setError('')
    await runCompression(f, quality)
  }

  const runCompression = async (f: File, q: number) => {
    setLoading(true)
    try {
      const res = await compressImage(f, q)
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compression failed')
    }
    setLoading(false)
  }

  const handleQualityChange = async (q: number) => {
    setQuality(q)
    if (file) await runCompression(file, q)
  }

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result.url
    a.download = result.filename
    a.click()
  }

  const savings = result ? Math.round((1 - result.convertedSize / result.originalSize) * 100) : 0

  return (
    <>
      <MetaTags
        title="Image Compressor | Compress Images Free Online | EasyPDFKit"
        description="Compress JPG, PNG, and WebP images online for free. Reduce image file size with quality control. 100% client-side processing — files never leave your browser."
        canonical="https://easypdfkit.org/image-compressor"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'Image Compressor' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Compressor</h1>
        <p className="text-gray-600 mb-8 text-lg">Reduce image file size with quality control. Runs 100% in your browser — your images never leave your device.</p>

        <div className="space-y-4">
          <UploadZone
            accept="image/*"
            onFiles={handleFiles}
            label="Click or drag an image here"
            hint="Supports JPG, PNG, WebP. Processing happens locally in your browser."
          />

          {file && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Quality: {Math.round(quality * 100)}%</label>
                {result && (
                  <span className={`text-sm font-semibold ${savings > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                    {savings > 0 ? `${savings}% smaller` : 'No reduction'}
                  </span>
                )}
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={Math.round(quality * 100)}
                onChange={e => handleQualityChange(Number(e.target.value) / 100)}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Smallest file</span>
                <span>Best quality</span>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 mt-2">Compressing…</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
          )}

          {result && !loading && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500">Original:</span>
                    <span className="font-medium text-gray-900">{formatBytes(result.originalSize)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500">Compressed:</span>
                    <span className="font-medium text-green-700">{formatBytes(result.convertedSize)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="text-sm font-semibold text-green-700">Saved {formatBytes(result.originalSize - result.convertedSize)} ({savings}%)</div>
                  )}
                </div>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Compress Images?</h2>
          <p>
            Image file size directly impacts website performance, storage costs, and user experience. Large images slow down page load times, consume more bandwidth (which can be costly on mobile data plans), and take up more storage space on devices and servers. Image compression reduces file size while maintaining acceptable visual quality, striking the right balance between performance and appearance.
          </p>
          <h2>How Image Compression Works</h2>
          <p>
            Our image compressor uses the browser's native canvas API to re-encode your image at a lower quality level. For JPG and WebP images, this applies lossy compression — the encoder selectively discards image data that is least noticeable to the human eye. For PNG images, compression is lossless within the PNG specification, so the quality slider primarily affects file organization and encoding efficiency.
          </p>
          <h2>Recommended Quality Settings for Different Uses</h2>
          <ul>
            <li><strong>Website thumbnails (small, decorative):</strong> 60-70%</li>
            <li><strong>Product images (e-commerce):</strong> 75-85%</li>
            <li><strong>Blog and article images:</strong> 75-85%</li>
            <li><strong>Portfolio and professional photography:</strong> 85-95%</li>
            <li><strong>Images for printing:</strong> 90-100%</li>
            <li><strong>Social media posts:</strong> 80-90%</li>
          </ul>
          <h2>Privacy: 100% Client-Side Processing</h2>
          <p>
            Unlike many online image tools, EasyPDFKit's image compressor processes your files entirely in your browser. We use the HTML5 Canvas API — a built-in browser capability — to compress your images locally. This means your images never leave your device, never touch our servers, and are never visible to us or anyone else. The compression is instantaneous and completely private.
          </p>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/resize-image" className="text-blue-600">Resize Image</a> — Change image dimensions</li>
            <li><a href="/convert-image" className="text-blue-600">Convert Image</a> — Convert to JPG, PNG, or WebP</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce PDF file size</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
