import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Copy, Check } from 'lucide-react'

export default function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleEncode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))))
      setMode('encode')
      setError('')
    } catch {
      setError('Encoding failed. Check your input.')
    }
  }

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input.trim()))))
      setMode('decode')
      setError('')
    } catch {
      setError('Invalid Base64 string. Please check your input and try again.')
    }
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <MetaTags
        title="Base64 Encoder & Decoder Free Online | EasyPDFKit"
        description="Encode and decode Base64 strings online for free. Handles UTF-8 text. Instant results in your browser. No signup required."
        canonical="https://easypdfkit.org/base64-encoder"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Utilities' }, { label: 'Base64 Encoder' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Base64 Encoder / Decoder</h1>
        <p className="text-gray-600 mb-8 text-lg">Encode text to Base64 or decode Base64 strings back to plain text. Supports UTF-8 characters.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Input</label>
            <textarea
              value={input}
              onChange={e => { setInput(e.target.value); setOutput(''); setError('') }}
              placeholder="Enter text to encode, or a Base64 string to decode…"
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleEncode}
              disabled={!input.trim()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Encode to Base64
            </button>
            <button
              onClick={handleDecode}
              disabled={!input.trim()}
              className="px-6 py-2.5 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Decode from Base64
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-red-700 text-sm">
              {error}
            </div>
          )}

          {output && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Output ({mode === 'encode' ? 'Base64 encoded' : 'Decoded text'})
                </label>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                rows={8}
                className="w-full px-4 py-3 border border-blue-200 bg-blue-50 rounded-xl font-mono text-sm resize-y focus:outline-none"
              />
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>What Is Base64 Encoding?</h2>
          <p>
            Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 ASCII characters (A-Z, a-z, 0-9, +, /). It is used to encode data that needs to be stored or transmitted in a text-based format. Base64 is particularly common when binary data needs to be embedded in text-based formats like JSON, XML, HTML, or email.
          </p>
          <h2>Common Uses of Base64</h2>
          <ul>
            <li><strong>Email attachments:</strong> MIME encoding uses Base64 to encode binary files for email transmission.</li>
            <li><strong>Data URIs:</strong> Images embedded directly in HTML or CSS as Base64-encoded strings.</li>
            <li><strong>API authentication:</strong> HTTP Basic Auth credentials are Base64-encoded.</li>
            <li><strong>JWT tokens:</strong> JSON Web Tokens use Base64URL encoding for their header and payload sections.</li>
            <li><strong>Storing binary in JSON:</strong> Binary data that needs to be stored in JSON format is often Base64-encoded.</li>
          </ul>
          <h2>Base64 vs Encryption</h2>
          <p>
            Base64 is NOT encryption. It is a simple encoding scheme that any tool can reverse. Do not use Base64 to "secure" sensitive data — it provides zero security. For sensitive data, use proper encryption algorithms like AES.
          </p>
        </div>
      </div>
    </>
  )
}
