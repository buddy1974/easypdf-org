import { useEffect } from 'react'

interface FAQ {
  question: string
  answer: string
}

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    }
    const existing = document.querySelector('script[data-schema="faq"]')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-schema', 'faq')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => { script.remove() }
  }, [faqs])
  return null
}

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="mt-12">
      <FAQSchema faqs={faqs} />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="border border-gray-200 rounded-lg overflow-hidden">
            <summary className="px-6 py-4 font-semibold text-gray-800 cursor-pointer hover:bg-gray-50 select-none">
              {faq.question}
            </summary>
            <div className="px-6 py-4 text-gray-700 border-t border-gray-100 leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
