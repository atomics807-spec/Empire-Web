'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { type Locale, t } from '@/lib/i18n'

interface ForgotPasswordPageProps {
  params: Promise<{ locale: string }>
}

export default function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [locale, setLocale] = useState<'en' | 'fr'>('en')

  params.then(p => setLocale(p.locale as 'en' | 'fr'))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSent(true)
    setIsLoading(false)
  }

  if (isSent) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-surface border-border">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <CardTitle className="text-2xl text-foreground mb-2">
              {locale === 'en' ? 'Check Your Email' : 'Vérifiez Votre Email'}
            </CardTitle>
            <CardDescription className="text-muted-foreground mb-6">
              {locale === 'en' 
                ? 'We sent a password reset link to your email address.'
                : 'Nous avons envoyé un lien de réinitialisation à votre adresse email.'}
            </CardDescription>
            <p className="text-sm text-muted-foreground mb-6">
              {locale === 'en' 
                ? 'Didn\'t receive the email? Check your spam folder or try again.'
                : 'Vous n\'avez pas reçu l\'email ? Vérifiez votre dossier spam ou réessayez.'}
            </p>
            <Link href={`/${locale}/sign-in`}>
              <Button variant="outline" className="w-full">
                {locale === 'en' ? 'Back to Sign In' : 'Retour à la Connexion'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-surface border-border">
        <CardHeader className="text-center">
          <Link href={`/${locale}/sign-in`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-foreground">
            {locale === 'en' ? 'Forgot Password?' : 'Mot de Passe Oublié?'}
          </CardTitle>
          <CardDescription>
            {locale === 'en' 
              ? 'Enter your email and we\'ll send you a reset link'
              : 'Entrez votre email et nous vous enverrons un lien de réinitialisation'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? (locale === 'en' ? 'Sending...' : 'Envoi...')
                : (locale === 'en' ? 'Send Reset Link' : 'Envoyer le Lien')
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
