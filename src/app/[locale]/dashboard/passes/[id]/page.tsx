import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, QrCode, Calendar, Clock, MapPin, Download, Share2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

interface PassDetailPageProps {
  params: Promise<{ locale: string; id: string }>
}

// Mock pass data
const mockPasses: Record<string, {
  id: string
  event: string
  eventSlug: string
  date: string
  time: string
  venue: string
  type: string
  guestName: string
  guests: number
  status: string
  issuedAt: string
  checkedInAt?: string
}> = {
  'PASS-001': {
    id: 'PASS-001',
    event: 'Saturday Night Fever',
    eventSlug: 'saturday-night-fever',
    date: '2026-08-15',
    time: '21:00',
    venue: 'Empire Night Club',
    type: 'VIP Access',
    guestName: 'John Doe',
    guests: 4,
    status: 'valid',
    issuedAt: '2026-08-01T10:00:00',
  },
}

const statusConfig: Record<string, { label: { en: string; fr: string }; icon: React.ElementType; color: string; bgColor: string }> = {
  valid: { label: { en: 'Valid', fr: 'Valide' }, icon: CheckCircle, color: 'text-success', bgColor: 'bg-success/20' },
  checked_in: { label: { en: 'Checked In', fr: 'Entré' }, icon: CheckCircle, color: 'text-info', bgColor: 'bg-info/20' },
  expired: { label: { en: 'Expired', fr: 'Expiré' }, icon: AlertCircle, color: 'text-warning', bgColor: 'bg-warning/20' },
  revoked: { label: { en: 'Revoked', fr: 'Révoqué' }, icon: XCircle, color: 'text-danger', bgColor: 'bg-danger/20' },
}

export default async function PassDetailPage({ params }: PassDetailPageProps) {
  const { locale, id } = await params
  const pass = mockPasses[id]

  if (!pass) {
    notFound()
  }

  const status = statusConfig[pass.status as keyof typeof statusConfig] || statusConfig.valid
  const StatusIcon = status.icon
  const isFrench = locale === 'fr'

  return (
    <div className="min-h-screen bg-background">
      <Header locale={locale as Locale} isAuthenticated />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href={`/${locale}/dashboard/passes`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          {locale === 'en' ? 'Back to Passes' : 'Retour aux Passes'}
        </Link>

        {/* Pass Card */}
        <Card className="max-w-lg mx-auto overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-club-accent to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <StatusIcon className="h-5 w-5" />
                <span className="font-semibold">{status.label[locale as keyof typeof status.label]}</span>
              </div>
              <Badge className="bg-white/20 text-white">{pass.type}</Badge>
            </div>
            <h1 className="text-2xl font-bold mb-2">{pass.event}</h1>
            <div className="space-y-2 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(pass.date).toLocaleDateString(isFrench ? 'fr-FR' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{pass.time} - 06:00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{pass.venue}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className={`w-48 h-48 mx-auto ${status.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                <QrCode className={`h-24 w-24 ${status.color}`} />
              </div>
              <p className="font-mono text-lg text-foreground">{pass.id}</p>
            </div>

            {/* Guest Info */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'en' ? 'Guest Name' : 'Nom de l\'Invité'}</span>
                <span className="font-medium text-foreground">{pass.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'en' ? 'Number of Guests' : 'Nombre d\'Invités'}</span>
                <span className="font-medium text-foreground">{pass.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'en' ? 'Issued' : 'Émis'}</span>
                <span className="font-medium text-foreground">
                  {new Date(pass.issuedAt).toLocaleString(isFrench ? 'fr-FR' : 'en-US')}
                </span>
              </div>
              {pass.checkedInAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{locale === 'en' ? 'Checked In' : 'Entré'}</span>
                  <span className="font-medium text-info">
                    {new Date(pass.checkedInAt).toLocaleString(isFrench ? 'fr-FR' : 'en-US')}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                {locale === 'en' ? 'Download PDF' : 'Télécharger PDF'}
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                {locale === 'en' ? 'Share' : 'Partager'}
              </Button>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 rounded-lg bg-surface-elevated">
              <p className="text-sm text-muted-foreground text-center">
                {locale === 'en' 
                  ? 'Show this QR code at the entrance. Valid for one-time entry only.'
                  : 'Montrez ce code QR à l\'entrée. Valide pour une seule entrée.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  )
}
