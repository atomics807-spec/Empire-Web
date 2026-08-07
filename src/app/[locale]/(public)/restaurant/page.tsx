'use client'

import Link from 'next/link'
import { Utensils, Clock, MapPin, Leaf, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PublicLayout } from '@/components/layout/public-layout'
import { type Locale } from '@/lib/i18n'

interface RestaurantPageProps {
  params: Promise<{ locale: string }>
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  // Default locale - will be resolved properly
  const locale: Locale = 'en'

  return (
    <PublicLayout locale={locale}>
      {/* Hero Section - With Background Image */}
      <section className="relative min-h-[600px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')`,
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-4 z-20">
          <Link href={`/${locale}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/50 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {locale === 'en' ? 'Back' : 'Retour'}
            </Button>
          </Link>
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-restaurant-accent text-black font-semibold mb-8 shadow-xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
              </span>
              {locale === 'en' ? 'Now Open' : 'Ouvert maintenant'}
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {locale === 'en' ? 'Empire' : 'Empire'}{' '}
              <span className="text-restaurant-accent">Restaurant</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-xl">
              {locale === 'en' 
                ? 'Experience the finest authentic Cameroonian cuisine in the heart of Limbe'
                : 'Découvrez la meilleure cuisine camerounaise authentique au cœur de Limbe'}
            </p>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-white/70 mb-8">
              <MapPin className="h-5 w-5 text-restaurant-accent" />
              <span>Opposite Limbe Community Field, Cameroon</span>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/restaurant/menu`}>
                <Button size="lg" className="btn-restaurant text-lg px-10 py-7 shadow-2xl shadow-restaurant-accent/30">
                  <Utensils className="h-6 w-6 mr-3" />
                  {locale === 'en' ? 'View Menu' : 'Voir le Menu'}
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white text-lg px-10 py-7">
                <Clock className="h-6 w-6 mr-3" />
                08:00 - 17:30
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">{locale === 'en' ? 'Scroll' : 'Défiler'}</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Features - Brighter theme */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {locale === 'en' ? 'Why Choose Us' : 'Pourquoi Nous Choisir'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-restaurant-accent/10 to-transparent border border-restaurant-accent/20 hover:border-restaurant-accent/40 transition-all hover:shadow-lg">
              <div className="w-20 h-20 rounded-full bg-restaurant-accent/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Utensils className="h-10 w-10 text-restaurant-accent" />
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
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-restaurant-accent/10 to-transparent border border-restaurant-accent/20 hover:border-restaurant-accent/40 transition-all hover:shadow-lg">
              <div className="w-20 h-20 rounded-full bg-restaurant-accent/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="h-10 w-10 text-restaurant-accent" />
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
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-restaurant-accent/10 to-transparent border border-restaurant-accent/20 hover:border-restaurant-accent/40 transition-all hover:shadow-lg">
              <div className="w-20 h-20 rounded-full bg-restaurant-accent/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="h-10 w-10 text-restaurant-accent" />
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

      {/* Featured Items */}
      <section className="py-16 px-4 bg-gradient-to-br from-restaurant-accent/5 to-transparent">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            {locale === 'en' ? 'Featured Dishes' : 'Plats en Vedette'}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            {locale === 'en'
              ? 'Try our most popular dishes made with love'
              : 'Essayez nos plats les plus populaires faits avec amour'}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: { en: 'Grilled Tilapia', fr: 'Tilapia Grillé' }, price: 4500, desc: { en: 'Fresh tilapia with plantain', fr: 'Tilapia frais avec plantain' } },
              { name: { en: 'Ndolè', fr: 'Ndolé' }, price: 3500, desc: { en: 'Bitter leaf stew with peanuts', fr: 'Ragoût aux feuilles amères' } },
              { name: { en: 'Poulet DG', fr: 'Poulet DG' }, price: 4000, desc: { en: 'Fried plantain and chicken', fr: 'Plantain frit et poulet' } },
            ].map((dish, i) => (
              <div key={i} className="bg-surface rounded-xl p-6 border border-restaurant-accent/20 hover:border-restaurant-accent/50 transition-all">
                <h3 className="text-lg font-semibold text-foreground mb-1">{dish.name[locale as 'en' | 'fr']}</h3>
                <p className="text-sm text-muted-foreground mb-3">{dish.desc[locale as 'en' | 'fr']}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-restaurant-accent">{dish.price.toLocaleString()} XAF</span>
                  <Link href={`/${locale}/restaurant/menu`}>
                    <Button size="sm" className="btn-restaurant">Order</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Brighter theme */}
      <section className="py-16 px-4 bg-gradient-to-r from-restaurant-accent/20 via-restaurant-accent/10 to-restaurant-accent/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {locale === 'en' ? 'Ready to Order?' : 'Prêt à Commander?'}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            {locale === 'en'
              ? 'Browse our menu and place your order for dine-in or takeaway'
              : 'Parcourez notre menu et passez votre commande pour manger sur place ou à emporter'}
          </p>
          <Link href={`/${locale}/restaurant/menu`}>
            <Button size="lg" className="btn-restaurant text-lg px-10 py-6 shadow-xl">
              <Leaf className="h-6 w-6 mr-2" />
              {locale === 'en' ? 'Order Now' : 'Commander maintenant'}
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
