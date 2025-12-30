/*
  # Create Navbar and Contact Content Tables

  1. New Tables
    - `navbar`
      - `id` (uuid, primary key)
      - `hotel_name` (text) - Name of the hotel displayed in navbar
      - `hotel_phone` (text) - Hotel contact phone number
      - `restaurant_phone` (text) - Restaurant contact phone number
      - `logo_url` (text) - Path to logo image
      - `updated_at` (timestamptz) - Last update timestamp

    - `contact_info`
      - `id` (uuid, primary key)
      - `title` (text) - Section title
      - `subtitle` (text) - Section subtitle/description
      - `address_line1` (text) - Address line 1
      - `address_line2` (text) - Address line 2 (e.g., country)
      - `phone` (text) - Contact phone number
      - `instagram_handle` (text) - Instagram handle
      - `instagram_url` (text) - Full Instagram URL
      - `map_embed_url` (text) - Map embed iframe URL
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated insert/update/delete operations

  Note: These tables will have single-row content managed through the admin panel.
*/

-- Create navbar table
CREATE TABLE IF NOT EXISTS navbar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_name text NOT NULL DEFAULT 'ОТЕЛЬ КУЛЬТУРА',
  hotel_phone text NOT NULL DEFAULT '+375 33 342-88-88',
  restaurant_phone text NOT NULL DEFAULT '+375 33 388-54-54',
  logo_url text NOT NULL DEFAULT '/logo-no-bg.png',
  updated_at timestamptz DEFAULT now()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Где мы находимся',
  subtitle text NOT NULL DEFAULT 'В самом сердце исторического Гродно, на улице Советская',
  address_line1 text NOT NULL DEFAULT 'г. Гродно, ул. Советская, 3',
  address_line2 text NOT NULL DEFAULT 'Беларусь',
  phone text NOT NULL DEFAULT '+375 33 342-88-88',
  instagram_handle text NOT NULL DEFAULT '@kultura.cafe.grodno',
  instagram_url text NOT NULL DEFAULT 'https://www.instagram.com/boutique_hotel_kultura',
  map_embed_url text NOT NULL DEFAULT 'https://yandex.ru/map-widget/v1/?text=г.%20Гродно%2C%20ул.%20Советская%2C%203%2C%20Отель%20Cultura&z=17&l=map',
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on navbar
ALTER TABLE navbar ENABLE ROW LEVEL SECURITY;

-- Enable RLS on contact_info
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Public read access for navbar
CREATE POLICY "Anyone can view navbar"
  ON navbar FOR SELECT
  TO public
  USING (true);

-- Public read access for contact_info
CREATE POLICY "Anyone can view contact info"
  ON contact_info FOR SELECT
  TO public
  USING (true);

-- Authenticated users can insert navbar (admin only in practice)
CREATE POLICY "Authenticated users can insert navbar"
  ON navbar FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update navbar (admin only in practice)
CREATE POLICY "Authenticated users can update navbar"
  ON navbar FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete navbar (admin only in practice)
CREATE POLICY "Authenticated users can delete navbar"
  ON navbar FOR DELETE
  TO authenticated
  USING (true);

-- Authenticated users can insert contact_info (admin only in practice)
CREATE POLICY "Authenticated users can insert contact info"
  ON contact_info FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update contact_info (admin only in practice)
CREATE POLICY "Authenticated users can update contact info"
  ON contact_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete contact_info (admin only in practice)
CREATE POLICY "Authenticated users can delete contact info"
  ON contact_info FOR DELETE
  TO authenticated
  USING (true);