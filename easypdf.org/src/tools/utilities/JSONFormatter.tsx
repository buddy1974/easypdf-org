import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Copy, Check, CheckCircle2, AlertCircle } from 'lucide-react'

type ValidationState = 'idle' | 'valid' | 'invalid'

export default function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [validationState, setValidationState] = useState<ValidationState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setValidationState('valid')
      setErrorMsg('')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Invalid JSON')
      setValidationState('invalid')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setValidationState('valid')
      setErrorMsg('')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Invalid JSON')
      setValidationState('invalid')
    }
  }

  const validate = () => {
    try {
      JSON.parse(input)
      setValidationState('valid')
      setErrorMsg('')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Invalid JSON')
      setValidationState('invalid')
    }
  }

  const handleCopy = async () => {
    const text = output || input
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setInput('')
    setOutput('')
    setValidationState('idle')
    setErrorMsg('')
  }

  return (
    <>
      <MetaTags
        title="JSON Formatter & Validator Free Online | EasyPDFKit"
        description="Format, minify, and validate JSON data online for free. Pretty-print JSON with 2-space indentation. Instant error detection. No signup required."
        canonical="https://easypdfkit.org/json-formatter"
      />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Utilities' }, { label: 'JSON Formatter' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Formatter &amp; Validator</h1>
        <p className="text-gray-600 mb-8 text-lg">Format, minify, and validate JSON data. Instant error detection and clear error messages.</p>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">JSON Input</label>
              <button onClick={handleReset} className="text-sm text-gray-400 hover:text-red-500">Clear</button>
            </div>
            <textarea
              value={input}
              onChange={e => { setInput(e.target.value); setValidationState('idle'); setErrorMsg('') }}
              placeholder='{"key": "value", "array": [1, 2, 3]}'
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={format}
              disabled={!input.trim()}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Format (Pretty Print)
            </button>
            <button
              onClick={minify}
              disabled={!input.trim()}
              className="px-5 py-2.5 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Minify
            </button>
            <button
              onClick={validate}
              disabled={!input.trim()}
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Validate Only
            </button>
          </div>

          {validationState === 'valid' && !errorMsg && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm">
              <CheckCircle2 size={16} />
              Valid JSON
            </div>
          )}

          {validationState === 'invalid' && (
            <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <div>
                <strong>Invalid JSON:</strong> {errorMsg}
              </div>
            </div>
          )}

          {output && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Output</label>
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                rows={14}
                className="w-full px-4 py-3 border border-blue-200 bg-blue-50 rounded-xl font-mono text-sm resize-y focus:outline-none"
              />
            </div>
          )}
        </div>
      </main>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>What Is JSON?</h2>
          <p>
            JSON (JavaScript Object Notation) is the most widely used data interchange format in modern web development. It is human-readable text used to transmit data objects consisting of key-value pairs and arrays. JSON is language-independent and is used by APIs, configuration files, databases, and virtually every modern web application to exchange data.
          </p>
          <h2>Why Format JSON?</h2>
          <p>
            Raw JSON from APIs or minified configuration files is often a single long line of text that is extremely difficult to read. Our formatter adds proper indentation and line breaks to make the structure clear and easy to navigate. Formatted JSON is much easier to debug, review, and understand.
          </p>
          <h2>Why Minify JSON?</h2>
          <p>
            Minified JSON removes all whitespace, making the file as small as possible. This is useful when you need to transmit JSON over a network (smaller payload = faster transfer) or when storing JSON in places where size matters. Production APIs often serve minified JSON for this reason.
          </p>
        </div>
      </div>
    </>
  )
}
