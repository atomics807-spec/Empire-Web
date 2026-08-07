import Link from 'next/link'
import { 
  Utensils, 
  Wine, 
  Music, 
  Calendar, 
  MapPin, 
  Clock,
  ChevronRight,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout/public-layout'
import { type Locale, t, getBilingualContent } from '@/lib/i18n'

// Mock featured events data
const featuredEvents = [
  {
    id: '1',
    title: { en: 'Saturday Night Fever', fr: 'Fièvre du Samedi Soir' },
    date: '2026-08-15',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
    isVip: true,
  },
  {
    id: '2',
    title: { en: 'Afro Beats Night', fr: 'Soirée Afro Beats' },
    date: '2026-08-22',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    isVip: false,
  },
]

// Mock featured dishes
const featuredDishes = [
  {
    id: '1',
    name: { en: 'Grilled Tilapia', fr: 'Tilapia Grillé' },
    description: { en: 'Fresh tilapia with plantain and salad', fr: 'Tilapia frais avec plantain et salade' },
    price: 4500,
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400',
  },
  {
    id: '2',
    name: { en: 'Ndole', fr: 'Ndolé' },
    description: { en: 'Traditional bitter leaf stew with peanuts', fr: 'Ragoût traditionnel aux feuilles amères et noix de cajou' },
    price: 3500,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400',
  },
  {
    id: '3',
    name: { en: 'Koki', fr: 'Koki' },
    description: { en: 'Steamed corn and bean dough', fr: 'Pâte de maïs et haricots cuite à la vapeur' },
    price: 2000,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400',
  },
]

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  return (
    <PublicLayout locale={locale as Locale}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden noise-overlay">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-surface to-dark">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <Badge variant="restaurant" className="mb-6 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            {locale === 'en' ? 'Now Open' : 'Ouvert Maintenant'}
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient-primary">Empire</span>
            <br />
            <span className="text-foreground">Hybrid Lounge</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {locale === 'en'
              ? 'Daytime restaurant and night club experience. Fine dining meets nightlife entertainment.'
              : "Expérience de restaurant en journée et boîte de nuit. Gastronomie rencontre divertissements nocturnes."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/restaurant`}>
              <Button size="lg" className="btn-primary w-full sm:w-auto">
                <Utensils className="h-5 w-5 mr-2" />
                {t('restaurant.orderNow', locale as Locale)}
              </Button>
            </Link>
            <Link href={`/${locale}/events`}>
              <Button size="lg" variant="outline" className="btn-outline w-full sm:w-auto">
                <Calendar className="h-5 w-5 mr-2" />
                {t('nav.events', locale as Locale)}
              </Button>
            </Link>
          </div>

          {/* Location */}
          <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-sm">
              {locale === 'en'
                ? 'Sappa Road, Limbe, Cameroon'
                : 'Route Sappa, Limbe, Cameroun'}
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-muted-foreground rotate-90" />
        </div>
      </section>

      {/* Restaurant Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="restaurant" className="mb-4">
                <Utensils className="h-4 w-4 mr-2" />
                {t('nav.restaurant', locale as Locale)}
              </Badge>
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                {locale === 'en' ? 'Taste the Best' : 'Goutez le Meilleur'}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {locale === 'en'
                  ? 'Experience authentic Cameroonian cuisine in our elegant dining room. Open daily from 8:00 AM to 5:30 PM for dine-in and takeaway orders.'
                  : "Découvrez la cuisine camerounaise authentique dans notre élégante salle de restaurant. Ouvert tous les jours de 8h00 à 17h30 pour les repas sur place et à emporter."}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-restaurant-accent" />
                  {locale === 'en' ? 'Fresh local ingredients' : 'Ingrédients locaux frais'}
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-restaurant-accent" />
                  {locale === 'en' ? 'Traditional recipes' : 'Recettes traditionnelles'}
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-restaurant-accent" />
                  {locale === 'en' ? 'Dine-in & Takeaway' : 'Sur place & À emporter'}
                </li>
              </ul>
              <Link href={`/${locale}/restaurant/menu`}>
                <Button size="lg" className="btn-secondary">
                  {t('restaurant.viewMenu', locale as Locale)}
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featuredDishes.slice(0, 4).map((dish) => (
                <Card key={dish.id} className="overflow-hidden card-hover">
                  <div className="aspect-square bg-surface-elevated">
                    <img
                      src={dish.image}
                      alt={getBilingualContent(dish.name, locale as Locale)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm text-foreground">
                      {getBilingualContent(dish.name, locale as Locale)}
                    </h3>
                    <p className="text-primary font-medium">
                      {dish.price.toLocaleString()} XAF
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Night Club Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="club" className="mb-4">
              <Wine className="h-4 w-4 mr-2" />
              {locale === 'en' ? 'Night Club' : 'Boîte de Nuit'}
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {locale === 'en' ? 'After Dark' : 'Quand la Nuit Tombe'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'en'
                ? 'Dance the night away with our resident DJs. VIP tables, premium bottle service, and unforgettable events every weekend.'
                : "Dansez toute la nuit avec nos DJs résidents. Tables VIP, service de bouteilles premium et événements inoubliables chaque week-end."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden card-hover bg-surface">
                <div className="relative aspect-[4/3]">
                  <img
                    src={event.image}
                    alt={getBilingualContent(event.title, locale as Locale)}
                    className="w-full h-full object-cover"
                  />
                  {event.isVip && (
                    <Badge variant="vip" className="absolute top-3 right-3">
                      <Star className="h-3 w-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {getBilingualContent(event.title, locale as Locale)}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <Link href={`/${locale}/events/${event.id}`}>
                    <Button variant="club" className="w-full">
                      {t('club.buyTickets', locale as Locale)}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/${locale}/events`}>
              <Button variant="ghost" className="text-primary">
                {locale === 'en' ? 'View All Events' : 'Voir Tous les Événements'}
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {locale === 'en' ? 'Why Choose Us' : 'Pourquoi Nous Choisir'}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-restaurant-accent/20 flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-restaurant-accent" />
              </div>
              <CardTitle className="mb-2">
                {locale === 'en' ? 'Fresh Ingredients' : 'Ingrédients Frais'}
              </CardTitle>
              <p className="text-muted-foreground">
                {locale === 'en'
                  ? 'We source the freshest local ingredients daily for our kitchen.'
                  : 'Nous approvisionnons les ingrédients locaux les plus frais quotidiennement.'}
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-club-accent/20 flex items-center justify-center mx-auto mb-4">
                <Music className="h-8 w-8 text-club-accent" />
              </div>
              <CardTitle className="mb-2">
                {locale === 'en' ? 'Live Entertainment' : 'Divertissements en Direct'}
              </CardTitle>
              <p className="text-muted-foreground">
                {locale === 'en'
                  ? 'Top DJs and live performances every weekend at our club.'
                  : 'Les meilleurs DJs et spectacles live chaque week-end dans notre boîte.'}
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-vip-gold/20 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-vip-gold" />
              </div>
              <CardTitle className="mb-2">
                {locale === 'en' ? 'VIP Experience' : 'Expérience VIP'}
              </CardTitle>
              <p className="text-muted-foreground">
                {locale === 'en'
                  ? 'Exclusive VIP sections and bottle service for premium guests.'
                  : 'Sections VIP exclusives et service de bouteilles pour les clients premium.'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary noise-overlay">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            {locale === 'en' ? 'Ready to Experience Empire?' : 'Prêt à Vivre Empire?'}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Book your table or reserve your spot for the next big event.'
              : 'Réservez votre table ou votre place pour le prochain grand événement.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/restaurant`}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                {t('restaurant.orderNow', locale as Locale)}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t('nav.contact', locale as Locale)}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
