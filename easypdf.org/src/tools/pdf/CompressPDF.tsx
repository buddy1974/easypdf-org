import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { compressPDF, downloadBlob } from '../../lib/pdfEngine'
import { Download } from 'lucide-react'
import { cn } from '../../lib/utils'

type CompressionLevel = 'low' | 'medium' | 'high'
type ToolState = 'idle' | 'processing' | 'success' | 'error'

const levels: { value: CompressionLevel; label: string; desc: string }[] = [
  { value: 'low', label: 'Low Compression', desc: 'Best quality, modest size reduction (~20-30%)' },
  { value: 'medium', label: 'Medium Compression', desc: 'Balanced quality and size (~40-60%)' },
  { value: 'high', label: 'High Compression', desc: 'Smallest file, some quality reduction (~60-80%)' },
]

const faqs = [
  {
    question: 'How much can PDF compression reduce file size?',
    answer: 'It depends on the content of the PDF. Image-heavy PDFs can often be reduced by 50-80% or more. PDFs with mostly text see smaller reductions of 10-30%. Our medium compression setting provides a good balance between size and quality for most documents.',
  },
  {
    question: 'Will compression affect the text readability?',
    answer: 'Text in PDFs is stored as vector data and is not affected by compression. Only embedded images may show some quality reduction at high compression levels. For documents with mostly text, all compression levels produce visually identical results.',
  },
  {
    question: 'Which compression level should I choose?',
    answer: 'For most purposes, Medium compression is the best choice — it significantly reduces file size while maintaining good visual quality. Use Low compression if you need to preserve the highest image quality, or High compression when file size is the primary concern (such as email attachments with strict size limits).',
  },
  {
    question: 'Is it safe to compress important documents?',
    answer: 'Always keep a copy of your original document before compressing. While compression does not alter the text or structure of a PDF, it may reduce image quality at higher compression levels. We recommend reviewing the compressed output before discarding the original.',
  },
  {
    question: 'Why might my compressed PDF be the same size?',
    answer: 'Some PDFs are already well-optimized and cannot be compressed much further. PDFs that contain only text or are already compressed may not see significant size reduction. PDFs generated from scanned images or those with many embedded images typically compress the most.',
  },
]

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [level, setLevel] = useState<CompressionLevel>('medium')
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleFiles = (files: File[]) => {
    if (files[0]) setFile(files[0])
  }

  const handleCompress = async () => {
    if (!file) return
    setState('processing')
    try {
      const blob = await compressPDF(file, level)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compress PDF')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) downloadBlob(resultBlob, `compressed_${file?.name || 'output.pdf'}`)
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
        title="Compress PDF Online | Reduce File Size | EasyPDFKit"
        description="Compress PDF files online for free. Reduce PDF file size without losing quality. Choose compression level. No signup required."
        canonical="https://easypdfkit.org/compress-pdf"
      />
      <ToolLayout
        title="Compress PDF"
        description="Reduce your PDF file size while maintaining acceptable quality. Choose your compression level."
        breadcrumb="PDF Tools"
        breadcrumbHref="/compress-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your PDF has been compressed successfully.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Compressed PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Compress Another PDF
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
              hint="Maximum file size: 200 MB"
            />
          ) : (
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
              <span className="text-xs text-gray-400 ml-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              <button onClick={() => setFile(null)} className="ml-4 text-sm text-red-500 hover:text-red-700">Remove</button>
            </div>
          )}

          {file && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Select compression level:</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {levels.map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => setLevel(value)}
                    className={cn(
                      'border-2 rounded-xl p-4 text-left transition-all',
                      level === value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <p className={cn('font-semibold text-sm mb-1', level === value ? 'text-blue-700' : 'text-gray-900')}>{label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleCompress}
            disabled={!file}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Compress PDF
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Compress PDF Files?</h2>
          <p>
            PDF files can quickly grow to significant sizes, especially when they contain high-resolution images, embedded fonts, or multiple pages. Large PDFs create problems: they are slow to upload and download, may exceed email attachment limits, take up significant storage space, and load slowly in web browsers. PDF compression reduces file size while maintaining the essential content and readability of your document.
          </p>

          <h2>How Does PDF Compression Work?</h2>
          <p>
            PDF compression works by applying several optimization techniques to reduce file size:
          </p>
          <ul>
            <li><strong>Image compression:</strong> Embedded images are re-encoded at a lower resolution or with more aggressive compression algorithms. This is typically where the largest size savings come from.</li>
            <li><strong>Font subsetting:</strong> Only the characters actually used in the document are embedded, rather than the full font file.</li>
            <li><strong>Stream compression:</strong> The raw data streams within the PDF structure are compressed more efficiently.</li>
            <li><strong>Duplicate resource removal:</strong> Identical objects (like repeated images) are deduplicated.</li>
            <li><strong>Metadata removal:</strong> Optional metadata that adds to file size without being visible to readers can be stripped.</li>
          </ul>

          <h2>Choosing the Right Compression Level</h2>
          <p>
            Different situations call for different compression levels:
          </p>
          <ul>
            <li><strong>Low compression</strong> is ideal for print-quality documents, high-resolution graphics portfolios, or when the PDF will be used for archiving or professional printing. You'll get some size reduction without any perceptible quality loss.</li>
            <li><strong>Medium compression</strong> is the right choice for most everyday uses — sharing via email, posting on websites, or distributing internally. It provides substantial size reduction while maintaining excellent readability.</li>
            <li><strong>High compression</strong> is best when file size is critical, such as uploading to storage-limited platforms, sharing over slow connections, or when visual quality of images is less important than file size.</li>
          </ul>

          <h2>Security During Compression</h2>
          <p>
            Your PDF files are transmitted using HTTPS encryption and processed on isolated servers. Files are automatically deleted within 1 hour of processing. Learn more about our <a href="/how-we-handle-files" className="text-blue-600">file handling practices</a>.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><a href="/merge-pdf" className="text-blue-600">Merge PDF</a> — Combine multiple PDFs into one</li>
            <li><a href="/split-pdf" className="text-blue-600">Split PDF</a> — Extract specific pages</li>
            <li><a href="/image-compressor" className="text-blue-600">Compress Image</a> — Reduce image file sizes</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
