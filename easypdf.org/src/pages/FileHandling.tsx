import { MetaTags } from '../components/MetaTags'
import { Breadcrumb } from '../components/Breadcrumb'
import { Lock, Trash2, Shield, Cpu, Server, Eye } from 'lucide-react'

export default function FileHandling() {
  return (
    <>
      <MetaTags
        title="How We Handle Your Files | EasyPDFKit"
        description="Learn exactly how EasyPDFKit handles your uploaded files. We explain our file processing, automatic deletion, encryption, and privacy practices."
        canonical="https://easypdfkit.org/how-we-handle-files"
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb crumbs={[{ label: 'How We Handle Your Files' }]} />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How We Handle Your Files</h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          We take your file security and privacy seriously. Here is a complete, transparent explanation of what happens to your files when you use EasyPDFKit.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Cpu className="text-blue-600" size={24} />
              <h3 className="font-bold text-gray-900 text-lg">Image Tools: 100% Client-Side</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              All image processing — compression, resizing, format conversion — happens entirely in your browser using the HTML5 Canvas API. Your image files <strong>never leave your device</strong>. We never receive them, never store them, and never see them.
            </p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Trash2 className="text-green-600" size={24} />
              <h3 className="font-bold text-gray-900 text-lg">PDF Files: Auto-Deleted in 1 Hour</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              PDF files uploaded for server-side processing are automatically and permanently deleted within 1 hour of processing completion — typically within minutes. No backups are kept. No permanent storage is created.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="text-purple-600" size={24} />
              <h3 className="font-bold text-gray-900 text-lg">Encrypted in Transit</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              All file transfers use HTTPS with TLS 1.3 encryption, the same standard used by banks and financial institutions. Your files cannot be intercepted in transit.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="text-orange-600" size={24} />
              <h3 className="font-bold text-gray-900 text-lg">Never Analyzed or Shared</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              We never read, scan, analyze, or share the content of your files. Our system processes them mechanically to perform the requested operation and nothing else.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Complete File Lifecycle</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">You select your file</h3>
                <p className="text-gray-700 leading-relaxed">
                  You choose a file from your device using our upload interface. For image tools, the file is loaded directly into your browser's memory — the upload process ends right here, and the file never goes anywhere outside your browser.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Encrypted transmission (PDF tools only)</h3>
                <p className="text-gray-700 leading-relaxed">
                  For PDF operations that require server-side processing, your file is sent to our servers using TLS 1.3 encrypted HTTPS. The connection is verified with our SSL certificate, preventing man-in-the-middle attacks. The file is received by our isolated processing server.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Isolated processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your file is processed in an isolated environment. Each file processing job runs in its own containerized process with no access to other users' files. The processing is performed by the relevant engine (e.g., a PDF library for document operations) with the parameters you specified.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Result delivered to you</h3>
                <p className="text-gray-700 leading-relaxed">
                  The processed output file is sent back to your browser over an encrypted connection. You download it directly. The file is placed in a temporary, randomly-named location that is accessible only for the duration of your download session.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">5</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Automatic deletion</h3>
                <p className="text-gray-700 leading-relaxed">
                  Both the input file and the output file are automatically and permanently deleted from our servers. Deletion happens within minutes of processing, and no later than 1 hour after upload. This is enforced by an automated cleanup system that runs continuously. There are no exceptions — we do not keep copies or backups of your files.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Infrastructure Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our infrastructure is built with security as a foundational requirement, not an afterthought:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <span><strong>Isolated storage:</strong> Files are stored in isolated, ephemeral storage volumes that are separate from our application databases and logs. No file content is ever written to persistent, long-term storage.</span>
            </li>
            <li className="flex gap-3">
              <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <span><strong>No content logging:</strong> Our access logs record metadata (file size, operation type, timestamp) but never file names, contents, or any information from within your documents.</span>
            </li>
            <li className="flex gap-3">
              <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <span><strong>Employee access:</strong> Our employees have no ability to access, read, or view the contents of files uploaded to our Service. Access to production systems is strictly controlled and audited.</span>
            </li>
            <li className="flex gap-3">
              <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <span><strong>Secure data centers:</strong> Our servers are hosted in certified data centers with physical security, 24/7 monitoring, and redundant power and connectivity.</span>
            </li>
            <li className="flex gap-3">
              <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <span><strong>Regular security audits:</strong> We conduct regular security assessments and penetration testing to identify and address potential vulnerabilities.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sensitive File Recommendations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            While we go to great lengths to protect your files, we want to help you make informed decisions:
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-3">For Highly Sensitive Documents</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you are processing documents containing highly sensitive information — such as legal documents with privileged communications, documents containing trade secrets, or files with sensitive personal health or financial information — consider the following:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>Use our image tools, which process everything locally in your browser without any server upload</li>
              <li>For PDF operations, consider whether the specific document truly needs to go through an online service, or whether local software would be more appropriate for your security needs</li>
              <li>Be aware that while we delete files promptly, the transmission of files over the internet (even encrypted) carries some inherent risk</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-900 text-white rounded-2xl p-10">
          <div className="flex items-center gap-3 mb-4">
            <Server className="text-blue-400" size={24} />
            <h2 className="text-xl font-bold">Questions About Our Security?</h2>
          </div>
          <p className="text-gray-300 mb-6">
            If you have specific questions about our security practices, data handling, or need information for a compliance review, our team is happy to help.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Our Team
          </a>
        </section>
      </main>
    </>
  )
}
