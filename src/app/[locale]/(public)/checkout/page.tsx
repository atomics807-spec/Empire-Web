'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Smartphone, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

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
      <div className="animate-spin w-8 h-8 border-4 border-club-accent border-t-transparent rounded-full" />
    </div>
  )
}

function CheckoutContent({ params }: CheckoutPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange' | 'express'>('mtn')
  const [phone, setPhone] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [orderRef, setOrderRef] = useState('')

  useEffect(() => {
    params.then(p => setLocale(p.locale as 'en' | 'fr'))
  }, [params])

  // Mock order data based on URL params
  const orderType = searchParams.get('type') || 'restaurant'
  const total = 12500 // Mock total
  const itemName = orderType === 'restaurant' ? 'Restaurant Order' : 'Event Ticket'

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Generate order reference
    const ref = `ORD-${Date.now().toString(36).toUpperCase()}`
    setOrderRef(ref)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    // In production, this would:
    // 1. Call payment API
    // 2. Wait for webhook confirmation
    // 3. Update database
    // 4. Generate pass QR code

    setIsProcessing(false)
    setIsComplete(true)
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
                <Button className="w-full">
                  {locale === 'en' ? 'View Order' : 'Voir la Commande'}
                </Button>
              </Link>
              <Link href={`/${locale}/dashboard/passes`}>
                <Button variant="outline" className="w-full">
                  {locale === 'en' ? 'View My Pass' : 'Voir Mon Pass'}
                </Button>
              </Link>
              <Link href={`/${locale}`}>
                <Button variant="ghost" className="w-full">
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
          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{locale === 'en' ? 'Order Summary' : 'Résumé de la Commande'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{itemName}</span>
                  <span className="font-medium">{total.toLocaleString()} XAF</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-club-accent">{total.toLocaleString()} XAF</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                {locale === 'en' ? 'Payment Method' : 'Mode de Paiement'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                {/* Mobile Money Options */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <Button
                    type="button"
                    variant={paymentMethod === 'mtn' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('mtn')}
                    className={paymentMethod === 'mtn' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                  >
                    MTN
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === 'orange' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('orange')}
                    className={paymentMethod === 'orange' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  >
                    Orange
                  </Button>
                  <Button
                    type="button"
                    variant={paymentMethod === 'express' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('express')}
                    className={paymentMethod === 'express' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                  >
                    Express
                  </Button>
                </div>

                {/* Phone Number */}
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
                  />
                  <p className="text-xs text-muted-foreground">
                    {locale === 'en' 
                      ? `Enter your ${paymentMethod.toUpperCase()} number`
                      : `Entrez votre numéro ${paymentMethod.toUpperCase()}`}
                  </p>
                </div>

                {/* Amount Confirmation */}
                <div className="bg-surface-elevated p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">
                      {locale === 'en' ? 'Amount to Pay' : 'Montant à Payer'}
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {total.toLocaleString()} XAF
                    </span>
                  </div>
                </div>

                {/* Processing State */}
                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 border-4 border-club-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
                  className="w-full bg-club-accent hover:bg-club-accent/90"
                  disabled={!phone || isProcessing}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessing 
                    ? (locale === 'en' ? 'Processing...' : 'Traitement...')
                    : (locale === 'en' ? 'Pay Now' : 'Payer Maintenant')
                  }
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Note */}
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
