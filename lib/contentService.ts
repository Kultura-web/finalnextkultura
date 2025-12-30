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

export async function fetchRestaurantHero() {
  const { data, error } = await supabase
    .from('restaurant_hero')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchRestaurantAbout() {
  const { data, error } = await supabase
    .from('restaurant_about')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchRestaurantAboutFeatures() {
  const { data, error } = await supabase
    .from('restaurant_about_features')
    .select('*')
    .order('display_order');

  if (error) throw error;
  return data;
}

export async function fetchRestaurantGalleryImages() {
  const { data, error } = await supabase
    .from('restaurant_gallery_images')
    .select('*')
    .order('display_order');

  if (error) throw error;
  return data;
}

export async function fetchRestaurantReservationInfo() {
  const { data, error } = await supabase
    .from('restaurant_reservation_info')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchNavbar() {
  const { data, error } = await supabase
    .from('navbar')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchContactInfo() {
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data;
}
