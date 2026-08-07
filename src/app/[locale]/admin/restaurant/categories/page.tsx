import { Plus, GripVertical, Edit, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Locale, t } from '@/lib/i18n'

interface AdminCategoriesPageProps {
  params: Promise<{ locale: string }>
}

const mockCategories = [
  { id: '1', name: 'Appetizers', nameFr: 'Entrées', items: 3, order: 1, active: true },
  { id: '2', name: 'Main Courses', nameFr: 'Plats Principaux', items: 8, order: 2, active: true },
  { id: '3', name: 'Sides', nameFr: 'Accompagnements', items: 5, order: 3, active: true },
  { id: '4', name: 'Drinks', nameFr: 'Boissons', items: 6, order: 4, active: true },
  { id: '5', name: 'Desserts', nameFr: 'Desserts', items: 4, order: 5, active: false },
]

export default async function AdminCategoriesPage({ params }: AdminCategoriesPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menu Categories</h1>
          <p className="text-muted-foreground">{locale === 'en' ? 'Organize your menu' : 'Organisez votre menu'}</p>
        </div>
        <Button className="bg-restaurant-accent hover:bg-restaurant-accent/90">
          <Plus className="h-4 w-4 mr-2" />
          {locale === 'en' ? 'Add Category' : 'Ajouter'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {mockCategories.map(cat => (
              <div key={cat.id} className="flex items-center justify-between p-4 hover:bg-surface-elevated">
                <div className="flex items-center gap-4">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                  <div>
                    <span className="font-semibold text-foreground">{locale === 'en' ? cat.name : cat.nameFr}</span>
                    <span className="text-sm text-muted-foreground ml-2">({cat.items} items)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={cat.active ? 'success' : 'default'}>{cat.active ? 'Active' : 'Inactive'}</Badge>
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
