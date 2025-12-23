import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file: File, bucket: string) => {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) throw error;

  const path = `/${bucket}/${data.path}`;
  return path;
};

export const getPublicImageUrl = (path: string, bucket: string) => {
  if (!path) return '';

  if (path.startsWith('/') && !path.includes(bucket)) {
    return path;
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path.replace(`/${bucket}/`, ''));

  return data.publicUrl;
};
