import Link from 'next/link'
import { Utensils, Calendar, Ticket, CreditCard, User, ChevronRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale, t } from '@/lib/i18n'

interface DashboardPageProps {
  params: Promise<{ locale: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params

  // Mock user data - in production, fetch from session
  const user = {
    name: 'Guest User',
    email: 'guest@example.com',
  }

  // Mock recent activity
  const recentOrders = [
    { id: 'ORD-001', date: '2026-08-05', total: 8500, status: 'completed', items: 3 },
    { id: 'ORD-002', date: '2026-08-03', total: 12500, status: 'completed', items: 5 },
  ]

  const upcomingEvents = [
    { id: '1', name: 'Saturday Night Fever', date: '2026-08-15', tickets: 2 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} isAuthenticated />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {locale === 'en' ? 'Welcome back' : 'Bon retour'}, {user.name}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'en' 
              ? 'Manage your orders, reservations, and passes'
              : 'Gérez vos commandes, réservations et passes'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href={`/${locale}/restaurant/menu`}>
            <Card className="cursor-pointer hover:border-restaurant-accent transition-colors">
              <CardContent className="p-4 text-center">
                <Utensils className="h-8 w-8 mx-auto mb-2 text-restaurant-accent" />
                <p className="font-medium text-foreground">
                  {locale === 'en' ? 'Order Food' : 'Commander'}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/${locale}/events`}>
            <Card className="cursor-pointer hover:border-club-accent transition-colors">
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-club-accent" />
                <p className="font-medium text-foreground">
                  {locale === 'en' ? 'Buy Tickets' : 'Billets'}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/${locale}/dashboard/reservations`}>
            <Card className="cursor-pointer hover:border-club-accent transition-colors">
              <CardContent className="p-4 text-center">
                <Ticket className="h-8 w-8 mx-auto mb-2 text-club-accent" />
                <p className="font-medium text-foreground">
                  {locale === 'en' ? 'Reservations' : 'Réservations'}
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/${locale}/dashboard/passes`}>
            <Card className="cursor-pointer hover:border-vip-gold transition-colors">
              <CardContent className="p-4 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-vip-gold" />
                <p className="font-medium text-foreground">
                  {locale === 'en' ? 'My Passes' : 'Mes Passes'}
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{locale === 'en' ? 'Recent Orders' : 'Commandes Récentes'}</CardTitle>
                <Link href={`/${locale}/dashboard/orders`}>
                  <Button variant="ghost" size="sm">
                    {locale === 'en' ? 'View All' : 'Voir Tout'}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map(order => (
                      <Link key={order.id} href={`/${locale}/dashboard/orders/${order.id}`}>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-surface-elevated hover:bg-surface transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-restaurant-accent/20 flex items-center justify-center">
                              <Utensils className="h-5 w-5 text-restaurant-accent" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.items} items • {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">{order.total.toLocaleString()} XAF</p>
                            <Badge variant="success" size="sm">{order.status}</Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Utensils className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{locale === 'en' ? 'No orders yet' : 'Aucune commande'}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Upcoming Events' : 'Événements à Venir'}</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-club-accent/20 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-club-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{event.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()} • {event.tickets} tickets
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {locale === 'en' ? 'No upcoming events' : 'Aucun événement à venir'}
                  </p>
                )}
                <Link href={`/${locale}/events`} className="block mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    {locale === 'en' ? 'Browse Events' : 'Voir les Événements'}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {locale === 'en' ? 'Profile' : 'Profil'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Email' : 'Email'}</p>
                    <p className="font-medium text-foreground">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Phone' : 'Téléphone'}</p>
                    <p className="font-medium text-foreground">+237 6XX XXX XXX</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {locale === 'en' ? 'Edit Profile' : 'Modifier le Profil'}
                  </Button>
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
