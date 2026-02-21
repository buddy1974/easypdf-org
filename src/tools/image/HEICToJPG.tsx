import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { convertImage, formatBytes } from '../../lib/imageEngine'
import { Download, AlertTriangle } from 'lucide-react'

const faqs = [
  {
    question: 'Why is HEIC browser support limited?',
    answer: 'HEIC (High Efficiency Image Container) is Apple\'s proprietary format. Native browser decoding of HEIC is not yet universally supported. Modern versions of Safari on Apple devices can decode HEIC, but most other browsers cannot directly read HEIC files.',
  },
  {
    question: 'What should I do if HEIC conversion fails?',
    answer: 'If conversion fails in your browser, you can use Apple\'s built-in conversion: On iPhone, go to Settings > Camera > Formats and choose "Most Compatible" to save future photos as JPG. For existing HEIC files on Mac, open them in Preview and export as JPG using File > Export.',
  },
  {
    question: 'Why do iPhones save photos as HEIC?',
    answer: 'HEIC files are about 50% smaller than JPG at comparable quality. Apple adopted HEIC as the default format for iPhone photos starting with iOS 11 to save storage space on devices. The tradeoff is limited compatibility outside of Apple\'s ecosystem.',
  },
  {
    question: 'What quality is used for the JPG output?',
    answer: 'We use 90% quality for the JPG output, which preserves excellent visual quality while achieving a reasonable file size. This is higher than most HEIC-to-JPG converters use by default.',
  },
  {
    question: 'Will the conversion preserve iPhone metadata (EXIF)?',
    answer: 'Browser-based conversion using the Canvas API strips most EXIF metadata from the output. If preserving metadata (GPS location, camera settings, timestamp) is important, use a desktop application or Apple\'s built-in export tools.',
  },
]

export default function HEICToJPG() {
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
      // Attempt conversion — will fail if browser can't decode HEIC
      const res = await convertImage(f, { format: 'image/jpeg', quality: 0.9 })
      setResult(res)
    } catch {
      setError(
        'Your browser cannot decode HEIC files. HEIC support is currently limited to Safari on Apple devices. ' +
        'See the FAQ below for alternative conversion methods.'
      )
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
        title="HEIC to JPG Converter Free Online | EasyPDFKit"
        description="Convert HEIC images (iPhone photos) to JPG format online for free. Browser-based conversion — files never uploaded. Note: requires Safari or Apple device for full HEIC support."
        canonical="https://easypdfkit.org/heic-to-jpg"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'HEIC to JPG' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HEIC to JPG</h1>
        <p className="text-gray-600 mb-6 text-lg">Convert iPhone HEIC photos to universally compatible JPG format.</p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-amber-800">
            <strong>Browser compatibility note:</strong> HEIC is Apple's proprietary format. Native HEIC decoding works in Safari on Apple devices. On other browsers (Chrome, Firefox, Edge), this tool may not be able to decode HEIC files. If conversion fails, see the FAQ for alternative methods.
          </div>
        </div>

        <div className="space-y-4">
          <UploadZone
            accept=".heic,.heif,image/heic,image/heif,image/*"
            onFiles={handleFiles}
            label="Click or drag a HEIC image here"
            hint="Best supported in Safari on iPhone/Mac"
          />
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 mt-2">Attempting conversion…</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm leading-relaxed">{error}</div>
          )}
          {result && !loading && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-900 text-sm">{result.filename}</p>
                <p className="text-sm text-gray-500">{formatBytes(result.originalSize)} → {formatBytes(result.convertedSize)}</p>
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
          <h2>What Is HEIC Format?</h2>
          <p>
            HEIC (High Efficiency Image Container) is Apple's implementation of the HEIF (High Efficiency Image Format) standard. Introduced with iOS 11, HEIC became the default photo format for iPhone cameras. It uses advanced compression algorithms based on the HEVC video codec to achieve approximately 50% smaller file sizes compared to JPEG, while maintaining equal or better image quality.
          </p>
          <h2>Why HEIC Is Difficult to Use Outside Apple's Ecosystem</h2>
          <p>
            While HEIC is excellent for iPhone storage efficiency, it creates compatibility issues when photos need to be used on Windows PCs, Android devices, Linux systems, or older software. Many web platforms, social media sites, and photo editors either don't support HEIC at all or require plugins or updates to handle it. Converting to JPG solves these compatibility issues entirely.
          </p>
          <h2>Alternative HEIC Conversion Methods</h2>
          <ul>
            <li><strong>iPhone Settings:</strong> Go to Settings → Camera → Formats → "Most Compatible" to save future photos as JPG automatically.</li>
            <li><strong>AirDrop to Mac:</strong> When you AirDrop photos to a Mac, they're often automatically converted to JPG.</li>
            <li><strong>Mac Preview:</strong> Open the HEIC file in Preview, then File → Export → JPEG.</li>
            <li><strong>Windows Photos app:</strong> Windows 10/11 can open HEIC files with the HEIF Image Extensions (free from the Microsoft Store).</li>
          </ul>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/convert-image" className="text-blue-600">Convert Image</a> — Convert between JPG, PNG, WebP</li>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Reduce JPG file size after conversion</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
