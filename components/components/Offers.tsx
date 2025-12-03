"use client"

import { useEffect, useRef, useState } from 'react';
import BookingModal from './BookingModal';

const offers = [
  {
    title: 'Утро невесты в самом сердце Гродно',
    description: 'Продуманный интерьер и великолепный вид с лоджии сделает ваш особенный день незабываемым',
    images: [
      '/Offers/Offer1.jpg',
      '/Offers/Offer2.jpg',
      '/Offers/Offer3.jpg',
      '/Offers/Offer4.jpg',
     ], // Single image
    discount: 15
  },
  {
    title: 'Культурная программа',
    description: 'Скидка 10% на проживание с посещением лучших достопримечательностей города',
    images: [
      '/Resto/IMG_20251119_175605_550.jpg',
    ],
    discount: 10
  }
];

export default function Offers() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<{ title: string; discount: number } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const goToPreviousImage = (offerIndex: number) => {
    if (!offers[offerIndex].images) return;
    const currentIndex = currentImageIndex[offerIndex] || 0;
    const maxIndex = offers[offerIndex].images.length - 1;
    const newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    setCurrentImageIndex(prev => ({ ...prev, [offerIndex]: newIndex }));
  };

  const goToNextImage = (offerIndex: number) => {
    if (!offers[offerIndex].images) return;
    const currentIndex = currentImageIndex[offerIndex] || 0;
    const maxIndex = offers[offerIndex].images.length - 1;
    const newIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
    setCurrentImageIndex(prev => ({ ...prev, [offerIndex]: newIndex }));
  };

  const handleBookClick = () => {
    document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="offers" className="py-16 md:py-32 bg-[#e8e5e0]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="mb-12 md:mb-20">
          <h2
            className={`text-2xl md:text-5xl font-light text-gray-900 mb-4 transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Спецпредложения
          </h2>
          <p
            className={`text-gray-600 text-base md:text-lg mt-6 max-w-2xl transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            Воспользуйтесь нашими эксклюзивными предложениями
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {offers.map((offer, index) => {
            const imageCount = offer.images?.length || 0;
            const showMultipleImages = imageCount > 1;
            const currentImage = showMultipleImages 
              ? offer.images[currentImageIndex[index] || 0] 
              : offer.images[0];
            
            return (
              <div
                key={index}
                className={`group transform transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${0.6 + index * 0.2}s` }}
              >
                <div className="relative h-[300px] md:h-[600px] overflow-hidden mb-6 md:mb-8 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <img
                    src={currentImage}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-[2000ms]"
                  />
                  <div className="absolute inset-0 bg-black/15"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-500"></div>
                  
                  {/* Navigation buttons for multiple images */}
                  {showMultipleImages && (
                    <>
                      <button
                        onClick={() => goToPreviousImage(index)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                        aria-label="Previous image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => goToNextImage(index)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                        aria-label="Next image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-3 group-hover:translate-x-2 transition-transform duration-300">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg">
                  {offer.description}
                </p>
                <button
                  onClick={handleBookClick}
                  className="w-full sm:w-auto inline-block px-6 md:px-8 py-3 md:py-4 bg-[#E39E14] text-black hover:bg-[#E39E14] transition-all duration-300 hover:scale-105 text-sm md:text-base text-center"
                >
                  Забронировать
                </button>
              </div>
            );
          })}
        </div>
      </div>
    
    </section>
  );
}