'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Главная' },
    { href: '/admin/dashboard/hero', label: 'Героный раздел' },
    { href: '/admin/dashboard/about', label: 'О нас' },
    { href: '/admin/dashboard/rooms', label: 'Номера' },
    { href: '/admin/dashboard/offers', label: 'Предложения' },
    { href: '/admin/dashboard/menu', label: 'Меню' },
    { href: '/admin/dashboard/restaurant-gallery', label: 'Галерея' },
    { href: '/admin/dashboard/restaurant-reservation', label: 'Бронирование' },
    { href: '/admin/dashboard/footer', label: 'Футер' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin/dashboard">
              <h1 className="text-xl font-bold">Панель управления</h1>
              </Link>
              <div className="hidden md:flex space-x-4">
                {menuItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:bg-gray-800 px-3 py-2 rounded text-sm"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              Выход
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:bg-gray-700 block px-3 py-2 rounded"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
