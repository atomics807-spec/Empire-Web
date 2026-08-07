'use client'

import * as React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

export default function PrivacyPage(props: { params: Promise<{ locale: string }> }) {
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
            {isFrench ? 'Politique de Confidentialité' : 'Privacy Policy'}
          </h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '1. Collecte des Informations' : '1. Information Collection'}
              </h2>
              <p>
                {isFrench 
                  ? 'Nous collectons les informations que vous nous fournissez directement.'
                  : 'We collect information you provide directly to us.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '2. Utilisation des Informations' : '2. Use of Information'}
              </h2>
              <p>
                {isFrench 
                  ? 'Nous utilisons les informations collectées pour traiter vos commandes.'
                  : 'We use the information collected to process your orders.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isFrench ? '3. Protection des Données' : '3. Data Protection'}
              </h2>
              <p>
                {isFrench 
                  ? 'Nous mettons en œuvre des mesures de sécurité appropriées.'
                  : 'We implement appropriate security measures.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
