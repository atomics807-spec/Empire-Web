import Link from 'next/link'
import { Calendar, Plus, Edit, Trash2, Eye, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Locale } from '@/lib/i18n'

interface AdminEventsPageProps {
  params: Promise<{ locale: string }>
}

const mockEvents = [
  { id: '1', title: 'Saturday Night Fever', date: '2026-08-15', ticketsSold: 45, revenue: 375000, status: 'published', featured: true },
  { id: '2', title: 'Afro Beats Night', date: '2026-08-22', ticketsSold: 120, revenue: 360000, status: 'published', featured: true },
  { id: '3', title: 'Ladies Night', date: '2026-08-29', ticketsSold: 0, revenue: 0, status: 'draft', featured: false },
]

const statusConfig = {
  draft: { label: 'Draft', variant: 'default' as const },
  published: { label: 'Published', variant: 'success' as const },
  cancelled: { label: 'Cancelled', variant: 'danger' as const },
}

export default async function AdminEventsPage({ params }: AdminEventsPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Manage club events</p>
        </div>
        <Link href={`/${locale}/admin/events/new`}>
          <Button className="bg-club-accent hover:bg-club-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockEvents.map(event => {
              const status = statusConfig[event.status as keyof typeof statusConfig]
              return (
                <div key={event.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-club-accent/20 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-club-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{event.title}</span>
                        {event.featured && <Star className="h-4 w-4 text-vip-gold fill-vip-gold" />}
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{event.ticketsSold} tickets sold</span>
                        <span>•</span>
                        <span>{event.revenue.toLocaleString()} XAF</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    <Link href={`/${locale}/admin/events/${event.id}`}>
                      <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
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
