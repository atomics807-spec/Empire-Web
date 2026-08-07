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
  const locale: Locale = 'en'

  return (
    <PublicLayout locale={locale}>
      {/* Hero Section - Subtle Light Theme */}
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100">
        {/* Back Button */}
        <div className="absolute top-6 left-4 z-20">
          <Link href={`/${locale}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {locale === 'en' ? 'Back' : 'Retour'}
            </Button>
          </Link>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-white font-semibold mb-8 shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              {locale === 'en' ? 'Now Open' : 'Ouvert maintenant'}
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {locale === 'en' ? 'Empire' : 'Empire'}{' '}
              <span className="text-orange-600">Restaurant</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-xl">
              {locale === 'en' 
                ? 'Experience the finest authentic Cameroonian cuisine in the heart of Limbe'
                : 'Découvrez la meilleure cuisine camerounaise authentique au cœur de Limbe'}
            </p>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-8">
              <MapPin className="h-5 w-5 text-orange-600" />
              <span>Opposite Limbe Community Field, Cameroon</span>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/restaurant/menu`}>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-10 py-7 shadow-xl shadow-orange-600/30 border-0">
                  <Utensils className="h-6 w-6 mr-3" />
                  {locale === 'en' ? 'View Menu' : 'Voir le Menu'}
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 text-lg px-10 py-7 bg-white">
                <Clock className="h-6 w-6 mr-3" />
                08:00 - 17:30
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-gray-500">
            <span className="text-sm mb-2">{locale === 'en' ? 'Scroll' : 'Défiler'}</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {locale === 'en' ? 'Why Choose Us' : 'Pourquoi Nous Choisir'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Utensils className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'en' ? 'Fresh Ingredients' : 'Ingrédients Frais'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'We source the freshest local ingredients daily'
                  : 'Nous nous approvisionnons en ingrédients locaux frais quotidiennement'}
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'en' ? 'Quick Service' : 'Service Rapide'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'Efficient kitchen ensures your food arrives fast'
                  : 'Une cuisine efficace garantit que votre nourriture arrive rapidement'}
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {locale === 'en' ? 'Great Location' : 'Emplacement Idéal'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en'
                  ? 'Located opposite Limbe Community Field'
                  : 'Situé en face du Terrain Communautaire de Limbe'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            {locale === 'en' ? 'Featured Dishes' : 'Plats en Vedette'}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
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
              <div key={i} className="bg-white rounded-xl p-6 border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{dish.name[locale as 'en' | 'fr']}</h3>
                <p className="text-sm text-gray-600 mb-3">{dish.desc[locale as 'en' | 'fr']}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-orange-600">{dish.price.toLocaleString()} XAF</span>
                  <Link href={`/${locale}/restaurant/menu`}>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white border-0">Order</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {locale === 'en' ? 'Ready to Order?' : 'Prêt à Commander?'}
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto text-lg">
            {locale === 'en'
              ? 'Browse our menu and place your order for dine-in or takeaway'
              : 'Parcourez notre menu et passez votre commande pour manger sur place ou à emporter'}
          </p>
          <Link href={`/${locale}/restaurant/menu`}>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-10 py-6 shadow-xl border-0">
              <Leaf className="h-6 w-6 mr-2" />
              {locale === 'en' ? 'Order Now' : 'Commander maintenant'}
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  )
}
