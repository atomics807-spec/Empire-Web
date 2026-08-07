import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { TooltipProvider } from '@/components/ui'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <div lang={locale} className="min-h-screen">
      <TooltipProvider delayDuration={300}>
        {children}
      </TooltipProvider>
    </div>
  )
}
