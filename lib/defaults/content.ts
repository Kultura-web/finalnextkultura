export const DEFAULT_ABOUT = {
  id: 'default',
  title: 'Что такое\nОтель Культура?',
  paragraph_1: 'Бутик Отель "Культура" — особое место в самом центре города Гродно, сочетающее старину здания 1860-х годов и современный уют.\n\nОкна выходят на главную пешеходную улицу, а с балконов открывается перспектива на площадь.',
  paragraph_2: 'Просторные номера со всеми условиями созданы для отдыха. В отеле с самого утра работает кафе с сытной и интересной кухней, напитками и десертами.',
  paragraph_3: 'В шаговой доступности — все главные достопримечательности города.',
  image_path: '/grodno.jpg',
  button_text: 'Забронировать',
};

export const DEFAULT_HERO = {
  id: 'default',
  title: 'Бутик-отель в историческом центре Гродно',
  subtitle: 'Искусство, культура и комфорт на улице Советская, 3',
  background_image_path: '/Rooms/IMG_20251120_145334_889.jpg',
  button_text: 'Забронировать',
};

export const DEFAULT_ROOMS = [
  {
    id: 'room-1',
    title: 'Делюкс с балконом',
    description: 'Уютный современный номер с выходом на небольшой балкон. Идеален для пары или одного гостя.',
    price: 'от 450 BYN',
    features: ['44 м²', 'Двуспальная кровать', 'Рабочая зона', 'Wi‑Fi', 'Небольшой балкон'],
    display_order: 0,
    room_images: [
      { id: 'img-1', image_path: '/Rooms/IMG_20251120_150935_690.jpg', display_order: 0 },
      { id: 'img-2', image_path: '/Rooms/IMG_20251120_150919_870.jpg', display_order: 1 },
      { id: 'img-3', image_path: '/Rooms/IMG_20251120_150916_901.jpg', display_order: 2 },
      { id: 'img-4', image_path: '/Rooms/IMG_20251120_150859_353.jpg', display_order: 3 },
      { id: 'img-5', image_path: '/Rooms/IMG_20251120_150855_053.jpg', display_order: 4 },
      { id: 'img-6', image_path: '/Rooms/IMG_20251120_150938_549.jpg', display_order: 5 },
    ],
  },
  {
    id: 'room-2',
    title: 'Представительский люкс с балконом и ванной чашей',
    description: 'Просторный номер с зоной отдыха, балконом и ванной чашей.',
    price: 'от 500 BYN',
    features: ['38 м²', 'Зона отдыха', 'Балкон', 'Ванная чаша'],
    display_order: 1,
    room_images: [
      { id: 'img-7', image_path: '/Rooms/IMG_20251120_145519_667.jpg', display_order: 0 },
      { id: 'img-8', image_path: '/Rooms/IMG_20251120_145501_634.jpg', display_order: 1 },
      { id: 'img-9', image_path: '/Rooms/IMG_20251120_145526_536.jpg', display_order: 2 },
      { id: 'img-10', image_path: '/Rooms/IMG_20251120_145556_884.jpg', display_order: 3 },
      { id: 'img-11', image_path: '/Rooms/IMG_20251120_145604_693.jpg', display_order: 4 },
      { id: 'img-12', image_path: '/Rooms/IMG_20251120_145712_373.jpg', display_order: 5 },
    ],
  },
  {
    id: 'room-3',
    title: 'Делюкс с ванной чашей',
    description: 'Комфортный номер средней площади с отдельной зоной отдыха и ванной чашей.',
    price: 'от 500 BYN',
    features: ['40 м²', 'Отдельная небольшая гостиная', 'Wi‑Fi', 'Ванная чаша'],
    display_order: 2,
    room_images: [
      { id: 'img-13', image_path: '/Rooms/IMG_20251120_145334_889.jpg', display_order: 0 },
      { id: 'img-14', image_path: '/Rooms/IMG_20251120_145338_036.jpg', display_order: 1 },
      { id: 'img-15', image_path: '/Rooms/IMG_20251120_145410_674.jpg', display_order: 2 },
    ],
  },
];

export const DEFAULT_OFFERS = [
  {
    id: 'offer-1',
    title: 'Утро невесты в самом сердце Гродно',
    description: 'Продуманный интерьер и великолепный вид с лоджии сделает ваш особенный день незабываемым',
    discount: 15,
    display_order: 0,
    offer_images: [
      { id: 'off-img-1', image_path: '/Offers/Offer1.jpg', display_order: 0 },
      { id: 'off-img-2', image_path: '/Offers/Offer2.jpg', display_order: 1 },
      { id: 'off-img-3', image_path: '/Offers/Offer3.jpg', display_order: 2 },
      { id: 'off-img-4', image_path: '/Offers/Offer4.jpg', display_order: 3 },
    ],
  },
  {
    id: 'offer-2',
    title: 'Культурная программа',
    description: 'Скидка 10% на проживание с посещением лучших достопримечательностей города',
    discount: 10,
    display_order: 1,
    offer_images: [
      { id: 'off-img-5', image_path: '/Resto/IMG_20251119_175605_550.jpg', display_order: 0 },
    ],
  },
];

export const DEFAULT_GALLERY = [
  {
    id: 'gal-1',
    url: '/photo_12_2025-10-31_18-24-38.jpg',
    title: 'Интерьер номера',
    span: 'col-span-2 row-span-2',
    display_order: 0,
  },
  {
    id: 'gal-2',
    url: '/photo_13_2025-10-31_18-24-38.jpg',
    title: 'Ресторан',
    span: 'col-span-1 row-span-1',
    display_order: 1,
  },
  {
    id: 'gal-3',
    url: '/photo_14_2025-10-31_18-24-38.jpg',
    title: 'Лобби',
    span: 'col-span-1 row-span-1',
    display_order: 2,
  },
  {
    id: 'gal-4',
    url: '/photo_15_2025-10-31_18-24-38.jpg',
    title: 'Спа-зона',
    span: 'col-span-1 row-span-1',
    display_order: 3,
  },
  {
    id: 'gal-5',
    url: '/photo_16_2025-10-31_18-24-38.jpg',
    title: 'Панорамный вид',
    span: 'col-span-1 row-span-1',
    display_order: 4,
  },
  {
    id: 'gal-6',
    url: '/photo_17_2025-10-31_18-24-38.jpg',
    title: 'Фасад отеля',
    span: 'col-span-2 row-span-1',
    display_order: 5,
  },
  {
    id: 'gal-7',
    url: '/photo_18_2025-10-31_18-24-38.jpg',
    title: 'Спа-процедуры',
    span: 'col-span-1 row-span-1',
    display_order: 6,
  },
  {
    id: 'gal-8',
    url: '/photo_19_2025-10-31_18-24-38.jpg',
    title: 'Фитнес-центр',
    span: 'col-span-1 row-span-1',
    display_order: 7,
  },
];

export const DEFAULT_FOOTER = {
  id: 'default',
  copyright_text: '© 2024 Отель Культура. Все права защищены.',
  company_address: 'ул. Советская, 22, Гродно, Беларусь',
  company_phone: '+375 29 123-45-67',
  company_email: 'info@kulturahotel.by',
  facebook_url: 'https://facebook.com/kulturahotel',
  instagram_url: 'https://instagram.com/kulturahotel',
};

export const DEFAULT_NAVBAR = {
  id: 'default',
  hotel_name: 'ОТЕЛЬ КУЛЬТУРА',
  hotel_phone: '+375 33 342-88-88',
  restaurant_phone: '+375 33 388-54-54',
  logo_url: '/logo-no-bg.png',
};

export const DEFAULT_CONTACT = {
  id: 'default',
  title: 'Где мы находимся',
  subtitle: 'В самом сердце исторического Гродно, на улице Советская',
  address_line1: 'г. Гродно, ул. Советская, 3',
  address_line2: 'Беларусь',
  phone: '+375 33 342-88-88',
  instagram_handle: '@kultura.cafe.grodno',
  instagram_url: 'https://www.instagram.com/boutique_hotel_kultura',
  map_embed_url: 'https://yandex.ru/map-widget/v1/?text=г.%20Гродно%2C%20ул.%20Советская%2C%203%2C%20Отель%20Cultura&z=17&l=map',
};
