import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { MetaTags } from '../components/MetaTags'
import { Breadcrumb } from '../components/Breadcrumb'
import { BreadcrumbSchema } from '../components/BreadcrumbSchema'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import { formatDate } from '../lib/utils'
import { Clock, User, Tag, ArrowLeft } from 'lucide-react'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined
  const relatedPosts = getAllPosts().filter(p => p.slug !== slug).slice(0, 3)

  // Article structured data
  useEffect(() => {
    if (!post) return
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: post.author },
      publisher: { '@type': 'Organization', name: 'EasyPDFKit', url: 'https://easypdfkit.org' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://easypdfkit.org/blog/${post.slug}` },
    }
    const existing = document.querySelector('script[data-schema="article"]')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-schema', 'article')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => { script.remove() }
  }, [post])

  if (!post) {
    return (
      <>
        <MetaTags title="Post Not Found | EasyPDFKit Blog" description="This blog post could not be found." />
        <main className="max-w-2xl mx-auto px-4 py-32 text-center">
          <p className="text-6xl font-bold text-blue-600 mb-4">404</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">This blog post does not exist or may have been moved.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <MetaTags
        title={`${post.title} | EasyPDFKit Blog`}
        description={post.description}
        canonical={`https://easypdfkit.org/blog/${post.slug}`}
      />
      <BreadcrumbSchema crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title, href: `/blog/${post.slug}` }]} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Breadcrumb crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readingTime} min read</span>
          </div>
        </div>

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h2>
            <div className="grid gap-4">
              {relatedPosts.map(related => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <p className="font-semibold text-gray-900 mb-1">{related.title}</p>
                  <p className="text-sm text-gray-500">{related.description}</p>
                  <span className="text-xs text-blue-600 mt-2 inline-block">{related.readingTime} min read</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft size={16} />
            Back to all articles
          </Link>
        </div>
      </main>
    </>
  )
}
