-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE physical_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_ticket_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_ticket_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_list_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Staff can view all profiles
CREATE POLICY "Staff can view all profiles"
  ON profiles FOR SELECT
  USING (is_staff());

-- Super admin can update any profile
CREATE POLICY "Super admin can update any profile"
  ON profiles FOR UPDATE
  USING (is_super_admin());

-- ============================================
-- BUSINESS SETTINGS POLICIES
-- ============================================

-- Anyone can view business settings (for public pages)
CREATE POLICY "Anyone can view business settings"
  ON business_settings FOR SELECT
  USING (true);

-- Only super admin can update business settings
CREATE POLICY "Super admin can update business settings"
  ON business_settings FOR ALL
  USING (is_super_admin());

-- ============================================
-- RESTAURANT CATEGORIES POLICIES
-- ============================================

-- Anyone can view active categories
CREATE POLICY "Anyone can view active categories"
  ON restaurant_categories FOR SELECT
  USING (is_active = true OR is_staff());

-- Staff can manage categories
CREATE POLICY "Staff can manage categories"
  ON restaurant_categories FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['restaurant_manager'::user_role])
  );

-- ============================================
-- MENU ITEMS POLICIES
-- ============================================

-- Anyone can view available menu items
CREATE POLICY "Anyone can view available menu items"
  ON menu_items FOR SELECT
  USING (
    is_available = true OR
    is_staff()
  );

-- Staff can manage menu items
CREATE POLICY "Staff can manage menu items"
  ON menu_items FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['restaurant_manager'::user_role])
  );

-- ============================================
-- PHYSICAL TABLES POLICIES
-- ============================================

-- Anyone can view active tables
CREATE POLICY "Anyone can view active tables"
  ON physical_tables FOR SELECT
  USING (is_active = true OR is_staff());

-- Staff can manage tables
CREATE POLICY "Staff can manage tables"
  ON physical_tables FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['restaurant_manager'::user_role, 'club_manager'::user_role])
  );

-- ============================================
-- ORDERS POLICIES
-- ============================================

-- Customers can view their own orders
CREATE POLICY "Customers can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = customer_id);

-- Customers can create orders
CREATE POLICY "Customers can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- Customers can update their own pending orders
CREATE POLICY "Customers can update own pending orders"
  ON orders FOR UPDATE
  USING (
    auth.uid() = customer_id AND
    status IN ('draft', 'pending_payment')
  );

-- Kitchen staff can view and update paid orders
CREATE POLICY "Kitchen staff can view paid orders"
  ON orders FOR SELECT
  USING (
    is_staff() OR
    auth.uid() = customer_id
  );

CREATE POLICY "Kitchen staff can update orders"
  ON orders FOR UPDATE
  USING (
    has_role(ARRAY['kitchen_staff'::user_role, 'restaurant_manager'::user_role, 'super_admin'::user_role])
  );

-- ============================================
-- ORDER ITEMS POLICIES
-- ============================================

-- Users can view order items for their orders
CREATE POLICY "Users can view order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.customer_id = auth.uid() OR is_staff())
    )
  );

-- Order items are managed through orders
CREATE POLICY "Staff can manage order items"
  ON order_items FOR ALL
  USING (is_staff());

-- ============================================
-- EVENTS POLICIES
-- ============================================

-- Anyone can view published events
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  USING (
    publication_status = 'published' OR
    is_staff()
  );

-- Club managers can manage events
CREATE POLICY "Club managers can manage events"
  ON events FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['club_manager'::user_role])
  );

-- ============================================
-- TICKET TYPES POLICIES
-- ============================================

-- Anyone can view active ticket types for published events
CREATE POLICY "Anyone can view ticket types"
  ON ticket_types FOR SELECT
  USING (
    is_active = true OR
    is_staff()
  );

-- Club managers can manage ticket types
CREATE POLICY "Club managers can manage ticket types"
  ON ticket_types FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['club_manager'::user_role])
  );

-- ============================================
-- EVENT TABLES POLICIES
-- ============================================

-- Anyone can view event tables for published events
CREATE POLICY "Anyone can view event tables"
  ON event_tables FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_tables.event_id
      AND (events.publication_status = 'published' OR is_staff())
    )
  );

-- Staff can manage event tables
CREATE POLICY "Staff can manage event tables"
  ON event_tables FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['club_manager'::user_role])
  );

-- Users can lock tables (limited)
CREATE POLICY "Users can update table locks"
  ON event_tables FOR UPDATE
  USING (
    locked_by_user = auth.uid() OR
    is_staff()
  );

-- ============================================
-- RESERVATIONS POLICIES
-- ============================================

-- Customers can view their own reservations
CREATE POLICY "Customers can view own reservations"
  ON reservations FOR SELECT
  USING (auth.uid() = customer_id);

-- Customers can create reservations
CREATE POLICY "Customers can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- Staff can view and manage reservations
CREATE POLICY "Staff can view reservations"
  ON reservations FOR SELECT
  USING (is_staff());

CREATE POLICY "Staff can manage reservations"
  ON reservations FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['club_manager'::user_role, 'bouncer'::user_role])
  );

-- ============================================
-- EVENT TICKET ORDERS POLICIES
-- ============================================

-- Customers can view their own ticket orders
CREATE POLICY "Customers can view own ticket orders"
  ON event_ticket_orders FOR SELECT
  USING (auth.uid() = customer_id);

-- Customers can create ticket orders
CREATE POLICY "Customers can create ticket orders"
  ON event_ticket_orders FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- Staff can manage ticket orders
CREATE POLICY "Staff can manage ticket orders"
  ON event_ticket_orders FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['club_manager'::user_role])
  );

-- ============================================
-- GUEST LIST POLICIES
-- ============================================

-- Anyone can create guest list entries
CREATE POLICY "Anyone can create guest list entries"
  ON guest_list_entries FOR INSERT
  WITH CHECK (true);

-- Customers can view their own guest list entries
CREATE POLICY "Customers can view own guest list entries"
  ON guest_list_entries FOR SELECT
  USING (
    auth.uid() = customer_id OR
    is_staff()
  );

-- Staff can manage guest list
CREATE POLICY "Staff can manage guest list"
  ON guest_list_entries FOR ALL
  USING (
    is_super_admin() OR
    has_role(ARRAY['club_manager'::user_role, 'bouncer'::user_role])
  );

-- ============================================
-- PAYMENTS POLICIES
-- ============================================

-- Customers can view their own payments
CREATE POLICY "Customers can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Service role only can insert payments
CREATE POLICY "Service can create payments"
  ON payments FOR INSERT
  WITH CHECK (true);

-- Service role only can update payments
CREATE POLICY "Service can update payments"
  ON payments FOR UPDATE
  USING (true);

-- Staff can view all payments
CREATE POLICY "Staff can view all payments"
  ON payments FOR SELECT
  USING (is_staff());

-- ============================================
-- PAYMENT EVENTS POLICIES
-- ============================================

-- Only staff can view payment events
CREATE POLICY "Staff can view payment events"
  ON payment_events FOR SELECT
  USING (is_staff());

-- Service can insert payment events
CREATE POLICY "Service can insert payment events"
  ON payment_events FOR INSERT
  WITH CHECK (true);

-- ============================================
-- PASSES POLICIES
-- ============================================

-- Customers can view their own passes
CREATE POLICY "Customers can view own passes"
  ON passes FOR SELECT
  USING (auth.uid() = owner_id);

-- Staff can view all passes for events
CREATE POLICY "Staff can view event passes"
  ON passes FOR SELECT
  USING (
    is_super_admin() OR
    has_role(ARRAY['club_manager'::user_role, 'bouncer'::user_role])
  );

-- Service can create passes
CREATE POLICY "Service can create passes"
  ON passes FOR INSERT
  WITH CHECK (true);

-- Staff can update passes (check-in, revoke)
CREATE POLICY "Staff can update passes"
  ON passes FOR UPDATE
  USING (
    is_super_admin() OR
    has_role(ARRAY['club_manager'::user_role, 'bouncer'::user_role])
  );

-- ============================================
-- PUSH SUBSCRIPTIONS POLICIES
-- ============================================

-- Users can manage their own subscriptions
CREATE POLICY "Users can manage own subscriptions"
  ON push_subscriptions FOR ALL
  USING (auth.uid() = user_id);

-- Anyone can create subscription (for anonymous)
CREATE POLICY "Anyone can create subscription"
  ON push_subscriptions FOR INSERT
  WITH CHECK (true);

-- ============================================
-- NOTIFICATIONS POLICIES
-- ============================================

-- Staff can view and create notifications
CREATE POLICY "Staff can manage notifications"
  ON notifications FOR ALL
  USING (is_staff());

-- ============================================
-- AUDIT LOGS POLICIES
-- ============================================

-- Only super admin can view audit logs
CREATE POLICY "Super admin can view audit logs"
  ON audit_logs FOR SELECT
  USING (is_super_admin());
