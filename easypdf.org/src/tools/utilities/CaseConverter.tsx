import { useState } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { Copy, Check } from 'lucide-react'

function toTitleCase(text: string): string {
  return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function toSentenceCase(text: string): string {
  return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
}

function toCamelCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^./, c => c.toLowerCase())
}

function toPascalCase(text: string): string {
  const camel = toCamelCase(text)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

function toSnakeCase(text: string): string {
  return text.toLowerCase().replace(/[\s-]+/g, '_').replace(/[^a-z0-9_]/g, '')
}

function toKebabCase(text: string): string {
  return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const conversions: { label: string; fn: (t: string) => string; example: string }[] = [
  { label: 'UPPERCASE', fn: t => t.toUpperCase(), example: 'HELLO WORLD' },
  { label: 'lowercase', fn: t => t.toLowerCase(), example: 'hello world' },
  { label: 'Title Case', fn: toTitleCase, example: 'Hello World' },
  { label: 'Sentence case', fn: toSentenceCase, example: 'Hello world' },
  { label: 'camelCase', fn: toCamelCase, example: 'helloWorld' },
  { label: 'PascalCase', fn: toPascalCase, example: 'HelloWorld' },
  { label: 'snake_case', fn: toSnakeCase, example: 'hello_world' },
  { label: 'kebab-case', fn: toKebabCase, example: 'hello-world' },
]

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [activeCase, setActiveCase] = useState('')
  const [copied, setCopied] = useState(false)

  const applyCase = (label: string, fn: (t: string) => string) => {
    setOutput(fn(input))
    setActiveCase(label)
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
        title="Case Converter | Convert Text Case Free Online | EasyPDFKit"
        description="Convert text to UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, and more. Free online case converter tool."
        canonical="https://easypdfkit.org/case-converter"
      />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Utilities' }, { label: 'Case Converter' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Converter</h1>
        <p className="text-gray-600 mb-8 text-lg">Convert text between different case formats instantly.</p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Input text</label>
            <textarea
              value={input}
              onChange={e => { setInput(e.target.value); if (activeCase) { const conv = conversions.find(c => c.label === activeCase); if (conv) setOutput(conv.fn(e.target.value)) } }}
              placeholder="Type or paste your text here…"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Convert to:</p>
            <div className="flex flex-wrap gap-2">
              {conversions.map(({ label, fn, example }) => (
                <button
                  key={label}
                  onClick={() => applyCase(label, fn)}
                  title={`Example: ${example}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCase === label
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {output && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700">Result ({activeCase})</label>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                rows={5}
                className="w-full px-4 py-3 border border-blue-200 bg-blue-50 rounded-xl resize-y text-gray-800 focus:outline-none"
              />
            </div>
          )}
        </div>
      </main>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>About Text Case Formats</h2>
          <p>Different case formats serve different purposes in writing and programming. Understanding when to use each case helps communicate more clearly and write better code.</p>
          <h2>Case Format Guide</h2>
          <ul>
            <li><strong>UPPERCASE:</strong> Used for acronyms, headings, or emphasis. ALL CAPS.</li>
            <li><strong>lowercase:</strong> All characters in lowercase. Common for URLs and casual writing.</li>
            <li><strong>Title Case:</strong> First Letter Of Each Word Capitalized. Used for titles, headings.</li>
            <li><strong>Sentence case:</strong> Only the first word and proper nouns capitalized. Used for normal sentences.</li>
            <li><strong>camelCase:</strong> No spaces, first word lowercase, subsequent words capitalized. Common in JavaScript variable names.</li>
            <li><strong>PascalCase:</strong> Like camelCase but first word also capitalized. Common for class names in most programming languages.</li>
            <li><strong>snake_case:</strong> Words separated by underscores. Common in Python, Ruby, and database column names.</li>
            <li><strong>kebab-case:</strong> Words separated by hyphens. Common in CSS class names, HTML attributes, and URL slugs.</li>
          </ul>
        </div>
      </div>
    </>
  )
}
