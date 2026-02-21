import { Link } from 'react-router-dom'
import { MetaTags } from '../components/MetaTags'
import { FAQSection } from '../components/FAQSchema'
import {
  FileText, Image, Zap, Shield, Star, ArrowRight,
  Scissors, Layers, Lock, Unlock, RotateCw, FileImage,
  Minimize2, RefreshCw, Maximize, FileOutput
} from 'lucide-react'

const pdfTools = [
  { to: '/merge-pdf', icon: Layers, label: 'Merge PDF', desc: 'Combine multiple PDFs into one file' },
  { to: '/split-pdf', icon: Scissors, label: 'Split PDF', desc: 'Extract pages from a PDF document' },
  { to: '/compress-pdf', icon: Minimize2, label: 'Compress PDF', desc: 'Reduce PDF file size efficiently' },
  { to: '/pdf-to-word', icon: FileText, label: 'PDF to Word', desc: 'Convert PDF to editable .docx' },
  { to: '/word-to-pdf', icon: FileOutput, label: 'Word to PDF', desc: 'Convert Word documents to PDF' },
  { to: '/protect-pdf', icon: Lock, label: 'Protect PDF', desc: 'Add password protection to PDF' },
  { to: '/unlock-pdf', icon: Unlock, label: 'Unlock PDF', desc: 'Remove password from PDF' },
  { to: '/rotate-pdf', icon: RotateCw, label: 'Rotate PDF', desc: 'Rotate pages 90°, 180°, or 270°' },
  { to: '/jpg-to-pdf', icon: FileImage, label: 'JPG to PDF', desc: 'Convert images into a PDF file' },
  { to: '/pdf-to-jpg', icon: Image, label: 'PDF to JPG', desc: 'Extract PDF pages as images' },
]

const imageTools = [
  { to: '/image-compressor', icon: Minimize2, label: 'Compress Image', desc: 'Reduce image file size without visible loss' },
  { to: '/resize-image', icon: Maximize, label: 'Resize Image', desc: 'Change image dimensions precisely' },
  { to: '/convert-image', icon: RefreshCw, label: 'Convert Image', desc: 'Convert between JPG, PNG, WebP' },
  { to: '/jpg-to-png', icon: Image, label: 'JPG to PNG', desc: 'Convert JPG files to PNG format' },
  { to: '/png-to-jpg', icon: Image, label: 'PNG to JPG', desc: 'Convert PNG files to JPG format' },
  { to: '/webp-to-jpg', icon: Image, label: 'WebP to JPG', desc: 'Convert WebP images to JPG' },
  { to: '/svg-to-png', icon: Image, label: 'SVG to PNG', desc: 'Convert SVG vectors to PNG raster' },
  { to: '/bulk-image-renamer', icon: FileText, label: 'Bulk Renamer', desc: 'Rename multiple images at once' },
]

const utilityTools = [
  { to: '/word-counter', icon: FileText, label: 'Word Counter', desc: 'Count words, characters, sentences' },
  { to: '/case-converter', icon: RefreshCw, label: 'Case Converter', desc: 'Change text case instantly' },
  { to: '/json-formatter', icon: FileText, label: 'JSON Formatter', desc: 'Format and validate JSON data' },
  { to: '/base64-encoder', icon: FileText, label: 'Base64 Encoder', desc: 'Encode and decode Base64 strings' },
  { to: '/qr-code-generator', icon: Image, label: 'QR Generator', desc: 'Create QR codes from any text or URL' },
  { to: '/text-to-pdf', icon: FileOutput, label: 'Text to PDF', desc: 'Convert plain text to a PDF file' },
]

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Image tools run entirely in your browser for instant results. PDF processing uses optimized server infrastructure for sub-second response times.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
  {
    icon: Shield,
    title: '100% Secure & Private',
    desc: 'All file transfers use TLS 1.3 encryption. PDF files are automatically deleted within 1 hour. Image processing never leaves your browser.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Star,
    title: 'Completely Free',
    desc: 'Every tool is free to use with no hidden fees, no upload limits per day, and no paywalls on core functionality. No credit card required.',
    color: 'text-green-500',
    bg: 'bg-green-50',
  },
  {
    icon: FileText,
    title: 'No Watermarks',
    desc: 'Your output files are clean and professional. We never add watermarks, logos, or any branding to your processed documents or images.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
]

const faqs = [
  {
    question: 'Is EasyPDFKit really free?',
    answer: 'Yes, all core tools are completely free to use. There are no hidden fees, no signup required, and no watermarks added to your files. We sustain the service through non-intrusive advertising.',
  },
  {
    question: 'Are my files safe when I upload them?',
    answer: 'Absolutely. All file transfers use HTTPS encryption (TLS 1.3). PDF files are automatically deleted from our servers within 1 hour of processing. Image tools process files entirely in your browser — they never get uploaded at all.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No. You can use all of our tools without signing up or creating an account. Simply visit the tool page, upload your file, and get your result instantly.',
  },
  {
    question: 'What file size limits apply?',
    answer: 'For PDF tools, we support files up to 200 MB per file. For image tools, since processing happens in your browser, limits depend on your device\'s available memory — most modern devices handle images up to several hundred MB easily.',
  },
  {
    question: 'How does client-side image processing work?',
    answer: 'Our image tools use the HTML5 Canvas API built into modern web browsers. When you select an image, it is loaded into your browser\'s memory, processed using JavaScript and the Canvas API, and the result is provided as a download — all without any network request to our servers.',
  },
  {
    question: 'Can I use EasyPDFKit on my phone?',
    answer: 'Yes! EasyPDFKit is fully responsive and works on smartphones, tablets, and desktop computers. All tools are accessible through any modern mobile browser without needing to install an app.',
  },
]

export default function Home() {
  return (
    <>
      <MetaTags
        title="Free PDF & Image Tools Online | EasyPDFKit"
        description="Free online PDF tools and image converter. Merge, split, compress PDF files. Convert images between formats. No signup required, 100% secure, no watermarks."
        canonical="https://easypdfkit.org"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Shield size={14} />
            No signup required · Files deleted automatically
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Free PDF &amp; Image Tools —{' '}
            <span className="text-blue-200">No Signup Required</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Merge, split, compress, and convert PDF files. Compress, resize, and convert images. All tools are free, fast, secure, and work right in your browser.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#pdf-tools"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Explore PDF Tools
            </a>
            <a
              href="#image-tools"
              className="px-8 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-400 transition-colors border border-blue-400"
            >
              Explore Image Tools
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">

        {/* PDF Tools Section */}
        <section id="pdf-tools" className="py-16">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="text-blue-600" size={28} />
            <h2 className="text-3xl font-bold text-gray-900">PDF Tools</h2>
          </div>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl">
            Professional PDF tools that handle all your document needs. No installation required — just upload and process.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pdfTools.map(({ to, icon: Icon, label, desc }) => (
              <Link
                key={to}
                to={to}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <Icon className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" size={28} />
                <p className="font-semibold text-gray-900 mb-1">{label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Image Tools Section */}
        <section id="image-tools" className="py-8 pb-16 border-t border-gray-100">
          <div className="pt-8">
            <div className="flex items-center gap-3 mb-3">
              <Image className="text-purple-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">Image Tools</h2>
            </div>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl">
              Powerful image processing tools that run 100% in your browser. Your images never leave your device.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageTools.map(({ to, icon: Icon, label, desc }) => (
                <Link
                  key={to}
                  to={to}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all"
                >
                  <Icon className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <p className="font-semibold text-gray-900 mb-1">{label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Utility Tools Section */}
        <section id="utility-tools" className="py-8 pb-16 border-t border-gray-100">
          <div className="pt-8">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="text-green-600" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">Utility Tools</h2>
            </div>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl">
              Handy browser-based utilities for developers, writers, and everyday users.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {utilityTools.map(({ to, icon: Icon, label, desc }) => (
                <Link
                  key={to}
                  to={to}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <Icon className="text-green-600 mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <p className="font-semibold text-gray-900 mb-1">{label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 border-t border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Why Choose EasyPDFKit?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            We built EasyPDFKit because we were tired of online tools that required accounts, added watermarks, charged for basic features, or handled files irresponsibly. Here is what makes us different.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className={`${bg} rounded-xl p-6`}>
                <Icon className={`${color} mb-4`} size={32} />
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 border-t border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto text-lg">
            Processing your files with EasyPDFKit takes just three simple steps.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">Choose Your Tool</h3>
              <p className="text-gray-600 leading-relaxed">
                Select the tool you need from our comprehensive collection of PDF and image processing tools. Each tool is purpose-built for a specific task and optimized for ease of use.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">Upload Your File</h3>
              <p className="text-gray-600 leading-relaxed">
                Drag and drop your file onto the upload zone, or click to browse your device. We support all common file formats and handle the rest automatically with no configuration needed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">Download Result</h3>
              <p className="text-gray-600 leading-relaxed">
                Processing completes in seconds. Your output file is ready to download immediately. Files are automatically cleaned up from our servers — your data is never stored longer than necessary.
              </p>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-16 border-t border-gray-100">
          <div className="bg-gray-900 text-white rounded-2xl p-10 md:p-14">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-blue-400" size={32} />
                <h2 className="text-2xl font-bold">Your Security Is Our Priority</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                We understand that the files you process may contain sensitive personal, financial, or business information. That's why we've engineered EasyPDFKit with security at its core, not as an afterthought.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'TLS 1.3 encryption for all file transfers',
                  'PDF files deleted within 1 hour automatically',
                  'Image processing runs entirely in your browser',
                  'No file content is ever logged or analyzed',
                  'Files processed in isolated containers',
                  'No employee access to uploaded files',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/how-we-handle-files"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
              >
                Learn more about how we handle your files
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 border-t border-gray-100">
          <FAQSection faqs={faqs} />
        </section>

        {/* Footer CTA */}
        <section className="py-16 border-t border-gray-100 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Join millions of users who trust EasyPDFKit for their document and image processing needs. No account required — start using our tools right now.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/merge-pdf" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Merge PDF
            </Link>
            <Link to="/compress-pdf" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Compress PDF
            </Link>
            <Link to="/image-compressor" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Compress Image
            </Link>
            <Link to="/pdf-to-word" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              PDF to Word
            </Link>
            <Link to="/webp-to-jpg" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              WebP to JPG
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
