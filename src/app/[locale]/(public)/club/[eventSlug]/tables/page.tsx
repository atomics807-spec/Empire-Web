'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, CreditCard, Clock, AlertCircle, CheckCircle, Wine, Plus, Minus } from 'lucide-react'
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

// Drink packages
const drinkPackages = [
  { id: 'vodka', name: { en: 'Vodka Bottle', fr: 'Bouteille Vodka' }, price: 35000, image: '🍸' },
  { id: 'whisky', name: { en: 'Whisky Bottle', fr: 'Bouteille Whisky' }, price: 45000, image: '🥃' },
  { id: 'champagne', name: { en: 'Champagne', fr: 'Champagne' }, price: 75000, image: '🍾' },
  { id: 'cocktails', name: { en: 'Cocktail Mix (6 drinks)', fr: 'Mix Cocktails (6 boissons)' }, price: 25000, image: '🍹' },
  { id: 'soft', name: { en: 'Soft Drinks Pack (6)', fr: 'Pack Boissons (6)' }, price: 8000, image: '🥤' },
  { id: 'water', name: { en: 'Water Pack (6)', fr: 'Pack Eau (6)' }, price: 4000, image: '💧' },
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
  const [selectedTables, setSelectedTables] = useState<string[]>([])
  const [drinkSelections, setDrinkSelections] = useState<Record<string, number>>({})
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
    
    setSelectedTables(prev => {
      if (prev.includes(table.id)) {
        return prev.filter(id => id !== table.id)
      }
      return [...prev, table.id]
    })
  }

  const updateDrinkQuantity = (drinkId: string, delta: number) => {
    setDrinkSelections(prev => {
      const current = prev[drinkId] || 0
      const newQty = current + delta
      if (newQty <= 0) {
        const { [drinkId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [drinkId]: newQty }
    })
  }

  // Calculate totals
  const selectedTablesData = tables.filter(t => selectedTables.includes(t.id))
  const tableDeposit = selectedTablesData.reduce((sum, t) => sum + t.deposit, 0)
  const tableMinSpend = selectedTablesData.reduce((sum, t) => sum + t.minimumSpend, 0)
  const totalCapacity = selectedTablesData.reduce((sum, t) => sum + t.capacity, 0)
  const drinkTotal = Object.entries(drinkSelections).reduce((sum, [drinkId, qty]) => {
    const drink = drinkPackages.find(d => d.id === drinkId)
    return sum + (drink?.price || 0) * qty
  }, 0)
  const grandTotal = tableDeposit + drinkTotal

  const handleLockTable = async () => {
    if (selectedTables.length === 0 || !customerName || !customerPhone) return
    
    setIsLocking(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update table status
    setTables(tables => tables.map(t => 
      selectedTables.includes(t.id) ? { ...t, status: 'locked' } : t
    ))
    setLockCountdown(15 * 60) // 15 minutes
    setIsLocking(false)
    
    // In production, redirect to payment
    router.push(`/${locale}/checkout?tables=${selectedTables.join(',')}&event=${eventSlug}&drinks=${encodeURIComponent(JSON.stringify(drinkSelections))}`)
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
                {locale === 'en' ? 'Reserve Tables & Drinks' : 'Réserver Tables & Boissons'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {locale === 'en' ? 'Select tables and add drinks' : 'Sélectionnez des tables et ajoutez des boissons'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tables & Drinks */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Drink Packages Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wine className="h-5 w-5 text-club-accent" />
                  {locale === 'en' ? 'Add Drinks & Packages' : 'Ajouter Boissons & Packages'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Choose drinks to enhance your experience' : 'Choisissez des boissons pour améliorer votre expérience'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {drinkPackages.map(drink => {
                    const qty = drinkSelections[drink.id] || 0
                    return (
                      <div key={drink.id} className={`p-4 rounded-xl border-2 transition-all ${
                        qty > 0 ? 'border-club-accent bg-club-accent/5' : 'border-border bg-surface'
                      }`}>
                        <div className="text-4xl mb-2 text-center">{drink.image}</div>
                        <h4 className="font-semibold text-foreground text-center mb-1">
                          {drink.name[locale]}
                        </h4>
                        <p className="text-lg font-bold text-club-accent text-center mb-3">
                          {drink.price.toLocaleString()} XAF
                        </p>
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => updateDrinkQuantity(drink.id, -1)}
                            disabled={qty === 0}
                            className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-border disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-lg">{qty}</span>
                          <button
                            onClick={() => updateDrinkQuantity(drink.id, 1)}
                            className="w-8 h-8 rounded-full bg-club-accent text-white flex items-center justify-center hover:bg-club-accent/90"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tables Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{locale === 'en' ? 'Select Tables' : 'Sélectionnez Tables'}</span>
                  <Badge variant="outline">
                    {selectedTables.length} {locale === 'en' ? 'selected' : 'sélectionné(s)'}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {locale === 'en' ? 'Click to select multiple tables' : 'Cliquez pour sélectionner plusieurs tables'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {tables.map(table => {
                    const isSelected = selectedTables.includes(table.id)
                    return (
                      <button
                        key={table.id}
                        onClick={() => handleTableSelect(table)}
                        disabled={table.status !== 'available'}
                        className={`
                          relative p-4 rounded-xl border-2 text-left transition-all
                          ${table.type === 'regular' ? 'bg-surface' : 'bg-vip-gold/5'}
                          ${table.type === 'vip' ? 'border-vip-gold/50' : table.type === 'vvip' ? 'border-vip-gold' : 'border-border'}
                          ${table.status === 'available' ? 'cursor-pointer hover:border-club-accent' : 'opacity-50 cursor-not-allowed'}
                          ${isSelected ? 'border-club-accent ring-2 ring-club-accent' : ''}
                        `}
                      >
                        {table.type !== 'regular' && (
                          <Badge variant="vip" className="absolute top-2 right-2">
                            {tableTypeLabels[table.type as keyof typeof tableTypeLabels][locale]}
                          </Badge>
                        )}
                        {isSelected && (
                          <div className="absolute top-2 left-2">
                            <CheckCircle className="h-6 w-6 text-club-accent" />
                          </div>
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
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Reservation Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{locale === 'en' ? 'Reservation Summary' : 'Résumé de Réservation'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTables.length > 0 || Object.keys(drinkSelections).length > 0 ? (
                  <>
                    {/* Selected Tables */}
                    {selectedTablesData.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {locale === 'en' ? 'Tables' : 'Tables'}
                        </h4>
                        {selectedTablesData.map(table => (
                          <div key={table.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{table.name}</span>
                            <span className="font-medium text-club-accent">
                              {table.deposit.toLocaleString()} XAF
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-border pt-2 mt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {locale === 'en' ? 'Total Capacity' : 'Capacité Totale'}
                            </span>
                            <span className="font-medium">{totalCapacity} {locale === 'en' ? 'guests' : 'invités'}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Selected Drinks */}
                    {Object.keys(drinkSelections).length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {locale === 'en' ? 'Drinks' : 'Boissons'}
                        </h4>
                        {Object.entries(drinkSelections).map(([drinkId, qty]) => {
                          const drink = drinkPackages.find(d => d.id === drinkId)
                          if (!drink) return null
                          return (
                            <div key={drinkId} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {drink.image} {drink.name[locale]} × {qty}
                              </span>
                              <span className="font-medium text-club-accent">
                                {(drink.price * qty).toLocaleString()} XAF
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Totals */}
                    <div className="border-t border-border pt-4 space-y-2">
                      {tableDeposit > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'en' ? 'Table Deposit(s)' : 'Acompte(s) Table'}
                          </span>
                          <span className="font-medium">{tableDeposit.toLocaleString()} XAF</span>
                        </div>
                      )}
                      {drinkTotal > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {locale === 'en' ? 'Drinks' : 'Boissons'}
                          </span>
                          <span className="font-medium">{drinkTotal.toLocaleString()} XAF</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl font-bold text-foreground pt-2">
                        <span>{locale === 'en' ? 'Total' : 'Total'}</span>
                        <span className="text-club-accent">{grandTotal.toLocaleString()} XAF</span>
                      </div>
                    </div>

                    {/* Guest Count */}
                    <div className="space-y-2">
                      <Label htmlFor="guests">{locale === 'en' ? 'Number of Guests' : 'Nombre d\'Invités'}</Label>
                      <Input
                        id="guests"
                        type="number"
                        min={1}
                        max={totalCapacity || 50}
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      />
                    </div>

                    {/* Customer Details */}
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
                      disabled={selectedTables.length === 0 || !customerName || !customerPhone || isLocking}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isLocking 
                        ? (locale === 'en' ? 'Processing...' : 'Traitement...')
                        : (locale === 'en' ? `Pay ${grandTotal.toLocaleString()} XAF` : `Payer ${grandTotal.toLocaleString()} XAF`)
                      }
                    </Button>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>
                        {locale === 'en' 
                          ? 'Your reservation will be held for 15 minutes after payment'
                          : 'Votre réservation sera maintenue pendant 15 minutes après le paiement'}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {locale === 'en' 
                        ? 'Select tables and drinks to continue'
                        : 'Sélectionnez des tables et boissons pour continuer'}
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
