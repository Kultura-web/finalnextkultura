import { supabase } from './supabase';

export async function fetchHeroSection() {
  const { data, error } = await supabase
    .from('hero_section')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchRoomsWithImages() {
  const { data, error } = await supabase
    .from('rooms')
    .select('*, room_images(*)')
    .order('display_order');

  if (error) throw error;
  return data;
}

export async function fetchOffersWithImages() {
  const { data, error } = await supabase
    .from('offers')
    .select('*, offer_images(*)')
    .order('display_order');

  if (error) throw error;
  return data;
}

export async function fetchGalleryImages() {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order');

  if (error) throw error;
  return data;
}

export async function fetchMenuItems() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('display_order');

  if (error) throw error;
  return data;
}

export async function fetchAboutSection() {
  const { data, error } = await supabase
    .from('about_section')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchRestaurantSection() {
  const { data, error } = await supabase
    .from('restaurant_section')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchFooter() {
  const { data, error } = await supabase
    .from('footer')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}
