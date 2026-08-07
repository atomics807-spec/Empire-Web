import Link from 'next/link'
import { 
  Calendar,
  MapPin,
  Clock,
  Star,
  Users,
  Ticket,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/public-layout'
import { type Locale, t, getBilingualContent } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'

// Mock events data
const events = [
  {
    id: '1',
    title: { en: 'Saturday Night Fever', fr: 'Fièvre du Samedi Soir' },
    description: { en: 'The hottest night in Limbe! DJ Kely spinning the best afro beats and international hits.', fr: 'La nuit la plus chaude à Limbe ! DJ Kely mixant les meilleurs afro beats et tubes internationaux.' },
    startTime: '2026-08-15T21:00:00',
    doorsOpen: '20:00',
    venue: 'Empire Night Club',
    flyerUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
    isFeatured: true,
    agePolicy: '21+',
    dressCode: 'Smart Casual',
    tickets: [
      { name: 'General Entry', price: 5000, available: 200 },
      { name: 'VIP', price: 15000, available: 50 },
    ],
  },
  {
    id: '2',
    title: { en: 'Afro Beats Night', fr: 'Soirée Afro Beats' },
    description: { en: 'Celebrate African music with live performances and the best DJs from Cameroon.', fr: 'Célébrez la musique africaine avec des performances live et les meilleurs DJs du Cameroun.' },
    startTime: '2026-08-22T22:00:00',
    doorsOpen: '21:00',
    venue: 'Empire Night Club',
    flyerUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    isFeatured: true,
    agePolicy: '18+',
    dressCode: 'Casual',
    tickets: [
      { name: 'General Entry', price: 3000, available: 300 },
    ],
  },
  {
    id: '3',
    title: { en: 'Ladies Night', fr: 'Soirée Ladies' },
    description: { en: 'Ladies free entry before 11 PM! Premium cocktails and special performances.', fr: 'Ladies entrée gratuite avant 23h ! Cocktails premium et performances spéciales.' },
    startTime: '2026-08-29T21:00:00',
    doorsOpen: '21:00',
    venue: 'Empire Night Club',
    flyerUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
    isFeatured: false,
    agePolicy: '21+',
    dressCode: 'Smart',
    tickets: [
      { name: 'Ladies', price: 0, available: 100 },
      { name: 'Gents', price: 5000, available: 200 },
    ],
  },
]

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatEventTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString(locale === 'en' ? 'en-US' : 'fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <PublicLayout locale={locale as Locale}>
      {/* Header */}
      <section className="bg-gradient-primary noise-overlay">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <Badge variant="outline" className="border-white/50 text-white mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              {t('club.upcomingEvents', locale as Locale)}
            </Badge>
            <h1 className="text-5xl font-bold mb-4 text-glow-primary">
              {locale === 'en' ? 'Upcoming Events' : 'Événements à Venir'}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Dance, celebrate, and make memories at Empire Night Club. Book your spot now!'
                : 'Dansez, célébrez et créez des souvenirs à Empire Night Club. Réservez votre place maintenant !'}
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Featured Events */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {locale === 'en' ? 'Featured Events' : 'Événements en Vedette'}
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {events.filter(e => e.isFeatured).map((event) => (
                <Card key={event.id} className="overflow-hidden card-hover bg-surface">
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-square md:aspect-auto">
                      <img
                        src={event.flyerUrl}
                        alt={getBilingualContent(event.title, locale as Locale)}
                        className="w-full h-full object-cover"
                      />
                      <Badge variant="vip" className="absolute top-3 left-3">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {getBilingualContent(event.title, locale as Locale)}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {getBilingualContent(event.description, locale as Locale)}
                        </p>
                        
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{formatEventDate(event.startTime)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{locale === 'en' ? 'Doors' : 'Portes'}: {event.doorsOpen}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{event.venue}</span>
                          </div>
                        </div>

                        {/* Tickets */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                            <Ticket className="h-4 w-4" />
                            {t('event.tickets', locale as Locale)}
                          </h4>
                          <div className="space-y-1">
                            {event.tickets.map((ticket, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{ticket.name}</span>
                                <span className="font-medium text-foreground">
                                  {ticket.price === 0 
                                    ? (locale === 'en' ? 'Free' : 'Gratuit')
                                    : formatPrice(ticket.price)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/${locale}/events/${event.id}`} className="flex-1">
                          <Button className="w-full btn-club">
                            {t('club.buyTickets', locale as Locale)}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* All Events */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {locale === 'en' ? 'All Events' : 'Tous les Événements'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden card-hover bg-surface">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={event.flyerUrl}
                      alt={getBilingualContent(event.title, locale as Locale)}
                      className="w-full h-full object-cover"
                    />
                    {event.isFeatured && (
                      <Badge variant="vip" className="absolute top-3 right-3">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-foreground mb-2">
                      {getBilingualContent(event.title, locale as Locale)}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatEventDate(event.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatEventTime(event.startTime)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-primary">
                        {event.tickets[0].price === 0 
                          ? (locale === 'en' ? 'Free' : 'Gratuit')
                          : `${t('event.from', locale as Locale)} ${formatPrice(event.tickets[0].price)}`}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.tickets.reduce((sum, t) => sum + t.available, 0)}
                      </span>
                    </div>
                    <Link href={`/${locale}/events/${event.id}`}>
                      <Button variant="outline" className="w-full">
                        {locale === 'en' ? 'View Details' : 'Voir Détails'}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-surface border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {locale === 'en' ? 'Want to Book a Table?' : 'Voulez-vous Réserver une Table?'}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            {locale === 'en'
              ? 'Reserve a VIP table for your group and enjoy premium service all night.'
              : 'Réservez une table VIP pour votre groupe et profitez d\'un service premium toute la nuit.'}
          </p>
          <Link href={`/${locale}/events/${events[0].id}/tables`}>
            <Button className="btn-vip">
              {t('club.reserveTable', locale as Locale)}
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
