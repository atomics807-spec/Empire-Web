import { Utensils, Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type Locale, t } from '@/lib/i18n'

interface AdminMenuPageProps {
  params: Promise<{ locale: string }>
}

const mockMenuItems = [
  { id: '1', name: 'Grilled Tilapia', nameFr: 'Tilapia Grillé', category: 'Main Courses', price: 4500, available: true, featured: true },
  { id: '2', name: 'Ndolè Fingers', nameFr: 'Doigts de Ndolé', category: 'Appetizers', price: 2000, available: true, featured: true },
  { id: '3', name: 'Poulet DG', nameFr: 'Poulet DG', category: 'Main Courses', price: 4000, available: true, featured: true },
  { id: '4', name: 'Ekwang', nameFr: 'Ekwang', category: 'Main Courses', price: 4000, available: false, featured: false },
]

export default async function AdminMenuPage({ params }: AdminMenuPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.menuManagement', locale as Locale)}</h1>
          <p className="text-muted-foreground">{locale === 'en' ? 'Manage menu items' : 'Gérer les articles du menu'}</p>
        </div>
        <Button className="bg-restaurant-accent hover:bg-restaurant-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'en' ? 'Add Item' : 'Ajouter'}
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={locale === 'en' ? 'Search menu...' : 'Rechercher...'} className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockMenuItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center">
                    <Utensils className="h-6 w-6 text-restaurant-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{locale === 'en' ? item.name : item.nameFr}</span>
                      {item.featured && <Badge variant="vip" size="sm">Featured</Badge>}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.price.toLocaleString()} XAF</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.available ? 'success' : 'warning'}>
                    {item.available ? (locale === 'en' ? 'Available' : 'Disponible') : (locale === 'en' ? 'Unavailable' : 'Indisponible')}
                  </Badge>
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
