import { Link } from 'react-router-dom'
import { MetaTags } from '../components/MetaTags'
import { Breadcrumb } from '../components/Breadcrumb'
import { getAllPosts } from '../lib/blog'
import { formatDate } from '../lib/utils'
import { Clock, User, Tag } from 'lucide-react'

export default function Blog() {
  const posts = getAllPosts()

  return (
    <>
      <MetaTags
        title="Blog — PDF & Image Tips | EasyPDFKit"
        description="Learn how to work with PDFs and images more effectively. Guides, tutorials, and tips from the EasyPDFKit team."
        canonical="https://easypdfkit.org/blog"
      />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Breadcrumb crumbs={[{ label: 'Blog' }]} />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">EasyPDFKit Blog</h1>
        <p className="text-xl text-gray-600 mb-12">
          Guides, tutorials, and tips for working with PDFs and images effectively.
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime} min read
                      </span>
                    </div>
                    <span>{formatDate(post.date)}</span>
                  </div>
                </div>
                <div className="px-6 pb-5">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Read article &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
