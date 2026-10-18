import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Header from '@/components/layout/Header'
import ErrorFallback from '@/components/ui/ErrorFallback'

export default function Layout() {
  return (
    <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => <ErrorFallback error={error} reset={resetErrorBoundary} />}>
      <Header />
      <main>
        <Outlet />
      </main>
    </ErrorBoundary>
  )
}
