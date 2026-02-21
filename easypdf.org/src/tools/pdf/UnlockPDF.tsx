import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { ToolLayout } from '../../components/ToolLayout'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import { unlockPDF, downloadBlob } from '../../lib/pdfEngine'
import { Download, Eye, EyeOff } from 'lucide-react'

type ToolState = 'idle' | 'processing' | 'success' | 'error'

const faqs = [
  {
    question: 'Do I need the original password to unlock a PDF?',
    answer: 'Yes. Our unlock tool requires the correct password to decrypt the PDF. We cannot crack or bypass PDF encryption. You must know the password to unlock the document.',
  },
  {
    question: 'Why would I want to remove a password from a PDF?',
    answer: 'Common reasons include: the PDF is one you own and entering the password repeatedly is inconvenient, you want to process the PDF with other tools that don\'t support password-protected files, or you want to share the document without requiring recipients to enter a password.',
  },
  {
    question: 'Is it legal to unlock a PDF?',
    answer: 'It is legal to unlock a PDF that you own or have permission to unlock. Unlocking PDFs that you do not own or do not have authorization to access may be illegal. Only unlock PDFs you have the right to access.',
  },
  {
    question: 'What if the unlock fails?',
    answer: 'If the unlock fails, it usually means the password you entered is incorrect. Double-check the password and try again. Some PDFs have both an owner password (for restrictions) and a user password (for opening) — make sure you are using the right one.',
  },
  {
    question: 'How is my password handled securely?',
    answer: 'Your password is transmitted over HTTPS and used solely to attempt decryption of your PDF. It is not logged, stored, or shared. The entire process is completed on isolated servers and your files are deleted automatically within 1 hour.',
  },
]

export default function UnlockPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState<ToolState>('idle')
  const [error, setError] = useState('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)

  const handleFiles = (files: File[]) => {
    if (files[0]) setFile(files[0])
  }

  const handleUnlock = async () => {
    if (!file || !password) return
    setState('processing')
    try {
      const blob = await unlockPDF(file, password)
      setResultBlob(blob)
      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlock PDF. Please check the password and try again.')
      setState('error')
    }
  }

  const handleDownload = () => {
    if (resultBlob) {
      const name = file?.name.replace(/\.pdf$/i, '_unlocked.pdf') || 'unlocked.pdf'
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
        title="Unlock PDF | Remove PDF Password Free | EasyPDFKit"
        description="Remove the password from a PDF file online for free. Decrypt and unlock password-protected PDFs instantly. No signup required."
        canonical="https://easypdfkit.org/unlock-pdf"
      />
      <ToolLayout
        title="Unlock PDF"
        description="Remove the password from a protected PDF file. You must know the current password to unlock the document."
        breadcrumb="PDF Tools"
        breadcrumbHref="/unlock-pdf"
        state={state}
        errorMessage={error}
        successContent={
          <div>
            <p className="text-gray-600 mb-6">Your PDF has been unlocked successfully. The password has been removed.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download Unlocked PDF
              </button>
              <button onClick={handleReset} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Unlock Another PDF
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
              label="Click or drag your protected PDF here"
              hint="You will need to enter the correct password to unlock it"
            />
          ) : (
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
              <button onClick={() => setFile(null)} className="ml-4 text-sm text-red-500 hover:text-red-700">Remove</button>
            </div>
          )}
          {file && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter the PDF password"
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
            </div>
          )}
          <button
            onClick={handleUnlock}
            disabled={!file || !password}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Unlock PDF
          </button>
        </div>
      </ToolLayout>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>When Do You Need to Unlock a PDF?</h2>
          <p>
            Password-protected PDFs are common in business and legal settings. However, there are many legitimate reasons you might need to remove the password protection. Perhaps you are the document owner and find it cumbersome to enter the password every time you open the file. Perhaps you need to merge the PDF with others, and the merge tool doesn't support password-protected files. Or you want to allow others to access the document without needing a password.
          </p>
          <h2>What the Unlock Tool Does</h2>
          <p>
            Our unlock tool decrypts the PDF using the password you provide, then saves the result as a new PDF without any password protection or encryption. The content of the document is completely preserved — text, images, formatting, and all other elements remain exactly as they were in the original.
          </p>
          <h2>Legal and Ethical Use</h2>
          <p>
            Please only use this tool on PDFs you own or have authorization to modify. Removing password protection from a PDF you don't own or don't have permission to access may be illegal under computer fraud and copyright laws in your jurisdiction. By using this tool, you confirm you have the right to modify the document.
          </p>
          <h2>Related Tools</h2>
          <ul>
            <li><a href="/protect-pdf" className="text-blue-600">Protect PDF</a> — Add a new password to a PDF</li>
            <li><a href="/merge-pdf" className="text-blue-600">Merge PDF</a> — Combine multiple PDFs (requires unlocked files)</li>
            <li><a href="/compress-pdf" className="text-blue-600">Compress PDF</a> — Reduce file size after unlocking</li>
          </ul>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
