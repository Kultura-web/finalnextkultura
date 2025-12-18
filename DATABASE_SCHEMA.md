# Database Schema Reference

## Complete Database Structure for Hotel Kultura

### Tables Overview

```
┌─────────────────────────────────────────────┐
│           Content Tables (Public)            │
├─────────────────────────────────────────────┤
│ hero_section                                 │
│ about_section                                │
│ rooms ─────→ room_images                     │
│ offers ────→ offer_images                    │
│ gallery_images                               │
│ menu_items                                   │
│ restaurant_section                           │
└─────────────────────────────────────────────┘
│           Admin Tables (Private)             │
├─────────────────────────────────────────────┤
│ admin_users                                  │
└─────────────────────────────────────────────┘
│           Storage Buckets (Public)           │
├─────────────────────────────────────────────┤
│ cms-images (for hotel photos)                │
│ menu-files (for PDF menus)                   │
└─────────────────────────────────────────────┘
```

## Detailed Schema

### 1. hero_section
**Purpose**: Main hero banner content

| Column | Type | Default |
|--------|------|---------|
| id | uuid | gen_random_uuid() |
| title | text | 'Бутик-отель в историческом центре Гродно' |
| subtitle | text | 'Искусство, культура и комфорт на улице Советская, 3' |
| background_image_path | text | '/Rooms/IMG_20251120_145334_889.jpg' |
| button_text | text | 'Забронировать' |
| updated_at | timestamptz | now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can update

---

### 2. about_section
**Purpose**: About page content

| Column | Type | Default |
|--------|------|---------|
| id | uuid | gen_random_uuid() |
| title | text | 'Что такое Отель Культура?' |
| paragraph_1 | text | Hotel description |
| paragraph_2 | text | Amenities description |
| paragraph_3 | text | Location description |
| image_path | text | 'grodno.jpg' |
| button_text | text | 'Забронировать' |
| updated_at | timestamptz | now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can update

---

### 3. rooms
**Purpose**: Room types and details

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | Primary Key |
| title | text | NOT NULL |
| description | text | NOT NULL |
| price | text | NOT NULL |
| features | text[] | Array of features |
| display_order | integer | Sort order |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can insert, update, delete

**Example Data**:
```
1. Делюкс с балконом
   Price: от 450 BYN
   Features: [44 м², Двуспальная кровать, Рабочая зона, Wi‑Fi, Небольшой балкон]

2. Представительский люкс с балконом и ванной чашей
   Price: от 500 BYN
   Features: [38 м², Зона отдыха, Балкон, Ванная чаша]

3. Делюкс с ванной чашей
   Price: от 500 BYN
   Features: [40 м², Отдельная небольшая гостиная, Wi‑Fi, Ванная чаша]
```

---

### 4. room_images
**Purpose**: Images for each room (carousel)

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | Primary Key |
| room_id | uuid | Foreign Key → rooms(id) |
| image_path | text | NOT NULL |
| display_order | integer | Sort order in carousel |
| created_at | timestamptz | Default now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can insert, update, delete

**Total Rows**: 15 (6 + 6 + 3 images per room)

---

### 5. offers
**Purpose**: Special offers/promotions

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | Primary Key |
| title | text | NOT NULL |
| description | text | NOT NULL |
| discount | integer | Discount percentage |
| display_order | integer | Sort order |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can insert, update, delete

**Example Data**:
```
1. Утро невесты в самом сердце Гродно
   Discount: 15%

2. Культурная программа
   Discount: 10%
```

---

### 6. offer_images
**Purpose**: Images for each offer

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | Primary Key |
| offer_id | uuid | Foreign Key → offers(id) |
| image_path | text | NOT NULL |
| display_order | integer | Sort order |
| created_at | timestamptz | Default now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can insert, update, delete

**Total Rows**: 5 (4 + 1 images per offer)

---

### 7. gallery_images
**Purpose**: Gallery with masonry layout

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | Primary Key |
| image_path | text | NOT NULL |
| title | text | NOT NULL |
| span_cols | integer | CSS Grid columns (default 1) |
| span_rows | integer | CSS Grid rows (default 1) |
| display_order | integer | Sort order |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can insert, update, delete

**Example Data** (8 images):
```
1. Интерьер номера (2x2 grid)
2. Ресторан (1x1)
3. Лобби (1x1)
4. Спа-зона (1x1)
5. Панорамный вид (1x1)
6. Фасад отеля (2x1)
7. Спа-процедуры (1x1)
8. Фитнес-центр (1x1)
```

---

### 8. menu_items
**Purpose**: Restaurant menu documents

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | Primary Key |
| title | text | NOT NULL |
| file_path | text | NOT NULL |
| menu_type | text | 'main' \| 'children' \| 'drinks' |
| display_order | integer | Sort order |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can insert, update, delete

**Example Data** (3 items):
```
1. Основное меню (/Menu3.pdf)
2. Детское меню (/Menu2.pdf)
3. Напитки (/Menu1.pdf)
```

---

### 9. restaurant_section
**Purpose**: Restaurant page header content

| Column | Type | Default |
|--------|------|---------|
| id | uuid | gen_random_uuid() |
| title | text | 'Ресторан' |
| description | text | 'Наш ресторан' |
| background_image_path | text | '/Resto/IMG_20251119_175624_816.jpg' |
| updated_at | timestamptz | now() |

**RLS Policies**:
- ✓ Anyone can read
- ✓ Authenticated admins can update

---

### 10. admin_users
**Purpose**: Admin authentication

| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | Primary Key |
| email | text | UNIQUE NOT NULL |
| password_hash | text | NOT NULL |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Default now() |

**RLS Policies**:
- ✓ Authenticated users can read their own record

---

## Storage Buckets

### cms-images
- **Purpose**: Store hotel/restaurant images
- **Access**: Public (anyone can read)
- **Upload**: Authenticated admins only
- **Delete**: Authenticated admins only

### menu-files
- **Purpose**: Store menu PDFs
- **Access**: Public (anyone can read)
- **Upload**: Authenticated admins only
- **Delete**: Authenticated admins only

---

## Data Statistics

| Table | Rows |
|-------|------|
| hero_section | 1 |
| about_section | 1 |
| rooms | 3 |
| room_images | 15 |
| offers | 2 |
| offer_images | 5 |
| gallery_images | 8 |
| menu_items | 3 |
| restaurant_section | 1 |
| **TOTAL** | **39** |

---

## Row Level Security (RLS) Summary

### Public Access (No Authentication Required)
- ✓ Read all content from content tables
- ✓ Cannot modify any content

### Authenticated Admin Access
- ✓ Read/Create/Update/Delete all content tables
- ✓ Upload/Delete files in storage buckets
- ✓ Cannot access other admin credentials

### Security Architecture
1. **Content is public**: Guests see current content without auth
2. **Edits require auth**: Only logged-in admins can modify content
3. **Storage is protected**: Only admins can upload/delete images
4. **Files are public**: Once uploaded, everyone can view images

---

## Related React Components

### Components Using This Data

| Component | Table(s) |
|-----------|----------|
| Hero | hero_section |
| About | about_section |
| Rooms | rooms, room_images |
| Offers | offers, offer_images |
| Gallery | gallery_images |
| RestaurantMenu | menu_items, restaurant_section |

### Admin Dashboard Pages

| Page | Table |
|------|-------|
| /admin/dashboard/hero | hero_section |
| /admin/dashboard/about | about_section |
| /admin/dashboard/rooms | rooms, room_images |
| /admin/dashboard/offers | offers, offer_images |
| /admin/dashboard/gallery | gallery_images |
| /admin/dashboard/menu | menu_items |

---

## Indexing Strategy

For better performance, consider adding indexes:

```sql
-- Content lookup indexes
CREATE INDEX idx_rooms_display_order ON rooms(display_order);
CREATE INDEX idx_offers_display_order ON offers(display_order);
CREATE INDEX idx_gallery_display_order ON gallery_images(display_order);
CREATE INDEX idx_menu_display_order ON menu_items(display_order);

-- Foreign key performance
CREATE INDEX idx_room_images_room_id ON room_images(room_id);
CREATE INDEX idx_offer_images_offer_id ON offer_images(offer_id);
```

---

## Backup Recommendations

1. **Daily**: Automatic Supabase backups (included in Pro plan)
2. **Weekly**: Manual export of database
3. **Before major changes**: Full database snapshot

To export: Settings → Database → Backups
