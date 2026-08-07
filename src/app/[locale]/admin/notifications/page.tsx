import { Bell, Send, Users, Calendar, Utensils } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { type Locale } from '@/lib/i18n'

interface AdminNotificationsPageProps {
  params: Promise<{ locale: string }>
}

const mockNotifications = [
  { id: '1', title: 'New Event Announcement', type: 'event', sent: '2026-08-01', recipients: 245, status: 'sent' },
  { id: '2', title: 'Lunch Special Today', type: 'restaurant', sent: '2026-08-05', recipients: 128, status: 'sent' },
  { id: '3', title: 'Saturday Night Fever Reminder', type: 'event', sent: '2026-08-10', recipients: 300, status: 'pending' },
]

export default async function AdminNotificationsPage({ params }: AdminNotificationsPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Send push notifications to customers</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Send className="h-4 w-4 mr-2" />
          New Notification
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Sent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {mockNotifications.map(notif => (
                  <div key={notif.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
                        {notif.type === 'event' ? <Calendar className="h-5 w-5 text-club-accent" /> : <Utensils className="h-5 w-5 text-restaurant-accent" />}
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">{notif.title}</span>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Sent: {new Date(notif.sent).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{notif.recipients}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={notif.status === 'sent' ? 'success' : 'warning'}>{notif.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Send</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Notification title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground" rows={3} placeholder="Message content..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Send To</label>
                <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                  <option>All Subscribers</option>
                  <option>Event Ticket Holders</option>
                  <option>VIP Customers</option>
                  <option>Restaurant Customers</option>
                </select>
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
