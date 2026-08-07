import Link from 'next/link'
import { 
  Utensils,
  Calendar,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale, t } from '@/lib/i18n'

interface AdminPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminDashboardPage({ params }: AdminPageProps) {
  const { locale } = await params

  const stats = [
    { label: 'Orders Today', value: '24', change: '+12%', trend: 'up', icon: Utensils },
    { label: 'Revenue Today', value: '185,000 XAF', change: '+8%', trend: 'up', icon: CreditCard },
    { label: 'Upcoming Events', value: '3', change: '0', trend: 'neutral', icon: Calendar },
    { label: 'Active Tables', value: '8/12', change: '', trend: 'neutral', icon: Users },
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: 'Marie N.', items: 3, total: 8500, status: 'preparing', time: '5 min ago' },
    { id: 'ORD-002', customer: 'John D.', items: 2, total: 6000, status: 'paid', time: '12 min ago' },
    { id: 'ORD-003', customer: 'Grace M.', items: 4, total: 12000, status: 'ready', time: '18 min ago' },
    { id: 'ORD-004', customer: 'Paul K.', items: 1, total: 2000, status: 'paid', time: '25 min ago' },
  ]

  const adminLinks = [
    { href: `/${locale}/admin/restaurant/orders`, icon: Utensils, label: t('admin.orders', locale as Locale), color: 'text-restaurant-accent' },
    { href: `/${locale}/admin/restaurant/menu`, icon: Utensils, label: t('admin.menu', locale as Locale), color: 'text-restaurant-accent' },
    { href: `/${locale}/admin/events`, icon: Calendar, label: t('admin.events', locale as Locale), color: 'text-club-accent' },
    { href: `/${locale}/admin/reservations`, icon: Users, label: t('admin.reservations', locale as Locale), color: 'text-club-accent' },
    { href: `/${locale}/admin/tickets`, icon: CreditCard, label: t('admin.tickets', locale as Locale), color: 'text-club-accent' },
    { href: `/${locale}/admin/customers`, icon: Users, label: t('admin.customers', locale as Locale), color: 'text-foreground' },
    { href: `/${locale}/admin/reports`, icon: BarChart3, label: t('admin.reports', locale as Locale), color: 'text-foreground' },
    { href: `/${locale}/admin/settings`, icon: Settings, label: t('admin.settings', locale as Locale), color: 'text-foreground' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} isAuthenticated />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('admin.dashboard', locale as Locale)}
            </h1>
            <p className="text-muted-foreground">
              {locale === 'en' ? 'Welcome back! Here\'s your overview.' : 'Bon retour ! Voici votre aperçu.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">
              <Clock className="h-3 w-3 mr-1" />
              {locale === 'en' ? 'Live' : 'En direct'}
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.label.includes('Restaurant') || stat.label.includes('Orders') ? 'text-restaurant-accent' : 'text-club-accent'}`} />
                  </div>
                  {stat.change && (
                    <span className={`text-sm font-medium flex items-center gap-1 ${
                      stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-danger' : 'text-muted-foreground'
                    }`}>
                      {stat.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                      {stat.trend === 'down' && <TrendingDown className="h-4 w-4" />}
                      {stat.change}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Admin Links */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Quick Actions' : 'Actions Rapides'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {adminLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <div className="p-4 rounded-lg border border-border hover:border-primary hover:bg-surface-elevated transition-all cursor-pointer text-center group">
                        <link.icon className={`h-6 w-6 mx-auto mb-2 ${link.color} group-hover:scale-110 transition-transform`} />
                        <span className="text-sm font-medium text-foreground">{link.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{locale === 'en' ? 'Recent Orders' : 'Commandes Récentes'}</CardTitle>
                <Link href={`/${locale}/admin/restaurant/orders`}>
                  <Button variant="ghost" size="sm">
                    {locale === 'en' ? 'View All' : 'Voir Tout'}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                          <Utensils className="h-5 w-5 text-restaurant-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{order.total.toLocaleString()} XAF</p>
                        <Badge 
                          variant={
                            order.status === 'ready' ? 'success' : 
                            order.status === 'preparing' ? 'info' : 
                            order.status === 'paid' ? 'warning' : 'default'
                          }
                          size="sm"
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{order.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t('admin.notifications', locale as Locale)}</CardTitle>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                    <p className="text-sm text-warning font-medium">Restaurant closing in 30 minutes</p>
                    <p className="text-xs text-muted-foreground">17:00</p>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                    <p className="text-sm text-success font-medium">New ticket sales: 15</p>
                    <p className="text-xs text-muted-foreground">Saturday Night Fever</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Today\'s Schedule' : 'Programme du Jour'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-restaurant-accent">08:00</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{locale === 'en' ? 'Restaurant Opens' : 'Restaurant Ouvert'}</p>
                      <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Breakfast service begins' : 'Service petit-déjeuner'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-warning">17:30</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{locale === 'en' ? 'Restaurant Closes' : 'Restaurant Ferme'}</p>
                      <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Last orders taken' : 'Dernières commandes'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-club-accent">20:00</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{locale === 'en' ? 'Club Opens' : 'Boîte Ouverte'}</p>
                      <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Doors open for Saturday Night Fever' : 'Portes ouvertes'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
