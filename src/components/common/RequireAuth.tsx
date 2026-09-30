import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

// 웨딩홀 정보(지도/목록/찜)는 로그인한 사용자만 볼 수 있게 감싸는 게이트.
// 로그인 여부 확인 중에는 깜빡임 없이 빈 화면만 보여주고, 비로그인이면
// 로그인 유도 화면으로 대체한다.
export default function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { isLoggedIn, loading, authAvailable } = useAuth()

  if (loading) {
    return <div className="h-screen bg-beige" />
  }

  if (authAvailable && !isLoggedIn) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-beige px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-olive-light text-olive-dark">
          <LogIn size={24} />
        </div>
        <div>
          <p className="text-base font-semibold text-ink">로그인이 필요합니다</p>
          <p className="mt-1 text-sm text-subtext">
            웨딩홀 정보는 로그인 후 확인하실 수 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="rounded-full bg-olive px-6 py-2.5 text-sm font-semibold text-white hover:bg-olive-dark"
        >
          로그인하러 가기
        </button>
      </div>
    )
  }

  return <>{children}</>
}
