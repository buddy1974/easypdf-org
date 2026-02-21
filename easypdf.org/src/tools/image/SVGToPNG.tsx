import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { formatBytes } from '../../lib/imageEngine'
import { Download } from 'lucide-react'

const faqs = [
  {
    question: 'What output size should I choose?',
    answer: 'Choose a width based on your use case. For web icons: 32-256px. For logos: 500-1000px. For high-resolution printing: 2000-4000px or more. Since SVG is vector-based, you can export at any size without quality loss.',
  },
  {
    question: 'Will the PNG be transparent?',
    answer: 'Yes. SVG to PNG conversion preserves transparency by default. Areas that are transparent in the SVG will be transparent in the PNG output.',
  },
  {
    question: 'Can I convert any SVG file?',
    answer: 'Most standard SVG files convert correctly. SVGs that use external resources (like web fonts loaded via @import) or custom JavaScript may not render exactly as expected in the browser canvas. Simple SVGs with shapes, paths, and gradients convert perfectly.',
  },
  {
    question: 'What is the difference between SVG and PNG?',
    answer: 'SVG is a vector format — it uses mathematical descriptions of shapes that scale perfectly to any size. PNG is a raster format made of pixels. SVG is ideal for logos and icons that need to scale, while PNG is better for complex photos and images that need to be rasterized for email, certain web platforms, or applications that don\'t support SVG.',
  },
  {
    question: 'Is there a file size limit for SVG conversion?',
    answer: 'There is no strict file size limit since conversion happens in your browser. However, very large and complex SVG files may take a moment to render, especially at high output resolutions.',
  },
]

export default function SVGToPNG() {
  const [file, setFile] = useState<File | null>(null)
  const [width, setWidth] = useState(512)
  const [result, setResult] = useState<{ url: string; size: number; filename: string } | null>(null)
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
      const svgText = await file.text()
      const blob = new Blob([svgText], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)

      await new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.naturalHeight / img.naturalWidth || 1
          const height = Math.round(width * aspectRatio)
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0, width, height)
          URL.revokeObjectURL(url)
          canvas.toBlob((pngBlob) => {
            if (!pngBlob) { reject(new Error('Failed to create PNG')); return }
            const filename = file.name.replace(/\.svg$/i, '.png')
            const resultUrl = URL.createObjectURL(pngBlob)
            setResult({ url: resultUrl, size: pngBlob.size, filename })
            resolve()
          }, 'image/png')
        }
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load SVG')) }
        img.src = url
      })
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
        title="SVG to PNG Converter Free Online | EasyPDFKit"
        description="Convert SVG vector files to PNG images online for free. Choose custom output size. Transparent background supported. 100% browser-based."
        canonical="https://easypdfkit.org/svg-to-png"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'SVG to PNG' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SVG to PNG</h1>
        <p className="text-gray-600 mb-8 text-lg">Convert SVG vector graphics to PNG raster images at any size. Transparency preserved.</p>

        <div className="space-y-5">
          <UploadZone
            accept=".svg,image/svg+xml"
            onFiles={handleFiles}
            label="Click or drag an SVG file here"
            hint="The SVG will be rendered to PNG at your chosen width"
          />

          {file && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Output width (px)</label>
                <input
                  type="number"
                  min={16}
                  max={8000}
                  value={width}
                  onChange={e => { setWidth(Number(e.target.value)); setResult(null) }}
                  className="w-48 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Height will be calculated automatically to preserve aspect ratio</p>
              </div>
              <button
                onClick={handleConvert}
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Converting…' : 'Convert to PNG'}
              </button>
            </>
          )}

          {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}

          {result && !loading && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-900 text-sm">{result.filename}</p>
                <p className="text-sm text-gray-500">{width}px wide · {formatBytes(result.size)}</p>
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
          <h2>Why Convert SVG to PNG?</h2>
          <p>
            SVG (Scalable Vector Graphics) is the ideal format for logos, icons, illustrations, and other graphics that need to scale to different sizes without loss of quality. However, there are many situations where you need a rasterized PNG version: emails that don't support SVG, applications that require a static image file, printing services, or social media platforms that don't accept SVG.
          </p>
          <h2>Advantages of the SVG Format</h2>
          <p>
            SVG files are defined using XML markup and describe graphics as geometric shapes, paths, and text. Because they are mathematical descriptions rather than pixel grids, SVG files can be scaled to any size — from a tiny favicon to a billboard — without any quality loss. SVG files are also typically much smaller than equivalent PNG files for simple graphics. For complex illustrations or photographs, however, SVG can become large and impractical, which is where PNG is better.
          </p>
          <h2>Choosing the Right Output Resolution</h2>
          <p>
            Since SVG is vector-based, you can export to any size. For web use, 1x-2x the intended display size is appropriate. For print, aim for at least 300 DPI (dots per inch) — for a 4-inch wide print element, that means at least 1200 pixels wide. Our tool lets you specify any width you need.
          </p>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/convert-image" className="text-blue-600">Convert Image</a> — Convert between JPG, PNG, WebP</li>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Reduce PNG file size after conversion</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
