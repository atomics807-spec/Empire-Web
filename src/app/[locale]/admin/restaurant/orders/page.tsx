import Link from 'next/link'
import { Utensils, Clock, Search, Filter, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type Locale, t } from '@/lib/i18n'

interface AdminOrdersPageProps {
  params: Promise<{ locale: string }>
}

const mockOrders = [
  { id: 'ORD-001', customer: 'Marie N.', items: 3, total: 8500, status: 'preparing', time: '5 min ago', type: 'dine-in', table: 'R3' },
  { id: 'ORD-002', customer: 'John D.', items: 2, total: 6000, status: 'paid', time: '12 min ago', type: 'takeaway' },
  { id: 'ORD-003', customer: 'Grace M.', items: 4, total: 12000, status: 'ready', time: '18 min ago', type: 'dine-in', table: 'R1' },
  { id: 'ORD-004', customer: 'Paul K.', items: 1, total: 2000, status: 'paid', time: '25 min ago', type: 'takeaway' },
]

const statusConfig = {
  pending: { label: 'Pending', variant: 'warning' as const },
  paid: { label: 'Paid', variant: 'info' as const },
  preparing: { label: 'Preparing', variant: 'info' as const },
  ready: { label: 'Ready', variant: 'success' as const },
  completed: { label: 'Completed', variant: 'default' as const },
  cancelled: { label: 'Cancelled', variant: 'danger' as const },
}

export default async function AdminOrdersPage({ params }: AdminOrdersPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('admin.restaurantOrders', locale as Locale)}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'en' ? 'Manage restaurant orders' : 'Gérer les commandes du restaurant'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={locale === 'en' ? 'Search orders...' : 'Rechercher...'} className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {locale === 'en' ? 'Filter' : 'Filtrer'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>{locale === 'en' ? 'Active Orders' : 'Commandes Actives'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOrders.map(order => {
              const status = statusConfig[order.status as keyof typeof statusConfig]
              return (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-restaurant-accent/20 flex items-center justify-center">
                      <Utensils className="h-5 w-5 text-restaurant-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{order.id}</span>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{order.customer}</span>
                        <span>•</span>
                        <span>{order.items} items</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {order.time}
                        </span>
                        {order.table && <span>• Table {order.table}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-foreground">{order.total.toLocaleString()} XAF</span>
                    <Button size="sm" variant="outline">
                      {locale === 'en' ? 'View' : 'Voir'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
