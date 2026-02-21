import type { ReactNode } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Breadcrumb } from './Breadcrumb'

type State = 'idle' | 'processing' | 'success' | 'error'

interface ToolLayoutProps {
  title: string
  description: string
  breadcrumb: string
  breadcrumbHref: string
  state: State
  errorMessage?: string
  children: ReactNode
  successContent?: ReactNode
}

export function ToolLayout({
  title,
  description,
  breadcrumb,
  breadcrumbHref,
  state,
  errorMessage,
  children,
  successContent,
}: ToolLayoutProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb crumbs={[{ label: breadcrumb, href: breadcrumbHref }, { label: title }]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-8 text-lg">{description}</p>

      {state === 'idle' && children}

      {state === 'processing' && (
        <div className="border-2 border-dashed border-blue-200 rounded-xl p-16 text-center">
          <Loader2 className="mx-auto mb-4 text-blue-500 animate-spin" size={48} />
          <p className="font-semibold text-gray-700 text-lg">Processing your file…</p>
          <p className="text-gray-500 mt-1">This may take a few moments.</p>
        </div>
      )}

      {state === 'success' && (
        <div className="border-2 border-green-200 bg-green-50 rounded-xl p-10 text-center">
          <CheckCircle2 className="mx-auto mb-4 text-green-500" size={48} />
          <p className="font-bold text-gray-900 text-xl mb-2">Done!</p>
          {successContent}
        </div>
      )}

      {state === 'error' && (
        <div className="border-2 border-red-200 bg-red-50 rounded-xl p-10 text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <p className="font-bold text-gray-900 text-lg mb-1">Something went wrong</p>
          <p className="text-gray-600">{errorMessage || 'Please try again.'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </main>
  )
}
