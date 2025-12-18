# Quick Start: Setup Your Supabase DB in 10 Minutes

Fast-track setup for connecting to your personal Supabase database.

## Step 1: Create Supabase Project (3 min)

1. Go to https://supabase.com → Sign up/Login
2. Click "New Project"
3. Fill: Project name, Database password, Region
4. Click "Create"
5. Wait for project creation

## Step 2: Get Credentials (1 min)

In your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy your **Project URL**: `https://xxxxx.supabase.co`
3. Copy **Anon Key** (public, safe to share)

## Step 3: Update .env File (1 min)

Edit `.env` file in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Copy Database Schema (5 min)

Go to Supabase → **SQL Editor** → Click **"New Query"** five times

### Query 1: Schema & Tables
File: `supabase/migrations/20251208214518_create_cms_content_schema.sql`
- Copy entire content → Paste into Supabase → Click **"Run"**

### Query 2: Populate Data
File: `supabase/migrations/20251208214544_populate_default_content.sql`
- Copy entire content → Paste → Click **"Run"**

### Query 3: Storage Buckets
File: `supabase/migrations/20251208214600_create_storage_buckets.sql`
- Copy entire content → Paste → Click **"Run"**

### Query 4: Fix RLS
File: `supabase/migrations/20251208221230_fix_rls_policies_for_image_uploads.sql`
- Copy entire content → Paste → Click **"Run"**

### Query 5: Storage Policies
File: `supabase/migrations/20251208221600_add_storage_rls_policies.sql`
- Copy entire content → Paste → Click **"Run"**

## Done! ✓

Your database is ready. Test it:

```bash
npm run dev
```

Visit http://localhost:3000 - your content should load!

## What's Ready

✓ Hero section (banner text)
✓ About section
✓ 3 room types with images
✓ 2 special offers
✓ 8 gallery images
✓ 3 menu items
✓ Admin dashboard at `/admin/login`

## Next Steps

1. Upload your images to the storage buckets
2. Edit content via admin dashboard
3. Deploy to production (Vercel recommended)

## Troubleshooting

**Database won't connect?**
- Check `.env` values match exactly
- Ensure all 5 migrations ran without errors

**Admin can't upload images?**
- Confirm migration #4 and #5 executed successfully
- Check Storage → Buckets shows `cms-images` and `menu-files`

**Content not showing?**
- Run this SQL to verify data:
```sql
SELECT COUNT(*) as total_rows FROM rooms;
```
Should return: 3

## File Locations

| File | Purpose |
|------|---------|
| `.env` | Your credentials |
| `supabase/migrations/*.sql` | Database setup scripts |
| `/app/admin/dashboard` | Admin panel |
| `/components/components/*` | Frontend components |
| `/lib/ContentContext.tsx` | Data provider |

---

**Done! Your database is ready to use.** 🎉
