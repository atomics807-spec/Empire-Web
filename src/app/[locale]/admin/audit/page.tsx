import { ClipboardList, Search, Filter, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { type Locale } from '@/lib/i18n'

interface AdminAuditPageProps {
  params: Promise<{ locale: string }>
}

const mockLogs = [
  { id: '1', timestamp: '2026-08-07 10:30:15', actor: 'admin@empire.com', action: 'Menu item updated', entity: 'menu_items', details: 'Grilled Tilapia price changed to 4500' },
  { id: '2', timestamp: '2026-08-07 09:45:22', actor: 'manager@empire.com', action: 'Order status changed', entity: 'orders', details: 'ORD-001 moved to preparing' },
  { id: '3', timestamp: '2026-08-07 09:30:00', actor: 'bouncer1@empire.com', action: 'Pass checked in', entity: 'passes', details: 'PASS-001 verified at entrance' },
  { id: '4', timestamp: '2026-08-07 08:00:00', actor: 'system', action: 'Payment received', entity: 'payments', details: 'Payment REF-12345 successful' },
  { id: '5', timestamp: '2026-08-06 22:15:00', actor: 'club@empire.com', action: 'Event published', entity: 'events', details: 'Ladies Night published' },
]

export default async function AdminAuditPage({ params }: AdminAuditPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">Track all system activities</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option value="">All Actions</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="auth">Authentication</option>
                <option value="payment">Payment</option>
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-elevated">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Timestamp</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Actor</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Entity</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockLogs.map(log => (
                  <tr key={log.id} className="hover:bg-surface-elevated">
                    <td className="p-4 text-sm text-muted-foreground font-mono">{log.timestamp}</td>
                    <td className="p-4 text-sm text-foreground">{log.actor}</td>
                    <td className="p-4">
                      <Badge variant="outline">{log.action}</Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{log.entity}</td>
                    <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
