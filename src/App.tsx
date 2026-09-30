import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/Home/HomePage'
import SearchPage from '@/pages/Search/SearchPage'
import FavoritesPage from '@/pages/Favorites/FavoritesPage'
import MyPage from '@/pages/My/MyPage'
import LoginPage from '@/pages/Login/LoginPage'
import WeddingRegisterPage from '@/pages/WeddingRegister/WeddingRegisterPage'
import AdminPage from '@/pages/Admin/AdminPage'
import ProfileSettingsPage from '@/pages/ProfileSettings/ProfileSettingsPage'
import RequireAuth from '@/components/common/RequireAuth'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path="/wedding/:id" element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path="/search" element={<RequireAuth><SearchPage /></RequireAuth>} />
      <Route path="/favorites" element={<RequireAuth><FavoritesPage /></RequireAuth>} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/my/profile" element={<ProfileSettingsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<WeddingRegisterPage mode="create" />} />
      <Route path="/register/:id" element={<WeddingRegisterPage mode="edit" />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
