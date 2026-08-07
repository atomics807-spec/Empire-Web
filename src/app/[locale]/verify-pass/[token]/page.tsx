'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Clock, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PassData {
  valid: boolean
  status: 'valid' | 'checked_in' | 'expired' | 'revoked' | 'invalid'
  eventTitle?: string
  eventDate?: string
  guestName?: string
  checkedInAt?: string
  error?: string
}

export default function VerifyPassPage() {
  const params = useParams()
  const router = useRouter()
  const [passData, setPassData] = useState<PassData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verifyPass = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setPassData({
          valid: true,
          status: 'valid',
          eventTitle: 'Saturday Night Fever',
          eventDate: 'August 15, 2026',
          guestName: 'Guest',
        })
      } catch {
        setPassData({
          valid: false,
          status: 'invalid',
          error: 'Unable to verify pass',
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (params.token) {
      verifyPass()
    }
  }, [params.token])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying pass...</p>
        </div>
      </div>
    )
  }

  if (!passData || !passData.valid) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-surface border-border">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-danger/20 flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-10 w-10 text-danger" />
            </div>
            <CardTitle className="text-2xl text-danger mb-2">Invalid Pass</CardTitle>
            <p className="text-muted-foreground mb-6">
              {passData?.error || 'This pass could not be verified.'}
            </p>
            <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusConfig: Record<string, { icon: any; color: string; bgColor: string; title: string; message: string }> = {
    valid: { icon: CheckCircle, color: 'text-success', bgColor: 'bg-success/20', title: 'Valid Pass', message: 'Entry approved.' },
    checked_in: { icon: CheckCircle, color: 'text-info', bgColor: 'bg-info/20', title: 'Already Used', message: 'This pass has been used.' },
    expired: { icon: Clock, color: 'text-warning', bgColor: 'bg-warning/20', title: 'Expired Pass', message: 'This pass has expired.' },
    revoked: { icon: XCircle, color: 'text-danger', bgColor: 'bg-danger/20', title: 'Revoked Pass', message: 'This pass has been revoked.' },
    invalid: { icon: XCircle, color: 'text-danger', bgColor: 'bg-danger/20', title: 'Invalid Pass', message: 'This pass is invalid.' },
  }

  const config = statusConfig[passData.status]

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-surface border-border">
        <CardHeader className="text-center pb-2">
          <div className={`w-24 h-24 rounded-2xl ${config.bgColor} flex items-center justify-center mx-auto mb-4`}>
            <config.icon className={`h-12 w-12 ${config.color}`} />
          </div>
          <CardTitle className={`text-3xl ${config.color}`}>{config.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">{config.message}</p>

          {passData.status === 'valid' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-surface-elevated space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{passData.eventTitle}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-restaurant-accent" />
                  <span className="text-foreground">{passData.eventDate}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Welcome to Empire Hybrid Lounge!</p>
            </div>
          )}

          <Button variant="outline" onClick={() => router.back()} className="w-full">Done</Button>
        </CardContent>
      </Card>
    </div>
  )
}
