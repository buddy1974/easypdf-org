import { Link } from 'react-router-dom'
import { MetaTags } from '../components/MetaTags'

export default function NotFound() {
  return (
    <>
      <MetaTags title="404 — Page Not Found | EasyPDFKit" description="The page you are looking for does not exist." />
      <main className="max-w-2xl mx-auto px-4 py-32 text-center">
        <p className="text-7xl font-bold text-blue-600 mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </main>
    </>
  )
}
