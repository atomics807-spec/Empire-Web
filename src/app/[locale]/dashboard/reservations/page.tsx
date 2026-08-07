import Link from 'next/link'
import { Calendar, Ticket, ChevronRight, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale, t } from '@/lib/i18n'

interface ReservationsPageProps {
  params: Promise<{ locale: string }>
}

// Mock reservations data
const mockReservations = [
  { id: 'RES-001', event: 'Saturday Night Fever', date: '2026-08-15', guests: 4, table: 'VIP Table 1', deposit: 75000, status: 'confirmed' },
  { id: 'RES-002', event: 'Afro Beats Night', date: '2026-08-22', guests: 2, deposit: 0, status: 'pending' },
]

const statusConfig: Record<string, { label: { en: string; fr: string }; variant: 'warning' | 'success' | 'info' | 'danger' | 'default' }> = {
  pending: { label: { en: 'Pending', fr: 'En Attente' }, variant: 'warning' },
  confirmed: { label: { en: 'Confirmed', fr: 'Confirmé' }, variant: 'success' },
  checked_in: { label: { en: 'Checked In', fr: 'Entré' }, variant: 'info' },
  cancelled: { label: { en: 'Cancelled', fr: 'Annulé' }, variant: 'danger' },
  expired: { label: { en: 'Expired', fr: 'Expiré' }, variant: 'default' },
}

export default async function ReservationsPage({ params }: ReservationsPageProps) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} isAuthenticated />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {locale === 'en' ? 'My Reservations' : 'Mes Réservations'}
            </h1>
            <p className="text-muted-foreground">
              {locale === 'en' ? 'View your table reservations' : 'Voir vos réservations de tables'}
            </p>
          </div>
          <Link href={`/${locale}/events`}>
            <Button className="bg-club-accent hover:bg-club-accent/90">
              <Calendar className="h-4 w-4 mr-2" />
              {locale === 'en' ? 'Book Event' : 'Réserver'}
            </Button>
          </Link>
        </div>

        {mockReservations.length > 0 ? (
          <div className="space-y-4">
            {mockReservations.map(res => {
              const status = statusConfig[res.status as keyof typeof statusConfig] || statusConfig.pending
              return (
                <Link key={res.id} href={`/${locale}/dashboard/reservations/${res.id}`}>
                  <Card className="hover:border-club-accent transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-club-accent/20 flex items-center justify-center">
                            <Ticket className="h-6 w-6 text-club-accent" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-foreground">{res.event}</span>
                              <Badge variant={status.variant}>{status.label[locale as keyof typeof status.label]}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{new Date(res.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US')}</span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {res.guests} {locale === 'en' ? 'guests' : 'invités'}
                              </span>
                              {res.table && <span>{res.table}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            {res.deposit > 0 ? (
                              <>
                                <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Deposit Paid' : 'Acompte Payé'}</p>
                                <p className="font-bold text-foreground">{res.deposit.toLocaleString()} XAF</p>
                              </>
                            ) : (
                              <p className="font-bold text-success">{locale === 'en' ? 'FREE' : 'GRATUIT'}</p>
                            )}
                          </div>
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
              <Ticket className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {locale === 'en' ? 'No reservations yet' : 'Aucune réservation'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {locale === 'en' 
                  ? 'Book a table for your next night out'
                  : 'Réservez une table pour votre prochaine sortie'}
              </p>
              <Link href={`/${locale}/events`}>
                <Button className="bg-club-accent hover:bg-club-accent/90">
                  {locale === 'en' ? 'Browse Events' : 'Voir les Événements'}
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
