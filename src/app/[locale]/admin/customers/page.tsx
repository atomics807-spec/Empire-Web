import { Users, Search, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type Locale } from '@/lib/i18n'

interface AdminCustomersPageProps {
  params: Promise<{ locale: string }>
}

const mockCustomers = [
  { id: '1', name: 'Marie N.', email: 'marie@email.com', phone: '6XX XXX XXX', orders: 5, totalSpent: 45000, role: 'customer' },
  { id: '2', name: 'John D.', email: 'john@email.com', phone: '6XX XXX XXX', orders: 12, totalSpent: 125000, role: 'vip' },
  { id: '3', name: 'Grace M.', email: 'grace@email.com', phone: '6XX XXX XXX', orders: 3, totalSpent: 28000, role: 'customer' },
]

export default async function AdminCustomersPage({ params }: AdminCustomersPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">Manage customer accounts</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockCustomers.map(customer => (
              <div key={customer.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{customer.name}</span>
                      <Badge variant={customer.role === 'vip' ? 'vip' : 'default'}>{customer.role}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{customer.email}</span>
                      <span>•</span>
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                    <p className="font-semibold text-foreground">{customer.totalSpent.toLocaleString()} XAF</p>
                  </div>
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
