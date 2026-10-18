import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '@/app/Layout'
import HomePage from '@/pages/HomePage'
import HobbiesPage from '@/pages/HobbiesPage'
import MixologyPage from '@/pages/MixologyPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/hobbies', element: <HobbiesPage /> },
      { path: '/hobbies/mixology', element: <MixologyPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
