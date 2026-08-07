'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, Calendar, Sparkles, Bell } from 'lucide-react'
import { useNotifications, type Notification } from '@/lib/notifications/context'
import { type Locale } from '@/lib/i18n'

interface NotificationBannerProps {
  locale: Locale
}

export function NotificationBanner({ locale }: NotificationBannerProps) {
  const { notifications, dismissNotification } = useNotifications()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Get active notifications (not dismissed)
  const activeNotifications = notifications.filter(n => !n.dismissed)

  if (activeNotifications.length === 0) {
    return null
  }

  const currentNotification = activeNotifications[currentIndex]

  const handleNext = () => {
    if (currentIndex < activeNotifications.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleDismiss = () => {
    dismissNotification(currentNotification.id)
    if (currentIndex >= activeNotifications.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'event':
        return Calendar
      case 'promotion':
        return Sparkles
      default:
        return Bell
    }
  }

  const Icon = getIcon(currentNotification.type)

  return (
    <div className="bg-gradient-to-r from-club-accent to-primary text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Icon className="h-5 w-5" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">
              {currentNotification.title[locale]}
            </p>
            <p className="text-xs text-white/80 truncate">
              {currentNotification.message[locale]}
            </p>
          </div>

          {/* Action */}
          {currentNotification.actionUrl && (
            <Link 
              href={currentNotification.actionUrl}
              className="flex-shrink-0 px-4 py-2 bg-white text-club-accent rounded-lg font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              {currentNotification.actionLabel?.[locale] || (locale === 'en' ? 'View' : 'Voir')}
            </Link>
          )}

          {/* Navigation (if multiple notifications) */}
          {activeNotifications.length > 1 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs"
              >
                ‹
              </button>
              <span className="text-xs text-white/80">
                {currentIndex + 1}/{activeNotifications.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentIndex === activeNotifications.length - 1}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs"
              >
                ›
              </button>
            </div>
          )}

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
