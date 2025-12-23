'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

export default function AdminDashboard() {
  const sections = [
    {
      title: 'Героный раздел',
      description: 'Управление главной изображением и текстом',
      href: '/admin/dashboard/hero',
      icon: '🎬',
    },
    {
      title: 'О нас',
      description: 'Управление разделом "О нас"',
      href: '/admin/dashboard/about',
      icon: '📝',
    },
    {
      title: 'Номера',
      description: 'Управление типами номеров и изображениями',
      href: '/admin/dashboard/rooms',
      icon: '🏨',
    },
    {
      title: 'Предложения',
      description: 'Управление специальными предложениями',
      href: '/admin/dashboard/offers',
      icon: '🎁',
    },
    {
      title: 'Галерея',
      description: 'Управление галереей изображений',
      href: '/admin/dashboard/gallery',
      icon: '📸',
    },
    {
      title: 'Меню',
      description: 'Управление меню ресторана',
      href: '/admin/dashboard/menu',
      icon: '🍽️',
    },
    {
      title: 'Футер',
      description: 'Управление контактами и ссылками в футере',
      href: '/admin/dashboard/footer',
      icon: '🔗',
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Панель управления контентом</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(section => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-blue-600"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h2>
              <p className="text-gray-600 text-sm">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
