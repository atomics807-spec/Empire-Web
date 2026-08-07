-- ============================================
-- EMPIRE HYBRID LOUNGE - INITIAL DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

-- User roles
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'restaurant_manager',
  'kitchen_staff',
  'club_manager',
  'bouncer',
  'customer'
);

-- Order statuses
CREATE TYPE order_status AS ENUM (
  'draft',
  'pending_payment',
  'paid',
  'preparing',
  'ready',
  'completed',
  'cancelled',
  'refunded'
);

-- Payment statuses
CREATE TYPE payment_status AS ENUM (
  'initiated',
  'pending',
  'successful',
  'failed',
  'cancelled',
  'refunded',
  'partially_refunded'
);

-- Delivery types
CREATE TYPE delivery_type AS ENUM (
  'dine_in',
  'takeaway'
);

-- Table types
CREATE TYPE table_type AS ENUM (
  'restaurant_standard',
  'club_regular',
  'club_vip',
  'club_vvip'
);

-- Table areas
CREATE TYPE table_area AS ENUM (
  'main_dining',
  'terrace',
  'dancefloor',
  'lounge',
  'vip_section'
);

-- Event publication status
CREATE TYPE event_publication_status AS ENUM (
  'draft',
  'published',
  'cancelled',
  'postponed'
);

-- Event table status
CREATE TYPE event_table_status AS ENUM (
  'available',
  'locked',
  'reserved',
  'occupied',
  'unavailable'
);

-- Reservation status
CREATE TYPE reservation_status AS ENUM (
  'pending_payment',
  'confirmed',
  'checked_in',
  'cancelled',
  'expired',
  'refunded'
);

-- Guest list status
CREATE TYPE guest_list_status AS ENUM (
  'pending',
  'approved',
  'rejected',
  'checked_in',
  'cancelled'
);

-- Pass status
CREATE TYPE pass_status AS ENUM (
  'active',
  'checked_in',
  'expired',
  'revoked',
  'cancelled'
);

-- Payment target types
CREATE TYPE payment_target_type AS ENUM (
  'order',
  'reservation',
  'ticket_order'
);

-- Notification types
CREATE TYPE notification_type AS ENUM (
  'event_announcement',
  'lunch_special',
  'reservation_reminder',
  'event_change',
  'order_ready',
  'general'
);

-- Payment providers
CREATE TYPE payment_provider AS ENUM (
  'campay',
  'monetbil',
  'sandbox'
);

-- ============================================
-- TABLES
-- ============================================

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'fr')),
  role user_role DEFAULT 'customer',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business settings (single row configuration)
CREATE TABLE business_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL DEFAULT 'Empire Hybrid Lounge',
  restaurant_name TEXT NOT NULL DEFAULT 'Empire Restaurant',
  club_name TEXT NOT NULL DEFAULT 'Empire Night Club',
  timezone TEXT NOT NULL DEFAULT 'Africa/Douala',
  restaurant_opening_time TIME NOT NULL DEFAULT '08:00',
  restaurant_closing_time TIME NOT NULL DEFAULT '17:30',
  club_opening_time TIME NOT NULL DEFAULT '20:00',
  club_closing_time TIME NOT NULL DEFAULT '06:00',
  manual_ordering_override BOOLEAN DEFAULT false,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  default_currency TEXT DEFAULT 'XAF',
  payment_provider payment_provider DEFAULT 'sandbox',
  cancellation_policy TEXT,
  social_links JSONB DEFAULT '{}',
  map_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default business settings
INSERT INTO business_settings (id) VALUES (uuid_generate_v4());

-- Restaurant categories
CREATE TABLE restaurant_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  names JSONB NOT NULL DEFAULT '{"en": "", "fr": ""}',
  slug TEXT UNIQUE NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu items
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES restaurant_categories(id) ON DELETE CASCADE,
  names JSONB NOT NULL DEFAULT '{"en": "", "fr": ""}',
  descriptions JSONB NOT NULL DEFAULT '{"en": "", "fr": ""}',
  price INTEGER NOT NULL CHECK (price >= 0), -- In XAF (no decimals)
  image_path TEXT,
  is_available BOOLEAN DEFAULT true,
  late_night_available BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  estimated_prep_time INTEGER DEFAULT 15, -- In minutes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Physical tables (for both restaurant and club)
CREATE TABLE physical_tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_code TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  table_type table_type NOT NULL,
  area table_area NOT NULL,
  seating_capacity INTEGER NOT NULL CHECK (seating_capacity > 0),
  minimum_spend INTEGER DEFAULT 0,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  width INTEGER DEFAULT 80,
  height INTEGER DEFAULT 80,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES profiles(id),
  delivery_type delivery_type NOT NULL DEFAULT 'dine_in',
  table_id UUID REFERENCES physical_tables(id),
  status order_status DEFAULT 'draft',
  subtotal INTEGER NOT NULL DEFAULT 0,
  fees INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  customer_note TEXT,
  kitchen_note TEXT,
  payment_status payment_status DEFAULT 'initiated',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  preparing_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

-- Order items (immutable snapshots)
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),
  item_name_snapshot JSONB NOT NULL,
  unit_price_snapshot INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  line_total INTEGER NOT NULL,
  customer_instructions TEXT
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titles JSONB NOT NULL DEFAULT '{"en": "", "fr": ""}',
  slug TEXT UNIQUE NOT NULL,
  descriptions JSONB NOT NULL DEFAULT '{"en": "", "fr": ""}',
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  doors_open_time TIME,
  flyer_path TEXT,
  venue TEXT DEFAULT 'Empire Night Club',
  publication_status event_publication_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  age_policy TEXT,
  dress_code TEXT,
  is_cancelled BOOLEAN DEFAULT false,
  cancellation_reason TEXT,
  seo_title JSONB,
  seo_description JSONB,
  notification_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ticket types
CREATE TABLE ticket_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL CHECK (price >= 0),
  total_inventory INTEGER NOT NULL CHECK (total_inventory >= 0),
  reserved_inventory INTEGER DEFAULT 0,
  sold_inventory INTEGER DEFAULT 0,
  sales_start TIMESTAMPTZ,
  sales_end TIMESTAMPTZ,
  max_per_purchase INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event tables (tables assigned to events with pricing)
CREATE TABLE event_tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  table_id UUID NOT NULL REFERENCES physical_tables(id),
  price INTEGER NOT NULL DEFAULT 0,
  minimum_spend INTEGER DEFAULT 0,
  status event_table_status DEFAULT 'available',
  locked_by_user UUID REFERENCES profiles(id),
  lock_expires_at TIMESTAMPTZ,
  reservation_reference TEXT,
  UNIQUE(event_id, table_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reservations
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES profiles(id),
  event_id UUID NOT NULL REFERENCES events(id),
  event_table_id UUID NOT NULL REFERENCES event_tables(id),
  guest_count INTEGER NOT NULL CHECK (guest_count > 0),
  status reservation_status DEFAULT 'pending_payment',
  deposit_amount INTEGER DEFAULT 0,
  total_expected INTEGER NOT NULL DEFAULT 0,
  payment_status payment_status DEFAULT 'initiated',
  customer_note TEXT,
  confirmation_sent_at TIMESTAMPTZ,
  checked_in_at TIMESTAMPTZ,
  checked_in_by UUID REFERENCES profiles(id),
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event ticket orders
CREATE TABLE event_ticket_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES profiles(id),
  event_id UUID NOT NULL REFERENCES events(id),
  status order_status DEFAULT 'draft',
  subtotal INTEGER NOT NULL DEFAULT 0,
  fees INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  payment_status payment_status DEFAULT 'initiated',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Event ticket items
CREATE TABLE event_ticket_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES event_ticket_orders(id) ON DELETE CASCADE,
  ticket_type_id UUID NOT NULL REFERENCES ticket_types(id),
  ticket_name_snapshot TEXT NOT NULL,
  unit_price_snapshot INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  line_total INTEGER NOT NULL
);

-- Guest list entries
CREATE TABLE guest_list_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES profiles(id),
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT,
  guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count > 0),
  status guest_list_status DEFAULT 'pending',
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  checked_in_at TIMESTAMPTZ,
  checked_in_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  provider payment_provider NOT NULL DEFAULT 'sandbox',
  internal_reference TEXT UNIQUE NOT NULL,
  provider_reference TEXT,
  target_type payment_target_type NOT NULL,
  target_id UUID NOT NULL,
  payment_method TEXT,
  phone_number TEXT,
  amount INTEGER NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'XAF',
  status payment_status DEFAULT 'initiated',
  failure_code TEXT,
  failure_message TEXT,
  initiated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  idempotency_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment events (webhook logs)
CREATE TABLE payment_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider payment_provider NOT NULL,
  provider_event_id TEXT,
  payment_reference TEXT,
  event_type TEXT NOT NULL,
  signature_valid BOOLEAN DEFAULT false,
  sanitized_payload JSONB DEFAULT '{}',
  processing_status TEXT DEFAULT 'received',
  received_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  processing_error TEXT
);

-- Passes
CREATE TABLE passes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id),
  event_id UUID NOT NULL REFERENCES events(id),
  target_type payment_target_type NOT NULL,
  target_id UUID NOT NULL,
  token_hash TEXT UNIQUE NOT NULL,
  token_version INTEGER DEFAULT 1,
  status pass_status DEFAULT 'active',
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  checked_in_at TIMESTAMPTZ,
  checked_in_by UUID REFERENCES profiles(id),
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Push subscriptions
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  endpoint TEXT UNIQUE NOT NULL,
  keys JSONB NOT NULL,
  locale TEXT DEFAULT 'en' CHECK (locale IN ('en', 'fr')),
  user_agent TEXT,
  is_active BOOLEAN DEFAULT true,
  last_success TIMESTAMPTZ,
  failure_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  notification_type notification_type NOT NULL,
  sent_by UUID REFERENCES profiles(id),
  target_audience TEXT DEFAULT 'all',
  target_user_ids UUID[],
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID,
  actor_role user_role,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  before_state JSONB,
  after_state JSONB,
  request_id TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Profiles
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);

-- Menu items
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_featured ON menu_items(is_featured);

-- Orders
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- Events
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_publication ON events(publication_status);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_featured ON events(is_featured);

-- Ticket types
CREATE INDEX idx_ticket_types_event ON ticket_types(event_id);
CREATE INDEX idx_ticket_types_active ON ticket_types(is_active);

-- Event tables
CREATE INDEX idx_event_tables_event ON event_tables(event_id);
CREATE INDEX idx_event_tables_status ON event_tables(status);

-- Reservations
CREATE INDEX idx_reservations_customer ON reservations(customer_id);
CREATE INDEX idx_reservations_event ON reservations(event_id);
CREATE INDEX idx_reservations_status ON reservations(status);

-- Payments
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_internal_ref ON payments(internal_reference);
CREATE INDEX idx_payments_provider_ref ON payments(provider_reference);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_target ON payments(target_type, target_id);

-- Passes
CREATE INDEX idx_passes_owner ON passes(owner_id);
CREATE INDEX idx_passes_event ON passes(event_id);
CREATE INDEX idx_passes_token_hash ON passes(token_hash);
CREATE INDEX idx_passes_status ON passes(status);

-- Guest list
CREATE INDEX idx_guest_list_event ON guest_list_entries(event_id);
CREATE INDEX idx_guest_list_status ON guest_list_entries(status);

-- Audit logs
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Get current user's role
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Check if user has specific role
CREATE OR REPLACE FUNCTION has_role(roles user_role[])
RETURNS BOOLEAN AS $$
  SELECT current_user_role() = ANY(roles);
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Check if user is staff
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
  SELECT current_user_role() IN ('super_admin', 'restaurant_manager', 'kitchen_staff', 'club_manager', 'bouncer');
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT current_user_role() = 'super_admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Get active business settings
CREATE OR REPLACE FUNCTION get_business_settings()
RETURNS business_settings AS $$
  SELECT * FROM business_settings LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Check if restaurant is currently open
CREATE OR REPLACE FUNCTION is_restaurant_open()
RETURNS BOOLEAN AS $$
DECLARE
  settings business_settings;
  now_time TIME;
  is_open BOOLEAN;
BEGIN
  settings := get_business_settings();
  
  -- Check manual override
  IF settings.manual_ordering_override THEN
    RETURN true;
  END IF;
  
  now_time := CURRENT_TIME AT TIME ZONE settings.timezone;
  
  -- Handle overnight closing time
  IF settings.restaurant_closing_time <= settings.restaurant_opening_time THEN
    is_open := now_time >= settings.restaurant_opening_time OR now_time < settings.restaurant_closing_time;
  ELSE
    is_open := now_time >= settings.restaurant_opening_time AND now_time < settings.restaurant_closing_time;
  END IF;
  
  RETURN is_open;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log(
  p_action TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_before_state JSONB DEFAULT NULL,
  p_after_state JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
  v_role user_role;
BEGIN
  v_role := COALESCE(current_user_role(), 'customer'::user_role);
  
  INSERT INTO audit_logs (actor_id, actor_role, action, entity_type, entity_id, before_state, after_state)
  VALUES (auth.uid(), v_role, p_action, p_entity_type, p_entity_id, p_before_state, p_after_state)
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_business_settings_updated_at
  BEFORE UPDATE ON business_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_restaurant_categories_updated_at
  BEFORE UPDATE ON restaurant_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_physical_tables_updated_at
  BEFORE UPDATE ON physical_tables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_ticket_types_updated_at
  BEFORE UPDATE ON ticket_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_event_tables_updated_at
  BEFORE UPDATE ON event_tables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_event_ticket_orders_updated_at
  BEFORE UPDATE ON event_ticket_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_passes_updated_at
  BEFORE UPDATE ON passes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_push_subscriptions_updated_at
  BEFORE UPDATE ON push_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
