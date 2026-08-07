import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with Tailwind CSS using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price in XAF currency
 */
export function formatPrice(amount: number, currency: string = 'XAF'): string {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Generate a random string for tokens
 */
export function generateId(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Phone number normalizer for Cameroon
 */
export function normalizeCameroonPhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  
  // Handle various formats
  if (digits.startsWith('237')) {
    return digits
  }
  if (digits.startsWith('00237')) {
    return digits.replace('00237', '237')
  }
  if (digits.startsWith('0')) {
    return '237' + digits.substring(1)
  }
  return '237' + digits
}

/**
 * Validate Cameroon phone number
 */
export function isValidCameroonPhone(phone: string): boolean {
  const normalized = normalizeCameroonPhone(phone)
  // Cameroon numbers are 237 + 6XXXXXXXX or 237 + 2XXXXXXXX (landline)
  return /^(237[62])\d{8}$/.test(normalized) || /^(237[23])\d{8}$/.test(normalized)
}

/**
 * Slug generator
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}
