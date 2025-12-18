'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAsyncContent } from './hooks/useAsyncContent';
import * as contentService from './contentService';
import {
  DEFAULT_HERO,
  DEFAULT_ROOMS,
  DEFAULT_OFFERS,
  DEFAULT_GALLERY,
  DEFAULT_ABOUT,
} from './defaults/content';

interface ContentContextType {
  hero: any;
  rooms: any[];
  offers: any[];
  gallery: any[];
  menuItems: any[];
  about: any;
  restaurant: any;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const hero = useAsyncContent({
    defaultValue: DEFAULT_HERO,
    fetchFn: () => contentService.fetchHeroSection().catch(() => null),
  });

  const rooms = useAsyncContent({
    defaultValue: DEFAULT_ROOMS,
    fetchFn: () => contentService.fetchRoomsWithImages().catch(() => null),
  });

  const offers = useAsyncContent({
    defaultValue: DEFAULT_OFFERS,
    fetchFn: () => contentService.fetchOffersWithImages().catch(() => null),
  });

  const gallery = useAsyncContent({
    defaultValue: DEFAULT_GALLERY,
    fetchFn: () => contentService.fetchGalleryImages().catch(() => null),
  });

  const menuItems = useAsyncContent({
    defaultValue: [],
    fetchFn: () => contentService.fetchMenuItems().catch(() => null),
  });

  const about = useAsyncContent({
    defaultValue: DEFAULT_ABOUT,
    fetchFn: () => contentService.fetchAboutSection().catch(() => null),
  });

  const restaurant = useAsyncContent({
    defaultValue: {},
    fetchFn: () => contentService.fetchRestaurantSection().catch(() => null),
  });

  const isLoading =
    hero.isLoading ||
    rooms.isLoading ||
    offers.isLoading ||
    gallery.isLoading ||
    menuItems.isLoading ||
    about.isLoading ||
    restaurant.isLoading;

  return (
    <ContentContext.Provider
      value={{
        hero: hero.data,
        rooms: rooms.data,
        offers: offers.data,
        gallery: gallery.data,
        menuItems: menuItems.data,
        about: about.data,
        restaurant: restaurant.data,
        isLoading,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}
