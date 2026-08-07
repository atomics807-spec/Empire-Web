import { Ticket, Edit, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Locale } from '@/lib/i18n'

interface AdminTicketsPageProps {
  params: Promise<{ locale: string }>
}

const mockTickets = [
  { id: '1', event: 'Saturday Night Fever', type: 'General Entry', price: 5000, sold: 45, total: 200, revenue: 225000 },
  { id: '2', event: 'Saturday Night Fever', type: 'VIP Access', price: 15000, sold: 12, total: 50, revenue: 180000 },
  { id: '3', event: 'Afro Beats Night', type: 'General Entry', price: 3000, sold: 120, total: 300, revenue: 360000 },
]

export default async function AdminTicketsPage({ params }: AdminTicketsPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Ticket Management</h1>
        <p className="text-muted-foreground">Manage event tickets</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockTickets.map(ticket => (
              <div key={ticket.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-club-accent/20 flex items-center justify-center">
                    <Ticket className="h-5 w-5 text-club-accent" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{ticket.event}</span>
                    <span className="text-muted-foreground ml-2">- {ticket.type}</span>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>{ticket.sold}/{ticket.total} sold</span>
                      <span>•</span>
                      <span>{ticket.price.toLocaleString()} XAF each</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-bold text-foreground">{ticket.revenue.toLocaleString()} XAF</p>
                  </div>
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
