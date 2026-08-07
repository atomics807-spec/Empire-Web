import { Shield, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Locale } from '@/lib/i18n'

interface AdminStaffPageProps {
  params: Promise<{ locale: string }>
}

const mockStaff = [
  { id: '1', name: 'Admin User', email: 'admin@empire.com', role: 'super_admin', status: 'active' },
  { id: '2', name: 'Restaurant Manager', email: 'manager@empire.com', role: 'restaurant_manager', status: 'active' },
  { id: '3', name: 'Club Manager', email: 'club@empire.com', role: 'club_manager', status: 'active' },
  { id: '4', name: 'Kitchen Staff', email: 'kitchen@empire.com', role: 'kitchen_staff', status: 'active' },
  { id: '5', name: 'Bouncer 1', email: 'bouncer1@empire.com', role: 'bouncer', status: 'active' },
]

const roleLabels: Record<string, string> = {
  super_admin: 'Super Admin',
  restaurant_manager: 'Restaurant Manager',
  club_manager: 'Club Manager',
  kitchen_staff: 'Kitchen Staff',
  bouncer: 'Bouncer',
}

export default async function AdminStaffPage({ params }: AdminStaffPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage staff accounts and roles</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockStaff.map(staff => (
              <div key={staff.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{staff.name}</span>
                      <Badge variant={staff.status === 'active' ? 'success' : 'default'}>{staff.status}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{staff.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{roleLabels[staff.role] || staff.role}</Badge>
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
