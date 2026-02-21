import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Download } from 'lucide-react'

const SIZES = [150, 200, 300, 400]

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(200)
  const [generated, setGenerated] = useState(false)

  const qrUrl = generated && text
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=png`
    : ''

  const handleGenerate = () => {
    if (text.trim()) setGenerated(true)
  }

  const handleTextChange = (v: string) => {
    setText(v)
    setGenerated(false)
  }

  const handleDownload = async () => {
    if (!qrUrl) return
    try {
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'qrcode.png'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      // fallback: open image in new tab
      window.open(qrUrl, '_blank')
    }
  }

  return (
    <>
      <MetaTags
        title="QR Code Generator Free Online | EasyPDFKit"
        description="Generate QR codes from any text or URL online for free. Choose output size. Download as PNG. No signup required."
        canonical="https://easypdfkit.org/qr-code-generator"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Utilities' }, { label: 'QR Code Generator' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
        <p className="text-gray-600 mb-8 text-lg">Generate QR codes from any text, URL, phone number, or other data. Download as PNG.</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Text or URL</label>
            <textarea
              value={text}
              onChange={e => handleTextChange(e.target.value)}
              placeholder="Enter a URL, phone number, text, or any data…"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Output size</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => { setSize(s); setGenerated(false) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    size === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s}×{s}px
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!text.trim()}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate QR Code
          </button>

          {generated && qrUrl && (
            <div className="border border-green-200 bg-green-50 rounded-xl p-6 flex flex-col items-center gap-4">
              <img
                src={qrUrl}
                alt="Generated QR Code"
                width={size}
                height={size}
                className="border border-gray-200 rounded-lg bg-white p-2"
              />
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download QR Code PNG
              </button>
              <p className="text-xs text-gray-400 text-center max-w-xs">
                QR code rendered via api.qrserver.com. The text you encoded may be visible in the download URL.
              </p>
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>What Are QR Codes?</h2>
          <p>
            QR (Quick Response) codes are two-dimensional barcodes that can store various types of information — URLs, text, phone numbers, Wi-Fi credentials, contact information, and more. Smartphone cameras can scan QR codes instantly, making them an effective way to share information in physical contexts like business cards, flyers, signs, and product packaging.
          </p>
          <h2>What Data Can I Encode in a QR Code?</h2>
          <ul>
            <li><strong>Website URLs:</strong> The most common use. Enter a full URL like <code>https://example.com</code></li>
            <li><strong>Plain text:</strong> Any text up to about 4,000 characters</li>
            <li><strong>Phone numbers:</strong> Enter <code>tel:+11234567890</code></li>
            <li><strong>Email addresses:</strong> Enter <code>mailto:someone@example.com</code></li>
            <li><strong>Wi-Fi credentials:</strong> Use the format <code>WIFI:S:NetworkName;T:WPA;P:Password;;</code></li>
            <li><strong>vCard contact info:</strong> A standard format for sharing contact information</li>
          </ul>
          <h2>QR Code Size Recommendations</h2>
          <ul>
            <li><strong>150×150px:</strong> Website thumbnails, digital displays</li>
            <li><strong>200×200px:</strong> Standard web use, presentations</li>
            <li><strong>300×300px:</strong> Business cards, flyers</li>
            <li><strong>400×400px:</strong> Posters, larger print materials</li>
          </ul>
          <h2>QR Code Best Practices</h2>
          <p>
            Always test your QR code after generating it by scanning it with a smartphone. Ensure the URL is correct and the link works. For print use, ensure the QR code has sufficient contrast — dark modules on a white background. Avoid placing QR codes over busy backgrounds or images that reduce contrast.
          </p>
        </div>
      </div>
    </>
  )
}
