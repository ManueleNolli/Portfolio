import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'

// global.css first: it declares the cascade layer order (tailwind-base < primereact < tailwind-utilities).
// If the theme is loaded first its @layer primereact is registered below Tailwind's preflight, which then strips input borders/padding.
import './styles/global.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'

import ParticlesProvider from '@/features/particles/ParticlesProvider'
import AOSProvider from '@/app/AOSProvider'
import App from '@/app/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ParticlesProvider>
        <AOSProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AOSProvider>
      </ParticlesProvider>
    </PrimeReactProvider>
  </React.StrictMode>
)
