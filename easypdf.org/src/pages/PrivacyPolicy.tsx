import { MetaTags } from '../components/MetaTags'
import { Breadcrumb } from '../components/Breadcrumb'

export default function PrivacyPolicy() {
  return (
    <>
      <MetaTags
        title="Privacy Policy | EasyPDFKit"
        description="EasyPDFKit's privacy policy. Learn how we handle your files, what data we collect, and how we protect your privacy."
        canonical="https://easypdfkit.org/privacy-policy"
      />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Breadcrumb crumbs={[{ label: 'Privacy Policy' }]} />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: February 1, 2025</p>

        <div className="prose max-w-none">
          <p>
            EasyPDFKit ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your information when you use our website at easypdfkit.org (the "Service").
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Files You Upload</h3>
          <p>
            When you use our PDF tools, you may upload files to our servers for processing. We want to be clear about how these files are handled:
          </p>
          <ul>
            <li>Files are uploaded over an encrypted HTTPS connection.</li>
            <li>Files are used solely to perform the operation you requested (e.g., merging, compressing, converting).</li>
            <li>Files are automatically deleted from our servers within 1 hour of processing, typically within minutes.</li>
            <li>We never analyze the content of your files for advertising or profiling purposes.</li>
            <li>We never share your files with third parties.</li>
          </ul>
          <p>
            For our image tools, processing happens entirely in your browser. Image files never leave your device — they are never uploaded to our servers at all.
          </p>

          <h3>Usage Data</h3>
          <p>
            We automatically collect certain information when you visit our website, including:
          </p>
          <ul>
            <li>Your IP address (used for security and spam prevention, not stored permanently)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages you visit and features you use (in anonymized, aggregated form)</li>
            <li>Date and time of your visit</li>
            <li>Referring website or URL</li>
          </ul>
          <p>
            This data is collected in anonymized, aggregate form and is used solely to improve our Service. We cannot identify individual users from this data.
          </p>

          <h3>Cookies and Tracking</h3>
          <p>
            We use a minimal number of cookies and similar tracking technologies:
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for the Service to function. These include session management and security cookies.</li>
            <li><strong>Analytics cookies:</strong> We use privacy-respecting analytics (such as anonymized Google Analytics) to understand how our tools are used so we can improve them. This data is aggregated and cannot identify you individually.</li>
            <li><strong>Advertising cookies:</strong> We may use non-personally-identifiable advertising to support our free service. These cookies do not access your uploaded files.</li>
          </ul>
          <p>
            You can disable cookies through your browser settings. Note that disabling essential cookies may affect the functionality of our Service.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain our Service</li>
            <li>Process files you upload and deliver results to you</li>
            <li>Monitor and analyze usage patterns to improve our tools</li>
            <li>Detect and prevent fraudulent or abusive use of our Service</li>
            <li>Comply with legal obligations</li>
            <li>Respond to your support requests</li>
          </ul>

          <h2>3. File Handling and Data Retention</h2>
          <p>
            We have designed our system with data minimization as a core principle:
          </p>
          <ul>
            <li>Uploaded PDF files are stored temporarily in isolated, encrypted storage during processing.</li>
            <li>Files are automatically and permanently deleted within 1 hour of the completion of processing.</li>
            <li>We do not create backups of your uploaded files.</li>
            <li>Image processing happens client-side and we never receive your image files at all.</li>
            <li>We do not retain any personally identifiable information from the files you process.</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>
            We may use the following third-party services that have access to limited, non-personal information:
          </p>
          <ul>
            <li><strong>Cloud hosting providers:</strong> Our servers are hosted by reputable cloud providers under strict data processing agreements.</li>
            <li><strong>Analytics:</strong> We use anonymized analytics services to understand site usage.</li>
            <li><strong>Content delivery networks (CDNs):</strong> We use CDNs to deliver our website quickly. These services may log IP addresses in accordance with their own privacy policies.</li>
          </ul>
          <p>
            We do not sell your personal information to any third party. We do not share your files or file content with any third party.
          </p>

          <h2>5. Children's Privacy</h2>
          <p>
            Our Service is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          <ul>
            <li><strong>Right to access:</strong> Request a copy of the personal information we hold about you.</li>
            <li><strong>Right to deletion:</strong> Request that we delete your personal information.</li>
            <li><strong>Right to opt-out:</strong> Opt out of non-essential cookies and tracking.</li>
            <li><strong>Right to correction:</strong> Request correction of inaccurate personal information.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at privacy@easypdfkit.org. We will respond within 30 days.
          </p>

          <h2>7. Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information against unauthorized access, loss, or disclosure. All data transmission is encrypted using TLS 1.3. Our servers are secured with industry-standard security controls. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2>8. International Users</h2>
          <p>
            Our servers are located in the United States and the European Union. If you are accessing our Service from outside these regions, please be aware that your information may be transferred to and processed in these countries. By using our Service, you consent to this transfer.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify users of significant changes by posting a notice on our website. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@easypdfkit.org</li>
            <li>Website: easypdfkit.org/contact</li>
          </ul>
        </div>
      </main>
    </>
  )
}
