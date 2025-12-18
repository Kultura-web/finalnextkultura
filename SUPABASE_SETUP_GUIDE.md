# Supabase Database Setup Guide

Complete instructions to set up your personal Supabase database for the Hotel Kultura project.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in project details:
   - **Name**: Hotel Kultura (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Choose Free or Pro (Free is sufficient for starting)
5. Wait for project to be created (5-10 minutes)

## Step 2: Get Your Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Anon (Public) Key**: The `anon` key under "Project API keys"

3. Update your `.env` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Replace** the existing values in `/tmp/cc-agent/61661669/project/.env`

## Step 3: Apply Database Migrations

Go to your Supabase project **SQL Editor** and run these migrations in order:

### Migration 1: Create CMS Content Schema

Copy and paste all content from: `supabase/migrations/20251208214518_create_cms_content_schema.sql`

This creates all tables:
- `hero_section`
- `about_section`
- `rooms` + `room_images`
- `offers` + `offer_images`
- `gallery_images`
- `menu_items`
- `restaurant_section`
- `admin_users`

**Click "Run" to execute**

### Migration 2: Populate Default Content

Copy and paste all content from: `supabase/migrations/20251208214544_populate_default_content.sql`

This inserts your website content:
- Hero section text and images
- About section text
- 3 room types with 15 room images
- 2 offers with 5 offer images
- 8 gallery images
- 3 menu items
- Restaurant section

**Click "Run" to execute**

### Migration 3: Create Storage Buckets

Copy and paste all content from: `supabase/migrations/20251208214600_create_storage_buckets.sql`

This creates two public storage buckets:
- `cms-images` - for hotel images
- `menu-files` - for menu PDFs

**Click "Run" to execute**

### Migration 4: Fix RLS Policies for Image Uploads

Copy and paste all content from: `supabase/migrations/20251208221230_fix_rls_policies_for_image_uploads.sql`

This fixes the INSERT policies for image tables so the admin dashboard can upload images.

**Click "Run" to execute**

### Migration 5: Add Storage RLS Policies

Copy and paste all content from: `supabase/migrations/20251208221600_add_storage_rls_policies.sql`

This sets up security policies for the storage buckets.

**Click "Run" to execute**

## Step 4: Verify Your Setup

After running all migrations, verify everything is working:

1. **Check Tables**: Go to **SQL Editor** and run:
```sql
SELECT
  'hero_section' as table_name, COUNT(*) as row_count FROM hero_section
UNION ALL
SELECT 'about_section', COUNT(*) FROM about_section
UNION ALL
SELECT 'rooms', COUNT(*) FROM rooms
UNION ALL
SELECT 'room_images', COUNT(*) FROM room_images
UNION ALL
SELECT 'offers', COUNT(*) FROM offers
UNION ALL
SELECT 'offer_images', COUNT(*) FROM offer_images
UNION ALL
SELECT 'gallery_images', COUNT(*) FROM gallery_images
UNION ALL
SELECT 'menu_items', COUNT(*) FROM menu_items
UNION ALL
SELECT 'restaurant_section', COUNT(*) FROM restaurant_section;
```

Expected output:
- hero_section: 1
- about_section: 1
- rooms: 3
- room_images: 15
- offers: 2
- offer_images: 5
- gallery_images: 8
- menu_items: 3
- restaurant_section: 1

2. **Check Buckets**: Go to **Storage** and verify you see:
   - `cms-images` bucket
   - `menu-files` bucket

## Step 5: Update Your Application

### Update Environment Variables

Edit `/tmp/cc-agent/61661669/project/.env`:

```bash
# Replace with your actual credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Deploy Your Application

Choose one of these options:

#### Option A: Deploy to Vercel (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Configure Supabase integration"
git push
```

2. Go to [https://vercel.com](https://vercel.com)
3. Click "Import Project" and select your GitHub repo
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

#### Option B: Run Locally

```bash
npm run dev
```

Your app will run at `http://localhost:3000`

## Step 6: Test the Admin Dashboard

1. Navigate to `/admin/login`
2. The admin panel is ready to use!

**Note**: Admin authentication uses JWT from Supabase Auth. Set up email/password auth in Supabase if needed.

## Database Schema Summary

### Public Tables (Anyone Can Read)
- **hero_section** - Hero banner text and background
- **about_section** - About page content
- **rooms** - Room types with descriptions
- **room_images** - Images for each room
- **offers** - Special offers/promotions
- **offer_images** - Images for offers
- **gallery_images** - Gallery images with layout info
- **menu_items** - Restaurant menu links
- **restaurant_section** - Restaurant section text

### Admin Tables
- **admin_users** - Admin login credentials

### Storage Buckets
- **cms-images** - Public bucket for hotel images
- **menu-files** - Public bucket for menu PDFs

## Security Features

All tables have Row Level Security (RLS) enabled:

✓ **Public Content**: Guests can read all content (hero, rooms, offers, gallery, etc.)
✓ **Admin Only**: Only authenticated admins can create, update, or delete content
✓ **Image Upload**: Admin can upload images to storage buckets
✓ **Real-time**: Changes made in admin dashboard instantly appear on the site

## Troubleshooting

### Issue: "Connection refused"
- **Solution**: Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct in `.env`

### Issue: "RLS policy violation"
- **Solution**: Re-run all migration files in order, especially the RLS policy migrations

### Issue: Admin can't upload images
- **Solution**: Ensure all 5 migrations were executed successfully, especially migration #4 and #5

### Issue: Tables not appearing
- **Solution**: Check you're looking at the `public` schema in Supabase dashboard

## Next Steps

1. Upload your hotel images to the `cms-images` bucket
2. Upload menu PDFs to the `menu-files` bucket
3. Use the admin dashboard to manage all content
4. Test all pages to ensure content displays correctly

## Files Included

Migration files are located in: `supabase/migrations/`
- `20251208214518_create_cms_content_schema.sql`
- `20251208214544_populate_default_content.sql`
- `20251208214600_create_storage_buckets.sql`
- `20251208221230_fix_rls_policies_for_image_uploads.sql`
- `20251208221600_add_storage_rls_policies.sql`

## Support

For Supabase documentation, visit: [https://supabase.com/docs](https://supabase.com/docs)
