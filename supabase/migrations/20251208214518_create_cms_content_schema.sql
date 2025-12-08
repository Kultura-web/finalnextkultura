/*
  # Content Management System Schema

  1. New Tables
    - `hero_section`: Hero section content
    - `about_section`: About section content and images
    - `rooms`: Room types and details
    - `room_images`: Images for each room
    - `offers`: Special offers
    - `offer_images`: Images for each offer
    - `gallery_images`: Gallery images
    - `menu_items`: Menu documents
    - `admin_users`: Admin authentication

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
    - Add policies for public read access to content

  3. Features
    - Support for image storage references
    - Timestamps for auditing
    - Default values matching current content
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can read own data"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Hero Section
CREATE TABLE IF NOT EXISTS hero_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Бутик-отель в историческом центре Гродно',
  subtitle text NOT NULL DEFAULT 'Искусство, культура и комфорт на улице Советская, 3',
  background_image_path text NOT NULL DEFAULT '/Rooms/IMG_20251120_145334_889.jpg',
  button_text text NOT NULL DEFAULT 'Забронировать',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read hero section"
  ON hero_section FOR SELECT
  USING (true);

CREATE POLICY "Admin can update hero section"
  ON hero_section FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- About Section
CREATE TABLE IF NOT EXISTS about_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Что такое Отель Культура?',
  paragraph_1 text NOT NULL DEFAULT 'Бутик Отель "Культура" — особое место в самом центре города Гродно, сочетающее старину здания 1860-х годов и современный уют. Окна выходят на главную пешеходную улицу, а с балконов открывается перспектива на площадь.',
  paragraph_2 text NOT NULL DEFAULT 'Просторные номера со всеми условиями созданы для отдыха. В отеле с самого утра работает кафе с сытной и интересной кухней, напитками и десертами.',
  paragraph_3 text NOT NULL DEFAULT 'В шаговой доступности — все главные достопримечательности города.',
  image_path text NOT NULL DEFAULT 'grodno.jpg',
  button_text text NOT NULL DEFAULT 'Забронировать',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read about section"
  ON about_section FOR SELECT
  USING (true);

CREATE POLICY "Admin can update about section"
  ON about_section FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Rooms
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price text NOT NULL,
  features text[] NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read rooms"
  ON rooms FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage rooms"
  ON rooms FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update rooms"
  ON rooms FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete rooms"
  ON rooms FOR DELETE
  TO authenticated
  USING (true);

-- Room Images
CREATE TABLE IF NOT EXISTS room_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  image_path text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE room_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read room images"
  ON room_images FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage room images"
  ON room_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update room images"
  ON room_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete room images"
  ON room_images FOR DELETE
  TO authenticated
  USING (true);

-- Offers
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  discount integer NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read offers"
  ON offers FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage offers"
  ON offers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update offers"
  ON offers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete offers"
  ON offers FOR DELETE
  TO authenticated
  USING (true);

-- Offer Images
CREATE TABLE IF NOT EXISTS offer_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  image_path text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE offer_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read offer images"
  ON offer_images FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage offer images"
  ON offer_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update offer images"
  ON offer_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete offer images"
  ON offer_images FOR DELETE
  TO authenticated
  USING (true);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path text NOT NULL,
  title text NOT NULL,
  span_cols integer NOT NULL DEFAULT 1,
  span_rows integer NOT NULL DEFAULT 1,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read gallery images"
  ON gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage gallery"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update gallery"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete gallery"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  file_path text NOT NULL,
  menu_type text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read menu items"
  ON menu_items FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage menu"
  ON menu_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update menu"
  ON menu_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete menu"
  ON menu_items FOR DELETE
  TO authenticated
  USING (true);

-- Restaurant Section
CREATE TABLE IF NOT EXISTS restaurant_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Ресторан',
  description text NOT NULL DEFAULT 'Наш ресторан',
  background_image_path text NOT NULL DEFAULT '/Resto/IMG_20251119_175624_816.jpg',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE restaurant_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read restaurant section"
  ON restaurant_section FOR SELECT
  USING (true);

CREATE POLICY "Admin can update restaurant section"
  ON restaurant_section FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
