'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, ShoppingBag, Clock, MapPin, ArrowLeft, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type Locale } from '@/lib/i18n'

// Mock cart state - in production, this would come from context/localStorage
const mockCartItems = [
  { id: '1', name: 'Grilled Tilapia', nameFr: 'Tilapia Grillé', price: 4500, quantity: 2 },
  { id: '2', name: 'Ndolè Fingers', nameFr: 'Doigts de Ndolé', price: 2000, quantity: 1 },
]

type OrderType = 'dine-in' | 'takeaway' | 'delivery'

interface CartPageProps {
  params: Promise<{ locale: string }>
}

export default function CartPage({ params }: CartPageProps) {
  const router = useRouter()
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [orderType, setOrderType] = useState<OrderType>('dine-in')
  const [tableNumber, setTableNumber] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [customerNote, setCustomerNote] = useState('')

  // Update locale when params resolve
  params.then(p => setLocale(p.locale as 'en' | 'fr'))

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const fee = orderType === 'takeaway' ? 500 : orderType === 'delivery' ? 1500 : 0
  const total = subtotal + fee

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : item
        }
        return item
      }).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    if (orderType === 'dine-in' && !tableNumber) {
      alert(locale === 'en' ? 'Please enter your table number' : 'Veuillez entrer votre numéro de table')
      return
    }
    if (orderType === 'delivery' && !deliveryAddress) {
      alert(locale === 'en' ? 'Please enter your delivery address' : 'Veuillez entrer votre adresse de livraison')
      return
    }
    router.push(`/${locale}/checkout`)
  }

  const orderTypeLabels = {
    'dine-in': { en: 'Dine-in', fr: 'Sur Place', icon: MapPin },
    'takeaway': { en: 'Takeaway', fr: 'À Emporter', icon: ShoppingBag },
    'delivery': { en: 'Delivery', fr: 'Livraison', icon: Truck },
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-surface sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/restaurant/menu`} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-xl font-semibold text-foreground">
                {locale === 'en' ? 'Your Cart' : 'Votre Panier'}
              </h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {locale === 'en' ? 'Your cart is empty' : 'Votre panier est vide'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {locale === 'en' 
              ? 'Add some delicious items from our menu'
              : 'Ajoutez de délicieux plats depuis notre menu'}
          </p>
          <Link href={`/${locale}/restaurant/menu`}>
            <Button className="bg-restaurant-accent hover:bg-restaurant-accent/90">
              {locale === 'en' ? 'Browse Menu' : 'Voir le Menu'}
            </Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/restaurant/menu`} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-semibold text-foreground">
              {locale === 'en' ? 'Your Cart' : 'Votre Panier'}
            </h1>
            <span className="ml-auto bg-restaurant-accent text-white text-xs font-bold px-2 py-1 rounded-full">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} {locale === 'en' ? 'items' : 'articles'}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {locale === 'en' ? item.name : item.nameFr}
                      </h3>
                      <p className="text-restaurant-accent font-medium">
                        {item.price.toLocaleString()} XAF
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-danger hover:bg-danger/10 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Order Summary' : 'Résumé de la Commande'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Type */}
                <div className="space-y-2">
                  <Label>{locale === 'en' ? 'Order Type' : 'Type de Commande'}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(orderTypeLabels) as OrderType[]).map(type => {
                      const { en, fr, icon: Icon } = orderTypeLabels[type]
                      return (
                        <Button
                          key={type}
                          variant={orderType === type ? 'default' : 'outline'}
                          onClick={() => setOrderType(type)}
                          className={`flex-col h-auto py-3 ${orderType === type ? 'bg-restaurant-accent' : ''}`}
                        >
                          <Icon className="h-5 w-5 mb-1" />
                          <span className="text-xs">{locale === 'en' ? en : fr}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Table Number for dine-in */}
                {orderType === 'dine-in' && (
                  <div className="space-y-2">
                    <Label htmlFor="table">{locale === 'en' ? 'Table Number' : 'Numéro de Table'}</Label>
                    <Input
                      id="table"
                      type="number"
                      placeholder="e.g., 5"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      min="1"
                      max="50"
                    />
                  </div>
                )}

                {/* Delivery Address */}
                {orderType === 'delivery' && (
                  <div className="space-y-2">
                    <Label htmlFor="address">{locale === 'en' ? 'Delivery Address' : 'Adresse de Livraison'}</Label>
                    <textarea
                      id="address"
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
                      rows={3}
                      placeholder={locale === 'en' 
                        ? 'Enter your full address with landmarks...'
                        : 'Entrez votre adresse complète avec repères...'}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      {locale === 'en' 
                        ? 'Delivery fee: 1,500 XAF. Delivery within Limbe.'
                        : 'Frais de livraison: 1 500 XAF. Livraison à Limbe.'}
                    </p>
                  </div>
                )}

                {/* Customer Note */}
                <div className="space-y-2">
                  <Label htmlFor="note">{locale === 'en' ? 'Special Instructions' : 'Instructions Spéciales'}</Label>
                  <textarea
                    id="note"
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-restaurant-accent"
                    rows={2}
                    placeholder={locale === 'en' ? 'Any allergies or special requests?' : 'Des allergies ou demandes spéciales?'}
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                  />
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{locale === 'en' ? 'Subtotal' : 'Sous-total'}</span>
                    <span>{subtotal.toLocaleString()} XAF</span>
                  </div>
                  {fee > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>
                        {orderType === 'takeaway' 
                          ? (locale === 'en' ? 'Packaging Fee' : 'Frais d\'emballage')
                          : (locale === 'en' ? 'Delivery Fee' : 'Frais de livraison')
                        }
                      </span>
                      <span>{fee.toLocaleString()} XAF</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-foreground pt-2">
                    <span>{locale === 'en' ? 'Total' : 'Total'}</span>
                    <span>{total.toLocaleString()} XAF</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-restaurant-accent hover:bg-restaurant-accent/90"
                  onClick={handleCheckout}
                >
                  {locale === 'en' ? 'Proceed to Payment' : 'Procéder au Paiement'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
