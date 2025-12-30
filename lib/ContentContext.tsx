'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAsyncContent } from './hooks/useAsyncContent';
import * as contentService from './contentService';
import {
  DEFAULT_HERO,
  DEFAULT_ROOMS,
  DEFAULT_OFFERS,
  DEFAULT_GALLERY,
  DEFAULT_ABOUT,
  DEFAULT_FOOTER,
  DEFAULT_NAVBAR,
  DEFAULT_CONTACT,
} from './defaults/content';

interface ContentContextType {
  hero: any;
  rooms: any[];
  offers: any[];
  gallery: any[];
  menuItems: any[];
  about: any;
  restaurant: any;
  footer: any;
  navbar: any;
  contact: any;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const fetchHero = useCallback(async () => {
    try {
      return await contentService.fetchHeroSection();
    } catch (err) {
      console.error('Error fetching hero:', err);
      return null;
    }
  }, []);

  const fetchRooms = useCallback(async () => {
    try {
      return await contentService.fetchRoomsWithImages();
    } catch (err) {
      console.error('Error fetching rooms:', err);
      return null;
    }
  }, []);

  const fetchOffers = useCallback(async () => {
    try {
      return await contentService.fetchOffersWithImages();
    } catch (err) {
      console.error('Error fetching offers:', err);
      return null;
    }
  }, []);

  const fetchGallery = useCallback(async () => {
    try {
      return await contentService.fetchGalleryImages();
    } catch (err) {
      console.error('Error fetching gallery:', err);
      return null;
    }
  }, []);

  const fetchMenu = useCallback(async () => {
    try {
      return await contentService.fetchMenuItems();
    } catch (err) {
      console.error('Error fetching menu:', err);
      return null;
    }
  }, []);

  const fetchAbout = useCallback(async () => {
    try {
      return await contentService.fetchAboutSection();
    } catch (err) {
      console.error('Error fetching about:', err);
      return null;
    }
  }, []);

  const fetchRestaurant = useCallback(async () => {
    try {
      return await contentService.fetchRestaurantSection();
    } catch (err) {
      console.error('Error fetching restaurant:', err);
      return null;
    }
  }, []);

  const fetchFooter = useCallback(async () => {
    try {
      return await contentService.fetchFooter();
    } catch (err) {
      console.error('Error fetching footer:', err);
      return null;
    }
  }, []);

  const fetchNavbar = useCallback(async () => {
    try {
      return await contentService.fetchNavbar();
    } catch (err) {
      console.error('Error fetching navbar:', err);
      return null;
    }
  }, []);

  const fetchContact = useCallback(async () => {
    try {
      return await contentService.fetchContactInfo();
    } catch (err) {
      console.error('Error fetching contact:', err);
      return null;
    }
  }, []);

  const hero = useAsyncContent({
    defaultValue: DEFAULT_HERO,
    fetchFn: fetchHero,
  });

  const rooms = useAsyncContent({
    defaultValue: DEFAULT_ROOMS,
    fetchFn: fetchRooms,
  });

  const offers = useAsyncContent({
    defaultValue: DEFAULT_OFFERS,
    fetchFn: fetchOffers,
  });

  const gallery = useAsyncContent({
    defaultValue: DEFAULT_GALLERY,
    fetchFn: fetchGallery,
  });

  const menuItems = useAsyncContent({
    defaultValue: [],
    fetchFn: fetchMenu,
  });

  const about = useAsyncContent({
    defaultValue: DEFAULT_ABOUT,
    fetchFn: fetchAbout,
  });

  const restaurant = useAsyncContent({
    defaultValue: {},
    fetchFn: fetchRestaurant,
  });

  const footer = useAsyncContent({
    defaultValue: DEFAULT_FOOTER,
    fetchFn: fetchFooter,
  });

  const navbar = useAsyncContent({
    defaultValue: DEFAULT_NAVBAR,
    fetchFn: fetchNavbar,
  });

  const contact = useAsyncContent({
    defaultValue: DEFAULT_CONTACT,
    fetchFn: fetchContact,
  });

  const isLoading =
    hero.isLoading ||
    rooms.isLoading ||
    offers.isLoading ||
    gallery.isLoading ||
    menuItems.isLoading ||
    about.isLoading ||
    restaurant.isLoading ||
    footer.isLoading ||
    navbar.isLoading ||
    contact.isLoading;

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
        footer: footer.data,
        navbar: navbar.data,
        contact: contact.data,
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
