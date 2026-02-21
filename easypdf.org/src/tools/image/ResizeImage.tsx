import { useState, useEffect } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { resizeImage, formatBytes } from '../../lib/imageEngine'
import { Download, Link, Unlink } from 'lucide-react'

const faqs = [
  {
    question: 'What does "maintain aspect ratio" mean?',
    answer: 'Aspect ratio is the proportional relationship between an image\'s width and height. Maintaining it means the image will not be distorted — if you change the width, the height automatically adjusts to keep the same proportions.',
  },
  {
    question: 'Can I make an image larger (upscale)?',
    answer: 'Yes, you can enter dimensions larger than the original. However, upscaling a raster image will reduce sharpness since the computer has to invent pixels. For significant upscaling, a dedicated AI upscaling tool produces better results.',
  },
  {
    question: 'Will resizing affect image quality?',
    answer: 'Resizing to a smaller size is generally a clean operation. Resizing to a larger size (upscaling) will make the image appear soft or pixelated. Our tool uses bilinear interpolation for smooth downscaling.',
  },
  {
    question: 'Is there a maximum size I can resize to?',
    answer: 'There is no hard limit in our tool, but very large dimensions (e.g., 10,000 x 10,000 pixels) will require significant browser memory and may slow down your device. Practical limits depend on your device\'s available RAM.',
  },
  {
    question: 'Does the tool preserve the original image format?',
    answer: 'The resized image is saved in the same format as the original (JPG stays JPG, PNG stays PNG). If you need to change format while resizing, use our Convert Image tool.',
  },
]

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null)
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 })
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [lockAspect, setLockAspect] = useState(true)
  const [result, setResult] = useState<{ url: string; convertedSize: number; filename: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = (files: File[]) => {
    const f = files[0]
    if (!f) return
    setFile(f)
    setResult(null)
    setError('')
    const img = new Image()
    img.onload = () => {
      setOriginalSize({ w: img.width, h: img.height })
      setWidth(String(img.width))
      setHeight(String(img.height))
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(f)
  }

  const handleWidthChange = (v: string) => {
    setWidth(v)
    if (lockAspect && originalSize.w > 0 && v) {
      const w = parseInt(v)
      if (!isNaN(w)) setHeight(String(Math.round((w * originalSize.h) / originalSize.w)))
    }
  }

  const handleHeightChange = (v: string) => {
    setHeight(v)
    if (lockAspect && originalSize.h > 0 && v) {
      const h = parseInt(v)
      if (!isNaN(h)) setWidth(String(Math.round((h * originalSize.w) / originalSize.h)))
    }
  }

  const handleResize = async () => {
    if (!file || !width || !height) return
    setLoading(true)
    setError('')
    try {
      const res = await resizeImage(file, parseInt(width), parseInt(height))
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Resize failed')
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

  useEffect(() => { /* reset result on parameter change */ setResult(null) }, [width, height])

  return (
    <>
      <MetaTags
        title="Resize Image Online Free | EasyPDFKit"
        description="Resize images online for free. Change image dimensions with optional aspect ratio lock. 100% client-side — files never leave your browser."
        canonical="https://easypdfkit.org/resize-image"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'Resize Image' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resize Image</h1>
        <p className="text-gray-600 mb-8 text-lg">Change the dimensions of your image. Lock aspect ratio to prevent distortion.</p>

        <div className="space-y-5">
          <UploadZone
            accept="image/*"
            onFiles={handleFiles}
            label="Click or drag an image here"
            hint="Supports JPG, PNG, WebP"
          />

          {file && originalSize.w > 0 && (
            <>
              <p className="text-sm text-gray-500">Original size: {originalSize.w} × {originalSize.h} px ({formatBytes(file.size)})</p>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
                  <input
                    type="number"
                    min={1}
                    value={width}
                    onChange={e => handleWidthChange(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => setLockAspect(v => !v)}
                  className={`mt-5 p-2.5 rounded-lg border-2 transition-colors ${lockAspect ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-400'}`}
                  title={lockAspect ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                >
                  {lockAspect ? <Link size={18} /> : <Unlink size={18} />}
                </button>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (px)</label>
                  <input
                    type="number"
                    min={1}
                    value={height}
                    onChange={e => handleHeightChange(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleResize}
                disabled={loading || !width || !height}
                className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resizing…' : 'Resize Image'}
              </button>
            </>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
          )}

          {result && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{width} × {height} px</p>
                <p className="text-sm text-gray-500">{formatBytes(result.convertedSize)}</p>
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Resize Images?</h2>
          <p>
            Images need to be resized for many reasons: website optimization (oversized images slow page load), social media platforms have specific dimension requirements, email attachments need to be within size limits, and physical prints require specific pixel dimensions. Our free image resizer makes it easy to get the exact dimensions you need.
          </p>
          <h2>Understanding Aspect Ratio</h2>
          <p>
            The aspect ratio is the proportional relationship between an image's width and height. A 1920 × 1080 pixel image has a 16:9 aspect ratio. When you resize while maintaining the aspect ratio, the proportions stay the same — the image scales uniformly. If you unlock the aspect ratio, you can set width and height independently, which may distort the image if the proportions change significantly.
          </p>
          <h2>Common Image Sizes by Platform</h2>
          <ul>
            <li><strong>Facebook profile picture:</strong> 170 × 170 px</li>
            <li><strong>Twitter/X profile picture:</strong> 400 × 400 px</li>
            <li><strong>Instagram post:</strong> 1080 × 1080 px (square)</li>
            <li><strong>LinkedIn profile picture:</strong> 400 × 400 px</li>
            <li><strong>YouTube thumbnail:</strong> 1280 × 720 px</li>
            <li><strong>Standard HD wallpaper:</strong> 1920 × 1080 px</li>
          </ul>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Reduce file size without changing dimensions</li>
            <li><a href="/convert-image" className="text-blue-600">Convert Image</a> — Change image format</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
