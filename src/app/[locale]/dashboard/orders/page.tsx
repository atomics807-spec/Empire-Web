import Link from 'next/link'
import { Utensils, ChevronRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale, t } from '@/lib/i18n'

interface OrdersPageProps {
  params: Promise<{ locale: string }>
}

// Mock orders data
const mockOrders = [
  { id: 'ORD-001', date: '2026-08-05T14:30:00', total: 8500, status: 'completed', items: 3, type: 'dine-in', table: 'R3' },
  { id: 'ORD-002', date: '2026-08-03T19:45:00', total: 12500, status: 'completed', items: 5, type: 'takeaway' },
  { id: 'ORD-003', date: '2026-08-01T12:00:00', total: 6000, status: 'completed', items: 2, type: 'dine-in', table: 'R1' },
]

const statusConfig: Record<string, { label: { en: string; fr: string }; variant: 'warning' | 'info' | 'success' | 'default' | 'danger' }> = {
  pending: { label: { en: 'Pending', fr: 'En Attente' }, variant: 'warning' },
  paid: { label: { en: 'Paid', fr: 'Payé' }, variant: 'info' },
  preparing: { label: { en: 'Preparing', fr: 'En Préparation' }, variant: 'info' },
  ready: { label: { en: 'Ready', fr: 'Prêt' }, variant: 'success' },
  completed: { label: { en: 'Completed', fr: 'Terminé' }, variant: 'default' },
  cancelled: { label: { en: 'Cancelled', fr: 'Annulé' }, variant: 'danger' },
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} isAuthenticated />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {locale === 'en' ? 'My Orders' : 'Mes Commandes'}
            </h1>
            <p className="text-muted-foreground">
              {locale === 'en' ? 'View your order history' : 'Voir l\'historique de vos commandes'}
            </p>
          </div>
          <Link href={`/${locale}/restaurant/menu`}>
            <Button className="bg-restaurant-accent hover:bg-restaurant-accent/90">
              <Utensils className="h-4 w-4 mr-2" />
              {locale === 'en' ? 'New Order' : 'Nouvelle Commande'}
            </Button>
          </Link>
        </div>

        {mockOrders.length > 0 ? (
          <div className="space-y-4">
            {mockOrders.map(order => {
              const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
              return (
                <Link key={order.id} href={`/${locale}/dashboard/orders/${order.id}`}>
                  <Card className="hover:border-restaurant-accent transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-restaurant-accent/20 flex items-center justify-center">
                            <Utensils className="h-6 w-6 text-restaurant-accent" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">{order.id}</span>
                              <Badge variant={status.variant}>{status.label[locale as keyof typeof status.label]}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{order.items} {locale === 'en' ? 'items' : 'articles'}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(order.date).toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US')}
                              </span>
                              {order.type === 'dine-in' && (
                                <span>{locale === 'en' ? 'Table' : 'Table'} {order.table}</span>
                              )}
                              {order.type === 'takeaway' && (
                                <span>{locale === 'en' ? 'Takeaway' : 'À Emporter'}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-foreground">
                            {order.total.toLocaleString()} XAF
                          </span>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <Utensils className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {locale === 'en' ? 'No orders yet' : 'Aucune commande'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {locale === 'en' 
                  ? 'Start ordering from our menu'
                  : 'Commencez à commander depuis notre menu'}
              </p>
              <Link href={`/${locale}/restaurant/menu`}>
                <Button className="bg-restaurant-accent hover:bg-restaurant-accent/90">
                  {locale === 'en' ? 'Browse Menu' : 'Voir le Menu'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
