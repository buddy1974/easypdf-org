import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { jpgToPDF, downloadBlob } from '../../lib/pdfEngine'
import { X, Download } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'Can I convert multiple images to a single PDF?',
    answer: 'Yes. You can upload multiple images and they will all be combined into a single PDF, with each image on its own page. The order of images in the PDF matches the order in which you uploaded them.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'We primarily support JPG/JPEG and PNG files. You can also upload WebP images. Each image becomes a separate page in the resulting PDF.',
  },
  {
    question: 'Will image quality be reduced in the PDF?',
    answer: 'We aim to preserve image quality in the conversion. By default, images are embedded at their original resolution. The resulting PDF may be large if your source images are high-resolution.',
  },
  {
    question: 'What page size will the PDF use?',
    answer: 'Each image is fitted to a standard page size (A4 or Letter) while maintaining the aspect ratio. The image is scaled to fill the page while preserving its proportions.',
  },
  {
    question: 'How many images can I convert at once?',
    answer: 'You can upload up to 20 images per conversion. If you have more images, you can create multiple PDFs and then merge them using our Merge PDF tool.',
  },
]

export default function JPGToPDF() {
  const [files, setFiles] = useState<File[]>([])
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleFiles = (newFiles: File[]) => {
    const imgs = newFiles.filter(f => f.type.startsWith('image/'))
    setFiles(prev => [...prev, ...imgs])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleConvert = async () => {
    if (files.length === 0) return
    setState('processing')
    try {
      const blob = await jpgToPDF(files)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert images to PDF')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) downloadBlob(resultBlob, 'images.pdf')
  }

  const handleReset = () => {
    setFiles([])
    setState('idle')
    setResultBlob(null)
    setError('')
  }

  return (
    <>
      <MetaTags
        title="JPG to PDF | Convert Images to PDF Free | EasyPDFKit"
        description="Convert JPG and other images to PDF online for free. Combine multiple images into one PDF. No signup required."
        canonical="https://easypdfkit.org/jpg-to-pdf"
      />
      <ToolLayout
        title="JPG to PDF"
        description="Convert one or multiple images (JPG, PNG, WebP) into a single PDF document."
        breadcrumb="PDF Tools"
        breadcrumbHref="/jpg-to-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your images have been converted to a PDF.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Convert More Images
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <UploadZone
            accept="image/*"
            multiple
            onFiles={handleFiles}
            label="Click or drag image files here"
            hint="Supports JPG, PNG, WebP. Each image becomes a page in the PDF."
          />
          {files.length > 0 && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{files.length} image{files.length !== 1 ? 's' : ''}</span>
                <button onClick={() => setFiles([])} className="text-sm text-red-600 hover:text-red-700">Remove all</button>
              </div>
              <ul className="divide-y divide-gray-100">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center gap-3 px-4 py-3">
                    <span className="text-sm text-gray-600 font-medium flex-1 truncate">{file.name}</span>
                    <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</span>
                    <button onClick={() => removeFile(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleConvert}
            disabled={files.length === 0}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Convert to PDF
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Convert Images to PDF?</h2>
          <p>
            Converting images to PDF is useful in many situations. PDF is universally accepted for document submission, provides a consistent viewing experience across all devices, and allows you to combine multiple images into a single organized file. Whether you need to submit scanned documents, create a photo portfolio, or consolidate a set of image receipts for expense reporting, converting to PDF is often the right solution.
          </p>
          <h2>Combining Multiple Images Into One PDF</h2>
          <p>
            One of the most powerful features of this tool is the ability to convert multiple images into a single PDF with each image on its own page. Simply upload all the images you want to include, and our tool will create a multi-page PDF document. This is perfect for creating digital portfolios, assembling scanned documents, or compiling a series of images into a presentable format.
          </p>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/pdf-to-jpg" className="text-blue-600">PDF to JPG</a> — Extract pages from a PDF as images</li>
            <li><a href="/merge-pdf" className="text-blue-600">Merge PDF</a> — Combine multiple PDFs into one</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce the size of your PDF</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
