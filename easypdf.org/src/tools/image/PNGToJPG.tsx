import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { convertImage, formatBytes } from '../../lib/imageEngine'
import { Download } from 'lucide-react'

const faqs = [
  {
    question: 'What happens to PNG transparency when converting to JPG?',
    answer: 'JPG does not support transparency. Any transparent areas in the PNG will be filled with a white background in the JPG output. If you need to preserve transparency, convert to WebP or keep it as PNG.',
  },
  {
    question: 'How much smaller will the JPG be?',
    answer: 'For photographic images, JPG is typically 5-10x smaller than PNG at equivalent visual quality. For simple graphics with large areas of flat color, the difference may be smaller or even reversed (since PNG compresses these very efficiently).',
  },
  {
    question: 'What quality setting should I use?',
    answer: 'For most web use, 80-85% provides an excellent balance of quality and file size. For professional or print use, 90-95% is recommended. Below 70%, JPEG compression artifacts become noticeable.',
  },
  {
    question: 'Is the conversion done in my browser?',
    answer: 'Yes. PNG to JPG conversion uses the HTML5 Canvas API and happens entirely in your browser. Your image files never leave your device.',
  },
  {
    question: 'Should I convert screenshots from PNG to JPG?',
    answer: 'For screenshots containing text, UI elements, or sharp edges, PNG is usually better — JPG tends to create blurry artifacts around sharp edges. For screenshots of photos or gradients, JPG can save significant file size.',
  },
]

export default function PNGToJPG() {
  const [file, setFile] = useState<File | null>(null)
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
      const res = await convertImage(file, { format: 'image/jpeg', quality })
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
        title="PNG to JPG Converter Free Online | EasyPDFKit"
        description="Convert PNG images to JPG format online for free. Quality slider included. 100% browser-based — files never uploaded. No signup required."
        canonical="https://easypdfkit.org/png-to-jpg"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'PNG to JPG' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PNG to JPG</h1>
        <p className="text-gray-600 mb-8 text-lg">Convert PNG images to JPG for smaller file sizes. Adjust quality to your needs.</p>

        <div className="space-y-5">
          <UploadZone
            accept="image/png,.png,image/*"
            onFiles={handleFiles}
            label="Click or drag a PNG image here"
            hint="Transparent areas will be filled with white in the JPG output"
          />

          {file && (
            <>
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
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Smallest file</span>
                  <span>Best quality</span>
                </div>
              </div>
              <button
                onClick={handleConvert}
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Converting…' : 'Convert to JPG'}
              </button>
            </>
          )}

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

          {result && !loading && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-900 text-sm">{result.filename}</p>
                <p className="text-sm text-gray-500">{formatBytes(result.originalSize)} → {formatBytes(result.convertedSize)}</p>
                {result.convertedSize < result.originalSize && (
                  <p className="text-sm font-semibold text-green-700">
                    {Math.round((1 - result.convertedSize / result.originalSize) * 100)}% smaller
                  </p>
                )}
              </div>
              <button onClick={handleDownload} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Download JPG
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Convert PNG to JPG?</h2>
          <p>
            PNG files are significantly larger than equivalent JPG files because PNG uses lossless compression that preserves every pixel. For photographs and images where minor quality loss is acceptable, converting to JPG can reduce file size by 5-10x or more, which is critical for website performance, email sharing, and storage management.
          </p>
          <h2>When PNG to JPG Makes Sense</h2>
          <ul>
            <li>Web page images where load speed matters</li>
            <li>Social media uploads where large file sizes slow things down</li>
            <li>Email attachments where size is limited</li>
            <li>Cloud storage where you want to maximize available space</li>
            <li>Any situation where the image doesn't need transparency and minor quality loss is acceptable</li>
          </ul>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/jpg-to-png" className="text-blue-600">JPG to PNG</a> — Convert JPG to lossless PNG</li>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Compress without changing format</li>
            <li><a href="/convert-image" className="text-blue-600">Convert Image</a> — Convert to WebP or other formats</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
