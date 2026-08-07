'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Clock, 
  ShoppingCart, 
  ChefHat,
  Utensils,
  Leaf,
  Star,
  AlertCircle,
  Plus,
  Check,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Locale, t, getBilingualContent } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/cart/context'

// Mock menu data
const categories = [
  {
    id: '1',
    names: { en: 'Appetizers', fr: 'Entrées' },
    slug: 'appetizers',
    items: [
      {
        id: '1',
        name: { en: 'Ndolè Fingers', fr: 'Doigts de Ndolé' },
        description: { en: 'Crispy ndolè bites with pepper sauce', fr: 'Bouchées de ndolé croustillantes sauce pimentée' },
        price: 2000,
        isAvailable: true,
        isFeatured: true,
        prepTime: 10,
      },
      {
        id: '2',
        name: { en: 'Plantain Crisps', fr: 'Crisps de Plantain' },
        description: { en: 'Sweet fried plantain chips', fr: 'Chips de plantain fritsucré' },
        price: 1500,
        isAvailable: true,
        isFeatured: false,
        prepTime: 5,
      },
    ],
  },
  {
    id: '2',
    names: { en: 'Main Courses', fr: 'Plats Principaux' },
    slug: 'main-courses',
    items: [
      {
        id: '3',
        name: { en: 'Grilled Tilapia', fr: 'Tilapia Grillé' },
        description: { en: 'Fresh tilapia with plantain, salad and njama njama', fr: 'Tilapia frais avec plantain, salade et njama njama' },
        price: 4500,
        isAvailable: true,
        isFeatured: true,
        prepTime: 25,
      },
      {
        id: '4',
        name: { en: 'Ekwang', fr: 'Ekwang' },
        description: { en: 'Shredded cocoyam with palm nut soup', fr: 'Cocoyam râpé au curry de palme' },
        price: 4000,
        isAvailable: true,
        isFeatured: false,
        prepTime: 30,
      },
      {
        id: '5',
        name: { en: 'Koki', fr: 'Koki' },
        description: { en: 'Steamed corn and bean dough wrapped in leaves', fr: 'Pâte de maïs et haricots cuite à la vapeur dans des feuilles' },
        price: 2500,
        isAvailable: true,
        isFeatured: false,
        prepTime: 45,
      },
    ],
  },
  {
    id: '3',
    names: { en: 'Drinks', fr: 'Boissons' },
    slug: 'drinks',
    items: [
      {
        id: '6',
        name: { en: 'Palm Wine', fr: 'Vin de Palme' },
        description: { en: 'Freshly tapped palm wine', fr: 'Vin de palme fraîchement tari' },
        price: 500,
        isAvailable: true,
        isFeatured: false,
        prepTime: 2,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
      },
      {
        id: '7',
        name: { en: 'Ginger Juice', fr: 'Jus de Gingembre' },
        description: { en: 'Fresh ginger with lemon and honey', fr: 'Gingembre frais avec citron et miel' },
        price: 1000,
        isAvailable: true,
        isFeatured: true,
        prepTime: 3,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
      },
      {
        id: '8',
        name: { en: 'Coca Cola', fr: 'Coca Cola' },
        description: { en: 'Ice cold refreshing cola', fr: 'Cola frais rafraîchissant' },
        price: 500,
        isAvailable: true,
        isFeatured: false,
        prepTime: 1,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
      },
      {
        id: '9',
        name: { en: 'Orange Juice', fr: 'Jus d\'Orange' },
        description: { en: 'Freshly squeezed orange juice', fr: 'Jus d\'orange frais' },
        price: 1000,
        isAvailable: true,
        isFeatured: false,
        prepTime: 2,
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
      },
      {
        id: '10',
        name: { en: 'Royal Mint Tea', fr: 'Thé Menthe Royale' },
        description: { en: 'Traditional Moroccan mint tea', fr: 'Thé à la menthe marocain traditionnel' },
        price: 800,
        isAvailable: true,
        isFeatured: true,
        prepTime: 3,
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400',
      },
      {
        id: '11',
        name: { en: 'Bottled Water', fr: 'Eau en Bouteille' },
        description: { en: 'Purified mineral water', fr: 'Eau minérale purifiée' },
        price: 300,
        isAvailable: true,
        isFeatured: false,
        prepTime: 1,
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
      },
    ],
  },
]

// Mock restaurant status
const restaurantStatus = {
  isOpen: true,
  closingTime: '17:30',
  orderingAvailable: true,
}

interface MenuItemProps {
  item: {
    id: string
    name: { en: string; fr: string }
    description: { en: string; fr: string }
    price: number
    isAvailable: boolean
    isFeatured: boolean
    prepTime: number
    image?: string
  }
  locale: 'en' | 'fr'
  orderingAvailable: boolean
}

function MenuItem({ item, locale, orderingAvailable }: MenuItemProps) {
  const { addItem, isInCart, getItemQuantity } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  
  const inCart = isInCart(item.id)
  const quantity = getItemQuantity(item.id)

  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
    })
    
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <Card className="overflow-hidden border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all bg-white">
      {item.image ? (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={item.image} 
            alt={getBilingualContent(item.name, locale)}
            className="w-full h-full object-cover"
          />
          {item.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-amber-400 text-amber-900 border-0">
              <Star className="h-3 w-3 mr-1" />
              {locale === 'en' ? 'Featured' : 'Populaire'}
            </Badge>
          )}
        </div>
      ) : null}
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">
                {getBilingualContent(item.name, locale)}
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {getBilingualContent(item.description, locale)}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <ChefHat className="h-3 w-3 text-orange-500" />
                {item.prepTime} min
              </span>
              {item.isAvailable ? (
                <span className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {locale === 'en' ? 'Available' : 'Disponible'}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  {locale === 'en' ? 'Sold Out' : 'Épuisé'}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-orange-600">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>
        
        {/* Add to Cart */}
        {item.isAvailable && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {inCart ? (
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-orange-600 font-medium">
                  {quantity} in cart
                </span>
                <Link href={`/${locale}/restaurant/cart`}>
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {locale === 'en' ? 'View Cart' : 'Voir Panier'}
                  </Button>
                </Link>
              </div>
            ) : (
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0" 
                disabled={!orderingAvailable}
                onClick={handleAddToCart}
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    {locale === 'en' ? 'Added!' : 'Ajouté!'}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('restaurant.addToCart', locale)}
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const { itemCount } = useCart()

  // Update locale when params resolve
  params.then(p => setLocale(p.locale as 'en' | 'fr'))
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Light Theme */}
      <section className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-4">
            <Link href={`/${locale}/restaurant`}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-900 hover:bg-orange-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {locale === 'en' ? 'Back to Restaurant' : 'Retour au Restaurant'}
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Badge className="mb-2 bg-orange-100 text-orange-700 border-orange-200">
                <Utensils className="h-4 w-4 mr-2" />
                {t('nav.restaurant', locale)}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900">
                {locale === 'en' ? 'Our Menu' : 'Notre Menu'}
              </h1>
              <p className="text-gray-500 mt-1">
                {locale === 'en' 
                  ? 'Fresh, authentic Cameroonian cuisine'
                  : 'Cuisine camerounaise authentique et fraîche'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Status */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${restaurantStatus.isOpen ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className={`w-2 h-2 rounded-full ${restaurantStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${restaurantStatus.isOpen ? 'text-green-700' : 'text-red-700'}`}>
                  {restaurantStatus.isOpen ? t('restaurant.open', locale) : t('restaurant.closed', locale)}
                </span>
              </div>
              
              {/* Cart */}
              <Link href={`/${locale}/restaurant/cart`}>
                <Button 
                  variant="outline" 
                  className={`relative border-orange-200 ${itemCount > 0 ? 'bg-orange-50 border-orange-400 text-orange-700' : 'text-orange-600 hover:bg-orange-50'}`}
                >
                  <ShoppingCart className={`h-5 w-5 mr-2 ${itemCount > 0 ? 'text-orange-600' : ''}`} />
                  {t('nav.cart', locale)}
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ordering Notice */}
      {!restaurantStatus.orderingAvailable && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3 text-amber-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                {locale === 'en'
                  ? 'Ordering is currently unavailable. We will reopen at 8:00 AM.'
                  : 'Les commandes ne sont pas disponibles actuellement. Nous rouvrirons à 8h00.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Content - Light Theme */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="p-4 border-gray-200 bg-white shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {locale === 'en' ? 'Categories' : 'Catégories'}
                  </h3>
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <a
                        key={category.id}
                        href={`#${category.slug}`}
                        className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                      >
                        {getBilingualContent(category.names, locale)}
                        <span className="text-xs text-gray-400 ml-2">
                          ({category.items.length})
                        </span>
                      </a>
                    ))}
                  </nav>
                </Card>

                {/* Time Info */}
                <Card className="p-4 mt-4 border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-900">
                      {locale === 'en' ? 'Opening Hours' : "Heures d'Ouverture"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{locale === 'en' ? 'Daily' : 'Tous les jours'}: 8:00 - 17:30</p>
                    {restaurantStatus.isOpen && (
                      <p className="text-green-600 font-medium">
                        {locale === 'en' ? 'Closes at' : 'Ferme à'} {restaurantStatus.closingTime}
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </div>

            {/* Menu Items */}
            <div className="lg:col-span-3 space-y-8">
              {categories.map((category) => (
                <div key={category.id} id={category.slug}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-8 bg-orange-500 rounded-full" />
                    {getBilingualContent(category.names, locale)}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.items.map((item) => (
                      <MenuItem 
                        key={item.id} 
                        item={item} 
                        locale={locale} 
                        orderingAvailable={restaurantStatus.orderingAvailable}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Late Night Section */}
      <section className="py-12 bg-gradient-to-r from-gray-100 to-orange-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              <Leaf className="h-4 w-4 mr-2" />
              {t('restaurant.lateNight', locale)}
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Craving Something Late?' : 'Envie de Quelque Chose Tard?'}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">
              {locale === 'en'
                ? 'Some of our menu items are available late night at the club. Look for the special badge!'
                : 'Certains de nos plats sont disponibles tard la nuit à la boîte. Cherchez le badge spécial!'}
            </p>
            <Link href={`/${locale}/events`}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white border-0">
                {locale === 'en' ? 'View Club Events' : 'Voir les Événements'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
