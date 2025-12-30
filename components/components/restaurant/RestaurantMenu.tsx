"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fetchMenuItems } from "@/lib/contentService";

interface MenuItem {
  id: string;
  title: string;
  file_path: string;
  menu_type: string;
  display_order: number;
}

export default function RestaurantMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMenuItems()
      .then(data => {
        if (data) setMenuItems(data);
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

  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center py-20 md:py-28"
      style={{
        minHeight: "60vh",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Next.js Image component as the background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Resto/IMG_20251119_175624_816.jpg"
          alt="Restaurant Menu"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="relative z-10 w-full px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className={`text-3xl md:text-5xl font-light text-white mb-8 transform transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Меню
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleDownload(item.file_path)}
                className="px-6 py-2 text-sm border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}