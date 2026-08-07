'use client'

import { useNotifications } from './context'
import type { Notification } from './context'

/**
 * Hook for triggering notifications from anywhere in the app
 * This can be called when admin posts a new event
 */
export function useNotificationActions() {
  const { addNotification } = useNotifications()

  const notifyNewEvent = (event: {
    id: string
    slug: string
    title: { en: string; fr: string }
    date: string
  }) => {
    addNotification({
      type: 'event',
      title: {
        en: '🎉 New Event Posted!',
        fr: '🎉 Nouvel Événement Publié !',
      },
      message: {
        en: `${event.title.en} - ${event.date}`,
        fr: `${event.title.fr} - ${event.date}`,
      },
      eventId: event.id,
      eventSlug: event.slug,
      actionUrl: `/${'en'}/events/${event.slug}`,
      actionLabel: {
        en: 'Get Tickets',
        fr: 'Voir les Billets',
      },
      // Expires in 7 days
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    })
  }

  const notifyPromotion = (promotion: {
    title: { en: string; fr: string }
    message: { en: string; fr: string }
    actionUrl?: string
    actionLabel?: { en: string; fr: string }
  }) => {
    addNotification({
      type: 'promotion',
      title: promotion.title,
      message: promotion.message,
      actionUrl: promotion.actionUrl,
      actionLabel: promotion.actionLabel,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    })
  }

  const notifyGeneral = (notification: {
    title: { en: string; fr: string }
    message: { en: string; fr: string }
    actionUrl?: string
    actionLabel?: { en: string; fr: string }
  }) => {
    addNotification({
      type: 'general',
      title: notification.title,
      message: notification.message,
      actionUrl: notification.actionUrl,
      actionLabel: notification.actionLabel,
    })
  }

  return {
    notifyNewEvent,
    notifyPromotion,
    notifyGeneral,
  }
}

/**
 * Hook to get current notifications for display
 */
export function useEventNotifications() {
  const { notifications, unreadCount, dismissNotification, clearAllNotifications } = useNotifications()
  
  // Filter to only event notifications
  const eventNotifications = notifications.filter(n => n.type === 'event')
  
  return {
    notifications,
    eventNotifications,
    unreadCount,
    dismissNotification,
    clearAllNotifications,
  }
}
