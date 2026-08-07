import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart/context'
import { NotificationProvider } from '@/lib/notifications/context'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Empire Hybrid Lounge',
    template: '%s | Empire Hybrid Lounge',
  },
  description: 'Hybrid daytime restaurant and night club experience in Limbe, Cameroon',
  keywords: ['restaurant', 'night club', 'Limbe', 'Cameroon', 'dining', 'entertainment'],
  authors: [{ name: 'Empire Hybrid Lounge' }],
  creator: 'Empire Hybrid Lounge',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://empire-hybrid-lounge.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR'],
    siteName: 'Empire Hybrid Lounge',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4f6f9' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0c10' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <CartProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </CartProvider>
      </body>
    </html>
  )
}
