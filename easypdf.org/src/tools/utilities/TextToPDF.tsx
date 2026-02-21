import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { FAQSection } from '../../components/FAQSchema'
import { textToPDF, downloadBlob } from '../../lib/pdfEngine'
import { Download } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'What formatting is applied to the PDF?',
    answer: 'The text is formatted with a standard font (typically Helvetica or Arial), standard margins, and line spacing. Paragraph breaks in the input are preserved as paragraph breaks in the PDF.',
  },
  {
    question: 'Can I add headers and footers?',
    answer: 'Currently, our basic text-to-PDF tool uses a standard layout. The title you enter becomes the document title in the PDF metadata. Advanced formatting options may be available in a future update.',
  },
  {
    question: 'Is there a character limit?',
    answer: 'The tool handles texts up to approximately 500,000 characters (about 80,000 words). For very long documents, Word to PDF conversion using our Word to PDF tool may be more appropriate.',
  },
  {
    question: 'Will my line breaks be preserved?',
    answer: 'Yes. Line breaks and paragraph breaks in your input text are preserved in the PDF output. Each blank line creates a new paragraph.',
  },
]

export default function TextToPDF() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleConvert = async () => {
    if (!text.trim()) return
    setState('processing')
    try {
      const blob = await textToPDF(text, title)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert text to PDF')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) {
      const name = (title ? title.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'document') + '.pdf'
      downloadBlob(resultBlob, name)
    }
  }

  const handleReset = () => {
    setState('idle')
    setResultBlob(null)
    setError('')
  }

  return (
    <>
      <MetaTags
        title="Text to PDF | Convert Plain Text to PDF Free | EasyPDFKit"
        description="Convert plain text to a PDF document online for free. Add a title, paste your text, and download the PDF instantly. No signup required."
        canonical="https://easypdfkit.org/text-to-pdf"
      />
      <ToolLayout
        title="Text to PDF"
        description="Convert plain text into a formatted PDF document. Paste your text, add an optional title, and download."
        breadcrumb="Utilities"
        breadcrumbHref="/text-to-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your text has been converted to a PDF document.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Convert More Text
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Title (optional)</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="My Document"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Text Content</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste or type your text here…"
              rows={14}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">{text.split(/\s+/).filter(Boolean).length} words</p>
          </div>
          <button
            onClick={handleConvert}
            disabled={!text.trim()}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Convert to PDF
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Convert Text to PDF?</h2>
          <p>
            PDF is the universal format for sharing documents. When you have a text document — notes, an article, a report — that you want to share in a consistent, professional format, converting to PDF ensures it looks the same for everyone, regardless of what device or software they use.
          </p>
          <h2>Use Cases for Text to PDF</h2>
          <ul>
            <li>Saving a copy of important text content in a permanent, portable format</li>
            <li>Creating a simple document to share without needing word processing software</li>
            <li>Converting notes, transcripts, or log files to PDF for archiving</li>
            <li>Creating a PDF from text content copied from a website or application</li>
          </ul>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/word-to-pdf" className="text-blue-600">Word to PDF</a> — Convert formatted Word documents to PDF</li>
            <li><a href="/html-to-pdf" className="text-blue-600">HTML to PDF</a> — Convert HTML with styling to PDF</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce the resulting PDF file size</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
