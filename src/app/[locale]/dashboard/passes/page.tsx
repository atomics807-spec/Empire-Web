import Link from 'next/link'
import { Ticket, Calendar, Clock, Download, QrCode, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale, t } from '@/lib/i18n'

interface PassesPageProps {
  params: Promise<{ locale: string }>
}

// Mock passes data
const mockPasses = [
  { id: 'PASS-001', event: 'Saturday Night Fever', date: '2026-08-15', time: '21:00', type: 'VIP Access', status: 'valid', qrCode: true },
  { id: 'PASS-002', event: 'Afro Beats Night', date: '2026-08-22', time: '22:00', type: 'General Entry', status: 'valid', qrCode: true },
]

const statusConfig: Record<string, { label: { en: string; fr: string }; variant: 'success' | 'default' | 'warning' | 'danger' }> = {
  valid: { label: { en: 'Valid', fr: 'Valide' }, variant: 'success' },
  checked_in: { label: { en: 'Used', fr: 'Utilisé' }, variant: 'default' },
  expired: { label: { en: 'Expired', fr: 'Expiré' }, variant: 'warning' },
  revoked: { label: { en: 'Revoked', fr: 'Révoqué' }, variant: 'danger' },
}

export default async function PassesPage({ params }: PassesPageProps) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} isAuthenticated />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {locale === 'en' ? 'My Passes' : 'Mes Passes'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'en' 
              ? 'Your digital entry passes for events'
              : 'Vos passes d\'entrée numériques pour les événements'}
          </p>
        </div>

        {mockPasses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {mockPasses.map(pass => {
              const status = statusConfig[pass.status as keyof typeof statusConfig] || statusConfig.valid
              return (
                <Link key={pass.id} href={`/${locale}/dashboard/passes/${pass.id}`}>
                  <Card className="overflow-hidden hover:border-club-accent transition-colors cursor-pointer">
                    {/* Pass Header */}
                    <div className="bg-gradient-to-r from-club-accent to-pink-600 p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-white/20 text-white">{pass.type}</Badge>
                        <Badge variant={status.variant}>{status.label[locale as keyof typeof status.label]}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{pass.event}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(pass.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {pass.time}
                        </span>
                      </div>
                    </div>

                    {/* Pass Body */}
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* QR Code Placeholder */}
                          <div className="w-20 h-20 bg-surface-elevated rounded-lg flex items-center justify-center">
                            <QrCode className="h-10 w-10 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Pass ID' : 'ID du Pass'}</p>
                            <p className="font-mono font-medium text-foreground">{pass.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
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
                {locale === 'en' ? 'No passes yet' : 'Aucun pass'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {locale === 'en' 
                  ? 'Purchase tickets to get your digital passes'
                  : 'Achetez des billets pour obtenir vos passes numériques'}
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
