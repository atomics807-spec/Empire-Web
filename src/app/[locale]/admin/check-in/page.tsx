'use client'

import { useState, useEffect } from 'react'
import { Camera, CheckCircle, XCircle, AlertTriangle, Clock, Scan, Keyboard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { type Locale } from '@/lib/i18n'

interface CheckInPageProps {
  params: Promise<{ locale: string }>
}

type CheckResult = {
  status: 'idle' | 'success' | 'error' | 'warning'
  message: string
  passId?: string
  event?: string
  guestName?: string
  timestamp?: string
}

export default function AdminCheckInPage({ params }: CheckInPageProps) {
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const [manualToken, setManualToken] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<CheckResult>({ status: 'idle', message: '' })
  const [scanCount, setScanCount] = useState(0)

  useEffect(() => {
    params.then(p => setLocale(p.locale as 'en' | 'fr'))
  }, [params])

  const handleManualCheckIn = async () => {
    if (!manualToken.trim()) return
    
    setIsScanning(true)
    // Simulate scanning
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock result
    if (manualToken.toLowerCase().includes('valid')) {
      setResult({
        status: 'success',
        message: locale === 'en' ? 'Entry Approved' : 'Entrée Approuvée',
        passId: 'PASS-001',
        event: 'Saturday Night Fever',
        guestName: 'John Doe',
        timestamp: new Date().toLocaleTimeString(),
      })
      setScanCount(prev => prev + 1)
    } else if (manualToken.toLowerCase().includes('used')) {
      setResult({
        status: 'warning',
        message: locale === 'en' ? 'Already Used' : 'Déjà Utilisé',
        passId: 'PASS-002',
        timestamp: '08:30:00',
      })
    } else {
      setResult({
        status: 'error',
        message: locale === 'en' ? 'Invalid Pass' : 'Pass Invalide',
      })
    }
    
    setIsScanning(false)
    setManualToken('')
  }

  const resultStyles = {
    success: { bg: 'bg-success/20', border: 'border-success', icon: CheckCircle, color: 'text-success' },
    error: { bg: 'bg-danger/20', border: 'border-danger', icon: XCircle, color: 'text-danger' },
    warning: { bg: 'bg-warning/20', border: 'border-warning', icon: AlertTriangle, color: 'text-warning' },
    idle: { bg: 'bg-surface', border: 'border-border', icon: Scan, color: 'text-muted-foreground' },
  }

  const currentStyle = resultStyles[result.status]
  const Icon = currentStyle.icon

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Bouncer Check-In</h1>
        <p className="text-muted-foreground">Scan passes for entry verification</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Scanner Area */}
        <div className="space-y-6">
          <Card className={`${currentStyle.bg} ${currentStyle.border}`}>
            <CardContent className="p-8 text-center">
              <div className={`w-32 h-32 mx-auto ${currentStyle.bg} rounded-full flex items-center justify-center mb-6`}>
                <Icon className={`h-16 w-16 ${currentStyle.color}`} />
              </div>
              <h2 className={`text-2xl font-bold ${currentStyle.color} mb-2`}>
                {result.message || (locale === 'en' ? 'Ready to Scan' : 'Prêt à Scanner')}
              </h2>
              {result.passId && (
                <div className="space-y-1 text-muted-foreground">
                  <p>Pass: {result.passId}</p>
                  {result.event && <p>Event: {result.event}</p>}
                  {result.guestName && <p>Guest: {result.guestName}</p>}
                  {result.timestamp && <p>Time: {result.timestamp}</p>}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manual Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Manual Token Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder={locale === 'en' ? 'Enter pass token...' : 'Entrez le token...'}
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualCheckIn()}
                  disabled={isScanning}
                />
                <Button onClick={handleManualCheckIn} disabled={isScanning || !manualToken.trim()}>
                  {isScanning ? <Clock className="h-4 w-4 animate-spin" /> : 'Check'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' 
                  ? 'Use this if QR scanner is unavailable'
                  : 'Utilisez ceci si le scanner QR est indisponible'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-surface-elevated">
                  <p className="text-3xl font-bold text-success">{scanCount}</p>
                  <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Checked In' : 'Entrés'}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-surface-elevated">
                  <p className="text-3xl font-bold text-warning">0</p>
                  <p className="text-sm text-muted-foreground">{locale === 'en' ? 'Rejected' : 'Rejetés'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Camera className="h-4 w-4 mr-2" />
                Open Camera Scanner
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                View Scan History
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Saturday Night Fever</p>
                <p className="text-sm text-muted-foreground">August 15, 2026</p>
                <p className="text-sm text-muted-foreground">Doors open: 20:00</p>
                <Badge className="mt-2 bg-club-accent">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
