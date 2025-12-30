/*
  # Populate Restaurant Default Content

  This migration populates the restaurant tables with default content.
  Uses DO block to ensure idempotent insertions.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM restaurant_hero LIMIT 1) THEN
    INSERT INTO restaurant_hero (title, subtitle, background_image_path, button_text_1, button_text_2)
    VALUES (
      'Ресторан Культура',
      'Изысканная кухня и атмосфера в сердце Гродно',
      '/NewReso/resto6.jpg',
      'Забронировать столик',
      'Посмотреть меню'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM restaurant_about LIMIT 1) THEN
    INSERT INTO restaurant_about (title, paragraph_1, paragraph_2, image_path)
    VALUES (
      'Гастрономическое путешествие',
      'Ресторан Культура — это место, где каждое блюдо рассказывает свою историю. Мы создаём уникальные гастрономические впечатления, объединяя традиции белорусской кухни с современными кулинарными техниками.',
      'Наш шеф-повар и его команда ежедневно работают над тем, чтобы каждый визит в наш ресторан становился незабываемым событием.',
      '/Resto/IMG_20251119_175605_550.jpg'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM restaurant_about_features LIMIT 1) THEN
    INSERT INTO restaurant_about_features (icon, title, description, display_order) VALUES
      ('ChefHat', 'Авторская кухня', 'Наши повара создают уникальные блюда, сочетающие традиции и современность', 1),
      ('Wine', 'Винная карта', 'Тщательно подобранная коллекция вин со всего мира', 2),
      ('UtensilsCrossed', 'Свежие продукты', 'Только лучшие локальные и сезонные ингредиенты', 3);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM restaurant_gallery_images LIMIT 1) THEN
    INSERT INTO restaurant_gallery_images (image_path, alt_text, display_order) VALUES
      ('/NewReso/resto1.jpg', 'Английский завтрак с глазуньей', 1),
      ('/NewReso/resto2.jpg', 'Брускетты с сёмгой', 2),
      ('/NewReso/resto3.jpg', 'Салат с мандарином', 3),
      ('/NewReso/resto4.jpg', 'Говядина с клюквенным соусом', 4),
      ('/NewReso/resto5.jpg', 'Больше чем шу', 5),
      ('/NewReso/resto6.jpg', 'Рамен с цыпленком', 6);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM restaurant_reservation_info LIMIT 1) THEN
    INSERT INTO restaurant_reservation_info (
      title, subtitle, hours_label, hours_text, phone_label, phone_number, 
      capacity_label, capacity_text, form_title
    )
    VALUES (
      'Бронирование',
      'Забронируйте столик и насладитесь незабываемым вечером',
      'ЧАСЫ РАБОТЫ',
      'Вс-Чт: 08:00 — 24:00
Пт-Сб: 08:00 — 01:00',
      'ТЕЛЕФОН',
      '+375 33 388-54-54',
      'ВМЕСТИМОСТЬ',
      'До 30 гостей
Возможность проведения мероприятий',
      'Забронировать столик'
    );
  END IF;
END $$;