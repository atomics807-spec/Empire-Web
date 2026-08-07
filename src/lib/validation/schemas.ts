import { z } from 'zod'

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Invalid email address')

/**
 * Password validation schema
 * Minimum 8 characters, at least one letter and one number
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

/**
 * Cameroon phone number validation
 * Accepts formats: +237XXXXXXXX, 237XXXXXXXX, 0XXXXXXXX
 */
export const phoneSchema = z
  .string()
  .transform((val) => val.replace(/\s+/g, ''))
  .refine(
    (val) => /^(237[62]\d{8}|237[23]\d{8}|0[62]\d{8}|0[23]\d{8})$/.test(val),
    'Invalid Cameroon phone number'
  )

/**
 * Sign up schema
 */
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: phoneSchema,
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type SignUpInput = z.infer<typeof signUpSchema>

/**
 * Sign in schema
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

export type SignInInput = z.infer<typeof signInSchema>

/**
 * Forgot password schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

/**
 * Reset password schema
 */
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phoneNumber: phoneSchema.optional(),
  preferredLanguage: z.enum(['en', 'fr']).optional(),
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>

/**
 * Menu item schema
 */
export const menuItemSchema = z.object({
  categoryId: z.string().uuid('Invalid category ID'),
  names: z.object({
    en: z.string().min(1, 'English name is required'),
    fr: z.string().min(1, 'French name is required'),
  }),
  descriptions: z.object({
    en: z.string().min(1, 'English description is required'),
    fr: z.string().min(1, 'French description is required'),
  }),
  price: z.number().int().min(0, 'Price must be a positive number'),
  estimatedPrepTime: z.number().int().min(1, 'Preparation time must be at least 1 minute'),
  isAvailable: z.boolean().default(true),
  lateNightAvailable: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
})

export type MenuItemInput = z.infer<typeof menuItemSchema>

/**
 * Category schema
 */
export const categorySchema = z.object({
  names: z.object({
    en: z.string().min(1, 'English name is required'),
    fr: z.string().min(1, 'French name is required'),
  }),
  displayOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
})

export type CategoryInput = z.infer<typeof categorySchema>

/**
 * Cart item schema
 */
export const cartItemSchema = z.object({
  menuItemId: z.string().uuid('Invalid menu item ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  instructions: z.string().max(500, 'Instructions too long').optional(),
})

export type CartItemInput = z.infer<typeof cartItemSchema>

/**
 * Cart schema
 */
export const cartSchema = z.object({
  items: z.array(cartItemSchema).min(1, 'Cart must have at least one item'),
  deliveryType: z.enum(['dine_in', 'takeaway']),
  tableId: z.string().uuid('Invalid table ID').nullable().optional(),
  customerNote: z.string().max(500, 'Note too long').optional(),
})

export type CartInput = z.infer<typeof cartSchema>

/**
 * Order status update schema
 */
export const orderStatusSchema = z.object({
  status: z.enum(['preparing', 'ready', 'completed', 'cancelled']),
})

/**
 * Table lock schema
 */
export const tableLockSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  tableId: z.string().uuid('Invalid table ID'),
})

/**
 * Reservation schema
 */
export const reservationSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  eventTableId: z.string().uuid('Invalid table ID'),
  guestCount: z.number().int().min(1, 'Guest count must be at least 1'),
  customerNote: z.string().max(500).optional(),
})

export type ReservationInput = z.infer<typeof reservationSchema>

/**
 * Ticket purchase schema
 */
export const ticketPurchaseSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  tickets: z.array(z.object({
    ticketTypeId: z.string().uuid('Invalid ticket type ID'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  })).min(1, 'Must purchase at least one ticket'),
})

export type TicketPurchaseInput = z.infer<typeof ticketPurchaseSchema>

/**
 * Guest list entry schema
 */
export const guestListEntrySchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  guestName: z.string().min(2, 'Guest name is required'),
  guestPhone: phoneSchema,
  guestEmail: emailSchema.optional(),
  guestCount: z.number().int().min(1, 'Guest count must be at least 1').max(10),
  notes: z.string().max(500).optional(),
})

export type GuestListEntryInput = z.infer<typeof guestListEntrySchema>

/**
 * Payment initiation schema
 */
export const paymentInitSchema = z.object({
  targetType: z.enum(['order', 'reservation', 'ticket_order']),
  targetId: z.string().uuid('Invalid target ID'),
  phoneNumber: phoneSchema,
  paymentMethod: z.string().optional(),
})

export type PaymentInitInput = z.infer<typeof paymentInitSchema>

/**
 * Check-in schema
 */
export const checkInSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

export type CheckInInput = z.infer<typeof checkInSchema>

/**
 * Push subscription schema
 */
export const pushSubscriptionSchema = z.object({
  endpoint: z.string().url('Invalid endpoint URL'),
  keys: z.object({
    p256dh: z.string().min(1, 'p256dh key is required'),
    auth: z.string().min(1, 'auth key is required'),
  }),
})

export type PushSubscriptionInput = z.infer<typeof pushSubscriptionSchema>

/**
 * Notification schema
 */
export const notificationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  body: z.string().min(1, 'Body is required').max(500),
  notificationType: z.enum([
    'event_announcement',
    'lunch_special',
    'reservation_reminder',
    'event_change',
    'order_ready',
    'general',
  ]),
  targetAudience: z.enum(['all', 'restaurant_customers', 'club_customers', 'specific_users']),
  targetUserIds: z.array(z.string().uuid()).optional(),
})

export type NotificationInput = z.infer<typeof notificationSchema>

/**
 * Business settings schema
 */
export const businessSettingsSchema = z.object({
  restaurantName: z.string().min(1).max(100),
  clubName: z.string().min(1).max(100),
  restaurantOpeningTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  restaurantClosingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  clubOpeningTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  clubClosingTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  manualOrderingOverride: z.boolean().optional(),
  address: z.string().max(500),
  phone: phoneSchema,
  email: emailSchema,
  whatsapp: phoneSchema,
  defaultCurrency: z.string().default('XAF'),
  paymentProvider: z.enum(['campay', 'monetbil', 'sandbox']).optional(),
})

export type BusinessSettingsInput = z.infer<typeof businessSettingsSchema>

/**
 * Staff creation schema
 */
export const staffCreateSchema = z.object({
  email: emailSchema,
  fullName: z.string().min(2),
  phoneNumber: phoneSchema,
  role: z.enum(['super_admin', 'restaurant_manager', 'kitchen_staff', 'club_manager', 'bouncer']),
})

export type StaffCreateInput = z.infer<typeof staffCreateSchema>
