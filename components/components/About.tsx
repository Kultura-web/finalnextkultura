"use client"

import { useEffect, useRef, useState } from 'react';
import { useContent } from '@/lib/ContentContext';

export default function About() {
  const { about } = useContent();
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="about" className="py-16 md:py-32 bg-[#e8e5e0]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start">
          <div>
            <h2
              className={`text-2xl md:text-5xl font-light text-gray-900 mb-8 md:mb-12 leading-tight transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              {about.title?.split('\n').map((line: string, i: number) => (
                <span key={i}>{line}{i === 0 ? <br /> : ''}</span>
              ))}
            </h2>
            <div className="space-y-6 md:space-y-8 text-gray-700 leading-relaxed text-base md:text-lg">
              <p
                className={`transform transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '0.4s' }}
              >
                {about.paragraph_1}
              </p>
              <p
                className={`transform transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '0.8s' }}
              >
                {about.paragraph_2}
              </p>
              <p
                className={`transform transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '1s' }}
              >
                {about.paragraph_3}
              </p>
            </div>
            <div
              className={`mt-8 md:mt-12 transform transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '1.2s' }}
            >
              <a
                href="#rooms"
                className="inline-block w-full sm:w-auto text-center px-6 md:px-8 py-3 md:py-4 bg-[#c8aa57] text-black hover:bg-[#c8aa57] transition-all duration-300 hover:scale-105 text-sm md:text-base"
              >
                {about.button_text}
              </a>
            </div>
          </div>

          <div
            className={`space-y-8 transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="w-full h-[300px] md:h-[600px] overflow-hidden transform hover:shadow-2xl transition-all duration-500 relative">
              <img
                src={about.image_path}
                alt="Hotel"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}