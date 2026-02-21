import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { pdfToWord, downloadBlob } from '../../lib/pdfEngine'
import { Download } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'Will the Word document match the original PDF layout?',
    answer: 'Our converter preserves the layout as closely as possible, including text formatting, headings, tables, and images. However, complex layouts with multiple columns or heavily styled elements may not convert perfectly, as PDF and Word use fundamentally different formatting models.',
  },
  {
    question: 'Can I convert scanned PDFs to Word?',
    answer: 'Scanned PDFs contain images of text rather than actual text data. Converting them to Word requires OCR (Optical Character Recognition). Our tool includes OCR capabilities for scanned documents, though accuracy depends on the scan quality.',
  },
  {
    question: 'Is my converted Word document editable?',
    answer: 'Yes. The output is a standard .docx file that you can open and edit in Microsoft Word, Google Docs, LibreOffice, or any compatible word processor.',
  },
  {
    question: 'What happens to images in the PDF?',
    answer: 'Images embedded in the PDF are extracted and included in the Word document. They are placed at approximately the same location as in the original PDF.',
  },
  {
    question: 'How long does PDF to Word conversion take?',
    answer: 'Most conversions complete within 30-60 seconds. Larger files, scanned documents requiring OCR, or PDFs with complex formatting may take slightly longer — typically up to 2-3 minutes.',
  },
]

export default function PDFToWord() {
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
      const blob = await pdfToWord(file)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert PDF to Word')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) {
      const name = file?.name.replace(/\.pdf$/i, '.docx') || 'converted.docx'
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
        title="PDF to Word Converter Free Online | EasyPDFKit"
        description="Convert PDF files to editable Word documents online for free. Preserves formatting, tables, and images. No signup required."
        canonical="https://easypdfkit.org/pdf-to-word"
      />
      <ToolLayout
        title="PDF to Word"
        description="Convert your PDF file into an editable Word document (.docx) while preserving formatting."
        breadcrumb="PDF Tools"
        breadcrumbHref="/pdf-to-word"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your PDF has been converted to a Word document.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Word File (.docx)
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
              hint="Supports text PDFs and scanned documents (with OCR)"
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
            Convert to Word
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Converting PDF to Word: What You Need to Know</h2>
          <p>
            Converting a PDF to a Word document is one of the most requested document operations. PDFs are designed for faithful, consistent display — but they are not designed for editing. Word documents, on the other hand, are built for editing and collaboration. When you receive a PDF but need to make changes, convert it to a format for a template, or reuse the content in another document, PDF to Word conversion is the solution.
          </p>

          <h2>How the Conversion Works</h2>
          <p>
            Our PDF to Word converter analyzes the structure of your PDF file to extract and reconstruct its content as a Word document:
          </p>
          <ul>
            <li><strong>Text extraction:</strong> Text is extracted from the PDF with its position, font, size, and styling information.</li>
            <li><strong>Layout reconstruction:</strong> Our engine attempts to reconstruct paragraphs, headings, columns, and text flow.</li>
            <li><strong>Image extraction:</strong> Embedded images are extracted and placed in the Word document at approximately the correct positions.</li>
            <li><strong>Table detection:</strong> Tabular data is detected and converted into proper Word tables.</li>
            <li><strong>OCR for scanned PDFs:</strong> If your PDF is a scan (i.e., it contains images of text rather than actual text), our OCR engine recognizes the text and includes it as editable content.</li>
          </ul>

          <h2>Tips for Best Conversion Results</h2>
          <ul>
            <li>PDFs with clear, well-structured text and simple layouts convert best.</li>
            <li>PDFs created from Word or similar programs typically convert better than scanned documents.</li>
            <li>High-quality scans (300 DPI or higher) produce much better OCR results than low-quality or blurry scans.</li>
            <li>PDFs with complex multi-column layouts may require some manual cleanup after conversion.</li>
          </ul>

          <h2>Privacy and Security</h2>
          <p>
            Your PDF files may contain sensitive business, legal, or personal information. We take this seriously. All uploads use HTTPS encryption, files are processed in isolated environments, and all files are automatically deleted within 1 hour of processing.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><a href="/word-to-pdf" className="text-blue-600">Word to PDF</a> — Convert Word back to PDF</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce PDF file size</li>
            <li><a href="/merge-pdf" className="text-blue-600">Merge PDF</a> — Combine multiple PDFs</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
