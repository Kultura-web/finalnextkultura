/*
  # Create Storage Buckets for Admin Dashboard

  Creates public storage buckets for storing uploaded images
  from the admin dashboard.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-files', 'menu-files', true)
ON CONFLICT DO NOTHING;
