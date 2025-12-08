/*
  # Populate Default Content

  This migration populates all tables with the current website content
  as default values so the admin dashboard can manage them.
*/

-- Insert Hero Section
INSERT INTO hero_section (title, subtitle, background_image_path, button_text)
VALUES (
  'Бутик-отель в историческом центре Гродно',
  'Искусство, культура и комфорт на улице Советская, 3',
  '/Rooms/IMG_20251120_145334_889.jpg',
  'Забронировать'
) ON CONFLICT DO NOTHING;

-- Insert About Section
INSERT INTO about_section (title, paragraph_1, paragraph_2, paragraph_3, image_path, button_text)
VALUES (
  'Что такое Отель Культура?',
  'Бутик Отель "Культура" — особое место в самом центре города Гродно, сочетающее старину здания 1860-х годов и современный уют. Окна выходят на главную пешеходную улицу, а с балконов открывается перспектива на площадь.',
  'Просторные номера со всеми условиями созданы для отдыха. В отеле с самого утра работает кафе с сытной и интересной кухней, напитками и десертами.',
  'В шаговой доступности — все главные достопримечательности города.',
  'grodno.jpg',
  'Забронировать'
) ON CONFLICT DO NOTHING;

-- Insert Rooms
DO $$
DECLARE
  room1_id uuid;
  room2_id uuid;
  room3_id uuid;
BEGIN
  INSERT INTO rooms (title, description, price, features, display_order)
  VALUES (
    'Делюкс с балконом',
    'Уютный современный номер с выходом на небольшой балкон. Идеален для пары или одного гостя.',
    'от 450 BYN',
    ARRAY['44 м²', 'Двуспальная кровать', 'Рабочая зона', 'Wi‑Fi', 'Небольшой балкон'],
    1
  )
  RETURNING id INTO room1_id;

  INSERT INTO rooms (title, description, price, features, display_order)
  VALUES (
    'Представительский люкс с балконом и ванной чашей',
    'Просторный номер с зоной отдыха, балконом и ванной чашей.',
    'от 500 BYN',
    ARRAY['38 м²', 'Зона отдыха', 'Балкон', 'Ванная чаша'],
    2
  )
  RETURNING id INTO room2_id;

  INSERT INTO rooms (title, description, price, features, display_order)
  VALUES (
    'Делюкс с ванной чашей',
    'Комфортный номер средней площади с отдельной зоной отдыха и ванной чашей.',
    'от 500 BYN',
    ARRAY['40 м²', 'Отдельная небольшая гостиная', 'Wi‑Fi', 'Ванная чаша'],
    3
  )
  RETURNING id INTO room3_id;

  -- Insert room images
  INSERT INTO room_images (room_id, image_path, display_order) VALUES
    (room1_id, '/Rooms/IMG_20251120_150935_690.jpg', 1),
    (room1_id, '/Rooms/IMG_20251120_150919_870.jpg', 2),
    (room1_id, '/Rooms/IMG_20251120_150916_901.jpg', 3),
    (room1_id, '/Rooms/IMG_20251120_150859_353.jpg', 4),
    (room1_id, '/Rooms/IMG_20251120_150855_053.jpg', 5),
    (room1_id, '/Rooms/IMG_20251120_150938_549.jpg', 6),
    (room2_id, '/Rooms/IMG_20251120_145519_667.jpg', 1),
    (room2_id, '/Rooms/IMG_20251120_145501_634.jpg', 2),
    (room2_id, '/Rooms/IMG_20251120_145526_536.jpg', 3),
    (room2_id, '/Rooms/IMG_20251120_145556_884.jpg', 4),
    (room2_id, '/Rooms/IMG_20251120_145604_693.jpg', 5),
    (room2_id, '/Rooms/IMG_20251120_145712_373.jpg', 6),
    (room3_id, '/Rooms/IMG_20251120_145334_889.jpg', 1),
    (room3_id, '/Rooms/IMG_20251120_145338_036.jpg', 2),
    (room3_id, '/Rooms/IMG_20251120_145410_674.jpg', 3);
END $$;

-- Insert Offers
DO $$
DECLARE
  offer1_id uuid;
  offer2_id uuid;
BEGIN
  INSERT INTO offers (title, description, discount, display_order)
  VALUES (
    'Утро невесты в самом сердце Гродно',
    'Продуманный интерьер и великолепный вид с лоджии сделает ваш особенный день незабываемым',
    15,
    1
  )
  RETURNING id INTO offer1_id;

  INSERT INTO offers (title, description, discount, display_order)
  VALUES (
    'Культурная программа',
    'Скидка 10% на проживание с посещением лучших достопримечательностей города',
    10,
    2
  )
  RETURNING id INTO offer2_id;

  -- Insert offer images
  INSERT INTO offer_images (offer_id, image_path, display_order) VALUES
    (offer1_id, '/Offers/Offer1.jpg', 1),
    (offer1_id, '/Offers/Offer2.jpg', 2),
    (offer1_id, '/Offers/Offer3.jpg', 3),
    (offer1_id, '/Offers/Offer4.jpg', 4),
    (offer2_id, '/Resto/IMG_20251119_175605_550.jpg', 1);
END $$;

-- Insert Gallery Images
INSERT INTO gallery_images (image_path, title, span_cols, span_rows, display_order) VALUES
  ('/photo_12_2025-10-31_18-24-38.jpg', 'Интерьер номера', 2, 2, 1),
  ('/photo_13_2025-10-31_18-24-38.jpg', 'Ресторан', 1, 1, 2),
  ('/photo_14_2025-10-31_18-24-38.jpg', 'Лобби', 1, 1, 3),
  ('/photo_15_2025-10-31_18-24-38.jpg', 'Спа-зона', 1, 1, 4),
  ('/photo_16_2025-10-31_18-24-38.jpg', 'Панорамный вид', 1, 1, 5),
  ('/photo_17_2025-10-31_18-24-38.jpg', 'Фасад отеля', 2, 1, 6),
  ('/photo_18_2025-10-31_18-24-38.jpg', 'Спа-процедуры', 1, 1, 7),
  ('/photo_19_2025-10-31_18-24-38.jpg', 'Фитнес-центр', 1, 1, 8);

-- Insert Menu Items
INSERT INTO menu_items (title, file_path, menu_type, display_order) VALUES
  ('Основное меню', '/Menu3.pdf', 'main', 1),
  ('Детское меню', '/Menu2.pdf', 'children', 2),
  ('Напитки', '/Menu1.pdf', 'drinks', 3);

-- Insert Restaurant Section
INSERT INTO restaurant_section (title, description, background_image_path)
VALUES (
  'Меню',
  'Исследуйте нашу кухню',
  '/Resto/IMG_20251119_175624_816.jpg'
) ON CONFLICT DO NOTHING;
