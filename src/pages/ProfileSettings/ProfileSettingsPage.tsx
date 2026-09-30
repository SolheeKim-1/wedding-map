import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle2, UserRound } from 'lucide-react'
import ErrorBanner from '@/components/common/ErrorBanner'
import { updateProfile, uploadAvatar } from '@/services/authService'
import { useAuth } from '@/context/AuthContext'

// 마이 > 설정 > 개인정보 설정 (spec: 닉네임 / 프로필 사진 수정).
// 회원가입 시 고른 아바타는 이메일 인증 전(=아직 로그인 세션이 없는 시점)에
// 업로드를 시도하다 보니 실패할 수 있는데(스토리지 업로드는 로그인 상태가
// 필요), 여기서 로그인 후 다시 올릴 수 있게 해서 사실상의 복구 경로도 된다.

export default function ProfileSettingsPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user, profile, authAvailable, loading: authLoading, refreshProfile } = useAuth()

  const [nickname, setNickname] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  // profile이 나중에 (비동기로) 도착해도 입력값에 반영되도록 동기화한다.
  // 단, 사용자가 이미 타이핑을 시작했다면 덮어쓰지 않는다.
  const [touched, setTouched] = useState(false)
  useEffect(() => {
    if (!touched) setNickname(profile?.nickname ?? '')
  }, [profile?.nickname, touched])

  const currentAvatarUrl = avatarPreview ?? profile?.avatarUrl ?? null

  function handleAvatarPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setSaved(false)
    const reader = new FileReader()
    reader.onload = () => setAvatarPreview(typeof reader.result === 'string' ? reader.result : null)
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.')
      return
    }

    setError(null)
    setSaved(false)
    setSubmitting(true)
    try {
      let avatarUrl: string | undefined
      if (avatarFile) {
        avatarUrl = await uploadAvatar(user.id, avatarFile)
      }
      await updateProfile(user.id, { nickname: nickname.trim(), ...(avatarUrl ? { avatarUrl } : {}) })
      await refreshProfile()
      setAvatarFile(null)
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!authAvailable && !authLoading) {
    return (
      <div className="flex h-screen flex-col bg-beige">
        <PageHeader onBack={() => navigate(-1)} title="개인정보 설정" />
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <p className="text-sm text-subtext">
            지금은 이 기능을 사용할 수 없습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </p>
        </div>
      </div>
    )
  }

  if (!authLoading && !user) {
    return (
      <div className="flex h-screen flex-col bg-beige">
        <PageHeader onBack={() => navigate(-1)} title="개인정보 설정" />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-sm text-subtext">로그인 후 이용할 수 있습니다.</p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-full bg-olive px-5 py-2.5 text-sm font-semibold text-white hover:bg-olive-dark"
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-y-auto bg-beige">
      <PageHeader onBack={() => navigate(-1)} title="개인정보 설정" />

      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm flex-1 px-5 py-8">
        <div className="mb-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-line bg-white"
            aria-label="프로필 사진 변경"
          >
            {currentAvatarUrl ? (
              <img src={currentAvatarUrl} alt={nickname || '프로필 사진'} className="h-full w-full object-cover" />
            ) : (
              <UserRound size={36} className="text-subtext" strokeWidth={1.5} />
            )}
            <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-olive text-white shadow-card">
              <Camera size={13} />
            </span>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarPick} className="hidden" />
          <p className="mt-2 text-xs text-subtext">탭해서 프로필 사진 변경</p>
        </div>

        <div className="space-y-4">
          <Field label="닉네임">
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setTouched(true)
                setSaved(false)
                setNickname(e.target.value)
              }}
              placeholder="사용하실 닉네임을 입력해주세요"
              maxLength={20}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-olive"
            />
          </Field>

          <Field label="이메일">
            <input
              type="email"
              value={user?.email ?? ''}
              disabled
              className="w-full rounded-xl border border-line bg-beige px-4 py-3 text-sm text-subtext outline-none"
            />
          </Field>
        </div>

        {error && (
          <div className="mt-4">
            <ErrorBanner message={error} />
          </div>
        )}

        {saved && !error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-olive-light bg-olive-light px-4 py-3 text-sm text-olive-dark">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>저장되었습니다.</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || authLoading}
          className="mt-6 w-full rounded-full bg-olive py-3 text-sm font-semibold text-white transition hover:bg-olive-dark disabled:opacity-60"
        >
          {submitting ? '저장 중...' : '저장'}
        </button>
      </form>
    </div>
  )
}

function PageHeader({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-line bg-white px-4 py-3">
      <button type="button" onClick={onBack} aria-label="뒤로 가기" className="text-ink">
        <ArrowLeft size={22} />
      </button>
      <h1 className="text-base font-semibold text-ink">{title}</h1>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  )
}
