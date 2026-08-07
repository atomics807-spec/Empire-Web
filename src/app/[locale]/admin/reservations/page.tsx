import { Users, Calendar, CreditCard, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Locale } from '@/lib/i18n'

interface AdminReservationsPageProps {
  params: Promise<{ locale: string }>
}

const mockReservations = [
  { id: 'RES-001', event: 'Saturday Night Fever', customer: 'Marie N.', table: 'VIP Table 1', guests: 4, deposit: 75000, status: 'confirmed' },
  { id: 'RES-002', event: 'Afro Beats Night', customer: 'John D.', table: 'Club Table 1', guests: 6, deposit: 25000, status: 'pending' },
  { id: 'RES-003', event: 'Saturday Night Fever', customer: 'Grace M.', table: 'VVIP Table', guests: 8, deposit: 150000, status: 'checked_in' },
]

const statusConfig = {
  pending: { label: 'Pending', variant: 'warning' as const },
  confirmed: { label: 'Confirmed', variant: 'success' as const },
  checked_in: { label: 'Checked In', variant: 'info' as const },
  cancelled: { label: 'Cancelled', variant: 'danger' as const },
}

export default async function AdminReservationsPage({ params }: AdminReservationsPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Table Reservations</h1>
        <p className="text-muted-foreground">Manage club table reservations</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockReservations.map(res => {
              const status = statusConfig[res.status as keyof typeof statusConfig]
              return (
                <div key={res.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-club-accent/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-club-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{res.id}</span>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{res.event}</span>
                        <span>•</span>
                        <span>{res.customer}</span>
                        <span>•</span>
                        <span>{res.table}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {res.guests}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-foreground">{res.deposit.toLocaleString()} XAF</span>
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
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
