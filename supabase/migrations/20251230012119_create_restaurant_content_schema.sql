/*
  # Create Restaurant Content Schema

  1. New Tables
    - `restaurant_hero`
      - `id` (uuid, primary key)
      - `title` (text) - Main heading text
      - `subtitle` (text) - Subheading text
      - `background_image_path` (text) - Hero background image
      - `button_text_1` (text) - First button text
      - `button_text_2` (text) - Second button text
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `restaurant_about`
      - `id` (uuid, primary key)
      - `title` (text) - Section title
      - `paragraph_1` (text) - First paragraph
      - `paragraph_2` (text) - Second paragraph
      - `image_path` (text) - About section image
      - `updated_at` (timestamptz)
    
    - `restaurant_about_features`
      - `id` (uuid, primary key)
      - `icon` (text) - Icon name (ChefHat, Wine, UtensilsCrossed)
      - `title` (text) - Feature title
      - `description` (text) - Feature description
      - `display_order` (int) - Display order
      - `created_at` (timestamptz)
    
    - `restaurant_gallery_images`
      - `id` (uuid, primary key)
      - `image_path` (text) - Image file path
      - `alt_text` (text) - Image alt text
      - `display_order` (int) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `restaurant_reservation_info`
      - `id` (uuid, primary key)
      - `title` (text) - Section title
      - `subtitle` (text) - Section subtitle
      - `hours_label` (text) - Hours section label
      - `hours_text` (text) - Operating hours
      - `phone_label` (text) - Phone section label
      - `phone_number` (text) - Contact phone
      - `capacity_label` (text) - Capacity section label
      - `capacity_text` (text) - Capacity information
      - `form_title` (text) - Reservation form title
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users (admin) to manage content
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS restaurant_hero (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text DEFAULT 'Ресторан Культура',
  subtitle text DEFAULT 'Изысканная кухня и атмосфера в сердце Гродно',
  background_image_path text DEFAULT '/NewReso/resto6.jpg',
  button_text_1 text DEFAULT 'Забронировать столик',
  button_text_2 text DEFAULT 'Посмотреть меню',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS restaurant_about (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text DEFAULT 'Гастрономическое путешествие',
  paragraph_1 text DEFAULT 'Ресторан Культура — это место, где каждое блюдо рассказывает свою историю. Мы создаём уникальные гастрономические впечатления, объединяя традиции белорусской кухни с современными кулинарными техниками.',
  paragraph_2 text DEFAULT 'Наш шеф-повар и его команда ежедневно работают над тем, чтобы каждый визит в наш ресторан становился незабываемым событием.',
  image_path text DEFAULT '/Resto/IMG_20251119_175605_550.jpg',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS restaurant_about_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS restaurant_gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path text NOT NULL,
  alt_text text NOT NULL,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS restaurant_reservation_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text DEFAULT 'Бронирование',
  subtitle text DEFAULT 'Забронируйте столик и насладитесь незабываемым вечером',
  hours_label text DEFAULT 'ЧАСЫ РАБОТЫ',
  hours_text text DEFAULT 'Вс-Чт: 08:00 — 24:00
Пт-Сб: 08:00 — 01:00',
  phone_label text DEFAULT 'ТЕЛЕФОН',
  phone_number text DEFAULT '+375 33 388-54-54',
  capacity_label text DEFAULT 'ВМЕСТИМОСТЬ',
  capacity_text text DEFAULT 'До 30 гостей
Возможность проведения мероприятий',
  form_title text DEFAULT 'Забронировать столик',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE restaurant_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_about ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_about_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_reservation_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read restaurant hero"
  ON restaurant_hero FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read restaurant about"
  ON restaurant_about FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read restaurant about features"
  ON restaurant_about_features FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read restaurant gallery images"
  ON restaurant_gallery_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read restaurant reservation info"
  ON restaurant_reservation_info FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update restaurant hero"
  ON restaurant_hero FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update restaurant about"
  ON restaurant_about FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage restaurant about features"
  ON restaurant_about_features FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage restaurant gallery images"
  ON restaurant_gallery_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update restaurant reservation info"
  ON restaurant_reservation_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);