import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <FileText size={20} />
            EasyPDFKit
          </div>
          <p className="text-sm leading-relaxed">
            Free online PDF and image tools. No registration. No watermarks. Your files are processed securely.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">PDF Tools</p>
          <ul className="space-y-1.5 text-sm">
            {([
              ['Merge PDF', '/merge-pdf'],
              ['Split PDF', '/split-pdf'],
              ['Compress PDF', '/compress-pdf'],
              ['PDF to Word', '/pdf-to-word'],
              ['Word to PDF', '/word-to-pdf'],
              ['JPG to PDF', '/jpg-to-pdf'],
              ['PDF to JPG', '/pdf-to-jpg'],
            ] as [string, string][]).map(([l, h]) => (
              <li key={h}><Link to={h} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Image Tools</p>
          <ul className="space-y-1.5 text-sm">
            {([
              ['Compress Image', '/image-compressor'],
              ['Resize Image', '/resize-image'],
              ['Convert Image', '/convert-image'],
              ['JPG to PNG', '/jpg-to-png'],
              ['PNG to JPG', '/png-to-jpg'],
              ['WebP to JPG', '/webp-to-jpg'],
              ['SVG to PNG', '/svg-to-png'],
            ] as [string, string][]).map(([l, h]) => (
              <li key={h}><Link to={h} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3">Company</p>
          <ul className="space-y-1.5 text-sm">
            {([
              ['About', '/about'],
              ['Blog', '/blog'],
              ['Contact', '/contact'],
              ['Privacy Policy', '/privacy-policy'],
              ['Terms of Service', '/terms'],
              ['How We Handle Files', '/how-we-handle-files'],
            ] as [string, string][]).map(([l, h]) => (
              <li key={h}><Link to={h} className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        &copy; {year} EasyPDFKit.org &mdash; All rights reserved.
      </div>
    </footer>
  )
}
