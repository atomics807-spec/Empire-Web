import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { type Locale } from '@/lib/i18n'

interface NewEventPageProps {
  params: Promise<{ locale: string }>
}

export default async function NewEventPage({ params }: NewEventPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <Link href={`/${locale}/admin/events`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-5 w-5" />
        Back to Events
      </Link>

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Create New Event</h1>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Event Title (English)</Label>
              <Input placeholder="Saturday Night Fever" />
            </div>
            <div className="space-y-2">
              <Label>Event Title (French)</Label>
              <Input placeholder="Fièvre du Samedi Soir" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date & Time</Label>
                <Input type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label>End Date & Time</Label>
                <Input type="datetime-local" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description (English)</Label>
              <textarea className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-club-accent" rows={3} placeholder="Event description..." />
            </div>
            <div className="space-y-2">
              <Label>Age Policy</Label>
              <Input placeholder="21+" />
            </div>
            <div className="space-y-2">
              <Label>Dress Code</Label>
              <Input placeholder="Smart Casual" />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">Save as Draft</Button>
              <Button className="flex-1 bg-club-accent hover:bg-club-accent/90">Publish Event</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
