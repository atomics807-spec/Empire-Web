import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale, t } from '@/lib/i18n'

interface EventDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

// Mock event data - in production, fetch from database
const mockEvents: Record<string, {
  id: string
  slug: string
  title: string
  titleFr: string
  description: string
  descriptionFr: string
  date: string
  time: string
  doorsOpen: string
  venue: string
  agePolicy: string
  dressCode: string
  ticketTypes: { name: string; price: number; available: number }[]
  isFeatured: boolean
}> = {
  'saturday-night-fever': {
    id: '1',
    slug: 'saturday-night-fever',
    title: 'Saturday Night Fever',
    titleFr: 'Fièvre du Samedi Soir',
    description: 'The hottest night in Limbe! DJ Kely spinning the best afro beats and international hits all night long. Dress to impress!',
    descriptionFr: 'La nuit la plus chaude à Limbe ! DJ Kely mixant les meilleurs afro beats et tubes internationaux toute la nuit.',
    date: '2026-08-15',
    time: '21:00 - 06:00',
    doorsOpen: '20:00',
    venue: 'Empire Night Club',
    agePolicy: '21+',
    dressCode: 'Smart Casual',
    ticketTypes: [
      { name: 'General Entry', price: 5000, available: 150 },
      { name: 'VIP Access', price: 15000, available: 30 },
    ],
    isFeatured: true,
  },
  'afro-beats-night': {
    id: '2',
    slug: 'afro-beats-night',
    title: 'Afro Beats Night',
    titleFr: 'Soirée Afro Beats',
    description: 'Celebrate African music with live performances from local artists and the best DJs from Cameroon.',
    descriptionFr: 'Célébrez la musique africaine avec des performances live d\'artistes locaux et les meilleurs DJs du Cameroun.',
    date: '2026-08-22',
    time: '22:00 - 06:00',
    doorsOpen: '21:00',
    venue: 'Empire Night Club',
    agePolicy: '18+',
    dressCode: 'Casual',
    ticketTypes: [
      { name: 'General Entry', price: 3000, available: 250 },
    ],
    isFeatured: true,
  },
  'ladies-night': {
    id: '3',
    slug: 'ladies-night',
    title: 'Ladies Night',
    titleFr: 'Soirée Ladies',
    description: 'Ladies free entry before 11 PM! Premium cocktails and special performances.',
    descriptionFr: 'Ladies entrée gratuite avant 23h ! Cocktails premium et performances spéciales.',
    date: '2026-08-29',
    time: '21:00 - 06:00',
    doorsOpen: '21:00',
    venue: 'Empire Night Club',
    agePolicy: '21+',
    dressCode: 'Smart',
    ticketTypes: [
      { name: 'Ladies (Free before 11 PM)', price: 0, available: 100 },
      { name: 'Gents', price: 5000, available: 150 },
    ],
    isFeatured: false,
  },
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { locale, slug } = await params
  const event = mockEvents[slug]

  if (!event) {
    notFound()
  }

  const isFrench = locale === 'fr'

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} />
      
      <main className="pb-16">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-4">
          <Link 
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
            {locale === 'en' ? 'Back to Events' : 'Retour aux Événements'}
          </Link>
        </div>

        {/* Hero */}
        <section className="relative py-12 px-4 bg-gradient-to-br from-club-accent/20 via-surface to-surface">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Event Flyer Placeholder */}
              <div className="aspect-[3/4] rounded-2xl bg-surface border border-border flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-24 w-24 mx-auto text-club-accent/50 mb-4" />
                  <p className="text-muted-foreground">{event.title}</p>
                </div>
              </div>

              {/* Event Info */}
              <div className="space-y-6">
                {event.isFeatured && (
                  <Badge variant="vip" className="text-sm">
                    {locale === 'en' ? 'Featured Event' : 'Événement Vedette'}
                  </Badge>
                )}
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {isFrench ? event.titleFr : event.title}
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  {isFrench ? event.descriptionFr : event.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="h-5 w-5 text-club-accent" />
                    <span>{new Date(event.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock className="h-5 w-5 text-club-accent" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="h-5 w-5 text-club-accent" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Users className="h-5 w-5 text-club-accent" />
                    <span>{event.agePolicy}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="outline">
                    {locale === 'en' ? 'Dress Code' : 'Code Vestimentaire'}: {event.dressCode}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tickets Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Ticket className="h-6 w-6 text-club-accent" />
              {locale === 'en' ? 'Get Tickets' : 'Obtenir des Billets'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.ticketTypes.map((ticket, idx) => (
                <Card key={idx} className="relative overflow-hidden">
                  {ticket.price === 0 && (
                    <div className="absolute top-0 right-0 bg-success text-success-foreground text-xs px-2 py-1 rounded-bl-lg">
                      FREE
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{ticket.name}</h3>
                    <p className="text-2xl font-bold text-club-accent mb-2">
                      {ticket.price === 0 ? 'FREE' : `${ticket.price.toLocaleString()} XAF`}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {ticket.available} {locale === 'en' ? 'tickets available' : 'billets disponibles'}
                    </p>
                    <div className="space-y-3">
                      <Link href={`/${locale}/checkout?event=${event.slug}&ticket=${idx}`} className="block">
                        <Button className="w-full bg-club-accent hover:bg-club-accent/90">
                          {locale === 'en' ? 'Buy Ticket' : 'Acheter Billet'}
                        </Button>
                      </Link>
                      <Link href={`/${locale}/club/${event.slug}/tables`} className="block">
                        <Button variant="outline" className="w-full">
                          {locale === 'en' ? 'Reserve Table' : 'Réserver Table'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Actions */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <Link href={`/${locale}/guest-list/${event.slug}`}>
                <Card className="cursor-pointer hover:border-club-accent transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {locale === 'en' ? 'Join Guest List' : 'Rejoindre la Liste'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'en' ? 'Free entry for ladies' : 'Entrée gratuite pour les ladies'}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
