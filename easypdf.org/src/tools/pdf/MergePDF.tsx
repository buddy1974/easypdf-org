import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { mergePDFs, downloadBlob } from '../../lib/pdfEngine'
import { X, GripVertical, Download } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'How many PDF files can I merge at once?',
    answer: 'You can merge up to 20 PDF files at once with EasyPDFKit. For larger batches, you can merge in multiple rounds — merge a group of files first, then merge the results together.',
  },
  {
    question: 'Is the order of files maintained when merging?',
    answer: 'Yes. The merged PDF will contain pages in the exact order you arranged the files. You can reorder files before merging by removing and re-adding them, or we will be adding drag-and-drop reordering soon.',
  },
  {
    question: 'Will merging PDFs reduce quality?',
    answer: 'No. Merging PDFs is a lossless operation. All content, formatting, fonts, images, and links from the original PDFs are preserved exactly in the merged output.',
  },
  {
    question: 'Are my PDF files secure when I upload them?',
    answer: 'Yes. All uploads use HTTPS encryption. Your files are processed on isolated servers and automatically deleted within 1 hour of processing. We never read or share the content of your files.',
  },
  {
    question: 'Can I merge password-protected PDFs?',
    answer: 'To merge password-protected PDFs, you first need to unlock them using our Unlock PDF tool, and then merge the unlocked versions.',
  },
]

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([])
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleFiles = (newFiles: File[]) => {
    const pdfs = newFiles.filter(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'))
    setFiles(prev => [...prev, ...pdfs])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleMerge = async () => {
    if (files.length < 2) return
    setState('processing')
    try {
      const blob = await mergePDFs(files)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to merge PDFs')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) downloadBlob(resultBlob, 'merged.pdf')
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
        title="Merge PDF Files Online Free | EasyPDFKit"
        description="Merge multiple PDF files into one document online for free. No signup required. Fast, secure, and easy to use. Combine PDFs instantly."
        canonical="https://easypdfkit.org/merge-pdf"
      />
      <ToolLayout
        title="Merge PDF"
        description="Combine multiple PDF files into a single document. Fast, free, and secure."
        breadcrumb="PDF Tools"
        breadcrumbHref="/merge-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your PDFs have been merged successfully.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Merged PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Merge More Files
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <UploadZone
            accept=".pdf,application/pdf"
            multiple
            onFiles={handleFiles}
            label="Click or drag PDF files here"
            hint="You can add multiple PDFs. They will be merged in the order shown below."
          />

          {files.length > 0 && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{files.length} file{files.length !== 1 ? 's' : ''} selected</span>
                <button onClick={() => setFiles([])} className="text-sm text-red-600 hover:text-red-700">Remove all</button>
              </div>
              <ul className="divide-y divide-gray-100">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center gap-3 px-4 py-3">
                    <GripVertical size={16} className="text-gray-300 flex-shrink-0" />
                    <span className="text-sm text-gray-600 font-medium flex-1 truncate">{file.name}</span>
                    <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <button onClick={() => removeFile(index)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleMerge}
            disabled={files.length < 2}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {files.length < 2 ? `Add at least ${2 - files.length} more PDF${files.length === 1 ? '' : 's'}` : `Merge ${files.length} PDFs`}
          </button>
        </div>
      </ToolLayout>

      {/* Educational Content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>How to Merge PDF Files Online</h2>
          <p>
            Merging PDF files is one of the most common document tasks in both personal and professional settings. Whether you are combining chapters of a report, consolidating invoices for accounting, or assembling a portfolio, having a reliable tool to merge PDFs is essential. EasyPDFKit's free PDF merger makes this process simple and fast — no software to install, no account to create.
          </p>

          <h2>Why Merge PDF Files?</h2>
          <p>
            There are many scenarios where combining multiple PDFs into a single file is the right approach:
          </p>
          <ul>
            <li><strong>Professional reports:</strong> Combine separate sections, appendices, and cover pages into one cohesive document for clients or management.</li>
            <li><strong>Financial documents:</strong> Consolidate multiple invoices, receipts, or bank statements into a single PDF for accounting or tax purposes.</li>
            <li><strong>Academic submissions:</strong> Many universities and institutions require submissions as a single PDF file, even when your work consists of multiple documents.</li>
            <li><strong>Legal documents:</strong> Attorneys and paralegals frequently need to combine contracts, exhibits, and supporting documents.</li>
            <li><strong>Portfolio creation:</strong> Artists, designers, and photographers can combine multiple pages of work into a single, shareable portfolio PDF.</li>
            <li><strong>Email simplification:</strong> Instead of attaching multiple files to an email, a single merged PDF is cleaner and easier for recipients to handle.</li>
          </ul>

          <h2>What Happens to My Pages When I Merge?</h2>
          <p>
            When you merge PDFs using EasyPDFKit, the pages from each file are combined in the order you specify. If you upload File A (pages 1-5) and File B (pages 1-3), the merged document will have 8 pages: pages 1-5 from File A followed by pages 1-3 from File B. All content is preserved exactly — fonts, images, links, form fields, bookmarks, and formatting are all maintained in the final output.
          </p>

          <h2>Is Merging PDFs Lossless?</h2>
          <p>
            Yes. PDF merging is a lossless operation when done correctly. Our merge tool does not re-encode, re-compress, or modify any content within the PDF pages. We simply combine the page streams from the input files into a single output file. The quality of text, images, and graphics in the original files is perfectly preserved.
          </p>
          <p>
            You may notice that the merged file is slightly smaller than the sum of the individual file sizes in some cases. This is because common resources (such as embedded fonts that appear in multiple files) are deduplicated in the merged output, which is a normal optimization.
          </p>

          <h2>Security and Privacy</h2>
          <p>
            Your PDFs may contain sensitive content — that's why we've built our merge tool with privacy in mind. All file uploads are encrypted using TLS 1.3. Your files are processed in isolated environments on our servers and are automatically and permanently deleted within 1 hour of processing. We never read, analyze, or share the content of your documents.
          </p>
          <p>
            For more information, see our <a href="/how-we-handle-files" className="text-blue-600">How We Handle Your Files</a> page.
          </p>

          <h2>Related Tools</h2>
          <p>
            After merging your PDFs, you might also find these tools useful:
          </p>
          <ul>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce the file size of your merged PDF</li>
            <li><a href="/split-pdf" className="text-blue-600">Split PDF</a> — Extract specific pages from a PDF</li>
            <li><a href="/protect-pdf" className="text-blue-600">Protect PDF</a> — Add password protection to your merged PDF</li>
            <li><a href="/rotate-pdf" className="text-blue-600">Rotate PDF</a> — Fix page orientation issues</li>
          </ul>
        </div>

        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
