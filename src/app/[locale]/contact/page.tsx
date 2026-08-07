import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, ExternalLink } from 'lucide-react'
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

  // Google Maps embed URL for Limbe, Cameroon (opposite Limbe Community Field)
  const mapEmbedUrl = "https://www.openstreetmap.org/export/embed.html?bbox=9.195%2C4.015%2C9.215%2C4.035&layer=mapnik&marker=4.0250%2C9.2050"

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground text-center mb-4">
            {isFrench ? 'Contactez-Nous' : 'Contact Us'}
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            {isFrench 
              ? 'Nous sommes là pour vous aider.'
              : 'We\'re here to help.'}
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info & Map */}
            <div className="space-y-6">
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
                      <p className="text-sm text-muted-foreground mt-1">
                        {isFrench 
                          ? 'Face au Terrain Communautaire de Limbe'
                          : 'Opposite Limbe Community Field'}
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
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">WhatsApp</h3>
                      <a href="https://wa.me/23760000000" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        +237 6 00 00 00 00
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Map */}
              <Card>
                <CardContent className="p-0 overflow-hidden">
                  <div className="relative">
                    <iframe 
                      src={mapEmbedUrl}
                      width="100%" 
                      height="300" 
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Empire Hybrid Lounge Location"
                      className="w-full"
                    />
                    <div className="absolute bottom-2 right-2">
                      <a 
                        href="https://www.openstreetmap.org/?mlat=4.0250&mlon=9.2050#map=16/4.0250/9.2050"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface text-xs text-muted-foreground hover:text-foreground rounded-lg shadow-lg"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {isFrench ? 'Ouvrir dans Maps' : 'Open in Maps'}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Directions */}
              <Card className="bg-gradient-to-r from-primary/10 to-transparent">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-primary" />
                    {isFrench ? 'Comment s\'y rendre' : 'How to Get Here'}
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">1</span>
                      {isFrench 
                        ? 'Located on Sappa Road, opposite Limbe Community Field'
                        : 'Located on Sappa Road, opposite Limbe Community Field'}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">2</span>
                      {isFrench 
                        ? 'Visible landmark: Limbe Community Field'
                        : 'Visible landmark: Limbe Community Field'}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0">3</span>
                      {isFrench 
                        ? '5 minutes from Limbe Town Center'
                        : '5 minutes from Limbe Town Center'}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {isFrench ? 'Envoyez-nous un message' : 'Send Us a Message'}
                </h3>
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
                    <Label>{isFrench ? 'Sujet' : 'Subject'}</Label>
                    <Input placeholder={isFrench ? 'De quoi s\'agit-il?' : 'What is it about?'} />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <textarea 
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" 
                      rows={5}
                      placeholder={isFrench ? 'Votre message...' : 'Your message...'}
                    />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    {isFrench ? 'Envoyer' : 'Send Message'}
                  </Button>
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
