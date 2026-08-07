import { Camera, Images, PartyPopper, UtensilsCrossed, Music } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

// Gallery images organized by category
const galleryImages = {
  restaurant: [
    { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Restaurant Interior' },
    { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', alt: 'Dining Area' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', alt: 'Chef Special' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', alt: 'Gourmet Dish' },
    { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80', alt: 'Table Setting' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Fine Dining' },
  ],
  club: [
    { src: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80', alt: 'Night Club Main Floor' },
    { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', alt: 'Dance Floor' },
    { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', alt: 'DJ Booth' },
    { src: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80', alt: 'Live Performance' },
    { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80', alt: 'Event Night' },
    { src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', alt: 'Music Event' },
  ],
  events: [
    { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', alt: 'Special Event' },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', alt: 'Cocktail Party' },
    { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', alt: 'VIP Experience' },
    { src: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80', alt: 'Private Celebration' },
    { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', alt: 'Themed Night' },
    { src: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&q=80', alt: 'Corporate Event' },
  ],
  atmosphere: [
    { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80', alt: 'Ambiance' },
    { src: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80', alt: 'Evening Mood' },
    { src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80', alt: 'Bar Area' },
    { src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', alt: 'Cocktails' },
    { src: 'https://images.unsplash.com/photo-1565623819679-0df466e6b78c?w=800&q=80', alt: 'Terrace View' },
    { src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', alt: 'VIP Lounge' },
  ],
}

interface GalleryPageProps {
  params: Promise<{ locale: string }>
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params
  const isFrench = locale === 'fr'

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <Badge variant="club" className="mb-4 bg-primary/20 border-primary/50 text-white">
              <Camera className="h-4 w-4 mr-2" />
              {isFrench ? 'Notre Galerie' : 'Our Gallery'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isFrench ? 'Découvrez Empire' : 'Discover Empire'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isFrench
                ? 'Explorez notre collection de photos et plongez-vous dans l\'ambiance unique d\'Empire Hybrid Lounge.'
                : 'Explore our photo collection and immerse yourself in the unique atmosphere of Empire Hybrid Lounge.'}
            </p>
          </div>
        </section>

        {/* Restaurant Section */}
        <section className="py-12 bg-surface/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-restaurant-accent/20 flex items-center justify-center">
                <UtensilsCrossed className="h-6 w-6 text-restaurant-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {isFrench ? 'Restaurant' : 'Restaurant'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isFrench ? 'Cuisine raffinée et ambiance chaleureuse' : 'Fine dining and warm ambiance'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.restaurant.map((image, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Club Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {isFrench ? 'Night Club' : 'Night Club'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isFrench ? 'Dance, musique et divertissements' : 'Dance, music and entertainment'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.club.map((image, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-12 bg-surface/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-vip-gold/20 flex items-center justify-center">
                <PartyPopper className="h-6 w-6 text-vip-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {isFrench ? 'Événements' : 'Events'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isFrench ? 'Des soirées mémorables et des événements exclusifs' : 'Memorable nights and exclusive events'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.events.map((image, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Atmosphere Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Images className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {isFrench ? 'Ambiance' : 'Atmosphere'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isFrench ? 'L\'essence même d\'Empire Hybrid Lounge' : 'The very essence of Empire Hybrid Lounge'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.atmosphere.map((image, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 via-surface to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {isFrench ? 'Envie de vivre l\'expérience Empire?' : 'Ready to experience Empire?'}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              {isFrench
                ? 'Venez nous rendre visite et découvrez pourquoi Empire Hybrid Lounge est l\'destination de choix à Limbe.'
                : 'Come visit us and discover why Empire Hybrid Lounge is the destination of choice in Limbe.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`/${locale}/restaurant`}
                className="px-6 py-3 bg-restaurant-accent text-restaurant-accent-foreground rounded-lg font-medium hover:bg-restaurant-accent-light transition-colors"
              >
                {isFrench ? 'Voir le Menu' : 'View Menu'}
              </a>
              <a
                href={`/${locale}/events`}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {isFrench ? 'Voir les Événements' : 'View Events'}
              </a>
              <a
                href={`/${locale}/contact`}
                className="px-6 py-3 border-2 border-border text-foreground rounded-lg font-medium hover:bg-surface transition-colors"
              >
                {isFrench ? 'Nous Contacter' : 'Contact Us'}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
