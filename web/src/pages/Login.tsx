import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Dumbbell, Apple, TrendingUp, LogIn } from 'lucide-react'
import { useAuthStore } from '../stores/auth'
import { apiErrorMessage } from '../services/api'
import { useServerInfo } from '../hooks/useServerInfo'
import { formatVersion } from '@lyftr/shared'
import Logo from '../components/Logo'
import PasswordField from '../components/ui/PasswordField'
import { t } from '../i18n'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const serverInfo = useServerInfo()

  // Hadiyah build: one shared access key, checked server-side as the demo account's
  // password (DEMO_PASSWORD on the backend). No email, no sign-up.
  const [password, setPassword]     = useState('')
  const [error, setError]           = useState('')
  const [isLoading, setLoading]     = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login('demo@lyftr.local', password.trim())
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.status === 401 ? 'Wrong access key.' : apiErrorMessage(err, 'Wrong access key.'))
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface-base">
      {/* Left side — branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #030812 0%, #0a1b2e 50%, #081326 100%)',
      }}>
        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(0, 184, 217, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
            `,
          }}
        />

        {/* Logo */}
        <div className="relative">
          <Logo size="md" />
        </div>

        {/* Headline and features */}
        <div className="relative space-y-8">
          <h1 className="font-display font-bold text-5xl leading-tight tracking-tight">
            {t('Log. Lift.')}
            <br />
            <span className="bg-gradient-to-r from-brand-500 to-violet-500 bg-clip-text text-transparent">
              {t('Progress.')}
            </span>
          </h1>

          <p className="text-tx-secondary text-base leading-relaxed max-w-sm">
            {t('Your self-hosted fitness tracker. Track workouts, log food, monitor weight — all under your control, running on your own server.')}
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: Dumbbell, label: 'Track workouts' },
              { icon: Apple, label: 'Log food + macros' },
              { icon: TrendingUp, label: 'See progress' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-tx-muted text-sm">
                <Icon className="w-4 h-4 text-brand-500" strokeWidth={2} />
                {t(label)}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative text-tx-muted text-xs">
          © {t('Hadiyah Fit')}{serverInfo?.version ? ` · ${formatVersion(serverInfo.version)}` : ''}
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Logo size="lg" />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl text-tx-primary tracking-tight">
              {t('Welcome back')}
            </h2>
            <p className="text-tx-muted text-sm mt-2">
              {t('Sign in to continue training.')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <PasswordField
              id="password"
              label={t('Access key')}
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              placeholder=""
            />

            {/* Error */}
            {error && (
              <div className="alert-error">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t(error)}</span>
              </div>
            )}

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary btn-lg w-full mt-6 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? t('Signing in…') : t('Sign in')}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}
