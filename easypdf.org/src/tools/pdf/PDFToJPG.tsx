import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { pdfToJPG, downloadBlob } from '../../lib/pdfEngine'
import { Download } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'What resolution are the output JPG images?',
    answer: 'By default, pages are rendered at 150 DPI, which produces clear images suitable for most purposes. This balances file size with image quality. Contact us if you need higher resolution output.',
  },
  {
    question: 'Will I get one image per page?',
    answer: 'Yes. Each page of your PDF is converted to a separate JPG image. For a multi-page PDF, you will receive a ZIP file containing all the page images.',
  },
  {
    question: 'What happens to text in the PDF?',
    answer: 'Text is rendered as part of the image — it appears visually as text in the image but is not extractable as editable text. If you need editable text, use our PDF to Word converter instead.',
  },
  {
    question: 'Can I convert password-protected PDFs to images?',
    answer: 'Password-protected PDFs cannot be directly converted. Use our Unlock PDF tool first to remove the password, then convert to JPG.',
  },
  {
    question: 'How large will the output images be?',
    answer: 'Image file sizes depend on the complexity of the PDF content. A typical text-heavy page at 150 DPI produces a JPG of around 100-500 KB. Pages with complex graphics or many colors will produce larger files.',
  },
]

export default function PDFToJPG() {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleFiles = (files: File[]) => {
    if (files[0]) setFile(files[0])
  }

  const handleConvert = async () => {
    if (!file) return
    setState('processing')
    try {
      const blob = await pdfToJPG(file)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert PDF to JPG')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) {
      const name = file?.name.replace(/\.pdf$/i, '_pages.zip') || 'pdf_pages.zip'
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
        title="PDF to JPG | Convert PDF Pages to Images Free | EasyPDFKit"
        description="Convert PDF pages to JPG images online for free. Extract each page as a high-quality image. Download as ZIP. No signup required."
        canonical="https://easypdfkit.org/pdf-to-jpg"
      />
      <ToolLayout
        title="PDF to JPG"
        description="Convert each page of your PDF into a high-quality JPG image. Multi-page PDFs are delivered as a ZIP archive."
        breadcrumb="PDF Tools"
        breadcrumbHref="/pdf-to-jpg"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your PDF pages have been converted to JPG images.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Images (ZIP)
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Convert Another PDF
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
              hint="Multi-page PDFs will produce a ZIP with one image per page"
            />
          ) : (
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
              <button onClick={() => setFile(null)} className="ml-4 text-sm text-red-500 hover:text-red-700">Remove</button>
            </div>
          )}
          <button
            onClick={handleConvert}
            disabled={!file}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Convert to JPG
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>When to Convert PDF to JPG</h2>
          <p>
            There are many practical reasons to convert PDF pages to JPG images. Images are more universally compatible than PDFs for certain use cases — they can be embedded directly into web pages, shared on social media, used in presentations, or inserted into other documents without any PDF viewer dependency. Converting to JPG is also useful when you need to extract specific pages from a PDF as standalone images.
          </p>
          <h2>Understanding the Output Format</h2>
          <p>
            When you convert a multi-page PDF, each page becomes a separate JPG file. For single-page PDFs, you'll receive a single JPG. For multi-page PDFs, you'll receive a ZIP archive containing all page images, named page_1.jpg, page_2.jpg, and so on. The images are rendered at 150 DPI by default, which is suitable for screen display and basic printing. Contact us for higher DPI options for professional print use cases.
          </p>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/jpg-to-pdf" className="text-blue-600">JPG to PDF</a> — Convert images back to PDF</li>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Reduce the size of converted images</li>
            <li><a href="/split-pdf" className="text-blue-600">Split PDF</a> — Extract specific pages as a PDF</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
