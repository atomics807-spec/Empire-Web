import { Plus, Users, Edit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Locale } from '@/lib/i18n'

interface AdminTablesPageProps {
  params: Promise<{ locale: string }>
}

const mockTables = [
  { id: 'R1', name: 'Restaurant Table 1', type: 'Standard', area: 'Main Dining', capacity: 4, status: 'available' },
  { id: 'R2', name: 'Restaurant Table 2', type: 'Standard', area: 'Main Dining', capacity: 4, status: 'occupied' },
  { id: 'R3', name: 'Restaurant Table 3', type: 'Standard', area: 'Terrace', capacity: 6, status: 'available' },
  { id: 'R4', name: 'Restaurant Table 4', type: 'Standard', area: 'Terrace', capacity: 4, status: 'reserved' },
]

const statusConfig = {
  available: { label: 'Available', variant: 'success' as const },
  occupied: { label: 'Occupied', variant: 'danger' as const },
  reserved: { label: 'Reserved', variant: 'warning' as const },
}

export default async function AdminTablesPage({ params }: AdminTablesPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Restaurant Tables</h1>
          <p className="text-muted-foreground">{locale === 'en' ? 'Manage dining tables' : 'Gérer les tables'}</p>
        </div>
        <Button className="bg-restaurant-accent hover:bg-restaurant-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'en' ? 'Add Table' : 'Ajouter'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {mockTables.map(table => {
              const status = statusConfig[table.status as keyof typeof statusConfig]
              return (
                <div key={table.id} className="p-4 rounded-lg border border-border hover:border-restaurant-accent transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-foreground">{table.name}</span>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{table.capacity} seats</span>
                    </div>
                    <div>{table.area}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
