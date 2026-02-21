import { MetaTags } from '../components/MetaTags'
import { Breadcrumb } from '../components/Breadcrumb'
import { Shield, Zap, Globe, Heart } from 'lucide-react'

export default function About() {
  return (
    <>
      <MetaTags
        title="About EasyPDFKit — Free PDF & Image Tools"
        description="Learn about EasyPDFKit's mission to provide free, secure, and easy-to-use PDF and image tools online. No signup required, no watermarks, 100% private."
        canonical="https://easypdfkit.org/about"
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb crumbs={[{ label: 'About' }]} />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">About EasyPDFKit</h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          We believe that powerful document and image tools should be free, fast, and accessible to everyone — no matter where you are or what device you use.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EasyPDFKit was founded with a simple goal: to make professional-grade PDF and image tools available to everyone for free. Too often, people find themselves stuck needing to convert, compress, merge, or protect a file — only to discover that all the available tools require expensive subscriptions, force you to sign up for an account, or slap watermarks all over your documents.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We think that's wrong. Documents are fundamental to how we work, study, and communicate. The ability to convert a PDF, compress an image, or merge files shouldn't cost money or require giving away your personal information. That's why EasyPDFKit offers every tool completely free, with no account required.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From students preparing reports to small business owners handling invoices, from freelancers sharing portfolio pieces to families sharing photos — we built EasyPDFKit for real people with real needs. Our tools are designed to be simple enough for anyone to use, yet powerful enough to handle professional workflows.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="text-blue-600" size={24} />
                <h3 className="font-bold text-gray-900 text-lg">Privacy First</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Your files are your business. We never store your documents permanently, never share them with third parties, and never analyze the content of your files for advertising purposes. Files are processed and immediately deleted from our servers.
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="text-green-600" size={24} />
                <h3 className="font-bold text-gray-900 text-lg">Speed & Reliability</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We engineer our tools to be fast. Image conversions happen entirely in your browser — no upload needed at all. PDF tools use optimized server-side processing with enterprise-grade infrastructure to deliver results in seconds, not minutes.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="text-purple-600" size={24} />
                <h3 className="font-bold text-gray-900 text-lg">Accessibility</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our tools work on any device — desktop, tablet, or smartphone — without installing any software. We support all major browsers and build with accessibility in mind so that everyone can use our platform effectively.
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="text-orange-600" size={24} />
                <h3 className="font-bold text-gray-900 text-lg">Always Free</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We believe in keeping the core tools free forever. We sustain EasyPDFKit through non-intrusive advertising and optional premium features for power users — never by paywalling the essential tools that people depend on.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Our Tools Work</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EasyPDFKit uses two different approaches depending on the type of tool:
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Client-Side Image Processing</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            All image tools — including compression, resizing, format conversion, and more — run entirely in your browser using the HTML5 Canvas API. This means your image files never leave your device. When you compress a JPG or convert a WebP to PNG, the entire operation happens locally on your computer or phone. This is not only faster but also provides the highest possible level of privacy.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Server-Side PDF Processing</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            PDF operations such as merging, splitting, compression, and format conversion require server-side processing because of the complexity of the PDF format. When you upload a PDF, it is transmitted over an encrypted HTTPS connection to our secure servers, processed immediately, and the result is sent back to you. We automatically delete all files from our servers within one hour of processing — typically much sooner.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our servers are hosted in secure, SOC 2-compliant data centers. We use industry-standard encryption both in transit (TLS 1.3) and at rest. For more details, please read our <a href="/how-we-handle-files" className="text-blue-600 hover:underline">How We Handle Your Files</a> page.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EasyPDFKit started as an internal tool built by a small team of developers who were frustrated with the state of online document tools. Every time we needed to quickly merge a few PDFs or convert an image format, we had to wade through sites loaded with ads, pop-ups demanding signups, and paywalls on basic features.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            So we built something better for ourselves — and then decided to share it with the world. Since launching, we've helped millions of users across more than 150 countries process their documents and images quickly, safely, and for free.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are a small, passionate team dedicated to this mission. We continuously improve our tools based on user feedback and stay up to date with the latest browser capabilities so we can keep moving more processing client-side for maximum privacy.
          </p>
        </section>

        <section className="bg-blue-600 rounded-2xl p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-blue-100 mb-6 text-lg">Try any of our free tools — no signup required.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/merge-pdf" className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Merge PDF</a>
            <a href="/compress-pdf" className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Compress PDF</a>
            <a href="/image-compressor" className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Compress Image</a>
            <a href="/pdf-to-word" className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">PDF to Word</a>
          </div>
        </section>
      </main>
    </>
  )
}
