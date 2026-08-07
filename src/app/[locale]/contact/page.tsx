import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const isFrench = locale === 'fr'

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground text-center mb-4">
            {isFrench ? 'Contactez-Nous' : 'Contact Us'}
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            {isFrench 
              ? 'Nous sommes là pour vous aider.'
              : 'We\'re here to help.'}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{isFrench ? 'Adresse' : 'Address'}</h3>
                    <p className="text-muted-foreground">
                      Sappa Road, Limbe, Cameroon
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{isFrench ? 'Téléphone' : 'Phone'}</h3>
                    <p className="text-muted-foreground">+237 6 00 00 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{isFrench ? 'Horaires' : 'Hours'}</h3>
                    <p className="text-muted-foreground">
                      {isFrench ? 'Restaurant' : 'Restaurant'}: 08:00 - 17:30<br />
                      {isFrench ? 'Boîte de Nuit' : 'Night Club'}: 20:00 - 06:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label>{isFrench ? 'Nom Complet' : 'Full Name'}</Label>
                    <Input placeholder={isFrench ? 'Votre nom' : 'Your name'} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <textarea className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground" rows={4} />
                  </div>
                  <Button className="w-full">{isFrench ? 'Envoyer' : 'Send'}</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
