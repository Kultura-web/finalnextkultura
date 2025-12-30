'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';

export default function RestaurantHeroDashboard() {
  const [content, setContent] = useState({
    id: '',
    title: '',
    subtitle: '',
    background_image_path: '',
    button_text_1: '',
    button_text_2: ''
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
        .from('restaurant_hero')
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
        .from('restaurant_hero')
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ресторан: Главный раздел</h1>

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

          <div>
            <label className="block text-gray-900 font-medium mb-2">Фоновое изображение</label>
            <ImageUpload
              onImageUpload={(path) => setContent({ ...content, background_image_path: path })}
              preview={content.background_image_path}
            />
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Текст первой кнопки</label>
            <input
              type="text"
              value={content.button_text_1}
              onChange={(e) => setContent({ ...content, button_text_1: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Текст второй кнопки</label>
            <input
              type="text"
              value={content.button_text_2}
              onChange={(e) => setContent({ ...content, button_text_2: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
            />
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
