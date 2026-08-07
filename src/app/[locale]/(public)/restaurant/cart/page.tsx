'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2, ShoppingBag, MapPin, ArrowLeft, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/lib/cart/context'
import { formatPrice } from '@/lib/utils'
import { getBilingualContent } from '@/lib/i18n'

type OrderType = 'dine-in' | 'takeaway' | 'delivery'

interface CartPageProps {
  params: Promise<{ locale: string }>
}

export default function CartPage({ params }: CartPageProps) {
  const router = useRouter()
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const [orderType, setOrderType] = useState<OrderType>('dine-in')
  const [tableNumber, setTableNumber] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [customerNote, setCustomerNote] = useState('')
  const { items, updateQuantity, removeItem, subtotal } = useCart()

  params.then(p => setLocale(p.locale as 'en' | 'fr'))

  const fee = orderType === 'takeaway' ? 500 : orderType === 'delivery' ? 1500 : 0
  const total = subtotal + fee

  const handleCheckout = () => {
    if (items.length === 0) return
    
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

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/restaurant/menu`} className="text-gray-500 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                {locale === 'en' ? 'Your Cart' : 'Votre Panier'}
              </h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {locale === 'en' ? 'Your cart is empty' : 'Votre panier est vide'}
          </h2>
          <p className="text-gray-500 mb-8">
            {locale === 'en' 
              ? 'Add some delicious items from our menu'
              : 'Ajoutez de délicieux plats depuis notre menu'}
          </p>
          <Link href={`/${locale}/restaurant/menu`}>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white border-0">
              {locale === 'en' ? 'Browse Menu' : 'Voir le Menu'}
            </Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/restaurant/menu`} className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              {locale === 'en' ? 'Your Cart' : 'Votre Panier'}
            </h1>
            <span className="ml-auto bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {itemCount} {locale === 'en' ? 'items' : 'articles'}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <Card key={item.id} className="border-orange-100 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {getBilingualContent(item.name, locale)}
                      </h3>
                      <p className="text-orange-600 font-bold">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {item.instructions && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                      {item.instructions}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-orange-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-orange-600">{locale === 'en' ? 'Order Summary' : 'Résumé de la Commande'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Type */}
                <div className="space-y-2">
                  <Label className="text-gray-700">{locale === 'en' ? 'Order Type' : 'Type de Commande'}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(orderTypeLabels) as OrderType[]).map(type => {
                      const { en, fr, icon: Icon } = orderTypeLabels[type]
                      return (
                        <Button
                          key={type}
                          variant={orderType === type ? 'default' : 'outline'}
                          onClick={() => setOrderType(type)}
                          className={`flex-col h-auto py-3 transition-all ${orderType === type ? 'bg-orange-600 hover:bg-orange-700 text-white border-0' : 'border-orange-200 text-orange-600 hover:bg-orange-50'}`}
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
                    <Label htmlFor="table" className="text-gray-700">{locale === 'en' ? 'Table Number' : 'Numéro de Table'}</Label>
                    <Input
                      id="table"
                      type="number"
                      placeholder="e.g., 5"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      min="1"
                      max="50"
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                )}

                {/* Delivery Address */}
                {orderType === 'delivery' && (
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700">{locale === 'en' ? 'Delivery Address' : 'Adresse de Livraison'}</Label>
                    <textarea
                      id="address"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                      placeholder={locale === 'en' 
                        ? 'Enter your full address with landmarks...'
                        : 'Entrez votre adresse complète avec repères...'}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      {locale === 'en' 
                        ? 'Delivery fee: 1,500 XAF. Delivery within Limbe.'
                        : 'Frais de livraison: 1 500 XAF. Livraison à Limbe.'}
                    </p>
                  </div>
                )}

                {/* Customer Note */}
                <div className="space-y-2">
                  <Label htmlFor="note" className="text-gray-700">{locale === 'en' ? 'Special Instructions' : 'Instructions Spéciales'}</Label>
                  <textarea
                    id="note"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={2}
                    placeholder={locale === 'en' ? 'Any allergies or special requests?' : 'Des allergies ou demandes spéciales?'}
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                  />
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>{locale === 'en' ? 'Subtotal' : 'Sous-total'}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {fee > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>
                        {orderType === 'takeaway' 
                          ? (locale === 'en' ? 'Packaging Fee' : "Frais d'emballage")
                          : (locale === 'en' ? 'Delivery Fee' : 'Frais de livraison')
                        }
                      </span>
                      <span>{formatPrice(fee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                    <span>{locale === 'en' ? 'Total' : 'Total'}</span>
                    <span className="text-orange-600">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0"
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
