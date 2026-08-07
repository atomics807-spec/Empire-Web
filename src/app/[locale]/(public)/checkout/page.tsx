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
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-surface sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/restaurant/cart`} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-xl font-semibold text-foreground">
                {locale === 'en' ? 'Checkout' : 'Paiement'}
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-restaurant-accent/20 flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-restaurant-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {locale === 'en' ? 'Sign in to continue' : 'Connectez-vous pour continuer'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {locale === 'en' 
                ? 'You need to sign in or create an account to complete your order.'
                : 'Vous devez vous connecter ou créer un compte pour terminer votre commande.'}
            </p>
            <div className="space-y-4">
              <Link href={`/${locale}/sign-in?redirect=/${locale}/checkout`}>
                <Button className="w-full btn-restaurant">
                  {locale === 'en' ? 'Sign In' : 'Se Connecter'}
                </Button>
              </Link>
              <Link href={`/${locale}/sign-up?redirect=/${locale}/checkout`}>
                <Button variant="outline" className="w-full border-restaurant-accent text-restaurant-accent">
                  {locale === 'en' ? 'Create Account' : 'Créer un Compte'}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {locale === 'en' ? 'Payment Successful!' : 'Paiement Réussi !'}
            </h1>
            <p className="text-muted-foreground mb-4">
              {locale === 'en' 
                ? 'Your order has been confirmed'
                : 'Votre commande a été confirmée'}
            </p>
            <div className="bg-surface-elevated p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Order Reference' : 'Référence de Commande'}
              </p>
              <p className="text-xl font-bold text-foreground">{orderRef}</p>
            </div>
            <div className="space-y-3">
              <Link href={`/${locale}/dashboard/orders/${orderRef}`}>
                <Button className="w-full btn-restaurant">
                  {locale === 'en' ? 'View Order' : 'Voir la Commande'}
                </Button>
              </Link>
              <Link href={`/${locale}`}>
                <Button variant="outline" className="w-full">
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/restaurant/cart`} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {locale === 'en' ? 'Checkout' : 'Paiement'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Complete your payment' : 'Complétez votre paiement'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Order Summary with Cart Items */}
          <Card className="mb-6 border-restaurant-accent/30">
            <CardHeader>
              <CardTitle className="text-restaurant-accent flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                {locale === 'en' ? 'Order Summary' : 'Résumé de la Commande'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Cart Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {item.name[locale]} × {item.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <span className="font-medium text-restaurant-accent">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>{locale === 'en' ? 'Subtotal' : 'Sous-total'}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{locale === 'en' ? 'Packaging Fee' : "Frais d'emballage"}</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-border">
                  <span>{locale === 'en' ? 'Total' : 'Total'}</span>
                  <span className="text-restaurant-accent">{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="border-restaurant-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
                    className={paymentMethod === 'mtn' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10'}
                  >
                    MTN
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === 'orange' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('orange')}
                    className={paymentMethod === 'orange' ? 'bg-orange-500 hover:bg-orange-600' : 'border-orange-500/50 text-orange-500 hover:bg-orange-500/10'}
                  >
                    Orange
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === 'express' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('express')}
                    className={paymentMethod === 'express' ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-500/50 text-blue-500 hover:bg-blue-500/10'}
                  >
                    Express
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {locale === 'en' ? 'Mobile Money Number' : 'Numéro Mobile Money'}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="6XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="border-restaurant-accent/30 focus:border-restaurant-accent"
                  />
                  <p className="text-xs text-muted-foreground">
                    {locale === 'en' 
                      ? `Enter your ${paymentMethod.toUpperCase()} number`
                      : `Entrez votre numéro ${paymentMethod.toUpperCase()}`}
                  </p>
                </div>

                <div className="bg-restaurant-accent/10 border border-restaurant-accent/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">
                      {locale === 'en' ? 'Amount to Pay' : 'Montant à Payer'}
                    </span>
                    <span className="text-2xl font-bold text-restaurant-accent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 border-4 border-restaurant-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      {locale === 'en' 
                        ? 'Waiting for payment confirmation...'
                        : 'En attente de confirmation de paiement...'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {locale === 'en' 
                        ? 'Please check your phone and approve the payment'
                        : 'Veuillez vérifier votre téléphone et approuver le paiement'}
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full btn-restaurant"
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

          <div className="mt-6 text-center text-sm text-muted-foreground">
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
