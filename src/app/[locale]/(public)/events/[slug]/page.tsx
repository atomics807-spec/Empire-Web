import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket, ChevronRight, CheckCircle } from 'lucide-react'
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
  ticketTypes: { 
    name: string; 
    price: number; 
    available: number;
    image: string;
    features: string[];
  }[]
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
      { 
        name: 'General Entry', 
        price: 5000, 
        available: 150,
        image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&q=80',
        features: ['Event entry', 'Dance floor access', 'Main bar access']
      },
      { 
        name: 'VIP Access', 
        price: 15000, 
        available: 30,
        image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400&q=80',
        features: ['Priority entry', 'VIP lounge access', 'Premium seating', 'Dedicated service', 'Complimentary drinks']
      },
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
      { 
        name: 'General Entry', 
        price: 3000, 
        available: 250,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
        features: ['Event entry', 'Dance floor access', 'Main bar access']
      },
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
      { 
        name: 'Ladies Free Entry', 
        price: 0, 
        available: 100,
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
        features: ['Free entry before 11 PM', 'Dance floor access', 'Complimentary drink']
      },
      { 
        name: 'Gents Entry', 
        price: 5000, 
        available: 150,
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
        features: ['Event entry', 'Dance floor access', 'Main bar access']
      },
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
        <section className="py-12 px-4 bg-gradient-to-b from-surface/50 to-background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {locale === 'en' ? 'Choose Your Package' : 'Choisissez Votre Package'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.ticketTypes.map((ticket, idx) => (
                <Card key={idx} className={`relative overflow-hidden group hover:shadow-2xl transition-all duration-300 ${ticket.name.toLowerCase().includes('vip') || ticket.name.toLowerCase().includes('lounge') ? 'border-vip-gold/50' : 'border-club-accent/30'}`}>
                  {/* Package Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={ticket.image} 
                      alt={ticket.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Badges */}
                    {ticket.name.toLowerCase().includes('vip') && (
                      <Badge variant="vip" className="absolute top-3 right-3 shadow-lg">
                        VIP
                      </Badge>
                    )}
                    {ticket.price === 0 && (
                      <div className="absolute top-3 left-3 bg-success text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                        FREE ENTRY
                      </div>
                    )}
                    
                    {/* Price on Image */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-2xl font-bold text-white">
                        {ticket.price === 0 ? 'FREE' : `${ticket.price.toLocaleString()} XAF`}
                      </p>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-2">{ticket.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {ticket.available} {locale === 'en' ? 'available' : 'disponible'}
                    </p>
                    
                    {/* Package Features with Images/Icons */}
                    <ul className="space-y-2 mb-5">
                      {ticket.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-sm">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            ticket.name.toLowerCase().includes('vip') 
                              ? 'bg-vip-gold/20 text-vip-gold' 
                              : 'bg-club-accent/20 text-club-accent'
                          }`}>
                            <CheckCircle className="w-3 h-3" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link href={`/${locale}/checkout?event=${event.slug}&ticket=${idx}`} className="block">
                      <Button className={`w-full ${ticket.name.toLowerCase().includes('vip') || ticket.name.toLowerCase().includes('lounge') ? 'bg-vip-gold hover:bg-vip-gold/80 text-black' : 'btn-club'}`}>
                        {locale === 'en' ? 'Select Package' : 'Sélectionner'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Table Reservation CTA */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-vip-gold/10 to-club-accent/10 border border-vip-gold/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {locale === 'en' ? 'Want a VIP Experience?' : 'Envie d\'une Expérience VIP?'}
                  </h3>
                  <p className="text-muted-foreground">
                    {locale === 'en' 
                      ? 'Reserve a table for your group with bottle service and dedicated seating'
                      : 'Réservez une table pour votre groupe avec service bouteille et siège dédié'}
                  </p>
                </div>
                <Link href={`/${locale}/club/${event.slug}/tables`}>
                  <Button className="bg-vip-gold hover:bg-vip-gold/80 text-black font-semibold">
                    {locale === 'en' ? 'Reserve Table' : 'Réserver une Table'}
                  </Button>
                </Link>
              </div>
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
