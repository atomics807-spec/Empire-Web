import Link from 'next/link'
import { Utensils, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale, t } from '@/lib/i18n'

interface RestaurantPageProps {
  params: Promise<{ locale: string }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-restaurant-accent/10 to-transparent">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-restaurant-accent/10 text-restaurant-accent mb-6">
              <Utensils className="h-5 w-5" />
              <span className="text-sm font-medium">
                {locale === 'en' ? 'Now Open' : 'Ouvert Maintenant'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {locale === 'en' ? 'Empire Restaurant' : 'Restaurant Empire'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {locale === 'en' 
                ? 'Experience authentic Cameroonian cuisine in a warm, welcoming atmosphere'
                : 'Découvrez la cuisine camerounaise authentique dans une atmosphère chaleureuse et accueillante'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/restaurant/menu`}>
                <Button size="lg" className="w-full sm:w-auto">
                  {locale === 'en' ? 'View Menu' : 'Voir le Menu'}
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Clock className="h-5 w-5 mr-2" />
                08:00 - 17:30
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              {locale === 'en' ? 'Why Choose Us' : 'Pourquoi Nous Choisir'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-surface border border-border">
                <div className="w-16 h-16 rounded-full bg-restaurant-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-restaurant-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {locale === 'en' ? 'Fresh Ingredients' : 'Ingrédients Frais'}
                </h3>
                <p className="text-muted-foreground">
                  {locale === 'en'
                    ? 'We source the freshest local ingredients daily'
                    : 'Nous nous approvisionnons en ingrédients locaux frais quotidiennement'}
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-surface border border-border">
                <div className="w-16 h-16 rounded-full bg-restaurant-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-restaurant-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {locale === 'en' ? 'Quick Service' : 'Service Rapide'}
                </h3>
                <p className="text-muted-foreground">
                  {locale === 'en'
                    ? 'Efficient kitchen ensures your food arrives fast'
                    : 'Une cuisine efficace garantit que votre nourriture arrive rapidement'}
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-surface border border-border">
                <div className="w-16 h-16 rounded-full bg-restaurant-accent/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-restaurant-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {locale === 'en' ? 'Great Location' : 'Emplacement Idéal'}
                </h3>
                <p className="text-muted-foreground">
                  {locale === 'en'
                    ? 'Located opposite Limbe Community Field'
                    : 'Situé en face du Terrain Communautaire de Limbe'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-surface">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {locale === 'en' ? 'Ready to Order?' : 'Prêt à Commander?'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {locale === 'en'
                ? 'Browse our menu and place your order for dine-in or takeaway'
                : 'Parcourez notre menu et passez votre commande pour manger sur place ou à emporter'}
            </p>
            <Link href={`/${locale}/restaurant/menu`}>
              <Button size="lg" className="bg-restaurant-accent hover:bg-restaurant-accent/90">
                {locale === 'en' ? 'Order Now' : 'Commander Maintenant'}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
