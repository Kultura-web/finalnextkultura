/*
  # Add Footer content table

  1. New Tables
    - `footer`
      - `id` (uuid, primary key)
      - `copyright_text` (text) - Copyright/legal text
      - `company_address` (text) - Physical address
      - `company_phone` (text) - Contact phone number
      - `company_email` (text) - Contact email
      - `facebook_url` (text) - Social media link
      - `instagram_url` (text) - Social media link
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `footer` table
    - Add policy for public read access (SELECT for all)
    - Add policy for admin write access (INSERT/UPDATE for authenticated users)
*/

CREATE TABLE IF NOT EXISTS footer (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  copyright_text text NOT NULL DEFAULT '',
  company_address text NOT NULL DEFAULT '',
  company_phone text NOT NULL DEFAULT '',
  company_email text NOT NULL DEFAULT '',
  facebook_url text NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE footer ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read footer"
  ON footer FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert footer"
  ON footer FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update footer"
  ON footer FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO footer (copyright_text, company_address, company_phone, company_email, facebook_url, instagram_url)
VALUES (
  '© 2024 Отель Культура. Все права защищены.',
  'ул. Советская, 22, Гродно, Беларусь',
  '+375 29 123-45-67',
  'info@kulturahotel.by',
  'https://facebook.com/kulturahotel',
  'https://instagram.com/kulturahotel'
)
ON CONFLICT DO NOTHING;
