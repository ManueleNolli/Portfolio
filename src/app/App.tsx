import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/app/Layout'
import HomePage from '@/pages/HomePage'
import HobbiesPage from '@/pages/HobbiesPage'
import MixologyPage from '@/pages/MixologyPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hobbies" element={<HobbiesPage />} />
        <Route path="/hobbies/mixology" element={<MixologyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
