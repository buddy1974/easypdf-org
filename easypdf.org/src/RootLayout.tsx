import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" aria-label="Loading page">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
