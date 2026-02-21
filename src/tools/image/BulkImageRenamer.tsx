import { useState, useMemo } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'
import { UploadZone } from '../../components/UploadZone'
import { FAQSection } from '../../components/FAQSchema'
import JSZip from 'jszip'
import { Download, X } from 'lucide-react'

interface RenameOptions {
  prefix: string
  suffix: string
  findText: string
  replaceText: string
  useCounter: boolean
  counterStart: number
  counterPad: number
}

const faqs = [
  {
    question: 'What tokens can I use in the prefix and suffix fields?',
    answer: 'You can use {n} to insert a sequential number and {date} to insert today\'s date (YYYY-MM-DD format). For example, a prefix of "photo_{n}_" with counter enabled will produce photo_001_, photo_002_, etc.',
  },
  {
    question: 'Is my data uploaded anywhere?',
    answer: 'No. All processing happens entirely in your browser. Your files never leave your device. The renamed files are packaged into a ZIP using the JSZip library, which runs locally in your browser.',
  },
  {
    question: 'Does renaming affect the image files themselves?',
    answer: 'No. Only the filenames are changed. The image data, quality, dimensions, and metadata within each file are not modified in any way.',
  },
  {
    question: 'What file formats can I rename?',
    answer: 'You can rename any file type — JPG, PNG, WebP, GIF, HEIC, PDF, or any other format. The tool works with any files, not just images.',
  },
  {
    question: 'How does the sequential counter work?',
    answer: 'When counter is enabled, each file gets a unique number inserted at the {n} position in the filename. The counter starts at the number you specify and increments by 1 for each file. You can set the padding to control how many digits are used (e.g., padding 3 produces 001, 002, 003).',
  },
]

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

function applyRenaming(file: File, index: number, options: RenameOptions): string {
  const today = getToday()
  const ext = file.name.includes('.') ? '.' + file.name.split('.').pop() : ''
  const baseName = file.name.slice(0, file.name.length - ext.length)

  const counter = String(options.counterStart + index).padStart(options.counterPad, '0')

  const applyTokens = (text: string) =>
    text
      .replace(/\{n\}/g, options.useCounter ? counter : String(options.counterStart + index))
      .replace(/\{date\}/g, today)

  let name = baseName
  if (options.findText) {
    name = name.split(options.findText).join(options.replaceText)
  }
  name = applyTokens(options.prefix) + name + applyTokens(options.suffix)
  return name + ext
}

export default function BulkImageRenamer() {
  const [files, setFiles] = useState<File[]>([])
  const [options, setOptions] = useState<RenameOptions>({
    prefix: '',
    suffix: '',
    findText: '',
    replaceText: '',
    useCounter: false,
    counterStart: 1,
    counterPad: 3,
  })
  const [downloading, setDownloading] = useState(false)

  const handleFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const previewNames = useMemo(() => {
    return files.map((file, index) => applyRenaming(file, index, options))
  }, [files, options])

  const handleDownload = async () => {
    if (files.length === 0) return
    setDownloading(true)
    try {
      const zip = new JSZip()
      for (let i = 0; i < files.length; i++) {
        const newName = previewNames[i]
        const arrayBuffer = await files[i].arrayBuffer()
        zip.file(newName, arrayBuffer)
      }
      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = 'renamed_files.zip'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      // ZIP creation failed silently
    }
    setDownloading(false)
  }

  const setOpt = <K extends keyof RenameOptions>(key: K, value: RenameOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <MetaTags
        title="Bulk Image Renamer | Rename Multiple Files Free | EasyPDFKit"
        description="Rename multiple image files at once online for free. Add prefix, suffix, find & replace, sequential numbers. Download as ZIP. 100% browser-based."
        canonical="https://easypdfkit.org/bulk-image-renamer"
      />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Image Tools' }, { label: 'Bulk Image Renamer' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Image Renamer</h1>
        <p className="text-gray-600 mb-8 text-lg">Rename multiple files at once with custom patterns. Download all renamed files as a ZIP archive.</p>

        <div className="space-y-6">
          <UploadZone
            accept="image/*"
            multiple
            onFiles={handleFiles}
            label="Click or drag files here"
            hint="Add as many files as you need. All renaming happens in your browser."
          />

          {/* Options Panel */}
          <div className="border border-gray-200 rounded-xl p-6 space-y-5">
            <h2 className="font-bold text-gray-900 text-lg">Rename Options</h2>
            <p className="text-sm text-gray-500">Use <code className="bg-gray-100 px-1 rounded">{'{n}'}</code> for sequential number and <code className="bg-gray-100 px-1 rounded">{'{date}'}</code> for today's date in any field.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Prefix</label>
                <input
                  type="text"
                  value={options.prefix}
                  onChange={e => setOpt('prefix', e.target.value)}
                  placeholder="e.g. photo_{n}_"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Suffix</label>
                <input
                  type="text"
                  value={options.suffix}
                  onChange={e => setOpt('suffix', e.target.value)}
                  placeholder="e.g. _{date}"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Find text</label>
                <input
                  type="text"
                  value={options.findText}
                  onChange={e => setOpt('findText', e.target.value)}
                  placeholder="Text to find in filename"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Replace with</label>
                <input
                  type="text"
                  value={options.replaceText}
                  onChange={e => setOpt('replaceText', e.target.value)}
                  placeholder="Replacement text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.useCounter}
                  onChange={e => setOpt('useCounter', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium text-gray-700">Sequential numbering</span>
              </label>
              {options.useCounter && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Start at:</label>
                    <input
                      type="number" min={0}
                      value={options.counterStart}
                      onChange={e => setOpt('counterStart', Number(e.target.value))}
                      className="w-20 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Padding digits:</label>
                    <input
                      type="number" min={1} max={10}
                      value={options.counterPad}
                      onChange={e => setOpt('counterPad', Number(e.target.value))}
                      className="w-16 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* File List with Preview */}
          {files.length > 0 && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 grid grid-cols-2 gap-4">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Original Name</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">New Name (Preview)</span>
              </div>
              <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="px-4 py-2.5 grid grid-cols-2 gap-4 items-center group hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 truncate">{file.name}</span>
                      <button onClick={() => removeFile(index)} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-500 flex-shrink-0">
                        <X size={12} />
                      </button>
                    </div>
                    <span className={`text-xs truncate font-medium ${previewNames[index] !== file.name ? 'text-blue-700' : 'text-gray-500'}`}>
                      {previewNames[index]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {files.length > 0 && (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              <Download size={18} />
              {downloading ? 'Creating ZIP…' : `Download ${files.length} Renamed File${files.length !== 1 ? 's' : ''} as ZIP`}
            </button>
          )}
        </div>
      </main>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>Why Bulk Rename Images?</h2>
          <p>
            Organizing large photo collections, preparing images for web publishing, or delivering client assets often requires renaming dozens or hundreds of files. Doing this manually is tedious and error-prone. Our bulk image renamer lets you apply consistent naming patterns to all your files simultaneously, saving you significant time and effort.
          </p>
          <h2>Using Rename Patterns</h2>
          <ul>
            <li><strong>Prefix:</strong> Add text before the original filename. Use <code>{'{n}'}</code> for a counter or <code>{'{date}'}</code> for today's date.</li>
            <li><strong>Suffix:</strong> Add text after the original filename (before the extension).</li>
            <li><strong>Find &amp; Replace:</strong> Replace any text within the original filename with your specified replacement.</li>
            <li><strong>Sequential numbering:</strong> Add auto-incrementing numbers using the <code>{'{n}'}</code> token.</li>
          </ul>
          <h2>Examples</h2>
          <ul>
            <li>Prefix &quot;product_&#123;n&#125;_&quot; &#8594; <code>product_001_filename.jpg</code>, <code>product_002_filename.jpg</code></li>
            <li>Suffix &quot;_&#123;date&#125;&quot; &#8594; <code>filename_2025-02-10.jpg</code></li>
            <li>Find "IMG" Replace "photo" → <code>photo_1234.jpg</code></li>
          </ul>
          <h2>Privacy and Security</h2>
          <p>
            All processing happens entirely in your browser. Your files never leave your device. The renamed files are packaged into a ZIP archive using the JSZip library running locally in your browser. We never see, store, or transmit your files.
          </p>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  )
}
