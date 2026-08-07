// ============================================
// USER ROLES AND AUTHENTICATION
// ============================================

export type UserRole = 
  | 'super_admin'
  | 'restaurant_manager'
  | 'kitchen_staff'
  | 'club_manager'
  | 'bouncer'
  | 'customer'

export interface Profile {
  id: string
  full_name: string | null
  phone_number: string | null
  preferred_language: 'en' | 'fr'
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============================================
// BUSINESS SETTINGS
// ============================================

export interface BusinessSettings {
  id: string
  business_name: string
  restaurant_name: string
  club_name: string
  timezone: string
  restaurant_opening_time: string // HH:mm format
  restaurant_closing_time: string // HH:mm format
  club_opening_time: string // HH:mm format
  club_closing_time: string // HH:mm format
  manual_ordering_override: boolean
  address: string
  latitude: number | null
  longitude: number | null
  phone: string
  email: string
  whatsapp: string
  default_currency: string
  payment_provider: 'campay' | 'monetbil' | 'sandbox'
  cancellation_policy: string
  social_links: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  map_url: string | null
  created_at: string
  updated_at: string
}

// ============================================
// RESTAURANT MODULE
// ============================================

export interface RestaurantCategory {
  id: string
  names: { en: string; fr: string }
  slug: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  names: { en: string; fr: string }
  descriptions: { en: string; fr: string }
  price: number // XAF cents or smallest unit
  image_path: string | null
  is_available: boolean
  late_night_available: boolean
  is_featured: boolean
  display_order: number
  estimated_prep_time: number // minutes
  created_at: string
  updated_at: string
}

export type DeliveryType = 'dine_in' | 'takeaway'

export type OrderStatus = 
  | 'draft'
  | 'pending_payment'
  | 'paid'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export interface Order {
  id: string
  customer_id: string
  delivery_type: DeliveryType
  table_id: string | null
  status: OrderStatus
  subtotal: number
  fees: number
  total: number
  customer_note: string | null
  kitchen_note: string | null
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  created_at: string
  paid_at: string | null
  preparing_at: string | null
  ready_at: string | null
  completed_at: string | null
  cancelled_at: string | null
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  item_name_snapshot: string // Bilingual name stored
  unit_price_snapshot: number
  quantity: number
  line_total: number
  customer_instructions: string | null
}

// ============================================
// PHYSICAL TABLES
// ============================================

export type TableType = 
  | 'restaurant_standard'
  | 'club_regular'
  | 'club_vip'
  | 'club_vvip'

export type TableArea = 
  | 'main_dining'
  | 'terrace'
  | 'dancefloor'
  | 'lounge'
  | 'vip_section'

export interface PhysicalTable {
  id: string
  table_code: string
  display_name: string
  table_type: TableType
  area: TableArea
  seating_capacity: number
  minimum_spend: number
  position_x: number
  position_y: number
  width: number
  height: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============================================
// EVENTS AND TICKETING
// ============================================

export type EventPublicationStatus = 'draft' | 'published' | 'cancelled' | 'postponed'

export interface Event {
  id: string
  titles: { en: string; fr: string }
  slug: string
  descriptions: { en: string; fr: string }
  start_time: string
  end_time: string
  doors_open_time: string
  flyer_path: string | null
  venue: string
  publication_status: EventPublicationStatus
  is_featured: boolean
  age_policy: string | null
  dress_code: string | null
  is_cancelled: boolean
  cancellation_reason: string | null
  seo_title: string | null
  seo_description: string | null
  notification_sent: boolean
  created_at: string
  updated_at: string
}

export interface TicketType {
  id: string
  event_id: string
  name: string
  description: string | null
  price: number
  total_inventory: number
  reserved_inventory: number
  sold_inventory: number
  sales_start: string
  sales_end: string
  max_per_purchase: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============================================
// TABLE RESERVATIONS
// ============================================

export type EventTableStatus = 
  | 'available'
  | 'locked'
  | 'reserved'
  | 'occupied'
  | 'unavailable'

export interface EventTable {
  id: string
  event_id: string
  table_id: string
  price: number
  minimum_spend: number
  status: EventTableStatus
  locked_by_user: string | null
  lock_expires_at: string | null
  reservation_reference: string | null
  created_at: string
  updated_at: string
}

export type ReservationStatus = 
  | 'pending_payment'
  | 'confirmed'
  | 'checked_in'
  | 'cancelled'
  | 'expired'
  | 'refunded'

export interface Reservation {
  id: string
  customer_id: string
  event_id: string
  event_table_id: string
  guest_count: number
  status: ReservationStatus
  deposit_amount: number
  total_expected: number
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  customer_note: string | null
  confirmation_sent_at: string | null
  checked_in_at: string | null
  cancelled_at: string | null
  created_at: string
  updated_at: string
}

// ============================================
// TICKET ORDERS
// ============================================

export interface EventTicketOrder {
  id: string
  customer_id: string
  event_id: string
  status: OrderStatus
  subtotal: number
  fees: number
  total: number
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  created_at: string
  paid_at: string | null
}

export interface EventTicketItem {
  id: string
  order_id: string
  ticket_type_id: string
  ticket_name_snapshot: string
  unit_price_snapshot: number
  quantity: number
  line_total: number
}

// ============================================
// GUEST LIST
// ============================================

export type GuestListStatus = 'pending' | 'approved' | 'rejected' | 'checked_in' | 'cancelled'

export interface GuestListEntry {
  id: string
  event_id: string
  customer_id: string | null
  guest_name: string
  guest_phone: string
  guest_email: string | null
  guest_count: number
  status: GuestListStatus
  approved_by: string | null
  approved_at: string | null
  rejection_reason: string | null
  checked_in_at: string | null
  checked_in_by: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

// ============================================
// PAYMENTS
// ============================================

export type PaymentProvider = 'campay' | 'monetbil' | 'sandbox'

export type PaymentStatus = 
  | 'initiated'
  | 'pending'
  | 'successful'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded'

export type PaymentTargetType = 'order' | 'reservation' | 'ticket_order'

export interface Payment {
  id: string
  user_id: string
  provider: PaymentProvider
  internal_reference: string
  provider_reference: string | null
  target_type: PaymentTargetType
  target_id: string
  payment_method: string | null
  phone_number: string | null
  amount: number
  currency: string
  status: PaymentStatus
  failure_code: string | null
  failure_message: string | null
  initiated_at: string
  confirmed_at: string | null
  failed_at: string | null
  refunded_at: string | null
  idempotency_key: string
  created_at: string
  updated_at: string
}

export interface PaymentEvent {
  id: string
  provider: PaymentProvider
  provider_event_id: string
  payment_reference: string | null
  event_type: string
  signature_valid: boolean
  sanitized_payload: Record<string, unknown>
  processing_status: 'received' | 'processed' | 'failed' | 'duplicate'
  received_at: string
  processed_at: string | null
  processing_error: string | null
}

// ============================================
// DIGITAL PASSES
// ============================================

export type PassStatus = 
  | 'active'
  | 'checked_in'
  | 'expired'
  | 'revoked'
  | 'cancelled'

export interface Pass {
  id: string
  owner_id: string
  event_id: string
  target_type: PaymentTargetType
  target_id: string
  token_hash: string
  token_version: number
  status: PassStatus
  issued_at: string
  expires_at: string
  checked_in_at: string | null
  checked_in_by: string | null
  revoked_at: string | null
  created_at: string
  updated_at: string
}

// ============================================
// PUSH NOTIFICATIONS
// ============================================

export interface PushSubscription {
  id: string
  user_id: string | null
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
  locale: 'en' | 'fr'
  user_agent: string | null
  is_active: boolean
  last_success: string | null
  failure_count: number
  created_at: string
  updated_at: string
}

// ============================================
// NOTIFICATIONS
// ============================================

export type NotificationType = 
  | 'event_announcement'
  | 'lunch_special'
  | 'reservation_reminder'
  | 'event_change'
  | 'order_ready'
  | 'general'

export interface Notification {
  id: string
  title: string
  body: string
  notification_type: NotificationType
  sent_by: string | null
  target_audience: 'all' | 'restaurant_customers' | 'club_customers' | 'specific_users'
  target_user_ids: string[] | null
  sent_at: string | null
  created_at: string
}

// ============================================
// AUDIT LOGS
// ============================================

export interface AuditLog {
  id: string
  actor_id: string | null
  actor_role: UserRole | null
  action: string
  entity_type: string
  entity_id: string | null
  before_state: Record<string, unknown> | null
  after_state: Record<string, unknown> | null
  request_id: string | null
  ip_hash: string | null
  user_agent: string | null
  created_at: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

// ============================================
// CART TYPES
// ============================================

export interface CartItem {
  menu_item: MenuItem
  quantity: number
  instructions: string | null
}

export interface Cart {
  items: CartItem[]
  delivery_type: DeliveryType
  table_id: string | null
  customer_note: string | null
}

// ============================================
// BUSINESS STATUS
// ============================================

export interface BusinessStatus {
  is_restaurant_open: boolean
  is_club_open: boolean
  is_ordering_allowed: boolean
  restaurant_closes_at: string | null
  next_state_change: string | null
  current_time: string
  timezone: string
  manual_override_active: boolean
}
