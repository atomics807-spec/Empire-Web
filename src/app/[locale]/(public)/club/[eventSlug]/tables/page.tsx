'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, CreditCard, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TablesPageProps {
  params: Promise<{ locale: string; eventSlug: string }>
}

// Mock table data
const mockTables = [
  { id: 'C1', name: 'Club Table 1', type: 'regular', capacity: 6, deposit: 25000, minimumSpend: 50000, status: 'available' },
  { id: 'C2', name: 'Club Table 2', type: 'regular', capacity: 6, deposit: 25000, minimumSpend: 50000, status: 'available' },
  { id: 'C3', name: 'Club Table 3', type: 'regular', capacity: 8, deposit: 35000, minimumSpend: 75000, status: 'locked' },
  { id: 'V1', name: 'VIP Table 1', type: 'vip', capacity: 8, deposit: 75000, minimumSpend: 150000, status: 'available' },
  { id: 'V2', name: 'VIP Table 2', type: 'vip', capacity: 8, deposit: 75000, minimumSpend: 150000, status: 'reserved' },
  { id: 'VV1', name: 'VVIP Table', type: 'vvip', capacity: 12, deposit: 150000, minimumSpend: 300000, status: 'available' },
]

const statusColors = {
  available: 'bg-success/20 text-success border-success/30',
  locked: 'bg-warning/20 text-warning border-warning/30',
  reserved: 'bg-club-accent/20 text-club-accent border-club-accent/30',
  occupied: 'bg-danger/20 text-danger border-danger/30',
  unavailable: 'bg-muted text-muted-foreground border-muted',
}

const statusLabels = {
  available: { en: 'Available', fr: 'Disponible' },
  locked: { en: 'Being Reserved', fr: 'En Réservation' },
  reserved: { en: 'Reserved', fr: 'Réservé' },
  occupied: { en: 'Occupied', fr: 'Occupé' },
  unavailable: { en: 'Unavailable', fr: 'Indisponible' },
}

export default function TablesPage({ params }: TablesPageProps) {
  const router = useRouter()
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const [eventSlug, setEventSlug] = useState('')
  const [tables, setTables] = useState(mockTables)
  const [selectedTable, setSelectedTable] = useState<typeof mockTables[0] | null>(null)
  const [guestCount, setGuestCount] = useState(4)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [lockCountdown, setLockCountdown] = useState(0)
  const [isLocking, setIsLocking] = useState(false)

  useEffect(() => {
    params.then(p => {
      setLocale(p.locale as 'en' | 'fr')
      setEventSlug(p.eventSlug)
    })
  }, [params])

  // Countdown timer for locked tables
  useEffect(() => {
    if (lockCountdown > 0) {
      const timer = setTimeout(() => setLockCountdown(lockCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [lockCountdown])

  const handleTableSelect = (table: typeof mockTables[0]) => {
    if (table.status !== 'available') return
    setSelectedTable(table)
  }

  const handleLockTable = async () => {
    if (!selectedTable || !customerName || !customerPhone) return
    
    setIsLocking(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update table status
    setTables(tables => tables.map(t => 
      t.id === selectedTable.id ? { ...t, status: 'locked' } : t
    ))
    setLockCountdown(15 * 60) // 15 minutes
    setIsLocking(false)
    
    // In production, redirect to payment for deposit
    router.push(`/${locale}/checkout?table=${selectedTable.id}&event=${eventSlug}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/events/${eventSlug}`} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {locale === 'en' ? 'Reserve a Table' : 'Réserver une Table'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Tables are held for 15 minutes after reservation' : 'Les tables sont réservées pendant 15 minutes'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Legend */}
        <div className="mb-6 flex flex-wrap gap-4">
          {Object.entries(statusLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${statusColors[key as keyof typeof statusColors]}`} />
              <span className="text-sm text-muted-foreground">
                {label[locale]}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Floor Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Floor Plan' : 'Plan de Salle'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 p-8 bg-surface-elevated rounded-xl">
                  {/* Dance Floor */}
                  <div className="col-span-3 h-32 rounded-lg bg-surface flex items-center justify-center text-muted-foreground">
                    {locale === 'en' ? 'Dance Floor' : 'Piste de Danse'}
                  </div>
                  
                  {/* Tables */}
                  {tables.map(table => (
                    <button
                      key={table.id}
                      onClick={() => handleTableSelect(table)}
                      disabled={table.status !== 'available'}
                      className={`
                        relative p-4 rounded-lg border-2 transition-all
                        ${table.type === 'regular' ? 'bg-surface' : table.type === 'vip' ? 'bg-vip-gold/10 border-vip-gold/50' : 'bg-vip-gold/20 border-vip-gold'}
                        ${table.status === 'available' ? 'cursor-pointer hover:border-club-accent hover:scale-105' : 'opacity-60 cursor-not-allowed'}
                        ${selectedTable?.id === table.id ? 'border-club-accent ring-2 ring-club-accent' : 'border-border'}
                      `}
                    >
                      <div className="text-center">
                        <p className="font-bold text-foreground">{table.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                          <Users className="h-3 w-3" />
                          {table.capacity}
                        </p>
                        <p className="text-xs text-club-accent font-medium mt-1">
                          {table.deposit.toLocaleString()} XAF
                        </p>
                        {table.status !== 'available' && (
                          <Badge className={`mt-2 text-xs ${statusColors[table.status as keyof typeof statusColors]}`}>
                            {statusLabels[table.status as keyof typeof statusLabels][locale]}
                          </Badge>
                        )}
                        {selectedTable?.id === table.id && (
                          <CheckCircle className="h-5 w-5 text-club-accent mx-auto mt-2" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reservation Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Reservation Details' : 'Détails de Réservation'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTable ? (
                  <>
                    <div className="p-4 rounded-lg bg-club-accent/10 border border-club-accent/30">
                      <p className="font-semibold text-foreground">{selectedTable.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {selectedTable.capacity} {locale === 'en' ? 'guests' : 'invités'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {locale === 'en' ? 'Deposit' : 'Acompte'}: <span className="text-club-accent font-medium">{selectedTable.deposit.toLocaleString()} XAF</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'en' ? 'Minimum Spend' : 'Dépense Minimum'}: <span className="font-medium">{selectedTable.minimumSpend.toLocaleString()} XAF</span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests">{locale === 'en' ? 'Number of Guests' : 'Nombre d\'Invités'}</Label>
                      <Input
                        id="guests"
                        type="number"
                        min={1}
                        max={selectedTable.capacity}
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">{locale === 'en' ? 'Your Name' : 'Votre Nom'}</Label>
                      <Input
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={locale === 'en' ? 'Enter your name' : 'Entrez votre nom'}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{locale === 'en' ? 'Phone Number' : 'Numéro de Téléphone'}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="6XX XXX XXX"
                      />
                    </div>

                    <Button 
                      className="w-full bg-club-accent hover:bg-club-accent/90"
                      onClick={handleLockTable}
                      disabled={!customerName || !customerPhone || isLocking}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isLocking 
                        ? (locale === 'en' ? 'Processing...' : 'Traitement...')
                        : (locale === 'en' ? `Pay ${selectedTable.deposit.toLocaleString()} XAF Deposit` : `Payer ${selectedTable.deposit.toLocaleString()} XAF Acompte`)
                      }
                    </Button>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>
                        {locale === 'en' 
                          ? 'Your table will be held for 15 minutes after payment'
                          : 'Votre table sera réservée pendant 15 minutes après le paiement'}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {locale === 'en' 
                        ? 'Select a table from the floor plan to continue'
                        : 'Sélectionnez une table du plan de salle pour continuer'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
