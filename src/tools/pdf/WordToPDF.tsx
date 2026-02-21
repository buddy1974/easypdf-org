import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { wordToPDF, downloadBlob } from '../../lib/pdfEngine'
import { Download } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'What Word file formats are supported?',
    answer: 'We support .docx (Word 2007 and newer), .doc (older Word format), and .odt (OpenDocument Text). The .docx format is recommended for best results.',
  },
  {
    question: 'Will my formatting be preserved?',
    answer: 'Yes. Fonts, styles, headers, footers, tables, images, and most formatting are preserved in the PDF output. Complex elements like custom fonts may be substituted if the font is not available on our servers.',
  },
  {
    question: 'Can I convert password-protected Word documents?',
    answer: 'Currently, we cannot process password-protected Word documents. You will need to remove the password protection in Word before uploading.',
  },
  {
    question: 'Will the PDF be searchable?',
    answer: 'Yes. The converted PDF will be fully searchable, as all text is preserved as actual text rather than being converted to an image.',
  },
  {
    question: 'Is there a page limit for the conversion?',
    answer: 'There is no specific page limit, but files must be under 200 MB. Most Word documents, even multi-hundred page ones, are well within this limit.',
  },
]

export default function WordToPDF() {
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
      const blob = await wordToPDF(file)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert Word to PDF')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) {
      const name = file?.name.replace(/\.(docx?|odt)$/i, '.pdf') || 'converted.pdf'
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
        title="Word to PDF Converter Free Online | EasyPDFKit"
        description="Convert Word documents to PDF online for free. Preserves all formatting, fonts, and images. Supports .docx and .doc files. No signup required."
        canonical="https://easypdfkit.org/word-to-pdf"
      />
      <ToolLayout
        title="Word to PDF"
        description="Convert your Word documents (.docx, .doc) into professional PDF files with formatting preserved."
        breadcrumb="PDF Tools"
        breadcrumbHref="/word-to-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your Word document has been converted to PDF.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Convert Another File
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          {!file ? (
            <UploadZone
              accept=".doc,.docx,.odt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onFiles={handleFiles}
              label="Click or drag a Word document here"
              hint="Supports .docx, .doc, and .odt files"
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
            Convert to PDF
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Convert Word Documents to PDF?</h2>
          <p>
            PDF (Portable Document Format) is the universal standard for sharing documents. Unlike Word files, PDFs look the same on every device and operating system — regardless of whether the recipient has Microsoft Word installed, what fonts are on their system, or what version of Word they're using. When you need to share a document that looks exactly as you intended, PDF is the right choice.
          </p>

          <h2>Common Reasons to Convert Word to PDF</h2>
          <ul>
            <li><strong>Professional sharing:</strong> CVs, proposals, contracts, and reports should always be shared as PDF to ensure consistent appearance across all devices.</li>
            <li><strong>Preventing editing:</strong> PDFs are harder to edit than Word documents, making them suitable for documents you want to share without modification.</li>
            <li><strong>Form submissions:</strong> Many institutions, employers, and government agencies require document submissions in PDF format.</li>
            <li><strong>Archiving:</strong> PDFs are excellent for long-term document archiving as they are self-contained — fonts and images are embedded within the file.</li>
            <li><strong>Printing consistency:</strong> A PDF ensures the document prints identically on any printer, without unexpected layout shifts.</li>
          </ul>

          <h2>What Gets Preserved in the Conversion</h2>
          <p>
            Our Word to PDF converter faithfully converts:
          </p>
          <ul>
            <li>All text formatting (bold, italic, underline, font sizes, colors)</li>
            <li>Paragraph styles and headings</li>
            <li>Tables, borders, and cell formatting</li>
            <li>Embedded images and their positions</li>
            <li>Headers and footers</li>
            <li>Page numbers and page breaks</li>
            <li>Lists (bulleted and numbered)</li>
            <li>Hyperlinks</li>
          </ul>

          <h2>Related Tools</h2>
          <ul>
            <li><a href="/pdf-to-word" className="text-blue-600">PDF to Word</a> — Convert PDF back to an editable Word document</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce the size of the converted PDF</li>
            <li><a href="/protect-pdf" className="text-blue-600">Protect PDF</a> — Add password protection to your PDF</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
