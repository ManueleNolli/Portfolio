import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import { ErrorBoundary } from 'react-error-boundary'

// global.css first: it declares the cascade layer order (tailwind-base < primereact < tailwind-utilities).
// If the theme is loaded first its @layer primereact is registered below Tailwind's preflight, which then strips input borders/padding.
import './styles/global.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'

import ParticlesProvider from '@/providers/particlesProvider'
import AOSProvider from '@/providers/aosProvider'
import Header from '@/components/header/header'
import ErrorFallback from '@/components/error/error'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ParticlesProvider>
        <AOSProvider>
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => <ErrorFallback error={error} reset={resetErrorBoundary} />}>
              <Header />
              <main>
                <App />
              </main>
            </ErrorBoundary>
          </BrowserRouter>
        </AOSProvider>
      </ParticlesProvider>
    </PrimeReactProvider>
  </React.StrictMode>
)
