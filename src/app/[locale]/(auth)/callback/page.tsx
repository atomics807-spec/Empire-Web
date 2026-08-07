'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Loader2 } from 'lucide-react'

interface CallbackPageProps {
  params: Promise<{ locale: string }>
}

export default function CallbackPage({ params }: CallbackPageProps) {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      // In production, this would verify the auth callback with Supabase
      // and then redirect to the dashboard
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push('/en/dashboard')
    }
    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Authenticating...</h1>
        <p className="text-muted-foreground mb-6">Please wait while we verify your account.</p>
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      </div>
    </div>
  )
}
