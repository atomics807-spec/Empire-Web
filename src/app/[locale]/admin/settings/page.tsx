import { Settings, Save, Clock, MapPin, Phone, Mail, Globe, CreditCard, Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type Locale } from '@/lib/i18n'

interface AdminSettingsPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminSettingsPage({ params }: AdminSettingsPageProps) {
  const { locale } = await params

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Business Settings</h1>
          <p className="text-muted-foreground">Configure your business settings</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input defaultValue="Empire Hybrid Lounge" />
            </div>
            <div className="space-y-2">
              <Label>Restaurant Name</Label>
              <Input defaultValue="Empire Restaurant" />
            </div>
            <div className="space-y-2">
              <Label>Club Name</Label>
              <Input defaultValue="Empire Night Club" />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input defaultValue="Sappa Road, Limbe, Cameroon" />
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Restaurant Opens</Label>
                <Input type="time" defaultValue="08:00" />
              </div>
              <div className="space-y-2">
                <Label>Restaurant Closes</Label>
                <Input type="time" defaultValue="17:30" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Club Opens</Label>
                <Input type="time" defaultValue="20:00" />
              </div>
              <div className="space-y-2">
                <Label>Club Closes</Label>
                <Input type="time" defaultValue="06:00" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="override" className="w-4 h-4" />
              <Label htmlFor="override">Manual Override Active</Label>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue="+237 6 00 00 00 00" />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input defaultValue="+237 6 00 00 00 00" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="info@empire-hybrid.com" />
            </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Provider
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option value="campay">CamPay</option>
                <option value="monetbil">Monetbil</option>
                <option value="sandbox">Sandbox (Development)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <Input defaultValue="https://empire-hybrid.com/api/webhooks/payments/campay" />
            </div>
            <div className="space-y-2">
              <Label>Test Mode</Label>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="testmode" className="w-4 h-4" />
                <Label htmlFor="testmode">Enable test mode</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
