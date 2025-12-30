/*
  # Populate Navbar and Contact Info with Default Content

  This migration populates the navbar and contact_info tables with default content
  matching the current hardcoded values in the components.
*/

-- Insert default navbar content (only if empty)
INSERT INTO navbar (hotel_name, hotel_phone, restaurant_phone, logo_url)
SELECT 
  'ОТЕЛЬ КУЛЬТУРА',
  '+375 33 342-88-88',
  '+375 33 388-54-54',
  '/logo-no-bg.png'
WHERE NOT EXISTS (SELECT 1 FROM navbar LIMIT 1);

-- Insert default contact info (only if empty)
INSERT INTO contact_info (
  title,
  subtitle,
  address_line1,
  address_line2,
  phone,
  instagram_handle,
  instagram_url,
  map_embed_url
)
SELECT 
  'Где мы находимся',
  'В самом сердце исторического Гродно, на улице Советская',
  'г. Гродно, ул. Советская, 3',
  'Беларусь',
  '+375 33 342-88-88',
  '@kultura.cafe.grodno',
  'https://www.instagram.com/boutique_hotel_kultura',
  'https://yandex.ru/map-widget/v1/?text=г.%20Гродно%2C%20ул.%20Советская%2C%203%2C%20Отель%20Cultura&z=17&l=map'
WHERE NOT EXISTS (SELECT 1 FROM contact_info LIMIT 1);