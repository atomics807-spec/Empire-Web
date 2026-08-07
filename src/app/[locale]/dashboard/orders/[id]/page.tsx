import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Utensils, Clock, MapPin, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale, t } from '@/lib/i18n'

interface OrderDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

// Mock order data
const mockOrders: Record<string, {
  id: string
  date: string
  total: number
  status: string
  items: { name: string; nameFr: string; quantity: number; price: number }[]
  type: string
  table?: string
  note?: string
}> = {
  'ORD-001': {
    id: 'ORD-001',
    date: '2026-08-05T14:30:00',
    total: 8500,
    status: 'completed',
    type: 'dine-in',
    table: 'R3',
    items: [
      { name: 'Grilled Tilapia', nameFr: 'Tilapia Grillé', quantity: 1, price: 4500 },
      { name: 'Ndolè Fingers', nameFr: 'Doigts de Ndolé', quantity: 2, price: 2000 },
    ],
  },
}

const statusConfig: Record<string, { label: { en: string; fr: string }; variant: 'warning' | 'info' | 'success' | 'default' | 'danger' }> = {
  pending: { label: { en: 'Pending Payment', fr: 'En Attente de Paiement' }, variant: 'warning' },
  paid: { label: { en: 'Paid', fr: 'Payé' }, variant: 'info' },
  preparing: { label: { en: 'Preparing', fr: 'En Préparation' }, variant: 'info' },
  ready: { label: { en: 'Ready', fr: 'Prêt' }, variant: 'success' },
  completed: { label: { en: 'Completed', fr: 'Terminé' }, variant: 'default' },
  cancelled: { label: { en: 'Cancelled', fr: 'Annulé' }, variant: 'danger' },
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { locale, id } = await params
  const order = mockOrders[id]

  if (!order) {
    notFound()
  }

  const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
  const isFrench = locale === 'fr'

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} isAuthenticated />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href={`/${locale}/dashboard/orders`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          {locale === 'en' ? 'Back to Orders' : 'Retour aux Commandes'}
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-restaurant-accent" />
                    {order.id}
                  </CardTitle>
                                      <Badge variant={status.variant}>{status.label[locale as keyof typeof status.label]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Date & Time' : 'Date et Heure'}</p>
                      <p className="font-medium text-foreground">
                        {new Date(order.date).toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {order.type === 'dine-in' ? (
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Utensils className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Order Type' : 'Type'}</p>
                      <p className="font-medium text-foreground">
                        {order.type === 'dine-in' 
                          ? `${locale === 'en' ? 'Dine-in' : 'Sur Place'} (${locale === 'en' ? 'Table' : 'Table'} ${order.table})`
                          : (locale === 'en' ? 'Takeaway' : 'À Emporter')
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    {locale === 'en' ? 'Order Items' : 'Articles Commandés'}
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center text-muted-foreground">
                            {item.quantity}x
                          </span>
                          <span className="font-medium text-foreground">
                            {isFrench ? item.nameFr : item.name}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">
                          {(item.price * item.quantity).toLocaleString()} XAF
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-lg font-semibold text-foreground">
                    {locale === 'en' ? 'Total' : 'Total'}
                  </span>
                  <span className="text-2xl font-bold text-restaurant-accent">
                    {order.total.toLocaleString()} XAF
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {order.status === 'completed' && (
              <div className="flex gap-4">
                <Link href={`/${locale}/restaurant/menu`} className="flex-1">
                  <Button className="w-full bg-restaurant-accent hover:bg-restaurant-accent/90">
                    {locale === 'en' ? 'Order Again' : 'Commander à Nouveau'}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Need Help?' : 'Besoin d\'Aide?'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' 
                    ? 'If you have any questions about your order, please contact us.'
                    : 'Si vous avez des questions concernant votre commande, contactez-nous.'}
                </p>
                <Button variant="outline" className="w-full">
                  {locale === 'en' ? 'Contact Support' : 'Contacter le Support'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
