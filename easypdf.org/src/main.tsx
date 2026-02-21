import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'
import './index.css'

// Eagerly loaded — critical path only
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Lazy: core pages
const About         = lazy(() => import('./pages/About'))
const Contact       = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms         = lazy(() => import('./pages/Terms'))
const FileHandling  = lazy(() => import('./pages/FileHandling'))
const Blog          = lazy(() => import('./pages/Blog'))
const BlogPost      = lazy(() => import('./pages/BlogPost'))

// Lazy: PDF tools
const MergePDF    = lazy(() => import('./tools/pdf/MergePDF'))
const SplitPDF    = lazy(() => import('./tools/pdf/SplitPDF'))
const CompressPDF = lazy(() => import('./tools/pdf/CompressPDF'))
const PDFToWord   = lazy(() => import('./tools/pdf/PDFToWord'))
const WordToPDF   = lazy(() => import('./tools/pdf/WordToPDF'))
const JPGToPDF    = lazy(() => import('./tools/pdf/JPGToPDF'))
const PDFToJPG    = lazy(() => import('./tools/pdf/PDFToJPG'))
const RotatePDF   = lazy(() => import('./tools/pdf/RotatePDF'))
const ProtectPDF  = lazy(() => import('./tools/pdf/ProtectPDF'))
const UnlockPDF   = lazy(() => import('./tools/pdf/UnlockPDF'))

// Lazy: Image tools
const ImageCompressor  = lazy(() => import('./tools/image/ImageCompressor'))
const ResizeImage      = lazy(() => import('./tools/image/ResizeImage'))
const ConvertImage     = lazy(() => import('./tools/image/ConvertImage'))
const WebPToJPG        = lazy(() => import('./tools/image/WebPToJPG'))
const WebPToPNG        = lazy(() => import('./tools/image/WebPToPNG'))
const HEICToJPG        = lazy(() => import('./tools/image/HEICToJPG'))
const SVGToPNG         = lazy(() => import('./tools/image/SVGToPNG'))
const JPGToPNG         = lazy(() => import('./tools/image/JPGToPNG'))
const PNGToJPG         = lazy(() => import('./tools/image/PNGToJPG'))
const BulkImageRenamer = lazy(() => import('./tools/image/BulkImageRenamer'))

// Lazy: Utility tools
const WordCounter     = lazy(() => import('./tools/utilities/WordCounter'))
const CaseConverter   = lazy(() => import('./tools/utilities/CaseConverter'))
const JSONFormatter   = lazy(() => import('./tools/utilities/JSONFormatter'))
const Base64Encoder   = lazy(() => import('./tools/utilities/Base64Encoder'))
const QRCodeGenerator = lazy(() => import('./tools/utilities/QRCodeGenerator'))
const TextToPDF       = lazy(() => import('./tools/utilities/TextToPDF'))
const HTMLToPDF       = lazy(() => import('./tools/utilities/HTMLToPDF'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,                   element: <Home /> },
      { path: 'about',                 element: <About /> },
      { path: 'contact',               element: <Contact /> },
      { path: 'privacy-policy',        element: <PrivacyPolicy /> },
      { path: 'terms',                 element: <Terms /> },
      { path: 'how-we-handle-files',   element: <FileHandling /> },
      { path: 'blog',                  element: <Blog /> },
      { path: 'blog/:slug',            element: <BlogPost /> },

      { path: 'merge-pdf',             element: <MergePDF /> },
      { path: 'split-pdf',             element: <SplitPDF /> },
      { path: 'compress-pdf',          element: <CompressPDF /> },
      { path: 'pdf-to-word',           element: <PDFToWord /> },
      { path: 'word-to-pdf',           element: <WordToPDF /> },
      { path: 'jpg-to-pdf',            element: <JPGToPDF /> },
      { path: 'pdf-to-jpg',            element: <PDFToJPG /> },
      { path: 'rotate-pdf',            element: <RotatePDF /> },
      { path: 'protect-pdf',           element: <ProtectPDF /> },
      { path: 'unlock-pdf',            element: <UnlockPDF /> },

      { path: 'image-compressor',      element: <ImageCompressor /> },
      { path: 'resize-image',          element: <ResizeImage /> },
      { path: 'convert-image',         element: <ConvertImage /> },
      { path: 'webp-to-jpg',           element: <WebPToJPG /> },
      { path: 'webp-to-png',           element: <WebPToPNG /> },
      { path: 'heic-to-jpg',           element: <HEICToJPG /> },
      { path: 'svg-to-png',            element: <SVGToPNG /> },
      { path: 'jpg-to-png',            element: <JPGToPNG /> },
      { path: 'png-to-jpg',            element: <PNGToJPG /> },
      { path: 'bulk-image-renamer',    element: <BulkImageRenamer /> },

      { path: 'word-counter',          element: <WordCounter /> },
      { path: 'case-converter',        element: <CaseConverter /> },
      { path: 'json-formatter',        element: <JSONFormatter /> },
      { path: 'base64-encoder',        element: <Base64Encoder /> },
      { path: 'qr-code-generator',     element: <QRCodeGenerator /> },
      { path: 'text-to-pdf',           element: <TextToPDF /> },
      { path: 'html-to-pdf',           element: <HTMLToPDF /> },

      { path: '*',                     element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
