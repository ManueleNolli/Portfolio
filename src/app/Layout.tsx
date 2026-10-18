import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Header from '@/components/layout/Header'
import ErrorFallback from '@/components/ui/ErrorFallback'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header />
      <main>
        {/* outside the header so it stays usable, reset on navigation so another page can render */}
        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }) => <ErrorFallback error={error} reset={resetErrorBoundary} />}
          resetKeys={[pathname]}
        >
          <Outlet />
        </ErrorBoundary>
      </main>
      {/* new pages start at the top (or at their #hash), back/forward restores the previous position.
          Kept after the page: its layout effect must run once the page has set up its own layout (e.g. the GSAP pinned journey) */}
      <ScrollRestoration />
    </>
  )
}
