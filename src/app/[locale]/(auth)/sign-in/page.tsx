'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDanger } from '@/components/ui/alert'
import { type Locale, t } from '@/lib/i18n'
import { signInSchema } from '@/lib/validation/schemas'

interface SignInPageProps {
  params: Promise<{ locale: string }>
}

export default function SignInPage({ params }: SignInPageProps) {
  const [locale, setLocale] = useState<Locale>('en')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Handle params
  params.then(p => setLocale(p.locale as Locale))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const validated = signInSchema.parse({ email, password })
      
      // TODO: Implement actual Supabase authentication
      console.log('Sign in:', validated)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push(`/${locale}/dashboard`)
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors[0]?.message || 'Invalid input')
      } else {
        setError(err.message || 'An error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to site */}
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {locale === 'en' ? 'Back to site' : 'Retour au site'}
        </Link>

        <Card className="bg-surface border-border">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-white">E</span>
            </div>
            <CardTitle className="text-2xl">
              {t('auth.signIn', locale)}
            </CardTitle>
            <CardDescription>
              {locale === 'en' 
                ? 'Welcome back! Sign in to your account.'
                : 'Bon retour ! Connectez-vous à votre compte.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <AlertDanger className="mb-6">
                {error}
              </AlertDanger>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label={t('auth.email', locale)}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label={t('auth.password', locale)}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                <Link 
                  href={`/${locale}/forgot-password`}
                  className="text-sm text-primary hover:underline"
                >
                  {t('auth.forgotPassword', locale)}
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                isLoading={isLoading}
              >
                {t('auth.signIn', locale)}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {locale === 'en' ? "Don't have an account?" : "Vous n'avez pas de compte?"}{' '}
              <Link href={`/${locale}/sign-up`} className="text-primary hover:underline">
                {t('auth.signUp', locale)}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
