import { Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Locale } from '@/lib/i18n'

interface AdminFloorPageProps {
  params: Promise<{ locale: string }>
}

const mockTables = [
  { id: 'C1', name: 'Club Table 1', type: 'regular', capacity: 6, deposit: 25000, status: 'available' },
  { id: 'C2', name: 'Club Table 2', type: 'regular', capacity: 6, deposit: 25000, status: 'locked' },
  { id: 'C3', name: 'Club Table 3', type: 'regular', capacity: 8, deposit: 35000, status: 'reserved' },
  { id: 'V1', name: 'VIP Table 1', type: 'vip', capacity: 8, deposit: 75000, status: 'available' },
  { id: 'V2', name: 'VIP Table 2', type: 'vip', capacity: 8, deposit: 75000, status: 'occupied' },
  { id: 'VV1', name: 'VVIP Table', type: 'vvip', capacity: 12, deposit: 150000, status: 'available' },
]

const statusConfig = {
  available: { label: 'Available', variant: 'success' as const, bg: 'bg-success/20', border: 'border-success/30' },
  locked: { label: 'Locked', variant: 'warning' as const, bg: 'bg-warning/20', border: 'border-warning/30' },
  reserved: { label: 'Reserved', variant: 'info' as const, bg: 'bg-info/20', border: 'border-info/30' },
  occupied: { label: 'Occupied', variant: 'danger' as const, bg: 'bg-danger/20', border: 'border-danger/30' },
}

export default async function AdminFloorPage({ params }: AdminFloorPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Club Floor Plan</h1>
          <p className="text-muted-foreground">Manage table availability</p>
        </div>
      </div>

      {/* Floor Map */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Live Floor Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 p-8 bg-surface-elevated rounded-xl">
            <div className="col-span-3 h-24 rounded-lg bg-surface flex items-center justify-center text-muted-foreground font-medium">
              Dance Floor
            </div>
            {mockTables.map(table => {
              const status = statusConfig[table.status as keyof typeof statusConfig]
              return (
                <button
                  key={table.id}
                  className={`p-4 rounded-lg border-2 ${status.border} ${status.bg} transition-all hover:scale-105`}
                >
                  <div className="text-center">
                    <p className="font-bold text-foreground">{table.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Users className="h-3 w-3" />
                      {table.capacity}
                    </p>
                    <Badge variant={status.variant} size="sm" className="mt-2">{status.label}</Badge>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Table List */}
      <Card>
        <CardHeader>
          <CardTitle>Table Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTables.map(table => {
              const status = statusConfig[table.status as keyof typeof statusConfig]
              return (
                <div key={table.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${status.bg.replace('/20', '')}`} />
                    <div>
                      <span className="font-medium text-foreground">{table.name}</span>
                      <span className="text-muted-foreground ml-2">({table.type})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Capacity: {table.capacity}</span>
                    <span className="text-sm text-muted-foreground">Deposit: {table.deposit.toLocaleString()} XAF</span>
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
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
