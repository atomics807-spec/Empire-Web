'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface GuestListPageProps {
  params: Promise<{ locale: string; eventSlug: string }>
}

export default function GuestListPage({ params }: GuestListPageProps) {
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const [eventSlug, setEventSlug] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  params.then(p => {
    setLocale(p.locale as 'en' | 'fr')
    setEventSlug(p.eventSlug)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {locale === 'en' ? 'You\'re on the list!' : 'Vous êtes sur la liste !'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {locale === 'en' 
                ? `See you at the event! You and ${guestCount} guest${guestCount > 1 ? 's' : ''} are confirmed.`
                : `À bientôt à l'événement ! Vous et ${guestCount} invité${guestCount > 1 ? 's' : ''} êtes confirmés.`
              }
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {locale === 'en' 
                ? 'Show this confirmation at the door.'
                : 'Montrez cette confirmation à l\'entrée.'
              }
            </p>
            <Link href={`/${locale}/events/${eventSlug}`}>
              <Button variant="outline" className="w-full">
                {locale === 'en' ? 'Back to Event' : 'Retour à l\'Événement'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/events/${eventSlug}`} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {locale === 'en' ? 'Join Guest List' : 'Rejoindre la Liste'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Free entry for qualifying guests' : 'Entrée gratuite pour les invités éligibles'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-club-accent" />
              {locale === 'en' ? 'Guest List Registration' : 'Inscription sur la Liste'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{locale === 'en' ? 'Full Name' : 'Nom Complet'}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={locale === 'en' ? 'Enter your full name' : 'Entrez votre nom complet'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{locale === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="6XX XXX XXX"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {locale === 'en' 
                    ? 'We\'ll send you a confirmation SMS'
                    : 'Nous vous enverrons un SMS de confirmation'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">{locale === 'en' ? 'Number of Guests' : 'Nombre d\'Invités'}</Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  max={5}
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {locale === 'en' 
                    ? 'Including yourself'
                    : 'Vous y compris'}
                </p>
              </div>

              <div className="bg-surface-elevated p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {locale === 'en' ? 'Entry Fee' : 'Frais d\'Entrée'}
                  </span>
                  <span className="font-medium text-success">
                    {locale === 'en' ? 'FREE' : 'GRATUIT'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {locale === 'en' ? 'Guests' : 'Invités'}
                  </span>
                  <span className="font-medium">{guestCount}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-club-accent hover:bg-club-accent/90"
                disabled={isLoading}
              >
                {isLoading 
                  ? (locale === 'en' ? 'Submitting...' : 'Soumission...')
                  : (locale === 'en' ? 'Join Guest List' : 'Rejoindre la Liste')
                }
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {locale === 'en' 
                  ? 'By joining, you agree to our terms and age policy (21+)'
                  : 'En vous inscrivant, vous acceptez nos conditions et la politique d\'âge (21+)'
                }
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
