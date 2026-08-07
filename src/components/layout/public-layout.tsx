import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { type Locale } from '@/lib/i18n'

interface PublicLayoutProps {
  children: React.ReactNode
  locale: Locale
  cartItemCount?: number
  isAuthenticated?: boolean
}

export function PublicLayout({ 
  children, 
  locale, 
  cartItemCount = 0,
  isAuthenticated = false 
}: PublicLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        locale={locale} 
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  )
}
