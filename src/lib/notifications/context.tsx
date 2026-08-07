'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

export interface Notification {
  id: string
  type: 'event' | 'promotion' | 'general'
  title: { en: string; fr: string }
  message: { en: string; fr: string }
  eventId?: string
  eventSlug?: string
  actionUrl?: string
  actionLabel?: { en: string; fr: string }
  createdAt: string
  expiresAt?: string
  dismissed?: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  dismissNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const NOTIFICATION_STORAGE_KEY = 'empire-notifications'

function generateId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load notifications from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATION_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          // Filter out expired notifications
          const now = new Date().toISOString()
          const validNotifications = parsed.filter(
            (n: Notification) => !n.expiresAt || n.expiresAt > now
          )
          setNotifications(validNotifications)
        }
      }
    } catch (error) {
      console.error('Failed to load notifications from storage:', error)
    }
    setIsHydrated(true)
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(notifications))
      } catch (error) {
        console.error('Failed to save notifications to storage:', error)
      }
    }
  }, [notifications, isHydrated])

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    
    setNotifications(current => {
      // Keep only last 10 notifications
      const updated = [newNotification, ...current].slice(0, 10)
      return updated
    })
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setNotifications(current =>
      current.filter(n => n.id !== id)
    )
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter(n => !n.dismissed).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        dismissNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
