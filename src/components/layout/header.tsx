'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  Globe,
  Calendar,
  Utensils,
  Home,
  Phone,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type Locale, t, localeNames } from '@/lib/i18n'

interface HeaderProps {
  locale: Locale
  cartItemCount?: number
  isAuthenticated?: boolean
}

export function Header({ locale, cartItemCount = 0, isAuthenticated = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en'
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    window.location.href = `/${newLocale}${pathWithoutLocale}`
  }

  const navItems = [
    { href: `/${locale}`, label: t('nav.home', locale), icon: Home },
    { href: `/${locale}/restaurant`, label: t('nav.restaurant', locale), icon: Utensils },
    { href: `/${locale}/events`, label: t('nav.events', locale), icon: Calendar },
    { href: `/${locale}/contact`, label: t('nav.contact', locale), icon: Phone },
    { href: `/${locale}/faq`, label: t('nav.faq', locale), icon: HelpCircle },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-dark/95 backdrop-blur supports-[backdrop-filter]:bg-dark/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-white">E</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-foreground">Empire</span>
              <span className="text-lg font-light text-muted-foreground"> Hybrid</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm",
                    pathname === item.href && "bg-surface-elevated"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hidden sm:flex"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">{localeNames[locale]}</span>
            </Button>

            {/* Cart */}
            <Link href={`/${locale}/restaurant/cart`}>
              <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <Link href={`/${locale}/dashboard`}>
                <Button variant="ghost" size="icon" aria-label="Dashboard">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href={`/${locale}/auth/sign-in`}>
                <Button variant="outline" size="sm">
                  {t('nav.signIn', locale)}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3",
                        pathname === item.href && "bg-surface-elevated"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={toggleLanguage}
              >
                <Globe className="h-5 w-5" />
                {locale === 'en' ? 'Français' : 'English'}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
