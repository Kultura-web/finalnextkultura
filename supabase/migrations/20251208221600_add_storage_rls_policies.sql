/*
  # Add Storage RLS Policies

  Supabase Storage buckets need RLS policies to control access.
  This migration adds policies to allow authenticated users to upload
  files to the cms-images and menu-files buckets.
  
  Changes:
  - Allow authenticated users to upload to cms-images bucket
  - Allow public to read from cms-images bucket
  - Allow authenticated users to delete from cms-images bucket
  - Allow authenticated users to upload to menu-files bucket
  - Allow public to read from menu-files bucket
  - Allow authenticated users to delete from menu-files bucket
*/

CREATE POLICY "Allow authenticated users to upload to cms-images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'cms-images');

CREATE POLICY "Allow public to read cms-images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'cms-images');

CREATE POLICY "Allow authenticated users to delete from cms-images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'cms-images');

CREATE POLICY "Allow authenticated users to upload to menu-files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'menu-files');

CREATE POLICY "Allow public to read menu-files"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'menu-files');

CREATE POLICY "Allow authenticated users to delete from menu-files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'menu-files');
