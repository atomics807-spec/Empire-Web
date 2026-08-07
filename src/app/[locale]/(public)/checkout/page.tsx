'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Smartphone, CheckCircle, Clock, User, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/lib/cart/context'
import { formatPrice } from '@/lib/utils'

interface CheckoutPageProps {
  params: Promise<{ locale: string }>
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent params={params} />
    </Suspense>
  )
}

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-restaurant-accent border-t-transparent rounded-full" />
    </div>
  )
}

function CheckoutContent({ params }: CheckoutPageProps) {
  const router = useRouter()
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange' | 'express'>('mtn')
  const [phone, setPhone] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [orderRef, setOrderRef] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  
  const { items, subtotal, clearCart } = useCart()

  useEffect(() => {
    params.then(p => setLocale(p.locale as 'en' | 'fr'))
  }, [params])

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('empire-user')
      if (userData) {
        setIsAuthenticated(true)
      }
      setIsCheckingAuth(false)
    }
    const timer = setTimeout(checkAuth, 500)
    return () => clearTimeout(timer)
  }, [])

  // Calculate totals
  const fee = 500 // Takeaway fee
  const total = subtotal + fee

  // Redirect if cart is empty
  useEffect(() => {
    if (!isCheckingAuth && items.length === 0 && !isComplete) {
      router.push(`/${locale}/restaurant/menu`)
    }
  }, [isCheckingAuth, items.length, isComplete, locale, router])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const ref = `ORD-${Date.now().toString(36).toUpperCase()}`
    setOrderRef(ref)

    await new Promise(resolve => setTimeout(resolve, 3000))
    clearCart()
    setIsProcessing(false)
    setIsComplete(true)
  }

  // Auth required screen
  if (!isCheckingAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/restaurant/cart`} className="text-gray-500 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                {locale === 'en' ? 'Checkout' : 'Paiement'}
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? 'Sign in to continue' : 'Connectez-vous pour continuer'}
            </h1>
            <p className="text-gray-600 mb-8">
              {locale === 'en' 
                ? 'You need to sign in or create an account to complete your order.'
                : 'Vous devez vous connecter ou créer un compte pour terminer votre commande.'}
            </p>
            <div className="space-y-4">
              <Link href={`/${locale}/sign-in?redirect=/${locale}/checkout`}>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0">
                  {locale === 'en' ? 'Sign In' : 'Se Connecter'}
                </Button>
              </Link>
              <Link href={`/${locale}/sign-up?redirect=/${locale}/checkout`}>
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  {locale === 'en' ? 'Create Account' : 'Créer un Compte'}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              {locale === 'en' 
                ? 'You can browse our menu without signing in.'
                : 'Vous pouvez parcourir notre menu sans vous connecter.'}
            </p>
          </div>
        </main>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white shadow-lg border-orange-100">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {locale === 'en' ? 'Payment Successful!' : 'Paiement Réussi !'}
            </h1>
            <p className="text-gray-600 mb-4">
              {locale === 'en' 
                ? 'Your order has been confirmed'
                : 'Votre commande a été confirmée'}
            </p>
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">
                {locale === 'en' ? 'Order Reference' : 'Référence de Commande'}
              </p>
              <p className="text-xl font-bold text-gray-900">{orderRef}</p>
            </div>
            <div className="space-y-3">
              <Link href={`/${locale}/dashboard/orders/${orderRef}`}>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0">
                  {locale === 'en' ? 'View Order' : 'Voir la Commande'}
                </Button>
              </Link>
              <Link href={`/${locale}`}>
                <Button variant="outline" className="w-full border-gray-300">
                  {locale === 'en' ? 'Back to Home' : 'Retour à l\'Accueil'}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/restaurant/cart`} className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {locale === 'en' ? 'Checkout' : 'Paiement'}
              </h1>
              <p className="text-sm text-gray-500">
                {locale === 'en' ? 'Complete your payment' : 'Complétez votre paiement'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Order Summary with Cart Items */}
          <Card className="mb-6 border-orange-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-orange-600 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {locale === 'en' ? 'Order Summary' : 'Résumé de la Commande'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.name[locale]} × {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <span className="font-medium text-orange-600">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>{locale === 'en' ? 'Subtotal' : 'Sous-total'}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{locale === 'en' ? 'Packaging Fee' : "Frais d'emballage"}</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200">
                  <span className="text-gray-900">{locale === 'en' ? 'Total' : 'Total'}</span>
                  <span className="text-orange-600">{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="border-orange-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                {locale === 'en' ? 'Payment Method' : 'Mode de Paiement'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <Button
                    type="button"
                    variant={paymentMethod === 'mtn' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('mtn')}
                    className={paymentMethod === 'mtn' ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-0' : 'border-yellow-300 text-yellow-600 hover:bg-yellow-50'}
                  >
                    MTN
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === 'orange' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('orange')}
                    className={paymentMethod === 'orange' ? 'bg-orange-500 hover:bg-orange-600 text-white border-0' : 'border-orange-300 text-orange-600 hover:bg-orange-50'}
                  >
                    Orange
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === 'express' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('express')}
                    className={paymentMethod === 'express' ? 'bg-blue-500 hover:bg-blue-600 text-white border-0' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}
                  >
                    Express
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    {locale === 'en' ? 'Mobile Money Number' : 'Numéro Mobile Money'}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="6XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                  <p className="text-xs text-gray-500">
                    {locale === 'en' 
                      ? `Enter your ${paymentMethod.toUpperCase()} number`
                      : `Entrez votre numéro ${paymentMethod.toUpperCase()}`}
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900 font-medium">
                      {locale === 'en' ? 'Amount to Pay' : 'Montant à Payer'}
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      {locale === 'en' 
                        ? 'Waiting for payment confirmation...'
                        : 'En attente de confirmation de paiement...'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {locale === 'en' 
                        ? 'Please check your phone and approve the payment'
                        : 'Veuillez vérifier votre téléphone et approuver le paiement'}
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0"
                  disabled={!phone || isProcessing}
                  size="lg"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessing 
                    ? (locale === 'en' ? 'Processing...' : 'Traitement...')
                    : (locale === 'en' ? 'Pay Now' : 'Payer maintenant')
                  }
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              {locale === 'en' 
                ? '🔒 Your payment is secured by CamPay'
                : '🔒 Votre paiement est sécurisé par CamPay'}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
