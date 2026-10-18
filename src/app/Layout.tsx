import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Header from '@/components/layout/Header'
import ErrorFallback from '@/components/ui/ErrorFallback'

export default function Layout() {
  const { pathname } = useLocation()

  // client-side navigation keeps the scroll position, a new page should start from the top
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => <ErrorFallback error={error} reset={resetErrorBoundary} />}>
      <Header />
      <main>
        <Outlet />
      </main>
    </ErrorBoundary>
  )
}
