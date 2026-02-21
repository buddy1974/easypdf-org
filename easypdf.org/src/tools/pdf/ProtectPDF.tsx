import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { protectPDF, downloadBlob } from '../../lib/pdfEngine'
import { Download, Eye, EyeOff } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'What does password protection do to a PDF?',
    answer: 'Password protection encrypts the PDF file so that a password must be entered to open it. Without the correct password, the file contents are unreadable. This protects sensitive documents from unauthorized access.',
  },
  {
    question: 'Can I also restrict editing and printing?',
    answer: 'Yes. Standard PDF password protection can set two levels of security: an "open" password to view the file, and a "permissions" password to restrict printing, editing, or copying text. Our tool currently applies document-open password protection.',
  },
  {
    question: 'What happens if I forget the password?',
    answer: 'There is no way to recover a forgotten password without specialized (and often expensive) cracking tools. Always keep your password stored somewhere safe, such as a password manager. We cannot recover passwords for you.',
  },
  {
    question: 'How strong is the PDF encryption?',
    answer: 'Modern PDF password protection uses AES-256 encryption, which is the same standard used by financial institutions and government agencies. A strong password with a mix of letters, numbers, and symbols is effectively impossible to crack with current technology.',
  },
  {
    question: 'Is my PDF secure while being processed?',
    answer: 'Yes. The file is transmitted over HTTPS and processed in an isolated environment on our servers. It is automatically deleted within 1 hour. We never store or share your file or its contents.',
  },
]

export default function ProtectPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleFiles = (files: File[]) => {
    if (files[0]) setFile(files[0])
  }

  const handleProtect = async () => {
    if (!file || !password) return
    setState('processing')
    try {
      const blob = await protectPDF(file, password)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to protect PDF')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) {
      const name = file?.name.replace(/\.pdf$/i, '_protected.pdf') || 'protected.pdf'
      downloadBlob(resultBlob, name)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPassword('')
    setState('idle')
    setResultBlob(null)
    setError('')
  }

  return (
    <>
      <MetaTags
        title="Protect PDF with Password Free Online | EasyPDFKit"
        description="Add password protection to your PDF file online for free. Secure your documents with AES encryption. No signup required."
        canonical="https://easypdfkit.org/protect-pdf"
      />
      <ToolLayout
        title="Protect PDF"
        description="Add a password to your PDF file to prevent unauthorized access. Your document will be encrypted with AES-256."
        breadcrumb="PDF Tools"
        breadcrumbHref="/protect-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-2">Your PDF is now password-protected.</p>
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-6">
              Remember to save your password — we cannot recover it if lost.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Protected PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Protect Another PDF
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
              hint="The PDF will be encrypted with your chosen password"
            />
          ) : (
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
              <button onClick={() => setFile(null)} className="ml-4 text-sm text-red-500 hover:text-red-700">Remove</button>
            </div>
          )}
          {file && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1.5">Use a mix of letters, numbers, and symbols for a strong password.</p>
            </div>
          )}
          <button
            onClick={handleProtect}
            disabled={!file || !password}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Protect PDF
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Password Protect Your PDF?</h2>
          <p>
            Sensitive documents — contracts, financial statements, personal records, confidential reports — should be protected when shared digitally. Adding a password to a PDF ensures that only recipients who know the password can open and view the document. This is essential for compliance with data privacy regulations, protecting confidential business information, and maintaining client trust.
          </p>
          <h2>Choosing a Strong Password</h2>
          <p>
            The security of your protected PDF depends heavily on the strength of your password. A strong PDF password should be at least 12 characters long, include a mix of uppercase and lowercase letters, numbers, and special characters, and avoid dictionary words or easily guessable information like birthdays. Consider using a password manager to generate and securely store strong passwords.
          </p>
          <h2>PDF Encryption Standard</h2>
          <p>
            Our protection tool uses AES-256 encryption, which is a military-grade encryption standard. This means that even with a powerful computer, it would take an astronomically long time to break the encryption by brute force — making your document effectively secure as long as you use a strong password.
          </p>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/unlock-pdf" className="text-blue-600">Unlock PDF</a> — Remove password protection from a PDF</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce file size before sharing</li>
            <li><a href="/merge-pdf" className="text-blue-600">Merge PDF</a> — Combine multiple PDFs</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
