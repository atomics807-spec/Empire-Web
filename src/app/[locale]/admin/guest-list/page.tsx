import { Users, Check, X, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Locale } from '@/lib/i18n'

interface AdminGuestListPageProps {
  params: Promise<{ locale: string }>
}

const mockGuests = [
  { id: '1', event: 'Saturday Night Fever', name: 'Marie N.', phone: '6XX XXX XXX', guests: 2, status: 'approved' },
  { id: '2', event: 'Saturday Night Fever', name: 'John D.', phone: '6XX XXX XXX', guests: 1, status: 'pending' },
  { id: '3', event: 'Saturday Night Fever', name: 'Grace M.', phone: '6XX XXX XXX', guests: 3, status: 'approved' },
]

export default async function AdminGuestListPage({ params }: AdminGuestListPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Guest Lists</h1>
        <p className="text-muted-foreground">Manage guest list registrations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saturday Night Fever - Guest List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockGuests.map(guest => (
              <div key={guest.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-club-accent/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-club-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{guest.name}</span>
                      <Badge variant={guest.status === 'approved' ? 'success' : 'warning'}>
                        {guest.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{guest.phone} • {guest.guests} guests</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm"><Check className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><X className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
