import { useState } from 'react'
import { MetaTags } from '../components/MetaTags'
import { Breadcrumb } from '../components/Breadcrumb'
import { Mail, MessageSquare, Clock } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API endpoint
    setSubmitted(true)
  }

  return (
    <>
      <MetaTags
        title="Contact Us | EasyPDFKit"
        description="Get in touch with the EasyPDFKit team. We're here to help with questions, feedback, and support requests."
        canonical="https://easypdfkit.org/contact"
      />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Breadcrumb crumbs={[{ label: 'Contact' }]} />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12">
          Have a question, feedback, or need help? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="text-blue-600" size={22} />
                <h3 className="font-bold text-gray-900">Email Support</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                For general inquiries and support questions, email us at:
              </p>
              <a href="mailto:support@easypdfkit.org" className="text-blue-600 font-medium text-sm mt-2 block hover:underline">
                support@easypdfkit.org
              </a>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="text-green-600" size={22} />
                <h3 className="font-bold text-gray-900">Business Inquiries</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                For partnerships, API access, or business inquiries:
              </p>
              <a href="mailto:business@easypdfkit.org" className="text-green-600 font-medium text-sm mt-2 block hover:underline">
                business@easypdfkit.org
              </a>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="text-orange-600" size={22} />
                <h3 className="font-bold text-gray-900">Response Time</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                We typically respond to all inquiries within 24-48 hours on business days. For urgent technical issues, please include details about the problem you're experiencing.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select a subject…</option>
                    <option value="general">General Question</option>
                    <option value="bug">Report a Bug</option>
                    <option value="feature">Feature Request</option>
                    <option value="business">Business Inquiry</option>
                    <option value="privacy">Privacy / Data Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Please describe your question or issue in detail…"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Fields marked with <span className="text-red-500">*</span> are required.
                </p>

                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
