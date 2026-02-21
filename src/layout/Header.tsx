import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FileText, Menu, X, ChevronDown } from 'lucide-react'

const pdfLinks = [
  { to: '/pdf-to-word', label: 'PDF to Word' },
  { to: '/word-to-pdf', label: 'Word to PDF' },
  { to: '/merge-pdf', label: 'Merge PDF' },
  { to: '/split-pdf', label: 'Split PDF' },
  { to: '/compress-pdf', label: 'Compress PDF' },
  { to: '/protect-pdf', label: 'Protect PDF' },
  { to: '/unlock-pdf', label: 'Unlock PDF' },
  { to: '/jpg-to-pdf', label: 'JPG to PDF' },
  { to: '/pdf-to-jpg', label: 'PDF to JPG' },
  { to: '/rotate-pdf', label: 'Rotate PDF' },
]

const imageLinks = [
  { to: '/image-compressor', label: 'Compress Image' },
  { to: '/resize-image', label: 'Resize Image' },
  { to: '/convert-image', label: 'Convert Image' },
  { to: '/jpg-to-png', label: 'JPG to PNG' },
  { to: '/png-to-jpg', label: 'PNG to JPG' },
  { to: '/webp-to-jpg', label: 'WebP to JPG' },
  { to: '/webp-to-png', label: 'WebP to PNG' },
  { to: '/svg-to-png', label: 'SVG to PNG' },
]

function DropdownMenu({ label, links }: { label: string; links: { to: string; label: string }[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors">
        {label} <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute top-full left-0 w-52 bg-white shadow-lg border border-gray-100 rounded-lg py-1 z-50">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <FileText size={24} />
          EasyPDFKit
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu label="PDF Tools" links={pdfLinks} />
          <DropdownMenu label="Image Tools" links={imageLinks} />
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600 font-medium transition-colors'
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600 font-medium transition-colors'
            }
          >
            About
          </NavLink>
        </nav>
        <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <p className="text-xs uppercase text-gray-400 font-semibold tracking-wide">PDF Tools</p>
          {pdfLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 text-gray-700 hover:text-blue-600"
            >
              {l.label}
            </Link>
          ))}
          <p className="text-xs uppercase text-gray-400 font-semibold tracking-wide pt-2">Image Tools</p>
          {imageLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 text-gray-700 hover:text-blue-600"
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t pt-3">
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="block py-1.5 text-gray-700 hover:text-blue-600">Blog</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-1.5 text-gray-700 hover:text-blue-600">About</Link>
          </div>
        </div>
      )}
    </header>
  )
}
