/*
  # Fix RLS Policies for Image Uploads

  The current RLS policies have WITH CHECK true but no USING clause for INSERT operations.
  This prevents authenticated users from inserting image records. We need to update the
  policies to explicitly allow INSERT operations with proper WITH CHECK clauses.
  
  Changes:
  - room_images: Update "Admin can manage room images" policy to allow INSERT
  - offer_images: Update "Admin can manage offer images" policy to allow INSERT  
  - gallery_images: Update "Admin can manage gallery" policy to allow INSERT
  - menu_items: Update "Admin can manage menu" policy to allow INSERT
*/

DROP POLICY IF EXISTS "Admin can manage room images" ON room_images;
CREATE POLICY "Admin can manage room images"
  ON room_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage offer images" ON offer_images;
CREATE POLICY "Admin can manage offer images"
  ON offer_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage gallery" ON gallery_images;
CREATE POLICY "Admin can manage gallery"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage menu" ON menu_items;
CREATE POLICY "Admin can manage menu"
  ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
