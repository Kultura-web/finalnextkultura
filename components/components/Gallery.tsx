'use client';

import { useContent } from '@/lib/ContentContext';

export default function Gallery() {
  const { gallery } = useContent();

  return (
    <section className="py-16 md:py-24 bg-[#e8e5e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <h2 className="text-2xl md:text-5xl font-light tracking-wider text-gray-900 mb-4">
            ГАЛЕРЕЯ
          </h2>
          <div className="w-24 h-px bg-gray-900 mx-auto mb-6"></div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Познакомьтесь с атмосферой нашего отеля через визуальное путешествие
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {gallery.map((image, index) => (
            <div
              key={image.id || index}
              className="relative overflow-hidden group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animation: `fadeIn 0.8s ease-out ${index * 0.1}s forwards` }}
            >
              <img
                src={image.url}
                alt="Gallery"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75 brightness-90"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-gray-900 text-gray-900 text-xs md:text-sm tracking-widest hover:bg-gray-900 hover:text-white hover:scale-105 transition-all duration-300">
            СМОТРЕТЬ ВСЕ ФОТО
          </button>
        </div>
      </div>
    </section>
  );
}
