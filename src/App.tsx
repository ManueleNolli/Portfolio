import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/home/homePage'
import HobbiesPage from '@/pages/hobbies/hobbiesPage'
import MixologyPage from '@/pages/hobbies/mixology/mixologyPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hobbies" element={<HobbiesPage />} />
      <Route path="/hobbies/mixology" element={<MixologyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
