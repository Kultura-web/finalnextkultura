'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';

export default function RestaurantReservationDashboard() {
  const [content, setContent] = useState({
    id: '',
    title: '',
    subtitle: '',
    hours_label: '',
    hours_text: '',
    phone_label: '',
    phone_number: '',
    capacity_label: '',
    capacity_text: '',
    form_title: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurant_reservation_info')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      if (data) setContent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('restaurant_reservation_info')
        .update(content)
        .eq('id', content.id);

      if (error) throw error;
      setMessage('Сохранено успешно!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <AdminLayout><div className="text-center py-8">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ресторан: Бронирование</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-gray-900 font-medium mb-2">Заголовок</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Подзаголовок</label>
            <input
              type="text"
              value={content.subtitle}
              onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Часы работы</h3>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-2">Метка</label>
              <input
                type="text"
                value={content.hours_label}
                onChange={(e) => setContent({ ...content, hours_label: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Часы (используйте Enter для новой строки)</label>
              <textarea
                rows={3}
                value={content.hours_text}
                onChange={(e) => setContent({ ...content, hours_text: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Телефон</h3>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-2">Метка</label>
              <input
                type="text"
                value={content.phone_label}
                onChange={(e) => setContent({ ...content, phone_label: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Номер телефона</label>
              <input
                type="text"
                value={content.phone_number}
                onChange={(e) => setContent({ ...content, phone_number: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Вместимость</h3>

            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-2">Метка</label>
              <input
                type="text"
                value={content.capacity_label}
                onChange={(e) => setContent({ ...content, capacity_label: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Информация о вместимости (используйте Enter для новой строки)</label>
              <textarea
                rows={3}
                value={content.capacity_text}
                onChange={(e) => setContent({ ...content, capacity_text: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Форма бронирования</h3>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Заголовок формы</label>
              <input
                type="text"
                value={content.form_title}
                onChange={(e) => setContent({ ...content, form_title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
