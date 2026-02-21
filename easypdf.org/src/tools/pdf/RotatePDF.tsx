import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { rotatePDF, downloadBlob } from '../../lib/pdfEngine'
import { Download, RotateCw } from 'lucide-react'
import { cn } from '../../lib/utils'

type ToolState = 'idle' | 'processing' | 'success' | 'error'
type Degrees = 90 | 180 | 270

const rotationOptions: { value: Degrees; label: string; desc: string }[] = [
  { value: 90, label: '90° Clockwise', desc: 'Rotate right' },
  { value: 180, label: '180°', desc: 'Flip upside down' },
  { value: 270, label: '270° Clockwise', desc: 'Rotate left' },
]

const faqs = [
  {
    question: 'Does rotating affect all pages in the PDF?',
    answer: 'Yes. By default, rotation is applied to all pages in the document. If you need to rotate only specific pages, you would need to split the PDF first, rotate the relevant pages, and then merge them back together.',
  },
  {
    question: 'Is rotation permanent?',
    answer: 'The rotation is saved into the PDF file\'s page properties, so the pages will appear rotated in all PDF viewers. However, since PDF rotation is stored as metadata (not by rasterizing the content), the quality is not affected and the change can technically be reversed.',
  },
  {
    question: 'Why are my PDF pages displayed sideways?',
    answer: 'This commonly happens when a PDF is created from a scanned document that was placed in the wrong orientation, or when combining PDFs from different sources with different page orientations. Our rotation tool quickly fixes this.',
  },
  {
    question: 'Does rotation affect the file quality?',
    answer: 'No. PDF rotation is a lossless operation. The content of the pages is not re-rendered or re-encoded — only the rotation metadata of the pages is changed.',
  },
  {
    question: 'Can I rotate a password-protected PDF?',
    answer: 'No. You need to unlock a password-protected PDF first using our Unlock PDF tool before you can rotate it.',
  },
]

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null)
  const [degrees, setDegrees] = useState<Degrees>(90)
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleFiles = (files: File[]) => {
    if (files[0]) setFile(files[0])
  }

  const handleRotate = async () => {
    if (!file) return
    setState('processing')
    try {
      const blob = await rotatePDF(file, degrees)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rotate PDF')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) {
      const name = file?.name.replace(/\.pdf$/i, '_rotated.pdf') || 'rotated.pdf'
      downloadBlob(resultBlob, name)
    }
  }

  const handleReset = () => {
    setFile(null)
    setState('idle')
    setResultBlob(null)
    setError('')
  }

  return (
    <>
      <MetaTags
        title="Rotate PDF Pages Online Free | EasyPDFKit"
        description="Rotate PDF pages online for free. Rotate all pages 90, 180, or 270 degrees. Fix page orientation instantly. No signup required."
        canonical="https://easypdfkit.org/rotate-pdf"
      />
      <ToolLayout
        title="Rotate PDF"
        description="Fix the orientation of your PDF pages by rotating them 90°, 180°, or 270°."
        breadcrumb="PDF Tools"
        breadcrumbHref="/rotate-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your PDF has been rotated successfully.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Rotated PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Rotate Another PDF
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {!file ? (
            <UploadZone
              accept=".pdf,application/pdf"
              onFiles={handleFiles}
              label="Click or drag a PDF file here"
              hint="All pages in the PDF will be rotated"
            />
          ) : (
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
              <button onClick={() => setFile(null)} className="ml-4 text-sm text-red-500 hover:text-red-700">Remove</button>
            </div>
          )}
          {file && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Select rotation angle:</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {rotationOptions.map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => setDegrees(value)}
                    className={cn(
                      'border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all',
                      degrees === value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <RotateCw
                      size={24}
                      className={degrees === value ? 'text-blue-600' : 'text-gray-400'}
                      style={{ transform: `rotate(${value - 90}deg)` }}
                    />
                    <p className={cn('font-semibold text-sm', degrees === value ? 'text-blue-700' : 'text-gray-900')}>{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleRotate}
            disabled={!file}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Rotate PDF
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why PDF Pages Need Rotation</h2>
          <p>
            PDF rotation issues are surprisingly common. They typically occur when scanning documents in the wrong orientation, when combining PDFs from multiple sources with different page orientations, or when a PDF is generated from software that applies an incorrect rotation. Our rotation tool provides a quick fix that takes seconds.
          </p>
          <h2>Understanding PDF Rotation</h2>
          <p>
            PDF rotation is stored as a metadata property on each page — not as a physical transformation of the content. This means rotation is lossless and instantaneous. When you rotate a PDF 90°, the content is not re-rendered; the page's rotation property is simply updated. This preserves all content quality and produces a minimal change in file size.
          </p>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/merge-pdf" className="text-blue-600">Merge PDF</a> — Combine PDFs after fixing orientation</li>
            <li><a href="/split-pdf" className="text-blue-600">Split PDF</a> — Extract specific pages</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce file size</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
