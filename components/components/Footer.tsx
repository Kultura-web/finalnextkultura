import { Instagram, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-light mb-4">ОТЕЛЬ КУЛЬТУРА</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
            ООО «Культура гостеприимства» Республика Беларусь г.Гродно, ул. Советская, Д. 3 УНП 591 006 629
            Свидетельство о государственной регистрации №591006629, выдано Гродненским областным исполнительным комитетом 06.02.2023
            </p>
          </div>

          <div>
            <h4 className="text-sm font-normal mb-4">КОНТАКТЫ</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>г. Гродно, ул. Советская, 3</li>
              <li>
                <a href="tel:+375333428888" className="hover:text-white transition-colors">
                  +375 33 342-88-88
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/boutique_hotel_kultura  " target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                @kultura.cafe.grodno
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
              <a href="https://www.instagram.com/@kultura.cafe.grodno  " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c8aa57] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a href="https://www.instagram.com/@kultura.cafe.grodno  " target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c8aa57] transition-colors">
              <Send className='size-5' />
              </a> */}
            </div>
          </div>
        </div>

        <Image src="/logos/White/HORIZONTAL WHITE.png" alt="logos" width={1000} height={200} />

        <div className="pt-8 border-t border-neutral-700 text-center">
          <p className="text-gray-400 text-sm">
             2025 ООО «Культура гостеприимства». УНП 591 006 629. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
