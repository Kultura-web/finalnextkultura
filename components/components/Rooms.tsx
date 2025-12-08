"use client"

import React, { useEffect, useState, useRef } from 'react';
import BookingModal from './BookingModal';
import { supabase } from '@/lib/supabase';

interface RoomImage {
  id: string;
  image_path: string;
  display_order: number;
}

interface RoomData {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  display_order: number;
  room_images?: RoomImage[];
}

export default function Rooms() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await supabase
          .from('rooms')
          .select('*, room_images(*)')
          .order('display_order');
        if (data) {
          setRooms(data);
          setCurrentImageIndexes(data.map(() => 0));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRooms();
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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const goPrev = (cardIndex: number) => {
    const len = (rooms[cardIndex]?.room_images?.length) || 0;
    if (len === 0) return;
    setCurrentImageIndexes(prev => {
      const copy = [...prev];
      copy[cardIndex] = (copy[cardIndex] - 1 + len) % len;
      return copy;
    });
  };

  const goNext = (cardIndex: number) => {
    const len = (rooms[cardIndex]?.room_images?.length) || 0;
    if (len === 0) return;
    setCurrentImageIndexes(prev => {
      const copy = [...prev];
      copy[cardIndex] = (copy[cardIndex] + 1) % len;
      return copy;
    });
  };

  const jumpTo = (cardIndex: number, imgIndex: number) => {
    setCurrentImageIndexes(prev => {
      const copy = [...prev];
      copy[cardIndex] = imgIndex;
      return copy;
    });
  };

  return (
    <section id="rooms" className="py-16 md:py-32 bg-[#e8e5e0]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="mb-12 md:mb-20">
          <h2
            className={`text-2xl md:text-5xl font-light text-gray-900 mb-4 transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Номера и цены
          </h2>
          <p
            className={`text-gray-600 text-base md:text-lg mt-6 max-w-2xl transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            Комфорт и удобство в самом центре Гродно
          </p>
        </div>

        <div className="mb-12">
          <div id="block-search">
            <div id="tl-search-form" className="tl-container"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {rooms.map((room, index) => {
            const images = room.room_images?.sort((a, b) => a.display_order - b.display_order).map(img => img.image_path) || [];
            const currentImage = images[currentImageIndexes[index]] || '/Rooms/IMG_20251120_145334_889.jpg';

            return (
            <div
              key={room.id}
              className={`group transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.6 + index * 0.2}s` }}
            >
              <div className="relative h-[300px] md:h-[500px] overflow-hidden mb-6 md:mb-8 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <img
                  src={currentImage}
                  alt={`${room.title} ${currentImageIndexes[index] + 1}`}
                  className="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-110 group-hover:translate-x-2"
                  onClick={() => setFullscreenImage(currentImage)}
                />

                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all duration-500"></div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => goPrev(index)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/60 backdrop-blur-sm rounded-full p-2 md:p-3 shadow hover:scale-105"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => goNext(index)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/60 backdrop-blur-sm rounded-full p-2 md:p-3 shadow hover:scale-105"
                    >
                      ›
                    </button>

                    <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-10 flex gap-2">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => jumpTo(index, i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndexes[index] === i ? 'bg-white scale-125' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-3 group-hover:translate-x-2 transition-transform duration-300">{room.title}</h3>
              <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{room.description}</p>

              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {room.features.map((feature, i) => (
                  <span key={i} className="text-xs md:text-sm text-gray-500">
                    {feature}{i < room.features.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-xl md:text-2xl font-light text-gray-900">{room.price}</span>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {fullscreenImage && (
        <div className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 text-white text-3xl md:text-4xl font-light hover:scale-110 transition-transform"
          >
            ×
          </button>
          <img
            src={fullscreenImage}
            className="max-w-[95%] max-h-[95%] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
