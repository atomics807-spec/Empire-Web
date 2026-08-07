'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

const faqItems = [
  {
    q: { en: 'What are your restaurant hours?', fr: 'Quels sont vos horaires de restaurant?' },
    a: { en: 'Our restaurant is open daily from 08:00 to 17:30.', fr: 'Notre restaurant est ouvert tous les jours de 08:00 à 17:30.' },
  },
  {
    q: { en: 'What payment methods do you accept?', fr: 'Quels modes de paiement acceptez-vous?' },
    a: { en: 'We accept Mobile Money payments through MTN, Orange, and Express.', fr: 'Nous acceptons les paiements Mobile Money via MTN, Orange et Express.' },
  },
  {
    q: { en: 'How do I get my digital pass?', fr: 'Comment obtenir mon pass numérique?' },
    a: { en: 'After payment, your digital pass will be available in your dashboard.', fr: 'Après paiement, votre pass numérique sera disponible dans votre tableau de bord.' },
  },
]

export default function FAQPage(props: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = React.useState('en')

  React.useEffect(() => {
    props.params.then(p => setLocale(p.locale))
  }, [props.params])

  const isFrench = locale === 'fr'

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground text-center mb-12">
            {isFrench ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </h1>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg cursor-pointer flex items-center justify-between">
                    {isFrench ? item.q.fr : item.q.en}
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {isFrench ? item.a.fr : item.a.en}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
