import { useState, useMemo } from 'react'
import { MetaTags } from '../../components/MetaTags'
import { Breadcrumb } from '../../components/Breadcrumb'

function countSentences(text: string): number {
  if (!text.trim()) return 0
  return (text.match(/[^.!?]+[.!?]+/g) || []).length || (text.trim() ? 1 : 0)
}

function countParagraphs(text: string): number {
  if (!text.trim()) return 0
  return text.split(/\n\s*\n/).filter(p => p.trim()).length
}

function readingTimeMin(words: number): number {
  return Math.ceil(words / 200)
}

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, '').length
    const sentences = countSentences(text)
    const paragraphs = countParagraphs(text)
    const readTime = readingTimeMin(words)
    return { words, chars, charsNoSpaces, sentences, paragraphs, readTime }
  }, [text])

  return (
    <>
      <MetaTags
        title="Word Counter | Count Words & Characters Free | EasyPDFKit"
        description="Free online word counter. Count words, characters, sentences, paragraphs, and reading time. Instant live stats as you type."
        canonical="https://easypdfkit.org/word-counter"
      />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[{ label: 'Utilities' }, { label: 'Word Counter' }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Word Counter</h1>
        <p className="text-gray-600 mb-8 text-lg">Paste or type your text below to get live word count, character count, reading time, and more.</p>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          rows={12}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 leading-relaxed resize-y font-mono text-sm"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {[
            { label: 'Words', value: stats.words.toLocaleString() },
            { label: 'Characters', value: stats.chars.toLocaleString() },
            { label: 'Chars (no spaces)', value: stats.charsNoSpaces.toLocaleString() },
            { label: 'Sentences', value: stats.sentences.toLocaleString() },
            { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
            { label: 'Reading Time', value: `${stats.readTime} min` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-700 mb-1">{value}</p>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {text && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setText('')}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear text
            </button>
          </div>
        )}
      </main>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose max-w-none">
          <h2>About This Word Counter</h2>
          <p>
            Our word counter tool provides instant, accurate statistics about your text. Whether you're writing an essay, crafting a blog post, drafting a tweet, or checking academic requirements, knowing your word and character counts is essential. This tool updates in real-time as you type, so you always know exactly where you stand.
          </p>
          <h2>What Each Statistic Means</h2>
          <ul>
            <li><strong>Words:</strong> The total number of words, counted by splitting on whitespace.</li>
            <li><strong>Characters:</strong> Every character including spaces, punctuation, and line breaks.</li>
            <li><strong>Characters (no spaces):</strong> Total characters excluding spaces — often required for character-limited platforms like Twitter/X.</li>
            <li><strong>Sentences:</strong> Approximate sentence count based on terminal punctuation (., !, ?).</li>
            <li><strong>Paragraphs:</strong> The number of paragraphs, counted as blocks of text separated by blank lines.</li>
            <li><strong>Reading Time:</strong> Estimated reading time based on an average reading speed of 200 words per minute.</li>
          </ul>
          <h2>Common Word Count Requirements</h2>
          <ul>
            <li><strong>Tweet/X post:</strong> 280 characters</li>
            <li><strong>LinkedIn post:</strong> 3,000 characters</li>
            <li><strong>Blog post (basic):</strong> 500-1,000 words</li>
            <li><strong>SEO-optimized blog post:</strong> 1,500-2,500 words</li>
            <li><strong>Short story:</strong> 1,000-7,500 words</li>
            <li><strong>Novella:</strong> 17,500-40,000 words</li>
            <li><strong>Novel:</strong> 50,000+ words</li>
          </ul>
        </div>
      </div>
    </>
  )
}
