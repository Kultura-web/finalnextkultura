'use client';

import { Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContent } from '@/lib/ContentContext';

export default function Footer() {
  const { footer } = useContent();

  return (
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-light mb-4">ОТЕЛЬ КУЛЬТУРА</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {footer.company_address}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-normal mb-4">КОНТАКТЫ</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>{footer.company_address}</li>
              <li>
                <a href={`tel:${footer.company_phone}`} className="hover:text-white transition-colors">
                  {footer.company_phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${footer.company_email}`} className="hover:text-white transition-colors">
                  {footer.company_email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-normal mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link
                  href="/rules"
                  className="hover:text-white transition-colors"
                >
                  Правила Проживания в отеле
                </Link>
              </li>
              <li>
                <Link
                  href="/oferta"
                  className="hover:text-white transition-colors"
                >
                  Политика Обработки Персональных Данных
                </Link>
              </li>
              <li>
                <Link
                  href="/contract"
                  className="hover:text-white transition-colors"
                >
                  Публичный договор
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-normal mb-4">СОЦИАЛЬНЫЕ СЕТИ</h4>
            <div className="flex gap-4">
              {footer.instagram_url && (
                <a href={footer.instagram_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c8aa57] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {footer.facebook_url && (
                <a href={footer.facebook_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c8aa57] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <Image src="/logos/White/HORIZONTAL WHITE.png" alt="logos" width={1000} height={200} />

        <div className="pt-8 border-t border-neutral-700 text-center">
          <p className="text-gray-400 text-sm">
            {footer.copyright_text}
          </p>
        </div>
      </div>
    </footer>
  );
}
