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
  { id: 'C1', name: 'Club Table 1', type: 'regular', capacity: 6, deposit: 25000, minimumSpend: 50000, status: 'available', features: ['Welcome drink per person', 'Priority entry', 'Dedicated waiter'] },
  { id: 'C2', name: 'Club Table 2', type: 'regular', capacity: 6, deposit: 25000, minimumSpend: 50000, status: 'available', features: ['Welcome drink per person', 'Priority entry', 'Dedicated waiter'] },
  { id: 'C3', name: 'Club Table 3', type: 'regular', capacity: 8, deposit: 35000, minimumSpend: 75000, status: 'locked', features: ['Welcome drink per person', 'Priority entry', 'Dedicated waiter'] },
  { id: 'V1', name: 'VIP Table 1', type: 'vip', capacity: 8, deposit: 75000, minimumSpend: 150000, status: 'available', features: ['Premium location near stage', '2 bottles included', 'VIP lounge access', 'Exclusive entrance'] },
  { id: 'V2', name: 'VIP Table 2', type: 'vip', capacity: 8, deposit: 75000, minimumSpend: 150000, status: 'reserved', features: ['Premium location near stage', '2 bottles included', 'VIP lounge access', 'Exclusive entrance'] },
  { id: 'VV1', name: 'VVIP Table', type: 'vvip', capacity: 12, deposit: 150000, minimumSpend: 300000, status: 'available', features: ['Best location in the club', '3 bottles included', 'VVIP lounge', 'Personal host', 'Complimentary transfers'] },
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

const tableTypeLabels = {
  regular: { en: 'Regular', fr: 'Standard' },
  vip: { en: 'VIP', fr: 'VIP' },
  vvip: { en: 'VVIP', fr: 'VVIP' },
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
          {/* Interactive Floor Plan */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{locale === 'en' ? 'Interactive Floor Plan' : 'Plan de Salle Interactif'}</span>
                  <Badge variant="outline" className="text-xs">{locale === 'en' ? 'Click a table to select' : 'Cliquez sur une table'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-surface-elevated rounded-xl p-6 overflow-hidden">
                  {/* Club Layout SVG */}
                  <svg viewBox="0 0 600 400" className="w-full h-auto">
                    {/* Dance Floor */}
                    <rect x="175" y="20" width="250" height="120" rx="10" fill="#1f2833" stroke="#ff0055" strokeWidth="2" />
                    <text x="300" y="75" textAnchor="middle" fill="#ff0055" fontSize="14" fontWeight="bold">
                      {locale === 'en' ? 'DANCE FLOOR' : 'PISTE DE DANSE'}
                    </text>
                    {/* DJ Booth */}
                    <rect x="250" y="140" width="100" height="40" rx="5" fill="#1f2833" stroke="#00f0ff" strokeWidth="1" />
                    <text x="300" y="165" textAnchor="middle" fill="#00f0ff" fontSize="10">DJ BOOTH</text>
                    
                    {/* VIP Section */}
                    <rect x="20" y="20" width="130" height="160" rx="8" fill="#c5a059" fillOpacity="0.1" stroke="#c5a059" strokeWidth="1" />
                    <text x="85" y="15" textAnchor="middle" fill="#c5a059" fontSize="10" fontWeight="bold">VIP SECTION</text>
                    
                    {/* VVIP Section */}
                    <rect x="450" y="20" width="130" height="160" rx="8" fill="#c5a059" fillOpacity="0.2" stroke="#c5a059" strokeWidth="2" />
                    <text x="515" y="15" textAnchor="middle" fill="#c5a059" fontSize="10" fontWeight="bold">VVIP SECTION</text>
                    
                    {/* Bar */}
                    <rect x="20" y="300" width="560" height="60" rx="5" fill="#1f2833" stroke="#00f0ff" strokeWidth="1" />
                    <text x="300" y="335" textAnchor="middle" fill="#00f0ff" fontSize="12" fontWeight="bold">BAR</text>
                    
                    {/* Tables */}
                    {tables.map((table, idx) => {
                      const positions = [
                        { x: 50, y: 50 },   // V1 - VIP
                        { x: 100, y: 120 }, // V2 - VIP
                        { x: 475, y: 50 },  // VV1 - VVIP
                        { x: 525, y: 120 }, // Additional VVIP
                        { x: 200, y: 200 }, // C1 - Regular
                        { x: 280, y: 200 }, // C2 - Regular
                        { x: 360, y: 200 }, // C3 - Regular
                        { x: 200, y: 260 }, // Additional Regular
                        { x: 280, y: 260 }, // Additional Regular
                        { x: 360, y: 260 }, // Additional Regular
                      ]
                      const pos = positions[idx] || { x: 200, y: 220 }
                      
                      const isSelected = selectedTable?.id === table.id
                      const isAvailable = table.status === 'available'
                      
                      let fillColor = '#1f2833'
                      let strokeColor = '#4a5568'
                      if (table.type === 'vip') {
                        fillColor = isSelected ? '#ff0055' : '#c5a059'
                        strokeColor = '#c5a059'
                      } else if (table.type === 'vvip') {
                        fillColor = isSelected ? '#ff0055' : '#c5a059'
                        strokeColor = '#c5a059'
                      }
                      if (!isAvailable) fillColor = '#374151'
                      
                      return (
                        <g key={table.id} onClick={() => handleTableSelect(table)} className="cursor-pointer">
                          <rect
                            x={pos.x}
                            y={pos.y}
                            width="60"
                            height="50"
                            rx="8"
                            fill={fillColor}
                            stroke={isSelected ? '#00f0ff' : strokeColor}
                            strokeWidth={isSelected ? 3 : 1}
                            opacity={isAvailable ? 1 : 0.5}
                          />
                          <text x={pos.x + 30} y={pos.y + 25} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                            {table.name.replace('Club ', '').replace('Table ', 'T')}
                          </text>
                          <text x={pos.x + 30} y={pos.y + 38} textAnchor="middle" fill="#9ca3af" fontSize="8">
                            {table.capacity}👤
                          </text>
                          {!isAvailable && (
                            <circle cx={pos.x + 50} cy={pos.y + 10} r="6" fill={
                              table.status === 'reserved' ? '#ff0055' : 
                              table.status === 'locked' ? '#f59e0b' : '#6b7280'
                            } />
                          )}
                        </g>
                      )
                    })}
                  </svg>
                  
                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#1f2833] border border-[#4a5568]" />
                      <span className="text-xs text-muted-foreground">{locale === 'en' ? 'Regular' : 'Standard'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#c5a059]" />
                      <span className="text-xs text-muted-foreground">VIP/VVIP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#374151]" />
                      <span className="text-xs text-muted-foreground">{locale === 'en' ? 'Reserved' : 'Réservé'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#ff0055] border-2 border-[#00f0ff]" />
                      <span className="text-xs text-muted-foreground">{locale === 'en' ? 'Selected' : 'Sélectionné'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Table Packages List */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Available Tables' : 'Tables Disponibles'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {tables.map(table => (
                    <button
                      key={table.id}
                      onClick={() => handleTableSelect(table)}
                      disabled={table.status !== 'available'}
                      className={`
                        relative p-4 rounded-xl border-2 text-left transition-all
                        ${table.type === 'regular' ? 'bg-surface' : 'bg-vip-gold/5'}
                        ${table.type === 'vip' ? 'border-vip-gold/50' : table.type === 'vvip' ? 'border-vip-gold' : 'border-border'}
                        ${table.status === 'available' ? 'cursor-pointer hover:border-club-accent hover:scale-[1.02]' : 'opacity-50 cursor-not-allowed'}
                        ${selectedTable?.id === table.id ? 'border-club-accent ring-2 ring-club-accent' : ''}
                      `}
                    >
                      {table.type !== 'regular' && (
                        <Badge variant="vip" className="absolute top-2 right-2">
                          {tableTypeLabels[table.type as keyof typeof tableTypeLabels][locale]}
                        </Badge>
                      )}
                      <div className="mb-2">
                        <h4 className="font-bold text-foreground">{table.name}</h4>
                        <p className="text-xl font-bold text-club-accent">
                          {table.deposit.toLocaleString()} XAF
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {locale === 'en' ? 'Deposit' : 'Acompte'}
                        </p>
                      </div>
                      
                      <div className="space-y-1 mb-2">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {table.capacity} {locale === 'en' ? 'guests' : 'invités'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'en' ? 'Min spend' : 'Dépense min'}: {table.minimumSpend.toLocaleString()} XAF
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        {table.features.slice(0, 2).map((feature, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-success" />
                            {feature}
                          </p>
                        ))}
                      </div>
                      
                      {table.status !== 'available' && (
                        <Badge className={`mt-3 ${statusColors[table.status as keyof typeof statusColors]}`}>
                          {statusLabels[table.status as keyof typeof statusLabels][locale]}
                        </Badge>
                      )}
                      
                      {selectedTable?.id === table.id && (
                        <div className="absolute top-2 left-2">
                          <CheckCircle className="h-6 w-6 text-club-accent" />
                        </div>
                      )}
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
                <CardTitle>{locale === 'en' ? 'Complete Your Reservation' : 'Complétez Votre Réservation'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTable ? (
                  <>
                    <div className={`p-4 rounded-lg border ${
                      selectedTable.type === 'vvip' ? 'bg-vip-gold/10 border-vip-gold/50' :
                      selectedTable.type === 'vip' ? 'bg-vip-gold/5 border-vip-gold/30' :
                      'bg-club-accent/10 border-club-accent/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-foreground text-lg">{selectedTable.name}</p>
                        {selectedTable.type !== 'regular' && (
                          <Badge variant="vip">{tableTypeLabels[selectedTable.type as keyof typeof tableTypeLabels][locale]}</Badge>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-club-accent mb-3">
                        {selectedTable.deposit.toLocaleString()} XAF
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'en' ? 'Deposit (refundable)' : 'Acompte (remboursable)'}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4" />
                          {selectedTable.capacity} {locale === 'en' ? 'guests maximum' : 'invités maximum'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'en' ? 'Minimum spend' : 'Dépense minimum'}: {selectedTable.minimumSpend.toLocaleString()} XAF
                        </p>
                      </div>
                      
                      {/* What's Included */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">
                          {locale === 'en' ? 'What\'s Included:' : 'Inclus:'}
                        </p>
                        <ul className="space-y-1">
                          {selectedTable.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-success" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
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
