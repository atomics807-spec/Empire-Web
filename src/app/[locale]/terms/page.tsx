'use client'

import * as React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

export default function TermsPage(props: { params: Promise<{ locale: string }> }) {
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
          <h1 className="text-4xl font-bold text-foreground mb-8">
            {isFrench ? 'Conditions Générales' : 'Terms and Conditions'}
          </h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '1. Acceptation des Conditions' : '1. Acceptance of Terms'}
              </h2>
              <p>
                {isFrench 
                  ? 'En accédant et en utilisant ce site web, vous acceptez d\'être lié par ces conditions.'
                  : 'By accessing and using this website, you agree to be bound by these terms.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '2. Services' : '2. Services'}
              </h2>
              <p>
                {isFrench 
                  ? 'Empire Hybrid Lounge fournit des services de restaurant et de boîte de nuit.'
                  : 'Empire Hybrid Lounge provides restaurant and nightclub services.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '3. Politique d\'Âge' : '3. Age Policy'}
              </h2>
              <p>
                {isFrench 
                  ? 'Certains événements peuvent exiger que les clients aient 18 ans ou plus.'
                  : 'Some events may require patrons to be 18 years or older.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
