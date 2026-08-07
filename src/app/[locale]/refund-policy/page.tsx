'use client'

import * as React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

export default function RefundPolicyPage(props: { params: Promise<{ locale: string }> }) {
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
            {isFrench ? 'Politique de Remboursement' : 'Refund Policy'}
          </h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '1. Commandes de Restaurant' : '1. Restaurant Orders'}
              </h2>
              <p>
                {isFrench 
                  ? 'Les commandes de restaurant peuvent être annulées et remboursées tant que la préparation n\'a pas commencé.'
                  : 'Restaurant orders may be cancelled and refunded as long as preparation has not started.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '2. Billets d\'Événements' : '2. Event Tickets'}
              </h2>
              <p>
                {isFrench 
                  ? 'Les billets d\'événements peuvent être remboursés jusqu\'à 24 heures avant le début de l\'événement.'
                  : 'Event tickets may be refunded up to 24 hours before the event start time.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '3. Délai de Traitement' : '3. Processing Time'}
              </h2>
              <p>
                {isFrench 
                  ? 'Les remboursements sont généralement traités dans un délai de 5 à 10 jours ouvrables.'
                  : 'Refunds are typically processed within 5 to 10 business days.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
