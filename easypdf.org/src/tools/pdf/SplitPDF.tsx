import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { splitPDF, downloadBlob } from '../../lib/pdfEngine'
import { Download } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'What page range format should I use?',
    answer: 'Use commas to separate individual pages or ranges. For example: "1-3, 5, 7-9" extracts pages 1, 2, 3, 5, 7, 8, and 9. You can combine single page numbers and ranges freely.',
  },
  {
    question: 'Can I extract every page as a separate file?',
    answer: 'For splitting every page into separate files, specify each page individually (e.g., "1, 2, 3, 4"). The result will be a ZIP file containing each page as its own PDF.',
  },
  {
    question: 'Does splitting reduce the quality of my PDF?',
    answer: 'No. Splitting is a lossless operation. The extracted pages are identical to the original — all fonts, images, and formatting are preserved exactly as they were in the source document.',
  },
  {
    question: 'How do I know how many pages my PDF has?',
    answer: 'Open your PDF in any PDF viewer (Adobe Reader, browser, Preview on Mac) to see the total page count. You can also use our PDF to Word tool to get information about the document.',
  },
  {
    question: 'Is there a limit to how many pages I can extract?',
    answer: 'You can extract any subset of pages from a PDF up to 200 MB in size. There is no specific limit on the number of pages you can extract in a single operation.',
  },
]

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [pages, setPages] = useState('')
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleFiles = (files: File[]) => {
    if (files[0]) setFile(files[0])
  }

  const handleSplit = async () => {
    if (!file || !pages.trim()) return
    setState('processing')
    try {
      const blob = await splitPDF(file, pages)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to split PDF')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) downloadBlob(resultBlob, 'split.pdf')
  }

  const handleReset = () => {
    setFile(null)
    setPages('')
    setState('idle')
    setResultBlob(null)
    setError('')
  }

  return (
    <>
      <MetaTags
        title="Split PDF Online | Extract PDF Pages Free | EasyPDFKit"
        description="Split a PDF file online for free. Extract specific pages or page ranges from any PDF. No signup required. Fast and secure."
        canonical="https://easypdfkit.org/split-pdf"
      />
      <ToolLayout
        title="Split PDF"
        description="Extract specific pages or page ranges from your PDF document."
        breadcrumb="PDF Tools"
        breadcrumbHref="/split-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your pages have been extracted successfully.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Split PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Split Another PDF
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
              hint="Select the PDF you want to split"
            />
          ) : (
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
              <button onClick={() => setFile(null)} className="ml-4 text-sm text-red-500 hover:text-red-700">Remove</button>
            </div>
          )}

          {file && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Page range to extract
              </label>
              <input
                type="text"
                value={pages}
                onChange={e => setPages(e.target.value)}
                placeholder="e.g. 1-3, 5, 7-9"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Use commas to separate pages/ranges. Example: <code className="bg-gray-100 px-1 rounded">1-5, 8, 11-14</code>
              </p>
            </div>
          )}

          <button
            onClick={handleSplit}
            disabled={!file || !pages.trim()}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Split PDF
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>How to Split a PDF File</h2>
          <p>
            Splitting a PDF allows you to extract specific pages or sections from a larger document. This is useful when you need to share only part of a document, extract specific chapters, or break a large report into manageable sections. EasyPDFKit's split tool makes this process effortless — simply upload your PDF, specify the pages you want, and download the result.
          </p>

          <h2>Understanding Page Ranges</h2>
          <p>
            Our tool supports a flexible page range format that lets you specify exactly which pages you want to extract:
          </p>
          <ul>
            <li><strong>Single pages:</strong> Enter a single number to extract one page (e.g., <code>5</code>)</li>
            <li><strong>Page ranges:</strong> Use a hyphen to specify a range (e.g., <code>1-10</code> extracts pages 1 through 10)</li>
            <li><strong>Multiple selections:</strong> Separate selections with commas (e.g., <code>1-3, 7, 10-15</code>)</li>
            <li><strong>Non-consecutive pages:</strong> You can mix ranges and single pages freely (e.g., <code>2, 4, 6, 8-12</code>)</li>
          </ul>

          <h2>Common Use Cases for Splitting PDFs</h2>
          <p>Splitting PDFs is a fundamental document management task with many practical applications:</p>
          <ul>
            <li><strong>Sharing specific chapters:</strong> Extract individual chapters from a large e-book or report to share with colleagues</li>
            <li><strong>Removing sensitive pages:</strong> Extract only the non-confidential sections of a document before sharing</li>
            <li><strong>Creating shorter documents:</strong> Break a 100-page report into logical sections for easier reading and distribution</li>
            <li><strong>Reusing document sections:</strong> Extract pages to reuse in other documents or presentations</li>
            <li><strong>Email attachments:</strong> Many email systems have attachment size limits — splitting a large PDF helps stay within those limits</li>
          </ul>

          <h2>Does Splitting Affect Quality?</h2>
          <p>
            Not at all. PDF splitting is a lossless operation. When we extract pages from your PDF, we take the exact page data from the original file — fonts, images, vector graphics, annotations, and all other content are preserved without any modification or re-encoding. The extracted pages are bit-for-bit identical to the corresponding pages in the original document.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><a href="/merge-pdf" className="text-blue-600">Merge PDF</a> — Combine multiple PDFs into one</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce file size after splitting</li>
            <li><a href="/rotate-pdf" className="text-blue-600">Rotate PDF</a> — Fix page orientation</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
