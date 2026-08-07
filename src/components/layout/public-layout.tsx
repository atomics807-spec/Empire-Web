'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { NotificationBanner } from '@/components/features/notification-banner'
import { type Locale } from '@/lib/i18n'

interface PublicLayoutProps {
  children: React.ReactNode
  locale: Locale
  isAuthenticated?: boolean
}

export function PublicLayout({ 
  children, 
  locale, 
  isAuthenticated = false 
}: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <NotificationBanner locale={locale} />
      <Header 
        locale={locale} 
        isAuthenticated={isAuthenticated}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  )
}
