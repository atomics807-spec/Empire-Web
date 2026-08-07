import { format, parseISO, addMinutes, isAfter, isBefore } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'
import { enUS, fr } from 'date-fns/locale'

// Cameroon timezone (Africa/Douala)
export const CAMEROON_TIMEZONE = 'Africa/Douala'

const localeMap = {
  en: enUS,
  fr: fr,
}

/**
 * Get the current time in Cameroon timezone
 */
export function getCurrentTimeInCameroon(): Date {
  return toZonedTime(new Date(), CAMEROON_TIMEZONE)
}

/**
 * Get the current time as ISO string in Cameroon timezone
 */
export function getCurrentTimeISO(): string {
  return toZonedTime(new Date(), CAMEROON_TIMEZONE).toISOString()
}

/**
 * Convert a UTC date to Cameroon timezone
 */
export function toCameroonTime(date: Date | string): Date {
  const d = typeof date === 'string' ? parseISO(date) : date
  return toZonedTime(d, CAMEROON_TIMEZONE)
}

/**
 * Convert a Cameroon timezone date to UTC
 */
export function fromCameroonTime(date: Date | string): Date {
  const d = typeof date === 'string' ? parseISO(date) : date
  return fromZonedTime(d, CAMEROON_TIMEZONE)
}

/**
 * Parse a time string (HH:mm) and return today's date in Cameroon timezone
 */
export function parseTimeToToday(timeStr: string): Date {
  const today = getCurrentTimeInCameroon()
  const [hours, minutes] = timeStr.split(':').map(Number)
  
  const zonedDate = toZonedTime(today, CAMEROON_TIMEZONE)
  zonedDate.setHours(hours, minutes, 0, 0)
  
  return zonedDate
}

/**
 * Check if current time is within restaurant operating hours
 */
export function isRestaurantOpen(
  openingTime: string,
  closingTime: string,
  manualOverride: boolean = false
): boolean {
  if (manualOverride) {
    return true
  }

  const now = getCurrentTimeInCameroon()
  const opening = parseTimeToToday(openingTime)
  const closing = parseTimeToToday(closingTime)

  // Handle case where closing time is after midnight
  if (closing <= opening) {
    return isAfter(now, opening) || isBefore(now, closing)
  }

  return isAfter(now, opening) && isBefore(now, closing)
}

/**
 * Get the time remaining until restaurant closes
 */
export function getTimeUntilRestaurantCloses(closingTime: string): number {
  const now = getCurrentTimeInCameroon()
  const closing = parseTimeToToday(closingTime)
  
  return closing.getTime() - now.getTime()
}

/**
 * Format time for display (e.g., "8:00 AM")
 */
export function formatTime(date: Date | string, locale: 'en' | 'fr' = 'en'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(toCameroonTime(d), 'h:mm a', { locale: localeMap[locale] })
}

/**
 * Format time in 24-hour format (e.g., "08:00")
 */
export function formatTime24(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(toCameroonTime(d), 'HH:mm')
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string, locale: 'en' | 'fr' = 'en'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(toCameroonTime(d), 'PPP', { locale: localeMap[locale] })
}

/**
 * Format datetime for display
 */
export function formatDateTime(date: Date | string, locale: 'en' | 'fr' = 'en'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(toCameroonTime(d), 'PPp', { locale: localeMap[locale] })
}

/**
 * Check if a given time is before a threshold
 */
export function isBeforeTime(timeStr: string, thresholdStr: string): boolean {
  const time = parseTimeToToday(timeStr)
  const threshold = parseTimeToToday(thresholdStr)
  return isBefore(time, threshold)
}

/**
 * Check if a given time is after a threshold
 */
export function isAfterTime(timeStr: string, thresholdStr: string): boolean {
  const time = parseTimeToToday(timeStr)
  const threshold = parseTimeToToday(thresholdStr)
  return isAfter(time, threshold)
}

/**
 * Add minutes to a date
 */
export function addMinutesToDate(date: Date | string, minutes: number): Date {
  const d = typeof date === 'string' ? parseISO(date) : date
  return addMinutes(d, minutes)
}

/**
 * Get elapsed minutes since a date
 */
export function getElapsedMinutes(date: Date | string): number {
  const d = typeof date === 'string' ? parseISO(date) : date
  const now = getCurrentTimeInCameroon()
  return Math.floor((now.getTime() - toCameroonTime(d).getTime()) / 60000)
}

/**
 * Check if date is today in Cameroon timezone
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date
  const now = getCurrentTimeInCameroon()
  const zoned = toCameroonTime(d)
  
  return (
    now.getFullYear() === zoned.getFullYear() &&
    now.getMonth() === zoned.getMonth() &&
    now.getDate() === zoned.getDate()
  )
}
