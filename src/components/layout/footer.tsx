import Link from 'next/link'
import { type Locale, t } from '@/lib/i18n'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">Empire</span>
                <span className="text-lg font-light text-muted-foreground"> Hybrid</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {locale === 'en' 
                ? 'Hybrid daytime restaurant and night club experience in Limbe, Cameroon.'
                : 'Expérience de restaurant et boîte de nuit hybride en journée à Limbe, Cameroun.'}
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-foreground" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {locale === 'en' ? 'Quick Links' : 'Liens Rapides'}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link href={`/${locale}/restaurant`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.restaurant', locale)}
              </Link>
              <Link href={`/${locale}/restaurant/menu`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.menu', locale)}
              </Link>
              <Link href={`/${locale}/events`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.events', locale)}
              </Link>
              <Link href={`/${locale}/gallery`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.gallery', locale)}
              </Link>
              <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.about', locale)}
              </Link>
              <Link href={`/${locale}/careers`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.careers', locale)}
              </Link>
              <Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.contact', locale)}
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {locale === 'en' ? 'Legal' : 'Juridique'}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {locale === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité'}
              </Link>
              <Link href={`/${locale}/terms`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {locale === 'en' ? 'Terms of Service' : "Conditions d'Utilisation"}
              </Link>
              <Link href={`/${locale}/refund-policy`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {locale === 'en' ? 'Refund Policy' : 'Politique de Remboursement'}
              </Link>
              <Link href={`/${locale}/faq`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.faq', locale)}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {locale === 'en' ? 'Contact' : 'Contact'}
            </h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  {locale === 'en' 
                    ? 'Sappa Road, opposite Limbe Community Field, Limbe, Cameroon'
                    : 'Route Sappa, face au Terrain Communautaire de Limbe, Limbe, Cameroun'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+237600000000" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +237 6 00 00 00 00
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@empire-hybrid.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@empire-hybrid.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-restaurant-accent flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>{locale === 'en' ? 'Restaurant: 8:00 - 17:30' : 'Restaurant: 8h00 - 17h30'}</p>
                  <p>{locale === 'en' ? 'Club: 20:00 - 06:00' : 'Boîte: 20h00 - 6h00'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Empire Hybrid Lounge. 
              {locale === 'en' ? ' All rights reserved.' : ' Tous droits réservés.'}
            </p>
            <p className="text-sm text-muted-foreground">
              {locale === 'en' 
                ? 'Located on Sappa Road, Limbe, Cameroon'
                : 'Situé Route Sappa, Limbe, Cameroun'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
