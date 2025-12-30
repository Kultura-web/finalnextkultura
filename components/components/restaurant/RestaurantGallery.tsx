"use client"

import { useEffect, useRef, useState } from 'react';
import { fetchRestaurantGalleryImages } from '@/lib/contentService';
import { getPublicImageUrl } from '@/lib/supabase';

const defaultImages = [
  {
    image_path: '/NewReso/resto1.jpg',
    alt_text: 'Английский завтрак с глазуньей'
  },
  {
    image_path: '/NewReso/resto2.jpg',
    alt_text: 'Брускетты с сёмгой'
  },
  {
    image_path: '/NewReso/resto3.jpg',
    alt_text: 'Салат с мандарином'
  },
  {
    image_path: '/NewReso/resto4.jpg',
    alt_text: 'Говядина с клюквенным соусом'
  },
  {
    image_path: '/NewReso/resto5.jpg',
    alt_text: 'Больше чем шу'
  },
  {
    image_path: '/NewReso/resto6.jpg',
    alt_text: 'Рамен с цыпленком'
  }
];

export default function RestaurantGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState(defaultImages);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRestaurantGalleryImages()
      .then(data => {
        if (data && data.length > 0) setImages(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-32 bg-[#e8e5e0]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2
            className={`text-3xl md:text-5xl font-light text-gray-900 mb-4 transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Галерея
          </h2>
          <p
            className={`text-gray-600 text-lg mt-6 max-w-2xl mx-auto transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Взгляните на наши кулинарные шедевры
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden h-80 transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
            >
              <img
                src={getPublicImageUrl(image.image_path, 'cms-images')}
                alt={image.alt_text}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
