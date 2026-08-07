'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Lock, User, Phone, Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { AlertDanger } from '@/components/ui/alert'
import { type Locale, t } from '@/lib/i18n'
import { signUpSchema } from '@/lib/validation/schemas'
import { cn } from '@/lib/utils'

interface SignUpPageProps {
  params: Promise<{ locale: string }>
}

export default function SignUpPage({ params }: SignUpPageProps) {
  const [locale, setLocale] = useState<Locale>('en')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
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
      const validated = signUpSchema.parse({
        email,
        password,
        confirmPassword,
        fullName,
        phoneNumber: phone,
        agreedToTerms,
      })
      
      // TODO: Implement actual Supabase authentication
      console.log('Sign up:', validated)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push(`/${locale}/auth/verify-email`)
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

  const passwordRequirements = [
    { met: password.length >= 8, text: locale === 'en' ? '8+ characters' : '8+ caractères' },
    { met: /[a-zA-Z]/.test(password), text: locale === 'en' ? 'One letter' : 'Une lettre' },
    { met: /[0-9]/.test(password), text: locale === 'en' ? 'One number' : 'Un chiffre' },
  ]

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
              {t('auth.signUp', locale)}
            </CardTitle>
            <CardDescription>
              {locale === 'en' 
                ? 'Create your account to order and book.'
                : 'Créez votre compte pour commander et réserver.'}
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
                type="text"
                label={t('auth.fullName', locale)}
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <Input
                type="email"
                label={t('auth.email', locale)}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="tel"
                label={t('auth.phoneNumber', locale)}
                placeholder="6XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                hint={locale === 'en' ? 'Cameroon mobile number' : 'Numéro mobile camerounais'}
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

              {/* Password requirements */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {locale === 'en' ? 'Password must have:' : 'Le mot de passe doit contenir :'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {passwordRequirements.map((req, idx) => (
                    <span 
                      key={idx}
                      className={cn(
                        "text-xs flex items-center gap-1",
                        req.met ? "text-success" : "text-muted-foreground"
                      )}
                    >
                      <Check className="h-3 w-3" />
                      {req.text}
                    </span>
                  ))}
                </div>
              </div>

              <Input
                type="password"
                label={t('auth.confirmPassword', locale)}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  {locale === 'en' 
                    ? 'I agree to the'
                    : 'J\'accepte les'}{' '}
                  <Link href={`/${locale}/terms`} className="text-primary hover:underline">
                    {locale === 'en' ? 'Terms of Service' : "Conditions d'Utilisation"}
                  </Link>{' '}
                  {locale === 'en' ? 'and' : 'et'}{' '}
                  <Link href={`/${locale}/privacy`} className="text-primary hover:underline">
                    {locale === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                className="w-full btn-primary"
                isLoading={isLoading}
                disabled={!agreedToTerms}
              >
                {t('auth.signUp', locale)}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {locale === 'en' ? 'Already have an account?' : 'Vous avez déjà un compte?'}{' '}
              <Link href={`/${locale}/sign-in`} className="text-primary hover:underline">
                {t('auth.signIn', locale)}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
