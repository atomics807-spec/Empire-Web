-- ============================================
-- EMPIRE HYBRID LOUNGE - SEED DATA
-- ============================================

-- Insert restaurant categories
INSERT INTO restaurant_categories (id, names, slug, display_order, is_active) VALUES
  (uuid_generate_v4(), '{"en": "Appetizers", "fr": "Entrées"}', 'appetizers', 1, true),
  (uuid_generate_v4(), '{"en": "Main Courses", "fr": "Plats Principaux"}', 'main-courses', 2, true),
  (uuid_generate_v4(), '{"en": "Sides", "fr": "Accompagnements"}', 'sides', 3, true),
  (uuid_generate_v4(), '{"en": "Drinks", "fr": "Boissons"}', 'drinks', 4, true),
  (uuid_generate_v4(), '{"en": "Desserts", "fr": "Desserts"}', 'desserts', 5, true);

-- Get category IDs for menu items
DO $$
DECLARE
  appetizers_id UUID;
  main_courses_id UUID;
  drinks_id UUID;
BEGIN
  SELECT id INTO appetizers_id FROM restaurant_categories WHERE slug = 'appetizers';
  SELECT id INTO main_courses_id FROM restaurant_categories WHERE slug = 'main-courses';
  SELECT id INTO drinks_id FROM restaurant_categories WHERE slug = 'drinks';

  -- Insert menu items
  INSERT INTO menu_items (id, category_id, names, descriptions, price, is_available, is_featured, display_order, estimated_prep_time) VALUES
    -- Appetizers
    (uuid_generate_v4(), appetizers_id, 
     '{"en": "Ndolè Fingers", "fr": "Doigts de Ndolé"}',
     '{"en": "Crispy ndolè bites with pepper sauce. A delicious Cameroonian appetizer.", "fr": "Bouchées de ndolé croustillantes sauce pimentée. Un délicieux apéritif camerounais."}',
     2000, true, true, 1, 10),
    
    (uuid_generate_v4(), appetizers_id,
     '{"en": "Plantain Crisps", "fr": "Crisps de Plantain"}',
     '{"en": "Sweet fried plantain chips, perfectly crispy.", "fr": "Chips de plantain fritsucré, parfaitement croustillants."}',
     1500, true, false, 2, 5),
    
    (uuid_generate_v4(), appetizers_id,
     '{"en": "Koki", "fr": "Koki"}',
     '{"en": "Steamed corn and bean dough wrapped in leaves.", "fr": "Pâte de maïs et haricots cuite à la vapeur dans des feuilles."}',
     2500, true, false, 3, 45),

    -- Main Courses
    (uuid_generate_v4(), main_courses_id,
     '{"en": "Grilled Tilapia", "fr": "Tilapia Grillé"}',
     '{"en": "Fresh tilapia with plantain, salad and njama njama. The signature dish.", "fr": "Tilapia frais avec plantain, salade et njama njama. Le plat signature."}',
     4500, true, true, 1, 25),
    
    (uuid_generate_v4(), main_courses_id,
     '{"en": "Ekwang", "fr": "Ekwang"}',
     '{"en": "Shredded cocoyam with palm nut soup and fresh vegetables.", "fr": "Cocoyam râpé au curry de palme et légumes frais."}',
     4000, true, true, 2, 30),
    
    (uuid_generate_v4(), main_courses_id,
     '{"en": "Poulet DG", "fr": "Poulet DG"}',
     '{"en": "Fried plantain and chicken in tomato sauce. A beloved Cameroonian classic.", "fr": "Plantain frit et poulet en sauce tomate. Un classique camerounais bien-aimé."}',
     4000, true, true, 3, 25),
    
    (uuid_generate_v4(), main_courses_id,
     '{"en": "Ndolè", "fr": "Ndolé"}',
     '{"en": "Bitter leaf stew with peanuts and your choice of protein.", "fr": "Ragoût aux feuilles amères avec noix de cajou et protéine au choix."}',
     3500, true, false, 4, 30),
    
    (uuid_generate_v4(), main_courses_id,
     '{"en": "Soya Skewers", "fr": "Brochettes de Soya"}',
     '{"en": "Spiced beef skewers grilled to perfection. Perfect late night snack.", "fr": "Brochettes de bœuf épicées grillées à la perfection. En-cas parfait tard la nuit."}',
     3000, true, true, 5, 15),

    -- Drinks
    (uuid_generate_v4(), drinks_id,
     '{"en": "Palm Wine", "fr": "Vin de Palme"}',
     '{"en": "Freshly tapped palm wine.", "fr": "Vin de palme fraîchement tari."}',
     500, true, false, 1, 2),
    
    (uuid_generate_v4(), drinks_id,
     '{"en": "Ginger Juice", "fr": "Jus de Gingembre"}',
     '{"en": "Fresh ginger with lemon and honey.", "fr": "Gingembre frais avec citron et miel."}',
     1000, true, true, 2, 3),
    
    (uuid_generate_v4(), drinks_id,
     '{"en": "Bissap", "fr": "Bissap"}',
     '{"en": "Refreshing hibiscus drink.", "fr": "Boisson rafraîchissante à l\'hibiscus."}',
     800, true, false, 3, 3),
    
    (uuid_generate_v4(), drinks_id,
     '{"en": "Predator Energy", "fr": "Predator Energy"}',
     '{"en": "Energy drink for the night.", "fr": "Boisson énergisante pour la nuit."}',
     1500, true, false, 4, 1);
END $$;

-- Insert physical tables for restaurant
INSERT INTO physical_tables (id, table_code, display_name, table_type, area, seating_capacity, minimum_spend, position_x, position_y, width, height, is_active) VALUES
  (uuid_generate_v4(), 'R1', 'Restaurant Table 1', 'restaurant_standard', 'main_dining', 4, 0, 50, 50, 80, 80, true),
  (uuid_generate_v4(), 'R2', 'Restaurant Table 2', 'restaurant_standard', 'main_dining', 4, 0, 150, 50, 80, 80, true),
  (uuid_generate_v4(), 'R3', 'Restaurant Table 3', 'restaurant_standard', 'main_dining', 6, 0, 250, 50, 100, 80, true),
  (uuid_generate_v4(), 'R4', 'Restaurant Table 4', 'restaurant_standard', 'terrace', 4, 0, 50, 150, 80, 80, true),
  (uuid_generate_v4(), 'R5', 'Restaurant Table 5', 'restaurant_standard', 'terrace', 6, 0, 150, 150, 100, 80, true);

-- Insert physical tables for club
INSERT INTO physical_tables (id, table_code, display_name, table_type, area, seating_capacity, minimum_spend, position_x, position_y, width, height, is_active) VALUES
  (uuid_generate_v4(), 'C1', 'Club Table 1', 'club_regular', 'dancefloor', 6, 50000, 100, 100, 100, 100, true),
  (uuid_generate_v4(), 'C2', 'Club Table 2', 'club_regular', 'dancefloor', 6, 50000, 220, 100, 100, 100, true),
  (uuid_generate_v4(), 'C3', 'Club Table 3', 'club_regular', 'dancefloor', 8, 75000, 340, 100, 120, 100, true),
  (uuid_generate_v4(), 'V1', 'VIP Table 1', 'club_vip', 'vip_section', 8, 150000, 100, 220, 120, 120, true),
  (uuid_generate_v4(), 'V2', 'VIP Table 2', 'club_vip', 'vip_section', 8, 150000, 240, 220, 120, 120, true),
  (uuid_generate_v4(), 'VV1', 'VVIP Table 1', 'club_vvip', 'vip_section', 12, 300000, 170, 340, 140, 140, true);

-- Insert sample events
INSERT INTO events (id, titles, descriptions, slug, start_time, end_time, doors_open_time, venue, publication_status, is_featured, age_policy, dress_code) VALUES
  (uuid_generate_v4(),
   '{"en": "Saturday Night Fever", "fr": "Fièvre du Samedi Soir"}',
   '{"en": "The hottest night in Limbe! DJ Kely spinning the best afro beats and international hits all night long. Dress to impress!", "fr": "La nuit la plus chaude à Limbe ! DJ Kely mixant les meilleurs afro beats et tubes internationaux toute la nuit. Habillez-vous pour impressionner !"}',
   'saturday-night-fever',
   '2026-08-15 21:00:00+01', '2026-08-16 06:00:00+01', '20:00', 'Empire Night Club',
   'published', true, '21+', 'Smart Casual'),
  
  (uuid_generate_v4(),
   '{"en": "Afro Beats Night", "fr": "Soirée Afro Beats"}',
   '{"en": "Celebrate African music with live performances from local artists and the best DJs from Cameroon.", "fr": "Célébrez la musique africaine avec des performances live d\'artistes locaux et les meilleurs DJs du Cameroun."}',
   'afro-beats-night',
   '2026-08-22 22:00:00+01', '2026-08-23 06:00:00+01', '21:00', 'Empire Night Club',
   'published', true, '18+', 'Casual'),
  
  (uuid_generate_v4(),
   '{"en": "Ladies Night", "fr": "Soirée Ladies"}',
   '{"en": "Ladies free entry before 11 PM! Premium cocktails and special performances. Gentlemen pay for ladies.", "fr": "Ladies entrée gratuite avant 23h ! Cocktails premium et performances spéciales. Messieurs, payez pour les ladies."}',
   'ladies-night',
   '2026-08-29 21:00:00+01', '2026-08-30 06:00:00+01', '21:00', 'Empire Night Club',
   'published', false, '21+', 'Smart');

-- Insert ticket types for events
DO $$
DECLARE
  sat_event_id UUID;
  afro_event_id UUID;
  ladies_event_id UUID;
BEGIN
  SELECT id INTO sat_event_id FROM events WHERE slug = 'saturday-night-fever';
  SELECT id INTO afro_event_id FROM events WHERE slug = 'afro-beats-night';
  SELECT id INTO ladies_event_id FROM events WHERE slug = 'ladies-night';

  -- Saturday Night Fever tickets
  INSERT INTO ticket_types (id, event_id, name, description, price, total_inventory, sales_start, sales_end, max_per_purchase, is_active) VALUES
    (uuid_generate_v4(), sat_event_id, 'General Entry', 'Access to the club and dance floor', 5000, 200, '2026-07-01 00:00:00+01', '2026-08-15 20:00:00+01', 5, true),
    (uuid_generate_v4(), sat_event_id, 'VIP', 'VIP area access, premium view, faster service', 15000, 50, '2026-07-01 00:00:00+01', '2026-08-15 20:00:00+01', 2, true);

  -- Afro Beats Night tickets
  INSERT INTO ticket_types (id, event_id, name, description, price, total_inventory, sales_start, sales_end, max_per_purchase, is_active) VALUES
    (uuid_generate_v4(), afro_event_id, 'General Entry', 'Access to the club and dance floor', 3000, 300, '2026-07-01 00:00:00+01', '2026-08-22 21:00:00+01', 5, true);

  -- Ladies Night tickets
  INSERT INTO ticket_types (id, event_id, name, description, price, total_inventory, sales_start, sales_end, max_per_purchase, is_active) VALUES
    (uuid_generate_v4(), ladies_event_id, 'Ladies', 'Free entry for ladies before 11 PM', 0, 100, '2026-07-01 00:00:00+01', '2026-08-29 23:00:00+01', 2, true),
    (uuid_generate_v4(), ladies_event_id, 'Gents', 'Standard entry for gentlemen', 5000, 200, '2026-07-01 00:00:00+01', '2026-08-29 21:00:00+01', 5, true);
END $$;

-- Update business settings with real address
UPDATE business_settings SET
  address = 'Sappa Road, opposite Limbe Community Field, Limbe, Fako Division, South West Region, Cameroon',
  latitude = 4.0214,
  longitude = 9.2131,
  phone = '+237 6 00 00 00 00',
  email = 'info@empire-hybrid.com',
  whatsapp = '+237 6 00 00 00 00',
  social_links = '{"facebook": "https://facebook.com/empirehybrid", "instagram": "https://instagram.com/empirehybrid"}',
  map_url = 'https://maps.google.com/?q=Limbe+Community+Field',
  cancellation_policy = '{"en": "Cancellations must be made 24 hours before the event for a full refund.", "fr": "Les annulations doivent être effectuées 24 heures avant l\'événement pour un remboursement complet."}';
